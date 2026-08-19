/* ==========================================================================
   Wilderness Feline Instinct — particles.js
   Scent stream particles (wind-guided), sparkles, leaves, mist, bokeh,
   splashes, rings, Zzz, puffs, glows.
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;

  const SCENT = {
    water: '#3ee6ff',
    prey: '#ffd75e',
    cat: '#ff9ad5',
    predator: '#ff4d4d',
    rival: '#ff8a3d',
  };

  const MAX = 1400;
  /* 对象池 + 环形缓冲（Top5-6 修复）：
     - list 为预分配定长池（长度恒为 MAX），head/size 描述活动窗口 [head, head+size)
     - 死亡粒子原地标记 dead 而非 splice 删除；spawn 复用死洞或覆盖最旧槽位，
       全程 O(1)，消除满容时 list.shift()/splice() 的 O(n) 搬移与对象反复分配
     - 死洞积累到阈值后原地保序压缩（摊还 O(1)），绘制/更新顺序与原来完全一致 */
  const list = new Array(MAX);
  let head = 0;            /* 环形队列头：最旧存活粒子的槽位 */
  let size = 0;            /* 活动窗口大小（含死亡空槽） */
  const free = [];         /* 死亡空槽索引（窗口满时优先复用，不驱逐存活粒子） */
  const stats = { spawns: 0, reuses: 0, evictions: 0, compactions: 0 };
  const COMPACT_AT = 256;  /* 死洞达到该数量时触发一次原地压缩 */
  const wind = { angle: 0.7, speed: 0.55, targetAngle: 0.7, targetSpeed: 0.55 };

  function spawn(o) {
    let slot;
    if (size < MAX) {
      slot = (head + size) % MAX;   /* 窗口未满：追加到尾部（与原来 push 顺序一致） */
      size++;
    } else if (free.length > 0) {
      slot = free.pop();            /* 窗口满但有死洞：复用空槽，O(1) */
    } else {
      slot = head;                  /* 全存活满容：覆盖最旧（等价原 shift()+push()，O(1)） */
      head = (head + 1) % MAX;
      stats.evictions++;
    }
    let p = list[slot];
    if (!p) { p = list[slot] = {}; } else { stats.reuses++; }
    p.x = o.x; p.y = o.y;
    p.vx = o.vx || 0; p.vy = o.vy || 0;
    p.life = o.life || 1; p.maxLife = o.life || 1;
    p.size = o.size || 3;
    p.color = o.color || '#ffffff';
    p.kind = o.kind || 'dot';
    p.alpha = o.alpha !== undefined ? o.alpha : 1;
    p.grav = o.grav || 0; p.drag = o.drag || 0;
    p.rot = o.rot || 0; p.vr = o.vr || 0;
    p.wob = o.wob !== undefined ? o.wob : Math.random() * U.TAU;
    p.screen = !!o.screen;
    p.dead = false;
    stats.spawns++;
  }

  /* Colorful scent stream particles guided by wind direction */
  function emitScent(type, x, y, boost) {
    const n = boost ? 3 : 1;
    const spd = wind.speed * (boost ? 80 : 42);
    for (let i = 0; i < n; i++) {
      spawn({
        x: x + U.randRange(-13, 13), y: y + U.randRange(-13, 13),
        vx: Math.cos(wind.angle) * spd + U.randRange(-7, 7),
        vy: Math.sin(wind.angle) * spd + U.randRange(-7, 7),
        life: U.randRange(2.0, 3.2),
        size: boost ? U.randRange(2.6, 4.2) : U.randRange(1.7, 2.9),
        color: SCENT[type] || '#ffffff',
        kind: 'scent',
        drag: 0.35,
      });
    }
  }

  function updateWind(dt) {
    wind.angle = U.angleLerp(wind.angle, wind.targetAngle, dt * 0.06);
    wind.speed = U.lerp(wind.speed, wind.targetSpeed, dt * 0.06);
    if (Math.random() < dt * 0.03) {
      wind.targetAngle += U.randRange(-0.8, 0.8);
      wind.targetSpeed = U.clamp(wind.targetSpeed + U.randRange(-0.35, 0.35), 0.15, 1.35);
    }
  }

  function update(dt) {
    const w = wind;
    for (let i = 0; i < size; i++) {
      const idx = (head + i) % MAX;
      const p = list[idx];
      if (!p || p.dead) continue;   /* 死洞：跳过，等待复用或压缩 */
      p.life -= dt;
      if (p.life <= 0) { p.dead = true; free.push(idx); continue; }
      if (p.kind === 'scent') {
        p.vx += Math.cos(w.angle) * 16 * dt + Math.sin(p.wob + p.life * 3) * 9 * dt;
        p.vy += Math.sin(w.angle) * 16 * dt + Math.cos(p.wob + p.life * 3) * 9 * dt;
      }
      if (p.drag) {
        const f = Math.max(0, 1 - p.drag * dt * 3);
        p.vx *= f; p.vy *= f;
      }
      p.vy += p.grav * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      if (p.kind === 'leaf') p.wob += dt * 4;
    }
    if (free.length >= COMPACT_AT) compact();
  }

  /* 原地保序压缩：把存活粒子按原顺序前移填掉死洞（单次 O(MAX)，摊还 O(1)）
     移动后必须清空源槽位，否则新旧槽位引用同一对象，后续 spawn 复用对象时会
     产生"一物两槽"的重复粒子 */
  function compact() {
    let w = 0;
    for (let i = 0; i < size; i++) {
      const idx = (head + i) % MAX;
      const p = list[idx];
      if (p && !p.dead) {
        if (w !== i) {
          list[(head + w) % MAX] = p;
          list[idx] = null;   /* 断开旧槽位引用，杜绝别名 */
        }
        w++;
      }
    }
    size = w;
    free.length = 0;
    stats.compactions++;
  }

  /* 清空全部粒子（场景重置/调试）：标记死亡并收缩窗口，槽位留待复用 */
  function clear() {
    for (let i = 0; i < size; i++) {
      const p = list[(head + i) % MAX];
      if (p) p.dead = true;
    }
    size = 0;
    free.length = 0;
  }

  function draw(ctx, cam) {
    const ox = cam ? cam.x : 0, oy = cam ? cam.y : 0;
    for (let i = 0; i < size; i++) {
      const p = list[(head + i) % MAX];
      if (!p || p.dead) continue;   /* 死洞不绘制，顺序与原来完全一致 */
      const t = p.life / p.maxLife;
      const fade = t < 0.22 ? t / 0.22 : 1;
      const a = p.alpha * fade;
      const x = p.screen ? p.x : p.x - ox;
      const y = p.screen ? p.y : p.y - oy;
      if (x < -80 || y < -80 || x > (cam ? cam.w + 80 : 2600) || y > (cam ? cam.h + 80 : 2600)) continue;
      ctx.globalAlpha = U.clamp(a, 0, 1);
      switch (p.kind) {
        case 'dot':
        case 'scent': {
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(x, y, p.size * (0.55 + t * 0.45), 0, U.TAU); ctx.fill();
          ctx.globalAlpha = a * 0.35;
          ctx.beginPath(); ctx.arc(x, y, p.size * 2.7, 0, U.TAU); ctx.fill();
          if (p.kind === 'scent') {
            /* wind-guided flow line */
            ctx.globalAlpha = a * 0.5;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x - p.vx * 0.055, y - p.vy * 0.055);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          break;
        }
        case 'sparkle': {
          const s = p.size * (0.6 + 0.4 * t);
          ctx.fillStyle = p.color;
          ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot);
          ctx.beginPath();
          for (let k = 0; k < 4; k++) {
            const ang = (k / 4) * Math.PI;
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(ang) * s, Math.sin(ang) * s);
            ctx.lineTo(Math.cos(ang + 0.4) * s * 0.45, Math.sin(ang + 0.4) * s * 0.45);
          }
          ctx.fill();
          ctx.restore();
          break;
        }
        case 'zzz': {
          const s = p.size * (0.7 + (1 - t) * 0.7);
          ctx.fillStyle = p.color;
          ctx.font = 'italic 700 ' + s + 'px "Comic Sans MS", cursive, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('z', x, y);
          break;
        }
        case 'leaf': {
          const sway = Math.sin(p.wob) * 3;
          ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + sway * 0.15);
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, U.TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(60,40,10,0.35)'; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(-p.size * 0.8, 0); ctx.lineTo(p.size * 0.8, 0); ctx.stroke();
          ctx.restore();
          break;
        }
        case 'mist': {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.size);
          g.addColorStop(0, p.color);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, p.size, 0, U.TAU); ctx.fill();
          break;
        }
        case 'bokeh': {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.size);
          g.addColorStop(0, p.color);
          g.addColorStop(0.75, p.color);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, p.size, 0, U.TAU); ctx.fill();
          break;
        }
        case 'splash': {
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(x, y, Math.max(1, p.size * (1 - t)), 0, U.TAU); ctx.fill();
          break;
        }
        case 'ring': {
          const r = p.size * (1.6 - t * 0.6);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2 * t + 0.5;
          ctx.beginPath(); ctx.arc(x, y, r, 0, U.TAU); ctx.stroke();
          break;
        }
        case 'glow': {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.size);
          g.addColorStop(0, p.color);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, p.size, 0, U.TAU); ctx.fill();
          break;
        }
        case 'puff': {
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(x, y, p.size * (0.5 + (1 - t) * 0.9), 0, U.TAU); ctx.fill();
          break;
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  Game.particles = {
    list, wind, SCENT, spawn, emitScent, updateWind, update, draw, stats, clear,
    /* 只读诊断：当前活动窗口大小（含死亡空槽），恒 ≤ MAX */
    get size() { return size; },
  };
})();
