/* ==========================================================================
   Wilderness Feline Instinct — lang/en.js
   英文（English）字典：全部 key → 英文译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.en = {

  /* ============================================================ ui. HUD/面板/按钮 */
  'ui.hud.time': '{icon} {time} · Day {day}',               /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ Clear',
  'ui.hud.weather.rain': '🌧️ Rain',
  'ui.hud.weather.mist': '🌫️ Mist',
  'ui.hud.zone': '⛩ {name}',                                /* 插值: {name} */
  'ui.hud.compass': 'Instinct',
  'ui.hud.xp': 'XP',
  'ui.hud.level': 'Lv {n}',                                 /* 插值: {n} */
  'ui.hud.summon.none': '📣 No pet cat',
  'ui.hud.summon.ready': '📣 Ready (R)',
  'ui.hud.summon.cd': '📣 {n}s',                            /* 插值: {n} */
  'ui.hud.bossDefault': '👹 Boss',
  'ui.hud.boss': '👹 {name}',                               /* 插值: {name} */

  'ui.meter.hp': 'HP',
  'ui.meter.satiety': 'Satiety',
  'ui.meter.hydration': 'Water',
  'ui.meter.stamina': 'Stamina',
  'ui.meter.mood': 'Mood',
  'ui.meter.wetness': 'Wetness',

  'ui.btn.growth': 'Growth & Skills',
  'ui.btn.guide': 'Survival Guide (G)',
  'ui.btn.inv': 'Inventory (I)',
  'ui.btn.friends': 'Cat Friends (B)',
  'ui.btn.sound': 'Toggle Sound',
  'ui.btn.reset': 'New Game',
  'ui.btn.lang': '🌐 {lang}',                               /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> Move · <b class="text-white">Shift</b> Sneak · <b class="text-white">Space</b> Pounce · <b class="text-white">E</b> Sniff · <b class="text-white">Q</b> Groom · <b class="text-white">F</b> Interact',

  'ui.touch.pounce': 'Pounce',
  'ui.touch.sniff': 'Sniff',
  'ui.touch.groom': 'Groom',
  'ui.touch.interact': 'Interact',
  'ui.touch.sneak': '🦎 Sneak',
  'ui.touch.sneakTitle': 'Toggle Sneak',
  'ui.touch.summon': '📣 Summon Partner',
  'ui.touch.summonTitle': 'Summon Partner Cat (R)',

  'ui.catmenu.title': 'Cat Actions',
  'ui.catmenu.pet': '🐾 Pet',
  'ui.catmenu.feed': '🍖 Feed',
  'ui.catmenu.adopt': '🤝 Adopt',
  'ui.catmenu.adopted': '🤝 Adopted',

  'ui.modal.inv.title': '🎒 Inventory & Crafting',
  'ui.modal.friends.title': '🐈 Cat Friends',
  'ui.modal.guide.title': '📖 Survival Guide',
  'ui.modal.growth.title': '📈 Growth & Skills',

  'ui.tab.inv': 'Pouch',
  'ui.tab.craft': 'Craft',

  'ui.inv.empty': 'Your pouch is empty — forage, fish, and hunt to fill it.',
  'ui.inv.use': 'Use',
  'ui.inv.equip': 'Equip',
  'ui.inv.unequip': 'Unequip',
  'ui.inv.read': '📖 Read',
  'ui.inv.equipped': '● Equipped',

  'ui.craft.locked': '🔒 Locked',
  'ui.craft.needSkill': 'Requires skill: {skill}',           /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 Daytime only',
  'ui.craft.craft': 'Craft',

  'ui.confirm.reset': 'Start a new game? Your current save will be wiped.',
  'ui.confirm.resetTitle': '🆕 Start a New Game',
  'ui.confirm.resetDesc': 'All progress (level, skills, items, pets, zone progress) will be wiped, and a brand-new world will be generated. This cannot be undone!',
  'ui.confirm.ok': '🎮 New Game',
  'ui.confirm.cancel': 'Cancel',

  'ui.friends.intro': 'Approach a stray and press <b class="text-slate-200">F</b> to pet it — an action menu pops up above its head where you can <b class="text-slate-200">feed</b> (salmon/mouse) and <b class="text-slate-200">adopt</b> it (friendship at <b class="text-pink-300">60 ♥</b>). Pink scent marks where cats are.',
  'ui.friends.yourPets': '🐾 Your Pets ({n})',               /* 插值: {n} */
  'ui.friends.noPets': 'No pets yet — feed a stray to 60 ♥, then adopt it!',
  'ui.friends.strays': '🐈 Strays ({n})',                    /* 插值: {n} */
  'ui.friends.unknown': '{n} stray cats are still roaming the wild — follow the pink scent to find them.', /* 插值: {n} */
  'ui.friends.none': 'No cats nearby yet. Press E to sniff and follow the pink scent trails.',
  'ui.friends.status.adopted': 'Friend ❤️',
  'ui.friends.status.adoptable': 'Adoptable — walk up and press F!',
  'ui.friends.status.approaching': '{n}/60 ♥ Adoptable',     /* 插值: {n} */
  'ui.friends.status.shy': 'Shy — pet first',
  'ui.friends.friendship.best': '❤️ Best Friend',
  'ui.friends.friendship.percent': '♥ {n}%',                 /* 插值: {n} */
  'ui.friends.friendship.shy': '— Shy —',

  'ui.perk.mood': 'Mood Aura',
  'ui.perk.warn': 'Danger Warning',
  'ui.perk.hunt': 'Hunt Assist',

  'ui.branch.hunt': '🎯 Hunting',
  'ui.branch.survive': '🛡️ Survival',
  'ui.branch.bond': '🐈 Bond',
  'ui.branch.dodge': '💨 Dodge',
  'ui.branch.craft': '🔨 Crafting',

  'ui.skill.maxed': 'Maxed',
  'ui.skill.upgrade': 'Upgrade',
  'ui.skill.learn': 'Learn',
  'ui.skill.lv': 'Lv.{lv}/{max}',                            /* 插值: {lv} {max} */

  'ui.growth.skillPoints': 'Skill Points: {n}',              /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} XP',                        /* 插值: {xp} {need} */
  'ui.growth.bonus': 'Level bonus: +{hp} max HP · +{st} max Stamina · +{mood} max Mood · +{regen}% Stamina regen', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': 'Mood crit rate: <b class="text-amber-300">{pct}%</b> (better mood = more crits, double damage)', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': 'Skill points are only gained on level-up — +1 per level, so plan your build carefully; Hunter Instinct / Flying Leap / Thick Fur / Vitality / Agile Dodge / Master Crafter can be leveled repeatedly.',
  'ui.growth.skillTree': '📖 Skill Tree ({n} points spent)', /* 插值: {n} */
  'ui.growth.journey': '🌱 Journey',

  'ui.journey.days': 'Days Survived',
  'ui.journey.prey': 'Prey Caught',
  'ui.journey.predators': 'Predators Slain',
  'ui.journey.fish': 'Fish Caught',
  'ui.journey.pets': 'Pets Adopted',
  'ui.journey.challenges': 'Challenges Won',
  'ui.journey.xp': 'Total XP',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': 'Wild Grassland',
  'zone.1': 'City District',
  'zone.2': 'Dry Wasteland',
  'zone.3': 'Gloomy Forest',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': 'Giant Boar',
  'boss.1': 'Slingshot Kid',
  'boss.2': 'Giant Wolf',
  'boss.3': 'King Cobra',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': 'Boar',
  'enemy.fox': 'Fox',
  'enemy.viper': 'Viper',
  'enemy.monkey': 'Monkey',
  'enemy.croc': 'Crocodile',
  'enemy.mouse': 'Field Mouse',
  'enemy.grasshopper': 'Grasshopper',
  'enemy.salmon': 'Salmon',
  'enemy.straydog': 'Stray Dog',
  'enemy.rival': 'Rival Cat',
  'enemy.dog': 'Wild Dog',
  'enemy.wolf': 'Wolf',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': 'Wild Berries',
  'item.berry.desc': 'Sweet forest berries that restore a little HP.',
  'item.mouse.name': 'Field Mouse',
  'item.mouse.desc': 'A plump field mouse that restores stamina.',
  'item.grasshopper.name': 'Grasshopper',
  'item.grasshopper.desc': 'A crunchy little hopper.',
  'item.salmon.name': 'Salmon',
  'item.salmon.desc': 'Fresh-caught salmon, rich in nutrients.',
  'item.cooked_salmon.name': 'Cooked Salmon',
  'item.cooked_salmon.desc': 'Smoky, tender and juicy — a real feast.',
  'item.catnip.name': 'Fresh Catnip',
  'item.catnip.desc': 'Instantly refreshing.',
  'item.dried_catnip.name': 'Dried Catnip',
  'item.dried_catnip.desc': 'Double the potency!',
  'item.herbs.name': 'Herbs',
  'item.herbs.desc': 'Soothing wild herbs.',
  'item.leaves.name': 'Leaves',
  'item.leaves.desc': 'Broad green leaves.',
  'item.vines.name': 'Vines',
  'item.vines.desc': 'Strong, flexible vines.',
  'item.fishbone.name': 'Fish Bone',
  'item.fishbone.desc': 'A clean, white fish bone.',
  'item.sinew.name': 'Sinew',
  'item.sinew.desc': 'Tough animal sinew.',
  'item.fat.name': 'Boar Fat',
  'item.fat.desc': 'Thick, greasy fat.',
  'item.herb_salve.name': 'Herb Salve',
  'item.herb_salve.desc': 'Apply to wounds to restore 32 HP.',
  'item.leaf_hat.name': 'Leaf Rain Hat',
  'item.leaf_hat.desc': 'Keeps you dry in rain; take -2 damage per hit (defense).',
  'item.fishbone_collar.name': 'Fishbone Collar',
  'item.fishbone_collar.desc': 'Attack +3 (+1 per Crafter level); strays trust you faster.',
  'item.cat_tooth_necklace.name': 'Cat Tooth Necklace',
  'item.cat_tooth_necklace.desc': 'Attack +20% (+4% per Crafter level): deal more damage to enemies.',
  'item.catnip_tea.name': 'Catnip Tea',
  'item.catnip_tea.desc': 'A hot cup instantly restores 25 stamina.',
  'item.energy_potion.name': 'Energy Potion',
  'item.energy_potion.desc': 'Alchemical essence that instantly restores 55 stamina.',
  'item.gem_ruby.name': 'Ruby',
  'item.gem_ruby.desc': 'A fiery ruby forged in volcanic lava — a precious material.',
  'item.gem_sapphire.name': 'Sapphire',
  'item.gem_sapphire.desc': 'A deep sapphire from dark waters — a precious material.',
  'item.gem_jade.name': 'Jade',
  'item.gem_jade.desc': 'An emerald jade born from ancient roots — a precious material.',
  'item.flame_ruby_pendant.name': 'Flame Ruby Pendant',
  'item.flame_ruby_pendant.desc': 'Attack +40% (+8% per Crafter level) — stronger than the Cat Tooth Necklace.',
  'item.sapphire_star.name': 'Sapphire Star',
  'item.sapphire_star.desc': 'Attack +25% and crit rate +12%.',
  'item.jade_charm.name': 'Jade Charm',
  'item.jade_charm.desc': 'Take -6 damage per hit (-1 per Crafter level) — hard as jade.',
  'item.cactus_fruit.name': 'Cactus Fruit',
  'item.cactus_fruit.desc': 'An oasis fruit of the desert: +30 water.',
  'item.dragon_herb.name': 'Dragon Blood Herb',
  'item.dragon_herb.desc': 'A crimson herb from volcanic cracks; eat to restore 18 HP.',
  'item.reishi.name': 'Reishi',
  'item.reishi.desc': 'An ancient tree elixir: restores 12 HP, +10 mood.',
  'item.vine_strand.name': 'Vine Strand',
  'item.vine_strand.desc': 'Tough strands from the Gloomy Forest — armor crafting material.',
  'item.vine_armor.name': 'Vine Armor',
  'item.vine_armor.desc': 'Take -7 damage per hit (-1 per Crafter level); barely gets wet in rain.',
  'item.stone_claw.name': 'Stone Claw',
  'item.stone_claw.desc': 'Attack +8 (+2 per Crafter level) — claws studded with gem shards.',
  'item.dragon_potion.name': 'Dragon Blood Potion',
  'item.dragon_potion.desc': 'Boiling dragon blood essence, instantly restores 60 HP.',
  'item.book_hunter.name': 'Hunter Instinct',
  'item.book_hunter.desc': 'Pounce damage +15%, larger catch range.',
  'item.book_swift.name': 'Swift Claws',
  'item.book_swift.desc': 'Move speed +10%, stamina regen +25%.',
  'item.book_thick.name': 'Thick Fur',
  'item.book_thick.desc': 'Damage taken -25%.',
  'item.book_keen.name': 'Keen Nose',
  'item.book_keen.desc': 'Sniff range +40%, denser scent trails.',
  'item.book_brave.name': 'Brave Heart',
  'item.book_brave.desc': 'Mood cap +25%, challenge rewards +50%.',
  'item.book_angler.name': 'Angler\'s Tail',
  'item.book_angler.desc': 'Fishing always succeeds.',
  'item.book_guardian.name': 'Guardian Power',
  'item.book_guardian.desc': 'Friendship gain +50%, hunt assist +4.',
  'item.book_camo.name': 'Leaf Camouflage',
  'item.book_camo.desc': 'Tall grass hiding doubles; sneaking costs less stamina.',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': 'Leaf Rain Hat',
  'recipe.leaf_hat.desc': 'Keeps you dry in rain; take -2 damage per hit (defense).',
  'recipe.fishbone_collar.name': 'Fishbone Collar',
  'recipe.fishbone_collar.desc': 'Attack +3; strays trust you faster.',
  'recipe.cat_tooth_necklace.name': 'Cat Tooth Necklace',
  'recipe.cat_tooth_necklace.desc': 'Attack +20%, deal more damage to enemies.',
  'recipe.dried_catnip.name': 'Dried Catnip',
  'recipe.dried_catnip.desc': 'Powerful boost — needs daytime drying.',
  'recipe.herb_salve.name': 'Herb Salve',
  'recipe.herb_salve.desc': 'Apply to wounds to restore 32 HP.',
  'recipe.catnip_tea.name': 'Catnip Tea',
  'recipe.catnip_tea.desc': 'Stamina +25, works instantly.',
  'recipe.energy_potion.name': 'Energy Potion',
  'recipe.energy_potion.desc': 'Stamina +55. Requires the [Herbal Alchemy] skill.',
  'recipe.flame_ruby_pendant.name': 'Flame Ruby Pendant',
  'recipe.flame_ruby_pendant.desc': 'Attack +40% — top-tier accessory.',
  'recipe.sapphire_star.name': 'Sapphire Star',
  'recipe.sapphire_star.desc': 'Attack +25%, crit +12%.',
  'recipe.jade_charm.name': 'Jade Charm',
  'recipe.jade_charm.desc': 'Take -6 damage per hit.',
  'recipe.vine_armor.name': 'Vine Armor',
  'recipe.vine_armor.desc': 'Defense -7, barely gets wet in rain.',
  'recipe.stone_claw.name': 'Stone Claw',
  'recipe.stone_claw.desc': 'Attack +8 — a big damage boost.',
  'recipe.dragon_potion.name': 'Dragon Blood Potion',
  'recipe.dragon_potion.desc': 'Instantly restores 60 HP. Requires [Herbal Alchemy].',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': 'Hunter Instinct',
  'skill.hunter.desc': 'Per level: pounce damage +15%, larger catch range',
  'skill.leap.name': 'Flying Leap',
  'skill.leap.desc': 'Per level: pounce range +20% (max +60%)',
  'skill.keen.name': 'Keen Nose',
  'skill.keen.desc': 'Sniff range +40%, denser scent trails',
  'skill.angler.name': 'Angler\'s Tail',
  'skill.angler.desc': 'Fishing always succeeds',
  'skill.swift.name': 'Swift Claws',
  'skill.swift.desc': 'Per level: move speed +10% (max +30%), stamina regen +8%',
  'skill.thick.name': 'Thick Fur',
  'skill.thick.desc': 'Per level: damage taken -12% (max -47%)',
  'skill.camo.name': 'Leaf Camouflage',
  'skill.camo.desc': 'Tall grass hiding doubles; sneaking costs less stamina',
  'skill.vitality.name': 'Vitality',
  'skill.vitality.desc': 'Per level: stamina regen speed +30% (max +150%)',
  'skill.guardian.name': 'Guardian Power',
  'skill.guardian.desc': 'Friendship gain +50%, hunt assist +4',
  'skill.brave.name': 'Brave Heart',
  'skill.brave.desc': 'Mood cap +25%, challenge rewards +50%',
  'skill.summon.name': 'Summon Boost',
  'skill.summon.desc': 'Summon time 25→40s, cooldown 5→3 min',
  'skill.dodge.name': 'Agile Dodge',
  'skill.dodge.desc': 'Per level: 6% chance to fully dodge damage (max 30%)',
  'skill.agile.name': 'Light as a Feather',
  'skill.agile.desc': 'Pounce stamina cost -40%, cooldown -0.2s',
  'skill.craft.name': 'Master Crafter',
  'skill.craft.desc': 'Per level: crafted item effects +20%, equipment bonuses also increase',
  'skill.alchemist.name': 'Herbal Alchemy',
  'skill.alchemist.desc': 'Unlocks powerful recipes like the Energy Potion',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ Challenge',
  'challenge.rival.title': '🐈‍⬛ Territory Invasion',
  'challenge.rival.desc': 'Rival cats are taking over your turf — pounce to drive them off!',
  'challenge.dog.title': '🐕 Dog Chase!',
  'challenge.dog.desc': 'Run! Hide in tall grass, or flee into a cave!',
  'challenge.storm.title': '⛈️ Thunderstorm',
  'challenge.storm.desc': 'Find cover from the lightning fast!',
  'challenge.salmon.title': '🐟 Salmon Run',
  'challenge.salmon.desc': 'Fish by the river — guaranteed catch!',
  'challenge.viper.title': '🐍 Viper Swarm',
  'challenge.viper.desc': 'Fend off the vipers!',
  'challenge.wolf.title': '🐺 Wolf Pack!',
  'challenge.wolf.desc': 'The pack is hunting you — fight back or flee into a cave!',
  'challenge.stampede.title': '🐗 Boar Stampede!',
  'challenge.stampede.desc': 'Dodge the charging boars!',
  'challenge.eagle.title': '🦅 Eagle Dive!',
  'challenge.eagle.desc': 'Watch the shadows — dodge the diving eagle!',
  'challenge.fog.title': '🌫️ Lost in Fog!',
  'challenge.fog.desc': 'Find the beacon (cave or spring) before time runs out!',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                               /* 插值: {name} */
  'feature.prompt.gate': 'Go to {name}',                     /* 插值: {name} */
  'feature.prompt.berry': 'Eat Berries',
  'feature.prompt.pickup': 'Pick Up',
  'feature.prompt.spring': 'Drink',
  'feature.prompt.gem': 'Mine Gem',
  'feature.prompt.harvest': 'Harvest',
  'feature.prompt.vine': 'Cut Vine',
  'feature.prompt.sleep': 'Sleep',
  'feature.prompt.trash': 'Scavenge',
  'feature.prompt.enter': 'Enter',
  'feature.prompt.fish': 'Fish',
  'feature.prompt.pet': 'Pet',
  'feature.prompt.workbench': 'F — Craft Items',
  'feature.prompt.fire': 'F — Cook / Dry',
  'feature.prompt.bed': 'F — Sleep Until Dawn',
  'feature.prompt.exit': 'F — Leave Cave',
  'feature.shelter.hollow': '🛏 Hollow Shelter',
  'feature.shelter.alley': '🛏 Alley Shelter',
  'feature.beacon': '📍 {name} Beacon',                      /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 Controls',
  'guide.controls.move': '<b class="text-slate-200">WASD / Arrow Keys</b> — Move',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — Sneak (hide in tall grass)',
  'guide.controls.pounce': '<b class="text-slate-200">Space</b> — Pounce / Attack',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — Sniff (scent trails)',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — Groom fur (+mood)',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — Interact / Pet / Fish',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — Summon pet cat (5 min cooldown)',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — Open panels',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — Close panel',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 Scent Instinct',
  'guide.smell.p1': 'Press <b class="text-slate-200">E</b> and colored scent trails carried by the wind tell you what\'s around:',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">Cyan</b> — clean springs and water',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">Gold</b> — prey: mice, salmon, grasshoppers',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">Pink</b> — friendly stray cats',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">Red</b> — predators: boars, vipers, foxes',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">Orange</b> — rival cats invading your territory',
  'guide.smell.p2': 'The <b class="text-slate-200">"Instinct" compass</b> at the top always points to the nearest scent source.',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 Survival Tips',
  'guide.tips.1': 'Drink at a <b class="text-slate-200">spring</b> (cyan) and fish by the riverbank with <b class="text-slate-200">F</b>.',
  'guide.tips.2': 'Rain soaks your fur — <b class="text-slate-200">wet fur</b> slows stamina regen. Craft a <b class="text-slate-200">Leaf Rain Hat</b> or dry off by a cave fire.',
  'guide.tips.3': 'Sneak through <b class="text-slate-200">tall grass</b> to avoid predators, then pounce for the kill.',
  'guide.tips.4': 'Caves are safe havens: sleep in the bed until dawn to restore HP, and cook salmon by the fire.',
  'guide.tips.5': 'Press <b class="text-slate-200">Q</b> to groom and boost your mood; very low mood weakens you.',
  'guide.tips.6': 'Befriend strays (pink) — at high friendship they warn you of danger and fight by your side.',
  'guide.tips.7': 'Catnip is a potent stimulant... but it triggers "crazy zoomies". Use with care.',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 Crafting Recipes',
  'guide.recipes.1': '<b class="text-slate-200">Leaf Rain Hat</b> — Leaves ×3 + Vines ×2 (defense: -2 damage per hit)',
  'guide.recipes.2': '<b class="text-slate-200">Fishbone Collar</b> — Fish Bone ×3 + Sinew ×1 (attack +3, friendship +50%)',
  'guide.recipes.3': '<b class="text-slate-200">Cat Tooth Necklace</b> — Fish Bone ×4 + Sinew ×2 (attack +20%)',
  'guide.recipes.4': '<b class="text-slate-200">Dried Catnip</b> — Catnip ×2 (needs daytime)',
  'guide.recipes.5': '<b class="text-slate-200">Herb Salve</b> — Herbs ×3 + Boar Fat ×1',
  'guide.recipes.6': '<b class="text-slate-200">Catnip Tea</b> — Catnip ×1 + Herbs ×1 (stamina +25, instant)',
  'guide.recipes.7': '<b class="text-slate-200">Energy Potion</b> — Catnip ×2 + Herbs ×2 + Boar Fat ×1 (stamina +55, needs [Herbal Alchemy] skill)',
  'guide.recipes.8': '<b class="text-slate-200">Flame Ruby Pendant</b> — Ruby ×1 + Fish Bone ×2 + Sinew ×1 (attack +40%)',
  'guide.recipes.9': '<b class="text-slate-200">Sapphire Star</b> — Sapphire ×1 + Fish Bone ×2 + Sinew ×1 (attack +25%, crit +12%)',
  'guide.recipes.10': '<b class="text-slate-200">Jade Charm</b> — Jade ×1 + Leaves ×2 + Vines ×2 (-6 damage per hit)',
  'guide.recipes.11': '<b class="text-slate-200">Vine Armor</b> — Vine Strand ×3 + Leaves ×2 + Vines ×2 (-7 damage per hit, barely wet in rain)',
  'guide.recipes.12': '<b class="text-slate-200">Stone Claw</b> — Ruby ×1 + Sinew ×2 + Fish Bone ×2 (attack +8, big damage boost)',
  'guide.recipes.13': '<b class="text-slate-200">Dragon Blood Potion</b> — Dragon Blood Herb ×2 + Herbs ×1 + Boar Fat ×1 (restores 60 HP, needs [Herbal Alchemy])',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 Growth & Skills',
  'guide.growth.1': 'Every action grants <b class="text-slate-200">XP</b> — hunting, fishing, foraging, pets, challenges, and defeating bosses. Each level <b class="text-emerald-300">permanently</b> adds +10 max HP, +6 max Stamina, +6 max Mood, and stamina regen speeds up with level.',
  'guide.growth.2': 'Leveling up, winning challenges, and defeating bosses all grant <b class="text-slate-200">XP</b>; but <b class="text-amber-300">skill points only come from leveling</b> (+1 per level), so plan carefully. Freely invest in the <b class="text-slate-200">five branches</b> in the 📈 Growth panel: 🎯Hunting, 🛡️Survival, 🐈Bond, 💨Dodge, 🔨Crafting.',
  'guide.growth.3': '<b class="text-slate-200">Hunter Instinct</b> (damage), <b class="text-slate-200">Flying Leap</b> (pounce range), <b class="text-slate-200">Thick Fur</b> (damage reduction), <b class="text-slate-200">Vitality</b> (stamina regen), <b class="text-slate-200">Agile Dodge</b> (dodge rate), and <b class="text-slate-200">Master Crafter</b> (crafting effects) can all be <b class="text-amber-300">leveled repeatedly</b> for huge growth potential.',
  'guide.growth.4': '<b class="text-slate-200">Herbal Alchemy</b> unlocks the <b class="text-slate-200">Energy Potion</b>; <b class="text-slate-200">Catnip Tea</b> is also a great instant stamina boost — take a sip when your stamina runs low.',
  'guide.growth.5': '⚖️ <b class="text-amber-300">Dynamic difficulty</b>: monsters, bosses, and challenges scale <b class="text-slate-200">with your level</b> (Wild Grassland &lt; City District &lt; Dry Wasteland &lt; Gloomy Forest, deeper zones are tougher) — even at high level, stay sharp; challenges and rewards grow together.',
  'guide.growth.6': '🐾 <b class="text-amber-300">Pacing</b>: monster density rises with level (+30% every 5 levels), monsters <b class="text-slate-200">slowly respawn</b> in each zone, and the XP curve stays gentle — push into higher zones to level faster instead of camping one area.',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ Zones & Bosses',
  'guide.zones.1': '<b class="text-slate-200">Portals</b> at the map\'s edge lead to new zones: <b class="text-slate-200">City District</b>, <b class="text-slate-200">Dry Wasteland</b>, and <b class="text-slate-200">Gloomy Forest</b> — <b class="text-emerald-300">no level requirement</b>, come and go freely.',
  'guide.zones.2': 'Every zone hides a <b class="text-slate-200">boss</b> in its <b class="text-slate-200">bottom-right corner</b>: Giant Boar (charges), Slingshot Kid (ranged pebbles), Giant Wolf (lightning bites), and the <b class="text-rose-300">King Cobra</b> — the final boss, huge, spitting <b class="text-rose-300">venom</b> (lingering poison damage) and leaping <b class="text-rose-300">long distances</b> (it rears up before pouncing). It guards the <b class="text-amber-300">portal to the next zone</b> — to progress, defeat the boss first. They grant plenty of XP (skill points still only come from leveling).',
  'guide.zones.3': '🌋 <b class="text-slate-200">Dry Wasteland</b> has huge <b class="text-slate-200">volcanic craters</b> (lava is impassable) and <b class="text-slate-200">gem veins</b>; <b class="text-rose-300">springs are scarce and rain almost never falls</b> — hydrate with <b class="text-slate-200">Cactus Fruit</b>, and gather <b class="text-slate-200">Dragon Blood Herbs</b> and gems for powerful gear.',
  'guide.zones.4': '🌲 <b class="text-slate-200">Gloomy Forest</b> is a long <b class="text-slate-200">road</b> lined with impassable trees, <b class="text-sky-300">rainy</b> — gather <b class="text-slate-200">Vine Strands</b> to weave <b class="text-slate-200">Vine Armor</b>, and watch for fierce <b class="text-rose-300">monkeys</b>, <b class="text-rose-300">crocodiles</b>, and <b class="text-slate-200">Reishi</b>.',
  'guide.zones.5': '🛏 The <b class="text-slate-200">narrow alleys</b> of the City District and the <b class="text-slate-200">tree hollows</b> of the Gloomy Forest are sleepable shelters — sleep until dawn to restore 40 HP and full stamina.',
  'guide.zones.6': 'A boss HP bar appears at the top of the screen when a boss is near; pounce is your main damage source.',

  /* ============================================================ misc. 杂项 */
  'misc.title': 'Wild Instinct: Siamese Survival',
  'misc.north': 'N',
  'misc.cave': 'Cave',
  'misc.spring': 'Spring',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ The sky has cleared.',
  'log.weather.rain': '🌧️ It starts to rain...',
  'log.weather.mist': '🌫️ A light mist rolls in.',
  'log.boot.wake': '🐱 You wake in the wild. Trust your instincts — press E to sniff!',
  'log.boot.newJourney': '🌱 A new journey begins! Everything starts from zero.',
  'log.cave.idle': '🏕️ The cave is quiet and safe. (Press F by the fire, bed, workbench, or exit)',
  'log.cave.noPounce': '😺 No room to pounce here!',
  'log.cave.enter': '🕳️ You slip into the cool cave shelter.',
  'log.cave.exit': '🌤️ You step back into the wild.',
  'log.craft.workbench': '🛠 You ready your materials at the workbench.',
  'log.craft.salmon': '🔥 You cooked a salmon over the campfire!',
  'log.craft.dry': '🔥 You dried your fur by the fire — warm and cozy!',
  'log.craft.fireIdle': '🔥 The campfire crackles. (Bring a salmon to cook)',
  'log.craft.needSkill': '🔒 Requires the [{skill}] skill to craft.',   /* 插值: {skill} */
  'log.craft.done': '🔨 Crafted {name}!',                              /* 插值: {name} */
  'log.bed.curl': '😴 You curl up on the soft straw bed...',
  'log.bed.wake': '🌅 You wake at dawn, fully refreshed. (+34 HP, full stamina)',
  'log.shelter.sleep': '😴 You curl into the shelter and fall fast asleep...',
  'log.shelter.wake': '🌅 You wake at dawn, fully refreshed! (+40 HP, full stamina)',
  'log.zone.enter': '⛩ You entered [{name}]!',                        /* 插值: {name} */
  'log.death': '☠️ You collapse from exhaustion... and wake at dawn.',
  'log.stumble': '🐾 You stumble, then steady yourself.',
  'log.pounce.water': '💦 You almost fell in the water and scrambled back to shore! (fur soaked)',
  'log.groom': '✨ You groom your fur and feel refreshed!',
  'log.catch': '🐾 Caught a {name}!',                                  /* 插值: {name} */
  'log.fish.run': '🎣 Snagged one during the salmon run!',
  'log.fish.none': '🐟 No fish by the shore... if you\'re thirsty, find a spring (cyan scent).',
  'log.combat.hit': '⚔️ You hit {name} for {dmg} damage{crit}!',       /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name} is down.',                             /* 插值: {name} */
  'log.dodge': '💨 You nimbly dodged the attack!',
  'log.crit.bang': 'CRITICAL!',                                        /* 暴击后缀（流浪狗命中用） */
  'log.crit.wrap': '(critical!)',                                      /* 暴击后缀（扑击命中用） */
  'log.damage': '💔 You take {n} damage!',                             /* 插值: {n} */
  'log.footsteps': '👂 Footsteps nearby...',
  'log.pred.alert': '⚠️ A {name} spotted you!',                        /* 插值: {name} */
  'log.poison.venom': '💚 Venom splashes on you! (-{dmg} HP, poisoned!)', /* 插值: {dmg} */
  'log.poison.tick': '💚 Poison ticks! -{n} HP',                       /* 插值: {n} */
  'log.poison.gone': '🌿 The poison fades and you recover.',
  'log.level.up': '🎉 Level up! You are now level {level}! (+1 skill point)', /* 插值: {level} */
  'log.skill.point': '📌 Gained {n} skill point(s)! (now {points})',   /* 插值: {n} {points} */
  'log.skill.none': '📖 No such skill!',
  'log.skill.maxed': '📖 {name} is already maxed (Lv.{max})!',         /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 Not enough skill points — only leveling grants skill points.',
  'log.skill.learned': '⭐ Learned skill: {name} Lv.{lv}/{max}! (-1 skill point)', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 Found a skill book: {name}! (read it in your pouch)', /* 插值: {name} */
  'log.skill.readBook': '📖 You read an old skill book: +40 XP! (skill points only come from leveling)',
  'log.equip.off': '⬇️ Unequipped {name} (still in your pouch).',      /* 插值: {name} */
  'log.equip.on': '⬆️ Equipped {name}!',                              /* 插值: {name} */
  'log.zoomies': '😵‍💫 Catnip!! CRAZY ZOOMIES!!! {name}!',              /* 插值: {name} */
  'log.item.use': '😋 Used {name}.',                                   /* 插值: {name} */
  'log.drop.jade': '💎 A jade drops from the monkey\'s nest!',
  'log.drop.sapphire': '💎 A sapphire is embedded in the crocodile\'s hide!',
  'log.dog.bite': '🐕 A stray dog bit you! (-{dmg} HP)',               /* 插值: {dmg} */
  'log.dog.bark': '🐕 A stray dog barks and chases you!',
  'log.dog.hit': '🐕 You hit the stray dog — {crit}it flees with its tail between its legs!', /* 插值: {crit} */
  'log.dog.defeated': '💀 You drove off the stray dog. (+sinew +12 XP)',
  'log.boss.boar.charge': '🐗 The Giant Boar charges at you!',
  'log.boss.boar.hit': '🐗 The Giant Boar sends you flying! (-{dmg} HP)', /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 The Giant Wolf bites you! (-{dmg} HP)',     /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 The King Cobra spits a glob of venom!',
  'log.boss.cobra.leap': '🐍 The King Cobra lunges like an arrow!',
  'log.boss.cobra.leapHit': '🐍 The cobra\'s lunge wrecks you! (-{dmg} HP, poisoned!)', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 The King Cobra coils and rears... (about to spit!)',
  'log.boss.cobra.leapWindup': '🐍 The King Cobra stops and coils its body... (about to pounce!)',
  'log.boss.cobra.bite': '🐍 The cobra bites you! (-{dmg} HP, poisoned!)', /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 The kid fires a pebble from his slingshot!',
  'log.boss.kid.hit': '💢 You got hit by a pebble! (-{dmg} HP)',       /* 插值: {dmg} */
  'log.boss.crit': '💥 Critical hit on [{name}]! {dmg} damage!',       /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 You defeated [{name}]! Massive XP!',        /* 插值: {name} */
  'log.boss.respawn': '⚠️ [{name}] has revived in the arena!',          /* 插值: {name} */
  'log.feature.berry': '🍓 You ate some wild berries. (+satiety, +2 HP)',
  'log.feature.catnip': '🌿 Harvested fresh catnip.',
  'log.feature.herbs': '🌼 Gathered herbs.',
  'log.feature.cactus': '🌵 Snapped off a cactus fruit — desert nectar!',
  'log.feature.dragonherb': '🌹 Picked a crimson dragon blood herb, potent stuff!',
  'log.feature.reishi': '🍄 Plucked a reishi from the ancient tree, glowing with power.',
  'log.feature.vine': '🪵 Cut a tough vine strand.',
  'log.feature.spring': '💧 You drink from the clear spring.',
  'log.feature.gem': '💎 Mined a {name}! (respawns in 60s)',          /* 插值: {name} */
  'log.feature.trash': '🗑 You dug a {name} out of the trash!',        /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 The trash can is empty...',
  'log.feature.forest': '🍂 Picked up some materials in the forest.',
  'log.feature.nothing': '😺 Nothing to interact with here...',
  'log.companion.warn': '🐈 {name} hisses: a predator is near!',      /* 插值: {name} */
  'log.companion.gift': '🎁 {name} brought you {gift}!',              /* 插值: {name} {gift} */
  'log.pet': '🐾 You pet {name} — it purrs contentedly. (+{n} ♥)',    /* 插值: {name} {n} */
  'log.pet.first': '😺 {name} is warming up to you — keep petting, or feed it from the cat menu to become friends faster!', /* 插值: {name} */
  'log.pet.ready': '💗 {name} is ready to be your friend — adopt it from the cat menu!', /* 插值: {name} */
  'log.feed.none': '🍽️ You have no food to share right now (salmon, cooked salmon, or mouse).',
  'log.feed': '🍖 You give {item} to {name}! (+{n} ♥)',               /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 {name} loves it! Keep it up and it will trust you.', /* 插值: {name} */
  'log.adopt.notReady': '💭 {name} isn\'t ready yet — keep petting and feeding (needs 60 ♥).', /* 插值: {name} */
  'log.adopt.ok': '🎉 {name} is now your friend! It will follow you everywhere.', /* 插值: {name} */
  'log.perk.warn': '🐈 {name} will now warn you of danger!',          /* 插值: {name} */
  'log.perk.hunt': '🐈 {name} will now hunt by your side (+damage)!', /* 插值: {name} */
  'log.summon.end': '🐈 {name} finished fighting and returns to you.', /* 插值: {name} */
  'log.summon.cd': '📣 Summon on cooldown ({n}s)',                    /* 插值: {n} */
  'log.summon.none': '😿 You have no pet cat — adopt a stray first!',
  'log.summon.ok': '📣 {name} answers the call and fights by your side! (cooldown {n} min)', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 {name} pounces on the enemy! ({dmg} damage)', /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ Rival cats are invading your territory — pounce to drive them off!',
  'log.challenge.rival.hit': '🐈‍⬛ You swat a rival cat away!',
  'log.challenge.rival.fled': '💨 The rival cats flee!',
  'log.challenge.rival.mark': '⚠️ A rival cat is marking your territory!',
  'log.challenge.rival.swat': '🐈‍⬛ A rival cat scratches you! (-{n} HP)', /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ Rival cats took part of your territory! They stole {name}!', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ Rival cats took part of your territory! Your mood plummets...',
  'log.challenge.rival.win': '🏆 You drove off the rival cats! (+{n} mood)', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 A rival cat dropped sinew!',
  'log.challenge.dog.start': '🐕 A wild dog is chasing you — run!',
  'log.challenge.dog.stun': '🐕 Whimper! You stunned the wild dog — run!',
  'log.challenge.dog.bite': '🐕 The wild dog bites you! (-{n} HP)',   /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 The wild dog mauled you...',
  'log.challenge.dog.bark': '🐕 Woof! Woof!',
  'log.challenge.dog.win': '🏆 You escaped the wild dog! (+{n} stamina)', /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ Storm and lightning — find cover!',
  'log.challenge.storm.hit': '⚡ Lightning strikes near you! (-{n} HP)', /* 插值: {n} */
  'log.challenge.storm.far': '⚡ A bolt crashes not far away!',
  'log.challenge.storm.safe': '⚡ The storm rages outside — the cave is safe.',
  'log.challenge.storm.warn': '⚡ Lightning is about to strike! Find cover!',
  'log.challenge.storm.win': '🏆 You survived the storm! (+{n} mood)', /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 Salmon run! Fish by the river — guaranteed catch!',
  'log.challenge.salmon.win': '🏆 The salmon run is over — great haul!',
  'log.challenge.viper.start': '🐍 Vipers surround you — fight them off!',
  'log.challenge.viper.kill': '💀 You crushed a viper! (+herbs)',
  'log.challenge.viper.bite': '🐍 A viper bites you! (-{n} HP)',      /* 插值: {n} */
  'log.challenge.viper.win': '🏆 You fought off the vipers! (+{n} mood)', /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 A wolf pack is stalking you — fight or flee!',
  'log.challenge.wolf.kill': '💀 You took down a wolf! (+18 XP)',
  'log.challenge.wolf.stagger': '🐺 The wolf staggers!',
  'log.challenge.wolf.bite': '🐺 A wolf bites you! (-{n} HP)',        /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 You survived the pack! (+10 mood)',
  'log.challenge.stampede.start': '🐗 Boar stampede! Dodge the charging boars!',
  'log.challenge.stampede.hit': '🐗 A charging boar tramples you! (-{n} HP)', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 You dodged the stampede! (+{n} mood)', /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 An eagle circles overhead — dodge its dive!',
  'log.challenge.eagle.hit': '🦅 Eagle talons scratch you! (-{n} HP)', /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 The eagle dives past you!',
  'log.challenge.eagle.dive': '🦅 The eagle begins its dive — get out of the shadow!',
  'log.challenge.eagle.win': '🏆 The eagle flew away! (+{n} mood)',   /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ Dense fog — find the {name} beacon and escape before time runs out!', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 You found your way through the fog! (+{n} mood)', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ Lost in the fog... wet and cold. (-6 mood)',
};
