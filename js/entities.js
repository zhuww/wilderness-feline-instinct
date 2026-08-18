/* ==========================================================================
   Wilderness Feline Instinct — entities.js
   Player Siamese cat, prey, predators, companion strays, inventory,
   crafting, vitals, scent sources, pounce combat, interactions.
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const U = Game.utils;
  const W = Game.world;

  /* ------------------------------------------------------------------ items */
  const ITEMS = {
    berry: { name: '野莓', icon: '🍓', food: 9, water: 2, heal: 2, desc: '清甜的森林野莓，吃下回一点血。' },
    mouse: { name: '田鼠', icon: '🐭', food: 18, heal: 4, desc: '一只肥美的田鼠，补充体力。' },
    grasshopper: { name: '蚱蜢', icon: '🦗', food: 5, heal: 1, desc: '嘎嘣脆的小跳虫。' },
    salmon: { name: '河鲑', icon: '🐟', food: 22, water: 4, heal: 5, desc: '刚出水的河鲑，营养丰富。' },
    cooked_salmon: { name: '烤鲑鱼', icon: '🔥', food: 34, mood: 4, heal: 8, desc: '烟熏味美，鲜嫩多汁，大补。' },
    catnip: { name: '新鲜猫薄荷', icon: '🌿', mood: 16, zoomies: true, desc: '立刻提神醒脑。' },
    dried_catnip: { name: '干猫薄荷', icon: '🍃', mood: 30, zoomies: true, desc: '效力加倍！' },
    herbs: { name: '草药', icon: '🌼', desc: '舒缓的野地草药。' },
    leaves: { name: '树叶', icon: '🍂', desc: '宽大的绿叶。' },
    vines: { name: '藤蔓', icon: '🪢', desc: '结实柔韧的藤蔓。' },
    fishbone: { name: '鱼骨', icon: '🦴', desc: '干净洁白的鱼骨。' },
    sinew: { name: '筋腱', icon: '🧵', desc: '强韧的动物筋腱。' },
    fat: { name: '野猪油', icon: '🧈', desc: '肥厚油腻的脂肪。' },
    herb_salve: { name: '草药膏', icon: '🧴', heal: 32, desc: '敷在伤口上恢复 32 点生命。' },
    leaf_hat: { name: '树叶雨帽', icon: '🍀', equip: 'hat', desc: '雨天防湿，且每次受伤 -2 点（防御）。' },
    fishbone_collar: { name: '鱼骨项圈', icon: '📿', equip: 'collar', desc: '攻击 +3，流浪猫更快信任你。' },
    cat_tooth_necklace: { name: '猫牙项链', icon: '🦷', equip: 'collar', desc: '攻击 +20%：对敌人造成更高伤害。' },
    /* skill books — read them from the satchel to learn the skill forever */
    book_hunter: { name: '猎手本能', icon: '📘', book: true, skill: 'hunter', desc: '扑击伤害 +15%，捕捉范围更大。' },
    book_swift: { name: '疾风快爪', icon: '📗', book: true, skill: 'swift', desc: '移动速度 +10%，体力回复 +25%。' },
    book_thick: { name: '厚实毛皮', icon: '📙', book: true, skill: 'thick', desc: '受到的伤害 -25%。' },
    book_keen: { name: '敏锐嗅觉', icon: '📕', book: true, skill: 'keen', desc: '嗅探范围 +40%，气味更浓密。' },
    book_brave: { name: '无畏之心', icon: '📔', book: true, skill: 'brave', desc: '心情上限 +25%，挑战奖励 +50%。' },
    book_angler: { name: '渔夫之尾', icon: '📒', book: true, skill: 'angler', desc: '钓鱼必定成功。' },
    book_guardian: { name: '守护之力', icon: '📗', book: true, skill: 'guardian', desc: '友情获取 +50%，狩猎协助 +4。' },
    book_camo: { name: '树叶伪装', icon: '📘', book: true, skill: 'camo', desc: '高草丛隐匿效果翻倍，潜行更省体力。' },
  };

  const RECIPES = [
    { id: 'leaf_hat', name: '树叶雨帽', icon: '🍀', parts: { leaves: 3, vines: 2 }, desc: '雨天防湿，且每次受伤 -2 点（防御）。' },
    { id: 'fishbone_collar', name: '鱼骨项圈', icon: '📿', parts: { fishbone: 3, sinew: 1 }, desc: '攻击 +3，流浪猫更快信任你。' },
    { id: 'cat_tooth_necklace', name: '猫牙项链', icon: '🦷', parts: { fishbone: 4, sinew: 2 }, desc: '攻击 +20%，对敌人造成更高伤害。' },
    { id: 'dried_catnip', name: '干猫薄荷', icon: '🍃', parts: { catnip: 2 }, dayOnly: true, desc: '强力提神 — 需要白天晾晒。' },
    { id: 'herb_salve', name: '草药膏', icon: '🧴', parts: { herbs: 3, fat: 1 }, desc: '敷在伤口上恢复 32 点生命。' },
  ];

  /* ------------------------------------------------------------ creature defs */
  const PREY = {
    mouse: { r: 6, speed: 95, flee: 150, hp: 1, item: 'mouse' },
    grasshopper: { r: 5, speed: 66, flee: 120, hp: 1, item: 'grasshopper' },
    salmon: { r: 8, speed: 34, flee: 0, hp: 1, item: 'salmon' },
  };
  const PRED = {
    boar: { r: 14, speed: 92, charge: 330, hp: 60, dmg: 12, aggro: 260 },
    fox: { r: 11, speed: 148, hp: 35, dmg: 8, aggro: 235 },
    viper: { r: 7, speed: 42, hp: 15, dmg: 10, aggro: 120 },
  };
  const COMPANION_NAMES = ['Mochi', 'Yuki', 'Nori', 'Suki', 'Taro', 'Kumo', 'Hana', 'Rin'];
  const TYPE_NAMES = { boar: '野猪', fox: '狐狸', viper: '毒蛇', mouse: '田鼠', grasshopper: '蚱蜢', salmon: '河鲑' };
  const typeName = (t) => TYPE_NAMES[t] || t;

  const list = [];
  const companions = [];
  let player = null;

  /* --------------------------------------------------------------- player */
  function makePlayer() {
    return {
      kind: 'player',
      x: W.spawn.x, y: W.spawn.y, vx: 0, vy: 0,
      r: 14,
      speed: 150, sneakSpeed: 60,
      facing: -Math.PI / 2,
      state: 'idle', stateT: 0,
      animT: Math.random() * 10,
      level: 1, xp: 0, skills: [], skillPoints: 0,
      stats: {
        hp: 100, hpMax: 100,
        satiety: 78, satietyMax: 100,
        hydration: 84, hydrationMax: 100,
        stamina: 100, staminaMax: 100,
        mood: 72, moodMax: 100,
        wetness: 0, wetnessMax: 100,
      },
      inventory: [],
      equipped: { hat: null, collar: null },
      sniff: { active: false, t: 0, cd: 0 },
      groomCd: 0, interactCd: 0, pounceCd: 0,
      summonCd: 0,
      napT: 0, zoomiesT: 0,
      hurtT: 0, blinkT: 3, blink: false,
      tallGrass: false, inCave: false,
      outside: { x: 0, y: 0 },
      pounceHit: null,
    };
  }

  /* ------------------------------------------------------------ spawners */
  function spawnPrey(type, tx, ty) {
    const d = PREY[type];
    const e = {
      kind: 'prey', type,
      x: (tx + 0.5) * W.TILE, y: (ty + 0.5) * W.TILE,
      vx: 0, vy: 0, r: d.r, speed: d.speed, flee: d.flee, hp: d.hp,
      alive: true, dir: Math.random() * U.TAU,
      animT: Math.random() * 10, wanderT: U.randRange(1, 3),
      state: 'wander', scentT: U.randRange(0.2, 0.8),
      item: d.item,
    };
    list.push(e);
    return e;
  }

  function spawnPredator(type, tx, ty) {
    const d = PRED[type];
    const e = {
      kind: 'predator', type,
      x: (tx + 0.5) * W.TILE, y: (ty + 0.5) * W.TILE,
      vx: 0, vy: 0, r: d.r, speed: d.speed, charge: d.charge,
      hp: d.hp, dmg: d.dmg, aggro: d.aggro,
      alive: true, dir: Math.random() * U.TAU,
      animT: Math.random() * 10, wanderT: U.randRange(1.5, 4),
      state: 'wander', attackCd: 0, chasing: false, alerted: false,
      footstepsCd: U.randRange(2, 6), scentT: U.randRange(0.2, 0.8),
      fleeT: 0,
    };
    list.push(e);
    return e;
  }

  function spawnCompanion() {
    const c = {
      kind: 'companion',
      name: U.pick(COMPANION_NAMES),
      colorIdx: U.randInt(0, 2),
      x: 0, y: 0, r: 12,
      speed: 85, dir: Math.random() * U.TAU,
      animT: Math.random() * 10, wanderT: U.randRange(2, 5),
      state: 'wander',
      friendship: 0, perk: 0,
      met: false, adopted: false,
      follow: false, scentT: U.randRange(0.3, 0.9),
      giftCd: U.randRange(20, 50), warnCd: 0, heartT: 0,
      summonT: 0, attackCd: 0,
      alive: true,
    };
    // place near player spawn, on walkable land
    for (let i = 0; i < 80; i++) {
      const tx = U.randInt(0, W.W - 1), ty = U.randInt(0, W.H - 1);
      if (W.canWalk(tx, ty) && W.terrain[W.idx(tx, ty)] !== W.T.FOREST) {
        c.x = (tx + 0.5) * W.TILE; c.y = (ty + 0.5) * W.TILE;
        break;
      }
    }
    list.push(c);
    companions.push(c);
    return c;
  }

  /* ----------------------------------------------------------- zone init */
  const ZONE_SPAWN = {
    0: { prey: { mouse: 42, grasshopper: 30 }, salmon: 26, pred: { boar: 6, fox: 4, viper: 6 }, comp: 4 },
    1: { prey: { mouse: 26, grasshopper: 12 }, salmon: 8, pred: { fox: 5, viper: 3 }, comp: 3 },
    2: { prey: { mouse: 20, grasshopper: 22 }, salmon: 6, pred: { boar: 5, fox: 6, viper: 8 }, comp: 3 },
    3: { prey: { mouse: 28, grasshopper: 12 }, salmon: 4, pred: { boar: 6, fox: 5, viper: 9 }, comp: 3 },
  };

  const BOSS_DEFS = {
    0: { name: '巨野猪', hp: 250, r: 22, bt: 'boar', speed: 90, charge: 430, dmg: 18 },
    1: { name: '弹弓顽童', hp: 180, r: 14, bt: 'kid', speed: 95, dmg: 10 },
    2: { name: '巨狼', hp: 300, r: 20, bt: 'wolf', speed: 300, dmg: 16 },
    3: { name: '巨蛇', hp: 350, r: 16, bt: 'serpent', speed: 75, dmg: 18 },
  };
  const BOSS_SPOTS = {
    0: { tx: 146, ty: 146 },
    1: { tx: 156, ty: 83 },   /* 城市东端竞技场 */
    2: { tx: 16, ty: 146 },
    3: { tx: 146, ty: 16 },
  };
  let boss = null;
  let bossProjectiles = [];

  function init(zone, placePos, keepPlayer) {
    list.length = 0;
    companions.length = 0;
    bossProjectiles.length = 0;
    if (keepPlayer && player) {
      /* 跨区域传送：保留玩家一切成长 */
    } else {
      player = makePlayer();
      recalcMaxStats(player);
    }
    if (placePos) {
      player.x = placePos.x; player.y = placePos.y;
    } else {
      player.x = W.spawn.x; player.y = W.spawn.y;
    }
    player.outside = { x: player.x, y: player.y };
    player.inCave = false;
    player.pounceHit = null;

    const cfg = ZONE_SPAWN[zone] || ZONE_SPAWN[0];
    for (const type in cfg.prey) {
      let n = 0;
      for (let tries = 0; tries < 3000 && n < cfg.prey[type]; tries++) {
        const tx = U.randInt(2, W.W - 3), ty = U.randInt(2, W.H - 3);
        const t = W.terrain[W.idx(tx, ty)];
        const ok = type === 'mouse' ? (t === W.T.MEADOW || t === W.T.GRASS || t === W.T.URBAN || t === W.T.DIRT)
          : (t === W.T.MEADOW || t === W.T.DIRT);
        if (ok) { spawnPrey(type, tx, ty); n++; }
      }
    }
    let salmon = 0;
    for (let tries = 0; tries < 5000 && salmon < cfg.salmon; tries++) {
      const tx = U.randInt(2, W.W - 3), ty = U.randInt(2, W.H - 3);
      if (W.isWater(tx, ty)) { spawnPrey('salmon', tx, ty); salmon++; }
    }
    for (const type in cfg.pred) {
      let n = 0;
      for (let tries = 0; tries < 3000 && n < cfg.pred[type]; tries++) {
        const tx = U.randInt(2, W.W - 3), ty = U.randInt(2, W.H - 3);
        const t = W.terrain[W.idx(tx, ty)];
        const ok = type === 'viper' ? (t === W.T.GRASS || t === W.T.FOREST || t === W.T.SWAMP || t === W.T.URBAN)
          : (t !== W.T.WATER && t !== W.T.ROCK && t !== W.T.WALL);
        if (ok) { spawnPredator(type, tx, ty); n++; }
      }
    }
    for (let i = 0; i < cfg.comp; i++) spawnCompanion();
    spawnBoss(zone);
  }

  function spawnBoss(zone) {
    const def = BOSS_DEFS[zone] || BOSS_DEFS[0];
    const sp = BOSS_SPOTS[zone] || BOSS_SPOTS[0];
    /* 清理出一小块竞技场 */
    for (let dy = -5; dy <= 5; dy++) {
      for (let dx = -5; dx <= 5; dx++) {
        const tx = sp.tx + dx, ty = sp.ty + dy;
        if (W.inBounds(tx, ty) && W.terrain[W.idx(tx, ty)] !== W.T.WATER) W.terrain[W.idx(tx, ty)] = W.T.MEADOW;
      }
    }
    if (Game.state.bossDefeated && Game.state.bossDefeated[zone]) { boss = null; return; }
    boss = {
      kind: 'boss', bt: def.bt, name: def.name,
      x: (sp.tx + 0.5) * W.TILE, y: (sp.ty + 0.5) * W.TILE,
      r: def.r, hp: def.hp, hpMax: def.hp,
      speed: def.speed, charge: def.charge || 0, dmg: def.dmg,
      aggro: false, attackCd: 0, chargeCd: 0, shootCd: U.randRange(1.5, 2.5),
      animT: Math.random() * 10, dir: 0, state: 'idle', stateT: 0, alive: true,
    };
  }

  function updateBoss(dt) {
    if (!boss || !boss.alive) return;
    const p = player;
    boss.animT += dt;
    boss.attackCd = Math.max(0, boss.attackCd - dt);
    boss.chargeCd = Math.max(0, boss.chargeCd - dt);
    const d = U.dist(boss.x, boss.y, p.x, p.y);
    if (d < 560) boss.aggro = true;
    if (!boss.aggro) return;

    if (boss.bt === 'boar') {
      if (boss.state === 'charge') {
        boss.stateT -= dt;
        boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
        moveEntity(boss, Math.cos(boss.dir) * boss.charge * dt, Math.sin(boss.dir) * boss.charge * dt);
        if (boss.stateT <= 0) boss.state = 'idle';
        Game.particles.spawn({ x: boss.x, y: boss.y + 16, kind: 'puff', size: 8, color: 'rgba(150,130,90,0.5)', life: 0.35 });
      } else {
        if (d < 300 && boss.chargeCd <= 0) {
          boss.state = 'charge'; boss.stateT = 1.0; boss.chargeCd = 3.5;
          Game.ui.log('🐗 巨野猪向你冲来！', 'danger');
          Game.sfx && Game.sfx.alert();
        } else {
          boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
          moveEntity(boss, Math.cos(boss.dir) * boss.speed * dt, Math.sin(boss.dir) * boss.speed * dt);
        }
      }
      if (d < boss.r + p.r + 6 && boss.attackCd <= 0) {
        boss.attackCd = 1.2;
        damagePlayer(boss.dmg);
        Game.ui.log(`🐗 巨野猪撞飞了你！（-${boss.dmg} 生命）`, 'danger');
      }
    } else if (boss.bt === 'wolf') {
      boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
      moveEntity(boss, Math.cos(boss.dir) * boss.speed * dt, Math.sin(boss.dir) * boss.speed * dt);
      if (d < boss.r + p.r + 6 && boss.attackCd <= 0) {
        boss.attackCd = 1.0;
        damagePlayer(boss.dmg);
        Game.ui.log(`🐺 巨狼咬了你！（-${boss.dmg} 生命）`, 'danger');
      }
    } else if (boss.bt === 'serpent') {
      if (boss.state === 'lunge') {
        boss.stateT -= dt;
        boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
        moveEntity(boss, Math.cos(boss.dir) * 330 * dt, Math.sin(boss.dir) * 330 * dt);
        if (boss.stateT <= 0) boss.state = 'idle';
      } else {
        boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
        moveEntity(boss, Math.cos(boss.dir) * boss.speed * dt, Math.sin(boss.dir) * boss.speed * dt);
        if (d < 260 && boss.chargeCd <= 0) {
          boss.state = 'lunge'; boss.stateT = 0.5; boss.chargeCd = 3.0;
          Game.ui.log('🐍 巨蛇猛地扑向你！', 'danger');
          Game.sfx && Game.sfx.alert();
        }
      }
      if (d < boss.r + p.r + 8 && boss.attackCd <= 0) {
        boss.attackCd = 1.2;
        damagePlayer(boss.dmg);
        Game.ui.log(`🐍 巨蛇缠咬了你！（-${boss.dmg} 生命）`, 'danger');
      }
    } else if (boss.bt === 'kid') {
      if (d < 190) {
        const a = Math.atan2(boss.y - p.y, boss.x - p.x);
        moveEntity(boss, Math.cos(a) * boss.speed * dt, Math.sin(a) * boss.speed * dt);
      } else if (d > 330) {
        const a = Math.atan2(p.y - boss.y, p.x - boss.x);
        moveEntity(boss, Math.cos(a) * boss.speed * 0.8 * dt, Math.sin(a) * boss.speed * 0.8 * dt);
      }
      boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
      boss.shootCd -= dt;
      if (boss.shootCd <= 0 && d < 430) {
        boss.shootCd = 2.2;
        const a = Math.atan2(p.y - boss.y, p.x - boss.x);
        bossProjectiles.push({
          x: boss.x + Math.cos(a) * 18, y: boss.y + Math.sin(a) * 18,
          vx: Math.cos(a) * 300, vy: Math.sin(a) * 300, life: 2.5, dmg: 10,
        });
        Game.ui.log('🧒 顽童用弹弓射出一颗石子！', 'danger');
        Game.sfx && Game.sfx.pounce();
      }
    }
  }

  function updateProjectiles(dt) {
    const p = player;
    for (let i = bossProjectiles.length - 1; i >= 0; i--) {
      const pr = bossProjectiles[i];
      pr.life -= dt;
      pr.x += pr.vx * dt;
      pr.y += pr.vy * dt;
      if (pr.life <= 0) { bossProjectiles.splice(i, 1); continue; }
      if (U.dist2(p.x, p.y, pr.x, pr.y) < 16 * 16) {
        bossProjectiles.splice(i, 1);
        damagePlayer(pr.dmg);
        Game.ui.log(`💢 你被石子砸中了！（-${pr.dmg} 生命）`, 'danger');
      }
    }
  }

  function hitBoss(dmg, crit) {
    if (!boss || !boss.alive) return;
    boss.hp -= dmg;
    boss.aggro = true;
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: boss.x, y: boss.y, kind: 'ring', size: crit ? 52 : 30, color: crit ? 'rgba(255,220,90,0.95)' : 'rgba(255,120,80,0.8)', life: crit ? 0.55 : 0.35 });
    if (crit) Game.ui.log(`💥 对【${boss.name}】造成暴击！${dmg} 伤害！`, 'combat');
    if (boss.hp <= 0) {
      boss.hp = 0;
      boss.alive = false;
      Game.ui.log(`🏆 你击败了【${boss.name}】！获得大量奖励！`, 'good');
      Game.sfx && Game.sfx.craft();
      grantSkillPoint(3);
      addXp(120);
      if (Game.state.bossDefeated) Game.state.bossDefeated[Game.state.zone] = true;
      Game.particles.spawn({ x: boss.x, y: boss.y, kind: 'puff', size: 30, color: 'rgba(255,180,120,0.8)', life: 0.8 });
      bossProjectiles.length = 0;
    }
  }

  /* ------------------------------------------------------------- inventory */
  function addItem(id, qty) {
    qty = qty || 1;
    const it = player.inventory.find((i) => i.id === id);
    if (it) it.qty += qty;
    else player.inventory.push({ id, qty });
    Game.ui && Game.ui.refreshBadges && Game.ui.refreshBadges();
  }
  function removeItem(id, qty) {
    qty = qty || 1;
    const it = player.inventory.find((i) => i.id === id);
    if (!it) return false;
    it.qty -= qty;
    if (it.qty <= 0) player.inventory = player.inventory.filter((i) => i.id !== id);
    Game.ui && Game.ui.refreshBadges && Game.ui.refreshBadges();
    return true;
  }
  function countItem(id) {
    const it = player.inventory.find((i) => i.id === id);
    return it ? it.qty : 0;
  }

  /* ---------------------------------------------------- xp / level / skills */
  function xpToLevel(level) {
    return Math.floor(90 * Math.pow(level, 1.35));
  }
  function hasSkill(id) {
    return !!player && player.skills.includes(id);
  }
  function recalcMaxStats(p) {
    p = p || player;
    if (!p) return;
    p.stats.hpMax = 100 + (p.level - 1) * 8;
    p.stats.staminaMax = 100 + (p.level - 1) * 4;
    p.stats.moodMax = Math.round((100 + (p.level - 1) * 4) * (p.skills.includes('brave') ? 1.25 : 1));
    p.stats.hp = Math.min(p.stats.hp, p.stats.hpMax);
    p.stats.stamina = Math.min(p.stats.stamina, p.stats.staminaMax);
    p.stats.mood = Math.min(p.stats.mood, p.stats.moodMax);
  }
  function addXp(amount) {
    const p = player;
    if (!p) return;
    p.xp += amount;
    if (Game.state && Game.state.journey) Game.state.journey.xpTotal += amount;
    let need = xpToLevel(p.level);
    while (p.xp >= need) {
      p.xp -= need;
      p.level++;
      recalcMaxStats(p);
      p.stats.hp = Math.min(p.stats.hpMax, p.stats.hp + Math.round(p.stats.hpMax * 0.35));
      p.stats.stamina = p.stats.staminaMax;
      grantSkillPoint(1);
      Game.ui.log(`🎉 升级！你现在是 ${p.level} 级！（+1 技能点）`, 'good');
      Game.sfx && Game.sfx.craft();
      need = xpToLevel(p.level);
    }
  }
  function grantSkillPoint(n) {
    if (!player) return;
    n = n || 1;
    player.skillPoints += n;
    Game.ui.log(`📌 获得 ${n} 技能点！（当前 ${player.skillPoints}）`, 'craft');
    Game.sfx && Game.sfx.craft();
  }
  const SKILL_NAMES = {
    hunter: '猎手本能', swift: '疾风快爪', thick: '厚实毛皮',
    keen: '敏锐嗅觉', brave: '无畏之心', angler: '渔夫之尾',
    guardian: '守护之力', camo: '树叶伪装', summon: '召唤强化',
  };
  function learnSkill(skillId) {
    const p = player;
    if (!p) return false;
    if (p.skills.includes(skillId)) {
      Game.ui.log('📖 你已经掌握这个技能了！', 'info');
      return false;
    }
    if (p.skillPoints < 1) {
      Game.ui.log('📌 技能点不足——升级或挑战胜利可获得技能点。', 'info');
      return false;
    }
    p.skillPoints -= 1;
    p.skills.push(skillId);
    recalcMaxStats(p);
    addXp(25);
    Game.ui.log(`⭐ 习得技能：${SKILL_NAMES[skillId] || skillId}！（-1 技能点）`, 'craft');
    Game.sfx && Game.sfx.craft();
    Game.ui.refreshModals && Game.ui.refreshModals();
    return true;
  }
  function grantSkillBook(force) {
    const all = ['book_hunter', 'book_swift', 'book_thick', 'book_keen', 'book_brave', 'book_angler', 'book_guardian', 'book_camo'];
    const unlearned = all.filter((id) => !player.skills.includes(id));
    if (!unlearned.length) return false;
    if (!force && Math.random() > 0.4) return false;
    const id = U.pick(unlearned);
    addItem(id);
    Game.ui.log(`📖 发现技能书：${ITEMS[id].name}！（在行囊中阅读）`, 'craft');
    Game.sfx && Game.sfx.craft();
    return true;
  }

  function useItem(id) {
    const p = player;
    const def = ITEMS[id];
    if (!def) return;
    if (def.book) {
      /* 旧版技能书：阅读后转化为技能点 */
      removeItem(id, 1);
      grantSkillPoint(2);
      Game.ui.log('📖 阅读旧技能书：+2 技能点！', 'craft');
      return;
    }
    if (def.equip) {
      const slot = def.equip;
      if (p.equipped[slot]) {
        addItem(p.equipped[slot]);
        p.equipped[slot] = null;
        Game.ui.log(`⬇️ 摘下了${def.name}。`, 'info');
      } else {
        p.equipped[slot] = id;
        removeItem(id);
        Game.ui.log(`⬆️ 穿上了${def.name}！`, 'good');
      }
      Game.sfx && Game.sfx.craft();
      Game.ui.refreshModals && Game.ui.refreshModals();
      return;
    }
    if (def.food || def.mood || def.heal || def.zoomies) {
      const s = p.stats;
      if (def.food) s.satiety = Math.min(s.satietyMax, s.satiety + def.food);
      if (def.water) s.hydration = Math.min(s.hydrationMax, s.hydration + def.water);
      if (def.mood) s.mood = Math.min(s.moodMax, s.mood + def.mood);
      if (def.heal) s.hp = Math.min(s.hpMax, s.hp + def.heal);
      removeItem(id);
      if (def.zoomies) {
        p.zoomiesT = 6;
        Game.ui.log(`😵‍💫 猫薄荷！！疯狂跑酷！！！${def.name}！`, 'zoomies');
        Game.sfx && Game.sfx.zoomies();
      } else {
        Game.ui.log(`😋 使用了${def.name}。`, 'good');
        Game.sfx && Game.sfx.eat();
      }
    }
    Game.ui.refreshModals && Game.ui.refreshModals();
  }

  /* -------------------------------------------------------------- vitals */
  function updateVitals(dt) {
    const p = player;
    const s = p.stats;
    const st = Game.state;
    s.satiety = Math.max(0, s.satiety - dt * 0.14);
    s.hydration = Math.max(0, s.hydration - dt * 0.18);

    /* fur wetness */
    if (st.weather === 'rain' && !p.inCave) {
      const hat = p.equipped.hat;
      s.wetness = Math.min(s.wetnessMax, s.wetness + dt * (hat ? 2.5 : 11));
      s.hydration = Math.min(s.hydrationMax, s.hydration + dt * 0.8);
    } else {
      s.wetness = Math.max(0, s.wetness - dt * (p.inCave ? 7 : 0.6));
    }
    /* dry by the campfire */
    if (p.inCave && U.dist(p.x, p.y, Game.state.caveFire.x, Game.state.caveFire.y) < 110) {
      s.wetness = Math.max(0, s.wetness - dt * 26);
    }

    /* starvation / thirst damage */
    if (s.satiety <= 0) s.hp -= dt * 2.2;
    else if (s.satiety < 20) s.hp -= dt * 0.6;
    if (s.hydration <= 0) s.hp -= dt * 2.6;
    else if (s.hydration < 20) s.hp -= dt * 0.7;
    if (s.hp <= 0) { s.hp = 0; die(); return; }

    /* mood */
    s.mood = Math.max(0, s.mood - dt * 0.06);
    if (s.hp < 35) s.mood -= dt * 0.1;
    if (s.wetness > 60) s.mood -= dt * 0.06;

    /* gentle regen when well fed, hydrated and dry */
    if (s.satiety > 55 && s.hydration > 55 && s.wetness < 30) {
      s.hp = Math.min(s.hpMax, s.hp + dt * 1.2);
    }
    /* resting slowly heals: sleeping heals fastest, idle heals gently */
    if (p.state === 'sleep') {
      s.hp = Math.min(s.hpMax, s.hp + dt * 2.5);
    } else if (p.state === 'idle' && s.satiety > 40 && s.hydration > 40) {
      s.hp = Math.min(s.hpMax, s.hp + dt * (p.inCave ? 1.6 : 1.0));
    }
  }

  function die() {
    const p = player, s = p.stats;
    Game.ui.log('☠️ 你精疲力竭倒下了……在黎明中醒来。', 'danger');
    Game.sfx && Game.sfx.hurt();
    p.x = W.spawn.x; p.y = W.spawn.y;
    p.inCave = false;
    s.hp = 55; s.satiety = Math.max(35, s.satiety);
    s.hydration = Math.max(40, s.hydration);
    s.wetness = 0;
    Game.state.sec = 6.5 * (Game.state.DAY_LEN / 24);
    Game.state.cave = false;
  }

  /* ------------------------------------------------------------ movement */
  function canStand(x, y, r) {
    const pts = [[x, y], [x - r * 0.7, y - r * 0.7], [x + r * 0.7, y - r * 0.7],
    [x - r * 0.7, y + r * 0.7], [x + r * 0.7, y + r * 0.7]];
    for (const [px, py] of pts) {
      const t = W.tileAt(px, py);
      if (!W.inBounds(t.tx, t.ty)) return false;
      if (!W.canWalk(t.tx, t.ty)) return false;
    }
    return true;
  }

  function moveEntity(e, dx, dy, ignoreTerrain) {
    const r = e.r || 8;
    if (ignoreTerrain) {
      e.x += dx; e.y += dy;
      return;
    }
    if (dx && canStand(e.x + dx, e.y, r)) e.x += dx; else if (dx) e.vx = 0;
    if (dy && canStand(e.x, e.y + dy, r)) e.y += dy; else if (dy) e.vy = 0;
  }

  /* --------------------------------------------------------------- player */
  function updatePlayer(dt, input) {
    const p = player;
    p.animT += dt;
    p.sniff.cd = Math.max(0, p.sniff.cd - dt);
    p.groomCd = Math.max(0, p.groomCd - dt);
    p.interactCd = Math.max(0, p.interactCd - dt);
    p.pounceCd = Math.max(0, p.pounceCd - dt);
    p.hurtT = Math.max(0, p.hurtT - dt);
    p.zoomiesT = Math.max(0, p.zoomiesT - dt);
    p.blinkT -= dt;
    if (p.blinkT <= 0) { p.blink = !p.blink; p.blinkT = p.blink ? 0.12 : U.randRange(2, 5.5); }

    /* sniff ability */
    if (input.sniff && p.sniff.cd <= 0) {
      p.sniff.active = true;
      p.sniff.t = 2.6;
      p.sniff.cd = 1.0;
      Game.sfx && Game.sfx.sniff();
    }
    if (p.sniff.active) {
      p.sniff.t -= dt;
      if (p.sniff.t <= 0) p.sniff.active = false;
    }

    /* napping: curl up when idle & safe for a while */
    const safe = !nearbyChasingPredator(320);
    if (p.state === 'idle' && safe && p.stats.stamina > 30 && !p.tallGrass && p.zoomiesT <= 0) {
      p.napT += dt;
      if (p.napT > 11) {
        p.state = 'sleep';
        p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + dt * 1.6);
        p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + dt * 3);
        if (Math.random() < dt * 0.7) {
          Game.particles.spawn({ x: p.x + U.randRange(-8, 4), y: p.y - U.randRange(8, 18), kind: 'zzz', size: U.randRange(8, 13), color: 'rgba(200,190,255,0.8)', vy: -8, vx: U.randRange(4, 10), life: 1.6 });
        }
        return;
      }
    } else {
      p.napT = Math.max(0, p.napT - dt * 3);
      if (p.state === 'sleep' && (input.mx || input.my)) p.state = 'idle';
    }

    if (p.state === 'sleep') return;
    if (p.state === 'pounce') { updatePounce(dt); return; }
    if (p.state === 'groom') {
      p.stateT += dt;
      if (Math.random() < dt * 5) {
        Game.particles.spawn({
          x: p.x + Math.cos(p.facing) * -16 + U.randRange(-4, 4),
          y: p.y + Math.sin(p.facing) * -16 + U.randRange(-4, 4),
          kind: 'sparkle', size: U.randRange(2, 4), color: 'rgba(255,240,180,0.9)',
          vx: U.randRange(-10, 10), vy: U.randRange(-18, -4), life: 0.7, grav: 30, vr: U.randRange(-3, 3),
        });
      }
      if (p.stateT >= 1.6) { p.state = 'idle'; p.stateT = 0; }
      return;
    }

    /* movement */
    let mx = input.mx, my = input.my;
    const len = Math.hypot(mx, my);
    if (len > 0) { mx /= len; my /= len; }
    let sneaking = input.sneak && len > 0;
    if (sneaking && p.stats.stamina < 8) sneaking = false;
    /* adrenaline: a chasing dog makes you run faster */
    const dogChase = Game.challenges && Game.challenges.current && Game.challenges.current.type === 'dog' &&
      (Game.challenges.entities || []).some((e) => e.kind === 'dog' && e.alive && e.state === 'chase');
    /* Swift Paws: +10% speed */
    const spdBase = (sneaking ? p.sneakSpeed : p.speed) * (hasSkill('swift') ? 1.10 : 1);
    /* 沼泽泥地拖慢脚步 */
    const swampSlow = W.terrainAt(p.x, p.y) === W.T.SWAMP ? 0.55 : 1;
    const spd = spdBase * swampSlow * (dogChase ? 1.18 : 1);
    const zoom = p.zoomiesT > 0 ? 1.55 : 1;
    p.vx = mx * spd * zoom;
    p.vy = my * spd * zoom;
    moveEntity(p, p.vx * dt, p.vy * dt);

    if (len > 0) {
      p.facing = Math.atan2(my, mx);
      p.state = sneaking ? 'sneak' : 'walk';
    } else {
      p.state = 'idle';
      p.vx = p.vy = 0;
    }
    p.tallGrass = W.terrainAt(p.x, p.y) === W.T.GRASS;

    /* stamina: wet fur slows regen; Swift Paws speeds it up; Camo cheapens sneaking */
    const wetPenalty = p.stats.wetness > 40 ? 1 - (p.stats.wetness - 40) / 100 * 0.7 : 1;
    if (len > 0) {
      const cost = 3.2 * (sneaking ? 2.4 : 1) * (sneaking && hasSkill('camo') ? 0.6 : 1);
      p.stats.stamina = Math.max(0, p.stats.stamina - dt * cost);
    } else {
      p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + dt * 7 * wetPenalty * (p.equipped.hat ? 1.25 : 1) * (hasSkill('swift') ? 1.25 : 1));
    }

    /* actions */
    if (input.pounce && p.pounceCd <= 0 && p.stats.stamina >= 12) startPounce();
    if (input.groom && p.groomCd <= 0 && p.stats.stamina >= 5) startGroom();
    if (input.interact) interact();

    /* wet fur drips water droplets */
    if (p.stats.wetness > 50 && Math.random() < dt * 3) {
      Game.particles.spawn({
        x: p.x + U.randRange(-9, 9), y: p.y - U.randRange(2, 14),
        kind: 'dot', size: 1.4, color: 'rgba(150,205,255,0.85)',
        vx: U.randRange(-3, 3), vy: U.randRange(18, 40), life: 0.55, grav: 70,
      });
    }
  }

  function startPounce() {
    const p = player;
    p.state = 'pounce';
    p.stateT = 0;
    p.stats.stamina -= 12;
    const ang = p.facing;
    p.vx = Math.cos(ang) * 560;
    p.vy = Math.sin(ang) * 560;
    p.pounceCd = 0.8;
    p.pounceHit = new Set();
    p.pounceStart = { x: p.x, y: p.y };
    p.lastLand = { x: p.x, y: p.y };
    Game.sfx && Game.sfx.pounce();
    Game.particles.spawn({ x: p.x, y: p.y + 6, kind: 'puff', size: 10, color: 'rgba(190,180,150,0.5)', life: 0.4 });
  }

  function canStandPounce(x, y, r) {
    const pts = [[x, y], [x - r * 0.7, y - r * 0.7], [x + r * 0.7, y - r * 0.7], [x - r * 0.7, y + r * 0.7], [x + r * 0.7, y + r * 0.7]];
    for (const [px, py] of pts) {
      const t = W.tileAt(px, py);
      if (!W.inBounds(t.tx, t.ty)) return false;
      const tt = W.terrain[W.idx(t.tx, t.ty)];
      if (tt === W.T.ROCK || tt === W.T.WALL) return false;   /* 岩石/建筑墙不可逾越；水面在扑击时可以通过 */
    }
    return true;
  }

  function movePounce(e, dx, dy) {
    const r = e.r || 8;
    if (dx && canStandPounce(e.x + dx, e.y, r)) e.x += dx; else if (dx) e.vx = 0;
    if (dy && canStandPounce(e.x, e.y + dy, r)) e.y += dy; else if (dy) e.vy = 0;
  }

  function updatePounce(dt) {
    const p = player;
    p.stateT += dt;
    const t = p.stateT;
    const dur = 0.5;
    const drag = Math.max(0, 1 - t * 1.3);
    /* 扑击跃过水面 */
    const before = W.terrainAt(p.x, p.y);
    movePounce(p, p.vx * dt * drag, p.vy * dt * drag);
    const after = W.terrainAt(p.x, p.y);
    if (after !== W.T.WATER) { p.lastLand = { x: p.x, y: p.y }; }
    if (before !== W.T.WATER && after === W.T.WATER) {
      /* 掠过水面 */
      Game.particles.spawn({ x: p.x, y: p.y, kind: 'splash', size: 8, color: 'rgba(160,220,255,0.8)', life: 0.5 });
    }
    /* Hunter's Instinct: bigger catch radius */
    const reach = p.r + (hasSkill('hunter') ? 18 : 12);

    for (const e of list) {
      if (p.pounceHit.has(e) || !e.alive) continue;
      if (e.kind === 'companion') continue;
      const d = U.dist(p.x, p.y, e.x, e.y);
      if (d < p.r + e.r + reach) {
        if (e.kind === 'prey') { catchPrey(e); p.pounceHit.add(e); }
        else if (e.kind === 'predator') { hitPredator(e); p.pounceHit.add(e); }
      }
    }
    /* challenge entities: rival cats, dogs, vipers, wolves */
    const chEnts = Game.challenges && Game.challenges.entities;
    if (chEnts) {
      for (const e of chEnts) {
        if (p.pounceHit.has(e) || !e.alive) continue;
        const d = U.dist(p.x, p.y, e.x, e.y);
        if (d < p.r + e.r + reach) {
          if (e.kind === 'rival') Game.challenges.hitRival(e);
          else if (e.kind === 'dog') Game.challenges.hitDog(e);
          else if (e.kind === 'viper') Game.challenges.hitViper(e);
          else if (e.kind === 'wolf') Game.challenges.hitWolf(e);
          p.pounceHit.add(e);
        }
      }
    }
    /* 关底 Boss */
    if (boss && boss.alive && !p.pounceHit.has(boss)) {
      const d = U.dist(p.x, p.y, boss.x, boss.y);
      if (d < p.r + boss.r + reach) {
        hitBoss(pounceDmg(20, rollCrit()), true);
        p.pounceHit.add(boss);
      }
    }
    /* splash when pouncing into shallows */
    if (t < 0.15 && W.isNearWater(p.x, p.y) && Math.random() < 0.3) {
      Game.particles.spawn({ x: p.x, y: p.y, kind: 'splash', size: 7, color: 'rgba(160,220,255,0.8)', life: 0.5 });
    }
    if (t >= dur) {
      if (W.terrainAt(p.x, p.y) === W.T.WATER) {
        /* 落在水里——扑腾着跳回岸上 */
        Game.particles.spawn({ x: p.x, y: p.y, kind: 'splash', size: 12, color: 'rgba(160,220,255,0.9)', life: 0.6 });
        p.stats.wetness = Math.min(p.stats.wetnessMax, p.stats.wetness + 25);
        Game.ui.log('💦 你差点落水，扑腾着跳回岸上！（毛打湿了）', 'info');
        p.x = p.lastLand.x; p.y = p.lastLand.y;
      }
      p.state = 'idle'; p.stateT = 0; p.vx = p.vy = 0;
    }
  }

  function startGroom() {
    const p = player;
    p.state = 'groom';
    p.stateT = 0;
    p.groomCd = 4;
    p.stats.stamina -= 5;
    p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + 12);
    addXp(1);
    Game.sfx && Game.sfx.groom();
    Game.ui.log('✨ 你梳理了毛发，神清气爽！', 'good');
  }

  function catchPrey(e) {
    e.alive = false;
    const id = e.item || 'mouse';
    addItem(id);
    if (e.type === 'mouse' && Math.random() < 0.4) addItem('sinew');
    if (e.type === 'salmon' && Math.random() < 0.5) addItem('fishbone');
    addXp(e.type === 'mouse' ? 8 : e.type === 'grasshopper' ? 4 : 10);
    if (Game.state && Game.state.journey) {
      Game.state.journey.preyCaught++;
      if (e.type === 'salmon') Game.state.journey.fishCaught++;
    }
    Game.ui.log(`🐾 抓到一只${ITEMS[id].name}！`, 'catch');
    Game.sfx && Game.sfx.catch();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'puff', size: 12, color: 'rgba(255,240,210,0.6)', life: 0.5 });
  }

  /* 心情影响暴击：心情越高暴击率越高（5% ~ 25%），暴击造成双倍伤害 */
  function critChance() {
    return 0.05 + (player.stats.mood / player.stats.moodMax) * 0.20;
  }
  function rollCrit() {
    return Math.random() < critChance();
  }
  /* 玩家扑击总伤害：装备（鱼骨项圈 +3 / 猫牙项链 +20%）+ 猎手本能 + 召唤加成 + 暴击 */
  function pounceDmg(base, crit) {
    let d = base;
    if (player.equipped.collar === 'fishbone_collar') d += 3;
    else if (player.equipped.collar === 'cat_tooth_necklace') d *= 1.2;
    if (hasSkill('hunter')) d *= 1.15;
    if (companions.some((c) => c.summonT > 0)) d *= 1.15;
    if (crit) d *= 2;
    return Math.round(d);
  }

  function hitPredator(e) {
    const crit = rollCrit();
    let dmg = pounceDmg(e.type === 'boar' ? 26 : e.type === 'fox' ? 20 : 14, crit);
    /* companion hunt-assist perk (level 3) — Guardian's Prowess boosts it */
    if (companions.some((c) => c.perk >= 3 && U.dist(c.x, c.y, e.x, e.y) < 260)) dmg += hasSkill('guardian') ? 12 : 8;
    e.hp -= dmg;
    e.state = 'hurt';
    e.stateT = 0;
    e.chasing = false;
    e.fleeT = 1.6;
    Game.sfx && Game.sfx.hit();
    Game.ui.log(`⚔️ 你击中${typeName(e.type)}，造成 ${dmg} 伤害${crit ? '（暴击！）' : ''}！`, 'combat');
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: crit ? 44 : 26, color: crit ? 'rgba(255,220,90,0.95)' : 'rgba(255,120,80,0.7)', life: crit ? 0.5 : 0.35 });
    if (e.hp <= 0) killPredator(e);
  }

  function killPredator(e) {
    e.alive = false;
    if (e.type === 'boar') { addItem('fat', 2); addItem('sinew'); }
    if (e.type === 'fox') { addItem('sinew', 2); }
    if (e.type === 'viper') { addItem('herbs', 2); }
    addXp(e.type === 'boar' ? 25 : e.type === 'fox' ? 20 : 15);
    if (Game.state && Game.state.journey) Game.state.journey.predatorsSlain++;
    if (Math.random() < 0.08) grantSkillBook(false);
    Game.ui.log(`💀 ${typeName(e.type)}倒下了。`, 'combat');
    Game.sfx && Game.sfx.craft();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'puff', size: 20, color: 'rgba(150,60,40,0.6)', life: 0.7 });
  }

  function damagePlayer(amount) {
    const p = player;
    if (p.state === 'sleep') { p.state = 'idle'; }
    /* 树叶雨帽：防御 +2（每次受伤减少） */
    if (p.equipped.hat) amount -= 2;
    amount = Math.max(1, Math.round(amount * (hasSkill('thick') ? 0.75 : 1)));
    p.stats.hp -= amount;
    p.hurtT = 0.55;
    Game.ui.log(`💔 你受到 ${amount} 点伤害！`, 'danger');
    Game.sfx && Game.sfx.hurt();
    Game.ui.shake && Game.ui.shake();
    if (p.stats.hp <= 0) { p.stats.hp = 0; die(); }
  }

  function nearbyChasingPredator(r) {
    for (const e of list) {
      if (e.kind === 'predator' && e.alive && e.chasing && U.dist2(e.x, e.y, player.x, player.y) < r * r) return true;
    }
    const ce = Game.challenges && Game.challenges.entities || [];
    for (const e of ce) {
      if (e.alive && (e.kind === 'dog' || e.kind === 'rival') && U.dist2(e.x, e.y, player.x, player.y) < r * r) return true;
    }
    return false;
  }

  /* ------------------------------------------------------------- prey AI */
  function updatePrey(e, dt) {
    e.animT += dt;
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('prey', e.x, e.y, player.sniff.active);
      e.scentT = player.sniff.active ? 0.14 : 1.1;
    }

    if (e.type === 'salmon') {
      /* 三文鱼洄游时：鱼群会主动游向你所在的岸边 */
      const run = Game.challenges && Game.challenges.current && Game.challenges.current.type === 'salmon';
      if (run) {
        const pl = player;
        const d = U.dist(e.x, e.y, pl.x, pl.y);
        if (d < 430) {
          e.dir = Math.atan2(pl.y - e.y, pl.x - e.x);
          moveEntity(e, Math.cos(e.dir) * e.speed * 1.5 * dt, Math.sin(e.dir) * e.speed * 1.5 * dt, true);
          const t = W.terrainAt(e.x, e.y);
          if (t !== W.T.WATER) { e.dir += Math.PI + U.randRange(-0.5, 0.5); }
          return;
        }
      }
      if (e.wanderT <= 0) { e.dir = Math.random() * U.TAU; e.wanderT = U.randRange(1, 2.5); }
      e.wanderT -= dt;
      moveEntity(e, Math.cos(e.dir) * e.speed * dt, Math.sin(e.dir) * e.speed * dt, true);
      /* keep in water */
      const t = W.terrainAt(e.x, e.y);
      if (t !== W.T.WATER) { e.dir += Math.PI + U.randRange(-0.5, 0.5); }
      return;
    }

    const dP = U.dist(e.x, e.y, player.x, player.y);
    let threat = null, td = Infinity;
    if (dP < e.flee) { threat = player; td = dP; }
    for (const pr of list) {
      if (pr.kind === 'predator' && pr.alive) {
        const dd = U.dist2(e.x, e.y, pr.x, pr.y);
        if (dd < e.flee * 1.4 * e.flee * 1.4 && dd < td * td) { threat = pr; td = Math.sqrt(dd); }
      }
    }
    if (threat) {
      e.state = 'flee';
      e.dir = Math.atan2(e.y - threat.y, e.x - threat.x);
      const hop = e.type === 'grasshopper' ? (Math.floor(e.animT * 6) % 2 ? 0 : 1) : 1;
      const spd = e.type === 'grasshopper' ? e.speed * 2.6 * hop : e.speed * (e.type === 'mouse' ? 1.25 : 1);
      moveEntity(e, Math.cos(e.dir) * spd * dt, Math.sin(e.dir) * spd * dt);
    } else {
      e.state = 'wander';
      if (e.wanderT <= 0) { e.dir = Math.random() * U.TAU; e.wanderT = U.randRange(1.2, 3.5); }
      e.wanderT -= dt;
      const hop = e.type === 'grasshopper' ? (Math.floor(e.animT * 4) % 2 ? 0 : 1) : 1;
      const spd = e.type === 'grasshopper' ? e.speed * 1.6 * hop : e.speed * 0.4;
      moveEntity(e, Math.cos(e.dir) * spd * dt, Math.sin(e.dir) * spd * dt);
    }
  }

  /* --------------------------------------------------------- predator AI */
  function updatePredator(e, dt) {
    e.animT += dt;
    e.attackCd = Math.max(0, e.attackCd - dt);
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('predator', e.x, e.y, player.sniff.active);
      e.scentT = player.sniff.active ? 0.16 : 1.3;
    }
    const p = player;
    const d = U.dist(e.x, e.y, p.x, p.y);

    /* "heard footsteps" ambient cue */
    e.footstepsCd -= dt;
    if (e.footstepsCd <= 0 && d < 340 && !e.chasing && (e.type === 'boar' || e.type === 'fox')) {
      e.footstepsCd = 8;
      Game.ui.log('👂 附近传来脚步声……', 'info');
    }

    /* detection — sneak + tall grass shrink the radius */
    let detect = e.aggro;
    if (p.state === 'sneak' && p.tallGrass) detect *= hasSkill('camo') ? 0.18 : 0.35;
    else if (p.state === 'sneak') detect *= hasSkill('camo') ? 0.4 : 0.55;
    else if (p.tallGrass) detect *= 0.8;
    /* dense fog: predators smell you right through it */
    const fog = Game.challenges && Game.challenges.current && Game.challenges.current.type === 'fog';
    if (fog) detect *= 1.6;

    if (e.fleeT > 0) {
      e.fleeT -= dt;
      e.state = 'flee';
      e.dir = Math.atan2(e.y - p.y, e.x - p.x);
      moveEntity(e, Math.cos(e.dir) * e.speed * 0.9 * dt, Math.sin(e.dir) * e.speed * 0.9 * dt);
      return;
    }

    if (d < detect) {
      e.chasing = true;
      if (!e.alerted) {
        e.alerted = true;
        Game.ui.log(`⚠️ 一只${typeName(e.type)}发现了你！`, 'danger');
        Game.sfx && Game.sfx.alert();
      }
    } else if (d > detect * 1.7) {
      e.chasing = false;
    }

    if (e.state === 'hurt') {
      e.stateT += dt;
      if (e.stateT > 0.8) e.state = 'wander';
      return;
    }

    if (e.chasing) {
      e.state = 'chase';
      if (e.type === 'boar' && d < 110) {
        /* charge! */
        e.state = 'charge';
        e.dir = Math.atan2(p.y - e.y, p.x - e.x);
        moveEntity(e, Math.cos(e.dir) * e.charge * dt, Math.sin(e.dir) * e.charge * dt);
        Game.particles.spawn({ x: e.x, y: e.y + 8, kind: 'puff', size: 7, color: 'rgba(150,130,90,0.5)', life: 0.35 });
      } else {
        e.dir = Math.atan2(p.y - e.y, p.x - e.x);
        const spd = e.type === 'fox' && d > 150 ? e.speed : e.speed * 0.9;
        moveEntity(e, Math.cos(e.dir) * spd * dt, Math.sin(e.dir) * spd * dt);
      }
      if (d < e.r + p.r + 5 && e.attackCd <= 0) {
        damagePlayer(e.dmg);
        e.attackCd = 1.1;
      }
    } else {
      e.alerted = false;
      e.state = 'wander';
      if (e.wanderT <= 0) {
        e.dir = Math.random() * U.TAU;
        e.wanderT = U.randRange(1.5, 4);
      }
      e.wanderT -= dt;
      const spd = e.type === 'viper' ? 0.15 : 0.35;
      moveEntity(e, Math.cos(e.dir) * e.speed * spd * dt, Math.sin(e.dir) * e.speed * spd * dt);
      /* viper prefers cover */
      if (e.type === 'viper') {
        const t = W.terrainAt(e.x, e.y);
        if (t !== W.T.GRASS && t !== W.T.FOREST && Math.random() < dt * 1.5) e.dir += Math.PI + U.randRange(-0.6, 0.6);
      }
    }
  }

  /* -------------------------------------------------------- companion AI */
  function updateCompanion(c, dt) {
    c.animT += dt;
    c.scentT -= dt;
    if (c.scentT <= 0) {
      Game.particles.emitScent('cat', c.x, c.y, player.sniff.active);
      c.scentT = player.sniff.active ? 0.15 : 1.0;
    }
    c.giftCd = Math.max(0, c.giftCd - dt);
    c.warnCd = Math.max(0, c.warnCd - dt);
    const p = player;
    const d = U.dist(c.x, c.y, p.x, p.y);

    /* ---- 召唤战斗模式：伙伴猫主动攻击附近敌人 ---- */
    if (c.summonT > 0) {
      c.summonT -= dt;
      c.attackCd = Math.max(0, c.attackCd - dt);
      let target = null, td = 300 * 300;
      for (const e of list) {
        if (e.kind === 'predator' && e.alive) {
          const dd = U.dist2(c.x, c.y, e.x, e.y);
          if (dd < td) { td = dd; target = e; }
        }
      }
      const ce = Game.challenges && Game.challenges.entities || [];
      for (const e of ce) {
        if (e.alive && (e.kind === 'wolf' || e.kind === 'dog' || e.kind === 'rival')) {
          const dd = U.dist2(c.x, c.y, e.x, e.y);
          if (dd < td) { td = dd; target = e; }
        }
      }
      if (target) {
        c.state = 'fight';
        c.dir = Math.atan2(target.y - c.y, target.x - c.x);
        moveEntity(c, Math.cos(c.dir) * c.speed * 1.25 * dt, Math.sin(c.dir) * c.speed * 1.25 * dt);
        if (U.dist(c.x, c.y, target.x, target.y) < c.r + target.r + 8 && c.attackCd <= 0) {
          c.attackCd = 1.4;
          if (target.kind === 'wolf') Game.challenges.hitWolf(target);
          else if (target.kind === 'dog') Game.challenges.hitDog(target);
          else if (target.kind === 'rival') Game.challenges.hitRival(target);
          else companionStrike(c, target);
        }
      } else {
        /* 没有敌人就跟在身边 */
        c.state = 'follow';
        c.dir = U.angleLerp(c.dir, Math.atan2(p.y - c.y, p.x - c.x), dt * 4);
        moveEntity(c, Math.cos(c.dir) * c.speed * dt, Math.sin(c.dir) * c.speed * dt);
      }
      if (c.summonT <= 0) {
        c.summonT = 0;
        Game.ui.log(`🐈 ${c.name} 战斗结束，回到你身边。`, 'info');
      }
      return;
    }

    /* follow when friendly enough */
    if ((c.adopted || c.friendship >= 25) && d > 95) c.follow = true;
    else if (d < 60) c.follow = false;

    if (c.follow) {
      c.state = 'follow';
      c.dir = U.angleLerp(c.dir, Math.atan2(p.y - c.y, p.x - c.x), dt * 4);
      moveEntity(c, Math.cos(c.dir) * c.speed * dt, Math.sin(c.dir) * c.speed * dt);
    } else {
      c.state = 'wander';
      if (c.wanderT <= 0) { c.dir = Math.random() * U.TAU; c.wanderT = U.randRange(2, 5); }
      c.wanderT -= dt;
      moveEntity(c, Math.cos(c.dir) * c.speed * 0.4 * dt, Math.sin(c.dir) * c.speed * 0.4 * dt);
    }

    /* perk 1: mood aura */
    if (c.friendship >= 20 && d < 200) {
      p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + dt * 1.3);
    }
    /* perk 2: predator warning (adopted cats only) */
    if (c.adopted && c.perk >= 2 && c.warnCd <= 0) {
      for (const e of list) {
        if (e.kind === 'predator' && e.alive && e.chasing && U.dist2(e.x, e.y, p.x, p.y) < 300 * 300) {
          c.warnCd = 7;
          Game.ui.log(`🐈 ${c.name}嘶叫：有捕食者靠近！`, 'danger');
          break;
        }
      }
    }
    /* trade: adopted pets bring small gifts */
    if (c.adopted && c.friendship >= 50 && c.giftCd <= 0) {
      c.giftCd = U.randRange(45, 90);
      const gifts = ['herbs', 'sinew', 'berry', 'leaves', 'vines'];
      const g = U.pick(gifts);
      addItem(g);
      Game.ui.log(`🎁 ${c.name}给你带来了${ITEMS[g].name}！`, 'good');
      Game.sfx && Game.sfx.craft();
    }
    /* floating hearts near very friendly cats */
    c.heartT -= dt;
    if (c.friendship >= 30 && c.heartT <= 0 && d < 260) {
      c.heartT = 3.5;
      Game.particles.spawn({
        x: c.x + U.randRange(-10, 10), y: c.y - 22,
        kind: 'dot', size: 3, color: 'rgba(255,140,190,0.85)',
        vx: U.randRange(-4, 4), vy: -14, life: 1.2, grav: -6,
      });
    }
  }

  /* ------------------------------------------------------- pet / adopt system */
  function petCompanion(c) {
    const p = player;
    const first = !c.met;
    c.met = true;
    /* 鱼骨项圈：友情获取 +50% */
    const collarBonus = p.equipped.collar === 'fishbone_collar' ? 1.5 : 1;
    const gain = Math.round(8 * (hasSkill('guardian') ? 1.5 : 1) * collarBonus);
    c.friendship = Math.min(100, c.friendship + gain);
    p.stats.mood = Math.min(p.stats.moodMax, p.stats.mood + 5);
    addXp(2);
    Game.ui.log(`🐾 你抚摸${c.name}——它满足地咕噜咕噜叫。（+${gain} ♥）`, 'good');
    Game.sfx && Game.sfx.groom();
    Game.particles.spawn({ x: c.x, y: c.y - 18, kind: 'sparkle', size: 2.6, color: 'rgba(255,160,200,0.9)', vx: 0, vy: -14, life: 0.9 });
    Game.particles.spawn({ x: c.x + U.randRange(-6, 6), y: c.y - 16, kind: 'dot', size: 3, color: 'rgba(255,140,190,0.85)', vx: U.randRange(-4, 4), vy: -16, life: 1.1, grav: -8 });
    if (first) {
      Game.ui.log(`😺 ${c.name}开始亲近你——继续抚摸，或从猫菜单喂食更快成为朋友！`, 'info');
    }
    if (!c.adopted && c.friendship >= 60) {
      Game.ui.log(`💗 ${c.name}已经准备好成为你的朋友——从猫菜单收养它吧！`, 'good');
    }
    checkPerks(c);
  }

  function feedCompanion(c) {
    const giftId = ['salmon', 'cooked_salmon', 'mouse'].find((id) => countItem(id) > 0);
    if (!giftId) {
      Game.ui.log('🍽️ 你现在没有食物可以分享（三文鱼、烤鲑鱼或老鼠）。', 'info');
      return false;
    }
    removeItem(giftId, 1);
    const first = !c.met;
    c.met = true;
    const gain = Math.round(22 * (hasSkill('guardian') ? 1.5 : 1) * (player.equipped.collar === 'fishbone_collar' ? 1.5 : 1));
    c.friendship = Math.min(100, c.friendship + gain);
    player.stats.mood = Math.min(player.stats.moodMax, player.stats.mood + 8);
    addXp(6);
    Game.ui.log(`🍖 你把${ITEMS[giftId].name}分给${c.name}！（+${gain} ♥）`, 'good');
    Game.sfx && Game.sfx.eat();
    Game.particles.spawn({ x: c.x, y: c.y - 16, kind: 'ring', size: 20, color: 'rgba(255,180,120,0.7)', life: 0.5 });
    if (first) {
      Game.ui.log(`😺 ${c.name}很喜欢！继续下去它会信任你。`, 'info');
    }
    if (!c.adopted && c.friendship >= 60) {
      Game.ui.log(`💗 ${c.name}已经准备好成为你的朋友——从猫菜单收养它吧！`, 'good');
    }
    checkPerks(c);
    return true;
  }

  function adoptCompanion(c) {
    if (c.adopted) return false;
    if (c.friendship < 60) {
      Game.ui.log(`💭 ${c.name}还没准备好——继续抚摸和喂食（需要 60 ♥）。`, 'info');
      return false;
    }
    c.adopted = true;
    c.met = true;
    c.follow = true;
    c.perk = Math.max(c.perk, 1);
    addXp(20);
    if (Game.state && Game.state.journey) Game.state.journey.petsAdopted++;
    Game.ui.log(`🎉 ${c.name}现在是你朋友了！它会一直跟着你。`, 'good');
    Game.sfx && Game.sfx.craft();
    for (let i = 0; i < 10; i++) {
      Game.particles.spawn({
        x: c.x + U.randRange(-16, 16), y: c.y - U.randRange(0, 24),
        kind: 'sparkle', size: U.randRange(2, 4), color: 'rgba(255,140,200,0.95)',
        vx: U.randRange(-8, 8), vy: U.randRange(-24, -8), life: 1.2, grav: 30, vr: U.randRange(-4, 4),
      });
    }
    Game.ui.refreshModals && Game.ui.refreshModals();
    checkPerks(c);
    return true;
  }

  function checkPerks(c) {
    if (!c.adopted) return;
    if (c.friendship >= 70 && c.perk < 2) {
      c.perk = 2;
      Game.ui.log(`🐈 ${c.name}现在会提醒你周围的危险！`, 'good');
      Game.sfx && Game.sfx.craft();
    }
    if (c.friendship >= 90 && c.perk < 3) {
      c.perk = 3;
      Game.ui.log(`🐈 ${c.name}现在会和你并肩狩猎（+伤害）！`, 'good');
      Game.sfx && Game.sfx.craft();
    }
  }

  /* ------------------------------------------- 召唤伙伴猫并肩作战 */
  function summonCompanion() {
    const p = player;
    if (p.summonCd > 0) {
      Game.ui.log(`📣 召唤冷却中（${Math.ceil(p.summonCd)} 秒）`, 'info');
      return false;
    }
    const adopted = companions.filter((c) => c.adopted);
    if (!adopted.length) {
      Game.ui.log('😿 你还没有伙伴猫——先收养一只流浪猫吧！', 'info');
      return false;
    }
    adopted.sort((a, b) => b.friendship - a.friendship);
    const c = adopted[0];
    c.x = p.x + U.randRange(-18, 18);
    c.y = p.y + U.randRange(-18, 18);
    /* 召唤强化技能：持续时间更长、冷却更短 */
    const boosted = hasSkill('summon');
    c.summonT = boosted ? 40 : 25;
    c.attackCd = 0;
    p.summonCd = boosted ? 180 : 300;
    Game.ui.log(`📣 ${c.name} 应召而来，与你并肩作战！（冷却 ${boosted ? 3 : 5} 分钟）`, 'good');
    Game.sfx && Game.sfx.alert();
    for (let i = 0; i < 14; i++) {
      Game.particles.spawn({
        x: c.x + U.randRange(-14, 14), y: c.y - U.randRange(0, 20),
        kind: 'sparkle', size: U.randRange(2, 4), color: 'rgba(255,170,90,0.95)',
        vx: U.randRange(-8, 8), vy: U.randRange(-20, -6), life: 1.0, grav: 26, vr: U.randRange(-4, 4),
      });
    }
    Game.particles.spawn({ x: c.x, y: c.y, kind: 'ring', size: 34, color: 'rgba(255,160,80,0.8)', life: 0.5 });
    return true;
  }

  function companionStrike(c, e) {
    let dmg = 14 + (hasSkill('guardian') ? 4 : 0);
    e.hp -= dmg;
    e.state = 'hurt';
    e.stateT = 0;
    e.chasing = false;
    e.fleeT = 1.2;
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: 24, color: 'rgba(255,200,120,0.8)', life: 0.35 });
    Game.ui.log(`🐈 ${c.name} 猛扑向敌人！（${dmg} 伤害）`, 'combat');
    if (e.hp <= 0) killPredator(e);
  }

  /* --------------------------------------------------------- interactions */
  function interact() {
    const p = player;
    if (p.interactCd > 0) return;
    if (p.inCave) { Game.state.caveInteract && Game.state.caveInteract(); p.interactCd = 0.6; return; }

    /* 1) a nearby stray cat always wins — quick pet with F */
    let bestC = null, bd = 80 * 80;
    for (const c of companions) {
      const d = U.dist2(p.x, p.y, c.x, c.y);
      if (d < bd) { bd = d; bestC = c; }
    }
    if (bestC) {
      petCompanion(bestC);
      p.interactCd = 0.7;
      return;
    }

    /* 2) nearby world features */
    const f = W.findNearest(['gate', 'berry', 'catnip', 'spring', 'cave', 'herbs'], p.x, p.y, 90);
    if (f) {
      switch (f.type) {
        case 'berry': {
          /* 直接吃浆果：恢复饱食 + 少量生命 */
          const s = p.stats;
          s.satiety = Math.min(s.satietyMax, s.satiety + 9);
          s.hp = Math.min(s.hpMax, s.hp + 2);
          f.regrowT = 25;
          addXp(2);
          Game.ui.log('🍓 你吃掉了一些野莓。（+饱食，+2 生命）', 'good');
          Game.sfx && Game.sfx.eat();
          Game.particles.spawn({ x: p.x, y: p.y - 12, kind: 'sparkle', size: 2, color: 'rgba(255,120,130,0.9)', vx: U.randRange(-6, 6), vy: -12, life: 0.6 });
          break;
        }
        case 'catnip':
          addItem('catnip', 1);
          f.regrowT = 30;
          addXp(2);
          Game.ui.log('🌿 收获新鲜猫薄荷。', 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'herbs':
          addItem('herbs', 1);
          f.regrowT = 30;
          addXp(2);
          Game.ui.log('🌼 采到草药。', 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'spring': {
          p.stats.hydration = Math.min(p.stats.hydrationMax, p.stats.hydration + 38);
          p.interactCd = 1.2;
          Game.ui.log('💧 喝下清冽的泉水。', 'good');
          Game.sfx && Game.sfx.drink();
          Game.particles.spawn({ x: p.x, y: p.y - 6, kind: 'ring', size: 16, color: 'rgba(120,220,255,0.7)', life: 0.4 });
          break;
        }
        case 'cave': {
          enterCave();
          break;
        }
        case 'gate': {
          /* 前往新区域（有等级门槛） */
          Game.transitionZone && Game.transitionZone(f);
          p.interactCd = 1.5;
          break;
        }
      }
      p.interactCd = 0.8;
      return;
    }

    /* 3) stream: 河边只能捞鱼——口渴必须找泉水 */
    if (W.isNearWater(p.x, p.y)) {
      const salmonRun = (Game.challenges && Game.challenges.current && Game.challenges.current.type === 'salmon') || hasSkill('angler');
      /* 找一只游到岸边的河鲑（100px 内） */
      let fish = null, bd = 100 * 100;
      for (const e of list) {
        if (e.kind === 'prey' && e.type === 'salmon' && e.alive) {
          const d = U.dist2(p.x, p.y, e.x, e.y);
          if (d < bd) { bd = d; fish = e; }
        }
      }
      if (fish) {
        catchPrey(fish);   /* 用爪子捞鱼 */
      } else if (salmonRun) {
        /* 洄游期即使没看到鱼也能捞到 */
        addItem('salmon');
        if (Math.random() < 0.5) addItem('fishbone');
        addXp(6);
        if (Game.state && Game.state.journey) Game.state.journey.fishCaught++;
        Game.ui.log('🎣 三文鱼洄游中随手捞到一条！', 'catch');
        Game.sfx && Game.sfx.catch();
      } else {
        /* 河边不能喝水——口渴只能找泉水（按 E 跟青色气味） */
        Game.ui.log('🐟 岸边没有鱼……口渴的话去找清泉吧（青色气味）。', 'info');
        Game.sfx && Game.sfx.sniff();
      }
      p.interactCd = 1.0;
      return;
    }

    /* 4) forest gathering */
    const tt = W.terrainAt(p.x, p.y);
    if (tt === W.T.FOREST) {
      if (Math.random() < 0.55) addItem('leaves', U.randInt(1, 2));
      else addItem('vines', U.randInt(1, 2));
      addXp(2);
      Game.ui.log('🍂 在森林里捡到些材料。', 'info');
      Game.sfx && Game.sfx.pick();
      p.interactCd = 1.0;
      return;
    }

    Game.ui.log('😺 这里没什么可以互动的……', 'info');
    p.interactCd = 0.5;
  }

  function enterCave() {
    const p = player;
    p.outside.x = p.x; p.outside.y = p.y;
    const st = Game.state;
    st.cave = true;
    st.caveCamReady = false;
    p.inCave = true;
    p.x = st.caveExit.x;
    p.y = st.caveExit.y + 80;
    Game.ui.log('🕳️ 你溜进凉爽的洞穴庇护所。', 'info');
    Game.sfx && Game.sfx.cave();
    Game.ui.fadeTo(0.9, () => { Game.ui.fadeTo(0, null); });
  }

  function exitCave() {
    const p = player;
    p.inCave = false;
    Game.state.cave = false;
    p.x = p.outside.x; p.y = p.outside.y;
    Game.ui.log('🌤️ 你回到荒野之中。', 'info');
    Game.ui.fadeTo(0.9, () => { Game.ui.fadeTo(0, null); });
  }

  /* ------------------------------------------------------------ main tick */
  function update(dt, input) {
    updatePlayer(dt, input);
    for (const e of list) {
      if (!e.alive) continue;
      if (e.kind === 'prey') updatePrey(e, dt);
      else if (e.kind === 'predator') updatePredator(e, dt);
      else if (e.kind === 'companion') updateCompanion(e, dt);
    }
    /* prune dead */
    for (let i = list.length - 1; i >= 0; i--) {
      const e = list[i];
      if ((e.kind === 'prey' || e.kind === 'predator') && !e.alive) list.splice(i, 1);
    }
    /* Boss + 弹弓弹道 */
    updateBoss(dt);
    updateProjectiles(dt);
  }

  Game.entities = {
    list, companions, ITEMS, RECIPES, PREY, PRED, BOSS_DEFS,
    get player() { return player; },
    get boss() { return boss; },
    get bossProjectiles() { return bossProjectiles; },
    init, update, updateVitals, interact, useItem, addItem, removeItem, countItem,
    petCompanion, feedCompanion, adoptCompanion,
    summonCompanion,
    damagePlayer, enterCave, exitCave,
    xpToLevel, addXp, learnSkill, hasSkill, grantSkillBook, grantSkillPoint, hitBoss, recalcMaxStats,
    pounceDmg, critChance,
    SKILL_NAMES,
  };
})();
