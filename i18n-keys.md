# i18n 字典 Key 清单（key → 中文原文）

> 8 语言支持（zh/en/fr/es/de/ja/ko/ru）：生成自 `js/lang/zh.js`（中文为基准语言），供翻译工程师填充 en/fr/es/de/ja/ko/ru 使用。
> 插值占位 `{name}` `{n}` `{dmg}` 等必须保留在译文中的相同位置。

共 496 条 key。

## 命名空间约定
| 前缀 | 用途 |
|---|---|
| ui. | HUD / 面板 / 按钮 / 弹窗 |
| log. | 游戏日志（行动日志消息） |
| item. | 物品 name / desc |
| recipe. | 合成配方 name / desc |
| skill. | 技能 name / desc |
| enemy. | 敌人 / 猎物名 |
| boss. | Boss 名（按区域 0-3） |
| zone. | 区域名（0-3） |
| challenge. | 挑战横幅 title / desc |
| feature. | 互动提示（F 提示 / 避难所 / 信标） |
| guide. | 生存指南 6 板块 |
| misc. | 杂项（标题 / 罗盘北 / 洞穴 / 泉水） |


## ui.

| key | 中文 | 备注 |
|---|---|---|
| `ui.hud.time` | {icon} {time} · 第 {day} 天 | 含插值 {icon,time,day} |
| `ui.hud.weather.clear` | ☀️ 晴朗 |  |
| `ui.hud.weather.rain` | 🌧️ 下雨 |  |
| `ui.hud.weather.mist` | 🌫️ 薄雾 |  |
| `ui.hud.zone` | ⛩ {name} | 含插值 {name} |
| `ui.hud.compass` | 本能 |  |
| `ui.hud.xp` | 经验 |  |
| `ui.hud.level` | Lv {n} | 含插值 {n} |
| `ui.hud.summon.none` | 📣 无伙伴猫 |  |
| `ui.hud.summon.ready` | 📣 就绪(R) |  |
| `ui.hud.summon.cd` | 📣 {n}s | 含插值 {n} |
| `ui.hud.bossDefault` | 👹 Boss |  |
| `ui.hud.boss` | 👹 {name} | 含插值 {name} |
| `ui.meter.hp` | 生命 |  |
| `ui.meter.satiety` | 饱食度 |  |
| `ui.meter.hydration` | 水分 |  |
| `ui.meter.stamina` | 体力 |  |
| `ui.meter.mood` | 心情 |  |
| `ui.meter.wetness` | 毛发湿润度 |  |
| `ui.btn.growth` | 成长与技能 |  |
| `ui.btn.guide` | 生存指南 (G) |  |
| `ui.btn.inv` | 背包 (I) |  |
| `ui.btn.friends` | 猫朋友 (B) |  |
| `ui.btn.sound` | 开关音效 |  |
| `ui.btn.reset` | 开始新游戏 |  |
| `ui.btn.lang` | 🌐 {lang} | 含插值 {lang} |
| `ui.hint` | <b class="text-white">WASD</b> 移动 · <b class="text-white">Shift</b> 潜行 · <b class="text-white">空格</b> 扑击 · <b class="text-white">E</b> 嗅探 · <b class="text-white">Q</b> 梳理 · <b class="text-white">F</b> 互动 |  |
| `ui.touch.pounce` | 扑击 |  |
| `ui.touch.sniff` | 嗅探 |  |
| `ui.touch.groom` | 梳理 |  |
| `ui.touch.interact` | 互动 |  |
| `ui.touch.sneak` | 🦎 潜行 |  |
| `ui.touch.sneakTitle` | 切换潜行 |  |
| `ui.touch.summon` | 📣 召唤伙伴 |  |
| `ui.touch.summonTitle` | 召唤伙伴猫（R） |  |
| `ui.catmenu.title` | 猫的互动 |  |
| `ui.catmenu.pet` | 🐾 抚摸 |  |
| `ui.catmenu.feed` | 🍖 喂食 |  |
| `ui.catmenu.adopt` | 🤝 收养 |  |
| `ui.catmenu.adopted` | 🤝 已收养 |  |
| `ui.modal.inv.title` | 🎒 背包 & 合成 |  |
| `ui.modal.friends.title` | 🐈 猫朋友 |  |
| `ui.modal.guide.title` | 📖 生存指南 |  |
| `ui.modal.growth.title` | 📈 成长与技能 |  |
| `ui.tab.inv` | 行囊 |  |
| `ui.tab.craft` | 合成 |  |
| `ui.inv.empty` | 行囊空空——去采集、钓鱼、捕猎填满它吧。 |  |
| `ui.inv.use` | 使用 |  |
| `ui.inv.equip` | 装备 |  |
| `ui.inv.unequip` | 卸下 |  |
| `ui.inv.read` | 📖 阅读 |  |
| `ui.inv.equipped` | ● 已装备 |  |
| `ui.craft.locked` | 🔒 未解锁 |  |
| `ui.craft.needSkill` | 需要技能：{skill} | 含插值 {skill} |
| `ui.craft.dayOnly` | 🌙 需要白天 |  |
| `ui.craft.craft` | 合成 |  |
| `ui.confirm.reset` | 确定要开始新游戏吗？当前存档将被清空。 |  |
| `ui.confirm.resetTitle` | 🆕 开始新游戏 |  |
| `ui.confirm.resetDesc` | 将清空当前所有进度（等级、技能、物品、伙伴、区域进度），并生成一个全新的世界。此操作不可撤销！ |  |
| `ui.confirm.ok` | 🎮 新游戏 |  |
| `ui.confirm.cancel` | 取消 |  |
| `ui.friends.intro` | 走近流浪猫按 <b class="text-slate-200">F</b> 抚摸它——猫头顶会弹出操作菜单，可以 <b class="text-slate-200">喂食</b>（三文鱼/老鼠）并 <b class="text-slate-200">收养</b>（亲密度达到 <b class="text-pink-300">60 ♥</b>）。粉色气味标记猫的位置。 |  |
| `ui.friends.yourPets` | 🐾 你的宠物（{n}） | 含插值 {n} |
| `ui.friends.noPets` | 还没有宠物——把流浪猫喂到 60 ♥，然后收养它！ |  |
| `ui.friends.strays` | 🐈 流浪猫（{n}） | 含插值 {n} |
| `ui.friends.unknown` | 还有 {n} 只流浪猫在荒野中游荡——跟着粉色气味找它们。 | 含插值 {n} |
| `ui.friends.none` | 附近还没有猫。按 E 嗅探，跟着粉色气味流寻找。 |  |
| `ui.friends.status.adopted` | 好友 ❤️ |  |
| `ui.friends.status.adoptable` | 可收养——走近按 F！ |  |
| `ui.friends.status.approaching` | {n}/60 ♥ 可收养 | 含插值 {n} |
| `ui.friends.status.shy` | 害羞——先抚摸 |  |
| `ui.friends.friendship.best` | ❤️ 挚友 |  |
| `ui.friends.friendship.percent` | ♥ {n}% | 含插值 {n} |
| `ui.friends.friendship.shy` | — 害羞 — |  |
| `ui.perk.mood` | 心情光环 |  |
| `ui.perk.warn` | 危险预警 |  |
| `ui.perk.hunt` | 狩猎协助 |  |
| `ui.branch.hunt` | 🎯 狩猎 |  |
| `ui.branch.survive` | 🛡️ 生存 |  |
| `ui.branch.bond` | 🐈 羁绊 |  |
| `ui.branch.dodge` | 💨 闪避 |  |
| `ui.branch.craft` | 🔨 制作 |  |
| `ui.skill.maxed` | 满级 |  |
| `ui.skill.upgrade` | 升级 |  |
| `ui.skill.learn` | 学习 |  |
| `ui.skill.lv` | Lv.{lv}/{max} | 含插值 {lv,max} |
| `ui.growth.skillPoints` | 技能点：{n} | 含插值 {n} |
| `ui.growth.xp` | {xp} / {need} 经验 | 含插值 {xp,need} |
| `ui.growth.bonus` | 等级加成：最大生命 +{hp} · 最大体力 +{st} · 最大心情 +{mood} · 体力回复 +{regen}% | 含插值 {hp,st,mood,regen} |
| `ui.growth.crit` | 心情暴击率：<b class="text-amber-300">{pct}%</b>（心情越好暴击越高，双倍伤害） | 含插值 {pct}（含 HTML，译文须保留 `<b>` 标签） |
| `ui.growth.notes` | 技能点只在升级时获得——每升 1 级 +1 点，请谨慎规划加点路线；猎手本能 / 飞扑袭杀 / 厚实毛皮 / 活力充盈 / 灵动闪避 / 能工巧匠可重复加点。 |  |
| `ui.growth.skillTree` | 📖 技能树（已投入 {n} 点） | 含插值 {n} |
| `ui.growth.journey` | 🌱 成长轨迹 |  |
| `ui.journey.days` | 存活天数 |  |
| `ui.journey.prey` | 捕猎数量 |  |
| `ui.journey.predators` | 击杀捕食者 |  |
| `ui.journey.fish` | 钓鱼数量 |  |
| `ui.journey.pets` | 收养宠物 |  |
| `ui.journey.challenges` | 挑战胜利 |  |
| `ui.journey.xp` | 累计经验 |  |

## zone.

| key | 中文 | 备注 |
|---|---|---|
| `zone.0` | 荒野草原 |  |
| `zone.1` | 城市小区 |  |
| `zone.2` | 干燥荒野 |  |
| `zone.3` | 幽暗森林 |  |

## boss.

| key | 中文 | 备注 |
|---|---|---|
| `boss.0` | 巨野猪 |  |
| `boss.1` | 弹弓顽童 |  |
| `boss.2` | 巨狼 |  |
| `boss.3` | 大眼镜蛇 |  |

## enemy.

| key | 中文 | 备注 |
|---|---|---|
| `enemy.boar` | 野猪 |  |
| `enemy.fox` | 狐狸 |  |
| `enemy.viper` | 毒蛇 |  |
| `enemy.monkey` | 猴子 |  |
| `enemy.croc` | 鳄鱼 |  |
| `enemy.mouse` | 田鼠 |  |
| `enemy.grasshopper` | 蚱蜢 |  |
| `enemy.salmon` | 河鲑 |  |
| `enemy.straydog` | 流浪狗 |  |
| `enemy.rival` | 对手猫 |  |
| `enemy.dog` | 野狗 |  |
| `enemy.wolf` | 狼 |  |

## item.

| key | 中文 | 备注 |
|---|---|---|
| `item.berry.name` | 野莓 |  |
| `item.berry.desc` | 清甜的森林野莓，吃下回一点血。 |  |
| `item.mouse.name` | 田鼠 |  |
| `item.mouse.desc` | 一只肥美的田鼠，补充体力。 |  |
| `item.grasshopper.name` | 蚱蜢 |  |
| `item.grasshopper.desc` | 嘎嘣脆的小跳虫。 |  |
| `item.salmon.name` | 河鲑 |  |
| `item.salmon.desc` | 刚出水的河鲑，营养丰富。 |  |
| `item.cooked_salmon.name` | 烤鲑鱼 |  |
| `item.cooked_salmon.desc` | 烟熏味美，鲜嫩多汁，大补。 |  |
| `item.catnip.name` | 新鲜猫薄荷 |  |
| `item.catnip.desc` | 立刻提神醒脑。 |  |
| `item.dried_catnip.name` | 干猫薄荷 |  |
| `item.dried_catnip.desc` | 效力加倍！ |  |
| `item.herbs.name` | 草药 |  |
| `item.herbs.desc` | 舒缓的野地草药。 |  |
| `item.leaves.name` | 树叶 |  |
| `item.leaves.desc` | 宽大的绿叶。 |  |
| `item.vines.name` | 藤蔓 |  |
| `item.vines.desc` | 结实柔韧的藤蔓。 |  |
| `item.fishbone.name` | 鱼骨 |  |
| `item.fishbone.desc` | 干净洁白的鱼骨。 |  |
| `item.sinew.name` | 筋腱 |  |
| `item.sinew.desc` | 强韧的动物筋腱。 |  |
| `item.fat.name` | 野猪油 |  |
| `item.fat.desc` | 肥厚油腻的脂肪。 |  |
| `item.herb_salve.name` | 草药膏 |  |
| `item.herb_salve.desc` | 敷在伤口上恢复 32 点生命。 |  |
| `item.leaf_hat.name` | 树叶雨帽 |  |
| `item.leaf_hat.desc` | 雨天防湿，且每次受伤 -2 点（防御）。 |  |
| `item.fishbone_collar.name` | 鱼骨项圈 |  |
| `item.fishbone_collar.desc` | 攻击 +3（巧匠每级再 +1），流浪猫更快信任你。 |  |
| `item.cat_tooth_necklace.name` | 猫牙项链 |  |
| `item.cat_tooth_necklace.desc` | 攻击 +20%（巧匠每级再 +4%）：对敌人造成更高伤害。 |  |
| `item.catnip_tea.name` | 猫薄荷茶 |  |
| `item.catnip_tea.desc` | 热茶下肚，体力瞬间恢复 25 点。 |  |
| `item.energy_potion.name` | 活力药剂 |  |
| `item.energy_potion.desc` | 炼金精华，瞬间恢复 55 点体力。 |  |
| `item.gem_ruby.name` | 红宝石 |  |
| `item.gem_ruby.desc` | 火山熔岩中凝出的炽红宝石，珍贵材料。 |  |
| `item.gem_sapphire.name` | 蓝宝石 |  |
| `item.gem_sapphire.desc` | 幽暗水域深处的深邃蓝宝石，珍贵材料。 |  |
| `item.gem_jade.name` | 翡翠 |  |
| `item.gem_jade.desc` | 古林根脉孕育的翠绿美玉，珍贵材料。 |  |
| `item.flame_ruby_pendant.name` | 火焰红宝石吊坠 |  |
| `item.flame_ruby_pendant.desc` | 攻击 +40%（巧匠每级再 +8%）——比猫牙项链更强。 |  |
| `item.sapphire_star.name` | 蓝宝石星坠 |  |
| `item.sapphire_star.desc` | 攻击 +25% 且暴击率 +12%。 |  |
| `item.jade_charm.name` | 翡翠护身符 |  |
| `item.jade_charm.desc` | 每次受伤 -6（巧匠每级再 -1）——坚硬如玉。 |  |
| `item.cactus_fruit.name` | 仙人掌果 |  |
| `item.cactus_fruit.desc` | 荒漠里的绿洲果实：+30 水分。 |  |
| `item.dragon_herb.name` | 龙血草 |  |
| `item.dragon_herb.desc` | 火山岩缝中长出的殷红草药，直接吃回 18 生命。 |  |
| `item.reishi.name` | 灵芝 |  |
| `item.reishi.desc` | 古树上的灵药：回 12 生命、+10 心情。 |  |
| `item.vine_strand.name` | 藤条 |  |
| `item.vine_strand.desc` | 幽暗森林的坚韧藤条，编制护甲的材料。 |  |
| `item.vine_armor.name` | 藤甲 |  |
| `item.vine_armor.desc` | 每次受伤 -7（巧匠每级再 -1），雨中几乎不湿身。 |  |
| `item.stone_claw.name` | 石爪 |  |
| `item.stone_claw.desc` | 攻击 +8（巧匠每级再 +2）——爪尖镶满宝石碎屑。 |  |
| `item.dragon_potion.name` | 龙血药剂 |  |
| `item.dragon_potion.desc` | 沸腾的龙血精华，瞬间恢复 60 点生命。 |  |
| `item.book_hunter.name` | 猎手本能 |  |
| `item.book_hunter.desc` | 扑击伤害 +15%，捕捉范围更大。 |  |
| `item.book_swift.name` | 疾风快爪 |  |
| `item.book_swift.desc` | 移动速度 +10%，体力回复 +25%。 |  |
| `item.book_thick.name` | 厚实毛皮 |  |
| `item.book_thick.desc` | 受到的伤害 -25%。 |  |
| `item.book_keen.name` | 敏锐嗅觉 |  |
| `item.book_keen.desc` | 嗅探范围 +40%，气味更浓密。 |  |
| `item.book_brave.name` | 无畏之心 |  |
| `item.book_brave.desc` | 心情上限 +25%，挑战奖励 +50%。 |  |
| `item.book_angler.name` | 渔夫之尾 |  |
| `item.book_angler.desc` | 钓鱼必定成功。 |  |
| `item.book_guardian.name` | 守护之力 |  |
| `item.book_guardian.desc` | 友情获取 +50%，狩猎协助 +4。 |  |
| `item.book_camo.name` | 树叶伪装 |  |
| `item.book_camo.desc` | 高草丛隐匿效果翻倍，潜行更省体力。 |  |

## recipe.

| key | 中文 | 备注 |
|---|---|---|
| `recipe.leaf_hat.name` | 树叶雨帽 |  |
| `recipe.leaf_hat.desc` | 雨天防湿，且每次受伤 -2 点（防御）。 |  |
| `recipe.fishbone_collar.name` | 鱼骨项圈 |  |
| `recipe.fishbone_collar.desc` | 攻击 +3，流浪猫更快信任你。 |  |
| `recipe.cat_tooth_necklace.name` | 猫牙项链 |  |
| `recipe.cat_tooth_necklace.desc` | 攻击 +20%，对敌人造成更高伤害。 |  |
| `recipe.dried_catnip.name` | 干猫薄荷 |  |
| `recipe.dried_catnip.desc` | 强力提神 — 需要白天晾晒。 |  |
| `recipe.herb_salve.name` | 草药膏 |  |
| `recipe.herb_salve.desc` | 敷在伤口上恢复 32 点生命。 |  |
| `recipe.catnip_tea.name` | 猫薄荷茶 |  |
| `recipe.catnip_tea.desc` | 体力 +25，瞬间见效。 |  |
| `recipe.energy_potion.name` | 活力药剂 |  |
| `recipe.energy_potion.desc` | 体力 +55。需要【草药炼金】技能解锁。 |  |
| `recipe.flame_ruby_pendant.name` | 火焰红宝石吊坠 |  |
| `recipe.flame_ruby_pendant.desc` | 攻击 +40%——顶级饰品。 |  |
| `recipe.sapphire_star.name` | 蓝宝石星坠 |  |
| `recipe.sapphire_star.desc` | 攻击 +25%、暴击 +12%。 |  |
| `recipe.jade_charm.name` | 翡翠护身符 |  |
| `recipe.jade_charm.desc` | 每次受伤 -6。 |  |
| `recipe.vine_armor.name` | 藤甲 |  |
| `recipe.vine_armor.desc` | 防御 -7、雨中几乎不湿身。 |  |
| `recipe.stone_claw.name` | 石爪 |  |
| `recipe.stone_claw.desc` | 攻击 +8——显著提升伤害。 |  |
| `recipe.dragon_potion.name` | 龙血药剂 |  |
| `recipe.dragon_potion.desc` | 瞬间恢复 60 生命。需要【草药炼金】。 |  |

## skill.

| key | 中文 | 备注 |
|---|---|---|
| `skill.hunter.name` | 猎手本能 |  |
| `skill.hunter.desc` | 每级：扑击伤害 +15%、捕捉范围更大 |  |
| `skill.leap.name` | 飞扑袭杀 |  |
| `skill.leap.desc` | 每级：扑击距离 +20%（满级 +60%） |  |
| `skill.keen.name` | 敏锐嗅觉 |  |
| `skill.keen.desc` | 嗅探范围 +40%，气味更浓密 |  |
| `skill.angler.name` | 渔夫之尾 |  |
| `skill.angler.desc` | 钓鱼必定成功 |  |
| `skill.swift.name` | 疾风快爪 |  |
| `skill.swift.desc` | 每级：移动速度 +10%（满级 +30%）、体力回复 +8% |  |
| `skill.thick.name` | 厚实毛皮 |  |
| `skill.thick.desc` | 每级：受到的伤害 -12%（满级 -47%） |  |
| `skill.camo.name` | 树叶伪装 |  |
| `skill.camo.desc` | 高草丛隐匿效果翻倍，潜行更省体力 |  |
| `skill.vitality.name` | 活力充盈 |  |
| `skill.vitality.desc` | 每级：体力恢复速度 +30%（满级 +150%） |  |
| `skill.guardian.name` | 守护之力 |  |
| `skill.guardian.desc` | 友情获取 +50%，狩猎协助 +4 |  |
| `skill.brave.name` | 无畏之心 |  |
| `skill.brave.desc` | 心情上限 +25%，挑战奖励 +50% |  |
| `skill.summon.name` | 召唤强化 |  |
| `skill.summon.desc` | 召唤时间 25→40 秒，冷却 5→3 分钟 |  |
| `skill.dodge.name` | 灵动闪避 |  |
| `skill.dodge.desc` | 每级：6% 概率完全闪避伤害（满级 30%） |  |
| `skill.agile.name` | 身轻如燕 |  |
| `skill.agile.desc` | 扑击消耗体力 -40%，冷却 -0.2 秒 |  |
| `skill.craft.name` | 能工巧匠 |  |
| `skill.craft.desc` | 每级：制造物品效果 +20%，装备加成也提升 |  |
| `skill.alchemist.name` | 草药炼金 |  |
| `skill.alchemist.desc` | 解锁活力药剂等强力配方 |  |

## challenge.

| key | 中文 | 备注 |
|---|---|---|
| `challenge.fallback` | ⚠️ 挑战 |  |
| `challenge.rival.title` | 🐈‍⬛ 领地入侵 |  |
| `challenge.rival.desc` | 对手猫正在抢占你的地盘——扑击赶跑它们！ |  |
| `challenge.dog.title` | 🐕 恶犬追击！ |  |
| `challenge.dog.desc` | 快跑！躲进高草丛，或逃进洞穴！ |  |
| `challenge.storm.title` | ⛈️ 雷雨风暴 |  |
| `challenge.storm.desc` | 快找地方躲避闪电！ |  |
| `challenge.salmon.title` | 🐟 三文鱼洄游 |  |
| `challenge.salmon.desc` | 在河边钓鱼——必定收获！ |  |
| `challenge.viper.title` | 🐍 毒蛇群袭 |  |
| `challenge.viper.desc` | 击退毒蛇群！ |  |
| `challenge.wolf.title` | 🐺 狼群来袭！ |  |
| `challenge.wolf.desc` | 狼群在猎杀你——反击或逃进洞穴！ |  |
| `challenge.stampede.title` | 🐗 野猪狂奔！ |  |
| `challenge.stampede.desc` | 躲开狂奔的野猪！ |  |
| `challenge.eagle.title` | 🦅 鹰击俯冲！ |  |
| `challenge.eagle.desc` | 注意地上的影子——躲开俯冲的鹰！ |  |
| `challenge.fog.title` | 🌫️ 浓雾迷路！ |  |
| `challenge.fog.desc` | 在时间耗尽前找到信标（洞穴或泉水）！ |  |

## feature.

| key | 中文 | 备注 |
|---|---|---|
| `feature.gate` | ⛩ {name} | 含插值 {name} |
| `feature.prompt.gate` | 前往{name} | 含插值 {name} |
| `feature.prompt.berry` | 吃浆果 |  |
| `feature.prompt.pickup` | 拾取 |  |
| `feature.prompt.spring` | 喝水 |  |
| `feature.prompt.gem` | 采集宝石 |  |
| `feature.prompt.harvest` | 采摘 |  |
| `feature.prompt.vine` | 割藤条 |  |
| `feature.prompt.sleep` | 睡觉 |  |
| `feature.prompt.trash` | 翻垃圾 |  |
| `feature.prompt.enter` | 进入 |  |
| `feature.prompt.fish` | 捞鱼 |  |
| `feature.prompt.pet` | 抚摸 |  |
| `feature.prompt.workbench` | F — 制作物品 |  |
| `feature.prompt.fire` | F — 做饭 / 烘干 |  |
| `feature.prompt.bed` | F — 睡到天亮 |  |
| `feature.prompt.exit` | F — 离开洞穴 |  |
| `feature.shelter.hollow` | 🛏 树洞避难所 |  |
| `feature.shelter.alley` | 🛏 暗巷避难所 |  |
| `feature.beacon` | 📍 {name} 信标 | 含插值 {name} |

## guide.

| key | 中文 | 备注 |
|---|---|---|
| `guide.controls.title` | 🎮 操作 |  |
| `guide.controls.move` | <b class="text-slate-200">WASD / 方向键</b> — 移动 |  |
| `guide.controls.sneak` | <b class="text-slate-200">Shift</b> — 潜行（藏进高草丛） |  |
| `guide.controls.pounce` | <b class="text-slate-200">空格</b> — 扑击 / 攻击 |  |
| `guide.controls.sniff` | <b class="text-slate-200">E</b> — 嗅探（气味流） |  |
| `guide.controls.groom` | <b class="text-slate-200">Q</b> — 梳理毛发（+心情） |  |
| `guide.controls.interact` | <b class="text-slate-200">F</b> — 互动 / 抚摸 / 钓鱼 |  |
| `guide.controls.summon` | <b class="text-slate-200">R</b> — 召唤伙伴猫作战（5 分钟冷却） |  |
| `guide.controls.panels` | <b class="text-slate-200">I / B / G</b> — 打开面板 |  |
| `guide.controls.close` | <b class="text-slate-200">Esc</b> — 关闭面板 |  |
| `guide.smell.title` | 👃 嗅觉本能 |  |
| `guide.smell.p1` | 按下 <b class="text-slate-200">E</b>，彩色气味流会随风告诉你周围有什么： |  |
| `guide.smell.cyan` | <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">青色</b> — 干净的水源泉水 |  |
| `guide.smell.gold` | <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">金色</b> — 猎物：老鼠、三文鱼、蚱蜢 |  |
| `guide.smell.pink` | <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">粉色</b> — 友好的流浪猫 |  |
| `guide.smell.red` | <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">红色</b> — 捕食者：野猪、毒蛇、狐狸 |  |
| `guide.smell.orange` | <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">橙色</b> — 入侵领地的对手猫 |  |
| `guide.smell.p2` | 顶部<b class="text-slate-200">「本能」罗盘</b>始终指向最近的各种气味来源。 |  |
| `guide.tips.title` | 🐾 生存小贴士 |  |
| `guide.tips.1` | 在<b class="text-slate-200">泉水</b>（青色）喝水，在河岸按 <b class="text-slate-200">F</b> 钓鱼。 |  |
| `guide.tips.2` | 下雨会打湿毛发——<b class="text-slate-200">湿毛</b>会拖慢体力回复。合成<b class="text-slate-200">树叶雨帽</b>或在洞穴火堆旁烘干。 |  |
| `guide.tips.3` | 潜行穿过<b class="text-slate-200">高草丛</b>避开捕食者，再扑击致命一击。 |  |
| `guide.tips.4` | 洞穴是安全庇护所：在床上睡到天亮恢复生命，在火堆旁烤三文鱼。 |  |
| `guide.tips.5` | 按 <b class="text-slate-200">Q</b> 梳理毛发提升心情；心情过低会持续削弱你。 |  |
| `guide.tips.6` | 交好流浪猫（粉色）——亲密度高了它们会预警危险、并肩作战。 |  |
| `guide.tips.7` | 猫薄荷是很强的提神草药……但会引发"疯狂跑酷"。慎用。 |  |
| `guide.recipes.title` | 🔨 合成配方 |  |
| `guide.recipes.1` | <b class="text-slate-200">树叶雨帽</b> — 树叶 ×3 + 藤蔓 ×2（防御：受伤 -2） |  |
| `guide.recipes.2` | <b class="text-slate-200">鱼骨项圈</b> — 鱼骨 ×3 + 筋腱 ×1（攻击 +3，友情获取 +50%） |  |
| `guide.recipes.3` | <b class="text-slate-200">猫牙项链</b> — 鱼骨 ×4 + 筋腱 ×2（攻击 +20%） |  |
| `guide.recipes.4` | <b class="text-slate-200">干猫薄荷</b> — 猫薄荷 ×2（需要白天） |  |
| `guide.recipes.5` | <b class="text-slate-200">草药膏</b> — 草药 ×3 + 野猪油 ×1 |  |
| `guide.recipes.6` | <b class="text-slate-200">猫薄荷茶</b> — 猫薄荷 ×1 + 草药 ×1（体力 +25，瞬间恢复） |  |
| `guide.recipes.7` | <b class="text-slate-200">活力药剂</b> — 猫薄荷 ×2 + 草药 ×2 + 野猪油 ×1（体力 +55，需【草药炼金】技能） |  |
| `guide.recipes.8` | <b class="text-slate-200">火焰红宝石吊坠</b> — 红宝石 ×1 + 鱼骨 ×2 + 筋腱 ×1（攻击 +40%） |  |
| `guide.recipes.9` | <b class="text-slate-200">蓝宝石星坠</b> — 蓝宝石 ×1 + 鱼骨 ×2 + 筋腱 ×1（攻击 +25%、暴击 +12%） |  |
| `guide.recipes.10` | <b class="text-slate-200">翡翠护身符</b> — 翡翠 ×1 + 树叶 ×2 + 藤蔓 ×2（每次受伤 -6） |  |
| `guide.recipes.11` | <b class="text-slate-200">藤甲</b> — 藤条 ×3 + 树叶 ×2 + 藤蔓 ×2（受伤 -7、雨中几乎不湿身） |  |
| `guide.recipes.12` | <b class="text-slate-200">石爪</b> — 红宝石 ×1 + 筋腱 ×2 + 鱼骨 ×2（攻击 +8，显著提升伤害） |  |
| `guide.recipes.13` | <b class="text-slate-200">龙血药剂</b> — 龙血草 ×2 + 草药 ×1 + 野猪油 ×1（回 60 生命，需【草药炼金】） |  |
| `guide.growth.title` | 📈 成长与技能 |  |
| `guide.growth.1` | 每个行为都会获得<b class="text-slate-200">经验</b>——捕猎、钓鱼、采集、宠物、挑战、击败 Boss。每升 1 级<b class="text-emerald-300">永久</b>增加最大生命 +10、最大体力 +6、最大心情 +6，体力恢复速度也随等级加快。 |  |
| `guide.growth.2` | 升级、挑战胜利、击败 Boss 都会获得<b class="text-slate-200">经验</b>；但<b class="text-amber-300">技能点只在升级时获得</b>（每级 +1），务必谨慎规划。在 📈 成长面板里自由点亮<b class="text-slate-200">五大分支</b>：🎯狩猎、🛡️生存、🐈羁绊、💨闪避、🔨制作。 |  |
| `guide.growth.3` | <b class="text-slate-200">猎手本能</b>（伤害）、<b class="text-slate-200">飞扑袭杀</b>（扑击距离）、<b class="text-slate-200">厚实毛皮</b>（减伤）、<b class="text-slate-200">活力充盈</b>（体力恢复）、<b class="text-slate-200">灵动闪避</b>（闪避率）、<b class="text-slate-200">能工巧匠</b>（制作效果）都可以<b class="text-amber-300">重复加点</b>，成长潜力巨大。 |  |
| `guide.growth.4` | <b class="text-slate-200">草药炼金</b>解锁<b class="text-slate-200">活力药剂</b>；<b class="text-slate-200">猫薄荷茶</b>也是瞬间恢复体力的好帮手——体力见底时别忘了喝一口。 |  |
| `guide.growth.5` | ⚖️ <b class="text-amber-300">动态难度</b>：怪物、Boss 与挑战的强度会随你的等级<b class="text-slate-200">同步成长</b>（荒野草原 &lt; 城市小区 &lt; 干燥荒野 &lt; 幽暗森林，场景越深基础越强）——等级再高也不能掉以轻心，挑战与奖励都随之提升。 |  |
| `guide.growth.6` | 🐾 <b class="text-amber-300">成长节奏</b>：怪物密度随等级提升（每 5 级 +30%），场景内怪物会<b class="text-slate-200">缓慢补刷</b>，升级所需经验曲线更平缓——深入更高级的场景刷怪升级更快，不必死守一个区域。 |  |
| `guide.zones.title` | ⛩ 区域与 Boss |  |
| `guide.zones.1` | 地图边缘的<b class="text-slate-200">传送门</b>通往新区域：<b class="text-slate-200">城市小区</b>、<b class="text-slate-200">干燥荒野</b>、<b class="text-slate-200">幽暗森林</b>——<b class="text-emerald-300">无等级限制</b>，随时可以自由进出往返。 |  |
| `guide.zones.2` | 每个区域<b class="text-slate-200">右下角</b>都盘踞着<b class="text-slate-200">关底 Boss</b>：巨野猪（冲撞）、弹弓顽童（远程石子）、巨狼（极速撕咬）、<b class="text-rose-300">大眼镜蛇</b>——最终 Boss，体型巨大，会<b class="text-rose-300">喷射毒液</b>（击中后持续中毒掉血）与<b class="text-rose-300">远距离扑击</b>（扑击前会高高支起身体）。它守护着<b class="text-amber-300">通往下一场景的传送门</b>——想要推进主线，就得先过 Boss 这一关。击败它们奖励大量经验（技能点仍只来自升级）。 |  |
| `guide.zones.3` | 🌋 <b class="text-slate-200">干燥荒野</b>有大型<b class="text-slate-200">火山口</b>（熔岩不可通行）和<b class="text-slate-200">宝石矿脉</b>；<b class="text-rose-300">泉水稀少、几乎不下雨</b>——靠<b class="text-slate-200">仙人掌果</b>补水，采<b class="text-slate-200">龙血草</b>和宝石制作强效道具。 |  |
| `guide.zones.4` | 🌲 <b class="text-slate-200">幽暗森林</b>是一条纵贯的<b class="text-slate-200">长路</b>，两侧是无法通行的高大树木林，<b class="text-sky-300">多雨</b>——采集<b class="text-slate-200">藤条</b>编<b class="text-slate-200">藤甲</b>防雨防身，路上还有凶猛的<b class="text-rose-300">猴子</b>、<b class="text-rose-300">鳄鱼</b>和<b class="text-slate-200">灵芝</b>。 |  |
| `guide.zones.5` | 🛏 城市小区的<b class="text-slate-200">狭窄暗巷</b>和幽暗森林的<b class="text-slate-200">树洞</b>都是可以睡觉的避难所——睡到天亮恢复 40 生命、体力全满。 |  |
| `guide.zones.6` | Boss 靠近时屏幕上方会出现血条；扑击是主要输出手段。 |  |

## misc.

| key | 中文 | 备注 |
|---|---|---|
| `misc.title` | 荒野本能：暹罗猫求生 |  |
| `misc.north` | 北 |  |
| `misc.cave` | 洞穴 |  |
| `misc.spring` | 泉水 |  |

## log.

| key | 中文 | 备注 |
|---|---|---|
| `log.weather.clear` | ☀️ 天空放晴了。 |  |
| `log.weather.rain` | 🌧️ 开始下雨了…… |  |
| `log.weather.mist` | 🌫️ 一阵轻雾弥漫开来。 |  |
| `log.boot.wake` | 🐱 你在荒野中醒来。相信你的本能——按 E 嗅探！ |  |
| `log.boot.newJourney` | 🌱 新的旅程开始了！一切从零开始。 |  |
| `log.cave.idle` | 🏕️ 洞穴里安静又安全。（在火堆、床、工作台或出口旁按 F） |  |
| `log.cave.noPounce` | 😺 这里施展不开扑击！ |  |
| `log.cave.enter` | 🕳️ 你溜进凉爽的洞穴庇护所。 |  |
| `log.cave.exit` | 🌤️ 你回到荒野之中。 |  |
| `log.craft.workbench` | 🛠 你在工作台前准备制作物品。 |  |
| `log.craft.salmon` | 🔥 在篝火上烤好了一条河鲑！ |  |
| `log.craft.dry` | 🔥 你在火边烘干了毛发，暖烘烘的！ |  |
| `log.craft.fireIdle` | 🔥 篝火噼啪作响。（带条河鲑来烤） |  |
| `log.craft.needSkill` | 🔒 需要技能【{skill}】才能合成。 | 含插值 {skill} |
| `log.craft.done` | 🔨 合成了 {name}！ | 含插值 {name} |
| `log.bed.curl` | 😴 你在柔软的稻草床上蜷成一团…… |  |
| `log.bed.wake` | 🌅 你在黎明中醒来，精神焕发。（+34 生命，体力全满） |  |
| `log.shelter.sleep` | 😴 你蜷进避难所，沉沉睡去…… |  |
| `log.shelter.wake` | 🌅 你在黎明中醒来，精神焕发！（+40 生命，体力全满） |  |
| `log.zone.enter` | ⛩ 你进入了【{name}】！ | 含插值 {name} |
| `log.death` | ☠️ 你精疲力竭倒下了……在黎明中醒来。 |  |
| `log.stumble` | 🐾 你踉跄了一下，站稳了脚跟。 |  |
| `log.pounce.water` | 💦 你差点落水，扑腾着跳回岸上！（毛打湿了） |  |
| `log.groom` | ✨ 你梳理了毛发，神清气爽！ |  |
| `log.catch` | 🐾 抓到一只{name}！ | 含插值 {name} |
| `log.fish.run` | 🎣 三文鱼洄游中随手捞到一条！ |  |
| `log.fish.none` | 🐟 岸边没有鱼……口渴的话去找清泉吧（青色气味）。 |  |
| `log.combat.hit` | ⚔️ 你击中{name}，造成 {dmg} 伤害{crit}！ | 含插值 {name,dmg,crit} |
| `log.combat.kill` | 💀 {name}倒下了。 | 含插值 {name} |
| `log.crit.bang` | 暴击！ | 暴击后缀（流浪狗命中用） |
| `log.crit.wrap` | （暴击！） | 暴击后缀（扑击命中用） |
| `log.dodge` | 💨 你灵巧地闪开了攻击！ |  |
| `log.damage` | 💔 你受到 {n} 点伤害！ | 含插值 {n} |
| `log.footsteps` | 👂 附近传来脚步声…… |  |
| `log.pred.alert` | ⚠️ 一只{name}发现了你！ | 含插值 {name} |
| `log.poison.venom` | 💚 毒液溅到你身上！（-{dmg} 生命，中毒！） | 含插值 {dmg} |
| `log.poison.tick` | 💚 毒素发作！-{n} 生命 | 含插值 {n} |
| `log.poison.gone` | 🌿 毒素消退，你恢复了。 |  |
| `log.level.up` | 🎉 升级！你现在是 {level} 级！（+1 技能点） | 含插值 {level} |
| `log.skill.point` | 📌 获得 {n} 技能点！（当前 {points}） | 含插值 {n,points} |
| `log.skill.none` | 📖 没有这个技能！ |  |
| `log.skill.maxed` | 📖 {name} 已经满级（Lv.{max}）！ | 含插值 {name,max} |
| `log.skill.noPoint` | 📌 技能点不足——只有升级才能获得技能点。 |  |
| `log.skill.learned` | ⭐ 习得技能：{name} Lv.{lv}/{max}！（-1 技能点） | 含插值 {name,lv,max} |
| `log.skill.book` | 📖 发现技能书：{name}！（在行囊中阅读） | 含插值 {name} |
| `log.skill.readBook` | 📖 阅读旧技能书：+40 经验！（技能点只在升级时获得） |  |
| `log.equip.off` | ⬇️ 摘下了{name}（仍在行囊中）。 | 含插值 {name} |
| `log.equip.on` | ⬆️ 穿上了{name}！ | 含插值 {name} |
| `log.zoomies` | 😵‍💫 猫薄荷！！疯狂跑酷！！！{name}！ | 含插值 {name} |
| `log.item.use` | 😋 使用了{name}。 | 含插值 {name} |
| `log.drop.jade` | 💎 猴子的巢穴里掉出一块翡翠！ |  |
| `log.drop.sapphire` | 💎 鳄鱼皮里嵌着一颗蓝宝石！ |  |
| `log.dog.bite` | 🐕 流浪狗咬了你一口！（-{dmg} 生命） | 含插值 {dmg} |
| `log.dog.bark` | 🐕 流浪狗朝你狂吠追来！ |  |
| `log.dog.hit` | 🐕 你打中了流浪狗，{crit}它夹着尾巴逃窜！ | 含插值 {crit} |
| `log.dog.defeated` | 💀 流浪狗被你赶跑了。（+筋腱 +12 经验） |  |
| `log.boss.boar.charge` | 🐗 巨野猪向你冲来！ |  |
| `log.boss.boar.hit` | 🐗 巨野猪撞飞了你！（-{dmg} 生命） | 含插值 {dmg} |
| `log.boss.wolf.hit` | 🐺 巨狼咬了你！（-{dmg} 生命） | 含插值 {dmg} |
| `log.boss.cobra.spit` | 🐍 大眼镜蛇喷出一团毒液！ |  |
| `log.boss.cobra.leap` | 🐍 大眼镜蛇如箭般扑击而来！ |  |
| `log.boss.cobra.leapHit` | 🐍 眼镜蛇扑击重创了你！（-{dmg} 生命，中毒！） | 含插值 {dmg} |
| `log.boss.cobra.spitWindup` | 🐍 大眼镜蛇蜷曲身体蓄力……（要喷毒了！） |  |
| `log.boss.cobra.leapWindup` | 🐍 大眼镜蛇停下脚步，盘卷起身体……（要扑击了！） |  |
| `log.boss.cobra.bite` | 🐍 眼镜蛇咬中了你！（-{dmg} 生命，中毒！） | 含插值 {dmg} |
| `log.boss.kid.shoot` | 🧒 顽童用弹弓射出一颗石子！ |  |
| `log.boss.kid.hit` | 💢 你被石子砸中了！（-{dmg} 生命） | 含插值 {dmg} |
| `log.boss.crit` | 💥 对【{name}】造成暴击！{dmg} 伤害！ | 含插值 {name,dmg} |
| `log.boss.defeated` | 🏆 你击败了【{name}】！获得大量经验！ | 含插值 {name} |
| `log.boss.respawn` | ⚠️ 【{name}】在竞技场复活了！ | 含插值 {name} |
| `log.feature.berry` | 🍓 你吃掉了一些野莓。（+饱食，+2 生命） |  |
| `log.feature.catnip` | 🌿 收获新鲜猫薄荷。 |  |
| `log.feature.herbs` | 🌼 采到草药。 |  |
| `log.feature.cactus` | 🌵 掰下一枚仙人掌果——荒漠中的甘露！ |  |
| `log.feature.dragonherb` | 🌹 采到殷红的龙血草，药力强劲！ |  |
| `log.feature.reishi` | 🍄 摘下古树上的灵芝，灵光流转。 |  |
| `log.feature.vine` | 🪵 割下一段坚韧的藤条。 |  |
| `log.feature.spring` | 💧 喝下清冽的泉水。 |  |
| `log.feature.gem` | 💎 采到一颗{name}！（60 秒后再生） | 含插值 {name} |
| `log.feature.trash` | 🗑 你在垃圾堆里翻出了{name}！ | 含插值 {name} |
| `log.feature.trashEmpty` | 🗑 垃圾桶里空空如也…… |  |
| `log.feature.forest` | 🍂 在森林里捡到些材料。 |  |
| `log.feature.nothing` | 😺 这里没什么可以互动的…… |  |
| `log.companion.warn` | 🐈 {name}嘶叫：有捕食者靠近！ | 含插值 {name} |
| `log.companion.gift` | 🎁 {name}给你带来了{gift}！ | 含插值 {name,gift} |
| `log.pet` | 🐾 你抚摸{name}——它满足地咕噜咕噜叫。（+{n} ♥） | 含插值 {name,n} |
| `log.pet.first` | 😺 {name}开始亲近你——继续抚摸，或从猫菜单喂食更快成为朋友！ | 含插值 {name} |
| `log.pet.ready` | 💗 {name}已经准备好成为你的朋友——从猫菜单收养它吧！ | 含插值 {name} |
| `log.feed.none` | 🍽️ 你现在没有食物可以分享（三文鱼、烤鲑鱼或老鼠）。 |  |
| `log.feed` | 🍖 你把{item}分给{name}！（+{n} ♥） | 含插值 {item,name,n} |
| `log.feed.first` | 😺 {name}很喜欢！继续下去它会信任你。 | 含插值 {name} |
| `log.adopt.notReady` | 💭 {name}还没准备好——继续抚摸和喂食（需要 60 ♥）。 | 含插值 {name} |
| `log.adopt.ok` | 🎉 {name}现在是你朋友了！它会一直跟着你。 | 含插值 {name} |
| `log.perk.warn` | 🐈 {name}现在会提醒你周围的危险！ | 含插值 {name} |
| `log.perk.hunt` | 🐈 {name}现在会和你并肩狩猎（+伤害）！ | 含插值 {name} |
| `log.summon.end` | 🐈 {name} 战斗结束，回到你身边。 | 含插值 {name} |
| `log.summon.cd` | 📣 召唤冷却中（{n} 秒） | 含插值 {n} |
| `log.summon.none` | 😿 你还没有伙伴猫——先收养一只流浪猫吧！ |  |
| `log.summon.ok` | 📣 {name} 应召而来，与你并肩作战！（冷却 {n} 分钟） | 含插值 {name,n} |
| `log.summon.strike` | 🐈 {name} 猛扑向敌人！（{dmg} 伤害） | 含插值 {name,dmg} |
| `log.challenge.rival.start` | ⚠️ 对手猫入侵你的领地——扑击赶跑它们！ |  |
| `log.challenge.rival.hit` | 🐈‍⬛ 你拍开了一只对手猫！ |  |
| `log.challenge.rival.fled` | 💨 对手猫落荒而逃！ |  |
| `log.challenge.rival.mark` | ⚠️ 对手猫正在标记你的领地！ |  |
| `log.challenge.rival.swat` | 🐈‍⬛ 对手猫挠了你一下！（-{n} 生命） | 含插值 {n} |
| `log.challenge.rival.loseStolen` | 🏳️ 对手猫占据了你的部分领地！它们偷走了{name}！ | 含插值 {name} |
| `log.challenge.rival.lose` | 🏳️ 对手猫占据了你的部分领地！你的心情一落千丈…… |  |
| `log.challenge.rival.win` | 🏆 你赶跑了对手猫！（+{n} 心情） | 含插值 {n} |
| `log.challenge.rival.drop` | 🎁 对手猫掉落了筋腱！ |  |
| `log.challenge.dog.start` | 🐕 一只野狗在追你——快跑！ |  |
| `log.challenge.dog.stun` | 🐕 呜咽！你眩晕了野狗——快跑！ |  |
| `log.challenge.dog.bite` | 🐕 野狗咬了你！（-{n} 生命） | 含插值 {n} |
| `log.challenge.dog.mauled` | 🐕 你被野狗咬惨了…… |  |
| `log.challenge.dog.bark` | 🐕 汪！汪！ |  |
| `log.challenge.dog.win` | 🏆 你逃过了野狗！（+{n} 体力） | 含插值 {n} |
| `log.challenge.storm.start` | ⛈️ 暴雨雷电来袭——快找掩护！ |  |
| `log.challenge.storm.hit` | ⚡ 闪电劈在你附近！（-{n} 生命） | 含插值 {n} |
| `log.challenge.storm.far` | ⚡ 一道闪电在不远处炸响！ |  |
| `log.challenge.storm.safe` | ⚡ 风暴在洞外肆虐——洞里很安全。 |  |
| `log.challenge.storm.warn` | ⚡ 闪电就要落下了！快找掩护！ |  |
| `log.challenge.storm.win` | 🏆 你挺过了风暴！（+{n} 心情） | 含插值 {n} |
| `log.challenge.salmon.start` | 🐟 三文鱼洄游！在河边钓鱼——必定收获！ |  |
| `log.challenge.salmon.win` | 🏆 三文鱼洄游结束——收获颇丰！ |  |
| `log.challenge.viper.start` | 🐍 毒蛇群包围了你——击退它们！ |  |
| `log.challenge.viper.kill` | 💀 你碾碎了毒蛇！（+草药） |  |
| `log.challenge.viper.bite` | 🐍 毒蛇咬了你！（-{n} 生命） | 含插值 {n} |
| `log.challenge.viper.win` | 🏆 你击退了毒蛇群！（+{n} 心情） | 含插值 {n} |
| `log.challenge.wolf.start` | 🐺 狼群正在窥伺你——反击或逃跑！ |  |
| `log.challenge.wolf.kill` | 💀 你放倒了一只狼！（+18 经验） |  |
| `log.challenge.wolf.stagger` | 🐺 狼被打得踉跄！ |  |
| `log.challenge.wolf.bite` | 🐺 狼咬了你！（-{n} 生命） | 含插值 {n} |
| `log.challenge.wolf.win` | 🏆 你活过了狼群！（+10 心情） |  |
| `log.challenge.stampede.start` | 🐗 野猪狂奔！躲开冲撞的野猪！ |  |
| `log.challenge.stampede.hit` | 🐗 狂奔的野猪踩了你！（-{n} 生命） | 含插值 {n} |
| `log.challenge.stampede.win` | 🏆 你躲过了野猪狂奔！（+{n} 心情） | 含插值 {n} |
| `log.challenge.eagle.start` | 🦅 一只鹰在头顶盘旋——躲开它的俯冲！ |  |
| `log.challenge.eagle.hit` | 🦅 鹰爪抓伤了你！（-{n} 生命） | 含插值 {n} |
| `log.challenge.eagle.miss` | 🦅 鹰从你身边俯冲掠过！ |  |
| `log.challenge.eagle.dive` | 🦅 鹰开始俯冲——快离开影子！ |  |
| `log.challenge.eagle.win` | 🏆 鹰飞走了！（+{n} 心情） | 含插值 {n} |
| `log.challenge.fog.start` | 🌫️ 浓雾弥漫——在时间耗尽前找到{name}信标逃出去！ | 含插值 {name} |
| `log.challenge.fog.win` | 🏆 你找到了穿过浓雾的路！（+{n} 心情） | 含插值 {n} |
| `log.challenge.fog.fail` | 🌫️ 迷失在浓雾中……毛发又湿又冷。（-6 心情） |  |
