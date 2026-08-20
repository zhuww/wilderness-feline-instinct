/* ==========================================================================
   Wilderness Feline Instinct — challenges.js
   Periodic survival challenges that refresh every 60–120s:
     · Rival cats invade your territory (pounce them away!)
     · A wild dog chases you (run, hide in grass or a cave!)
     · A thunderstorm with lightning strikes (seek shelter!)
     · Salmon run (guaranteed fishing!)
     · Viper swarm (fight them off!)
     · Wolf pack (fight or flee!)
     · Boar stampede (dodge the charge!)
     · Hawk dive (dodge the bird of prey!)
     · Dense fog (reach the beacon!)
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;
  const W = Game.world;

  /* i18n 翻译助手：i18n.js 先于本文件加载，缺失时回退原 key */
  const tr = (k, v) => (Game.i18n && typeof Game.i18n.t === 'function') ? Game.i18n.t(k, v) : k;

  const WEIGHTS = { rival: 0.14, dog: 0.14, storm: 0.12, salmon: 0.10, viper: 0.11, wolf: 0.13, stampede: 0.08, eagle: 0.09, fog: 0.09 };
  const DUR = { rival: 75, dog: 65, storm: 45, salmon: 45, viper: 35, wolf: 55, stampede: 25, eagle: 45, fog: 60 };

  const ch = {
    current: null,
    nextIn: 75,           /* first challenge after 75s of play */
    entities: [],
  };
  let strike = null;      /* lightning strike: {x, y, warn} */
  let eagle = null;       /* hawk dive marker: {sx, sy, tx, ty, t, dur} */

  /* ------------------------------------------------------------- helpers */
  function findSpot(cx, cy, minD, maxD) {
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * U.TAU;
      const d = minD + Math.random() * (maxD - minD);
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d;
      const t = W.tileAt(x, y);
      if (W.inBounds(t.tx, t.ty) && W.canWalk(t.tx, t.ty) && W.terrain[W.idx(t.tx, t.ty)] !== W.T.FOREST) {
        return { x, y };
      }
    }
    return null;
  }

  function rollType() {
    let total = 0;
    for (const t in WEIGHTS) total += WEIGHTS[t];
    let r = Math.random() * total;
    for (const t in WEIGHTS) {
      r -= WEIGHTS[t];
      if (r <= 0) return t;
    }
    return 'rival';
  }

  /* 挑战横幅：存 i18n key（title/desc），渲染时用 tr() 翻译 */
  const BANNERS = {
    rival: ['challenge.rival.title', 'challenge.rival.desc'],
    dog: ['challenge.dog.title', 'challenge.dog.desc'],
    storm: ['challenge.storm.title', 'challenge.storm.desc'],
    salmon: ['challenge.salmon.title', 'challenge.salmon.desc'],
    viper: ['challenge.viper.title', 'challenge.viper.desc'],
    wolf: ['challenge.wolf.title', 'challenge.wolf.desc'],
    stampede: ['challenge.stampede.title', 'challenge.stampede.desc'],
    eagle: ['challenge.eagle.title', 'challenge.eagle.desc'],
    fog: ['challenge.fog.title', 'challenge.fog.desc'],
  };

  /* ------------------------------------------------------------- spawning */
  function start(type) {
    const p = Game.entities.player;
    const c = { type, t: 0, dur: DUR[type] || 60, ended: false };
    ch.entities.length = 0;
    switch (type) {
      case 'rival': {
        const n = 2 + (Math.random() < 0.4 ? 1 : 0);
        for (let i = 0; i < n; i++) {
          const s = findSpot(p.x, p.y, 300, 560);
          if (!s) continue;
          const target = findSpot(p.x, p.y, 90, 210) || { x: p.x, y: p.y };
          ch.entities.push({
            kind: 'rival', x: s.x, y: s.y, r: 12, speed: 105, dir: Math.random() * U.TAU,
            animT: Math.random() * 10, hp: 2 + Math.floor((p.level - 1) / 4), state: 'march', target,
            markT: U.randRange(3, 6), swatCd: 0, scentT: U.randRange(0.2, 0.8), alive: true,
            colorIdx: U.randInt(0, 2),
          });
        }
        Game.ui.log(tr('log.challenge.rival.start'), 'danger');
        Game.sfx && Game.sfx.alert();
        break;
      }
      case 'dog': {
        const s = findSpot(p.x, p.y, 420, 680);
        if (s) {
          ch.entities.push({
            kind: 'dog', x: s.x, y: s.y, r: 15, speed: 216, dir: Math.random() * U.TAU,
            animT: Math.random() * 10, state: 'chase', tetherX: s.x, tetherY: s.y,
            attackCd: 0, bites: 0, loseT: 0, staggerT: 0, barkT: 0, scentT: 0, alive: true,
          });
          Game.ui.log(tr('log.challenge.dog.start'), 'danger');
          Game.sfx && Game.sfx.bark();
        }
        break;
      }
      case 'storm': {
        /* 记录进入风暴前的天气，结束时恢复，避免天气永久卡在 rain（低30） */
        c.prevWeather = Game.state.weather;
        c.prevWeatherT = Game.state.weatherT;
        Game.ui.log(tr('log.challenge.storm.start'), 'danger');
        Game.sfx && Game.sfx.thunder();
        Game.state.weather = 'rain';
        break;
      }
      case 'salmon': {
        Game.ui.log(tr('log.challenge.salmon.start'), 'good');
        Game.sfx && Game.sfx.craft();
        break;
      }
      case 'viper': {
        for (let i = 0; i < 6; i++) {
          const s = findSpot(p.x, p.y, 280, 480);
          if (!s) continue;
          ch.entities.push({
            kind: 'viper', x: s.x, y: s.y, r: 7, speed: 56, dir: Math.random() * U.TAU,
            animT: Math.random() * 10, hp: Game.entities.scaledHp(12), dmg: Game.entities.scaledDmg(10), state: 'chase',
            attackCd: 0, wanderT: U.randRange(0.5, 2), scentT: U.randRange(0.2, 0.8), alive: true,
          });
        }
        Game.ui.log(tr('log.challenge.viper.start'), 'danger');
        Game.sfx && Game.sfx.alert();
        break;
      }
      case 'wolf': {
        c.bites = 0;
        const n = 2 + (Math.random() < 0.5 ? 1 : 0);
        for (let i = 0; i < n; i++) {
          const s = findSpot(p.x, p.y, 380, 620);
          if (!s) continue;
          ch.entities.push({
            kind: 'wolf', x: s.x, y: s.y, r: 14, speed: 196, dir: Math.random() * U.TAU,
            animT: Math.random() * 10, hp: 2 + Math.floor((p.level - 1) / 4), dmg: Game.entities.scaledDmg(12), state: 'chase',
            attackCd: 0, staggerT: 0, scentT: U.randRange(0.2, 0.8), alive: true,
          });
        }
        Game.ui.log(tr('log.challenge.wolf.start'), 'danger');
        Game.sfx && Game.sfx.alert();
        break;
      }
      case 'stampede': {
        for (let i = 0; i < 4; i++) {
          const a = Math.random() * U.TAU;
          const d = 680 + Math.random() * 220;
          ch.entities.push({
            kind: 'stampede', x: p.x + Math.cos(a) * d, y: p.y + Math.sin(a) * d,
            r: 15, dir: (a + Math.PI) % U.TAU, speed: 300 + Math.random() * 90,
            animT: Math.random() * 10, state: 'charge', chasing: true,
            damageCd: 0, alive: true,
          });
        }
        Game.ui.log(tr('log.challenge.stampede.start'), 'danger');
        Game.sfx && Game.sfx.alert();
        break;
      }
      case 'eagle': {
        c.dives = 3 + U.randInt(0, 2);
        c.nextDive = 1.8;
        Game.ui.log(tr('log.challenge.eagle.start'), 'danger');
        Game.sfx && Game.sfx.alert();
        break;
      }
      case 'fog': {
        const f = W.findNearest(['cave', 'spring'], p.x, p.y, 3200);
        if (!f) {
          /* no shelter nearby — reschedule */
          endChallenge();
          ch.nextIn = 30;
          return;
        }
        c.target = { x: (f.tx + 0.5) * W.TILE, y: (f.ty + 0.5) * W.TILE };
        c.targetName = f.type === 'cave' ? 'cave' : 'spring';
        Game.ui.log(tr('log.challenge.fog.start', { name: tr(c.targetName === 'cave' ? 'misc.cave' : 'misc.spring') }), 'danger');
        Game.sfx && Game.sfx.cave();
        break;
      }
    }
    ch.current = c;
    if (ch.entities.length === 0 && type !== 'storm' && type !== 'salmon' && type !== 'eagle' && type !== 'fog') {
      /* nothing could spawn — reschedule instead of an empty challenge */
      endChallenge();
      ch.nextIn = 30;
    }
  }

  /* -------------------------------------------------------------- combat */
  function hitRival(e) {
    e.hp -= 1;
    e.hurtT = 0.5;
    Game.ui.log(tr('log.challenge.rival.hit'), 'combat');
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: 22, color: 'rgba(255,140,60,0.8)', life: 0.35 });
    if (e.hp <= 0) {
      e.state = 'flee';
      Game.ui.log(tr('log.challenge.rival.fled'), 'good');
    }
  }

  function hitDog(e) {
    e.staggerT = 1.6;      /* stunned — the chase pauses, run! */
    e.state = 'search';
    Game.ui.log(tr('log.challenge.dog.stun'), 'combat');
    Game.sfx && Game.sfx.hurt();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: 26, color: 'rgba(255,200,120,0.8)', life: 0.4 });
  }

  function hitViper(e) {
    e.hp -= 16;
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: 18, color: 'rgba(120,220,120,0.8)', life: 0.3 });
    if (e.hp <= 0) {
      e.alive = false;
      Game.entities.addItem('herbs', 1);
      Game.ui.log(tr('log.challenge.viper.kill'), 'combat');
    }
  }

  function hitWolf(e) {
    e.hp -= 1;
    e.staggerT = 1.4;
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: 24, color: 'rgba(160,160,190,0.8)', life: 0.35 });
    if (e.hp <= 0) {
      e.alive = false;
      Game.entities.addXp(18);
      Game.ui.log(tr('log.challenge.wolf.kill'), 'combat');
    } else {
      Game.ui.log(tr('log.challenge.wolf.stagger'), 'combat');
    }
  }

  /* ------------------------------------------------------------- updates */
  function updateRival(e, dt) {
    const p = Game.entities.player;
    e.animT += dt;
    e.swatCd = Math.max(0, e.swatCd - dt);
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('rival', e.x, e.y, p.sniff.active);
      e.scentT = p.sniff.active ? 0.15 : 0.9;
    }
    if (e.state === 'flee') {
      const a = Math.atan2(e.y - p.y, e.x - p.x);
      e.dir = a;
      e.x += Math.cos(a) * e.speed * 1.7 * dt;
      e.y += Math.sin(a) * e.speed * 1.7 * dt;
      if (U.dist(e.x, e.y, p.x, p.y) > 950) e.alive = false;
      return;
    }
    const d = U.dist(e.x, e.y, e.target.x, e.target.y);
    if (d > 36) {
      e.dir = Math.atan2(e.target.y - e.y, e.target.x - e.x);
      e.x += Math.cos(e.dir) * e.speed * dt;
      e.y += Math.sin(e.dir) * e.speed * dt;
    } else {
      /* marking territory */
      e.markT -= dt;
      if (e.markT <= 0) {
        e.markT = 7;
        if (!ch.current.marked) {
          ch.current.marked = true;
          Game.ui.log(tr('log.challenge.rival.mark'), 'danger');
        }
        Game.particles.spawn({ x: e.x, y: e.y, kind: 'puff', size: 7, color: 'rgba(255,150,60,0.55)', life: 0.9 });
      }
    }
    /* swat if the player gets too close */
    const dp = U.dist(e.x, e.y, p.x, p.y);
    if (dp < 36 && e.swatCd <= 0) {
      e.swatCd = 2.5;
      const swatDmg = Game.entities.scaledDmg(5);
      Game.entities.damagePlayer(swatDmg);
      Game.ui.log(tr('log.challenge.rival.swat', { n: swatDmg }), 'danger');
    }
  }

  function updateDog(e, dt) {
    const p = Game.entities.player;
    e.animT += dt;
    e.attackCd = Math.max(0, e.attackCd - dt);
    e.staggerT = Math.max(0, e.staggerT - dt);
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('predator', e.x, e.y, p.sniff.active);
      e.scentT = p.sniff.active ? 0.15 : 0.8;
    }
    /* hiding in the cave = escape */
    if (p.inCave) {
      e.state = 'leave';
      const a = Math.atan2(e.tetherY - e.y, e.tetherX - e.x);
      e.dir = a;
      e.x += Math.cos(a) * e.speed * 1.4 * dt;
      e.y += Math.sin(a) * e.speed * 1.4 * dt;
      if (U.dist(e.x, e.y, e.tetherX, e.tetherY) < 40) e.alive = false;
      return;
    }
    const dp = U.dist(e.x, e.y, p.x, p.y);
    /* detection — 潜行侦测统一（中18）：改用 entities 导出的 sneakFactor 系数，
       与捕食者/流浪狗同一套规则（潜行+高草 0.35 / 潜行 0.55 / 高草 0.8，含 camo 加成），
       删除本地硬编码分支；430 为狗的基础侦测半径 */
    let detect = 430 * (Game.entities.sneakFactor ? Game.entities.sneakFactor() : 1);

    if (e.staggerT > 0) {
      e.state = 'search';
      e.loseT += dt;
      if (e.loseT > 4) e.state = 'leave';
      return;
    }

    if (dp < detect) {
      e.state = 'chase';
      e.loseT = 0;
    } else {
      e.loseT += dt;
      if (e.loseT > 7) e.state = 'leave';
    }

    if (e.state === 'chase') {
      const dteth = U.dist(e.x, e.y, e.tetherX, e.tetherY);
      let spd = e.speed;
      if (dteth > 700) spd *= U.clamp(1 - (dteth - 700) / 700, 0.55, 1);
      e.dir = Math.atan2(p.y - e.y, p.x - e.x);
      e.x += Math.cos(e.dir) * spd * dt;
      e.y += Math.sin(e.dir) * spd * dt;
      if (dp < e.r + p.r + 6 && e.attackCd <= 0) {
        e.attackCd = 1.3;
        e.bites++;
        const biteDmg = Game.entities.scaledDmg(14);
        Game.entities.damagePlayer(biteDmg);
        Game.ui.log(tr('log.challenge.dog.bite', { n: biteDmg }), 'danger');
        Game.ui.redFlash && Game.ui.redFlash();
        Game.ui.shake && Game.ui.shake();
        if (e.bites >= 2) {
          Game.ui.log(tr('log.challenge.dog.mauled'), 'danger');
          fail('dog');
          return;
        }
      }
      e.barkT -= dt;
      if (e.barkT <= 0) {
        e.barkT = U.randRange(4, 9);
        Game.ui.log(tr('log.challenge.dog.bark'), 'danger');
        Game.sfx && Game.sfx.bark();
      }
    } else if (e.state === 'leave') {
      const a = Math.atan2(e.tetherY - e.y, e.tetherX - e.x);
      e.dir = a;
      e.x += Math.cos(a) * e.speed * 1.2 * dt;
      e.y += Math.sin(a) * e.speed * 1.2 * dt;
      if (U.dist(e.x, e.y, e.tetherX, e.tetherY) < 40) e.alive = false;
    } else if (e.state === 'search') {
      /* sniffing around after losing the trail */
      if (Math.random() < dt * 2) e.dir += U.randRange(-0.8, 0.8);
      e.x += Math.cos(e.dir) * e.speed * 0.5 * dt;
      e.y += Math.sin(e.dir) * e.speed * 0.5 * dt;
    }
  }

  function updateViperC(e, dt) {
    const p = Game.entities.player;
    e.animT += dt;
    e.attackCd = Math.max(0, e.attackCd - dt);
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('predator', e.x, e.y, p.sniff.active);
      e.scentT = p.sniff.active ? 0.15 : 0.8;
    }
    const dp = U.dist(e.x, e.y, p.x, p.y);
    if (dp < 320) {
      e.state = 'chase';
      e.dir = Math.atan2(p.y - e.y, p.x - e.x);
      e.x += Math.cos(e.dir) * e.speed * dt;
      e.y += Math.sin(e.dir) * e.speed * dt;
      if (dp < e.r + p.r + 6 && e.attackCd <= 0) {
        e.attackCd = 1.2;
        const biteDmg = Game.entities.scaledDmg(10);
        Game.entities.damagePlayer(biteDmg);
        Game.ui.log(tr('log.challenge.viper.bite', { n: biteDmg }), 'danger');
      }
    } else {
      e.state = 'wander';
      if (e.wanderT <= 0) { e.dir = Math.random() * U.TAU; e.wanderT = U.randRange(1, 2.5); }
      e.wanderT -= dt;
      e.x += Math.cos(e.dir) * e.speed * 0.3 * dt;
      e.y += Math.sin(e.dir) * e.speed * 0.3 * dt;
    }
  }

  function updateWolf(e, dt) {
    const p = Game.entities.player;
    e.animT += dt;
    e.attackCd = Math.max(0, e.attackCd - dt);
    e.staggerT = Math.max(0, e.staggerT - dt);
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('predator', e.x, e.y, p.sniff.active);
      e.scentT = p.sniff.active ? 0.15 : 0.8;
    }
    if (p.inCave) {
      /* escaped into the cave */
      e.dir = Math.atan2(e.y - p.y, e.x - p.x);
      e.x += Math.cos(e.dir) * e.speed * 1.5 * dt;
      e.y += Math.sin(e.dir) * e.speed * 1.5 * dt;
      if (U.dist(e.x, e.y, p.x, p.y) > 1000) e.alive = false;
      return;
    }
    if (e.staggerT > 0) return;
    const dp = U.dist(e.x, e.y, p.x, p.y);
    /* detection — 潜行侦测统一（中18）：与 updateDog 相同，统一使用 sneakFactor 系数；
       400 为狼的基础侦测半径 */
    let detect = 400 * (Game.entities.sneakFactor ? Game.entities.sneakFactor() : 1);
    if (dp < detect) {
      e.state = 'chase';
      e.dir = Math.atan2(p.y - e.y, p.x - e.x);
      e.x += Math.cos(e.dir) * e.speed * dt;
      e.y += Math.sin(e.dir) * e.speed * dt;
      if (dp < e.r + p.r + 6 && e.attackCd <= 0) {
        e.attackCd = 1.2;
        const c = ch.current;
        c.bites = (c.bites || 0) + 1;
        Game.entities.damagePlayer(e.dmg);
        Game.ui.log(tr('log.challenge.wolf.bite', { n: e.dmg }), 'danger');
        if (c.bites >= 3) { fail('wolf'); return; }
      }
    } else {
      e.state = 'wander';
      if (e.wanderT <= 0) { e.dir = Math.random() * U.TAU; e.wanderT = U.randRange(1, 2.5); }
      e.wanderT -= dt;
      e.x += Math.cos(e.dir) * e.speed * 0.3 * dt;
      e.y += Math.sin(e.dir) * e.speed * 0.3 * dt;
    }
  }

  function updateStampede(e, dt) {
    const p = Game.entities.player;
    e.animT += dt;
    e.damageCd = Math.max(0, e.damageCd - dt);
    e.x += Math.cos(e.dir) * e.speed * dt;
    e.y += Math.sin(e.dir) * e.speed * dt;
    /* wrap around the player so boars keep charging through */
    const R = 1000;
    if (e.x < p.x - R || e.x > p.x + R || e.y < p.y - R || e.y > p.y + R) {
      const a = Math.atan2(p.y - e.y, p.x - e.x) + U.randRange(-0.5, 0.5);
      e.dir = a;
      e.x = p.x + Math.cos(a) * 700;
      e.y = p.y + Math.sin(a) * 700;
    }
    const dp = U.dist(e.x, e.y, p.x, p.y);
    if (dp < e.r + p.r + 4 && e.damageCd <= 0) {
      e.damageCd = 1.0;
      const trample = Game.entities.scaledDmg(10);
      Game.entities.damagePlayer(trample);
      Game.ui.log(tr('log.challenge.stampede.hit', { n: trample }), 'danger');
    }
    /* kick up dust */
    if (Math.random() < dt * 8) {
      Game.particles.spawn({ x: e.x, y: e.y + 8, kind: 'puff', size: 6, color: 'rgba(160,140,100,0.4)', life: 0.5 });
    }
  }

  function updateEagle(dt) {
    const c = ch.current;
    if (c.dives <= 0) return;
    if (eagle) {
      eagle.t += dt;
      const k = Math.min(1, eagle.t / eagle.dur);
      if (k >= 1) {
        const p = Game.entities.player;
        const d = U.dist(p.x, p.y, eagle.tx, eagle.ty);
        Game.particles.spawn({ x: eagle.tx, y: eagle.ty, kind: 'ring', size: 30, color: 'rgba(255,200,150,0.8)', life: 0.35 });
        Game.particles.spawn({ x: eagle.tx, y: eagle.ty, kind: 'puff', size: 14, color: 'rgba(230,220,200,0.6)', life: 0.4 });
        Game.sfx && Game.sfx.pounce();
        if (!p.inCave && d < 62) {
          const clawDmg = Game.entities.scaledDmg(10);
          Game.entities.damagePlayer(clawDmg);
          Game.ui.log(tr('log.challenge.eagle.hit', { n: clawDmg }), 'danger');
        } else if (!p.inCave) {
          Game.ui.log(tr('log.challenge.eagle.miss'), 'info');
        }
        eagle = null;
        c.dives--;
        c.nextDive = U.randRange(2.5, 4.5);
      }
    } else {
      c.nextDive -= dt;
      if (c.nextDive <= 0) {
        const p = Game.entities.player;
        const a = Math.random() * U.TAU;
        const off = U.randRange(0, 100);
        const tx = p.x + Math.cos(a) * off;
        const ty = p.y + Math.sin(a) * off;
        eagle = {
          sx: tx + U.randRange(-50, 50), sy: ty - 260,
          tx, ty, t: 0, dur: 2.0,
        };
        Game.ui.log(tr('log.challenge.eagle.dive'), 'danger');
      }
    }
  }

  function updateFog(dt) {
    const c = ch.current;
    /* mist particles swirl */
    if (Math.random() < dt * 6) {
      Game.particles.spawn({
        x: Game.entities.player.x + U.randRange(-420, 420),
        y: Game.entities.player.y + U.randRange(-300, 300),
        kind: 'mist', size: U.randRange(90, 190), color: 'rgba(225,232,240,0.09)',
        vx: U.randRange(-10, 10), vy: U.randRange(-6, 6), life: 3.2, drag: 0.2,
      });
    }
  }

  function updateStorm(dt) {
    const c = ch.current;
    Game.state.weather = 'rain';
    c.strikeT = (c.strikeT || 2) - dt;
    if (strike) {
      strike.warn -= dt;
      if (strike.warn <= 0) {
        const p = Game.entities.player;
        const d = U.dist(p.x, p.y, strike.x, strike.y);
        Game.particles.spawn({ x: strike.x, y: strike.y, kind: 'ring', size: 44, color: 'rgba(255,240,180,0.9)', life: 0.4 });
        Game.particles.spawn({ x: strike.x, y: strike.y, kind: 'glow', size: 70, color: 'rgba(255,255,255,0.45)', life: 0.3 });
        Game.ui.flashWhite && Game.ui.flashWhite();
        Game.sfx && Game.sfx.thunder();
        if (!p.inCave) {
          if (d < 150) {
            const boltDmg = Game.entities.scaledDmg(12);
            Game.entities.damagePlayer(boltDmg);
            Game.ui.log(tr('log.challenge.storm.hit', { n: boltDmg }), 'danger');
            p.hurtT = 1.2;
          } else {
            Game.ui.log(tr('log.challenge.storm.far'), 'danger');
          }
        } else {
          Game.ui.log(tr('log.challenge.storm.safe'), 'info');
        }
        strike = null;
        c.strikeT = U.randRange(3, 6);
      }
    } else if (c.strikeT <= 0) {
      const p = Game.entities.player;
      const a = Math.random() * U.TAU;
      const d = 60 + Math.random() * 240;   /* 落点更近，闪电更有威胁 */
      strike = { x: p.x + Math.cos(a) * d, y: p.y + Math.sin(a) * d, warn: 1.0 };
      Game.ui.log(tr('log.challenge.storm.warn'), 'danger');
    }
  }

  /* ---------------------------------------------------------- outcomes */
  function stealFood() {
    const foodIds = ['salmon', 'cooked_salmon', 'mouse', 'grasshopper', 'berry', 'dried_catnip'];
    const have = foodIds.filter((id) => Game.entities.countItem(id) > 0);
    if (!have.length) return null;
    const id = U.pick(have);
    Game.entities.removeItem(id, 1);
    return Game.entities.ITEMS[id].name;
  }

  function checkEnd() {
    const c = ch.current;
    if (!c || c.ended) return;
    /* 存活计数：原地遍历计数，避免每帧 filter 分配临时数组（低25） */
    const remain = (kind) => {
      let n = 0;
      for (let i = 0; i < ch.entities.length; i++) {
        const e = ch.entities[i];
        if (e.kind === kind && e.alive) n++;
      }
      return n;
    };

    if (c.type === 'rival') {
      if (remain('rival') === 0) { win(); return; }
      if (c.t >= c.dur) {
        const stolen = stealFood();
        Game.ui.log(stolen
          ? tr('log.challenge.rival.loseStolen', { name: stolen })
          : tr('log.challenge.rival.lose'), 'danger');
        Game.entities.player.stats.mood = Math.max(0, Game.entities.player.stats.mood - 12);
        fail();
        return;
      }
    } else if (c.type === 'dog') {
      if (remain('dog') === 0) { win(); return; }
      if (c.t >= c.dur) { win(); return; }  /* outlasted it */
    } else if (c.type === 'viper') {
      if (remain('viper') === 0) { win(); return; }
      if (c.t >= c.dur) { win(); return; }
    } else if (c.type === 'wolf') {
      if (remain('wolf') === 0) { win(); return; }
      if (c.t >= c.dur) { win(); return; }  /* survived the pack */
    } else if (c.type === 'stampede') {
      if (c.t >= c.dur) { win(); return; }
    } else if (c.type === 'eagle') {
      if (c.dives <= 0) { win(); return; }
      if (c.t >= c.dur) { win(); return; }
    } else if (c.type === 'fog') {
      const p = Game.entities.player;
      if (U.dist2(p.x, p.y, c.target.x, c.target.y) < 90 * 90) { win(); return; }
      if (c.t >= c.dur) { failFog(); return; }
    } else if (c.type === 'storm') {
      if (c.t >= c.dur) { win(); return; }
    } else if (c.type === 'salmon') {
      if (c.t >= c.dur) { win(); return; }
    }
  }

  function win() {
    const c = ch.current;
    if (!c || c.ended) return;
    c.ended = true;
    const p = Game.entities.player;
    const brave = Game.entities.hasSkill && Game.entities.hasSkill('brave') ? 1.5 : 1;
    const mood = (v) => Math.round(v * brave);
    if (c.type === 'rival') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(15));
      Game.ui.log(tr('log.challenge.rival.win', { n: mood(15) }), 'good');
      if (Math.random() < 0.5) {
        Game.entities.addItem('sinew', 1);
        Game.ui.log(tr('log.challenge.rival.drop'), 'good');
      }
    } else if (c.type === 'dog') {
      p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + Math.round(12 * brave));
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(6));
      Game.ui.log(tr('log.challenge.dog.win', { n: Math.round(12 * brave) }), 'good');
    } else if (c.type === 'storm') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(8));
      Game.ui.log(tr('log.challenge.storm.win', { n: mood(8) }), 'good');
      Game.state.weather = 'clear';
      Game.state.weatherT = 45;
    } else if (c.type === 'salmon') {
      Game.ui.log(tr('log.challenge.salmon.win'), 'good');
    } else if (c.type === 'viper') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(10));
      Game.ui.log(tr('log.challenge.viper.win', { n: mood(10) }), 'good');
    } else if (c.type === 'wolf') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(10));
      p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + 10);
      Game.ui.log(tr('log.challenge.wolf.win'), 'good');
    } else if (c.type === 'stampede') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(8));
      Game.ui.log(tr('log.challenge.stampede.win', { n: mood(8) }), 'good');
    } else if (c.type === 'eagle') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(8));
      Game.ui.log(tr('log.challenge.eagle.win', { n: mood(8) }), 'good');
    } else if (c.type === 'fog') {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + mood(8));
      Game.ui.log(tr('log.challenge.fog.win', { n: mood(8) }), 'good');
    }
    /* growth: XP（随难度曲线缩放，技能点只在升级时获得） */
    Game.entities.addXp(Game.entities.scaledXp ? Game.entities.scaledXp(30) : 30);
    if (Game.state && Game.state.journey) Game.state.journey.challengesWon++;
    Game.sfx && Game.sfx.craft();
    endChallenge();
  }

  function fail() {
    const c = ch.current;
    if (!c || c.ended) return;
    c.ended = true;
    Game.sfx && Game.sfx.hurt();
    endChallenge();
  }

  function failFog() {
    const c = ch.current;
    if (!c || c.ended) return;
    c.ended = true;
    const p = Game.entities.player;
    p.stats.mood = Math.max(0, p.stats.mood - 6);
    p.stats.wetness = Math.min(p.stats.wetnessMax, p.stats.wetness + 15);
    Game.ui.log(tr('log.challenge.fog.fail'), 'danger');
    Game.sfx && Game.sfx.hurt();
    endChallenge();
  }

  function endChallenge() {
    Game.ui.clearChallenge && Game.ui.clearChallenge();
    /* 风暴挑战结束时恢复进入前的天气（低30）：
       仅当天气仍被风暴锁在 rain 时恢复（win 已把天气置为 clear 时不覆盖奖励）；
       恢复为进入前值并沿用剩余 weatherT，原值缺失时把 weatherT 置 0 让主循环重新 rollWeather */
    if (ch.current && ch.current.type === 'storm' && Game.state.weather === 'rain') {
      if (ch.current.prevWeather) {
        Game.state.weather = ch.current.prevWeather;
        Game.state.weatherT = ch.current.prevWeatherT || 0;
      } else {
        Game.state.weatherT = 0;
      }
    }
    ch.entities = [];
    ch.current = null;
    strike = null;
    eagle = null;
    ch.nextIn = U.randRange(65, 120);
  }

  /* ------------------------------------------------------------- update */
  function update(dt) {
    const st = Game.state;
    if (ch.current) {
      const c = ch.current;
      c.t += dt;
      for (const e of ch.entities) {
        if (!e.alive) continue;
        if (e.kind === 'rival') updateRival(e, dt);
        else if (e.kind === 'dog') updateDog(e, dt);
        else if (e.kind === 'viper') updateViperC(e, dt);
        else if (e.kind === 'wolf') updateWolf(e, dt);
        else if (e.kind === 'stampede') updateStampede(e, dt);
      }
      /* 每帧原地清理死亡实体（低25）：反向遍历标记删除，
         避免 filter 每帧分配新数组（ch.entities 外部持有同一引用，原地删除不破坏兼容） */
      for (let i = ch.entities.length - 1; i >= 0; i--) {
        if (!ch.entities[i].alive) ch.entities.splice(i, 1);
      }
      if (c.type === 'storm') updateStorm(dt);
      else if (c.type === 'eagle') updateEagle(dt);
      else if (c.type === 'fog') updateFog(dt);
      checkEnd();
      if (ch.current) {
        const bn = BANNERS[c.type] || [tr('challenge.fallback'), ''];
        Game.ui.setChallenge && Game.ui.setChallenge(tr(bn[0]), tr(bn[1]), Math.max(0, c.dur - c.t), c.dur);
      }
    } else {
      ch.nextIn -= dt;
      if (ch.nextIn <= 0 && !st.cave) {
        start(rollType());
      }
    }
  }

  /* ------------------------------------------------------ storm overlay */
  function drawOverlay(ctx, view) {
    const c = ch.current;
    if (!c) return;
    if (c.type === 'storm' && strike) {
      const sx = strike.x - view.cam.x, sy = strike.y - view.cam.y;
      if (sx >= -80 && sx <= view.w + 80 && sy >= -80 && sy <= view.h + 80) {
        const pulse = 0.5 + 0.5 * Math.sin(view.time * 22);
        ctx.strokeStyle = 'rgba(255,240,180,' + (0.35 + pulse * 0.45).toFixed(2) + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(sx, sy, 40, 0, U.TAU); ctx.stroke();
        ctx.fillStyle = 'rgba(255,240,180,0.1)';
        ctx.beginPath(); ctx.arc(sx, sy, 40, 0, U.TAU); ctx.fill();
        ctx.fillStyle = 'rgba(255,240,180,0.95)';
        ctx.font = '15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', sx, sy - 40);
      }
    } else if (c.type === 'eagle' && eagle) {
      const k = Math.min(1, eagle.t / eagle.dur);
      const sx = (eagle.sx + (eagle.tx - eagle.sx) * k) - view.cam.x;
      const sy = (eagle.sy + (eagle.ty - eagle.sy) * k) - view.cam.y;
      if (sx >= -100 && sx <= view.w + 100 && sy >= -100 && sy <= view.h + 100) {
        const sr = 13 + k * 11;
        ctx.fillStyle = 'rgba(20,15,10,' + (0.22 + k * 0.3).toFixed(2) + ')';
        ctx.beginPath(); ctx.ellipse(sx, sy + 6, sr, sr * 0.6, 0, 0, U.TAU); ctx.fill();
        ctx.font = (15 + k * 9) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🦅', sx, sy - 44);
        if (k > 0.8) {
          ctx.strokeStyle = 'rgba(255,120,80,' + ((1 - k) * 2).toFixed(2) + ')';
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.arc(sx, sy, 26, 0, U.TAU); ctx.stroke();
        }
      }
    } else if (c.type === 'fog') {
      /* heavy fog + beacon */
      ctx.fillStyle = 'rgba(203,213,225,0.16)';
      ctx.fillRect(0, 0, view.w, view.h);
      const bx = c.target.x - view.cam.x, by = c.target.y - view.cam.y;
      if (bx >= -100 && bx <= view.w + 100 && by >= -100 && by <= view.h + 100) {
        const pulse = 0.5 + 0.5 * Math.sin(view.time * 3);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, 95);
        g.addColorStop(0, 'rgba(255,220,120,' + (0.45 + pulse * 0.3).toFixed(2) + ')');
        g.addColorStop(1, 'rgba(255,220,120,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(bx, by, 95, 0, U.TAU); ctx.fill();
        ctx.fillStyle = 'rgba(255,235,180,0.95)';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(tr('feature.beacon', { name: tr(c.targetName === 'cave' ? 'misc.cave' : 'misc.spring') }), bx, by - 26);
      }
    }
  }

  Game.challenges = {
    get current() { return ch.current; },
    get entities() { return ch.entities; },
    get nextIn() { return ch.nextIn; },
    set nextIn(v) { ch.nextIn = v; },
    update, drawOverlay,
    start, endChallenge, hitRival, hitDog, hitViper, hitWolf,
  };
})();
