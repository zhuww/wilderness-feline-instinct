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
    fishbone_collar: { name: '鱼骨项圈', icon: '📿', equip: 'collar', desc: '攻击 +3（巧匠每级再 +1），流浪猫更快信任你。' },
    cat_tooth_necklace: { name: '猫牙项链', icon: '🦷', equip: 'collar', desc: '攻击 +20%（巧匠每级再 +4%）：对敌人造成更高伤害。' },
    catnip_tea: { name: '猫薄荷茶', icon: '☕', stamina: 25, mood: 8, desc: '热茶下肚，体力瞬间恢复 25 点。' },
    energy_potion: { name: '活力药剂', icon: '🧪', stamina: 55, desc: '炼金精华，瞬间恢复 55 点体力。' },
    gem_ruby: { name: '红宝石', icon: '🔴', desc: '火山熔岩中凝出的炽红宝石，珍贵材料。' },
    gem_sapphire: { name: '蓝宝石', icon: '🔵', desc: '幽暗水域深处的深邃蓝宝石，珍贵材料。' },
    gem_jade: { name: '翡翠', icon: '🟢', desc: '古林根脉孕育的翠绿美玉，珍贵材料。' },
    flame_ruby_pendant: { name: '火焰红宝石吊坠', icon: '🔥', equip: 'collar', desc: '攻击 +40%（巧匠每级再 +8%）——比猫牙项链更强。' },
    sapphire_star: { name: '蓝宝石星坠', icon: '💠', equip: 'collar', desc: '攻击 +25% 且暴击率 +12%。' },
    jade_charm: { name: '翡翠护身符', icon: '🧿', equip: 'hat', desc: '每次受伤 -6（巧匠每级再 -1）——坚硬如玉。' },
    /* 高级场景草药与道具 */
    cactus_fruit: { name: '仙人掌果', icon: '🌵', water: 30, food: 5, heal: 2, desc: '荒漠里的绿洲果实：+30 水分。' },
    dragon_herb: { name: '龙血草', icon: '🌹', heal: 18, food: 8, desc: '火山岩缝中长出的殷红草药，直接吃回 18 生命。' },
    reishi: { name: '灵芝', icon: '🍄', heal: 12, mood: 10, desc: '古树上的灵药：回 12 生命、+10 心情。' },
    vine_strand: { name: '藤条', icon: '🪵', desc: '幽暗森林的坚韧藤条，编制护甲的材料。' },
    vine_armor: { name: '藤甲', icon: '🛡️', equip: 'hat', desc: '每次受伤 -7（巧匠每级再 -1），雨中几乎不湿身。' },
    stone_claw: { name: '石爪', icon: '🐾', equip: 'claw', desc: '攻击 +8（巧匠每级再 +2）——爪尖镶满宝石碎屑。' },
    dragon_potion: { name: '龙血药剂', icon: '🧫', heal: 60, desc: '沸腾的龙血精华，瞬间恢复 60 点生命。' },
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

  /* 物品安全查询：只读自有属性，杜绝 __proto__ / constructor 等原型链查找（低 23）；
     未命中返回 undefined，调用方按既有容错逻辑处理（如 if (!def) return;） */
  function itemDef(id) {
    return Object.prototype.hasOwnProperty.call(ITEMS, id) ? ITEMS[id] : undefined;
  }

  const RECIPES = [
    { id: 'leaf_hat', name: '树叶雨帽', icon: '🍀', parts: { leaves: 3, vines: 2 }, desc: '雨天防湿，且每次受伤 -2 点（防御）。' },
    { id: 'fishbone_collar', name: '鱼骨项圈', icon: '📿', parts: { fishbone: 3, sinew: 1 }, desc: '攻击 +3，流浪猫更快信任你。' },
    { id: 'cat_tooth_necklace', name: '猫牙项链', icon: '🦷', parts: { fishbone: 4, sinew: 2 }, desc: '攻击 +20%，对敌人造成更高伤害。' },
    { id: 'dried_catnip', name: '干猫薄荷', icon: '🍃', parts: { catnip: 2 }, dayOnly: true, desc: '强力提神 — 需要白天晾晒。' },
    { id: 'herb_salve', name: '草药膏', icon: '🧴', parts: { herbs: 3, fat: 1 }, desc: '敷在伤口上恢复 32 点生命。' },
    { id: 'catnip_tea', name: '猫薄荷茶', icon: '☕', parts: { catnip: 1, herbs: 1 }, desc: '体力 +25，瞬间见效。' },
    { id: 'energy_potion', name: '活力药剂', icon: '🧪', parts: { catnip: 2, herbs: 2, fat: 1 }, req: 'alchemist', desc: '体力 +55。需要【草药炼金】技能解锁。' },
    { id: 'flame_ruby_pendant', name: '火焰红宝石吊坠', icon: '🔥', parts: { gem_ruby: 1, fishbone: 2, sinew: 1 }, desc: '攻击 +40%——顶级饰品。' },
    { id: 'sapphire_star', name: '蓝宝石星坠', icon: '💠', parts: { gem_sapphire: 1, fishbone: 2, sinew: 1 }, desc: '攻击 +25%、暴击 +12%。' },
    { id: 'jade_charm', name: '翡翠护身符', icon: '🧿', parts: { gem_jade: 1, leaves: 2, vines: 2 }, desc: '每次受伤 -6。' },
    { id: 'vine_armor', name: '藤甲', icon: '🛡️', parts: { vine_strand: 3, leaves: 2, vines: 2 }, desc: '防御 -7、雨中几乎不湿身。' },
    { id: 'stone_claw', name: '石爪', icon: '🐾', parts: { gem_ruby: 1, sinew: 2, fishbone: 2 }, desc: '攻击 +8——显著提升伤害。' },
    { id: 'dragon_potion', name: '龙血药剂', icon: '🧫', parts: { dragon_herb: 2, herbs: 1, fat: 1 }, req: 'alchemist', desc: '瞬间恢复 60 生命。需要【草药炼金】。' },
  ];
  /* 制造类消耗品：受「能工巧匠」加成（每级效果 +20%） */
  const CRAFTED = new Set(['cooked_salmon', 'herb_salve', 'dried_catnip', 'catnip_tea', 'energy_potion', 'dragon_potion']);

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
    monkey: { r: 9, speed: 175, hp: 28, dmg: 6, aggro: 230 },
    croc: { r: 16, speed: 62, hp: 95, dmg: 16, aggro: 260 },
  };
  const COMPANION_NAMES = ['Mochi', 'Yuki', 'Nori', 'Suki', 'Taro', 'Kumo', 'Hana', 'Rin'];
  const TYPE_NAMES = { boar: '野猪', fox: '狐狸', viper: '毒蛇', monkey: '猴子', croc: '鳄鱼', mouse: '田鼠', grasshopper: '蚱蜢', salmon: '河鲑' };
  /* 敌人/猎物名：优先走 i18n 字典（enemy.<type>），缺失时回退数据中的中文原文 */
  const typeName = (t) => i18nFallback('enemy.' + t, TYPE_NAMES[t] || t);

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
      equipped: { hat: null, collar: null, claw: null },
      sniff: { active: false, t: 0, cd: 0 },
      groomCd: 0, interactCd: 0, pounceCd: 0,
      summonCd: 0,
      napT: 0, zoomiesT: 0,
      hurtT: 0, blinkT: 3, blink: false,
      tallGrass: false, inCave: false,
      poisonT: 0, poisonTick: 0, poisonPerTick: 10,   /* 中毒状态：剩余时间 + 跳血倒计时 + 每跳伤害 */
      outside: { x: 0, y: 0 },
      pounceHit: null,
    };
  }

  /* 施加中毒：取更长持续时间（可叠加刷新）；每 2 秒跳一次血，每跳伤害 perTick（缺省 10，扑击为 5）
     每跳伤害用新施加的值覆盖（中毒状态刷新为最新攻击的属性） */
  function applyPoison(p, dur, perTick) {
    p.poisonT = Math.max(p.poisonT || 0, dur);
    p.poisonPerTick = perTick || 10;
    if (p.poisonTick <= 0) p.poisonTick = 2;   /* 首跳在 2 秒后 */
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
      hp: scaledHp(d.hp), dmg: scaledDmg(d.dmg), aggro: d.aggro,
      alive: true, dir: Math.random() * U.TAU,
      animT: Math.random() * 10, wanderT: U.randRange(1.5, 4),
      state: 'wander', attackCd: 0, chasing: false, alerted: false,
      footstepsCd: U.randRange(2, 6), scentT: U.randRange(0.2, 0.8),
      fleeT: 0,
    };
    list.push(e);
    return e;
  }

  /* 伙伴猫唯一 id 递增计数：每次生成 +1 保证本次运行内不重复；
     起始加随机偏移，避免页面刷新后新生成的流浪猫与旧存档 id 撞车 */
  let companionSeq = U.randInt(100000, 999999);

  function spawnCompanion(init) {
    const c = {
      kind: 'companion',
      id: (init && typeof init.id === 'string' && init.id) ? init.id : 'cat' + (++companionSeq),
      name: (init && typeof init.name === 'string' && init.name) ? init.name : U.pick(COMPANION_NAMES),
      colorIdx: (init && Number.isInteger(init.colorIdx) && init.colorIdx >= 0 && init.colorIdx <= 2) ? init.colorIdx : U.randInt(0, 2),
      x: 0, y: 0, r: 12,
      speed: 85, dir: Math.random() * U.TAU,
      animT: Math.random() * 10, wanderT: U.randRange(2, 5),
      state: 'wander',
      friendship: (init && typeof init.friendship === 'number' && isFinite(init.friendship)) ? Math.max(0, Math.min(100, init.friendship)) : 0,
      perk: (init && typeof init.perk === 'number' && isFinite(init.perk)) ? Math.max(0, Math.min(3, Math.floor(init.perk))) : 0,
      met: !!(init && init.met), adopted: !!(init && init.adopted),
      follow: !!(init && init.adopted),
      scentT: U.randRange(0.3, 0.9),
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
  /* 敌对怪物密度：场景越深越密集；生成时还会按玩家等级加成（每 5 级 +30%） */
  const ZONE_SPAWN = {
    0: { prey: { mouse: 42, grasshopper: 30 }, salmon: 26, pred: { boar: 8, fox: 6, viper: 8 }, comp: 4 },
    1: { prey: { mouse: 26, grasshopper: 12 }, salmon: 8, pred: { fox: 7, viper: 4 }, strayDogs: 4, comp: 3 },
    2: { prey: { mouse: 20, grasshopper: 22 }, salmon: 6, pred: { boar: 7, fox: 8, viper: 10 }, comp: 3 },
    3: { prey: { mouse: 28, grasshopper: 12 }, salmon: 4, pred: { boar: 6, fox: 6, viper: 8, monkey: 8, croc: 7 }, comp: 3 },
  };
  /* 密度随玩家等级提升：每 5 级 +30%（保证高等级仍有大量怪可刷） */
  function densityMul() {
    return 1 + Math.floor((player.level - 1) / 5) * 0.3;
  }

  const BOSS_DEFS = {
    0: { name: '巨野猪', hp: 250, r: 22, bt: 'boar', speed: 90, charge: 430, dmg: 18 },
    1: { name: '弹弓顽童', hp: 180, r: 14, bt: 'kid', speed: 95, dmg: 10 },
    2: { name: '巨狼', hp: 300, r: 20, bt: 'wolf', speed: 300, dmg: 16 },
    /* 关底 Boss：大眼镜蛇——体型巨大、会喷毒与远距离扑击 */
    3: { name: '大眼镜蛇', hp: 520, r: 22, bt: 'cobra', speed: 82, dmg: 26 },
  };
  const BOSS_SPOTS = {
    0: { tx: 146, ty: 146 },
    1: { tx: 156, ty: 83 },   /* 城市东端竞技场 */
    2: { tx: 146, ty: 146 },
    3: { tx: 150, ty: 150 },
  };
  let boss = null;
  let bossProjectiles = [];
  /* 场景内怪物补刷：记录密度目标，怪物被杀后缓慢补回，避免"刷空一个场景" */
  let predTarget = 0;
  let strayTarget = 0;
  let respawnT = 0;

  function init(zone, placePos, keepPlayer) {
    /* 跨区传送（keepPlayer=true）时保留已收养的伙伴猫：羁绊不因换区被清空；
       未收养的流浪猫随场景重新生成（keepPlayer=false 新档则照旧全部清空） */
    const kept = [];
    if (keepPlayer) {
      for (const c of companions) if (c.adopted) kept.push(c);
    }
    list.length = 0;
    companions.length = 0;
    bossProjectiles.length = 0;
    predTarget = 0;
    strayTarget = 0;
    respawnT = 0;
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
    snapToWalkable(player);   /* 放置后立刻确保可行走 */

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
    /* 生成后记录密度目标（用于场景内补刷） */
    const dm = densityMul();
    for (const type in cfg.pred) {
      let n = 0;
      const target = Math.round(cfg.pred[type] * dm);
      for (let tries = 0; tries < 3000 && n < target; tries++) {
        const tx = U.randInt(2, W.W - 3), ty = U.randInt(2, W.H - 3);
        if (canSpawnPred(type, tx, ty)) { spawnPredator(type, tx, ty); n++; }
      }
      predTarget += target;
    }
    /* 跨区传送保留的已收养伙伴猫：就近放到新区域可行走位置，继续跟随玩家 */
    for (const c of kept) {
      c.x = player.x + U.randRange(-30, 30);
      c.y = player.y + U.randRange(-30, 30);
      snapToWalkable(c);
      list.push(c);
      companions.push(c);
    }
    for (let i = 0; i < cfg.comp; i++) spawnCompanion();
    /* 流浪狗：城市里的新威胁（密度同样随等级加成） */
    const dogTarget = Math.round((cfg.strayDogs || 0) * dm);
    for (let i = 0; i < dogTarget; i++) spawnStrayDog();
    strayTarget = dogTarget;
    spawnBoss(zone);
  }

  /* 捕食者可生成的格位条件（生成与补刷共用） */
  function canSpawnPred(type, tx, ty) {
    const t = W.terrain[W.idx(tx, ty)];
    return type === 'viper' ? (t === W.T.GRASS || t === W.T.FOREST || t === W.T.SWAMP || t === W.T.URBAN)
      : type === 'monkey' ? (t === W.T.MEADOW || t === W.T.DIRT || t === W.T.GRASS)
        : type === 'croc' ? (t === W.T.SWAMP || W.isWater(tx, ty) || W.isWater(tx - 1, ty) || W.isWater(tx + 1, ty) || W.isWater(tx, ty - 1) || W.isWater(tx, ty + 1))
          : (t !== W.T.WATER && t !== W.T.ROCK && t !== W.T.WALL && t !== W.T.LAVA);
  }

  function spawnStrayDog(tx, ty) {
    if (tx === undefined) {
      for (let tries = 0; tries < 240; tries++) {
        tx = U.randInt(2, W.W - 3); ty = U.randInt(2, W.H - 3);
        if (W.canWalk(tx, ty)) break;
      }
    }
    if (!W.canWalk(tx, ty)) return null;
    const e = {
      kind: 'straydog', x: (tx + 0.5) * W.TILE, y: (ty + 0.5) * W.TILE,
      r: 12, speed: 145, hp: scaledHp(30), dmg: scaledDmg(8), dir: Math.random() * U.TAU,
      animT: Math.random() * 10, wanderT: U.randRange(2, 5),
      chaseT: 0, attackCd: 0, scentT: U.randRange(0.2, 0.8),
      state: 'wander', stateT: 0, alive: true,
    };
    list.push(e);
    return e;
  }

  /* 潜行侦测统一系数（中 18）：捕食者 / 流浪狗 / 挑战实体共用同一套规则；
     潜行 + 高草隐匿最佳，伪装技能（camo）效果翻倍，仅高草也有小幅隐蔽 */
  function sneakFactor() {
    const p = player;
    if (!p) return 1;
    if (p.state === 'sneak' && p.tallGrass) return hasSkill('camo') ? 0.18 : 0.35;
    if (p.state === 'sneak') return hasSkill('camo') ? 0.4 : 0.55;
    if (p.tallGrass) return 0.8;
    return 1;
  }

  function updateStrayDog(e, dt) {
    const p = player;
    e.animT += dt;
    e.scentT -= dt;
    if (e.scentT <= 0) {
      Game.particles.emitScent('predator', e.x, e.y, p.sniff.active);
      e.scentT = p.sniff.active ? 0.15 : 0.9;
    }
    e.attackCd = Math.max(0, e.attackCd - dt);
    const d = U.dist(e.x, e.y, p.x, p.y);
    if (e.chaseT > 0) {
      e.chaseT -= dt;
      if (d > 520) e.chaseT = 0;   /* 追丢了就放弃 */
      if (e.chaseT > 0) {
        e.state = 'chase';
        e.dir = Math.atan2(p.y - e.y, p.x - e.x);
        moveEntity(e, Math.cos(e.dir) * e.speed * dt, Math.sin(e.dir) * e.speed * dt);
        if (d < e.r + p.r + 5 && e.attackCd <= 0) {
          e.attackCd = 1.2;
          damagePlayer(e.dmg);
          Game.ui.log(Game.i18n.t('log.dog.bite', { dmg: e.dmg }), 'danger');
        }
        return;
      }
    }
    /* 基础侦测半径统一乘潜行系数（95/150 硬编码已并入 sneakFactor） */
    let detect = 235 * sneakFactor();
    if (d < detect && e.chaseT <= 0) {
      e.chaseT = 6;
      Game.ui.log(Game.i18n.t('log.dog.bark'), 'danger');
      Game.sfx && Game.sfx.bark();
      return;
    }
    e.state = 'wander';
    if (e.wanderT <= 0) { e.dir = Math.random() * U.TAU; e.wanderT = U.randRange(2, 5); }
    e.wanderT -= dt;
    moveEntity(e, Math.cos(e.dir) * e.speed * 0.35 * dt, Math.sin(e.dir) * e.speed * 0.35 * dt);
  }

  function hitStrayDog(e) {
    const crit = rollCrit();
    e.hp -= pounceDmg(18, crit);
    e.chaseT = 0;
    e.state = 'hurt';
    e.stateT = 0;
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: crit ? 40 : 24, color: crit ? 'rgba(255,220,90,0.95)' : 'rgba(255,120,80,0.7)', life: 0.35 });
    Game.ui.log(Game.i18n.t('log.dog.hit', { crit: crit ? Game.i18n.t('log.crit.bang') : '' }), 'combat');
    if (e.hp <= 0) {
      e.alive = false;
      addItem('sinew');
      addXp(12);
      Game.ui.log(Game.i18n.t('log.dog.defeated'), 'combat');
    }
  }

  function spawnBoss(zone) {
    const def = BOSS_DEFS[zone] || BOSS_DEFS[0];
    const sp = BOSS_SPOTS[zone] || BOSS_SPOTS[0];
    /* 清理出一小块竞技场（用地形本色，避免在荒原/城市里出现绿色草皮） */
    const base = zone === 1 ? W.T.URBAN : zone === 2 ? W.T.DIRT : W.T.MEADOW;
    for (let dy = -5; dy <= 5; dy++) {
      for (let dx = -5; dx <= 5; dx++) {
        const tx = sp.tx + dx, ty = sp.ty + dy;
        if (W.inBounds(tx, ty) && W.terrain[W.idx(tx, ty)] !== W.T.WATER) W.terrain[W.idx(tx, ty)] = base;
      }
    }
    if (Game.state.bossDefeated && Game.state.bossDefeated[zone]) { boss = null; return; }
    /* Boss 难度：在场景系数上再上浮 15%，随玩家等级成长 */
    const k = difficultyK() * 1.15;
    const bhp = Math.max(1, Math.round(def.hp * k));
    boss = {
      kind: 'boss', bt: def.bt, name: def.name,
      x: (sp.tx + 0.5) * W.TILE, y: (sp.ty + 0.5) * W.TILE,
      r: def.r, hp: bhp, hpMax: bhp,
      speed: def.speed * Math.min(1.12, 1 + (k - 1) * 0.03),
      charge: def.charge || 0,
      dmg: Math.max(1, Math.round(def.dmg * (1 + (k - 1) * 0.65))),
      aggro: false, attackCd: 0, chargeCd: 0, shootCd: U.randRange(1.5, 2.5),
      spitCd: U.randRange(2, 3.5), leapCd: U.randRange(3, 5),
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
          Game.ui.log(Game.i18n.t('log.boss.boar.charge'), 'danger');
          Game.sfx && Game.sfx.alert();
        } else {
          boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
          moveEntity(boss, Math.cos(boss.dir) * boss.speed * dt, Math.sin(boss.dir) * boss.speed * dt);
        }
      }
      if (d < boss.r + p.r + 6 && boss.attackCd <= 0) {
        boss.attackCd = 1.2;
        damagePlayer(boss.dmg);
        Game.ui.log(Game.i18n.t('log.boss.boar.hit', { dmg: boss.dmg }), 'danger');
      }
    } else if (boss.bt === 'wolf') {
      boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
      moveEntity(boss, Math.cos(boss.dir) * boss.speed * dt, Math.sin(boss.dir) * boss.speed * dt);
      if (d < boss.r + p.r + 6 && boss.attackCd <= 0) {
        boss.attackCd = 1.0;
        damagePlayer(boss.dmg);
        Game.ui.log(Game.i18n.t('log.boss.wolf.hit', { dmg: boss.dmg }), 'danger');
      }
    } else if (boss.bt === 'cobra') {
      /* 大眼镜蛇（关底 Boss）：毒液喷射 + 远距离扑击 + 近战咬毒
         技能均有前摇：喷毒前伏低身体、扑击前高高支起身体 */
      const dCur = U.dist(boss.x, boss.y, p.x, p.y);
      if (boss.state === 'spitWindup') {
        /* 前摇：伏低身体，锁向玩家 */
        boss.stateT -= dt;
        boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
        if (boss.stateT <= 0) {
          boss.state = 'idle';
          boss.spitCd = U.randRange(4.5, 6.5);
          const a = Math.atan2(p.y - boss.y, p.x - boss.x);
          bossProjectiles.push({
            x: boss.x + Math.cos(a) * 22, y: boss.y + 10,
            sx: boss.x + Math.cos(a) * 22, sy: boss.y + 10,   /* 射线起点（蛇口） */
            vx: Math.cos(a) * 340, vy: Math.sin(a) * 340,
            life: 1.55, dmg: 10, venom: true,   /* life 限制射程 ≈527px */
          });
          Game.ui.log(Game.i18n.t('log.boss.cobra.spit'), 'danger');
          Game.sfx && Game.sfx.pounce();
          for (let i = 0; i < 7; i++) {
            Game.particles.spawn({
              x: boss.x + Math.cos(a) * 26, y: boss.y + 8,
              kind: 'dot', size: U.randRange(2, 3.5),
              color: 'rgba(150,255,110,0.9)',
              vx: Math.cos(a + U.randRange(-0.35, 0.35)) * U.randRange(50, 130),
              vy: U.randRange(-50, 10), life: 0.55, grav: 140,
            });
          }
        }
      } else if (boss.state === 'leapWindup') {
        /* 前摇：支起身体，锁向玩家 */
        boss.stateT -= dt;
        boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
        if (boss.stateT <= 0) {
          boss.state = 'leap';
          boss.stateT = 0.45;
          boss.leapCd = U.randRange(5, 7);
          boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
          boss.vx = Math.cos(boss.dir) * 580;
          boss.vy = Math.sin(boss.dir) * 580;
          Game.ui.log(Game.i18n.t('log.boss.cobra.leap'), 'danger');
          Game.sfx && Game.sfx.alert();
        }
      } else if (boss.state === 'leap') {
        /* 扑击飞行：高速冲向玩家，路径撞上即重创 */
        boss.stateT -= dt;
        boss.dir = Math.atan2(boss.vy, boss.vx);
        moveEntity(boss, boss.vx * dt, boss.vy * dt);
        Game.particles.spawn({ x: boss.x, y: boss.y + 16, kind: 'puff', size: 7, color: 'rgba(150,190,130,0.5)', life: 0.3 });
        const d2 = U.dist(boss.x, boss.y, p.x, p.y);
        if (d2 < boss.r + p.r + 10) {
          const pdmg = 30;   /* 扑击直接伤害 30 */
          damagePlayer(pdmg);
          applyPoison(p, 4, 5);   /* 中毒：每 2 秒 5 点，持续 4 秒 */
          Game.ui.log(Game.i18n.t('log.boss.cobra.leapHit', { dmg: pdmg }), 'danger');
          boss.state = 'idle';
          boss.attackCd = 1.4;
        }
        if (boss.stateT <= 0) boss.state = 'idle';
      } else {
        /* 常规：追踪 + 技能调度 + 近战咬毒 */
        boss.dir = Math.atan2(p.y - boss.y, p.x - boss.x);
        moveEntity(boss, Math.cos(boss.dir) * boss.speed * dt, Math.sin(boss.dir) * boss.speed * dt);
        boss.spitCd = Math.max(0, boss.spitCd - dt);
        boss.leapCd = Math.max(0, boss.leapCd - dt);
        boss.attackCd = Math.max(0, boss.attackCd - dt);
        if (boss.spitCd <= 0 && dCur < 380 && dCur > 120) {
          boss.state = 'spitWindup';
          boss.stateT = 0.7;
          Game.ui.log(Game.i18n.t('log.boss.cobra.spitWindup'), 'danger');
          Game.sfx && Game.sfx.alert();
        } else if (boss.leapCd <= 0 && dCur < 320 && dCur > 80) {
          boss.state = 'leapWindup';
          boss.stateT = 0.6;
          Game.ui.log(Game.i18n.t('log.boss.cobra.leapWindup'), 'danger');
          Game.sfx && Game.sfx.alert();
        } else if (dCur < boss.r + p.r + 8 && boss.attackCd <= 0) {
          boss.attackCd = 1.1;
          damagePlayer(boss.dmg);
          applyPoison(p, 5, 5);
          Game.ui.log(Game.i18n.t('log.boss.cobra.bite', { dmg: boss.dmg }), 'danger');
        }
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
        Game.ui.log(Game.i18n.t('log.boss.kid.shoot'), 'danger');
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
      /* 毒液射程限制：离蛇口超过 540px 即消散（射线不会无限长） */
      if (pr.venom && pr.sx !== undefined && U.dist2(pr.x, pr.y, pr.sx, pr.sy) > 540 * 540) {
        bossProjectiles.splice(i, 1);
        Game.particles.spawn({ x: pr.x, y: pr.y, kind: 'puff', size: 6, color: 'rgba(120,220,80,0.5)', life: 0.3 });
        continue;
      }
      if (U.dist2(p.x, p.y, pr.x, pr.y) < 16 * 16) {
        bossProjectiles.splice(i, 1);
        damagePlayer(pr.dmg);
        if (pr.venom) {
          applyPoison(p, 5, 5);
          Game.ui.log(Game.i18n.t('log.poison.venom', { dmg: pr.dmg }), 'danger');
        } else {
          Game.ui.log(Game.i18n.t('log.boss.kid.hit', { dmg: pr.dmg }), 'danger');
        }
      }
    }
  }

  function hitBoss(dmg, crit) {
    if (!boss || !boss.alive) return;
    boss.hp -= dmg;
    boss.aggro = true;
    Game.sfx && Game.sfx.hit();
    Game.particles.spawn({ x: boss.x, y: boss.y, kind: 'ring', size: crit ? 52 : 30, color: crit ? 'rgba(255,220,90,0.95)' : 'rgba(255,120,80,0.8)', life: crit ? 0.55 : 0.35 });
    if (crit) Game.ui.log(Game.i18n.t('log.boss.crit', { name: bossName(boss.bt), dmg: dmg }), 'combat');
    if (boss.hp <= 0) {
      boss.hp = 0;
      boss.alive = false;
      Game.ui.log(Game.i18n.t('log.boss.defeated', { name: bossName(boss.bt) }), 'good');
      Game.sfx && Game.sfx.craft();
      addXp(Math.round(120 * (1 + (Game.state.zone || 0) * 0.25)));
      if (Game.state.bossDefeated) Game.state.bossDefeated[Game.state.zone] = true;
      /* 记录重生时间：4 分钟（游戏时间）后自动复活 */
      if (Game.state.bossRespawn) {
        Game.state.bossRespawn[Game.state.zone] = Game.state.day * Game.state.DAY_LEN + Game.state.sec + 240;
      }
      Game.particles.spawn({ x: boss.x, y: boss.y, kind: 'puff', size: 30, color: 'rgba(255,180,120,0.8)', life: 0.8 });
      bossProjectiles.length = 0;
    }
  }

  /* Boss 自动重生：被击败后过一段时间在竞技场复活（提升可玩性） */
  function checkBossRespawn() {
    if ((boss && boss.alive) || !Game.state || !Game.state.bossDefeated || !Game.state.bossRespawn) return;
    const z = Game.world.zone;
    if (!Game.state.bossDefeated[z]) return;
    const now = Game.state.day * Game.state.DAY_LEN + Game.state.sec;
    if ((Game.state.bossRespawn[z] || 0) <= now) {
      Game.state.bossDefeated[z] = false;
      spawnBoss(z);
      if (boss) Game.ui.log(Game.i18n.t('log.boss.respawn', { name: bossName(boss.bt) }), 'danger');
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
  /* 升级经验曲线：平缓递增（70 × L^1.15），配合更高怪物密度，成长更快、不必死刷 */
  function xpToLevel(level) {
    return Math.floor(70 * Math.pow(level, 1.15));
  }
  function hasSkill(id) {
    return !!player && player.skills.includes(id);
  }
  function recalcMaxStats(p) {
    p = p || player;
    if (!p) return;
    /* 每级永久成长：生命 +10、体力 +6、心情 +6（满血/满体力时升级即时生效） */
    p.stats.hpMax = 100 + (p.level - 1) * 10;
    p.stats.staminaMax = 100 + (p.level - 1) * 6;
    p.stats.moodMax = Math.round((100 + (p.level - 1) * 6) * (p.skills.includes('brave') ? 1.25 : 1));
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
      Game.ui.log(Game.i18n.t('log.level.up', { level: p.level }), 'good');
      Game.sfx && Game.sfx.craft();
      need = xpToLevel(p.level);
    }
  }
  function grantSkillPoint(n) {
    if (!player) return;
    n = n || 1;
    player.skillPoints += n;
    Game.ui.log(Game.i18n.t('log.skill.point', { n: n, points: player.skillPoints }), 'craft');
    Game.sfx && Game.sfx.craft();
  }
  const SKILL_DEFS = {
    hunter: { name: '猎手本能', max: 5, desc: '每级：扑击伤害 +15%、捕捉范围更大' },
    leap: { name: '飞扑袭杀', max: 3, desc: '每级：扑击距离 +20%（满级 +60%）' },
    keen: { name: '敏锐嗅觉', max: 1, desc: '嗅探范围 +40%，气味更浓密' },
    angler: { name: '渔夫之尾', max: 1, desc: '钓鱼必定成功' },
    swift: { name: '疾风快爪', max: 1, desc: '移动速度 +10%，体力回复 +25%' },
    thick: { name: '厚实毛皮', max: 5, desc: '每级：受到的伤害 -12%（满级 -47%）' },
    camo: { name: '树叶伪装', max: 1, desc: '高草丛隐匿效果翻倍，潜行更省体力' },
    vitality: { name: '活力充盈', max: 5, desc: '每级：体力恢复速度 +30%（满级 +150%）' },
    guardian: { name: '守护之力', max: 1, desc: '友情获取 +50%，狩猎协助 +4' },
    brave: { name: '无畏之心', max: 1, desc: '心情上限 +25%，挑战奖励 +50%' },
    summon: { name: '召唤强化', max: 1, desc: '召唤时间 25→40 秒，冷却 5→3 分钟' },
    dodge: { name: '灵动闪避', max: 5, desc: '每级：6% 概率完全闪避伤害（满级 30%）' },
    agile: { name: '身轻如燕', max: 1, desc: '扑击消耗体力 -40%，冷却 -0.2 秒' },
    craft: { name: '能工巧匠', max: 5, desc: '每级：制造物品效果 +20%，装备加成也提升' },
    alchemist: { name: '草药炼金', max: 1, desc: '解锁活力药剂等强力配方' },
  };
  const SKILL_NAMES = {};
  for (const k in SKILL_DEFS) SKILL_NAMES[k] = SKILL_DEFS[k].name;

  /* ------------------------------------------------------------ i18n 辅助函数
     数据对象（ITEMS / RECIPES / SKILL_DEFS / BOSS_DEFS / TYPE_NAMES）里的
     name / desc 保留中文原文，供 ui / render / challenges 等模块直接读取（结构不变）；
     运行时展示一律通过这些辅助函数走 Game.i18n.t()，切换语言即时生效，
     字典缺失（返回 key 本身）时回退数据对象中的中文原文，绝不崩。 */
  function i18nFallback(key, zh) {
    if (!Game.i18n || typeof Game.i18n.t !== 'function') return zh;
    const s = Game.i18n.t(key);
    return (s === undefined || s === null || s === key) ? zh : s;
  }
  /* 物品名 / 描述：key = item.<id>.name / item.<id>.desc */
  function itemName(id) {
    const def = itemDef(id);
    return i18nFallback('item.' + id + '.name', def ? def.name : id);
  }
  function itemDesc(id) {
    const def = itemDef(id);
    return i18nFallback('item.' + id + '.desc', def ? def.desc : '');
  }
  /* 技能名 / 描述：key = skill.<id>.name / skill.<id>.desc */
  function skillName(id) {
    const def = SKILL_DEFS[id];
    return i18nFallback('skill.' + id + '.name', def ? def.name : id);
  }
  function skillDesc(id) {
    const def = SKILL_DEFS[id];
    return i18nFallback('skill.' + id + '.desc', def ? def.desc : '');
  }
  /* Boss 名：字典按区域索引（boss.<zone>），从 bt（boar/kid/wolf/cobra）反查区域 */
  function bossZoneOf(bt) {
    for (const z in BOSS_DEFS) {
      if (Object.prototype.hasOwnProperty.call(BOSS_DEFS, z) && BOSS_DEFS[z].bt === bt) return z;
    }
    return '0';
  }
  function bossName(bt) {
    const z = bossZoneOf(bt);
    const def = BOSS_DEFS[z] || BOSS_DEFS[0];
    return i18nFallback('boss.' + z, def ? def.name : bt);
  }
  function skillLevel(id) {
    return player ? player.skills.filter((s) => s === id).length : 0;
  }
  /* 体力恢复倍率：等级成长（每级 +4%，上限 +140%）+ 活力充盈（每级 +30%）+ 疾风快爪（+25%） */
  function staminaRegenMult() {
    if (!player) return 1;
    return Math.min(2.4, 1 + (player.level - 1) * 0.04 + skillLevel('vitality') * 0.3 + (hasSkill('swift') ? 0.25 : 0));
  }
  /* 制作倍率：能工巧匠每级 +20% */
  function craftMult() {
    return 1 + skillLevel('craft') * 0.2;
  }

  /* ---------------------------------------------------- 难度曲线（随玩家等级成长）
     怪物 / Boss / 挑战的强度随玩家等级同步提升，各场景自带基础难度梯度：
     荒野草原 1.0 < 城市小区 1.25 < 干燥荒野 1.5 < 幽暗森林 1.8，
     每级额外 +8%，保证无论等级高低都始终有挑战。 */
  const ZONE_DIFF = [1.0, 1.25, 1.5, 1.8];
  function difficultyK() {
    const lvl = player ? player.level : 1;
    return (ZONE_DIFF[Game.world.zone] || 1.0) + (lvl - 1) * 0.08;
  }
  function scaledHp(base) { return Math.max(1, Math.round(base * difficultyK())); }
  function scaledDmg(base) {
    const k = difficultyK();
    return Math.max(1, Math.round(base * (1 + (k - 1) * 0.65)));
  }
  function scaledXp(base) {
    const k = difficultyK();
    return Math.max(1, Math.round(base * (1 + (Game.world.zone || 0) * 0.25) * (1 + (k - 1) * 0.4)));
  }
  function learnSkill(skillId) {
    const p = player;
    if (!p) return false;
    const def = SKILL_DEFS[skillId];
    if (!def) {
      Game.ui.log(Game.i18n.t('log.skill.none'), 'info');
      return false;
    }
    const lv = skillLevel(skillId);
    if (lv >= def.max) {
      Game.ui.log(Game.i18n.t('log.skill.maxed', { name: skillName(skillId), max: def.max }), 'info');
      return false;
    }
    if (p.skillPoints < 1) {
      Game.ui.log(Game.i18n.t('log.skill.noPoint'), 'info');
      return false;
    }
    p.skillPoints -= 1;
    p.skills.push(skillId); /* 同一技能可重复点亮，逐级提升 */
    recalcMaxStats(p);
    addXp(25);
    Game.ui.log(Game.i18n.t('log.skill.learned', { name: skillName(skillId), lv: lv + 1, max: def.max }), 'craft');
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
    Game.ui.log(Game.i18n.t('log.skill.book', { name: itemName(id) }), 'craft');
    Game.sfx && Game.sfx.craft();
    return true;
  }

  function useItem(id) {
    const p = player;
    const def = itemDef(id);
    if (!def) return;
    if (def.book) {
      /* 旧版技能书：技能点只在升级时获得，书改为赠送经验 */
      removeItem(id, 1);
      addXp(40);
      Game.ui.log(Game.i18n.t('log.skill.readBook'), 'craft');
      return;
    }
    if (def.equip) {
      const slot = def.equip;
      if (p.equipped[slot]) {
        /* 卸下：装备物一直留在行囊中，只清空装备槽 */
        p.equipped[slot] = null;
        Game.ui.log(Game.i18n.t('log.equip.off', { name: itemName(id) }), 'info');
      } else {
        /* 穿上：物品保留在行囊，装备槽记录 id，背包显示"已装备"标记 */
        p.equipped[slot] = id;
        Game.ui.log(Game.i18n.t('log.equip.on', { name: itemName(id) }), 'good');
      }
      Game.sfx && Game.sfx.craft();
      Game.ui.refreshModals && Game.ui.refreshModals();
      return;
    }
    if (def.food || def.mood || def.heal || def.stamina || def.zoomies) {
      const s = p.stats;
      /* 制造类消耗品受「能工巧匠」加成 */
      const cm = CRAFTED.has(id) ? craftMult() : 1;
      if (def.food) s.satiety = Math.min(s.satietyMax, s.satiety + def.food * cm);
      if (def.water) s.hydration = Math.min(s.hydrationMax, s.hydration + def.water * cm);
      if (def.mood) s.mood = Math.min(s.moodMax, s.mood + def.mood * cm);
      if (def.heal) s.hp = Math.min(s.hpMax, s.hp + def.heal * cm);
      if (def.stamina) s.stamina = Math.min(s.staminaMax, s.stamina + def.stamina * cm);
      removeItem(id);
      if (def.zoomies) {
        p.zoomiesT = 6;
        Game.ui.log(Game.i18n.t('log.zoomies', { name: itemName(id) }), 'zoomies');
        Game.sfx && Game.sfx.zoomies();
      } else {
        Game.ui.log(Game.i18n.t('log.item.use', { name: itemName(id) }), 'good');
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

    /* fur wetness：从全干到全湿约 3 分钟（幽暗森林多雨、湿得更快） */
    if (st.weather === 'rain' && !p.inCave) {
      const hat = p.equipped.hat;
      const zMul = Game.world.zone === 3 ? 1.8 : 1;   /* 森林雨天湿速 ×1.8 */
      /* 藤甲几乎防水（约 1 小时）、树叶雨帽大幅防湿（约 10 分钟）、裸奔 3 分钟全湿 */
      const wetRate = (hat === 'vine_armor' ? 0.028 : hat ? 0.16 : 0.55) * zMul;
      s.wetness = Math.min(s.wetnessMax, s.wetness + dt * wetRate);
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

    /* 中毒持续跳血：每 2 秒掉一次血（毒液/咬伤默认 10 点/跳，扑击 5 点/跳） */
    if (p.poisonT > 0) {
      p.poisonT -= dt;
      p.poisonTick = (p.poisonTick || 0) - dt;
      if (p.poisonTick <= 0) {
        p.poisonTick = 2;
        const tick = p.poisonPerTick || 10;
        s.hp -= tick;
        Game.ui.log(Game.i18n.t('log.poison.tick', { n: tick }), 'danger');
        for (let i = 0; i < 4; i++) {
          Game.particles.spawn({
            x: p.x + U.randRange(-9, 9), y: p.y - U.randRange(2, 12),
            kind: 'dot', size: U.randRange(1.8, 2.6), color: 'rgba(130,255,100,0.85)',
            vx: U.randRange(-5, 5), vy: U.randRange(-18, -6), life: 0.7, grav: 40,
          });
        }
      }
      if (p.poisonT <= 0) {
        p.poisonT = 0;
        p.poisonTick = 0;
        p.poisonPerTick = 10;
        Game.ui.log(Game.i18n.t('log.poison.gone'), 'info');
      }
    }
    if (s.hp <= 0) { s.hp = 0; die(); return; }

    /* mood */
    s.mood = Math.max(0, s.mood - dt * 0.06);
    if (s.hp < 35) s.mood -= dt * 0.1;
    /* 身体全湿后毛发沉重拖累，缓慢消耗心情 */
    if (s.wetness > 80) s.mood -= dt * 0.1;

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
    Game.ui.log(Game.i18n.t('log.death'), 'danger');
    Game.sfx && Game.sfx.hurt();
    p.x = W.spawn.x; p.y = W.spawn.y;
    p.inCave = false;
    p.poisonT = 0; p.poisonTick = 0; p.poisonPerTick = 10;   /* 死亡醒来不再中毒 */
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

  /* 兜底：把实体就近吸附到可行走格（跨区域/存档异常时绝不会卡在墙里） */
  function snapToWalkable(e) {
    e = e || player;
    if (!e) return;
    const t = W.tileAt(e.x, e.y);
    if (W.canWalk(t.tx, t.ty)) return;
    for (let r = 1; r < 80; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const tx = t.tx + dx, ty = t.ty + dy;
          if (W.inBounds(tx, ty) && W.canWalk(tx, ty)) {
            e.x = (tx + 0.5) * W.TILE;
            e.y = (ty + 0.5) * W.TILE;
            return;
          }
        }
      }
    }
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
    p.summonCd = Math.max(0, p.summonCd - dt);   /* 修复：召唤冷却此前从不递减 */
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
        p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + dt * 3 * staminaRegenMult());
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

    /* 每 0.5s 兜底检查：万一落在不可走格自动吸附（杜绝卡死） */
    p.autoSnapT = (p.autoSnapT || 0) - dt;
    if (p.autoSnapT <= 0) {
      p.autoSnapT = 0.5;
      const tt = W.tileAt(p.x, p.y);
      if (!W.canWalk(tt.tx, tt.ty)) {
        snapToWalkable(p);
        Game.ui.log(Game.i18n.t('log.stumble'), 'info');
      }
    }

    /* stamina: wet fur slows regen; level/vitality/swift speed it up; Camo cheapens sneaking */
    const wetPenalty = p.stats.wetness > 40 ? 1 - (p.stats.wetness - 40) / 100 * 0.7 : 1;
    if (len > 0) {
      const cost = 3.2 * (sneaking ? 2.4 : 1) * (sneaking && hasSkill('camo') ? 0.6 : 1);
      p.stats.stamina = Math.max(0, p.stats.stamina - dt * cost);
    } else {
      p.stats.stamina = Math.min(p.stats.staminaMax, p.stats.stamina + dt * 7 * wetPenalty * (p.equipped.hat ? 1.25 : 1) * staminaRegenMult());
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
    /* 身轻如燕：扑击更省体力、冷却更短 */
    p.stats.stamina -= hasSkill('agile') ? 7 : 12;
    const ang = p.facing;
    /* 飞扑袭杀：每级扑击距离 +20% */
    const leapMul = 1 + skillLevel('leap') * 0.2;
    p.vx = Math.cos(ang) * 560 * leapMul;
    p.vy = Math.sin(ang) * 560 * leapMul;
    p.pounceCd = hasSkill('agile') ? 0.6 : 0.8;
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
      if (tt === W.T.ROCK || tt === W.T.WALL || tt === W.T.LAVA) return false;   /* 岩石/建筑墙/熔岩不可逾越；水面在扑击时可以通过 */
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
        else if (e.kind === 'straydog') { hitStrayDog(e); p.pounceHit.add(e); }
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
        Game.ui.log(Game.i18n.t('log.pounce.water'), 'info');
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
    Game.ui.log(Game.i18n.t('log.groom'), 'good');
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
    Game.ui.log(Game.i18n.t('log.catch', { name: itemName(id) }), 'catch');
    Game.sfx && Game.sfx.catch();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'puff', size: 12, color: 'rgba(255,240,210,0.6)', life: 0.5 });
  }

  /* 心情影响暴击：心情越高暴击率越高（5% ~ 25%），暴击造成双倍伤害；蓝宝石星坠再 +12% */
  function critChance() {
    let c = 0.05 + (player.stats.mood / player.stats.moodMax) * 0.20;
    if (player.equipped.collar === 'sapphire_star') c += 0.12;
    return c;
  }
  function rollCrit() {
    return Math.random() < critChance();
  }
  /* 玩家扑击总伤害：装备（鱼骨项圈 / 猫牙项链 / 红宝石吊坠 / 蓝宝石星坠 + 石爪，能工巧匠加成）
     + 猎手本能（可多级）+ 召唤加成 + 暴击 */
  function pounceDmg(base, crit) {
    let d = base;
    if (player.equipped.collar === 'fishbone_collar') d += 3 + skillLevel('craft');
    else if (player.equipped.collar === 'cat_tooth_necklace') d *= 1.2 + skillLevel('craft') * 0.04;
    else if (player.equipped.collar === 'flame_ruby_pendant') d *= 1.4 + skillLevel('craft') * 0.08;
    else if (player.equipped.collar === 'sapphire_star') d *= 1.25;
    if (player.equipped.claw === 'stone_claw') d += 8 + skillLevel('craft') * 2;
    if (hasSkill('hunter')) d *= 1 + skillLevel('hunter') * 0.15;
    if (companions.some((c) => c.summonT > 0)) d *= 1.15;
    if (crit) d *= 2;
    return Math.round(d);
  }

  function hitPredator(e) {
    const crit = rollCrit();
    let dmg = pounceDmg(e.type === 'boar' ? 26 : e.type === 'fox' ? 20 : e.type === 'croc' ? 24 : e.type === 'monkey' ? 16 : 14, crit);
    /* companion hunt-assist perk (level 3) — Guardian's Prowess boosts it */
    if (companions.some((c) => c.perk >= 3 && U.dist(c.x, c.y, e.x, e.y) < 260)) dmg += hasSkill('guardian') ? 12 : 8;
    e.hp -= dmg;
    e.state = 'hurt';
    e.stateT = 0;
    e.chasing = false;
    e.fleeT = 1.6;
    Game.sfx && Game.sfx.hit();
    Game.ui.log(Game.i18n.t('log.combat.hit', { name: typeName(e.type), dmg: dmg, crit: crit ? Game.i18n.t('log.crit.wrap') : '' }), 'combat');
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'ring', size: crit ? 44 : 26, color: crit ? 'rgba(255,220,90,0.95)' : 'rgba(255,120,80,0.7)', life: crit ? 0.5 : 0.35 });
    if (e.hp <= 0) killPredator(e);
  }

  function killPredator(e) {
    e.alive = false;
    if (e.type === 'boar') { addItem('fat', 2); addItem('sinew'); }
    if (e.type === 'fox') { addItem('sinew', 2); }
    if (e.type === 'viper') { addItem('herbs', 2); }
    if (e.type === 'monkey') { addItem('sinew', U.randInt(1, 2)); if (Math.random() < 0.12) { addItem('gem_jade'); Game.ui.log(Game.i18n.t('log.drop.jade'), 'good'); } }
    if (e.type === 'croc') { addItem('fat', 2); addItem('sinew'); if (Math.random() < 0.2) { addItem('gem_sapphire'); Game.ui.log(Game.i18n.t('log.drop.sapphire'), 'good'); } }
    addXp(scaledXp(e.type === 'boar' ? 25 : e.type === 'fox' ? 20 : e.type === 'croc' ? 30 : e.type === 'monkey' ? 15 : 15));
    if (Game.state && Game.state.journey) Game.state.journey.predatorsSlain++;
    if (Math.random() < 0.08) grantSkillBook(false);
    Game.ui.log(Game.i18n.t('log.combat.kill', { name: typeName(e.type) }), 'combat');
    Game.sfx && Game.sfx.craft();
    Game.particles.spawn({ x: e.x, y: e.y, kind: 'puff', size: 20, color: 'rgba(150,60,40,0.6)', life: 0.7 });
  }

  function damagePlayer(amount) {
    const p = player;
    if (p.state === 'sleep') { p.state = 'idle'; }
    /* 灵动闪避：每级 6% 概率完全闪避伤害 */
    const dodgeCh = skillLevel('dodge') * 0.06;
    if (dodgeCh > 0 && Math.random() < dodgeCh) {
      Game.ui.log(Game.i18n.t('log.dodge'), 'combat');
      Game.sfx && Game.sfx.pounce();
      Game.particles.spawn({ x: p.x, y: p.y, kind: 'ring', size: 26, color: 'rgba(150,220,255,0.7)', life: 0.35 });
      return;
    }
    /* 头饰减伤：树叶雨帽 -2、翡翠护身符 -6、藤甲 -7，能工巧匠每级再 -1 */
    if (p.equipped.hat === 'leaf_hat') amount -= 2 + skillLevel('craft');
    else if (p.equipped.hat === 'jade_charm') amount -= 6 + skillLevel('craft');
    else if (p.equipped.hat === 'vine_armor') amount -= 7 + skillLevel('craft');
    /* 厚实毛皮：每级减伤 12%（可多级叠加） */
    amount = Math.max(1, Math.round(amount * Math.pow(0.88, skillLevel('thick'))));
    p.stats.hp -= amount;
    p.hurtT = 0.55;
    Game.ui.log(Game.i18n.t('log.damage', { n: amount }), 'danger');
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
      /* 气味粒子为纯视觉：距玩家越远发射频率越低，压低满容触发率（Top5-6 加分项） */
      const dS = U.dist(e.x, e.y, player.x, player.y);
      e.scentT = player.sniff.active ? (dS > 700 ? 0.5 : dS > 380 ? 0.26 : 0.14) : 1.1;
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
      /* 气味粒子为纯视觉：距玩家越远发射频率越低，压低满容触发率（Top5-6 加分项） */
      const dS = U.dist(e.x, e.y, player.x, player.y);
      e.scentT = player.sniff.active ? (dS > 700 ? 0.5 : dS > 380 ? 0.26 : 0.16) : 1.3;
    }
    const p = player;
    const d = U.dist(e.x, e.y, p.x, p.y);

    /* "heard footsteps" ambient cue */
    e.footstepsCd -= dt;
    if (e.footstepsCd <= 0 && d < 340 && !e.chasing && (e.type === 'boar' || e.type === 'fox')) {
      e.footstepsCd = 8;
      Game.ui.log(Game.i18n.t('log.footsteps'), 'info');
    }

    /* detection — 潜行 + 高草统一走 sneakFactor 缩小侦测半径 */
    let detect = e.aggro * sneakFactor();
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
        Game.ui.log(Game.i18n.t('log.pred.alert', { name: typeName(e.type) }), 'danger');
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
        /* 鳄鱼无视地形：水里岸上都能追击 */
        moveEntity(e, Math.cos(e.dir) * spd * dt, Math.sin(e.dir) * spd * dt, e.type === 'croc');
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
      moveEntity(e, Math.cos(e.dir) * e.speed * spd * dt, Math.sin(e.dir) * e.speed * spd * dt, e.type === 'croc');
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
        Game.ui.log(Game.i18n.t('log.summon.end', { name: c.name }), 'info');
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
          Game.ui.log(Game.i18n.t('log.companion.warn', { name: c.name }), 'danger');
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
      Game.ui.log(Game.i18n.t('log.companion.gift', { name: c.name, gift: itemName(g) }), 'good');
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
    Game.ui.log(Game.i18n.t('log.pet', { name: c.name, n: gain }), 'good');
    Game.sfx && Game.sfx.groom();
    Game.particles.spawn({ x: c.x, y: c.y - 18, kind: 'sparkle', size: 2.6, color: 'rgba(255,160,200,0.9)', vx: 0, vy: -14, life: 0.9 });
    Game.particles.spawn({ x: c.x + U.randRange(-6, 6), y: c.y - 16, kind: 'dot', size: 3, color: 'rgba(255,140,190,0.85)', vx: U.randRange(-4, 4), vy: -16, life: 1.1, grav: -8 });
    if (first) {
      Game.ui.log(Game.i18n.t('log.pet.first', { name: c.name }), 'info');
    }
    if (!c.adopted && c.friendship >= 60) {
      Game.ui.log(Game.i18n.t('log.pet.ready', { name: c.name }), 'good');
    }
    checkPerks(c);
  }

  function feedCompanion(c) {
    const giftId = ['salmon', 'cooked_salmon', 'mouse'].find((id) => countItem(id) > 0);
    if (!giftId) {
      Game.ui.log(Game.i18n.t('log.feed.none'), 'info');
      return false;
    }
    removeItem(giftId, 1);
    const first = !c.met;
    c.met = true;
    const gain = Math.round(22 * (hasSkill('guardian') ? 1.5 : 1) * (player.equipped.collar === 'fishbone_collar' ? 1.5 : 1));
    c.friendship = Math.min(100, c.friendship + gain);
    player.stats.mood = Math.min(player.stats.moodMax, player.stats.mood + 8);
    addXp(6);
    Game.ui.log(Game.i18n.t('log.feed', { item: itemName(giftId), name: c.name, n: gain }), 'good');
    Game.sfx && Game.sfx.eat();
    Game.particles.spawn({ x: c.x, y: c.y - 16, kind: 'ring', size: 20, color: 'rgba(255,180,120,0.7)', life: 0.5 });
    if (first) {
      Game.ui.log(Game.i18n.t('log.feed.first', { name: c.name }), 'info');
    }
    if (!c.adopted && c.friendship >= 60) {
      Game.ui.log(Game.i18n.t('log.pet.ready', { name: c.name }), 'good');
    }
    checkPerks(c);
    return true;
  }

  function adoptCompanion(c) {
    if (c.adopted) return false;
    if (c.friendship < 60) {
      Game.ui.log(Game.i18n.t('log.adopt.notReady', { name: c.name }), 'info');
      return false;
    }
    c.adopted = true;
    c.met = true;
    c.follow = true;
    c.perk = Math.max(c.perk, 1);
    addXp(20);
    if (Game.state && Game.state.journey) Game.state.journey.petsAdopted++;
    Game.ui.log(Game.i18n.t('log.adopt.ok', { name: c.name }), 'good');
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
      Game.ui.log(Game.i18n.t('log.perk.warn', { name: c.name }), 'good');
      Game.sfx && Game.sfx.craft();
    }
    if (c.friendship >= 90 && c.perk < 3) {
      c.perk = 3;
      Game.ui.log(Game.i18n.t('log.perk.hunt', { name: c.name }), 'good');
      Game.sfx && Game.sfx.craft();
    }
  }

  /* ------------------------------------------- 召唤伙伴猫并肩作战 */
  function summonCompanion() {
    const p = player;
    if (p.summonCd > 0) {
      Game.ui.log(Game.i18n.t('log.summon.cd', { n: Math.ceil(p.summonCd) }), 'info');
      return false;
    }
    const adopted = companions.filter((c) => c.adopted);
    if (!adopted.length) {
      Game.ui.log(Game.i18n.t('log.summon.none'), 'info');
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
    Game.ui.log(Game.i18n.t('log.summon.ok', { name: c.name, n: boosted ? 3 : 5 }), 'good');
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
    Game.ui.log(Game.i18n.t('log.summon.strike', { name: c.name, dmg: dmg }), 'combat');
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
    const f = W.findNearest(['gate', 'berry', 'catnip', 'spring', 'cave', 'herbs', 'trashcan', 'dumpster', 'gemnode', 'cactus', 'dragonherb', 'reishi', 'vine', 'shelter'], p.x, p.y, 90);
    if (f) {
      switch (f.type) {
        case 'berry': {
          /* 直接吃浆果：恢复饱食 + 少量生命 */
          const s = p.stats;
          s.satiety = Math.min(s.satietyMax, s.satiety + 9);
          s.hp = Math.min(s.hpMax, s.hp + 2);
          f.regrowT = 25;
          addXp(2);
          Game.ui.log(Game.i18n.t('log.feature.berry'), 'good');
          Game.sfx && Game.sfx.eat();
          Game.particles.spawn({ x: p.x, y: p.y - 12, kind: 'sparkle', size: 2, color: 'rgba(255,120,130,0.9)', vx: U.randRange(-6, 6), vy: -12, life: 0.6 });
          break;
        }
        case 'catnip':
          addItem('catnip', 1);
          f.regrowT = 30;
          addXp(2);
          Game.ui.log(Game.i18n.t('log.feature.catnip'), 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'herbs':
          addItem('herbs', 1);
          f.regrowT = 30;
          addXp(2);
          Game.ui.log(Game.i18n.t('log.feature.herbs'), 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'cactus':
          addItem('cactus_fruit', 1);
          f.regrowT = 40;
          addXp(3);
          Game.ui.log(Game.i18n.t('log.feature.cactus'), 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'dragonherb':
          addItem('dragon_herb', 1);
          f.regrowT = 35;
          addXp(5);
          Game.ui.log(Game.i18n.t('log.feature.dragonherb'), 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'reishi':
          addItem('reishi', 1);
          f.regrowT = 35;
          addXp(5);
          Game.ui.log(Game.i18n.t('log.feature.reishi'), 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'vine':
          addItem('vine_strand', 1);
          f.regrowT = 40;
          addXp(3);
          Game.ui.log(Game.i18n.t('log.feature.vine'), 'good');
          Game.sfx && Game.sfx.pick();
          break;
        case 'shelter':
          /* 避难所：蜷进去睡到天亮（城市暗巷 / 森林树洞） */
          Game.ui.log(Game.i18n.t('log.shelter.sleep'), 'info');
          Game.sfx && Game.sfx.cave();
          Game.ui.fadeTo(1, () => {
            Game.state.sec = 6.5 * (Game.state.DAY_LEN / 24);
            Game.state.day++;
            const s = p.stats;
            s.hp = Math.min(s.hpMax, s.hp + 40);
            s.stamina = s.staminaMax;
            s.mood = Math.min(s.moodMax, s.mood + 20);
            s.wetness = 0;
            Game.ui.log(Game.i18n.t('log.shelter.wake'), 'good');
            Game.ui.fadeTo(0, null);
          });
          p.interactCd = 1.5;
          break;
        case 'spring': {
          p.stats.hydration = Math.min(p.stats.hydrationMax, p.stats.hydration + 38);
          p.interactCd = 1.2;
          Game.ui.log(Game.i18n.t('log.feature.spring'), 'good');
          Game.sfx && Game.sfx.drink();
          Game.particles.spawn({ x: p.x, y: p.y - 6, kind: 'ring', size: 16, color: 'rgba(120,220,255,0.7)', life: 0.4 });
          break;
        }
        case 'cave': {
          enterCave();
          break;
        }
        case 'gemnode': {
          /* 采集宝石：60 秒后再生 */
          const gem = Math.random() < 0.4 ? 'gem_ruby' : Math.random() < 0.55 ? 'gem_sapphire' : 'gem_jade';
          addItem(gem, 1);
          f.regrowT = 60;
          addXp(4);
          Game.ui.log(Game.i18n.t('log.feature.gem', { name: itemName(gem) }), 'good');
          Game.sfx && Game.sfx.pick();
          Game.particles.spawn({ x: p.x, y: p.y - 10, kind: 'sparkle', size: 3, color: 'rgba(255,255,180,0.9)', vx: U.randRange(-6, 6), vy: -14, life: 0.7 });
          p.interactCd = 0.8;
          break;
        }
        case 'gate': {
          /* 前往新区域 */
          Game.transitionZone && Game.transitionZone(f);
          p.interactCd = 1.5;
          break;
        }
        case 'trashcan':
        case 'dumpster': {
          /* 翻垃圾桶：有机会翻出材料 */
          f.regrowT = 30;
          const big = f.type === 'dumpster';
          if (big || Math.random() < 0.65) {
            const pool = big ? ['leaves', 'vines', 'sinew', 'herbs', 'fishbone', 'berry'] : ['leaves', 'vines', 'sinew', 'herbs'];
            const got = U.pick(pool);
            addItem(got, big ? U.randInt(1, 2) : 1);
            addXp(2);
            Game.ui.log(Game.i18n.t('log.feature.trash', { name: itemName(got) }), 'good');
          } else {
            Game.ui.log(Game.i18n.t('log.feature.trashEmpty'), 'info');
          }
          Game.sfx && Game.sfx.pick();
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
        Game.ui.log(Game.i18n.t('log.fish.run'), 'catch');
        Game.sfx && Game.sfx.catch();
      } else {
        /* 河边不能喝水——口渴只能找泉水（按 E 跟青色气味） */
        Game.ui.log(Game.i18n.t('log.fish.none'), 'info');
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
      Game.ui.log(Game.i18n.t('log.feature.forest'), 'info');
      Game.sfx && Game.sfx.pick();
      p.interactCd = 1.0;
      return;
    }

    Game.ui.log(Game.i18n.t('log.feature.nothing'), 'info');
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
    Game.ui.log(Game.i18n.t('log.cave.enter'), 'info');
    Game.sfx && Game.sfx.cave();
    Game.ui.fadeTo(0.9, () => { Game.ui.fadeTo(0, null); });
  }

  function exitCave() {
    const p = player;
    p.inCave = false;
    Game.state.cave = false;
    p.x = p.outside.x; p.y = p.outside.y;
    Game.ui.log(Game.i18n.t('log.cave.exit'), 'info');
    Game.ui.fadeTo(0.9, () => { Game.ui.fadeTo(0, null); });
  }

  /* ------------------------------------------------------------ main tick */
  function update(dt, input) {
    checkBossRespawn();   /* Boss 被击败后到时间自动复活 */
    updatePlayer(dt, input);
    for (const e of list) {
      if (!e.alive) continue;
      if (e.kind === 'prey') updatePrey(e, dt);
      else if (e.kind === 'predator') updatePredator(e, dt);
      else if (e.kind === 'straydog') updateStrayDog(e, dt);
      else if (e.kind === 'companion') updateCompanion(e, dt);
    }
    /* prune dead */
    for (let i = list.length - 1; i >= 0; i--) {
      const e = list[i];
      if ((e.kind === 'prey' || e.kind === 'predator' || e.kind === 'straydog') && !e.alive) list.splice(i, 1);
    }
    /* 场景内缓慢补刷怪物：保证始终有敌人可打、有经验可刷 */
    respawnT -= dt;
    if (respawnT <= 0) {
      respawnT = 8;
      respawnHostiles();
    }
    /* Boss + 弹弓弹道 */
    updateBoss(dt);
    updateProjectiles(dt);
  }

  /* 补刷：普通捕食者 + 流浪狗，密度低于目标的 70% 时在玩家周围补一只 */
  function respawnHostiles() {
    const p = player;
    if (!p) return;
    const alivePred = list.filter((e) => e.kind === 'predator' && e.alive).length;
    const aliveDogs = list.filter((e) => e.kind === 'straydog' && e.alive).length;
    const cfg = ZONE_SPAWN[Game.world.zone] || ZONE_SPAWN[0];
    const dm = densityMul();
    if (alivePred < Math.round(predTarget * 0.7) && predTarget > 0) {
      const types = Object.keys(cfg.pred || {});
      if (types.length) {
        const type = U.pick(types);
        for (let tries = 0; tries < 140; tries++) {
          const tx = U.randInt(4, W.W - 4), ty = U.randInt(4, W.H - 4);
          if (!canSpawnPred(type, tx, ty)) continue;
          const wx = (tx + 0.5) * W.TILE, wy = (ty + 0.5) * W.TILE;
          const d2 = U.dist2(wx, wy, p.x, p.y);
          if (d2 < 380 * 380) continue;     /* 别刷在玩家脸上 */
          if (d2 > 1350 * 1350) continue;   /* 别刷到看不见的地方 */
          spawnPredator(type, tx, ty);
          break;
        }
      }
    }
    if (aliveDogs < Math.round(strayTarget * 0.7) && strayTarget > 0) {
      for (let tries = 0; tries < 80; tries++) {
        const tx = U.randInt(4, W.W - 4), ty = U.randInt(4, W.H - 4);
        if (!W.canWalk(tx, ty)) continue;
        const wx = (tx + 0.5) * W.TILE, wy = (ty + 0.5) * W.TILE;
        const d2 = U.dist2(wx, wy, p.x, p.y);
        if (d2 < 380 * 380) continue;
        if (d2 > 1350 * 1350) continue;
        spawnStrayDog(tx, ty);
        break;
      }
    }
  }

  Game.entities = {
    list, companions, ITEMS, RECIPES, PREY, PRED, BOSS_DEFS, itemDef,
    get player() { return player; },
    get boss() { return boss; },
    get bossProjectiles() { return bossProjectiles; },
    init, update, updateVitals, interact, useItem, addItem, removeItem, countItem,
    spawnCompanion,
    petCompanion, feedCompanion, adoptCompanion,
    summonCompanion, hitStrayDog,
    damagePlayer, enterCave, exitCave,
    xpToLevel, addXp, learnSkill, hasSkill, skillLevel, grantSkillBook, grantSkillPoint, hitBoss, recalcMaxStats,
    pounceDmg, critChance, snapToWalkable, staminaRegenMult, craftMult,
    sneakFactor,
    difficultyK, scaledHp, scaledDmg, scaledXp, densityMul,
    SKILL_NAMES, SKILL_DEFS,
    /* i18n 辅助函数：运行时翻译物品/技能/Boss/敌人名，供本模块与其他模块共用 */
    itemName, itemDesc, skillName, skillDesc, bossName, typeName, i18nFallback,
  };
})();
