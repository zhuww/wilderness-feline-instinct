/* ==========================================================================
   Wilderness Feline Instinct — ui.js
   HUD meters, instinct compass, action log, modal sheets (inventory /
   crafting / friends / guide), touch controls, tiny WebAudio SFX.
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;

  const $ = (id) => document.getElementById(id);

  let muted = false;
  let audioCtx = null;
  let joystickActive = false;
  let menuCat = null;

  /* ------------------------------------------------------------------ SFX */
  function ac() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function tone(freq, dur, type, vol, slideTo) {
    if (muted) return;
    const c = ac(); if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, c.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
    g.gain.setValueAtTime(vol || 0.12, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur + 0.02);
  }
  function noise(dur, vol, filterFreq) {
    if (muted) return;
    const c = ac(); if (!c) return;
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = filterFreq || 1200;
    const g = c.createGain();
    g.gain.value = vol || 0.1;
    src.connect(f); f.connect(g); g.connect(c.destination);
    src.start();
  }

  const sfx = {
    resume() { ac(); },
    catch() { tone(620, 0.09, 'triangle', 0.14, 940); tone(940, 0.12, 'triangle', 0.12, 1250); },
    pounce() { noise(0.16, 0.14, 700); },
    sniff() { noise(0.28, 0.12, 900); },
    groom() { tone(880, 0.08, 'sine', 0.08, 1320); tone(1320, 0.1, 'sine', 0.07, 1760); },
    hurt() { tone(200, 0.24, 'sawtooth', 0.14, 90); },
    hit() { tone(180, 0.12, 'square', 0.14, 120); noise(0.08, 0.1, 500); },
    alert() { tone(520, 0.14, 'square', 0.09, 390); tone(390, 0.2, 'square', 0.09, 320); },
    eat() { tone(440, 0.07, 'triangle', 0.1, 660); tone(660, 0.09, 'triangle', 0.09, 880); },
    drink() { tone(300, 0.08, 'sine', 0.08, 500); },
    pick() { tone(760, 0.06, 'triangle', 0.09, 1000); },
    craft() { tone(523, 0.09, 'triangle', 0.11, 784); tone(784, 0.12, 'triangle', 0.1, 1046); },
    cave() { noise(0.5, 0.08, 300); tone(140, 0.5, 'sine', 0.08, 90); },
    zoomies() { tone(400, 0.1, 'square', 0.08, 900); tone(900, 0.1, 'square', 0.08, 400); },
    bark() { tone(300, 0.09, 'sawtooth', 0.12, 220); tone(300, 0.09, 'sawtooth', 0.12, 220); },
    thunder() { noise(0.55, 0.32, 150); tone(85, 0.55, 'sine', 0.26, 38); },
  };
  Game.sfx = sfx;

  /* -------------------------------------------------------------- compass */
  function nearestSource(type) {
    const ents = Game.entities;
    const p = ents.player;
    const st = Game.state;
    const range = (st.sniffRange || 1700) * (Game.entities.hasSkill && Game.entities.hasSkill('keen') ? 1.4 : 1);
    let best = null, bd = range * range;
    if (type === 'water') {
      for (const f of Game.world.features) {
        if (f.type !== 'spring' || f.regrowT > 0) continue;
        const d = U.dist2(p.x, p.y, (f.tx + 0.5) * Game.world.TILE, (f.ty + 0.5) * Game.world.TILE);
        if (d < bd) { bd = d; best = { x: (f.tx + 0.5) * Game.world.TILE, y: (f.ty + 0.5) * Game.world.TILE }; }
      }
    } else {
      for (const e of ents.list) {
        if (e.kind === 'prey' && type === 'prey') {
          const d = U.dist2(p.x, p.y, e.x, e.y);
          if (d < bd) { bd = d; best = e; }
        } else if (e.kind === 'predator' && type === 'predator' && e.alive) {
          const d = U.dist2(p.x, p.y, e.x, e.y);
          if (d < bd) { bd = d; best = e; }
        } else if (e.kind === 'companion' && type === 'cat') {
          const d = U.dist2(p.x, p.y, e.x, e.y);
          if (d < bd) { bd = d; best = e; }
        }
      }
      /* challenge entities: dogs count as predators, rivals have their own scent */
      const ce = Game.challenges && Game.challenges.entities || [];
      for (const e of ce) {
        if (!e.alive) continue;
        if (type === 'predator' && e.kind === 'dog') {
          const d = U.dist2(p.x, p.y, e.x, e.y);
          if (d < bd) { bd = d; best = e; }
        } else if (type === 'rival' && e.kind === 'rival') {
          const d = U.dist2(p.x, p.y, e.x, e.y);
          if (d < bd) { bd = d; best = e; }
        }
      }
    }
    return best;
  }

  function drawCompass() {
    const cv = $('compass');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const S = 76;
    if (cv.width !== S * dpr) { cv.width = S * dpr; cv.height = S * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, S, S);
    const c = S / 2;
    /* ring */
    ctx.beginPath(); ctx.arc(c, c, 30, 0, U.TAU);
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath(); ctx.arc(c, c, 24, 0, U.TAU);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* north */
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('北', c, c - 33);
    /* ticks */
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * U.TAU;
      ctx.beginPath();
      ctx.moveTo(c + Math.sin(a) * 26, c - Math.cos(a) * 26);
      ctx.lineTo(c + Math.sin(a) * 30, c - Math.cos(a) * 30);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    /* scent dots */
    const p = Game.entities.player;
    const order = ['water', 'prey', 'cat', 'rival', 'predator'];
    const colors = { water: '#3ee6ff', prey: '#ffd75e', cat: '#ff9ad5', rival: '#ff8a3d', predator: '#ff4d4d' };
    for (const type of order) {
      const src = nearestSource(type);
      if (!src) continue;
      const a = Math.atan2(src.y - p.y, src.x - p.x);
      const dx = c + Math.sin(a) * 27;
      const dy = c - Math.cos(a) * 27;
      const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, 6);
      g.addColorStop(0, colors[type]);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(dx, dy, 6, 0, U.TAU); ctx.fill();
      ctx.fillStyle = colors[type];
      ctx.beginPath(); ctx.arc(dx, dy, 2.6, 0, U.TAU); ctx.fill();
    }
    /* player facing */
    const fa = p.facing;
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(fa);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.moveTo(0, -7); ctx.lineTo(3.4, 4); ctx.lineTo(-3.4, 4);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  /* ----------------------------------------------------------------- HUD */
  const META = {
    hp: { fill: 'm-hp', icon: '❤️', label: 'Health' },
    satiety: { fill: 'm-sat', icon: '🍖', label: 'Satiety' },
    hydration: { fill: 'm-thirst', icon: '💧', label: 'Hydration' },
    stamina: { fill: 'm-stam', icon: '⚡', label: 'Stamina' },
    mood: { fill: 'm-mood', icon: '🧠', label: 'Mood' },
    wetness: { fill: 'm-wet', icon: '🌧️', label: 'Wetness' },
  };

  function updateHUD() {
    const st = Game.state;
    const p = Game.entities.player;
    if (!p || !st) return;
    /* time */
    const h = st.hour;
    const hh = Math.floor(h);
    const mm = Math.floor((h - hh) * 60);
    const hhS = String(hh).padStart(2, '0');
    const mmS = String(mm).padStart(2, '0');
    const icon = st.night > 0.6 ? '🌙' : st.night > 0.15 ? '🌆' : st.warm > 0.08 ? '🌅' : '☀️';
    const tl = $('time-label');
    if (tl) tl.textContent = icon + ' ' + hhS + ':' + mmS + ' · Day ' + st.day;
    /* weather */
    const wl = $('weather-label');
    if (wl) {
      const meta = { clear: ['☀️ 晴朗', 'text-amber-200'], rain: ['🌧️ 下雨', 'text-sky-300'], mist: ['🌫️ 薄雾', 'text-slate-300'] };
      const m = meta[st.weather] || meta.clear;
      wl.textContent = m[0];
      wl.className = 'text-[11px] font-medium tracking-wide ' + m[1];
    }
    /* meters */
    const s = p.stats;
    for (const key in META) {
      const el = $(META[key].fill);
      if (!el) continue;
      const val = s[key] || 0;
      const max = s[key + 'Max'] || 100;
      const pct = Math.max(0, Math.min(100, (val / max) * 100));
      el.style.width = pct.toFixed(1) + '%';
      if (key === 'hp') {
        el.style.background = pct < 30 ? 'linear-gradient(90deg,#f87171,#ef4444)' : 'linear-gradient(90deg,#fb7185,#ef4444)';
      }
    }
    const wetEl = $('wet-meter');
    if (wetEl) wetEl.style.opacity = s.wetness > 3 ? '1' : '0.35';
    /* level + xp */
    const lv = $('level-label');
    if (lv) lv.textContent = 'Lv ' + p.level;
    const xpEl = $('m-xp');
    if (xpEl) {
      const need = Game.entities.xpToLevel(p.level);
      xpEl.style.width = Math.min(100, (p.xp / need) * 100).toFixed(1) + '%';
    }
    /* summon status */
    const sc = $('summon-chip');
    if (sc) {
      const hasAdopted = Game.entities.companions.some((c) => c.adopted);
      if (!hasAdopted) sc.textContent = '📣 无伙伴猫';
      else if (p.summonCd > 0) sc.textContent = '📣 ' + Math.ceil(p.summonCd) + 's';
      else sc.textContent = '📣 就绪(R)';
    }
    /* 当前区域 */
    const zl = $('zone-label');
    if (zl && Game.world.ZONE_INFO) {
      const zi = Game.world.ZONE_INFO[Game.state.zone];
      zl.textContent = '⛩ ' + (zi ? zi.name : '荒野草原');
    }
    /* Boss 血条 */
    const bb = $('boss-bar');
    const boss = Game.entities.boss;
    if (bb) {
      if (boss && boss.alive && boss.aggro) {
        bb.classList.remove('hidden');
        const bt = $('boss-name');
        if (bt) bt.textContent = '👹 ' + boss.name;
        const bf = $('boss-fill');
        if (bf) bf.style.width = Math.max(0, Math.min(100, (boss.hp / boss.hpMax) * 100)).toFixed(1) + '%';
      } else {
        bb.classList.add('hidden');
      }
    }
    drawCompass();
    updateCatMenu();
  }

  /* ---------------------------------------------------------- action log */
  const LOG_COLORS = {
    info: 'text-slate-100',
    good: 'text-emerald-200',
    catch: 'text-amber-200',
    danger: 'text-rose-300',
    combat: 'text-orange-200',
    craft: 'text-fuchsia-200',
    zoomies: 'text-pink-300',
  };

  function log(msg, kind) {
    const box = $('log');
    if (!box) return;
    kind = kind || 'info';
    while (box.children.length >= 6) box.removeChild(box.children[0]);
    const d = document.createElement('div');
    d.className =
      'log-toast px-3 py-1.5 rounded-lg text-[12.5px] leading-snug shadow-lg backdrop-blur-md ' +
      (LOG_COLORS[kind] || LOG_COLORS.info) +
      (kind === 'danger' || kind === 'combat' ? ' bg-rose-950/40 border border-rose-500/30' : ' bg-black/35 border border-white/10');
    d.textContent = msg;
    box.appendChild(d);
    setTimeout(() => {
      d.style.opacity = '0';
      d.style.transform = 'translateX(-8px)';
      setTimeout(() => { if (d.parentNode) d.parentNode.removeChild(d); }, 350);
    }, 4200);
  }

  /* ------------------------------------------------------------- modals */
  function showModal(id) {
    const m = $(id);
    if (!m) return;
    Game.ui.modalOpen = true;
    closeCatMenu();
    m.classList.remove('hidden');
    m.classList.add('flex');
    refreshModals();
  }
  function hideModal(id) {
    const m = $(id);
    if (!m) return;
    Game.ui.modalOpen = false;
    m.classList.add('hidden');
    m.classList.remove('flex');
  }
  function hideAllModals() {
    for (const id of ['modal-inv', 'modal-friends', 'modal-guide', 'modal-growth']) hideModal(id);
    closeCatMenu();
  }

  /* 打开制作面板（洞穴工作台） */
  function openCrafting() {
    const ti = $('tab-inv'), tc = $('tab-craft');
    if (ti && tc) { tc.classList.add('tab-on'); ti.classList.remove('tab-on'); }
    const pi = $('panel-inv'), pc = $('panel-craft');
    if (pi) pi.classList.add('hidden');
    if (pc) pc.classList.remove('hidden');
    showModal('modal-inv');
  }

  /* ------------------------------------------------ floating cat action menu */
  function closeCatMenu() {
    menuCat = null;
    const el = $('cat-menu');
    if (el) el.classList.add('hidden');
  }

  function updateCatMenu() {
    const el = $('cat-menu');
    if (!el) return;
    const p = Game.entities.player;
    if (!p || Game.ui.modalOpen) { el.classList.add('hidden'); return; }
    const cam = Game.state.cam;
    let best = null, bd = 120 * 120;
    for (const c of Game.entities.companions) {
      const d = U.dist2(p.x, p.y, c.x, c.y);
      if (d < bd) { bd = d; best = c; }
    }
    if (!best) { el.classList.add('hidden'); menuCat = null; return; }
    menuCat = best;
    el.style.left = (best.x - cam.x) + 'px';
    el.style.top = (best.y - cam.y - 46) + 'px';
    el.style.transform = 'translateX(-50%)';
    el.classList.remove('hidden');
    const feedBtn = el.querySelector('[data-action="feed"]');
    const adoptBtn = el.querySelector('[data-action="adopt"]');
    const hasFood = ['salmon', 'cooked_salmon', 'mouse'].some((id) => Game.entities.countItem(id) > 0);
    if (feedBtn) {
      feedBtn.disabled = !hasFood;
      feedBtn.style.opacity = hasFood ? '1' : '0.4';
    }
    if (adoptBtn) {
      const blocked = best.adopted || best.friendship < 60;
      adoptBtn.disabled = blocked;
      adoptBtn.style.opacity = blocked ? '0.4' : '1';
      adoptBtn.textContent = best.adopted ? '🤝 已收养' : '🤝 收养';
    }
  }

  function esc(html) {
    return String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function refreshModals() {
    const E = Game.entities;
    const p = E.player;
    if (!p) return;
    const invEl = $('inv-list');
    if (invEl) {
      if (!p.inventory.length) {
        invEl.innerHTML = '<div class="text-slate-400 text-sm italic p-4 text-center">行囊空空——去采集、钓鱼、捕猎填满它吧。</div>';
      } else {
        invEl.innerHTML = p.inventory.map((it) => {
          const def = E.ITEMS[it.id];
          if (!def) return '';
          const usable = def.book || def.food || def.mood || def.heal || def.equip || def.zoomies;
          const equipped = def.equip && p.equipped[def.equip] === it.id;
          const btnLabel = def.equip ? '装备' : def.book ? '📖 阅读' : '使用';
          return '<div class="inv-row flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">' +
            '<span class="text-xl w-8 text-center">' + def.icon + '</span>' +
            '<div class="flex-1 min-w-0">' +
            '<div class="text-[13px] font-medium text-slate-100 truncate">' + esc(def.name) + (equipped ? ' <span class="text-emerald-300 text-[10px]">● equipped</span>' : '') + '</div>' +
            '<div class="text-[11px] text-slate-400 truncate">' + esc(def.desc) + '</div>' +
            '</div>' +
            '<span class="text-[12px] font-semibold text-slate-300 bg-black/30 px-2 py-0.5 rounded-lg">×' + it.qty + '</span>' +
            (usable
              ? '<button data-use="' + it.id + '" class="use-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold ' + (def.book ? 'bg-amber-500/80 hover:bg-amber-400 text-black' : 'bg-sky-500/80 hover:bg-sky-400 text-white') + ' transition">' + btnLabel + '</button>'
              : '') +
            '</div>';
        }).join('');
        invEl.querySelectorAll('[data-use]').forEach((b) => {
          b.addEventListener('click', () => { E.useItem(b.getAttribute('data-use')); });
        });
      }
    }
    const craftEl = $('craft-list');
    if (craftEl) {
      craftEl.innerHTML = E.RECIPES.map((r) => {
        const parts = Object.keys(r.parts);
        const has = parts.every((k) => E.countItem(k) >= r.parts[k]);
        const dayBlocked = r.dayOnly && Game.state.night > 0.4;
        const can = has && !dayBlocked;
        return '<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">' +
          '<span class="text-2xl w-9 text-center">' + r.icon + '</span>' +
          '<div class="flex-1 min-w-0">' +
          '<div class="text-[13px] font-medium text-slate-100">' + esc(r.name) + '</div>' +
          '<div class="text-[11px] text-slate-400">' + esc(r.desc) + '</div>' +
          '<div class="text-[11px] mt-1">' +
          parts.map((k) => {
            const def = E.ITEMS[k];
            const have = E.countItem(k);
            const need = r.parts[k];
            return '<span class="mr-2 ' + (have >= need ? 'text-emerald-300' : 'text-rose-300') + '">' + def.icon + ' ' + have + '/' + need + '</span>';
          }).join('') +
          (dayBlocked ? '<span class="text-amber-300">🌙 需要白天</span>' : '') +
          '</div></div>' +
          '<button data-craft="' + r.id + '" class="px-3 py-1.5 rounded-lg text-[11px] font-bold transition ' +
          (can ? 'bg-amber-500/90 hover:bg-amber-400 text-black' : 'bg-white/10 text-slate-500 cursor-not-allowed') + '">合成</button>' +
          '</div>';
      }).join('');
      craftEl.querySelectorAll('[data-craft]').forEach((b) => {
        b.addEventListener('click', () => {
          const r = E.RECIPES.find((x) => x.id === b.getAttribute('data-craft'));
          if (!r) return;
          const parts = Object.keys(r.parts);
          const dayBlocked = r.dayOnly && Game.state.night > 0.4;
          if (!parts.every((k) => E.countItem(k) >= r.parts[k]) || dayBlocked) return;
          parts.forEach((k) => E.removeItem(k, r.parts[k]));
          E.addItem(r.id);
          Game.ui.log('🔨 Crafted ' + E.ITEMS[r.id].name + '!', 'craft');
          Game.sfx && Game.sfx.craft();
          refreshModals();
        });
      });
    }
    const friendsEl = $('friends-list');
    if (friendsEl) {
      const adopted = E.companions.filter((c) => c.adopted);
      const strays = E.companions.filter((c) => !c.adopted && c.met);
      const unknown = E.companions.length - adopted.length - strays.length;
      const card = (c) => {
        const perks = [
          ['心情光环', c.adopted],
          ['危险预警', c.adopted && c.friendship >= 70],
          ['狩猎协助', c.adopted && c.friendship >= 90],
        ];
        const perkHtml = perks.map(([nm, on]) =>
          '<span class="text-[10px] px-1.5 py-0.5 rounded-md mr-1 ' + (on ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-500') + '">' + (on ? '✓ ' : '· ') + nm + '</span>'
        ).join('');
        const status = c.adopted
          ? '<span class="text-emerald-300 font-semibold text-[11px]">好友 ❤️</span>'
          : c.friendship >= 60
            ? '<span class="text-pink-300 font-semibold text-[11px]">可收养——走近按 F！</span>'
            : c.friendship > 0
              ? '<span class="text-slate-400 text-[11px]">' + Math.round(c.friendship) + '/60 ♥ 可收养</span>'
              : '<span class="text-slate-500 text-[11px]">害羞——先抚摸</span>';
        return '<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">' +
          '<span class="text-2xl w-9 text-center">🐈</span>' +
          '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center gap-2 flex-wrap"><span class="text-[13px] font-semibold text-slate-100">' + esc(c.name) + '</span>' + status + '</div>' +
          '<div class="h-2 w-full max-w-[160px] rounded-full bg-black/40 mt-1.5 overflow-hidden"><div class="h-full rounded-full ' +
          (c.friendship > 55 ? 'bg-gradient-to-r from-pink-400 to-fuchsia-400' : 'bg-gradient-to-r from-rose-300 to-pink-400') +
          '" style="width:' + c.friendship + '%"></div></div>' +
          '<div class="text-[11px] text-slate-400 mt-1">' + perkHtml + '</div>' +
          '</div>' +
          '<div class="text-right text-[11px] text-slate-400 leading-tight">' +
          (c.friendship >= 100 ? '❤️ 挚友' : c.friendship > 0 ? '♥ ' + Math.round(c.friendship) + '%' : '— 害羞 —') +
          '</div>' +
          '</div>';
      };
      let html = '';
      html += '<div class="text-[11px] font-bold text-emerald-300 uppercase tracking-wider px-1 pt-1">🐾 你的宠物（' + adopted.length + '）</div>';
      html += adopted.length
        ? adopted.map(card).join('')
        : '<div class="text-slate-500 text-sm italic px-2 py-1">还没有宠物——把流浪猫喂到 60 ♥，然后收养它！</div>';
      html += '<div class="text-[11px] font-bold text-pink-300 uppercase tracking-wider px-1 pt-3">🐈 流浪猫（' + (strays.length + unknown) + '）</div>';
      html += strays.length ? strays.map(card).join('') : '';
      if (unknown) {
        html += '<div class="text-slate-500 text-[12px] px-2">还有 ' + unknown + ' 只流浪猫在荒野中游荡——跟着粉色气味找它们。</div>';
      }
      if (!adopted.length && !strays.length && !unknown) {
        html += '<div class="text-slate-500 text-sm italic px-2 py-1">附近还没有猫。按 E 嗅探，跟着粉色气味流寻找。</div>';
      }
      friendsEl.innerHTML = html;
    }
    const growthEl = $('growth-list');
    if (growthEl) {
      const j = Game.state.journey || {};
      const need = E.xpToLevel(p.level);
      const hpBonus = (p.level - 1) * 8;
      const stBonus = (p.level - 1) * 4;
      /* 三大发展分支的技能树 */
      const branches = [
        ['🎯 狩猎', [
          ['hunter', '猎手本能', '扑击伤害 +15%，捕捉范围更大'],
          ['keen', '敏锐嗅觉', '嗅探范围 +40%，气味更浓密'],
          ['angler', '渔夫之尾', '钓鱼必定成功'],
        ]],
        ['🛡️ 生存', [
          ['swift', '疾风快爪', '移动速度 +10%，体力回复 +25%'],
          ['thick', '厚实毛皮', '受到的伤害 -25%'],
          ['camo', '树叶伪装', '高草丛隐匿效果翻倍，潜行更省体力'],
        ]],
        ['🐈 羁绊', [
          ['guardian', '守护之力', '友情获取 +50%，狩猎协助 +4'],
          ['brave', '无畏之心', '心情上限 +25%，挑战奖励 +50%'],
          ['summon', '召唤强化', '召唤时间 25→40 秒，冷却 5→3 分钟'],
        ]],
      ];
      const branchHtml = branches.map(([title, skills]) => {
        const rows = skills.map(([id, name, desc]) => {
          const on = p.skills.includes(id);
          const can = !on && p.skillPoints > 0;
          return '<div class="flex items-center gap-2 px-3 py-2 rounded-xl border ' + (on ? 'bg-amber-500/10 border-amber-400/40' : 'bg-white/5 border-white/10 opacity-70') + '">' +
            '<span class="text-lg w-7 text-center">' + (on ? '✅' : '⭐') + '</span>' +
            '<div class="flex-1 min-w-0">' +
            '<div class="text-[12.5px] font-semibold ' + (on ? 'text-amber-200' : 'text-slate-300') + '">' + esc(name) + (on ? ' <span class="text-emerald-300 text-[10px]">已掌握</span>' : '') + '</div>' +
            '<div class="text-[11px] text-slate-400">' + esc(desc) + '</div>' +
            '</div>' +
            (on ? '' : '<button data-learn="' + id + '" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition ' + (can ? 'bg-amber-500/90 hover:bg-amber-400 text-black' : 'bg-white/10 text-slate-500 cursor-not-allowed') + '">学习</button>') +
            '</div>';
        }).join('');
        return '<div class="mb-2"><div class="text-[11px] font-bold text-sky-300 uppercase tracking-wider px-1 pt-1">' + title + '</div><div class="space-y-1.5">' + rows + '</div></div>';
      }).join('');
      const journey = [
        ['☀️', '存活天数', Game.state.day],
        ['🐭', '捕猎数量', j.preyCaught || 0],
        ['⚔️', '击杀捕食者', j.predatorsSlain || 0],
        ['🎣', '钓鱼数量', j.fishCaught || 0],
        ['🐈', '收养宠物', j.petsAdopted || 0],
        ['🏆', '挑战胜利', j.challengesWon || 0],
        ['⭐', '累计经验', j.xpTotal || 0],
      ];
      const journeyHtml = journey.map(([ic, nm, v]) =>
        '<div class="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5">' +
        '<span class="text-[12px] text-slate-300">' + ic + ' ' + nm + '</span>' +
        '<span class="text-[12px] font-bold text-white">' + v + '</span></div>'
      ).join('');
      growthEl.innerHTML =
        '<div class="hud-panel rounded-2xl p-3 mb-3">' +
        '<div class="flex items-center justify-between"><span class="text-[14px] font-bold text-amber-300">Lv ' + p.level + '</span>' +
        '<span class="text-[12px] font-bold text-fuchsia-300">技能点：' + p.skillPoints + '</span>' +
        '<span class="text-[11px] text-slate-400">' + p.xp + ' / ' + need + ' 经验</span></div>' +
        '<div class="h-2.5 rounded-full bg-black/40 mt-2 overflow-hidden"><div class="h-full rounded-full" style="width:' + Math.min(100, (p.xp / need) * 100).toFixed(1) + '%;background:linear-gradient(90deg,#fbbf24,#f59e0b)"></div></div>' +
        '<div class="text-[11px] text-slate-400 mt-2">等级加成：最大生命 +' + hpBonus + ' · 最大体力 +' + stBonus + ' · 最大心情 +' + stBonus + '</div>' +
        '<div class="text-[11px] text-slate-400">心情暴击率：<b class="text-amber-300">' + Math.round(E.critChance() * 100) + '%</b>（心情越好暴击越高，双倍伤害）</div>' +
        '<div class="text-[11px] text-slate-500">升级、挑战胜利、击败 Boss 获得技能点，自由点亮三大分支。</div>' +
        '</div>' +
        '<div class="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-1 pt-1">📖 技能树（' + p.skills.length + '/9）</div>' +
        branchHtml +
        '<div class="text-[11px] font-bold text-emerald-300 uppercase tracking-wider px-1 pt-3">🌱 成长轨迹</div>' +
        '<div class="space-y-1">' + journeyHtml + '</div>';
      growthEl.querySelectorAll('[data-learn]').forEach((b) => {
        b.addEventListener('click', () => { E.learnSkill(b.getAttribute('data-learn')); });
      });
    }
  }

  function refreshBadges() {
    const p = Game.entities.player;
    if (!p) return;
    const total = p.inventory.reduce((n, i) => n + i.qty, 0);
    const badge = $('inv-badge');
    if (badge) {
      badge.textContent = total;
      badge.style.display = total > 0 ? 'inline-flex' : 'none';
    }
  }

  /* ------------------------------------------------------ flash & shake */
  function redFlash() {
    const el = $('red-flash');
    if (!el) return;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 260);
  }

  function flashWhite() {
    const el = $('white-flash');
    if (!el) return;
    el.style.opacity = '0.85';
    setTimeout(() => { el.style.opacity = '0'; }, 130);
  }

  function shake() {
    const st = Game.state;
    st.shakeT = 0.34;
    st.shakeMag = 9;
  }

  /* ------------------------------------------------ challenge banner */
  function setChallenge(title, desc, remain, total) {
    const b = $('challenge-banner');
    if (!b) return;
    b.classList.remove('hidden');
    const t = $('challenge-title');
    if (t) t.textContent = title;
    const d = $('challenge-desc');
    if (d) d.textContent = desc;
    const bar = $('challenge-bar');
    if (bar) bar.style.width = Math.max(0, Math.min(100, (remain / total) * 100)).toFixed(1) + '%';
  }

  function clearChallenge() {
    const b = $('challenge-banner');
    if (b) b.classList.add('hidden');
  }

  /* --------------------------------------------------------------- fade */
  function fadeTo(target, cb) {
    const st = Game.state;
    st.fadeTarget = target;
    st.fadeCb = cb;
  }

  /* ------------------------------------------------------ touch controls */
  function initTouch() {
    const ui = $('touch-ui');
    if (!ui) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    ui.classList.remove('hidden');
    const joy = $('joystick');
    const knob = $('joystick-knob');
    const R = 42;
    const onMove = (e) => {
      e.preventDefault();
      const t = e.touches ? e.touches[0] : e;
      const rect = joy.getBoundingClientRect();
      let dx = t.clientX - (rect.left + rect.width / 2);
      let dy = t.clientY - (rect.top + rect.height / 2);
      const len = Math.hypot(dx, dy);
      if (len > R) { dx = dx / len * R; dy = dy / len * R; }
      knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      const nx = dx / R, ny = dy / R;
      Game.input.vjoy = { x: nx, y: ny };
      joystickActive = true;
    };
    const onEnd = () => {
      knob.style.transform = 'translate(0,0)';
      Game.input.vjoy = { x: 0, y: 0 };
      joystickActive = false;
    };
    joy.addEventListener('touchstart', (e) => { e.preventDefault(); onMove(e); }, { passive: false });
    joy.addEventListener('touchmove', onMove, { passive: false });
    joy.addEventListener('touchend', onEnd);
    joy.addEventListener('touchcancel', onEnd);

    const bind = (id, flag) => {
      const el = $(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); Game.input[flag] = true; }, { passive: false });
      el.addEventListener('touchend', (e) => { e.preventDefault(); Game.input[flag] = false; }, { passive: false });
      el.addEventListener('touchcancel', () => { Game.input[flag] = false; });
    };
    bind('btn-pounce', 'pounce');
    bind('btn-sniff', 'sniff');
    bind('btn-groom', 'groom');
    bind('btn-interact', 'interact');
    const sneakBtn = $('btn-sneak');
    if (sneakBtn) {
      sneakBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.input.sneak = !Game.input.sneak;
        sneakBtn.classList.toggle('active');
      }, { passive: false });
    }
    const summonBtn = $('btn-summon');
    if (summonBtn) {
      summonBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        Game.entities.summonCompanion && Game.entities.summonCompanion();
      }, { passive: false });
    }
  }

  /* --------------------------------------------------------------- init */
  function init() {
    /* top buttons */
    const wire = (id, fn) => { const el = $(id); if (el) el.addEventListener('click', fn); };
    wire('btn-guide', () => showModal('modal-guide'));
    wire('btn-inv', () => showModal('modal-inv'));
    wire('btn-friends', () => showModal('modal-friends'));
    wire('btn-growth', () => showModal('modal-growth'));
    wire('btn-sound', () => {
      muted = !muted;
      const el = $('btn-sound');
      if (el) el.textContent = muted ? '🔇' : '🔊';
    });
    wire('btn-reset', () => {
      if (confirm('Start a brand-new game? Your current save will be wiped.')) {
        try { localStorage.removeItem('wfissave'); } catch (e) { /* ignore */ }
        location.reload();
      }
    });
    /* modal closes */
    for (const id of ['modal-inv', 'modal-friends', 'modal-guide', 'modal-growth']) {
      const m = $(id);
      if (!m) continue;
      m.addEventListener('click', (e) => { if (e.target === m) hideModal(id); });
      const close = m.querySelector('.modal-close');
      if (close) close.addEventListener('click', () => hideModal(id));
    }
    /* tabs */
    const ti = $('tab-inv'), tc = $('tab-craft');
    if (ti && tc) {
      ti.addEventListener('click', () => {
        ti.classList.add('tab-on'); tc.classList.remove('tab-on');
        $('panel-inv').classList.remove('hidden');
        $('panel-craft').classList.add('hidden');
      });
      tc.addEventListener('click', () => {
        tc.classList.add('tab-on'); ti.classList.remove('tab-on');
        $('panel-craft').classList.remove('hidden');
        $('panel-inv').classList.add('hidden');
      });
    }
    /* cat action menu */
    const menu = $('cat-menu');
    if (menu) {
      menu.querySelectorAll('[data-action]').forEach((b) => {
        b.addEventListener('click', () => {
          const c = menuCat;
          if (!c) return;
          const act = b.getAttribute('data-action');
          if (act === 'pet') Game.entities.petCompanion(c);
          else if (act === 'feed') Game.entities.feedCompanion(c);
          else if (act === 'adopt') Game.entities.adoptCompanion(c);
          refreshModals();
        });
      });
      /* clicking anywhere else closes it */
      document.addEventListener('pointerdown', (e) => {
        if (menuCat && !menu.contains(e.target)) closeCatMenu();
      });
    }
    initTouch();
    updateHUD();
  }

  Game.ui = {
    init, updateHUD, log, showModal, hideModal, hideAllModals,
    refreshModals, refreshBadges, redFlash, flashWhite, shake, fadeTo,
    updateCatMenu, closeCatMenu,
    setChallenge, clearChallenge,
    openCrafting,
  };
})();
