/* ==========================================================================
   Wilderness Feline Instinct — world.js
   Multi-zone procedural world generation:
     Zone 0 荒野草原 (Wild Meadow)      — entry zone
     Zone 1 城市小区 (City District)    — Lv 5 gate
     Zone 2 干燥荒野 (Dry Wasteland)    — Lv 10 gate
     Zone 3 幽暗森林 (Dark Forest)      — Lv 15 gate
   Each zone has edge gates connecting to others, and its own terrain.
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;

  const TILE = 48;
  const W = 168;
  const H = 168;
  const T = { MEADOW: 0, FOREST: 1, WATER: 2, SAND: 3, GRASS: 4, ROCK: 5, WALL: 6, ROAD: 7, DIRT: 8, SWAMP: 9, URBAN: 10 };

  const ZONE_INFO = {
    0: { name: '荒野草原', min: 1 },
    1: { name: '城市小区', min: 5 },
    2: { name: '干燥荒野', min: 10 },
    3: { name: '幽暗森林', min: 15 },
  };

  const terrain = new Uint8Array(W * H);
  const features = [];
  const rivers = [];
  let spawn = { x: TILE * (W >> 1), y: TILE * (H >> 1) };
  let seed = 1;
  let zone = 0;

  const idx = (tx, ty) => ty * W + tx;
  const inBounds = (tx, ty) => tx >= 0 && ty >= 0 && tx < W && ty < H;
  const tileAt = (px, py) => ({ tx: Math.floor(px / TILE), ty: Math.floor(py / TILE) });
  function terrainAt(px, py) {
    const t = tileAt(px, py);
    return inBounds(t.tx, t.ty) ? terrain[idx(t.tx, t.ty)] : T.ROCK;
  }
  const isWater = (tx, ty) => inBounds(tx, ty) && terrain[idx(tx, ty)] === T.WATER;
  const canWalk = (tx, ty) => {
    if (!inBounds(tx, ty)) return false;
    const t = terrain[idx(tx, ty)];
    return t !== T.WATER && t !== T.ROCK && t !== T.WALL;
  };

  /* ---------------------------------------------------------------- wild */
  function genWild() {
    const noise = U.makeNoise(seed);
    const n1 = U.makeNoise(seed + 101);
    const n2 = U.makeNoise(seed + 303);
    for (let ty = 0; ty < H; ty++) {
      for (let tx = 0; tx < W; tx++) {
        const e = noise.fbm(tx * 0.028, ty * 0.028, 4);
        const f = n1.fbm(tx * 0.014 + 55.5, ty * 0.014 + 55.5, 4);
        const g = noise.fbm(tx * 0.05 + 200, ty * 0.05 + 200, 3);
        let t;
        if (e < 0.40) t = T.WATER;
        else if (e < 0.445) t = T.SAND;
        else if (f > 0.60) t = T.FOREST;
        else if (g > 0.58) t = T.GRASS;
        else t = T.MEADOW;
        terrain[idx(tx, ty)] = t;
      }
    }
    /* meandering rivers (narrow — pounce can cross) */
    const starts = [
      { x: U.randRange(W * 0.15, W * 0.85), y: -6, ang: Math.PI / 2 + U.randRange(-0.45, 0.45) },
      { x: -6, y: U.randRange(H * 0.2, H * 0.8), ang: U.randRange(-0.45, 0.45) },
    ];
    for (const st of starts) {
      const river = [];
      let x = st.x, y = st.y, ang = st.ang;
      const phase = U.randRange(0, 1000);
      const steps = Math.ceil((W + H) * 1.15);
      for (let i = 0; i < steps; i++) {
        ang += (noise.fbm(i * 0.02 + phase, 0, 3) - 0.5) * 0.55;
        x += Math.cos(ang) * 0.62;
        y += Math.sin(ang) * 0.62;
        river.push({ x, y });
        const cx = Math.round(x), cy = Math.round(y);
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const tx = cx + dx, ty = cy + dy;
            if (!inBounds(tx, ty)) continue;
            const d = Math.hypot(dx, dy);
            if (d <= 0.85) terrain[idx(tx, ty)] = T.WATER;
            else if (d <= 1.5 && terrain[idx(tx, ty)] !== T.WATER) terrain[idx(tx, ty)] = T.SAND;
          }
        }
      }
      rivers.push(river);
    }
    /* caves — 洞穴是小猫的基地，多放一些 */
    let caves = 0;
    for (let tries = 0; tries < 5000 && caves < 8; tries++) {
      const tx = U.randInt(14, W - 14), ty = U.randInt(14, H - 14);
      if (n2.fbm(tx * 0.035, ty * 0.035, 3) > 0.6 && terrain[idx(tx, ty)] === T.MEADOW) {
        features.push({ type: 'cave', tx, ty, regrowT: 0 });
        caves++;
      }
    }
    /* springs (14) */
    let springs = 0;
    for (let tries = 0; tries < 8000 && springs < 14; tries++) {
      const tx = U.randInt(8, W - 8), ty = U.randInt(8, H - 8);
      const t = terrain[idx(tx, ty)];
      if (t !== T.MEADOW && t !== T.SAND) continue;
      let near = false;
      outer: for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          if (isWater(tx + dx, ty + dy)) { near = true; break outer; }
        }
      }
      if (!near) continue;
      if (features.some((f) => f.type === 'spring' && Math.hypot(f.tx - tx, f.ty - ty) < 10)) continue;
      features.push({ type: 'spring', tx, ty, regrowT: 0 });
      springs++;
    }
    /* berries / catnip / herbs */
    const clusters = U.randInt(16, 24);
    for (let c = 0; c < clusters; c++) {
      const cx = U.randInt(6, W - 6), cy = U.randInt(6, H - 6);
      for (let i = 0; i < U.randInt(2, 4); i++) {
        const tx = U.clamp(cx + U.randInt(-3, 3), 1, W - 2);
        const ty = U.clamp(cy + U.randInt(-3, 3), 1, H - 2);
        const t = terrain[idx(tx, ty)];
        if (t === T.MEADOW || t === T.GRASS) features.push({ type: 'berry', tx, ty, regrowT: 0 });
      }
    }
    for (let i = 0; i < U.randInt(5, 7); i++) {
      const tx = U.randInt(8, W - 8), ty = U.randInt(8, H - 8);
      if (terrain[idx(tx, ty)] === T.MEADOW || terrain[idx(tx, ty)] === T.GRASS) features.push({ type: 'catnip', tx, ty, regrowT: 0 });
    }
    for (let i = 0; i < U.randInt(14, 20); i++) {
      const tx = U.randInt(4, W - 4), ty = U.randInt(4, H - 4);
      if (terrain[idx(tx, ty)] === T.MEADOW) features.push({ type: 'herbs', tx, ty, regrowT: 0 });
    }
    /* spawn */
    const cx = W >> 1, cy = H >> 1;
    let best = null, bd = Infinity;
    for (let dy = -34; dy <= 34; dy++) {
      for (let dx = -34; dx <= 34; dx++) {
        const tx = cx + dx, ty = cy + dy;
        if (!inBounds(tx, ty)) continue;
        if (terrain[idx(tx, ty)] === T.MEADOW) {
          const d = dx * dx + dy * dy;
          if (d < bd) { bd = d; best = { x: (tx + 0.5) * TILE, y: (ty + 0.5) * TILE }; }
        }
      }
    }
    spawn = best || { x: cx * TILE, y: cy * TILE };
  }

  /* ---------------------------------------------------------------- city */
  /* 城市小区：线性街道探索地图（2D 投影视角）
     可移动区域是一条横向长街（rows 78–88），上下为建筑立面，
     街道沿 x 方向分段变化：入口广场→商业街→花园→暗巷→仓库→Boss区 */
  const CITY = { Y0: 78, Y1: 88, ROAD: [82, 84], MID: 83 };
  function genCity() {
    terrain.fill(T.WALL);   /* 整张图先铺满建筑立面 */
    /* 街道带：人行道 / 广场底 */
    for (let y = CITY.Y0; y <= CITY.Y1; y++) {
      for (let x = 0; x < W; x++) terrain[idx(x, y)] = T.URBAN;
    }
    /* 中央马路 */
    for (let y = CITY.ROAD[0]; y <= CITY.ROAD[1]; y++) {
      for (let x = 0; x < W; x++) terrain[idx(x, y)] = T.ROAD;
    }
    /* --- 西端：入口广场 + 喷泉 --- */
    for (let y = CITY.Y0 + 1; y < CITY.Y1; y++) for (let x = 6; x < 22; x++) terrain[idx(x, y)] = T.URBAN;
    features.push({ type: 'spring', tx: 13, ty: CITY.MID, regrowT: 0 });
    /* --- 商业街：橱窗立柱 + 横街 --- */
    for (let x = 24; x < 58; x++) {
      if (x % 6 === 0) {
        terrain[idx(x, CITY.Y0 + 1)] = T.WALL;
        terrain[idx(x, CITY.Y1 - 1)] = T.WALL;
      }
    }
    for (let x = 40; x < 44; x++) for (let y = CITY.Y0; y <= CITY.Y1; y++) terrain[idx(x, y)] = T.ROAD;
    /* --- 花园：绿地、树篱、池塘、浆果草药 --- */
    for (let x = 60; x < 82; x++) {
      for (let y = CITY.Y0 + 2; y <= CITY.Y1 - 2; y++) terrain[idx(x, y)] = T.MEADOW;
    }
    for (let y = CITY.Y0 + 2; y <= CITY.Y1 - 2; y += 3) {
      for (let x = 61; x < 81; x += 4) terrain[idx(x, y)] = T.FOREST;
    }
    for (let y = 85; y <= 89; y++) {
      for (let x = 68; x <= 74; x++) {
        const d = Math.hypot(x - 71, y - 87);
        if (d <= 1.3) terrain[idx(x, y)] = T.WATER;
        else if (d <= 2 && terrain[idx(x, y)] !== T.FOREST) terrain[idx(x, y)] = T.SAND;
      }
    }
    features.push({ type: 'berry', tx: 64, ty: CITY.MID, regrowT: 0 });
    features.push({ type: 'herbs', tx: 78, ty: CITY.MID + 1, regrowT: 0 });
    /* --- 暗巷：窄巷 + 猫薄荷 --- */
    for (let x = 86; x < 104; x++) {
      for (let y = CITY.Y0; y <= CITY.Y1; y++) terrain[idx(x, y)] = (x % 5 === 0) ? T.GRASS : T.URBAN;
    }
    features.push({ type: 'catnip', tx: 90, ty: CITY.MID, regrowT: 0 });
    features.push({ type: 'catnip', tx: 99, ty: CITY.MID + 1, regrowT: 0 });
    /* --- 仓库 / 工业区（东端，通往 Boss 竞技场）--- */
    for (let x = 106; x < 148; x++) {
      for (let y = CITY.Y0; y <= CITY.Y1; y++) terrain[idx(x, y)] = T.DIRT;
    }
    for (let x = 110; x < 114; x++) for (let y = CITY.Y0; y <= CITY.Y1; y++) terrain[idx(x, y)] = T.ROAD;
    features.push({ type: 'herbs', tx: 122, ty: CITY.MID + 1, regrowT: 0 });
    /* --- 极东端：Boss 竞技场 --- */
    for (let y = CITY.Y0; y <= CITY.Y1; y++) for (let x = 148; x < W; x++) terrain[idx(x, y)] = T.URBAN;
    /* --- 出生点：西端广场 --- */
    const cx = 15, cy = CITY.MID;
    terrain[idx(cx, cy)] = T.URBAN;
    spawn = { x: (cx + 0.5) * TILE, y: (cy + 0.5) * TILE };
  }

  /* ------------------------------------------------------------ wasteland */
  function genWasteland() {
    const noise = U.makeNoise(seed);
    terrain.fill(T.DIRT);
    for (let ty = 0; ty < H; ty++) {
      for (let tx = 0; tx < W; tx++) {
        const s = noise.fbm(tx * 0.03, ty * 0.03, 4);
        const g = noise.fbm(tx * 0.05 + 100, ty * 0.05 + 100, 3);
        if (s > 0.62) terrain[idx(tx, ty)] = T.SAND;
        else if (s > 0.58) terrain[idx(tx, ty)] = T.ROCK;
        else if (g > 0.66) terrain[idx(tx, ty)] = T.GRASS;
      }
    }
    /* dried riverbed */
    let x = U.randRange(20, W - 20), y = 4, ang = Math.PI / 2 + U.randRange(-0.3, 0.3);
    for (let i = 0; i < W * 1.2; i++) {
      ang += (noise.fbm(i * 0.03, 7, 3) - 0.5) * 0.5;
      x += Math.cos(ang) * 0.7; y += Math.sin(ang) * 0.7;
      const cx = Math.round(x), cy = Math.round(y);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!inBounds(cx + dx, cy + dy)) continue;
          const d = Math.hypot(dx, dy);
          if (d <= 0.6) terrain[idx(cx + dx, cy + dy)] = T.WATER;   /* oasis pools */
          else if (d <= 1.2) terrain[idx(cx + dx, cy + dy)] = T.SAND;
        }
      }
    }
    /* herbs / catnip / spring oasis */
    for (let i = 0; i < 12; i++) {
      const tx = U.randInt(4, W - 4), ty = U.randInt(4, H - 4);
      if (terrain[idx(tx, ty)] === T.DIRT || terrain[idx(tx, ty)] === T.SAND) features.push({ type: 'herbs', tx, ty, regrowT: 0 });
    }
    for (let i = 0; i < 4; i++) {
      const tx = U.randInt(6, W - 6), ty = U.randInt(6, H - 6);
      if (terrain[idx(tx, ty)] === T.DIRT) features.push({ type: 'catnip', tx, ty, regrowT: 0 });
    }
    for (let i = 0; i < 3; i++) {
      const tx = U.randInt(8, W - 8), ty = U.randInt(8, H - 8);
      if (terrain[idx(tx, ty)] === T.DIRT) features.push({ type: 'spring', tx, ty, regrowT: 0 });
    }
    /* spawn */
    const cx = W >> 1, cy = H >> 1;
    terrain[idx(cx, cy)] = T.DIRT;
    spawn = { x: (cx + 0.5) * TILE, y: (cy + 0.5) * TILE };
  }

  /* ---------------------------------------------------------- dark forest */
  function genDarkForest() {
    const noise = U.makeNoise(seed);
    terrain.fill(T.FOREST);
    for (let ty = 0; ty < H; ty++) {
      for (let tx = 0; tx < W; tx++) {
        const s = noise.fbm(tx * 0.03 + 40, ty * 0.03 + 40, 4);
        if (s > 0.66) terrain[idx(tx, ty)] = T.SWAMP;
        else if (s < 0.3 && U.hash2(tx, ty) > 0.5) terrain[idx(tx, ty)] = T.MEADOW;   /* clearings */
      }
    }
    /* few springs */
    for (let i = 0; i < 4; i++) {
      const tx = U.randInt(8, W - 8), ty = U.randInt(8, H - 8);
      if (terrain[idx(tx, ty)] === T.MEADOW || terrain[idx(tx, ty)] === T.FOREST) {
        terrain[idx(tx, ty)] = T.MEADOW;
        features.push({ type: 'spring', tx, ty, regrowT: 0 });
      }
    }
    for (let i = 0; i < 10; i++) {
      const tx = U.randInt(4, W - 4), ty = U.randInt(4, H - 4);
      if (terrain[idx(tx, ty)] === T.MEADOW) features.push({ type: 'herbs', tx, ty, regrowT: 0 });
    }
    for (let i = 0; i < 5; i++) {
      const tx = U.randInt(6, W - 6), ty = U.randInt(6, H - 6);
      if (terrain[idx(tx, ty)] === T.MEADOW) features.push({ type: 'catnip', tx, ty, regrowT: 0 });
    }
    let caves = 0;
    for (let tries = 0; tries < 3000 && caves < 4; tries++) {
      const tx = U.randInt(12, W - 12), ty = U.randInt(12, H - 12);
      if (terrain[idx(tx, ty)] === T.MEADOW) { features.push({ type: 'cave', tx, ty, regrowT: 0 }); caves++; }
    }
    /* spawn in a clearing */
    let best = null, bd = Infinity;
    const cx = W >> 1, cy = H >> 1;
    for (let dy = -30; dy <= 30; dy++) {
      for (let dx = -30; dx <= 30; dx++) {
        const tx = cx + dx, ty = cy + dy;
        if (!inBounds(tx, ty)) continue;
        if (terrain[idx(tx, ty)] === T.MEADOW) {
          const d = dx * dx + dy * dy;
          if (d < bd) { bd = d; best = { x: (tx + 0.5) * TILE, y: (ty + 0.5) * TILE }; }
        }
      }
    }
    spawn = best || { x: cx * TILE, y: cy * TILE };
  }

  /* ------------------------------------------------------------------ gates */
  function placeGates() {
    /* 大门周围清出一小片可行走区域，避免到达时卡在墙里 */
    const walkBase = () => (zone === 1 ? T.URBAN : zone === 2 ? T.DIRT : T.MEADOW);
    const g = (tx, ty, to, minLevel, label) => {
      if (!inBounds(tx, ty)) return;
      const base = walkBase();
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = tx + dx, ny = ty + dy;
          if (inBounds(nx, ny) && terrain[idx(nx, ny)] !== T.WATER) terrain[idx(nx, ny)] = base;
        }
      }
      features.push({ type: 'gate', tx, ty, to, minLevel, label, regrowT: 0 });
    };
    if (zone === 0) {
      g(Math.floor(W / 2), 4, 1, 5, '城市小区');
      g(W - 4, Math.floor(H / 2), 2, 10, '干燥荒野');
      g(4, Math.floor(H / 2), 3, 15, '幽暗森林');
    } else if (zone === 1) {
      g(4, CITY.MID, 0, 1, '荒野草原');   /* 城市西端出口 */
    } else if (zone === 2) {
      g(4, Math.floor(H / 2), 0, 1, '荒野草原');
    } else if (zone === 3) {
      g(W - 4, Math.floor(H / 2), 0, 1, '荒野草原');
    }
  }

  function generate(newSeed, newZone) {
    seed = newSeed >>> 0;
    zone = newZone === undefined ? 0 : newZone;
    features.length = 0;
    rivers.length = 0;
    if (zone === 1) genCity();
    else if (zone === 2) genWasteland();
    else if (zone === 3) genDarkForest();
    else genWild();
    placeGates();
  }

  /* Nearest feature of any listed type within maxDist (world px), skipping harvested */
  function findNearest(types, px, py, maxDist) {
    let best = null, bd = maxDist * maxDist;
    for (const f of features) {
      if (!types.includes(f.type)) continue;
      if (f.regrowT > 0) continue;
      const fx = (f.tx + 0.5) * TILE, fy = (f.ty + 0.5) * TILE;
      const dx = fx - px, dy = fy - py, d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = f; }
    }
    return best;
  }

  function isNearWater(px, py) {
    const t = tileAt(px, py);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (isWater(t.tx + dx, t.ty + dy)) return true;
      }
    }
    return false;
  }

  Game.world = {
    TILE, W, H, T, terrain, features, rivers, seed, ZONE_INFO, CITY,
    get spawn() { return spawn; },
    get zone() { return zone; },
    generate, terrainAt, isWater, canWalk, tileAt, inBounds, isNearWater, findNearest, idx,
  };
})();
