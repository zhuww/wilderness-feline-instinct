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
  const list = [];
  const wind = { angle: 0.7, speed: 0.55, targetAngle: 0.7, targetSpeed: 0.55 };

  function spawn(o) {
    if (list.length >= MAX) list.shift();
    list.push({
      x: o.x, y: o.y,
      vx: o.vx || 0, vy: o.vy || 0,
      life: o.life || 1, maxLife: o.life || 1,
      size: o.size || 3,
      color: o.color || '#ffffff',
      kind: o.kind || 'dot',
      alpha: o.alpha !== undefined ? o.alpha : 1,
      grav: o.grav || 0, drag: o.drag || 0,
      rot: o.rot || 0, vr: o.vr || 0,
      wob: o.wob !== undefined ? o.wob : Math.random() * U.TAU,
      screen: !!o.screen,
    });
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
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      p.life -= dt;
      if (p.life <= 0) { list.splice(i, 1); continue; }
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
  }

  function draw(ctx, cam) {
    const ox = cam ? cam.x : 0, oy = cam ? cam.y : 0;
    for (const p of list) {
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

  Game.particles = { list, wind, SCENT, spawn, emitScent, updateWind, update, draw };
})();
