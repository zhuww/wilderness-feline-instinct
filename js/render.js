/* ==========================================================================
   Wilderness Feline Instinct — render.js
   Tile rendering, procedural Siamese cat art with procedural animation,
   prey/predator sprites, weather, day/night lighting, depth-of-field.
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;
  const W = Game.world;
  const T = W.T;

  const PAL = {
    base: {
      [T.MEADOW]: ['#7fb069', '#88b76f', '#78a963', '#82b26a'],
      [T.GRASS]: ['#5d9c4e', '#569447', '#619f52'],
      [T.FOREST]: ['#4a8242', '#467c3f', '#4f8a46'],
      [T.WATER]: ['#3f9fd9', '#3a95cc', '#46aade'],
      [T.SAND]: ['#e3d29a', '#d9c68e', '#ecd9a4'],
      [T.ROCK]: ['#8d8a86', '#817e7a', '#948f89'],
      [T.WALL]: ['#7d756b', '#726a60', '#888077'],
      [T.ROAD]: ['#5c5c64', '#56565e', '#62626a'],
      [T.DIRT]: ['#a98a5c', '#a18153', '#b29364'],
      [T.SWAMP]: ['#3f5f3b', '#395736', '#456540'],
      [T.URBAN]: ['#90909a', '#888890', '#9898a2'],
    },
    flower: ['#ffe9a8', '#ffd9e8', '#ffffff'],
    trunk: '#6b4a30',
  };

  const stars = [];
  const rain = [];
  const mist = [];
  const bokeh = [];
  let bokehT = 0;

  function init() {
    for (let i = 0; i < 70; i++) stars.push({ x: Math.random(), y: Math.random() * 0.62, s: Math.random() * 1.5 + 0.4, ph: Math.random() * 10 });
    for (let i = 0; i < 90; i++) rain.push({ x: Math.random(), y: Math.random(), len: U.randRange(12, 22), spd: U.randRange(640, 900) });
    for (let i = 0; i < 4; i++) mist.push({ x: Math.random(), y: Math.random(), r: U.randRange(190, 330), spd: U.randRange(7, 18), alpha: U.randRange(0.05, 0.11) });
    spawnBokeh();
  }

  /* ------------------------------------------------------------- helpers */
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function tri(ctx, x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
    ctx.closePath();
  }

  /* ------------------------------------------------------------- main draw */
  function draw(ctx, view) {
    const cam = view.cam;
    const t = view.time;
    const x0 = Math.max(0, Math.floor(cam.x / W.TILE));
    const x1 = Math.min(W.W - 1, Math.ceil((cam.x + view.w) / W.TILE));
    const y0 = Math.max(0, Math.floor(cam.y / W.TILE));
    const y1 = Math.min(W.H - 1, Math.ceil((cam.y + view.h) / W.TILE));

    /* ground + water */
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) drawTileBase(ctx, tx, ty, cam, t);
    }

    /* depth-sorted drawables: trees, grass blades, features, entities */
    const draws = [];
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const tt = W.terrain[W.idx(tx, ty)];
        if (tt === T.FOREST) {
          const h = U.hash2(tx * 7 + 3, ty * 13 + 11);
          if (h > 0.42) draws.push({ y: (ty + 1) * W.TILE, f: () => drawTree(ctx, tx, ty, cam, t) });
        } else if (tt === T.GRASS) {
          draws.push({ y: (ty + 1) * W.TILE, f: () => drawGrassBlades(ctx, tx, ty, cam, t) });
        }
      }
    }
    for (const f of W.features) {
      const fx = (f.tx + 0.5) * W.TILE, fy = (f.ty + 0.5) * W.TILE;
      if (fx < cam.x - 90 || fx > cam.x + view.w + 90 || fy < cam.y - 90 || fy > cam.y + view.h + 90) continue;
      if (f.type === 'berry' || f.type === 'catnip' || f.type === 'herbs' || f.type === 'cave' || f.type === 'gate' || f.type === 'trashcan' || f.type === 'dumpster') {
        draws.push({ y: (f.ty + 1) * W.TILE, f: () => drawFeature(ctx, f, cam, t) });
      }
    }
    const ents = Game.entities;
    for (const e of ents.list) {
      if (e.x < cam.x - 80 || e.x > cam.x + view.w + 80 || e.y < cam.y - 80 || e.y > cam.y + view.h + 80) continue;
      draws.push({ y: e.y, f: () => drawEntity(ctx, e, view) });
    }
    /* the player cat herself — she lives outside ents.list, so draw her explicitly */
    const pl = ents.player;
    if (pl) {
      if (pl.x >= cam.x - 80 && pl.x <= cam.x + view.w + 80 && pl.y >= cam.y - 80 && pl.y <= cam.y + view.h + 80) {
        draws.push({ y: pl.y, f: () => drawEntity(ctx, pl, view) });
      }
    }
    /* challenge entities (dogs, rival cats, vipers) — depth sorted with the rest */
    const chEnts = Game.challenges && Game.challenges.entities;
    if (chEnts) {
      for (const e of chEnts) {
        if (e.x < cam.x - 100 || e.x > cam.x + view.w + 100 || e.y < cam.y - 100 || e.y > cam.y + view.h + 100) continue;
        draws.push({ y: e.y, f: () => drawChallengeEntity(ctx, e, view) });
      }
    }
    /* 关底 Boss */
    const boss = Game.entities.boss;
    if (boss && boss.alive) {
      if (boss.x >= cam.x - 140 && boss.x <= cam.x + view.w + 140 && boss.y >= cam.y - 140 && boss.y <= cam.y + view.h + 140) {
        draws.push({ y: boss.y, f: () => drawBoss(ctx, boss, view) });
      }
    }
    draws.sort((a, b) => a.y - b.y);
    for (const d of draws) d.f();

    /* 弹弓顽童的石头弹道 */
    const projs = Game.entities.bossProjectiles;
    for (const pr of projs) {
      const sx = pr.x - cam.x, sy = pr.y - cam.y;
      ctx.fillStyle = 'rgba(20,15,10,0.5)';
      ctx.beginPath(); ctx.ellipse(sx, sy + 2, 4, 2.4, 0, 0, U.TAU); ctx.fill();
      ctx.fillStyle = '#9a8f84';
      ctx.beginPath(); ctx.arc(sx, sy, 4, 0, U.TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath(); ctx.arc(sx - 1, sy - 1, 1.3, 0, U.TAU); ctx.fill();
    }

    /* springs sit flat on the ground */
    for (const f of W.features) {
      if (f.type !== 'spring') continue;
      const fx = (f.tx + 0.5) * W.TILE, fy = (f.ty + 0.5) * W.TILE;
      if (fx < cam.x - 90 || fx > cam.x + view.w + 90 || fy < cam.y - 90 || fy > cam.y + view.h + 90) continue;
      drawSpring(ctx, f, cam, t);
    }

    Game.particles.draw(ctx, { x: cam.x, y: cam.y, w: view.w, h: view.h });

    /* 可互动物品的 F 提示 */
    drawInteractPrompts(ctx, view);

    /* challenge overlays (lightning warnings) */
    if (Game.challenges && Game.challenges.drawOverlay) Game.challenges.drawOverlay(ctx, view);

    drawWeather(ctx, view);
    drawLighting(ctx, view);
    drawVignette(ctx, view);
    if (view.fade > 0) {
      ctx.fillStyle = 'rgba(4,4,10,' + view.fade + ')';
      ctx.fillRect(0, 0, view.w, view.h);
    }
  }

  /* -------------------------------------------------------------- tiles */
  function drawTileBase(ctx, tx, ty, cam, t) {
    const px = tx * W.TILE - cam.x, py = ty * W.TILE - cam.y;
    const tt = W.terrain[W.idx(tx, ty)];
    const h = U.hash2(tx, ty);
    const cols = PAL.base[tt];
    ctx.fillStyle = cols[Math.floor(h * cols.length) % cols.length];
    ctx.fillRect(px, py, W.TILE, W.TILE);
    switch (tt) {
      case T.MEADOW: {
        if (h > 0.86) {
          drawFlower(ctx, px + 12 + h * 26, py + 10 + U.hash2(tx, ty + 9) * 26, 3.2, PAL.flower[Math.floor(h * 3) % 3]);
        } else if (h > 0.79) {
          ctx.strokeStyle = 'rgba(70,110,50,0.5)'; ctx.lineWidth = 1;
          const gx = px + 12 + h * 24, gy = py + 20;
          ctx.beginPath();
          ctx.moveTo(gx - 3, gy); ctx.lineTo(gx - 1, gy - 5);
          ctx.moveTo(gx, gy); ctx.lineTo(gx, gy - 6);
          ctx.moveTo(gx + 3, gy); ctx.lineTo(gx + 2, gy - 4);
          ctx.stroke();
        }
        break;
      }
      case T.SAND: {
        if (h > 0.8) {
          ctx.fillStyle = 'rgba(180,150,90,0.5)';
          ctx.beginPath(); ctx.arc(px + 10 + h * 28, py + 14 + U.hash2(tx + 3, ty) * 24, 1.6, 0, U.TAU); ctx.fill();
        }
        break;
      }
      case T.WATER: drawWater(ctx, px, py, tx, ty, t); break;
      case T.FOREST: {
        if (h > 0.62) {
          ctx.fillStyle = 'rgba(30,60,25,0.22)';
          ctx.beginPath(); ctx.arc(px + 14 + h * 22, py + 12 + U.hash2(ty, tx) * 26, 4.5, 0, U.TAU); ctx.fill();
        }
        break;
      }
      case T.GRASS: {
        ctx.fillStyle = 'rgba(40,80,35,0.25)';
        ctx.fillRect(px, py, W.TILE, W.TILE);
        break;
      }
      case T.ROCK: drawRock(ctx, px, py, h); break;
      case T.WALL: {
        if (Game.world.zone === 1) drawCityBuilding(ctx, tx, ty, px, py);
        else drawWall(ctx, px, py, h);
        break;
      }
      case T.ROAD: drawRoad(ctx, px, py, h); break;
      case T.DIRT: drawDirt(ctx, px, py, h); break;
      case T.SWAMP: drawSwamp(ctx, px, py, h, t); break;
      case T.URBAN: drawUrban(ctx, px, py, h); break;
    }
  }

  /* 城市小区：一栋栋小区楼房（2D 投影立面，沿街一字排开，楼间有暗巷） */
  function drawCityBuilding(ctx, tx, ty, px, py) {
    const band = Game.world.CITY ? Game.world.CITY.MID : 83;
    const dist = Math.abs(ty - band);
    const pos = tx % 13;
    /* 楼与楼之间的间隙：暗巷（较暗） */
    if (pos >= 11) {
      ctx.fillStyle = '#232633';
      ctx.fillRect(px, py, W.TILE, W.TILE);
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fillRect(px, py, W.TILE, 3);
      return;
    }
    if (dist > 15) {
      /* 远景屋顶剪影 + 水箱/天线 */
      ctx.fillStyle = '#313845';
      ctx.fillRect(px, py, W.TILE, W.TILE);
      if ((tx * 3 + ty) % 11 === 0) {
        ctx.fillStyle = '#47516a';
        ctx.fillRect(px + 10, py + 4, 12, 10);
        ctx.fillRect(px + 14, py - 2, 4, 6);
      }
      return;
    }
    /* 楼栋配色：每 13 格一栋，颜色各异 */
    const block = Math.floor(tx / 13);
    const pals = [
      ['#c98a6a', '#e8c0a8', '#8a5a44'],
      ['#8a9ac0', '#b8c8e8', '#5a6a8a'],
      ['#a0c0a0', '#c8e0c8', '#6a8a6a'],
      ['#c0a080', '#e0c8a8', '#8a6a50'],
      ['#b08aa0', '#d0b0c8', '#7a5a70'],
      ['#9aa8b0', '#c0d0d8', '#6a7a88'],
    ];
    const pal = pals[block % pals.length];
    const dark = 1 - Math.min(0.45, (dist - 6) * 0.05);
    const main = shade(pal[0], dark), light = shade(pal[1], dark), trim = shade(pal[2], dark);
    ctx.fillStyle = main;
    ctx.fillRect(px, py, W.TILE, W.TILE);
    /* 楼层分隔线 */
    ctx.fillStyle = trim;
    ctx.fillRect(px, py + 12, W.TILE, 2);
    ctx.fillRect(px, py + 30, W.TILE, 2);
    /* 窗户网格：每层两扇，部分亮灯 */
    for (let f = 0; f < 2; f++) {
      const wy = py + 4 + f * 18;
      const lit1 = U.hash2(tx * 7 + f, ty * 5 + f) > 0.5;
      const lit2 = U.hash2(tx * 13 + f, ty * 11 + f) > 0.5;
      ctx.fillStyle = light;
      ctx.fillRect(px + 6, wy, 10, 8);
      ctx.fillRect(px + 30, wy, 10, 8);
      if (lit1) { ctx.fillStyle = '#ffd98a'; ctx.fillRect(px + 6, wy, 10, 8); ctx.fillStyle = 'rgba(255,220,140,0.4)'; ctx.fillRect(px + 6, wy, 10, 2); }
      if (lit2) { ctx.fillStyle = '#ffd98a'; ctx.fillRect(px + 30, wy, 10, 8); ctx.fillStyle = 'rgba(255,220,140,0.4)'; ctx.fillRect(px + 30, wy, 10, 2); }
    }
    /* 阳台带 */
    ctx.fillStyle = trim;
    ctx.fillRect(px, py + 26, W.TILE, 2);
    /* 空调外机 */
    if (tx % 4 === 1) {
      ctx.fillStyle = shade('#6a7078', dark);
      ctx.fillRect(px + 20, py + 16, 10, 8);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(px + 21, py + 17, 8, 2);
    }
    /* 靠近街道的底层：入口雨篷 + 门 */
    if (dist <= 7) {
      ctx.fillStyle = trim;
      ctx.fillRect(px + 10, py + 40, 28, 5);
      ctx.fillStyle = '#2c2018';
      ctx.fillRect(px + 16, py + 42, 16, 6);
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(px + 18, py + 43, 5, 4);
    }
  }

  function drawWall(ctx, px, py, h) {
    /* 建筑墙面：砖块纹理 + 窗户 */
    ctx.fillStyle = 'rgba(0,0,0,0.14)';
    ctx.fillRect(px, py, W.TILE, W.TILE);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 0.5, py + 0.5, W.TILE - 1, W.TILE - 1);
    if (h > 0.45) {
      ctx.fillStyle = h > 0.72 ? 'rgba(255,220,140,0.5)' : 'rgba(150,210,255,0.35)';
      ctx.fillRect(px + 10 + h * 14, py + 12 + (h * 7) % 20, 7, 9);
    }
  }

  function drawRoad(ctx, px, py, h) {
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(px, py, W.TILE, W.TILE);
    /* 车道线 */
    ctx.strokeStyle = 'rgba(255,214,90,0.35)';
    ctx.lineWidth = 2;
    const ph = (px * 13 + py * 7) % 24;
    ctx.beginPath();
    ctx.moveTo(px + W.TILE / 2, py - 12 + ph);
    ctx.lineTo(px + W.TILE / 2, py + 12 + ph);
    ctx.stroke();
    /* 斑马线（每隔一段） */
    if (h > 0.6) {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      for (let i = 0; i < 3; i++) ctx.fillRect(px + 6 + i * 12, py + 40, 7, 4);
    }
  }

  function drawDirt(ctx, px, py, h) {
    if (h > 0.82) {
      ctx.strokeStyle = 'rgba(90,60,25,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 8 + h * 20, py + 10); ctx.lineTo(px + 14 + h * 20, py + 22);
      ctx.moveTo(px + 30 + h * 6, py + 18); ctx.lineTo(px + 24 + h * 6, py + 32);
      ctx.stroke();
    } else if (h > 0.62) {
      ctx.fillStyle = 'rgba(140,110,70,0.6)';
      ctx.beginPath(); ctx.arc(px + 12 + h * 26, py + 14 + U.hash2(tx2(px), py) * 20, 2.2, 0, U.TAU); ctx.fill();
    }
  }
  function tx2(px) { return px; }

  function drawSwamp(ctx, px, py, h, t) {
    ctx.fillStyle = 'rgba(20,40,15,0.35)';
    ctx.fillRect(px, py, W.TILE, W.TILE);
    const wave = Math.sin(t * 1.2 + px * 0.01 + py * 0.013);
    ctx.fillStyle = wave > 0 ? 'rgba(160,200,120,0.12)' : 'rgba(10,25,8,0.2)';
    ctx.fillRect(px, py, W.TILE, W.TILE);
    if (h > 0.7) {
      /* 芦苇 */
      ctx.strokeStyle = '#5c7a44';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(px + 10 + h * 24, py + 48);
      ctx.quadraticCurveTo(px + 9 + h * 24, py + 30, px + 11 + h * 24, py + 22);
      ctx.stroke();
    }
  }

  function drawUrban(ctx, px, py, h) {
    /* 广场/人行道地砖 */
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 0.5, py + 0.5, W.TILE - 1, W.TILE - 1);
    if (h > 0.9) {
      ctx.fillStyle = 'rgba(60,60,70,0.6)';
      ctx.beginPath(); ctx.arc(px + 24, py + 24, 5, 0, U.TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(px + 24, py + 24, 5, 0, U.TAU); ctx.stroke();
    } else if (h > 0.78) {
      /* 路灯 */
      ctx.fillStyle = '#4a4f5a';
      ctx.fillRect(px + 14, py + 26, 3, 20);
      ctx.fillStyle = '#ffe9a0';
      ctx.beginPath(); ctx.arc(px + 15, py + 26, 4, 0, U.TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,233,160,0.28)';
      ctx.beginPath(); ctx.arc(px + 15, py + 26, 8, 0, U.TAU); ctx.fill();
    } else if (h > 0.55) {
      /* 长椅 */
      ctx.fillStyle = '#6b4a2e';
      ctx.fillRect(px + 10, py + 34, 26, 5);
      ctx.fillRect(px + 10, py + 30, 26, 3);
      ctx.fillRect(px + 13, py + 39, 3, 6);
      ctx.fillRect(px + 30, py + 39, 3, 6);
    }
  }

  function drawFlower(ctx, x, y, r, col) {
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath(); ctx.arc(x, y + 1.2, r * 1.5, 0, U.TAU); ctx.fill();
    ctx.fillStyle = col;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * U.TAU;
      ctx.beginPath(); ctx.arc(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, r * 0.62, 0, U.TAU); ctx.fill();
    }
    ctx.fillStyle = '#f0a030';
    ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, U.TAU); ctx.fill();
  }

  function drawWater(ctx, px, py, tx, ty, t) {
    const h = U.hash2(tx, ty);
    const wave = Math.sin(t * 1.8 + tx * 0.9 + ty * 0.7);
    ctx.fillStyle = wave > 0.15 ? 'rgba(255,255,255,0.09)' : 'rgba(18,55,115,0.15)';
    ctx.fillRect(px, py, W.TILE, W.TILE);
    const sx = (t * 26 + tx * 53 + h * 20) % W.TILE;
    ctx.fillStyle = 'rgba(255,255,255,0.13)';
    ctx.fillRect(px + sx - 4, py + 8 + h * 20, 7, 3);
    /* shore foam */
    if (W.terrain[W.idx(tx - 1, ty)] === T.SAND) { ctx.fillStyle = 'rgba(225,240,255,0.3)'; ctx.fillRect(px, py, 3, W.TILE); }
    if (W.terrain[W.idx(tx + 1, ty)] === T.SAND) { ctx.fillStyle = 'rgba(225,240,255,0.3)'; ctx.fillRect(px + W.TILE - 3, py, 3, W.TILE); }
    if (W.terrain[W.idx(tx, ty - 1)] === T.SAND) { ctx.fillStyle = 'rgba(225,240,255,0.3)'; ctx.fillRect(px, py, W.TILE, 3); }
    if (W.terrain[W.idx(tx, ty + 1)] === T.SAND) { ctx.fillStyle = 'rgba(225,240,255,0.3)'; ctx.fillRect(px, py + W.TILE - 3, W.TILE, 3); }
  }

  function drawRock(ctx, px, py, h) {
    ctx.fillStyle = 'rgba(60,60,60,0.35)';
    ctx.beginPath(); ctx.ellipse(px + 24, py + 28, 18, 11, h, 0, U.TAU); ctx.fill();
    ctx.fillStyle = 'rgba(30,30,30,0.3)';
    ctx.beginPath(); ctx.moveTo(px + 14, py + 22); ctx.lineTo(px + 22, py + 16); ctx.lineTo(px + 30, py + 24); ctx.stroke();
  }

  function drawTree(ctx, tx, ty, cam, t) {
    const px = tx * W.TILE - cam.x, py = ty * W.TILE - cam.y;
    const cx = px + 24, cy = py + 34;
    const h = U.hash2(tx, ty);
    const sway = Math.sin(t * 0.9 + h * 9) * 1.7;
    const r = 19 + h * 7;
    ctx.fillStyle = 'rgba(20,40,10,0.25)';
    ctx.beginPath(); ctx.ellipse(cx, cy - 2, r * 0.95, r * 0.5, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = PAL.trunk;
    rr(ctx, cx - 4.5, cy - 24, 9, 26, 3); ctx.fill();
    ctx.fillStyle = '#3d7a35';
    ctx.beginPath(); ctx.arc(cx + sway * 0.4, cy - 27, r, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#47893f';
    ctx.beginPath(); ctx.arc(cx - 11 + sway * 0.25, cy - 20, r * 0.72, 0, U.TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 12 + sway * 0.5, cy - 17, r * 0.66, 0, U.TAU); ctx.fill();
    ctx.fillStyle = 'rgba(160,225,130,0.22)';
    ctx.beginPath(); ctx.arc(cx - 6 + sway * 0.3, cy - 31, r * 0.42, 0, U.TAU); ctx.fill();
  }

  function drawGrassBlades(ctx, tx, ty, cam, t) {
    const px = tx * W.TILE - cam.x, py = ty * W.TILE - cam.y;
    ctx.strokeStyle = 'rgba(52,105,40,0.9)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const h = U.hash2(tx * 31 + i * 7, ty * 17 + i * 13);
      const bx = px + 6 + h * 38;
      const bh = 12 + h * 15;
      const sway = Math.sin(t * 1.4 + h * 12) * 2.2;
      ctx.beginPath();
      ctx.moveTo(bx, py + 48);
      ctx.quadraticCurveTo(bx + sway * 0.4, py + 48 - bh * 0.6, bx + sway, py + 48 - bh);
      ctx.stroke();
    }
  }

  /* ----------------------------------------------------------- features */
  function drawFeature(ctx, f, cam, t) {
    const fx = (f.tx + 0.5) * W.TILE - cam.x;
    const fy = (f.ty + 0.5) * W.TILE - cam.y;
    const h = U.hash2(f.tx, f.ty);
    if (f.type === 'berry') {
      const harvested = f.regrowT > 0;
      const s = harvested ? 0.7 : 1;   /* 果子被吃光后灌木变小变暗 */
      ctx.fillStyle = 'rgba(20,45,15,0.3)';
      ctx.beginPath(); ctx.ellipse(fx, fy + 8, 15, 6, 0, 0, U.TAU); ctx.fill();
      ctx.fillStyle = harvested ? '#5f7a4e' : '#3f7a35';
      ctx.beginPath(); ctx.arc(fx - 6 * s, fy + 2 * s, 9 * s, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(fx + 6 * s, fy + 1 * s, 8.4 * s, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(fx, fy - 3 * s, 8 * s, 0, U.TAU); ctx.fill();
      ctx.fillStyle = harvested ? '#7a8f68' : '#5c9a4a';
      ctx.beginPath(); ctx.arc(fx - 6 * s, fy + 2 * s, 3.4 * s, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(fx + 6 * s, fy + 1 * s, 3 * s, 0, U.TAU); ctx.fill();
      if (!harvested) {
        ctx.fillStyle = '#e33d4e';
        const n = 3 + Math.floor(h * 3);
        for (let i = 0; i < n; i++) {
          const a = h * 7 + i * 2.1;
          ctx.beginPath(); ctx.arc(fx + Math.cos(a) * 8, fy + 1 + Math.sin(a * 1.3) * 6, 2.1, 0, U.TAU); ctx.fill();
        }
        const gl = 0.5 + 0.5 * Math.sin(t * 2 + h * 9);
        ctx.fillStyle = 'rgba(255,255,220,' + (0.25 * gl).toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(fx - 7, fy - 1, 6, 0, U.TAU); ctx.fill();
      }
    } else if (f.type === 'catnip') {
      const harvested = f.regrowT > 0;
      ctx.fillStyle = 'rgba(20,45,15,0.3)';
      ctx.beginPath(); ctx.ellipse(fx, fy + 8, 14, 5, 0, 0, U.TAU); ctx.fill();
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * U.TAU + h * 3;
        const lx = fx + Math.cos(a) * 8, ly = fy - 2 + Math.sin(a) * 4;
        ctx.strokeStyle = harvested ? '#5d6e4a' : '#4f9440';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + Math.cos(a) * 6, ly - 6 - (h * 5)); ctx.stroke();
        if (!harvested) {
          ctx.fillStyle = '#b98adf';
          ctx.beginPath(); ctx.arc(lx + Math.cos(a) * 6, ly - 6 - (h * 5), 2.2, 0, U.TAU); ctx.fill();
        }
      }
      if (!harvested) {
        const gl = 0.5 + 0.5 * Math.sin(t * 2.6 + h * 5);
        ctx.fillStyle = 'rgba(220,190,255,' + (0.3 * gl).toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(fx, fy - 6, 9, 0, U.TAU); ctx.fill();
      }
    } else if (f.type === 'herbs') {
      const harvested = f.regrowT > 0;
      ctx.fillStyle = harvested ? '#5d6e4a' : '#4e9c42';
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * U.TAU + 0.5;
        ctx.beginPath();
        ctx.ellipse(fx + Math.cos(a) * 5, fy - 2 + Math.sin(a) * 4, 4.4, 1.8, a, 0, U.TAU);
        ctx.fill();
      }
      if (!harvested) {
        ctx.fillStyle = '#fff7e0';
        ctx.beginPath(); ctx.arc(fx, fy - 5, 2, 0, U.TAU); ctx.fill();
        const gl = 0.5 + 0.5 * Math.sin(t * 3 + h * 11);
        ctx.fillStyle = 'rgba(255,250,210,' + (0.35 * gl).toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(fx, fy - 4, 8, 0, U.TAU); ctx.fill();
      }
    } else if (f.type === 'cave') {
      /* rocky arch entrance */
      ctx.fillStyle = 'rgba(20,20,25,0.35)';
      ctx.beginPath(); ctx.ellipse(fx, fy + 12, 26, 9, 0, 0, U.TAU); ctx.fill();
      ctx.fillStyle = '#6d6a66';
      ctx.beginPath(); ctx.ellipse(fx, fy + 6, 22, 15, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#57534f';
      ctx.beginPath(); ctx.ellipse(fx - 14, fy + 4, 9, 12, 0.4, Math.PI, 0); ctx.fill();
      ctx.beginPath(); ctx.ellipse(fx + 14, fy + 4, 9, 12, -0.4, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#141014';
      ctx.beginPath(); ctx.ellipse(fx, fy + 8, 13, 9, 0, 0, U.TAU); ctx.fill();
      /* warm glow from within */
      const flick = 0.6 + 0.4 * Math.sin(t * 3 + h * 7) * Math.sin(t * 1.7 + h * 3);
      ctx.fillStyle = 'rgba(255,150,60,' + (0.16 * flick).toFixed(3) + ')';
      ctx.beginPath(); ctx.ellipse(fx, fy + 8, 10, 7, 0, 0, U.TAU); ctx.fill();
    } else if (f.type === 'gate') {
      /* 通往其他区域的传送门 */
      const colors = { 1: '#6ec6ff', 2: '#e0a35c', 3: '#8f6fd8', 0: '#7ce08a' };
      const col = colors[f.to] || '#6ec6ff';
      const pulse = 0.5 + 0.5 * Math.sin(t * 3 + h * 9);
      /* 石柱 + 拱门 */
      ctx.fillStyle = '#5a5f66';
      ctx.fillRect(fx - 22, fy - 8, 7, 44);
      ctx.fillRect(fx + 15, fy - 8, 7, 44);
      ctx.beginPath(); ctx.arc(fx - 18, fy - 6, 5, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(fx + 18, fy - 6, 5, 0, U.TAU); ctx.fill();
      /* 旋转的能量漩涡 */
      ctx.save();
      ctx.translate(fx, fy + 12);
      const g = ctx.createRadialGradient(0, 0, 2, 0, 0, 20);
      g.addColorStop(0, col);
      g.addColorStop(0.6, col);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.55 + pulse * 0.35;
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, 20, 0, U.TAU); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, 14 + pulse * 3, t * 2, t * 2 + Math.PI * 1.4); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 9 + pulse * 2, -t * 2.4, -t * 2.4 + Math.PI * 1.2); ctx.stroke();
      ctx.restore();
      /* 名称标签 */
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(8,8,18,0.7)';
      rr(ctx, fx - 48, fy - 30, 96, 15, 7); ctx.fill();
      ctx.fillStyle = col;
      ctx.fillText('⛩ ' + (f.label || ''), fx, fy - 19);
    } else if (f.type === 'trashcan') {
      /* 小型垃圾桶 */
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath(); ctx.ellipse(fx, fy + 8, 9, 4, 0, 0, U.TAU); ctx.fill();
      ctx.fillStyle = '#6a8f8f';
      rr(ctx, fx - 7, fy - 8, 14, 16, 3); ctx.fill();
      ctx.fillStyle = '#5a7a7a';
      ctx.fillRect(fx - 7, fy - 8, 14, 4);
      ctx.fillStyle = '#7aa8a8';
      ctx.fillRect(fx - 4, fy + 2, 8, 3);
      ctx.fillStyle = '#3a4a4a';
      ctx.fillRect(fx - 1, fy - 13, 2, 5);
      ctx.fillStyle = '#5a7a7a';
      rr(ctx, fx - 8, fy - 15, 16, 3, 1.5); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(fx - 6, fy - 14, 4, 1.4);
    } else if (f.type === 'dumpster') {
      /* 大型垃圾箱 */
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(fx, fy + 13, 20, 6, 0, 0, U.TAU); ctx.fill();
      ctx.fillStyle = '#4a7a5a';
      rr(ctx, fx - 18, fy - 14, 36, 27, 3); ctx.fill();
      ctx.fillStyle = '#3a6a4a';
      ctx.fillRect(fx - 18, fy - 14, 36, 5);
      ctx.fillStyle = '#5a9a6a';
      ctx.fillRect(fx - 14, fy - 4, 28, 4);
      ctx.fillStyle = '#2a4a3a';
      ctx.fillRect(fx - 18, fy + 9, 36, 3);
      ctx.fillStyle = '#2a2a30';
      ctx.beginPath(); ctx.arc(fx - 12, fy + 14, 3, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(fx + 12, fy + 14, 3, 0, U.TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,240,200,0.5)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★', fx - 6, fy - 6);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fillRect(fx - 16, fy - 12, 10, 3);
    }
  }

  function drawSpring(ctx, f, cam, t) {
    const fx = (f.tx + 0.5) * W.TILE - cam.x;
    const fy = (f.ty + 0.5) * W.TILE - cam.y;
    const h = U.hash2(f.tx, f.ty);
    ctx.fillStyle = 'rgba(20,45,60,0.3)';
    ctx.beginPath(); ctx.ellipse(fx, fy + 8, 18, 8, 0, 0, U.TAU); ctx.fill();
    const g = ctx.createRadialGradient(fx, fy, 2, fx, fy, 16);
    g.addColorStop(0, 'rgba(150,235,255,0.95)');
    g.addColorStop(0.6, 'rgba(80,195,235,0.75)');
    g.addColorStop(1, 'rgba(60,160,210,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(fx, fy, 15, 8, 0, 0, U.TAU); ctx.fill();
    const ripple = (t * 0.8 + h) % 1;
    ctx.strokeStyle = 'rgba(220,250,255,' + (0.5 * (1 - ripple)).toFixed(2) + ')';
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.ellipse(fx, fy + 2, 4 + ripple * 12, 2 + ripple * 6, 0, 0, U.TAU); ctx.stroke();
    /* steam sparkles */
    if (Math.random() < 0.06) {
      Game.particles.spawn({ x: fx + cam.x + U.randRange(-6, 6), y: fy + cam.y - 6, kind: 'dot', size: 1.6, color: 'rgba(190,245,255,0.8)', vx: U.randRange(-4, 4), vy: -14, life: 0.8 });
    }
  }

  /* ------------------------------------------------------------ entities */
  function drawEntity(ctx, e, view) {
    const cam = view.cam;
    const sx = e.x - cam.x, sy = e.y - cam.y;
    if (e.kind === 'player') {
      const p = e;
      ctx.fillStyle = 'rgba(10,20,10,0.3)';
      ctx.beginPath(); ctx.ellipse(sx, sy + 7, 19, 7, 0, 0, U.TAU); ctx.fill();
      const fear = nearbyThreat(p) ? 1.5 : p.hurtT > 0 ? 1.6 : 0.9;
      const night = view.night > 0.4;
      drawCat(ctx, sx, sy, p.facing, p.state, p.animT, {
        coat: '#f6e7cf', mask: '#5c3a27', point: '#4a2c1b',
        night, fear, blink: p.blink, wet: p.stats.wetness > 55, hurt: p.hurtT > 0, zoom: p.zoomiesT > 0,
        hat: !!p.equipped.hat,
        collar: !!p.equipped.collar && p.equipped.collar !== 'cat_tooth_necklace',
        necklace: p.equipped.collar === 'cat_tooth_necklace',
      });
      /* sniff radius ring */
      if (p.sniff.active) {
        const pr = 1 - (p.sniff.t / 2.6);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.5 * (1 - pr)).toFixed(2) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(sx, sy, 24 + pr * 46, 0, U.TAU); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath(); ctx.arc(sx, sy, 24 + pr * 46, 0, U.TAU); ctx.fill();
      }
    } else if (e.kind === 'prey') {
      if (e.type === 'mouse') drawMouse(ctx, sx, sy, e);
      else if (e.type === 'grasshopper') drawGrasshopper(ctx, sx, sy, e);
      else if (e.type === 'salmon') drawSalmon(ctx, sx, sy, e);
    } else if (e.kind === 'predator') {
      if (e.type === 'boar') drawBoar(ctx, sx, sy, e);
      else if (e.type === 'fox') drawFox(ctx, sx, sy, e);
      else if (e.type === 'viper') drawViper(ctx, sx, sy, e);
    } else if (e.kind === 'straydog') {
      drawDog(ctx, sx, sy, e);
    } else if (e.kind === 'companion') {
      drawCompanion(ctx, sx, sy, e, view);
    }
  }

  function nearbyThreat(p) {
    for (const e of Game.entities.list) {
      if (e.kind === 'predator' && e.alive && e.chasing && U.dist2(e.x, e.y, p.x, p.y) < 280 * 280) return true;
    }
    const ce = Game.challenges && Game.challenges.entities || [];
    for (const e of ce) {
      if (e.alive && (e.kind === 'dog' || e.kind === 'rival') && U.dist2(e.x, e.y, p.x, p.y) < 280 * 280) return true;
    }
    return false;
  }

  /* ---------------------------------------------------------- Siamese cat */
  function drawCat(ctx, x, y, facing, state, t, cfg) {
    ctx.save();
    ctx.translate(x, y);
    /* the sprite's nose points toward local -y, so rotate facing + 90° to align it with motion */
    let rot = facing + Math.PI / 2;
    let flat = 1, stretch = 1;
    if (state === 'pounce') { rot += 0.5; flat = 0.88; stretch = 1.2; }
    if (state === 'sneak') flat = 0.82;
    ctx.rotate(rot);
    ctx.scale(stretch, flat);
    /* 淋湿时毛皮贴在身上，身体略微缩小 */
    if (cfg.wet) ctx.scale(0.94, 0.94);

    if (state === 'sleep') { drawSleepingCat(ctx, t, cfg); ctx.restore(); return; }
    if (state === 'groom') { drawGroomCat(ctx, t, cfg); ctx.restore(); return; }

    /* tail */
    const wag = Math.sin(t * 3.4) * 6;
    const tailY = 22 + Math.sin(t * 2.6) * 2;
    ctx.strokeStyle = cfg.point;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.quadraticCurveTo(wag * 0.35, 19, wag, tailY);
    ctx.stroke();
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = cfg.coat;
    ctx.beginPath();
    ctx.moveTo(wag * 0.55, tailY - 2.4);
    ctx.lineTo(wag, tailY);
    ctx.stroke();

    /* legs */
    const lp = state === 'walk' ? t * 11 : state === 'sneak' ? t * 7.5 : 0;
    const amp = state === 'walk' ? 3.4 : state === 'sneak' ? 2.2 : 0.6;
    ctx.fillStyle = cfg.point;
    const legs = [[-6.5, -2, lp], [6.5, -2, lp + Math.PI], [-8, 11, lp + Math.PI * 0.5], [8, 11, lp + Math.PI * 1.5]];
    for (const [lx, ly, p] of legs) {
      const off = Math.sin(p) * amp;
      ctx.beginPath();
      ctx.ellipse(lx, ly + off * 0.35, 2.6, 3.7 + off * 0.2, 0, 0, U.TAU);
      ctx.fill();
    }

    /* body */
    const breathe = Math.sin(t * 2.2) * 0.8;
    const bob = (state === 'walk' ? Math.sin(t * 11) * 1.6 : state === 'sneak' ? Math.sin(t * 7.5) : 0);
    const wetDark = cfg.wet ? 0.85 : 1;
    ctx.fillStyle = shade(cfg.coat, wetDark);
    ctx.strokeStyle = 'rgba(70,45,25,0.28)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(0, 5 + bob * 0.4, 11.5, 9.5 + breathe * 0.3, 0, 0, U.TAU);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,245,220,0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 6.5 + bob * 0.4, 7.5, 5.6, 0, 0, U.TAU);
    ctx.fill();

    /* 树叶雨帽＝叶披风：盖在背上（头压住领口） */
    if (cfg.hat) {
      ctx.fillStyle = '#4f9c46';
      ctx.beginPath(); ctx.ellipse(0, 5, 13, 11, 0, 0, U.TAU); ctx.fill();
      ctx.fillStyle = '#3f7a35';
      ctx.beginPath(); ctx.ellipse(0, 4, 11, 9.2, 0, 0, U.TAU); ctx.fill();
      /* 下摆叶片 */
      ctx.fillStyle = '#5cae4a';
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath(); ctx.ellipse(i * 5, 14.5 + Math.abs(i) * 0.8, 3.8, 2.1, 0, 0, U.TAU); ctx.fill();
      }
      /* 肩部叶片 */
      ctx.beginPath(); ctx.ellipse(-8.5, 1.5, 4.6, 2.4, -0.5, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(8.5, 1.5, 4.6, 2.4, 0.5, 0, U.TAU); ctx.fill();
      /* 高光 */
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.beginPath(); ctx.ellipse(-3, 0, 5, 3, -0.3, 0, U.TAU); ctx.fill();
    }

    /* head */
    const hx = 0;
    const hy = -14 + (state === 'sneak' ? 1.5 : 0);
    const earBack = state === 'sneak' || cfg.hurt ? 0.35 : 0;
    /* ears — bases sit on the head (head circle is at (hx,hy) r 10.5, so base y≈-22), tips poke above */
    ctx.fillStyle = cfg.point;
    tri(ctx, -8.5 + hx, -8 + hy, -5 + hx, -17 + hy + earBack * 2, -0.5 + hx, -7.5 + hy);
    ctx.fill();
    tri(ctx, 8.5 + hx, -8 + hy, 5 + hx, -17 + hy + earBack * 2, 0.5 + hx, -7.5 + hy);
    ctx.fill();
    ctx.fillStyle = '#e8a8a8';
    tri(ctx, -6.8 + hx, -8.5 + hy, -5.6 + hx, -15 + hy + earBack * 1.6, -2.8 + hx, -8.2 + hy);
    ctx.fill();
    tri(ctx, 6.8 + hx, -8.5 + hy, 5.6 + hx, -15 + hy + earBack * 1.6, 2.8 + hx, -8.2 + hy);
    ctx.fill();
    /* head base */
    ctx.fillStyle = shade(cfg.coat, wetDark);
    ctx.strokeStyle = 'rgba(70,45,25,0.28)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(hx, hy, 10.5, 0, U.TAU); ctx.fill(); ctx.stroke();
    /* seal-point face mask */
    ctx.fillStyle = cfg.mask;
    ctx.beginPath();
    ctx.ellipse(hx, hy + 1.4, 7.8, 6.0, 0, 0, U.TAU);
    ctx.fill();
    /* muzzle */
    ctx.fillStyle = shade('#fbf0dd', wetDark);
    ctx.beginPath(); ctx.ellipse(hx, hy + 3.4, 3.6, 2.7, 0, 0, U.TAU); ctx.fill();
    /* nose */
    ctx.fillStyle = '#f28ba0';
    tri(ctx, hx - 1.3, hy + 2.4, hx + 1.3, hy + 2.4, hx, hy + 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(90,60,40,0.5)';
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(hx, hy + 4); ctx.lineTo(hx, hy + 5.4); ctx.stroke();
    /* whiskers */
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 0.9;
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(hx + s * 4.2, hy + 3);
      ctx.quadraticCurveTo(hx + s * 9, hy + 1.5, hx + s * 13, hy + 3.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(hx + s * 4.2, hy + 4.4);
      ctx.quadraticCurveTo(hx + s * 9, hy + 4, hx + s * 12.5, hy + 6);
      ctx.stroke();
    }
    /* eyes */
    drawEye(ctx, hx - 4.4, hy - 0.8, cfg);
    drawEye(ctx, hx + 4.4, hy - 0.8, cfg);

    /* 猫牙项链：细绳 + 白色尖牙吊坠 */
    if (cfg.necklace) {
      ctx.strokeStyle = '#8a6a3a';
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.ellipse(0, -8.5, 7, 6.2, 0, 0, U.TAU); ctx.stroke();
      ctx.fillStyle = '#f2ead8';
      tri(ctx, -1.5, -4.2, 1.5, -4.2, 0, -8.8); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath(); ctx.arc(0, -5.6, 0.8, 0, U.TAU); ctx.fill();
    } else if (cfg.collar) {
      /* 鱼骨项圈 / 伙伴猫的红项圈 */
      ctx.strokeStyle = '#e23d4e';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.ellipse(0, -8.5, 7.2, 6.4, 0, 0, U.TAU);
      ctx.stroke();
      ctx.fillStyle = '#ffd24a';
      ctx.beginPath(); ctx.arc(0, -3.5, 1.8, 0, U.TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(120,70,0,0.6)';
      ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(0, -5.8); ctx.lineTo(0, -3.5); ctx.stroke();
    }

    /* pounce: extended forelegs with claws */
    if (state === 'pounce') {
      ctx.fillStyle = cfg.point;
      ctx.beginPath(); ctx.ellipse(-6, -24, 2.8, 4.4, 0.3, 0, U.TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6, -24, 2.8, 4.4, -0.3, 0, U.TAU); ctx.fill();
      ctx.fillStyle = '#f7f2e8';
      for (const s of [-6, 6]) {
        tri(ctx, s - 1.3, -27.5, s, -31.5, s + 1.3, -27.5);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function shade(hex, k) {
    if (k >= 1) return hex;
    const n = parseInt(hex.slice(1), 16);
    const r = Math.round(((n >> 16) & 255) * k);
    const g = Math.round(((n >> 8) & 255) * k);
    const b = Math.round((n & 255) * k);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function drawEye(ctx, ex, ey, cfg) {
    const eh = cfg.blink ? 0.18 : 1;
    ctx.save();
    ctx.translate(ex, ey);
    ctx.scale(1, eh);
    const g = ctx.createRadialGradient(0, 0, 0.4, 0, 0, 3.4);
    if (cfg.night) {
      g.addColorStop(0, '#b8ffe8');
      g.addColorStop(0.55, '#3cf0b0');
      g.addColorStop(1, '#0e8f78');
    } else if (cfg.eyeColor) {
      g.addColorStop(0, '#ffe3b8');
      g.addColorStop(0.55, cfg.eyeColor);
      g.addColorStop(1, '#7a3d00');
    } else {
      g.addColorStop(0, '#a5d4ff');
      g.addColorStop(0.55, '#3d8af0');
      g.addColorStop(1, '#1c4fb0');
    }
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, 0, 3.3, 2.8, 0, 0, U.TAU); ctx.fill();
    /* slit pupil */
    ctx.fillStyle = '#05060a';
    const pw = cfg.night ? 1.7 : 0.95;
    const ph = cfg.night ? 2.7 : 3.3;
    ctx.beginPath(); ctx.ellipse(0, 0, pw * cfg.fear, ph * (cfg.fear > 1.3 ? 0.85 : 1), 0, 0, U.TAU); ctx.fill();
    /* dual specular highlights */
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath(); ctx.arc(1.15, -0.95, 0.85, 0, U.TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(-1.05, 0.95, 0.45, 0, U.TAU); ctx.fill();
    ctx.restore();
    /* tapetum lucidum bloom at night */
    if (cfg.night) {
      const bg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 8);
      bg.addColorStop(0, 'rgba(90,255,200,0.4)');
      bg.addColorStop(1, 'rgba(90,255,200,0)');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.arc(ex, ey, 8, 0, U.TAU); ctx.fill();
    }
  }

  function drawGroomCat(ctx, t, cfg) {
    /* sitting pose, paw circling the face */
    ctx.fillStyle = cfg.coat;
    ctx.strokeStyle = 'rgba(70,45,25,0.28)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(0, 2, 12, 9.5, 0, 0, U.TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,245,220,0.5)';
    ctx.beginPath(); ctx.ellipse(0, 4, 8, 6, 0, 0, U.TAU); ctx.fill();
    /* head, tilted */
    const hy = -11;
    ctx.fillStyle = cfg.point;
    tri(ctx, -9, hy - 8, -5, hy - 16, -1.5, hy - 7.5); ctx.fill();
    tri(ctx, 9, hy - 8, 5, hy - 16, 1.5, hy - 7.5); ctx.fill();
    ctx.fillStyle = cfg.coat;
    ctx.beginPath(); ctx.arc(-1, hy, 10, 0, U.TAU); ctx.fill();
    ctx.fillStyle = cfg.mask;
    ctx.beginPath(); ctx.ellipse(-1, hy + 1.2, 7.2, 5.4, 0, 0, U.TAU); ctx.fill();
    /* raised paw grooming */
    const px = 6 + Math.sin(t * 12) * 2.4;
    const py = -13 + Math.cos(t * 12) * 1.6;
    ctx.fillStyle = cfg.point;
    ctx.beginPath(); ctx.arc(px, py, 3.2, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#f7f2e8';
    ctx.beginPath(); ctx.arc(px, py, 1.6, 0, U.TAU); ctx.fill();
    /* happy closed eyes */
    ctx.strokeStyle = '#1a1a22';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(-5.6, hy, 1.9, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    ctx.beginPath(); ctx.arc(3.6, hy, 1.9, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    /* nose */
    ctx.fillStyle = '#f28ba0';
    tri(ctx, -1 - 1.2, hy + 2.2, -1 + 1.2, hy + 2.2, -1, hy + 3.8); ctx.fill();
  }

  function drawSleepingCat(ctx, t, cfg) {
    const br = Math.sin(t * 2.4) * 0.5;
    ctx.fillStyle = cfg.coat;
    ctx.strokeStyle = 'rgba(70,45,25,0.25)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(0, 0, 15 + br * 0.3, 11 + br * 0.2, 0, 0, U.TAU); ctx.fill(); ctx.stroke();
    /* tail wrapped around */
    ctx.strokeStyle = cfg.point;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 1, 12.5, Math.PI * 0.2, Math.PI * 1.55); ctx.stroke();
    /* head tucked */
    ctx.fillStyle = cfg.coat;
    ctx.beginPath(); ctx.arc(0, -7, 8, 0, U.TAU); ctx.fill();
    ctx.fillStyle = cfg.mask;
    ctx.beginPath(); ctx.ellipse(0, -6.6, 5.6, 4.1, 0, 0, U.TAU); ctx.fill();
    /* closed eyes */
    ctx.strokeStyle = '#1a1a22';
    ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.arc(-2.7, -6.8, 1.7, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(2.7, -6.8, 1.7, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
    /* ears peeking */
    ctx.fillStyle = cfg.point;
    tri(ctx, -6.5, -12, -4, -18, -1, -12.5); ctx.fill();
    tri(ctx, 6.5, -12, 4, -18, 1, -12.5); ctx.fill();
  }

  /* --------------------------------------------------------------- prey */
  function drawMouse(ctx, sx, sy, e) {
    const scur = e.state === 'flee' ? e.animT * 22 : e.animT * 10;
    ctx.fillStyle = 'rgba(15,15,15,0.25)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 4, 7, 3, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(e.dir);
    /* tail */
    ctx.strokeStyle = '#b0855a';
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(0, 6); ctx.quadraticCurveTo(-7, 8 + Math.sin(e.animT * 8) * 2, -12, 5); ctx.stroke();
    /* body */
    ctx.fillStyle = '#c99a6b';
    ctx.beginPath(); ctx.ellipse(0, 0, 6.5, 4.6, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#e8cfae';
    ctx.beginPath(); ctx.ellipse(1.5, 0, 3.4, 2.6, 0, 0, U.TAU); ctx.fill();
    /* head */
    ctx.fillStyle = '#c99a6b';
    ctx.beginPath(); ctx.arc(5.4, -1.4, 3.4, 0, U.TAU); ctx.fill();
    /* ears */
    ctx.fillStyle = '#b0855a';
    ctx.beginPath(); ctx.arc(3.4, -3.8, 1.7, 0, U.TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(6.8, -3.6, 1.7, 0, U.TAU); ctx.fill();
    /* eye */
    ctx.fillStyle = '#101018';
    ctx.beginPath(); ctx.arc(6.6, -1.8, 0.75, 0, U.TAU); ctx.fill();
    /* nose */
    ctx.fillStyle = '#f0a0a0';
    ctx.beginPath(); ctx.arc(8.6, -0.6, 0.7, 0, U.TAU); ctx.fill();
    /* legs */
    ctx.strokeStyle = '#8a6a48';
    ctx.lineWidth = 1.3;
    for (let i = 0; i < 4; i++) {
      const a = scur + i * 1.57;
      ctx.beginPath();
      ctx.moveTo(-3 + (i % 2) * 2.5, 3);
      ctx.lineTo(-3 + (i % 2) * 2.5 + Math.sin(a) * 2.4, 3 + Math.abs(Math.cos(a)) * 2.4);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGrasshopper(ctx, sx, sy, e) {
    ctx.fillStyle = 'rgba(15,15,15,0.22)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 3, 6, 2.6, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    const hop = e.state === 'flee' ? Math.abs(Math.sin(e.animT * 12)) : 0;
    ctx.rotate(e.dir);
    ctx.translate(0, -hop * 3);
    /* big hind legs */
    ctx.strokeStyle = '#4f8f3f';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-1, 3.4); ctx.lineTo(-4.5, 7); ctx.lineTo(-1.5, 9.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1, 3.4); ctx.lineTo(3.5, 7); ctx.lineTo(0.5, 9.5); ctx.stroke();
    /* body */
    ctx.fillStyle = '#6fae4e';
    ctx.beginPath(); ctx.ellipse(0, 0, 5.4, 3, 0, 0, U.TAU); ctx.fill();
    /* thorax + head */
    ctx.fillStyle = '#5c9c41';
    ctx.beginPath(); ctx.ellipse(3.6, -1, 3, 2.4, -0.4, 0, U.TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(6.2, -2, 1.8, 0, U.TAU); ctx.fill();
    /* eye */
    ctx.fillStyle = '#101018';
    ctx.beginPath(); ctx.arc(6.9, -2.3, 0.7, 0, U.TAU); ctx.fill();
    /* antennae */
    ctx.strokeStyle = '#4f8f3f';
    ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.moveTo(6.9, -3); ctx.quadraticCurveTo(9, -6, 11, -5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6.2, -3.2); ctx.quadraticCurveTo(7.5, -7, 9, -7); ctx.stroke();
    ctx.restore();
  }

  function drawSalmon(ctx, sx, sy, e) {
    const wig = Math.sin(e.animT * 5 + e.y * 0.02) * 0.5;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(wig * 0.4);
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = '#e08a6a';
    ctx.beginPath(); ctx.ellipse(0, 0, 8.5, 3.6, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#f2b39a';
    ctx.beginPath(); ctx.ellipse(2, 0, 4.6, 2.6, 0, 0, U.TAU); ctx.fill();
    /* tail */
    ctx.fillStyle = '#d0775c';
    tri(ctx, -7.5, 0, -11, -3.6, -10.5, 3.6); ctx.fill();
    /* eye */
    ctx.fillStyle = '#101018';
    ctx.beginPath(); ctx.arc(5.4, -1, 0.8, 0, U.TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(5.6, -1.3, 0.3, 0, U.TAU); ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  /* ----------------------------------------------------------- predators */
  function drawBoar(ctx, sx, sy, e) {
    ctx.fillStyle = 'rgba(15,15,15,0.28)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 7, 15, 6, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(e.dir);
    const angry = e.chasing || e.state === 'charge';
    /* body */
    ctx.fillStyle = '#6d4c33';
    ctx.beginPath(); ctx.ellipse(0, 0, 13, 9, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#5d3f2a';
    ctx.beginPath(); ctx.ellipse(2, 2, 9, 5.5, 0, 0, U.TAU); ctx.fill();
    /* bristles */
    ctx.strokeStyle = '#4a3322';
    ctx.lineWidth = 1.4;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath(); ctx.moveTo(i * 4, -7); ctx.lineTo(i * 4 + 1.5, -11); ctx.stroke();
    }
    /* head + snout */
    ctx.fillStyle = '#7a5638';
    ctx.beginPath(); ctx.arc(11, -2, 6.4, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#8a6846';
    ctx.beginPath(); ctx.ellipse(15.5, -1, 3.6, 2.8, 0, 0, U.TAU); ctx.fill();
    /* nostrils */
    ctx.fillStyle = '#3a2a1a';
    ctx.beginPath(); ctx.arc(17.6, -1.6, 0.7, 0, U.TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(17.6, 0.4, 0.7, 0, U.TAU); ctx.fill();
    /* tusks */
    ctx.fillStyle = '#f2ead8';
    tri(ctx, 14.5, 0.6, 15.8, 0.2, 15, 3.4); ctx.fill();
    tri(ctx, 14.5, -2.2, 15.8, -1.8, 15, -4.6); ctx.fill();
    /* ear */
    ctx.fillStyle = '#5d3f2a';
    ctx.beginPath(); ctx.arc(8.5, -7.6, 2.4, 0, U.TAU); ctx.fill();
    /* eye */
    ctx.fillStyle = angry ? '#e04030' : '#201810';
    ctx.beginPath(); ctx.arc(12.6, -3.4, 1.5, 0, U.TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(13, -3.8, 0.5, 0, U.TAU); ctx.fill();
    /* legs */
    ctx.fillStyle = '#4a3322';
    const gp = e.state === 'chase' || e.state === 'charge' ? e.animT * 14 : 0;
    for (let i = 0; i < 4; i++) {
      const off = Math.sin(gp + i * 1.7) * 2.4;
      ctx.beginPath();
      ctx.ellipse(-7 + (i % 2) * 14, 7.5, 2.6, 3.4 + off * 0.2, 0, 0, U.TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFox(ctx, sx, sy, e) {
    ctx.fillStyle = 'rgba(15,15,15,0.26)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 6, 12, 5, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(e.dir);
    const run = e.state === 'chase' ? e.animT * 14 : e.animT * 6;
    /* tail */
    ctx.strokeStyle = '#c96a30';
    ctx.lineWidth = 4.4;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-8, 1); ctx.quadraticCurveTo(-15, -1 + Math.sin(e.animT * 6) * 3, -19, 3); ctx.stroke();
    ctx.fillStyle = '#f6efe0';
    ctx.beginPath(); ctx.arc(-18.6, 3, 2.6, 0, U.TAU); ctx.fill();
    /* body */
    ctx.fillStyle = '#d97b3f';
    ctx.beginPath(); ctx.ellipse(0, 0, 11, 7, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#f2e8d5';
    ctx.beginPath(); ctx.ellipse(3, 2.4, 6, 3.6, 0, 0, U.TAU); ctx.fill();
    /* head */
    ctx.fillStyle = '#e08a4a';
    ctx.beginPath(); ctx.arc(9, -2, 5.2, 0, U.TAU); ctx.fill();
    /* ears */
    ctx.fillStyle = '#c96a30';
    tri(ctx, 5.8, -6.6, 6.8, -11.4, 9, -6.8); ctx.fill();
    tri(ctx, 10.2, -6.6, 9.2, -11.4, 7, -6.8); ctx.fill();
    ctx.fillStyle = '#2a1a10';
    ctx.beginPath(); ctx.arc(6.8, -8.4, 0.8, 0, U.TAU); ctx.fill();
    /* eye */
    ctx.fillStyle = e.chasing ? '#e04030' : '#201810';
    ctx.beginPath(); ctx.arc(11, -3.4, 1.2, 0, U.TAU); ctx.fill();
    /* nose */
    ctx.fillStyle = '#241812';
    ctx.beginPath(); ctx.arc(13.8, -1.4, 1, 0, U.TAU); ctx.fill();
    /* legs */
    ctx.strokeStyle = '#a85a28';
    ctx.lineWidth = 2.2;
    for (let i = 0; i < 4; i++) {
      const off = Math.sin(run + i * 1.7) * 2.6;
      ctx.beginPath();
      ctx.moveTo(-5 + (i % 2) * 11, 5.5);
      ctx.lineTo(-5 + (i % 2) * 11 + off * 0.5, 9);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawViper(ctx, sx, sy, e) {
    ctx.save();
    ctx.translate(sx, sy);
    const seg = 6;
    const a = e.animT * 4;
    const pts = [];
    for (let i = 0; i <= seg; i++) {
      const t = i / seg;
      const bend = Math.sin(t * Math.PI * 2 + a) * 5;
      pts.push([Math.cos(e.dir) * t * 14 - Math.sin(e.dir) * bend, Math.sin(e.dir) * t * 14 + Math.cos(e.dir) * bend]);
    }
    ctx.strokeStyle = '#3f7a3f';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (const [px, py] of pts) ctx.lineTo(px, py);
    ctx.stroke();
    ctx.strokeStyle = '#2c5c2c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (const [px, py] of pts) ctx.lineTo(px, py);
    ctx.stroke();
    /* head */
    ctx.fillStyle = '#4f8f4f';
    ctx.beginPath(); ctx.ellipse(pts[seg][0], pts[seg][1], 3.4, 2.4, e.dir, 0, U.TAU); ctx.fill();
    /* eye */
    ctx.fillStyle = e.chasing ? '#e04030' : '#1a1a10';
    ctx.beginPath(); ctx.arc(pts[seg][0] + Math.cos(e.dir) * 2.2, pts[seg][1] + Math.sin(e.dir) * 2.2 - 0.8, 0.8, 0, U.TAU); ctx.fill();
    /* flicking tongue */
    const flick = Math.sin(a * 2) > 0.6 ? 1 : 0;
    if (flick) {
      ctx.strokeStyle = '#e04060';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pts[seg][0] + Math.cos(e.dir) * 4, pts[seg][1] + Math.sin(e.dir) * 4);
      ctx.lineTo(pts[seg][0] + Math.cos(e.dir) * 6.5, pts[seg][1] + Math.sin(e.dir) * 6.5);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ----------------------------------------------------------- companion */
  const COMPANION_COLORS = [
    { coat: '#f3e9dd', mask: '#5c3a27', point: '#4a2c1b' },
    { coat: '#eef2f8', mask: '#3f5b8f', point: '#33507f' },
    { coat: '#f0e2d4', mask: '#6d4030', point: '#5c3728' },
  ];

  function drawCompanion(ctx, sx, sy, c, view) {
    ctx.fillStyle = 'rgba(10,20,10,0.28)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 6, 15, 6, 0, 0, U.TAU); ctx.fill();
    const cfg = COMPANION_COLORS[c.colorIdx % 3];
    const state = c.follow ? 'walk' : 'idle';
    drawCat(ctx, sx, sy, c.dir, state, c.animT, {
      coat: cfg.coat, mask: cfg.mask, point: cfg.point,
      night: view.night > 0.4, fear: 1, blink: false, wet: false, hurt: false,
      collar: c.adopted,
    });
    /* friendship bar */
    if (c.met && c.friendship > 0) {
      const w = Math.max(10, c.friendship * 0.16);
      ctx.fillStyle = 'rgba(10,10,20,0.55)';
      rr(ctx, sx - w / 2 - 1, sy - 33, w + 2, 5, 2.5); ctx.fill();
      ctx.fillStyle = c.friendship > 55 ? '#f472b6' : c.friendship > 25 ? '#fb9fc4' : '#fca5c9';
      rr(ctx, sx - w / 2, sy - 32, w, 3, 1.5); ctx.fill();
    }
    /* name + perk badge */
    if (c.met) {
      ctx.textAlign = 'center';
      ctx.font = '9px sans-serif';
      ctx.fillStyle = c.adopted ? 'rgba(255,214,90,0.95)' : 'rgba(255,255,255,0.8)';
      ctx.fillText(c.name + (c.perk >= 3 ? ' ⚔️' : c.perk === 2 ? ' ⚠️' : ''), sx, sy - 24);
    }
    /* status marker */
    if (c.summonT > 0) {
      /* 召唤作战中：红色脉冲光环 + 战意标记 */
      const pulse = 0.5 + 0.5 * Math.sin(view.time * 8);
      ctx.fillStyle = 'rgba(255,90,60,' + (0.3 + pulse * 0.25).toFixed(2) + ')';
      ctx.beginPath(); ctx.arc(sx, sy - 32, 13 + pulse * 4, 0, U.TAU); ctx.fill();
      ctx.textAlign = 'center';
      ctx.font = '12px sans-serif';
      ctx.fillText('⚔️', sx, sy - 32);
    } else if (c.adopted) {
      ctx.textAlign = 'center';
      ctx.font = '10px sans-serif';
      ctx.fillText('❤️', sx, sy - 38);
    } else if (c.met && c.friendship >= 60) {
      const pulse = 0.45 + 0.55 * Math.abs(Math.sin(view.time * 4));
      ctx.globalAlpha = pulse;
      ctx.textAlign = 'center';
      ctx.font = '11px sans-serif';
      ctx.fillText('💗', sx, sy - 38);
      ctx.globalAlpha = 1;
    }
  }

  /* ------------------------------------------------- challenge sprites */
  const RIVAL_COLORS = [
    { coat: '#c9c2b8', mask: '#4d4a46', point: '#3b3834' },
    { coat: '#b98a6e', mask: '#5a3a28', point: '#4a2c1b' },
    { coat: '#8e6b52', mask: '#3f2a1c', point: '#33221a' },
  ];

  function drawRival(ctx, sx, sy, e, view) {
    ctx.fillStyle = 'rgba(10,20,10,0.28)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 6, 15, 6, 0, 0, U.TAU); ctx.fill();
    const cfg = RIVAL_COLORS[e.colorIdx % 3];
    const st = e.state === 'flee' ? 'walk' : 'sneak';
    drawCat(ctx, sx, sy, e.dir, st, e.animT, {
      coat: cfg.coat, mask: cfg.mask, point: cfg.point,
      night: view.night > 0.4, fear: 1.4, blink: false, wet: false, hurt: e.hp < 2,
      eyeColor: '#ff9a3d',
    });
    /* hp pips */
    ctx.fillStyle = 'rgba(10,10,20,0.55)';
    rr(ctx, sx - 9, sy - 35, 18, 4.5, 2.2); ctx.fill();
    ctx.fillStyle = e.hp >= 2 ? '#ffb066' : '#ff7a3d';
    rr(ctx, sx - 8, sy - 34, (e.hp / 2) * 16, 2.5, 1.2); ctx.fill();
  }

  function drawDog(ctx, sx, sy, e) {
    ctx.fillStyle = 'rgba(10,15,10,0.3)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 8, 18, 7, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(e.dir);
    const run = e.state === 'chase' ? e.animT * 16 : e.animT * 5;
    /* wagging tail */
    ctx.strokeStyle = '#8a6a45';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    const wag = Math.sin(e.animT * 9) * 5;
    ctx.beginPath();
    ctx.moveTo(-10, -2);
    ctx.quadraticCurveTo(-17, -6 + wag * 0.6, -20, -8 + wag);
    ctx.stroke();
    /* body */
    ctx.fillStyle = '#c99a5b';
    ctx.beginPath(); ctx.ellipse(0, 0, 16, 10, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#e8cfae';
    ctx.beginPath(); ctx.ellipse(4, 3, 9, 5.5, 0, 0, U.TAU); ctx.fill();
    /* head */
    ctx.fillStyle = '#b98a4e';
    ctx.beginPath(); ctx.arc(13, -3, 7.5, 0, U.TAU); ctx.fill();
    /* muzzle + nose */
    ctx.fillStyle = '#e8d5b0';
    ctx.beginPath(); ctx.ellipse(18, -1, 4, 3, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#241812';
    ctx.beginPath(); ctx.arc(21.5, -1, 1.2, 0, U.TAU); ctx.fill();
    /* floppy ear */
    ctx.fillStyle = '#8a5f35';
    ctx.beginPath(); ctx.ellipse(9, -9.5, 3.2, 5, 0.5, 0, U.TAU); ctx.fill();
    /* eye */
    ctx.fillStyle = e.state === 'chase' ? '#e04030' : '#201810';
    ctx.beginPath(); ctx.arc(14.5, -4.5, 1.6, 0, U.TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.beginPath(); ctx.arc(14.9, -5, 0.5, 0, U.TAU); ctx.fill();
    /* panting tongue */
    if (e.state === 'chase' && Math.sin(e.animT * 6) > 0.3) {
      ctx.fillStyle = '#e0646a';
      ctx.beginPath(); ctx.ellipse(19.5, 2, 1.6, 2.4, 0.3, 0, U.TAU); ctx.fill();
    }
    /* galloping legs */
    ctx.strokeStyle = '#8a6a45';
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      const off = Math.sin(run + i * 1.57) * 3.5;
      ctx.beginPath();
      ctx.moveTo(-8 + (i % 2) * 16, 8);
      ctx.lineTo(-8 + (i % 2) * 16 + off * 0.6, 12.5);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawWolf(ctx, sx, sy, e) {
    ctx.fillStyle = 'rgba(10,15,10,0.3)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 8, 17, 6.5, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(e.dir);
    const run = e.state === 'chase' ? e.animT * 15 : e.animT * 5;
    /* bushy tail */
    ctx.fillStyle = '#7c828e';
    ctx.beginPath();
    ctx.moveTo(-11, -2);
    ctx.quadraticCurveTo(-18, -4 + Math.sin(e.animT * 8) * 3, -20, -6 + Math.sin(e.animT * 8) * 4);
    ctx.quadraticCurveTo(-17, -1, -10, 1);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#a8aeb9';
    ctx.beginPath(); ctx.arc(-18, -5 + Math.sin(e.animT * 8) * 4, 2.6, 0, U.TAU); ctx.fill();
    /* body */
    ctx.fillStyle = '#8d939e';
    ctx.beginPath(); ctx.ellipse(0, 0, 15, 9.5, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#b3b9c4';
    ctx.beginPath(); ctx.ellipse(3, 3, 8, 5, 0, 0, U.TAU); ctx.fill();
    /* head */
    ctx.fillStyle = '#9aa1ac';
    ctx.beginPath(); ctx.arc(12, -3, 7, 0, U.TAU); ctx.fill();
    /* snout + nose + fangs */
    ctx.fillStyle = '#c4cad4';
    ctx.beginPath(); ctx.ellipse(17.5, -1, 4.2, 3, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#1c1c22';
    ctx.beginPath(); ctx.arc(21, -1.2, 1.3, 0, U.TAU); ctx.fill();
    if (e.state === 'chase') {
      ctx.fillStyle = '#f2f2f6';
      tri(ctx, 19.6, 0.6, 20.4, 1.6, 20.9, 0.6); ctx.fill();
      tri(ctx, 18.4, 0.8, 19.2, 1.8, 19.7, 0.8); ctx.fill();
    }
    /* pointed ears */
    ctx.fillStyle = '#7c828e';
    tri(ctx, 8, -9, 7.4, -14.5, 11.2, -10.2); ctx.fill();
    tri(ctx, 12.4, -9.6, 11.8, -15, 15.6, -10.8); ctx.fill();
    /* eye */
    ctx.fillStyle = e.state === 'chase' ? '#e04830' : '#20242c';
    ctx.beginPath(); ctx.arc(13.6, -4.4, 1.5, 0, U.TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(14, -4.9, 0.5, 0, U.TAU); ctx.fill();
    /* legs */
    ctx.strokeStyle = '#6d7380';
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      const off = Math.sin(run + i * 1.57) * 3.6;
      ctx.beginPath();
      ctx.moveTo(-7 + (i % 2) * 15, 8);
      ctx.lineTo(-7 + (i % 2) * 15 + off * 0.6, 12.5);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawChallengeEntity(ctx, e, view) {
    const cam = view.cam;
    const sx = e.x - cam.x, sy = e.y - cam.y;
    if (e.kind === 'viper') drawViper(ctx, sx, sy, e);
    else if (e.kind === 'rival') drawRival(ctx, sx, sy, e, view);
    else if (e.kind === 'dog') drawDog(ctx, sx, sy, e);
    else if (e.kind === 'wolf') drawWolf(ctx, sx, sy, e);
    else if (e.kind === 'stampede') drawBoar(ctx, sx, sy, e);
  }

  /* ------------------------------------------------------------ bosses */
  function drawBoss(ctx, e, view) {
    const cam = view.cam;
    const sx = e.x - cam.x, sy = e.y - cam.y;
    if (e.bt === 'boar') {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(1.6, 1.6);
      drawBoar(ctx, 0, 0, e);
      ctx.restore();
    } else if (e.bt === 'wolf') {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(1.55, 1.55);
      drawWolf(ctx, 0, 0, e);
      ctx.restore();
    } else if (e.bt === 'serpent') {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(1.9, 1.9);
      drawViper(ctx, 0, 0, e);
      ctx.restore();
    } else if (e.bt === 'kid') {
      drawKid(ctx, sx, sy, e, view);
    }
    /* 名字 + 血条 */
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(8,8,18,0.72)';
    rr(ctx, sx - 44, sy - 46, 88, 18, 9); ctx.fill();
    ctx.fillStyle = '#ff6b6b';
    ctx.fillText(e.name, sx, sy - 33);
    ctx.fillStyle = 'rgba(8,8,18,0.7)';
    rr(ctx, sx - 42, sy - 28, 84, 6, 3); ctx.fill();
    ctx.fillStyle = '#e04030';
    rr(ctx, sx - 41, sy - 27, 82 * (e.hp / e.hpMax), 4, 2); ctx.fill();
  }

  function drawKid(ctx, sx, sy, e, view) {
    ctx.fillStyle = 'rgba(10,15,10,0.3)';
    ctx.beginPath(); ctx.ellipse(sx, sy + 14, 15, 6, 0, 0, U.TAU); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(e.dir);
    /* legs */
    ctx.strokeStyle = '#4a5a8c';
    ctx.lineWidth = 4;
    const run = e.animT * 8;
    for (let i = 0; i < 2; i++) {
      const off = Math.sin(run + i * Math.PI) * 3;
      ctx.beginPath();
      ctx.moveTo(-4 + i * 8, 8);
      ctx.lineTo(-4 + i * 8 + off, 16);
      ctx.stroke();
    }
    /* body (shirt) */
    ctx.fillStyle = '#d94f4f';
    ctx.beginPath(); ctx.ellipse(0, 0, 10, 12, 0, 0, U.TAU); ctx.fill();
    /* head */
    ctx.fillStyle = '#f0c8a0';
    ctx.beginPath(); ctx.arc(2, -13, 7.5, 0, U.TAU); ctx.fill();
    /* hair */
    ctx.fillStyle = '#3a2a1c';
    ctx.beginPath(); ctx.arc(2, -15, 7.5, Math.PI * 0.9, Math.PI * 2.1); ctx.fill();
    /* eyes (looking at player) */
    ctx.fillStyle = '#20242c';
    ctx.beginPath(); ctx.arc(4.4, -13.5, 1.1, 0, U.TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(0.2, -13.5, 1.1, 0, U.TAU); ctx.fill();
    /* slingshot arm */
    ctx.strokeStyle = '#8a6a45';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(6, -3); ctx.lineTo(14, -8); ctx.stroke();
    /* slingshot */
    ctx.strokeStyle = '#5a3a20';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(14, -12); ctx.lineTo(16, -6); ctx.lineTo(20, -10);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(240,240,240,0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(14, -12); ctx.lineTo(15, -9); ctx.moveTo(20, -10); ctx.lineTo(15, -9); ctx.stroke();
    ctx.restore();
  }

  /* ------------------------------------------- interaction F prompts */
  function drawFPrompt(ctx, x, y, label) {
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const w = 16 + (label ? ctx.measureText(label).width : 0);
    ctx.fillStyle = 'rgba(8,8,18,0.62)';
    rr(ctx, x - w / 2, y - 8, w, 16, 8); ctx.fill();
    ctx.fillStyle = '#ffd24a';
    ctx.fillText('F' + (label ? ' ' + label : ''), x, y + 1);
    ctx.textBaseline = 'alphabetic';
  }

  function drawInteractPrompts(ctx, view) {
    const p = Game.entities.player;
    const cam = view.cam;
    if (!p || p.inCave) return;
    const px = p.x - cam.x, py = p.y - cam.y;
    /* 世界内的可互动物品 */
    const f = Game.world.findNearest(['gate', 'berry', 'catnip', 'herbs', 'spring', 'cave', 'trashcan', 'dumpster'], p.x, p.y, 90);
    if (f) {
      const fx = (f.tx + 0.5) * W.TILE - cam.x;
      const fy = (f.ty + 0.5) * W.TILE - cam.y - 34;
      if (fx > -50 && fx < view.w + 50 && fy > -50 && fy < view.h + 50) {
        const lbl = f.type === 'gate' ? ('前往' + f.label)
          : f.type === 'berry' ? '吃浆果'
            : f.type === 'catnip' ? '拾取'
              : f.type === 'herbs' ? '拾取'
                : f.type === 'spring' ? '喝水'
                  : f.type === 'trashcan' || f.type === 'dumpster' ? '翻垃圾'
                    : '进入';
        drawFPrompt(ctx, fx, fy, lbl);
      }
    } else if (Game.world.isNearWater(p.x, p.y)) {
      /* 水边：只能捞鱼，口渴请找泉水 */
      drawFPrompt(ctx, px, py - 42, '捞鱼');
    }
    /* 附近的猫 */
    for (const c of Game.entities.companions) {
      if (U.dist2(c.x, c.y, p.x, p.y) < 74 * 74) {
        drawFPrompt(ctx, c.x - cam.x, c.y - cam.y - 46, '抚摸');
        break;
      }
    }
  }

  /* ------------------------------------------------------------- weather */
  function drawWeather(ctx, view) {
    if (view.weather === 'rain') {
      for (const r of rain) {
        r.y += r.spd * 0.016 / view.h;
        if (r.y > 1.15) { r.y = -0.15; r.x = Math.random(); }
      }
      ctx.strokeStyle = 'rgba(190,215,255,0.3)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (const r of rain) {
        const x = r.x * view.w, y = r.y * view.h;
        ctx.moveTo(x, y);
        ctx.lineTo(x - 7, y + r.len);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(16,26,46,0.14)';
      ctx.fillRect(0, 0, view.w, view.h);
    }
    for (const m of mist) {
      m.x += m.spd * 0.016 / view.w;
      if (m.x > 1.35) m.x = -0.35;
      const x = m.x * view.w, y = m.y * view.h;
      const g = ctx.createRadialGradient(x, y, 0, x, y, m.r);
      g.addColorStop(0, 'rgba(235,242,250,' + m.alpha + ')');
      g.addColorStop(1, 'rgba(235,242,250,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, m.r, 0, U.TAU); ctx.fill();
    }
  }

  /* ------------------------------------------------------------- lighting */
  function drawLighting(ctx, view) {
    const night = view.night;
    if (night > 0.01) {
      ctx.fillStyle = 'rgba(8,10,36,' + (night * night * 0.44).toFixed(3) + ')';
      ctx.fillRect(0, 0, view.w, view.h);
      if (night > 0.5) {
        for (const s of stars) {
          const tw = 0.4 + 0.6 * Math.abs(Math.sin(view.time * 1.5 + s.ph));
          ctx.globalAlpha = (night - 0.5) * 2 * tw * 0.75;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(s.x * view.w, s.y * view.h, s.s, s.s);
        }
        ctx.globalAlpha = 1;
      }
      /* feline night-vision pool around the cat */
      const g = ctx.createRadialGradient(view.playerX, view.playerY, 60, view.playerX, view.playerY, 380);
      g.addColorStop(0, 'rgba(255,240,200,0.13)');
      g.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, view.w, view.h);
    }
    if (view.warm > 0.01) {
      ctx.fillStyle = 'rgba(255,150,60,' + view.warm.toFixed(3) + ')';
      ctx.fillRect(0, 0, view.w, view.h);
    }
  }

  /* ------------------------------------------------------- DOF + vignette */
  function spawnBokeh() {
    bokeh.length = 0;
    const n = 26;
    for (let i = 0; i < n; i++) {
      let x, y;
      if (Math.random() < 0.5) {
        x = Math.random();
        y = Math.random() < 0.5 ? Math.random() * 0.13 : 0.87 + Math.random() * 0.13;
      } else {
        x = Math.random() < 0.5 ? Math.random() * 0.13 : 0.87 + Math.random() * 0.13;
        y = Math.random();
      }
      const r = 8 + Math.random() * 26;
      const warm = Math.random() < 0.6;
      bokeh.push({
        x, y, r,
        c: warm
          ? 'rgba(255,224,160,' + (0.05 + Math.random() * 0.07).toFixed(3) + ')'
          : 'rgba(190,220,255,' + (0.04 + Math.random() * 0.06).toFixed(3) + ')',
      });
    }
  }

  function refreshBokeh(dt) {
    bokehT += dt;
    if (bokehT > 2.4) { bokehT = 0; spawnBokeh(); }
  }

  function drawVignette(ctx, view) {
    const cx = view.w / 2, cy = view.h / 2;
    const g = ctx.createRadialGradient(cx, cy, Math.min(view.w, view.h) * 0.32, cx, cy, Math.max(view.w, view.h) * 0.8);
    g.addColorStop(0, 'rgba(8,4,16,0)');
    g.addColorStop(1, 'rgba(8,4,16,0.36)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, view.w, view.h);
    for (const b of bokeh) {
      const g2 = ctx.createRadialGradient(b.x * view.w, b.y * view.h, 0, b.x * view.w, b.y * view.h, b.r);
      g2.addColorStop(0, b.c);
      g2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g2;
      ctx.beginPath(); ctx.arc(b.x * view.w, b.y * view.h, b.r, 0, U.TAU); ctx.fill();
    }
  }

  /* ---------------------------------------------------------------- cave */
  const CAVE = { w: 1100, h: 720 };
  const CAVE_FIRE = { x: 560, y: 430 };
  const CAVE_BED = { x: 880, y: 560 };
  const CAVE_RACK = { x: 240, y: 330 };
  const CAVE_WORK = { x: 250, y: 500 };
  const CAVE_EXIT = { x: 560, y: 140 };   /* 下移，避免被顶部 HUD 遮挡 */

  function drawCave(ctx, view) {
    const cam = view.cam;
    /* floor */
    ctx.fillStyle = '#2b2623';
    ctx.fillRect(0, 0, view.w, view.h);
    for (let ty = 0; ty < Math.ceil(view.h / 64); ty++) {
      for (let tx = 0; tx < Math.ceil(view.w / 64); tx++) {
        const h = U.hash2(tx, ty);
        ctx.fillStyle = h > 0.5 ? 'rgba(62,56,50,0.3)' : 'rgba(18,16,14,0.3)';
        ctx.fillRect(tx * 64, ty * 64, 64, 64);
      }
    }
    /* wall border */
    ctx.fillStyle = '#17130f';
    ctx.fillRect(0, 0, view.w, 26);
    ctx.fillRect(0, view.h - 26, view.w, 26);
    ctx.fillRect(0, 0, 26, view.h);
    ctx.fillRect(view.w - 26, 0, 26, view.h);
    /* ambient darkness */
    ctx.fillStyle = 'rgba(3,3,7,0.62)';
    ctx.fillRect(0, 0, view.w, view.h);

    const toSX = (wx) => wx - cam.x;
    const toSY = (wy) => wy - cam.y;

    /* drying rack */
    let rx = toSX(CAVE_RACK.x), ry = toSY(CAVE_RACK.y);
    ctx.strokeStyle = '#5d4326';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(rx - 30, ry - 20); ctx.lineTo(rx + 30, ry - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx - 26, ry - 20); ctx.lineTo(rx - 26, ry + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx + 26, ry - 20); ctx.lineTo(rx + 26, ry + 14); ctx.stroke();
    ctx.strokeStyle = '#c9a06a';
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath(); ctx.moveTo(rx + i * 16 - 8, ry - 20); ctx.lineTo(rx + i * 16 - 6, ry - 6); ctx.stroke();
    }

    /* 工作台：制作物品 */
    rx = toSX(CAVE_WORK.x); ry = toSY(CAVE_WORK.y);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(rx, ry + 14, 34, 9, 0, 0, U.TAU); ctx.fill();
    ctx.fillStyle = '#6b4a2e';
    rr(ctx, rx - 30, ry - 12, 60, 18, 3); ctx.fill();
    ctx.fillStyle = '#7d5836';
    rr(ctx, rx - 30, ry - 16, 60, 6, 3); ctx.fill();
    /* 桌腿 */
    ctx.fillStyle = '#543a20';
    ctx.fillRect(rx - 26, ry + 6, 5, 12);
    ctx.fillRect(rx + 21, ry + 6, 5, 12);
    /* 工具：锤子 + 卷轴 */
    ctx.fillStyle = '#c9a06a';
    ctx.fillRect(rx - 20, ry - 9, 16, 2);
    ctx.fillStyle = '#8f8f96';
    ctx.fillRect(rx - 14, ry - 13, 5, 5);
    ctx.fillStyle = '#e8e0d0';
    rr(ctx, rx + 6, ry - 10, 10, 8, 2); ctx.fill();
    ctx.strokeStyle = '#8a7a5a';
    ctx.lineWidth = 1;
    ctx.strokeRect(rx + 6, ry - 10, 10, 8);

    /* bed: straw + blanket */
    rx = toSX(CAVE_BED.x); ry = toSY(CAVE_BED.y);
    ctx.fillStyle = '#8a7340';
    rr(ctx, rx - 46, ry - 20, 92, 44, 14); ctx.fill();
    ctx.strokeStyle = '#6d5a30';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(rx - 40 + i * 20, ry - 14); ctx.lineTo(rx - 40 + i * 20, ry + 14); ctx.stroke();
    }
    ctx.fillStyle = '#7c5a3c';
    rr(ctx, rx - 30, ry - 26, 60, 26, 10); ctx.fill();
    ctx.fillStyle = '#9a7250';
    rr(ctx, rx - 30, ry - 26, 60, 8, 10); ctx.fill();

    /* exit arch */
    rx = toSX(CAVE_EXIT.x); ry = toSY(CAVE_EXIT.y);
    ctx.fillStyle = '#0b0a12';
    ctx.beginPath(); ctx.ellipse(rx, ry + 8, 30, 40, 0, 0, Math.PI); ctx.fill();
    ctx.fillStyle = '#4a4642';
    ctx.beginPath(); ctx.ellipse(rx, ry + 10, 34, 44, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    /* faint daylight/moonlight through the mouth */
    if (view.night < 0.5) {
      ctx.fillStyle = 'rgba(190,220,240,' + (0.18 * (1 - view.night)).toFixed(2) + ')';
      ctx.beginPath(); ctx.ellipse(rx, ry + 4, 26, 34, 0, 0, Math.PI); ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(150,180,255,0.1)';
      ctx.beginPath(); ctx.ellipse(rx, ry + 4, 26, 34, 0, 0, Math.PI); ctx.fill();
    }

    /* campfire */
    rx = toSX(CAVE_FIRE.x); ry = toSY(CAVE_FIRE.y);
    const flick = Math.sin(view.time * 11) * 0.5 + Math.sin(view.time * 23 + 2) * 0.35;
    const fl = 0.75 + flick * 0.25;
    /* light pool */
    const lg = ctx.createRadialGradient(rx, ry, 10, rx, ry, 240);
    lg.addColorStop(0, 'rgba(255,170,80,' + (0.5 * fl).toFixed(2) + ')');
    lg.addColorStop(0.4, 'rgba(255,130,50,' + (0.22 * fl).toFixed(2) + ')');
    lg.addColorStop(1, 'rgba(255,110,40,0)');
    ctx.fillStyle = lg;
    ctx.beginPath(); ctx.arc(rx, ry, 240, 0, U.TAU); ctx.fill();
    /* logs */
    ctx.strokeStyle = '#4a2e18';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(rx - 20, ry + 10); ctx.lineTo(rx + 20, ry + 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx - 18, ry + 6); ctx.lineTo(rx + 18, ry + 12); ctx.stroke();
    /* stones */
    ctx.fillStyle = '#6d675f';
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * U.TAU;
      ctx.beginPath(); ctx.arc(rx + Math.cos(a) * 26, ry + 12 + Math.sin(a) * 5, 4, 0, U.TAU); ctx.fill();
    }
    /* flames */
    const fh = 30 + flick * 14;
    ctx.fillStyle = 'rgba(255,120,30,0.9)';
    ctx.beginPath();
    ctx.moveTo(rx - 12, ry + 4);
    ctx.quadraticCurveTo(rx - 8, ry - fh * 0.5, rx, ry - fh);
    ctx.quadraticCurveTo(rx + 8, ry - fh * 0.5, rx + 12, ry + 4);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,210,90,0.95)';
    ctx.beginPath();
    ctx.moveTo(rx - 7, ry + 4);
    ctx.quadraticCurveTo(rx - 4, ry - fh * 0.35, rx, ry - fh * 0.62);
    ctx.quadraticCurveTo(rx + 4, ry - fh * 0.35, rx + 7, ry + 4);
    ctx.closePath(); ctx.fill();
    /* embers */
    if (Math.random() < 0.3) {
      Game.particles.spawn({
        x: rx + cam.x + U.randRange(-8, 8), y: ry + cam.y - 6,
        kind: 'dot', size: 1.8, color: 'rgba(255,180,80,0.9)',
        vx: U.randRange(-6, 6), vy: U.randRange(-40, -20), life: 0.9, grav: 20,
      });
    }
    /* player light pool */
    const pg = ctx.createRadialGradient(view.playerX, view.playerY, 8, view.playerX, view.playerY, 170);
    pg.addColorStop(0, 'rgba(255,190,120,0.22)');
    pg.addColorStop(1, 'rgba(255,160,90,0)');
    ctx.fillStyle = pg;
    ctx.beginPath(); ctx.arc(view.playerX, view.playerY, 170, 0, U.TAU); ctx.fill();

    /* entities inside the cave */
    const p = Game.entities.player;
    drawCat(ctx, view.playerX, view.playerY, p.facing, p.state === 'sleep' ? 'sleep' : 'idle', p.animT, {
      coat: '#f6e7cf', mask: '#5c3a27', point: '#4a2c1b',
      night: true, fear: 1, blink: p.blink, wet: p.stats.wetness > 55, hurt: p.hurtT > 0,
    });

    /* interaction prompts */
    const near = (ax, ay, bx, by, r) => U.dist2(ax, ay, bx, by) < r * r;
    if (near(p.x, p.y, CAVE_WORK.x, CAVE_WORK.y, 80)) {
      ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(200,230,190,0.95)';
      ctx.fillText('F — 制作物品', toSX(CAVE_WORK.x), toSY(CAVE_WORK.y) - 34);
    }
    if (near(p.x, p.y, CAVE_FIRE.x, CAVE_FIRE.y, 115)) {
      ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,220,160,0.95)';
      ctx.fillText('F — 做饭 / 烘干', toSX(CAVE_FIRE.x), toSY(CAVE_FIRE.y) - 44);
    }
    if (near(p.x, p.y, CAVE_BED.x, CAVE_BED.y, 95)) {
      ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,220,160,0.95)';
      ctx.fillText('F — 睡到天亮', toSX(CAVE_BED.x), toSY(CAVE_BED.y) - 44);
    }
    if (near(p.x, p.y, CAVE_EXIT.x, CAVE_EXIT.y, 135)) {
      ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(200,220,255,0.95)';
      ctx.fillText('F — 离开洞穴', toSX(CAVE_EXIT.x), toSY(CAVE_EXIT.y) + 52);
    }
    drawVignette(ctx, view);
    if (view.fade > 0) {
      ctx.fillStyle = 'rgba(4,4,10,' + view.fade + ')';
      ctx.fillRect(0, 0, view.w, view.h);
    }
  }

  Game.render = {
    init, draw, drawCave, refreshBokeh,
    CAVE, CAVE_FIRE, CAVE_BED, CAVE_RACK, CAVE_EXIT,
    CAVE_WORK,
    drawCat, drawChallengeEntity,
  };
})();
