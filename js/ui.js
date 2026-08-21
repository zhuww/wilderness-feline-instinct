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
    ctx.fillText(Game.i18n.t('misc.north'), c, c - 33);
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

  /* ------------------------------------------------------ compass 降频
     罗盘重绘从"每帧一次"降为"每 0.2 秒最多一次"：静止场景（气味源不动、
     朝向不变）不再每帧刷 canvas，只在内容可能变化时重绘。
     compassT 初始为 -Infinity 表示"从未画过"，首帧立即绘制一次。 */
  let compassT = -Infinity;
  function maybeDrawCompass() {
    const now = performance.now();
    if (now - compassT < 200) return;
    compassT = now;
    drawCompass();
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

  /* ---------------------------------------------- HUD 写入降频缓存（中13）
     静止场景（玩家不动、数值不变）下原实现每帧约 15 次 DOM 写入。这里把
     textContent / className / style 全部"仅值变化才写"：
     - textContent/className：缓存上次写入字符串，相同则跳过；
     - style.width 百分比条：量化到 0.1% 精度，变化超过阈值才写；
       血条放宽（阈值 0）保证流畅，其余条 0.3% 内抖动不写；
     - hidden 类切换直接对照真实 classList 状态，避免与 closeCatMenu 等
       外部操作互相覆盖缓存（防止菜单"该显不显"）。 */
  const hudLast = Object.create(null);
  let anonSeq = 0;
  const anonKey = new WeakMap();
  function keyOf(el, prop) {
    let k = anonKey.get(el);
    if (k === undefined) { k = '#' + (anonSeq++); anonKey.set(el, k); }
    return k + '.' + prop;
  }
  function writeText(el, value) {
    if (!el) return;
    const key = keyOf(el, 'text');
    if (hudLast[key] === value) return;
    hudLast[key] = value;
    el.textContent = value;
  }
  function writeClass(el, value) {
    if (!el) return;
    const key = keyOf(el, 'class');
    if (hudLast[key] === value) return;
    hudLast[key] = value;
    el.className = value;
  }
  function writeStyle(el, prop, value) {
    if (!el) return;
    const key = keyOf(el, 'style.' + prop);
    if (hudLast[key] === value) return;
    hudLast[key] = value;
    el.style[prop] = value;
  }
  /* 百分比条：v 量化到 0.1%；与上次写入值差值 ≤ eps 则跳过（eps=0 表示
     任意 0.1% 变化都写，血条用；eps=0.3 表示 0.3% 内抖动不写） */
  function writeWidth(el, pct, eps) {
    if (!el) return;
    const v = Math.max(0, Math.min(100, pct)).toFixed(1);
    const key = keyOf(el, 'style.width');
    const prev = hudLast[key];
    if (prev !== undefined && Math.abs(parseFloat(prev) - parseFloat(v)) <= (eps || 0)) return;
    hudLast[key] = v;
    el.style.width = v + '%';
  }
  function writeHidden(el, hidden) {
    if (!el) return;
    if (el.classList.contains('hidden') === hidden) return;
    if (hidden) el.classList.add('hidden'); else el.classList.remove('hidden');
  }

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
    writeText($('time-label'), Game.i18n.t('ui.hud.time', { icon: icon, time: hhS + ':' + mmS, day: st.day }));
    /* weather */
    const wl = $('weather-label');
    if (wl) {
      const meta = { clear: ['ui.hud.weather.clear', 'text-amber-200'], rain: ['ui.hud.weather.rain', 'text-sky-300'], mist: ['ui.hud.weather.mist', 'text-slate-300'] };
      const m = meta[st.weather] || meta.clear;
      writeText(wl, Game.i18n.t(m[0]));
      writeClass(wl, 'text-[11px] font-medium tracking-wide ' + m[1]);
    }
    /* meters */
    const s = p.stats;
    for (const key in META) {
      const el = $(META[key].fill);
      if (!el) continue;
      const val = s[key] || 0;
      const max = s[key + 'Max'] || 100;
      const pct = Math.max(0, Math.min(100, (val / max) * 100));
      /* 血条放宽：任意 0.1% 变化即写（保持流畅）；其余条 0.3% 内抖动不写 */
      writeWidth(el, pct, key === 'hp' ? 0 : 0.3);
      if (key === 'hp') {
        const low = pct < 30;
        writeStyle(el, 'background', low ? 'linear-gradient(90deg,#f87171,#ef4444)' : 'linear-gradient(90deg,#fb7185,#ef4444)');
      }
    }
    const wetEl = $('wet-meter');
    if (wetEl) writeStyle(wetEl, 'opacity', s.wetness > 3 ? '1' : '0.35');
    /* level + xp */
    writeText($('level-label'), Game.i18n.t('ui.hud.level', { n: p.level }));
    const xpEl = $('m-xp');
    if (xpEl) {
      const need = Game.entities.xpToLevel(p.level);
      writeWidth(xpEl, Math.min(100, (p.xp / need) * 100), 0.3);
    }
    /* summon status */
    const sc = $('summon-chip');
    if (sc) {
      const hasAdopted = Game.entities.companions.some((c) => c.adopted);
      if (!hasAdopted) writeText(sc, Game.i18n.t('ui.hud.summon.none'));
      else if (p.summonCd > 0) writeText(sc, Game.i18n.t('ui.hud.summon.cd', { n: Math.ceil(p.summonCd) }));
      else writeText(sc, Game.i18n.t('ui.hud.summon.ready'));
    }
    /* 当前区域 */
    const zl = $('zone-label');
    if (zl && Game.world.ZONE_INFO) {
      /* 区域名走字典（zone.0-3），缺失时 t() 自动回退中文基准 */
      const zoneKey = 'zone.' + Game.state.zone;
      writeText(zl, Game.i18n.t('ui.hud.zone', { name: Game.i18n.t(zoneKey) }));
    }
    /* Boss 血条 */
    const bb = $('boss-bar');
    const boss = Game.entities.boss;
    if (bb) {
      if (boss && boss.alive && boss.aggro) {
        writeHidden(bb, false);
        const bt = $('boss-name');
        if (bt) {
          /* Boss 名走字典（boss.0-3，与当前区域绑定）；字典缺失时回退实体名 */
          const bKey = 'boss.' + Game.state.zone;
          let bName = Game.i18n.t(bKey);
          if (bName === bKey) bName = boss.name;
          writeText(bt, Game.i18n.t('ui.hud.boss', { name: bName }));
        }
        const bf = $('boss-fill');
        if (bf) writeWidth(bf, Math.max(0, Math.min(100, (boss.hp / boss.hpMax) * 100)), 0);
      } else {
        writeHidden(bb, true);
      }
    }
    maybeDrawCompass();
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

  /* 窄屏检测（手机）：日志更少、更短，避免遮挡主界面 */
  function isNarrowScreen() {
    const mq = window.matchMedia && window.matchMedia('(max-width: 767px)');
    return mq ? mq.matches : window.innerWidth <= 767;
  }

  function log(msg, kind) {
    const box = $('log');
    if (!box) return;
    kind = kind || 'info';
    const narrow = isNarrowScreen();
    /* 手机：最多 3 条，桌面 6 条 */
    while (box.children.length >= (narrow ? 3 : 6)) box.removeChild(box.children[0]);
    const d = document.createElement('div');
    d.className =
      'log-toast px-3 py-1.5 rounded-lg text-[12.5px] leading-snug shadow-lg backdrop-blur-md ' +
      (LOG_COLORS[kind] || LOG_COLORS.info) +
      (kind === 'danger' || kind === 'combat' ? ' bg-rose-950/40 border border-rose-500/30' : ' bg-black/35 border border-white/10');
    d.textContent = msg;
    box.appendChild(d);
    /* 单一定时器：手机 2600ms、桌面 4200ms 后一次性淡出并移除 */
    setTimeout(() => {
      d.style.opacity = '0';
      d.style.transform = 'translateX(-8px)';
      if (d.parentNode) d.parentNode.removeChild(d);
    }, narrow ? 2600 : 4200);
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
    for (const id of ['modal-inv', 'modal-friends', 'modal-guide', 'modal-growth', 'modal-confirm']) hideModal(id);
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
    if (!p || Game.ui.modalOpen) { writeHidden(el, true); return; }
    const cam = Game.state.cam;
    /* 猫互动菜单：玩家需主动靠近（60px 内）才显示，避免挡在眼前 */
    let best = null, bd = 60 * 60;
    for (const c of Game.entities.companions) {
      const d = U.dist2(p.x, p.y, c.x, c.y);
      if (d < bd) { bd = d; best = c; }
    }
    if (!best) { writeHidden(el, true); menuCat = null; return; }
    menuCat = best;
    /* 位置/样式均走"值变化才写"缓存；静止场景菜单不再每帧刷 style */
    writeStyle(el, 'left', (best.x - cam.x) + 'px');
    writeStyle(el, 'top', (best.y - cam.y - 46) + 'px');
    writeStyle(el, 'transform', 'translateX(-50%)');
    writeHidden(el, false);
    const feedBtn = el.querySelector('[data-action="feed"]');
    const adoptBtn = el.querySelector('[data-action="adopt"]');
    const hasFood = ['salmon', 'cooked_salmon', 'mouse'].some((id) => Game.entities.countItem(id) > 0);
    if (feedBtn) {
      if (feedBtn.disabled !== !hasFood) feedBtn.disabled = !hasFood;
      writeStyle(feedBtn, 'opacity', hasFood ? '1' : '0.4');
    }
    if (adoptBtn) {
      const blocked = best.adopted || best.friendship < 60;
      if (adoptBtn.disabled !== blocked) adoptBtn.disabled = blocked;
      writeStyle(adoptBtn, 'opacity', blocked ? '0.4' : '1');
      writeText(adoptBtn, Game.i18n.t(best.adopted ? 'ui.catmenu.adopted' : 'ui.catmenu.adopt'));
    }
  }

  /* HTML 转义：& < > 双引号 单引号 全覆盖（单双引号防止属性上下文注入） */
  function esc(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function refreshModals() {
    const E = Game.entities;
    const p = E.player;
    if (!p) return;
    const invEl = $('inv-list');
    if (invEl) {
      if (!p.inventory.length) {
        invEl.innerHTML = '<div class="text-slate-400 text-sm italic p-4 text-center">' + Game.i18n.t('ui.inv.empty') + '</div>';
      } else {
        invEl.innerHTML = p.inventory.map((it) => {
          const def = Object.prototype.hasOwnProperty.call(E.ITEMS, it.id) ? E.ITEMS[it.id] : null;
          if (!def) return '';
          const usable = def.book || def.food || def.mood || def.heal || def.equip || def.zoomies;
          const equipped = def.equip && p.equipped[def.equip] === it.id;
          const btnLabel = def.equip ? Game.i18n.t(equipped ? 'ui.inv.unequip' : 'ui.inv.equip') : def.book ? Game.i18n.t('ui.inv.read') : Game.i18n.t('ui.inv.use');
          return '<div class="inv-row flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">' +
            '<span class="text-xl w-8 text-center">' + def.icon + '</span>' +
            '<div class="flex-1 min-w-0">' +
            '<div class="text-[13px] font-medium text-slate-100 truncate">' + esc(Game.i18n.t('item.' + it.id + '.name')) + (equipped ? ' <span class="text-emerald-300 text-[10px]">' + Game.i18n.t('ui.inv.equipped') + '</span>' : '') + '</div>' +
            '<div class="text-[11px] text-slate-400 truncate">' + esc(Game.i18n.t('item.' + it.id + '.desc')) + '</div>' +
            '</div>' +
            '<span class="text-[12px] font-semibold text-slate-300 bg-black/30 px-2 py-0.5 rounded-lg">×' + esc(it.qty) + '</span>' +
            (usable
              ? '<button data-use="' + esc(it.id) + '" class="use-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold ' + (def.book ? 'bg-amber-500/80 hover:bg-amber-400 text-black' : 'bg-sky-500/80 hover:bg-sky-400 text-white') + ' transition">' + btnLabel + '</button>'
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
        const locked = r.req && !E.hasSkill(r.req);
        const parts = Object.keys(r.parts);
        const has = parts.every((k) => E.countItem(k) >= r.parts[k]);
        const dayBlocked = r.dayOnly && Game.state.night > 0.4;
        const can = !locked && has && !dayBlocked;
        return '<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">' +
          '<span class="text-2xl w-9 text-center">' + r.icon + '</span>' +
          '<div class="flex-1 min-w-0">' +
          '<div class="text-[13px] font-medium text-slate-100">' + esc(Game.i18n.t('recipe.' + r.id + '.name')) + (locked ? ' <span class="text-fuchsia-300 text-[10px]">' + Game.i18n.t('ui.craft.locked') + '</span>' : '') + '</div>' +
          '<div class="text-[11px] text-slate-400">' + esc(Game.i18n.t('recipe.' + r.id + '.desc')) + '</div>' +
          (locked ? '<div class="text-[10px] text-fuchsia-300 mt-0.5">' + Game.i18n.t('ui.craft.needSkill', { skill: Game.i18n.t('skill.' + r.req + '.name') }) + '</div>' : '') +
          '<div class="text-[11px] mt-1">' +
          parts.map((k) => {
            const def = E.ITEMS[k];
            const have = E.countItem(k);
            const need = r.parts[k];
            return '<span class="mr-2 ' + (have >= need ? 'text-emerald-300' : 'text-rose-300') + '">' + def.icon + ' ' + esc(have) + '/' + esc(need) + '</span>';
          }).join('') +
          (dayBlocked ? '<span class="text-amber-300">' + Game.i18n.t('ui.craft.dayOnly') + '</span>' : '') +
          '</div></div>' +
          '<button data-craft="' + r.id + '" class="px-3 py-1.5 rounded-lg text-[11px] font-bold transition ' +
          (can ? 'bg-amber-500/90 hover:bg-amber-400 text-black' : 'bg-white/10 text-slate-500 cursor-not-allowed') + '">' + (locked ? '🔒' : Game.i18n.t('ui.craft.craft')) + '</button>' +
          '</div>';
      }).join('');
      craftEl.querySelectorAll('[data-craft]').forEach((b) => {
        b.addEventListener('click', () => {
          const r = E.RECIPES.find((x) => x.id === b.getAttribute('data-craft'));
          if (!r) return;
          if (r.req && !E.hasSkill(r.req)) {
            Game.ui.log(Game.i18n.t('log.craft.needSkill', { skill: Game.i18n.t('skill.' + r.req + '.name') }), 'info');
            return;
          }
          const parts = Object.keys(r.parts);
          const dayBlocked = r.dayOnly && Game.state.night > 0.4;
          if (!parts.every((k) => E.countItem(k) >= r.parts[k]) || dayBlocked) return;
          parts.forEach((k) => E.removeItem(k, r.parts[k]));
          E.addItem(r.id);
          Game.ui.log(Game.i18n.t('log.craft.done', { name: Game.i18n.t('item.' + r.id + '.name') }), 'craft');
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
          [Game.i18n.t('ui.perk.mood'), c.adopted],
          [Game.i18n.t('ui.perk.warn'), c.adopted && c.friendship >= 70],
          [Game.i18n.t('ui.perk.hunt'), c.adopted && c.friendship >= 90],
        ];
        const perkHtml = perks.map(([nm, on]) =>
          '<span class="text-[10px] px-1.5 py-0.5 rounded-md mr-1 ' + (on ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-500') + '">' + (on ? '✓ ' : '· ') + nm + '</span>'
        ).join('');
        const status = c.adopted
          ? '<span class="text-emerald-300 font-semibold text-[11px]">' + Game.i18n.t('ui.friends.status.adopted') + '</span>'
          : c.friendship >= 60
            ? '<span class="text-pink-300 font-semibold text-[11px]">' + Game.i18n.t('ui.friends.status.adoptable') + '</span>'
            : c.friendship > 0
              ? '<span class="text-slate-400 text-[11px]">' + Game.i18n.t('ui.friends.status.approaching', { n: Math.round(c.friendship) }) + '</span>'
              : '<span class="text-slate-500 text-[11px]">' + Game.i18n.t('ui.friends.status.shy') + '</span>';
        return '<div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">' +
          '<span class="text-2xl w-9 text-center">🐈</span>' +
          '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center gap-2 flex-wrap"><span class="text-[13px] font-semibold text-slate-100">' + esc(c.name) + '</span>' + status + '</div>' +
          '<div class="h-2 w-full max-w-[160px] rounded-full bg-black/40 mt-1.5 overflow-hidden"><div class="h-full rounded-full ' +
          (c.friendship > 55 ? 'bg-gradient-to-r from-pink-400 to-fuchsia-400' : 'bg-gradient-to-r from-rose-300 to-pink-400') +
          '" style="width:' + esc(c.friendship) + '%"></div></div>' +
          '<div class="text-[11px] text-slate-400 mt-1">' + perkHtml + '</div>' +
          '</div>' +
          '<div class="text-right text-[11px] text-slate-400 leading-tight">' +
          (c.friendship >= 100 ? Game.i18n.t('ui.friends.friendship.best') : c.friendship > 0 ? Game.i18n.t('ui.friends.friendship.percent', { n: Math.round(c.friendship) }) : Game.i18n.t('ui.friends.friendship.shy')) +
          '</div>' +
          '</div>';
      };
      let html = '';
      html += '<div class="text-[11px] font-bold text-emerald-300 uppercase tracking-wider px-1 pt-1">' + Game.i18n.t('ui.friends.yourPets', { n: adopted.length }) + '</div>';
      html += adopted.length
        ? adopted.map(card).join('')
        : '<div class="text-slate-500 text-sm italic px-2 py-1">' + Game.i18n.t('ui.friends.noPets') + '</div>';
      html += '<div class="text-[11px] font-bold text-pink-300 uppercase tracking-wider px-1 pt-3">' + Game.i18n.t('ui.friends.strays', { n: strays.length + unknown }) + '</div>';
      html += strays.length ? strays.map(card).join('') : '';
      if (unknown) {
        html += '<div class="text-slate-500 text-[12px] px-2">' + Game.i18n.t('ui.friends.unknown', { n: unknown }) + '</div>';
      }
      if (!adopted.length && !strays.length && !unknown) {
        html += '<div class="text-slate-500 text-sm italic px-2 py-1">' + Game.i18n.t('ui.friends.none') + '</div>';
      }
      friendsEl.innerHTML = html;
    }
    const growthEl = $('growth-list');
    if (growthEl) {
      const j = Game.state.journey || {};
      const need = E.xpToLevel(p.level);
      const hpBonus = (p.level - 1) * 10;
      const stBonus = (p.level - 1) * 6;
      const regenBonus = Math.min(120, Math.round((p.level - 1) * 4));
      /* 五大发展分支的技能树（猎手/厚皮/活力/闪避/巧匠可重复加点）；
         分支标题存 i18n key，渲染时 t() 翻译 */
      const branches = [
        ['ui.branch.hunt', ['hunter', 'leap', 'keen', 'angler']],
        ['ui.branch.survive', ['swift', 'thick', 'camo', 'vitality']],
        ['ui.branch.bond', ['guardian', 'brave', 'summon']],
        ['ui.branch.dodge', ['dodge', 'agile']],
        ['ui.branch.craft', ['craft', 'alchemist']],
      ];
      const branchHtml = branches.map(([title, ids]) => {
        const rows = ids.map((id) => {
          const def = E.SKILL_DEFS[id];
          if (!def) return '';
          const lv = E.skillLevel(id);
          const on = lv > 0;
          const maxed = lv >= def.max;
          const can = !maxed && p.skillPoints > 0;
          const btn = maxed
            ? '<span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300">' + Game.i18n.t('ui.skill.maxed') + '</span>'
            : '<button data-learn="' + id + '" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition ' + (can ? 'bg-amber-500/90 hover:bg-amber-400 text-black' : 'bg-white/10 text-slate-500 cursor-not-allowed') + '">' + Game.i18n.t(on ? 'ui.skill.upgrade' : 'ui.skill.learn') + '</button>';
          return '<div class="flex items-center gap-2 px-3 py-2 rounded-xl border ' + (on ? 'bg-amber-500/10 border-amber-400/40' : 'bg-white/5 border-white/10 opacity-70') + '">' +
            '<span class="text-lg w-7 text-center">' + (on ? '✅' : '⭐') + '</span>' +
            '<div class="flex-1 min-w-0">' +
            '<div class="text-[12.5px] font-semibold ' + (on ? 'text-amber-200' : 'text-slate-300') + '">' + esc(Game.i18n.t('skill.' + id + '.name')) +
            (on ? ' <span class="text-emerald-300 text-[10px]">' + Game.i18n.t('ui.skill.lv', { lv: lv, max: def.max }) + '</span>' : '') + '</div>' +
            '<div class="text-[11px] text-slate-400">' + esc(Game.i18n.t('skill.' + id + '.desc')) + '</div>' +
            '</div>' + btn + '</div>';
        }).join('');
        return '<div class="mb-2"><div class="text-[11px] font-bold text-sky-300 uppercase tracking-wider px-1 pt-1">' + Game.i18n.t(title) + '</div><div class="space-y-1.5">' + rows + '</div></div>';
      }).join('');
      const journey = [
        ['☀️', 'ui.journey.days', Game.state.day],
        ['🐭', 'ui.journey.prey', j.preyCaught || 0],
        ['⚔️', 'ui.journey.predators', j.predatorsSlain || 0],
        ['🎣', 'ui.journey.fish', j.fishCaught || 0],
        ['🐈', 'ui.journey.pets', j.petsAdopted || 0],
        ['🏆', 'ui.journey.challenges', j.challengesWon || 0],
        ['⭐', 'ui.journey.xp', j.xpTotal || 0],
      ];
      const journeyHtml = journey.map(([ic, nm, v]) =>
        '<div class="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5">' +
        '<span class="text-[12px] text-slate-300">' + ic + ' ' + Game.i18n.t(nm) + '</span>' +
        '<span class="text-[12px] font-bold text-white">' + esc(v) + '</span></div>'
      ).join('');
      growthEl.innerHTML =
        '<div class="hud-panel rounded-2xl p-3 mb-3">' +
        '<div class="flex items-center justify-between"><span class="text-[14px] font-bold text-amber-300">' + Game.i18n.t('ui.hud.level', { n: p.level }) + '</span>' +
        '<span class="text-[12px] font-bold text-fuchsia-300">' + Game.i18n.t('ui.growth.skillPoints', { n: p.skillPoints }) + '</span>' +
        '<span class="text-[11px] text-slate-400">' + Game.i18n.t('ui.growth.xp', { xp: p.xp, need: need }) + '</span></div>' +
        '<div class="h-2.5 rounded-full bg-black/40 mt-2 overflow-hidden"><div class="h-full rounded-full" style="width:' + esc(Math.min(100, (p.xp / need) * 100).toFixed(1)) + '%;background:linear-gradient(90deg,#fbbf24,#f59e0b)"></div></div>' +
        '<div class="text-[11px] text-slate-400 mt-2">' + Game.i18n.t('ui.growth.bonus', { hp: hpBonus, st: stBonus, mood: stBonus, regen: regenBonus }) + '</div>' +
        '<div class="text-[11px] text-slate-400">' + Game.i18n.t('ui.growth.crit', { pct: Math.round(E.critChance() * 100) }) + '</div>' +
        '<div class="text-[11px] text-slate-500">' + Game.i18n.t('ui.growth.notes') + '</div>' +
        '</div>' +
        '<div class="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-1 pt-1">' + Game.i18n.t('ui.growth.skillTree', { n: p.skills.length }) + '</div>' +
        branchHtml +
        '<div class="text-[11px] font-bold text-emerald-300 uppercase tracking-wider px-1 pt-3">' + Game.i18n.t('ui.growth.journey') + '</div>' +
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
  /* 窄屏（<768px）：右上角功能按钮收进 ☰ 下拉菜单，方便手机点击（断点与 CSS 媒体查询一致） */
  let narrowHud = false;
  function applyResponsiveHud() {
    const mq = window.matchMedia && window.matchMedia('(max-width: 767px)');
    narrowHud = mq ? mq.matches : window.innerWidth <= 767;
    const row = $('hud-btns');
    const menu = $('more-menu');
    const more = $('btn-more');
    if (!row || !menu) return;
    if (narrowHud) {
      /* 按钮移入下拉菜单 */
      while (row.firstChild) menu.appendChild(row.firstChild);
      if (more) more.classList.remove('hidden');
    } else {
      /* 按钮移回横排行 */
      while (menu.firstChild) row.appendChild(menu.firstChild);
      if (more) more.classList.add('hidden');
      menu.classList.add('hidden');
    }
  }
  function toggleMoreMenu() {
    const menu = $('more-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
  }

  function init() {
    /* 顶部按钮（事件绑定后按钮可能被移入下拉菜单，事件保留） */
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
      /* 新游戏：游戏内确认面板（替代浏览器 confirm） */
      showModal('modal-confirm');
    });
    const resetYes = $('confirm-reset-yes');
    if (resetYes) {
      resetYes.addEventListener('click', () => {
        hideModal('modal-confirm');
        /* 开始全新游戏：清空存档并刷新（main.js 会跳过 beforeunload 自动存档） */
        if (Game.startNewGame) { Game.startNewGame(); return; }
        try { localStorage.removeItem('wfissave'); } catch (e) { /* ignore */ }
        location.reload();
      });
    }
    const resetNo = $('confirm-reset-no');
    if (resetNo) resetNo.addEventListener('click', () => hideModal('modal-confirm'));
    /* modal closes（新游戏确认面板不响应背景点击，防误关——只能 ✕/取消/确认） */
    for (const id of ['modal-inv', 'modal-friends', 'modal-guide', 'modal-growth']) {
      const m = $(id);
      if (!m) continue;
      m.addEventListener('click', (e) => { if (e.target === m) hideModal(id); });
      const close = m.querySelector('.modal-close');
      if (close) close.addEventListener('click', () => hideModal(id));
    }
    {
      const cm = $('modal-confirm');
      if (cm) {
        const close = cm.querySelector('.modal-close');
        if (close) close.addEventListener('click', () => hideModal('modal-confirm'));
      }
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
    /* 窄屏响应式：右上角按钮 ↔ ☰ 下拉菜单 */
    applyResponsiveHud();
    wire('btn-more', toggleMoreMenu);
    /* 点菜单内按钮后收起菜单 */
    const moreMenu = $('more-menu');
    if (moreMenu) {
      moreMenu.addEventListener('click', () => { if (narrowHud) moreMenu.classList.add('hidden'); });
    }
    const onResize = () => { applyResponsiveHud(); };
    if (window.matchMedia) {
      try { window.matchMedia('(max-width: 767px)').addEventListener('change', onResize); } catch (e) { /* older API */ }
    }
    window.addEventListener('resize', onResize);
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
