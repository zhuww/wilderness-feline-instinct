/* ==========================================================================
   Wilderness Feline Instinct — main.js
   Game loop, input, time/weather, camera, cave logic, ambient effects,
   save/load, boot.
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;

  const DAY_LEN = 720; /* real seconds per in-game day (12 min) */
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const state = {
    seed: (Math.random() * 0xffffffff) >>> 0,
    baseSeed: 0,
    zone: 0,
    bossDefeated: { 0: false, 1: false, 2: false, 3: false },
    sec: (8 * DAY_LEN) / 24,   /* start at 08:00 */
    day: 1,
    weather: 'clear',
    weatherT: 55,
    cave: false,
    hour: 8, night: 0, warm: 0,
    cam: { x: 0, y: 0 },
    shakeT: 0, shakeMag: 0, camShake: { x: 0, y: 0 },
    fade: 0, fadeTarget: 0, fadeCb: null,
    saveT: 20,
    DAY_LEN,
    sniffRange: 1750,
    caveFire: null, caveBed: null, caveRack: null, caveExit: null,
    journey: { preyCaught: 0, predatorsSlain: 0, challengesWon: 0, petsAdopted: 0, fishCaught: 0, xpTotal: 0 },
  };
  Game.state = state;

  const input = {
    up: false, down: false, left: false, right: false, sneak: false,
    pounce: false, sniff: false, groom: false, interact: false,
    vjoy: { x: 0, y: 0 },
  };
  Game.input = input;

  const view = { w: 0, h: 0, dpr: 1 };

  /* -------------------------------------------------------------- input */
  const keyMap = {
    KeyW: 'up', ArrowUp: 'up',
    KeyS: 'down', ArrowDown: 'down',
    KeyA: 'left', ArrowLeft: 'left',
    KeyD: 'right', ArrowRight: 'right',
  };

  window.addEventListener('keydown', (e) => {
    if (keyMap[e.code]) { input[keyMap[e.code]] = true; e.preventDefault(); return; }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { input.sneak = true; e.preventDefault(); return; }
    if (e.code === 'Space') { input.pounce = true; e.preventDefault(); return; }
    if (e.code === 'KeyE') { input.sniff = true; e.preventDefault(); return; }
    if (e.code === 'KeyQ') { input.groom = true; e.preventDefault(); return; }
    if (e.code === 'KeyF') { input.interact = true; e.preventDefault(); return; }
    if (e.code === 'KeyR') { Game.entities.summonCompanion && Game.entities.summonCompanion(); return; }
    if (e.code === 'Escape') { Game.ui.hideAllModals(); return; }
    if (e.code === 'KeyI') { Game.ui.showModal('modal-inv'); return; }
    if (e.code === 'KeyG') { Game.ui.showModal('modal-guide'); return; }
    if (e.code === 'KeyB') { Game.ui.showModal('modal-friends'); return; }
  });
  window.addEventListener('keyup', (e) => {
    if (keyMap[e.code]) input[keyMap[e.code]] = false;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') input.sneak = false;
  });
  /* first gesture unlocks audio */
  window.addEventListener('pointerdown', () => { Game.sfx && Game.sfx.resume && Game.sfx.resume(); }, { once: true });

  function buildInput() {
    return {
      mx: (input.right ? 1 : 0) - (input.left ? 1 : 0) + input.vjoy.x,
      my: (input.down ? 1 : 0) - (input.up ? 1 : 0) + input.vjoy.y,
      sneak: input.sneak,
      pounce: input.pounce, sniff: input.sniff, groom: input.groom, interact: input.interact,
    };
  }

  /* --------------------------------------------------------- time/weather */
  function updateTime(dt) {
    state.sec += dt;
    if (state.sec >= state.DAY_LEN) { state.sec -= state.DAY_LEN; state.day++; }
    const h = (state.sec / state.DAY_LEN) * 24;
    state.hour = h;
    const sun = Math.cos(((h - 6) / 12) * Math.PI);
    state.night = U.clamp(-sun, 0, 1);
    state.warm = Math.exp(-Math.abs(h - 6.5) * 1.4) * 0.2 + Math.exp(-Math.abs(h - 18.5) * 1.4) * 0.2;
  }

  function rollWeather() {
    const r = Math.random();
    if (r < 0.55) state.weather = 'clear';
    else if (r < 0.85) state.weather = 'rain';
    else state.weather = 'mist';
    state.weatherT = U.randRange(40, 90);
    const meta = { clear: '☀️ 天空放晴了。', rain: '🌧️ 开始下雨了……', mist: '🌫️ 一阵轻雾弥漫开来。' };
    Game.ui.log(meta[state.weather], 'info');
    if (state.weather === 'rain') {
      Game.particles.wind.targetSpeed = Math.min(1.35, Game.particles.wind.targetSpeed + 0.4);
    } else {
      Game.particles.wind.targetSpeed = Math.max(0.25, Game.particles.wind.targetSpeed - 0.3);
    }
  }

  /* --------------------------------------------------------------- camera */
  function updateCamera(dt) {
    const p = Game.entities.player;
    const ww = state.cave ? Game.render.CAVE.w : Game.world.W * Game.world.TILE;
    const wh = state.cave ? Game.render.CAVE.h : Game.world.H * Game.world.TILE;
    const tx = p.x - view.w / 2, ty = p.y - view.h / 2;
    const k = Math.min(1, dt * 5);
    state.cam.x += (tx - state.cam.x) * k;
    state.cam.y += (ty - state.cam.y) * k;
    state.cam.x = U.clamp(state.cam.x, 0, Math.max(0, ww - view.w));
    state.cam.y = U.clamp(state.cam.y, 0, Math.max(0, wh - view.h));
    if (state.shakeT > 0) {
      state.shakeT -= dt;
      const m = Math.max(0, state.shakeT) * state.shakeMag;
      state.camShake.x = U.randRange(-m, m);
      state.camShake.y = U.randRange(-m, m);
    } else {
      state.camShake.x = 0;
      state.camShake.y = 0;
    }
  }

  /* ---------------------------------------------------------------- cave */
  const CAVE_WORK = { x: 250, y: 500 };   /* 工作台：制作物品 */
  state.caveInteract = function () {
    const p = Game.entities.player;
    const fire = Game.render.CAVE_FIRE, bed = Game.render.CAVE_BED, exit = Game.render.CAVE_EXIT;
    /* 工作台：打开制作面板 */
    if (U.dist2(p.x, p.y, CAVE_WORK.x, CAVE_WORK.y) < 80 * 80) {
      Game.ui.openCrafting && Game.ui.openCrafting();
      Game.ui.log('🛠 你在工作台前准备制作物品。', 'craft');
      return;
    }
    if (U.dist2(p.x, p.y, fire.x, fire.y) < 115 * 115) {
      if (Game.entities.countItem('salmon') > 0) {
        Game.entities.removeItem('salmon', 1);
        Game.entities.addItem('cooked_salmon');
        Game.ui.log('🔥 在篝火上烤好了一条河鲑！', 'good');
        Game.sfx && Game.sfx.craft();
      } else if (p.stats.wetness > 5) {
        p.stats.wetness = 0;
        Game.ui.log('🔥 你在火边烘干了毛发，暖烘烘的！', 'good');
      } else {
        Game.ui.log('🔥 篝火噼啪作响。（带条河鲑来烤）', 'info');
      }
      return;
    }
    if (U.dist2(p.x, p.y, bed.x, bed.y) < 95 * 95) {
      Game.ui.log('😴 你在柔软的稻草床上蜷成一团……', 'info');
      Game.sfx && Game.sfx.cave();
      Game.ui.fadeTo(1, () => {
        state.sec = 6.5 * (state.DAY_LEN / 24);
        state.day++;
        const s = p.stats;
        s.hp = Math.min(s.hpMax, s.hp + 34);
        s.stamina = s.staminaMax;   /* 睡醒体力全满 */
        s.mood = Math.min(s.moodMax, s.mood + 18);
        s.satiety = Math.min(s.satietyMax, s.satiety + 4);
        s.wetness = 0;
        Game.ui.log('🌅 你在黎明中醒来，精神焕发。（+34 生命，体力全满）', 'good');
        Game.ui.fadeTo(0, null);
      });
      return;
    }
    /* 出口判定范围加大，出生点也能直接按 F 出去 */
    if (U.dist2(p.x, p.y, exit.x, exit.y) < 135 * 135) {
      Game.entities.exitCave();
      return;
    }
    Game.ui.log('🏕️ 洞穴里安静又安全。（在火堆、床、工作台或出口旁按 F）', 'info');
  };

  function updateCave(dt, inp) {
    const p = Game.entities.player;
    p.animT += dt;
    p.hurtT = Math.max(0, p.hurtT - dt);
    p.interactCd = Math.max(0, p.interactCd - dt);   /* 关键修复：洞穴里冷却也要走表 */
    let mx = inp.mx, my = inp.my;
    const len = Math.hypot(mx, my);
    if (len > 0) { mx /= len; my /= len; }
    const spd = inp.sneak ? 62 : 150;
    p.x = U.clamp(p.x + mx * spd * dt, 46, Game.render.CAVE.w - 46);
    p.y = U.clamp(p.y + my * spd * dt, 70, Game.render.CAVE.h - 34);
    if (len > 0) { p.facing = Math.atan2(my, mx); p.state = 'walk'; }
    else p.state = 'idle';
    /* 洞穴中也正常消耗/恢复体力：休息时逐渐回满 */
    const wetPenalty = p.stats.wetness > 40 ? 1 - (p.stats.wetness - 40) / 100 * 0.7 : 1;
    if (len > 0) {
      p.stats.stamina = Math.max(0, p.stats.stamina - dt * 3.2);
    } else {
      p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + dt * 7 * wetPenalty * (p.equipped.hat ? 1.25 : 1) * (p.skills.includes('swift') ? 1.25 : 1));
    }
    if (inp.interact) Game.entities.interact();
    if (inp.pounce) Game.ui.log('😺 这里施展不开扑击！', 'info');
  }

  /* ------------------------------------------------------------- ambient */
  function updateAmbient(dt) {
    const st = state, p = Game.entities.player;
    for (const f of Game.world.features) if (f.regrowT > 0) f.regrowT = Math.max(0, f.regrowT - dt);

    /* drifting leaves near forest */
    if (Math.random() < dt * 9) {
      const tx = U.randInt(0, Game.world.W - 1), ty = U.randInt(0, Game.world.H - 1);
      if (Game.world.terrain[Game.world.idx(tx, ty)] === Game.world.T.FOREST) {
        const wx = (tx + 0.5) * Game.world.TILE, wy = (ty + 0.5) * Game.world.TILE;
        if (wx > st.cam.x - 60 && wx < st.cam.x + view.w + 60 && wy > st.cam.y - 60 && wy < st.cam.y + view.h + 60) {
          const w = Game.particles.wind;
          Game.particles.spawn({
            x: wx, y: wy,
            vx: Math.cos(w.angle) * (30 + w.speed * 60),
            vy: Math.sin(w.angle) * (30 + w.speed * 60) + 6,
            life: U.randRange(3, 5), size: U.randRange(2.5, 4.2),
            color: U.pick(['rgba(190,120,50,0.9)', 'rgba(170,90,40,0.9)', 'rgba(120,160,70,0.9)']),
            kind: 'leaf', drag: 0.12, vr: U.randRange(-2, 2), grav: 4,
          });
        }
      }
    }
    /* fireflies near water at night */
    if (st.night > 0.5 && Math.random() < dt * 2.2) {
      const tx = U.randInt(0, Game.world.W - 1), ty = U.randInt(0, Game.world.H - 1);
      if (Game.world.isWater(tx, ty)) {
        const wx = (tx + 0.5) * Game.world.TILE, wy = (ty + 0.5) * Game.world.TILE;
        if (wx > st.cam.x - 60 && wx < st.cam.x + view.w + 60 && wy > st.cam.y - 60 && wy < st.cam.y + view.h + 60) {
          Game.particles.spawn({
            x: wx + U.randRange(-10, 10), y: wy + U.randRange(-10, 10),
            kind: 'glow', size: 4.5, color: 'rgba(210,255,140,0.5)',
            vx: U.randRange(-8, 8), vy: U.randRange(-8, -2), life: 2.6, drag: 0.3,
          });
        }
      }
    }
    /* passive predator scent (danger sense) */
    if (Math.random() < dt * 2) {
      for (const e of Game.entities.list) {
        if (e.kind === 'predator' && e.alive && U.dist2(e.x, e.y, p.x, p.y) < 640 * 640) {
          Game.particles.emitScent('predator', e.x, e.y, false);
          break;
        }
      }
    }
  }

  /* ---------------------------------------------------------------- fade */
  function updateFade(dt) {
    const st = state;
    if (st.fade < st.fadeTarget) {
      st.fade = Math.min(st.fadeTarget, st.fade + dt * 1.4);
      if (st.fade >= st.fadeTarget && st.fadeCb) {
        const cb = st.fadeCb;
        st.fadeCb = null;
        cb();
      }
    } else if (st.fade > st.fadeTarget) {
      st.fade = Math.max(st.fadeTarget, st.fade - dt * 1.4);
    }
  }

  /* ------------------------------------------------------------- save/load */
  function save() {
    try {
      const p = Game.entities.player;
      const data = {
        seed: state.seed, baseSeed: state.baseSeed, zone: state.zone,
        bossDefeated: state.bossDefeated,
        sec: state.sec, day: state.day, weather: state.weather,
        px: p.x, py: p.y, inCave: p.inCave, ox: p.outside.x, oy: p.outside.y,
        hp: p.stats.hp, satiety: p.stats.satiety, hydration: p.stats.hydration,
        stamina: p.stats.stamina, mood: p.stats.mood, wetness: p.stats.wetness,
        inventory: p.inventory, equipped: p.equipped,
        level: p.level, xp: p.xp, skills: p.skills, skillPoints: p.skillPoints,
        summonCd: p.summonCd,
        journey: state.journey,
        friends: Game.entities.companions.map((c) => ({ name: c.name, friendship: c.friendship, perk: c.perk, colorIdx: c.colorIdx })),
      };
      localStorage.setItem('wfissave', JSON.stringify(data));
    } catch (e) { /* storage unavailable */ }
  }

  function tryLoad() {
    try {
      const raw = localStorage.getItem('wfissave');
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (typeof d.seed !== 'number') return null;
      state.seed = d.seed;
      state.baseSeed = d.baseSeed || d.seed;
      state.zone = d.zone || 0;
      if (d.bossDefeated) state.bossDefeated = d.bossDefeated;
      state.sec = d.sec;
      state.day = d.day;
      state.weather = d.weather;
      return d;
    } catch (e) { return null; }
  }

  function applySave(d) {
    const p = Game.entities.player;
    p.x = d.px; p.y = d.py;
    p.inCave = !!d.inCave;
    p.outside.x = d.ox; p.outside.y = d.oy;
    p.stats.hp = d.hp;
    p.stats.satiety = d.satiety;
    p.stats.hydration = d.hydration;
    p.stats.stamina = d.stamina;
    p.stats.mood = d.mood;
    p.stats.wetness = d.wetness;
    p.inventory = d.inventory || [];
    p.equipped = d.equipped || { hat: null, collar: null };
    p.level = d.level || 1;
    p.xp = d.xp || 0;
    p.skills = d.skills || [];
    p.skillPoints = d.skillPoints || 0;
    p.summonCd = d.summonCd || 0;
    if (d.journey) state.journey = Object.assign({}, state.journey, d.journey);
    Game.entities.recalcMaxStats(p);
    Game.entities.companions.forEach((c, i) => {
      const f = d.friends && d.friends[i];
      if (f) { c.name = f.name; c.friendship = f.friendship; c.perk = f.perk; c.colorIdx = f.colorIdx; }
    });
    if (p.inCave) {
      state.cave = true;
      p.x = U.clamp(p.x, 46, Game.render.CAVE.w - 46);
      p.y = U.clamp(p.y, 70, Game.render.CAVE.h - 34);
    }
  }

  /* ----------------------------------------------------------------- loop */
  function update(dt) {
    const st = state;
    updateTime(dt);
    if (st.weatherT <= 0) rollWeather();
    else st.weatherT -= dt;

    const inp = buildInput();
    if (st.cave) updateCave(dt, inp);
    else {
      Game.entities.update(dt, inp);
      updateAmbient(dt);
    }
    Game.challenges.update(dt);
    Game.entities.updateVitals(dt);
    Game.particles.updateWind(dt);
    Game.particles.update(dt);
    updateCamera(dt);
    updateFade(dt);
    Game.render.refreshBokeh(dt);
    Game.ui.updateHUD();

    /* consume one-shot actions */
    input.pounce = false;
    input.sniff = false;
    input.groom = false;
    input.interact = false;

    st.saveT -= dt;
    if (st.saveT <= 0) { st.saveT = 20; save(); }
  }

  function render() {
    const dpr = view.dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const p = Game.entities.player;
    const cam = { x: state.cam.x + state.camShake.x, y: state.cam.y + state.camShake.y };
    const v = {
      w: view.w, h: view.h, cam,
      time: state.sec, hour: state.hour,
      night: state.night, warm: state.warm,
      weather: state.weather, fade: state.fade,
      playerX: p.x - cam.x, playerY: p.y - cam.y,
    };
    if (state.cave) Game.render.drawCave(ctx, v);
    else Game.render.draw(ctx, v);
  }

  /* ------------------------------------------------------------ resize */
  function resize() {
    view.dpr = Math.min(2, window.devicePixelRatio || 1);
    view.w = window.innerWidth;
    view.h = window.innerHeight;
    canvas.width = Math.floor(view.w * view.dpr);
    canvas.height = Math.floor(view.h * view.dpr);
    canvas.style.width = view.w + 'px';
    canvas.style.height = view.h + 'px';
  }
  window.addEventListener('resize', resize);

  /* --------------------------------------------------------- 区域传送 */
  function arrivalPos(to, from) {
    const TILE = Game.world.TILE;
    const WW = Game.world.W, HH = Game.world.H;
    if (to === 1) return { x: (WW / 2) * TILE, y: (HH - 6) * TILE };
    if (to === 2) return { x: 8 * TILE, y: (HH / 2) * TILE };
    if (to === 3) return { x: (WW - 8) * TILE, y: (HH / 2) * TILE };
    /* 返回荒野 */
    if (from === 1) return { x: (WW / 2) * TILE, y: 8 * TILE };
    if (from === 2) return { x: (WW - 8) * TILE, y: (HH / 2) * TILE };
    return { x: 8 * TILE, y: (HH / 2) * TILE };
  }

  function transitionZone(f) {
    const p = Game.entities.player;
    if (p.level < f.minLevel) {
      Game.ui.log(`⛔ 需要 ${f.minLevel} 级才能进入【${f.label}】（当前 ${p.level} 级）`, 'danger');
      return;
    }
    const to = f.to;
    const from = state.zone;
    const pos = arrivalPos(to, from);
    Game.ui.fadeTo(1, () => {
      state.zone = to;
      state.seed = state.baseSeed + to * 7919;
      Game.world.generate(state.seed, to);
      Game.entities.init(to, pos, true);
      state.cave = false;
      Game.ui.log(`⛩ 你进入了【${Game.world.ZONE_INFO[to].name}】！`, 'good');
      Game.sfx && Game.sfx.cave();
      Game.ui.fadeTo(0, null);
    });
  }
  Game.transitionZone = transitionZone;

  /* -------------------------------------------------------------- boot */
  function boot() {
    resize();
    const save = tryLoad();
    state.baseSeed = state.baseSeed || state.seed;
    Game.world.generate(state.seed, state.zone);
    Game.render.init();
    Game.entities.init(state.zone, null, false);
    state.caveFire = Game.render.CAVE_FIRE;
    state.caveBed = Game.render.CAVE_BED;
    state.caveRack = Game.render.CAVE_RACK;
    state.caveExit = Game.render.CAVE_EXIT;
    if (save) applySave(save);
    Game.ui.init();

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      render();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    window.addEventListener('beforeunload', save);
    setTimeout(() => {
      Game.ui.log('🐱 你在荒野中醒来。相信你的本能——按 E 嗅探！', 'info');
    }, 400);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
