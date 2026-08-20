/* ==========================================================================
   Wilderness Feline Instinct — lang/fr.js
   法语（Français）字典：全部 key → 法语译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.fr = {

  /* ============================================================ ui. HUD/面板/按钮 */
  'ui.hud.time': '{icon} {time} · Jour {day}',              /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ Dégagé',
  'ui.hud.weather.rain': '🌧️ Pluie',
  'ui.hud.weather.mist': '🌫️ Brume',
  'ui.hud.zone': '⛩ {name}',                                /* 插值: {name} */
  'ui.hud.compass': 'Instinct',
  'ui.hud.xp': 'EXP',
  'ui.hud.level': 'Nv {n}',                                 /* 插值: {n} */
  'ui.hud.summon.none': '📣 Pas de chat partenaire',
  'ui.hud.summon.ready': '📣 Prêt (R)',
  'ui.hud.summon.cd': '📣 {n}s',                            /* 插值: {n} */
  'ui.hud.bossDefault': '👹 Boss',
  'ui.hud.boss': '👹 {name}',                               /* 插值: {name} */

  'ui.meter.hp': 'PV',
  'ui.meter.satiety': 'Satiété',
  'ui.meter.hydration': 'Hydratation',
  'ui.meter.stamina': 'Endurance',
  'ui.meter.mood': 'Humeur',
  'ui.meter.wetness': 'Humidité',

  'ui.btn.growth': 'Croissance & Compétences',
  'ui.btn.guide': 'Guide de survie (G)',
  'ui.btn.inv': 'Inventaire (I)',
  'ui.btn.friends': 'Amis chats (B)',
  'ui.btn.sound': 'Son on/off',
  'ui.btn.reset': 'Nouvelle partie',
  'ui.btn.lang': '🌐 {lang}',                               /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> Se déplacer · <b class="text-white">Shift</b> Se faufiler · <b class="text-white">Espace</b> Bond · <b class="text-white">E</b> Renifler · <b class="text-white">Q</b> Se toiletter · <b class="text-white">F</b> Interagir',

  'ui.touch.pounce': 'Bond',
  'ui.touch.sniff': 'Renifler',
  'ui.touch.groom': 'Toiletter',
  'ui.touch.interact': 'Interagir',
  'ui.touch.sneak': '🦎 Furtif',
  'ui.touch.sneakTitle': 'Basculer la furtivité',
  'ui.touch.summon': '📣 Invoquer le partenaire',
  'ui.touch.summonTitle': 'Invoquer le chat partenaire (R)',

  'ui.catmenu.title': 'Actions du chat',
  'ui.catmenu.pet': '🐾 Caresser',
  'ui.catmenu.feed': '🍖 Nourrir',
  'ui.catmenu.adopt': '🤝 Adopter',
  'ui.catmenu.adopted': '🤝 Adopté',

  'ui.modal.inv.title': '🎒 Sac & Artisanat',
  'ui.modal.friends.title': '🐈 Amis chats',
  'ui.modal.guide.title': '📖 Guide de survie',
  'ui.modal.growth.title': '📈 Croissance & Compétences',

  'ui.tab.inv': 'Sac',
  'ui.tab.craft': 'Fabriquer',

  'ui.inv.empty': 'Ton sac est vide — cueille, pêche et chasse pour le remplir.',
  'ui.inv.use': 'Utiliser',
  'ui.inv.equip': 'Équiper',
  'ui.inv.unequip': 'Déséquiper',
  'ui.inv.read': '📖 Lire',
  'ui.inv.equipped': '● Équipé',

  'ui.craft.locked': '🔒 Verrouillé',
  'ui.craft.needSkill': 'Compétence requise : {skill}',      /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 Jour uniquement',
  'ui.craft.craft': 'Fabriquer',

  'ui.confirm.reset': 'Commencer une nouvelle partie ? Ta sauvegarde actuelle sera effacée.',
  'ui.confirm.resetTitle': '🆕 Nouvelle partie',
  'ui.confirm.resetDesc': 'Toute ta progression (niveau, compétences, objets, compagnons, progrès de zone) sera effacée et un monde entièrement nouveau sera généré. Cette action est irréversible !',
  'ui.confirm.ok': '🎮 Nouvelle partie',
  'ui.confirm.cancel': 'Annuler',

  'ui.friends.intro': 'Approche un chat errant et appuie sur <b class="text-slate-200">F</b> pour le caresser — un menu d\'actions apparaît au-dessus de sa tête pour le <b class="text-slate-200">nourrir</b> (saumon/souris) et l\'<b class="text-slate-200">adopter</b> (amitié à <b class="text-pink-300">60 ♥</b>). L\'odeur rose signale les chats.',
  'ui.friends.yourPets': '🐾 Tes animaux ({n})',             /* 插值: {n} */
  'ui.friends.noPets': 'Pas encore d\'animal — nourris un errant jusqu\'à 60 ♥, puis adopte-le !',
  'ui.friends.strays': '🐈 Errants ({n})',                   /* 插值: {n} */
  'ui.friends.unknown': 'Il reste {n} chats errants dans la nature — suis l\'odeur rose pour les trouver.', /* 插值: {n} */
  'ui.friends.none': 'Aucun chat à proximité. Appuie sur E pour renifler et suis les effluves roses.',
  'ui.friends.status.adopted': 'Ami ❤️',
  'ui.friends.status.adoptable': 'Adoptable — approche et appuie sur F !',
  'ui.friends.status.approaching': '{n}/60 ♥ Adoptable',     /* 插值: {n} */
  'ui.friends.status.shy': 'Timide — caresse d\'abord',
  'ui.friends.friendship.best': '❤️ Meilleur ami',
  'ui.friends.friendship.percent': '♥ {n}%',                 /* 插值: {n} */
  'ui.friends.friendship.shy': '— Timide —',

  'ui.perk.mood': 'Aura d\'humeur',
  'ui.perk.warn': 'Alerte danger',
  'ui.perk.hunt': 'Assistance de chasse',

  'ui.branch.hunt': '🎯 Chasse',
  'ui.branch.survive': '🛡️ Survie',
  'ui.branch.bond': '🐈 Lien',
  'ui.branch.dodge': '💨 Esquive',
  'ui.branch.craft': '🔨 Artisanat',

  'ui.skill.maxed': 'Max',
  'ui.skill.upgrade': 'Améliorer',
  'ui.skill.learn': 'Apprendre',
  'ui.skill.lv': 'Nv.{lv}/{max}',                            /* 插值: {lv} {max} */

  'ui.growth.skillPoints': 'Points de compétence : {n}',     /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} EXP',                       /* 插值: {xp} {need} */
  'ui.growth.bonus': 'Bonus de niveau : +{hp} PV max · +{st} Endurance max · +{mood} Humeur max · +{regen}% de régénération d\'endurance', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': 'Taux de critique selon l\'humeur : <b class="text-amber-300">{pct}%</b> (meilleure humeur = plus de critiques, double dégâts)', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': 'Les points de compétence ne s\'obtiennent qu\'en montant de niveau — +1 par niveau, planifie donc ton build avec soin ; Instinct de chasseur / Bond meurtrier / Fourrure épaisse / Vitalité / Esquive agile / Maître artisan peuvent être améliorés plusieurs fois.',
  'ui.growth.skillTree': '📖 Arbre de compétences ({n} points investis)', /* 插值: {n} */
  'ui.growth.journey': '🌱 Parcours',

  'ui.journey.days': 'Jours survécus',
  'ui.journey.prey': 'Proies attrapées',
  'ui.journey.predators': 'Prédateurs tués',
  'ui.journey.fish': 'Poissons pêchés',
  'ui.journey.pets': 'Animaux adoptés',
  'ui.journey.challenges': 'Défis remportés',
  'ui.journey.xp': 'EXP totale',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': 'Plaines sauvages',
  'zone.1': 'Quartier urbain',
  'zone.2': 'Terres arides',
  'zone.3': 'Forêt sombre',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': 'Sanglier géant',
  'boss.1': 'Gamin au lance-pierre',
  'boss.2': 'Loup géant',
  'boss.3': 'Cobra royal',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': 'Sanglier',
  'enemy.fox': 'Renard',
  'enemy.viper': 'Vipère',
  'enemy.monkey': 'Singe',
  'enemy.croc': 'Crocodile',
  'enemy.mouse': 'Souris des champs',
  'enemy.grasshopper': 'Sauterelle',
  'enemy.salmon': 'Saumon',
  'enemy.straydog': 'Chien errant',
  'enemy.rival': 'Chat rival',
  'enemy.dog': 'Chien sauvage',
  'enemy.wolf': 'Loup',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': 'Baies sauvages',
  'item.berry.desc': 'Des baies forestières sucrées qui restaurent un peu de PV.',
  'item.mouse.name': 'Souris des champs',
  'item.mouse.desc': 'Une souris bien dodue qui restaure de l\'endurance.',
  'item.grasshopper.name': 'Sauterelle',
  'item.grasshopper.desc': 'Un petit insecte croquant.',
  'item.salmon.name': 'Saumon',
  'item.salmon.desc': 'Un saumon fraîchement pêché, riche en nutriments.',
  'item.cooked_salmon.name': 'Saumon grillé',
  'item.cooked_salmon.desc': 'Fumé, tendre et juteux — un vrai festin.',
  'item.catnip.name': 'Herbe à chat fraîche',
  'item.catnip.desc': 'Revigore instantanément.',
  'item.dried_catnip.name': 'Herbe à chat séchée',
  'item.dried_catnip.desc': 'Double d\'efficacité !',
  'item.herbs.name': 'Herbes',
  'item.herbs.desc': 'Des herbes sauvages apaisantes.',
  'item.leaves.name': 'Feuilles',
  'item.leaves.desc': 'De grandes feuilles vertes.',
  'item.vines.name': 'Lianes',
  'item.vines.desc': 'Des lianes solides et flexibles.',
  'item.fishbone.name': 'Arête de poisson',
  'item.fishbone.desc': 'Une arête propre et blanche.',
  'item.sinew.name': 'Tendon',
  'item.sinew.desc': 'Un tendon animal robuste.',
  'item.fat.name': 'Graisse de sanglier',
  'item.fat.desc': 'Une graisse épaisse et grasse.',
  'item.herb_salve.name': 'Pommade d\'herbes',
  'item.herb_salve.desc': 'Applique sur les blessures pour restaurer 32 PV.',
  'item.leaf_hat.name': 'Chapeau de feuilles',
  'item.leaf_hat.desc': 'Reste au sec sous la pluie ; -2 dégâts par coup (défense).',
  'item.fishbone_collar.name': 'Collier d\'arêtes',
  'item.fishbone_collar.desc': 'Attaque +3 (+1 par niveau d\'artisan) ; les chats errants te font confiance plus vite.',
  'item.cat_tooth_necklace.name': 'Collier de dent de chat',
  'item.cat_tooth_necklace.desc': 'Attaque +20% (+4% par niveau d\'artisan) : inflige plus de dégâts aux ennemis.',
  'item.catnip_tea.name': 'Thé à l\'herbe à chat',
  'item.catnip_tea.desc': 'Une tasse chaude restaure instantanément 25 points d\'endurance.',
  'item.energy_potion.name': 'Potion d\'énergie',
  'item.energy_potion.desc': 'Essence alchimique qui restaure instantanément 55 points d\'endurance.',
  'item.gem_ruby.name': 'Rubis',
  'item.gem_ruby.desc': 'Un rubis incandescent forgé dans la lave volcanique — matériau précieux.',
  'item.gem_sapphire.name': 'Saphir',
  'item.gem_sapphire.desc': 'Un saphir profond des eaux obscures — matériau précieux.',
  'item.gem_jade.name': 'Jade',
  'item.gem_jade.desc': 'Un jade émeraude né des racines anciennes — matériau précieux.',
  'item.flame_ruby_pendant.name': 'Pendentif rubis de flamme',
  'item.flame_ruby_pendant.desc': 'Attaque +40% (+8% par niveau d\'artisan) — plus fort que le collier de dent de chat.',
  'item.sapphire_star.name': 'Étoile de saphir',
  'item.sapphire_star.desc': 'Attaque +25% et taux de critique +12%.',
  'item.jade_charm.name': 'Charme de jade',
  'item.jade_charm.desc': '-6 dégâts par coup (-1 par niveau d\'artisan) — dur comme le jade.',
  'item.cactus_fruit.name': 'Fruit de cactus',
  'item.cactus_fruit.desc': 'Un fruit oasis du désert : +30 d\'hydratation.',
  'item.dragon_herb.name': 'Herbe au sang de dragon',
  'item.dragon_herb.desc': 'Une herbe cramoisie poussant dans les fissures volcaniques ; mange-la pour restaurer 18 PV.',
  'item.reishi.name': 'Reishi',
  'item.reishi.desc': 'Un élixir des arbres anciens : restaure 12 PV, +10 d\'humeur.',
  'item.vine_strand.name': 'Liane',
  'item.vine_strand.desc': 'Des lianes résistantes de la forêt sombre — matériau pour fabriquer une armure.',
  'item.vine_armor.name': 'Armure de lianes',
  'item.vine_armor.desc': '-7 dégâts par coup (-1 par niveau d\'artisan) ; reste presque au sec sous la pluie.',
  'item.stone_claw.name': 'Griffe de pierre',
  'item.stone_claw.desc': 'Attaque +8 (+2 par niveau d\'artisan) — des griffes incrustées d\'éclats de gemmes.',
  'item.dragon_potion.name': 'Potion de sang de dragon',
  'item.dragon_potion.desc': 'Une essence de sang de dragon bouillonnante, restaure instantanément 60 PV.',
  'item.book_hunter.name': 'Instinct de chasseur',
  'item.book_hunter.desc': 'Dégâts de bond +15%, zone de capture élargie.',
  'item.book_swift.name': 'Griffes rapides',
  'item.book_swift.desc': 'Vitesse de déplacement +10%, régénération d\'endurance +25%.',
  'item.book_thick.name': 'Fourrure épaisse',
  'item.book_thick.desc': 'Dégâts subis -25%.',
  'item.book_keen.name': 'Nez fin',
  'item.book_keen.desc': 'Portée de reniflage +40%, effluves plus denses.',
  'item.book_brave.name': 'Cœur courageux',
  'item.book_brave.desc': 'Humeur max +25%, récompenses de défi +50%.',
  'item.book_angler.name': 'Queue de pêcheur',
  'item.book_angler.desc': 'La pêche réussit toujours.',
  'item.book_guardian.name': 'Force du gardien',
  'item.book_guardian.desc': 'Gain d\'amitié +50%, assistance de chasse +4.',
  'item.book_camo.name': 'Camouflage de feuilles',
  'item.book_camo.desc': 'La dissimulation dans les herbes hautes double ; se faufiler coûte moins d\'endurance.',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': 'Chapeau de feuilles',
  'recipe.leaf_hat.desc': 'Reste au sec sous la pluie ; -2 dégâts par coup (défense).',
  'recipe.fishbone_collar.name': 'Collier d\'arêtes',
  'recipe.fishbone_collar.desc': 'Attaque +3 ; les chats errants te font confiance plus vite.',
  'recipe.cat_tooth_necklace.name': 'Collier de dent de chat',
  'recipe.cat_tooth_necklace.desc': 'Attaque +20%, inflige plus de dégâts aux ennemis.',
  'recipe.dried_catnip.name': 'Herbe à chat séchée',
  'recipe.dried_catnip.desc': 'Puissant stimulant — nécessite de sécher en journée.',
  'recipe.herb_salve.name': 'Pommade d\'herbes',
  'recipe.herb_salve.desc': 'Applique sur les blessures pour restaurer 32 PV.',
  'recipe.catnip_tea.name': 'Thé à l\'herbe à chat',
  'recipe.catnip_tea.desc': 'Endurance +25, effet immédiat.',
  'recipe.energy_potion.name': 'Potion d\'énergie',
  'recipe.energy_potion.desc': 'Endurance +55. Nécessite la compétence [Alchimie végétale].',
  'recipe.flame_ruby_pendant.name': 'Pendentif rubis de flamme',
  'recipe.flame_ruby_pendant.desc': 'Attaque +40% — accessoire de premier choix.',
  'recipe.sapphire_star.name': 'Étoile de saphir',
  'recipe.sapphire_star.desc': 'Attaque +25%, critique +12%.',
  'recipe.jade_charm.name': 'Charme de jade',
  'recipe.jade_charm.desc': '-6 dégâts par coup.',
  'recipe.vine_armor.name': 'Armure de lianes',
  'recipe.vine_armor.desc': 'Défense -7, reste presque au sec sous la pluie.',
  'recipe.stone_claw.name': 'Griffe de pierre',
  'recipe.stone_claw.desc': 'Attaque +8 — un gros boost de dégâts.',
  'recipe.dragon_potion.name': 'Potion de sang de dragon',
  'recipe.dragon_potion.desc': 'Restaure instantanément 60 PV. Nécessite [Alchimie végétale].',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': 'Instinct de chasseur',
  'skill.hunter.desc': 'Par niveau : dégâts de bond +15%, zone de capture élargie',
  'skill.leap.name': 'Bond meurtrier',
  'skill.leap.desc': 'Par niveau : portée de bond +20% (max +60%)',
  'skill.keen.name': 'Nez fin',
  'skill.keen.desc': 'Portée de reniflage +40%, effluves plus denses',
  'skill.angler.name': 'Queue de pêcheur',
  'skill.angler.desc': 'La pêche réussit toujours',
  'skill.swift.name': 'Griffes rapides',
  'skill.swift.desc': 'Vitesse de déplacement +10%, régénération d\'endurance +25%',
  'skill.thick.name': 'Fourrure épaisse',
  'skill.thick.desc': 'Par niveau : dégâts subis -12% (max -47%)',
  'skill.camo.name': 'Camouflage de feuilles',
  'skill.camo.desc': 'Dissimulation dans les herbes hautes doublée ; se faufiler coûte moins d\'endurance',
  'skill.vitality.name': 'Vitalité',
  'skill.vitality.desc': 'Par niveau : vitesse de régénération d\'endurance +30% (max +150%)',
  'skill.guardian.name': 'Force du gardien',
  'skill.guardian.desc': 'Gain d\'amitié +50%, assistance de chasse +4',
  'skill.brave.name': 'Cœur courageux',
  'skill.brave.desc': 'Humeur max +25%, récompenses de défi +50%',
  'skill.summon.name': 'Invocation renforcée',
  'skill.summon.desc': 'Durée d\'invocation 25→40 s, rechargement 5→3 min',
  'skill.dodge.name': 'Esquive agile',
  'skill.dodge.desc': 'Par niveau : 6% de chance d\'esquiver totalement (max 30%)',
  'skill.agile.name': 'Léger comme une plume',
  'skill.agile.desc': 'Coût d\'endurance du bond -40%, rechargement -0,2 s',
  'skill.craft.name': 'Maître artisan',
  'skill.craft.desc': 'Par niveau : effets des objets fabriqués +20%, bonus d\'équipement aussi',
  'skill.alchemist.name': 'Alchimie végétale',
  'skill.alchemist.desc': 'Débloque des recettes puissantes comme la potion d\'énergie',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ Défi',
  'challenge.rival.title': '🐈‍⬛ Invasion de territoire',
  'challenge.rival.desc': 'Des chats rivaux s\'emparent de ton territoire — bondis pour les chasser !',
  'challenge.dog.title': '🐕 Chien en furie !',
  'challenge.dog.desc': 'Cours ! Cache-toi dans les herbes hautes, ou fuis dans une grotte !',
  'challenge.storm.title': '⛈️ Orage',
  'challenge.storm.desc': 'Trouve vite un abri contre la foudre !',
  'challenge.salmon.title': '🐟 Montaison du saumon',
  'challenge.salmon.desc': 'Pêche au bord de la rivière — prise garantie !',
  'challenge.viper.title': '🐍 Invasion de vipères',
  'challenge.viper.desc': 'Repousse les vipères !',
  'challenge.wolf.title': '🐺 Meute de loups !',
  'challenge.wolf.desc': 'La meute te traque — riposte ou fuis dans une grotte !',
  'challenge.stampede.title': '🐗 Charge de sangliers !',
  'challenge.stampede.desc': 'Esquive les sangliers en pleine charge !',
  'challenge.eagle.title': '🦅 Piqué d\'aigle !',
  'challenge.eagle.desc': 'Surveille les ombres au sol — esquive le piqué de l\'aigle !',
  'challenge.fog.title': '🌫️ Perdu dans le brouillard !',
  'challenge.fog.desc': 'Trouve la balise (grotte ou source) avant la fin du temps !',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                               /* 插值: {name} */
  'feature.prompt.gate': 'Aller à {name}',                   /* 插值: {name} */
  'feature.prompt.berry': 'Manger des baies',
  'feature.prompt.pickup': 'Ramasser',
  'feature.prompt.spring': 'Boire',
  'feature.prompt.gem': 'Extraire une gemme',
  'feature.prompt.harvest': 'Cueillir',
  'feature.prompt.vine': 'Couper une liane',
  'feature.prompt.sleep': 'Dormir',
  'feature.prompt.trash': 'Fouiller',
  'feature.prompt.enter': 'Entrer',
  'feature.prompt.fish': 'Pêcher',
  'feature.prompt.pet': 'Caresser',
  'feature.prompt.workbench': 'F — Fabriquer des objets',
  'feature.prompt.fire': 'F — Cuisiner / Sécher',
  'feature.prompt.bed': 'F — Dormir jusqu\'à l\'aube',
  'feature.prompt.exit': 'F — Quitter la grotte',
  'feature.shelter.hollow': '🛏 Abri creux',
  'feature.shelter.alley': '🛏 Abri de ruelle',
  'feature.beacon': '📍 Balise {name}',                      /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 Commandes',
  'guide.controls.move': '<b class="text-slate-200">WASD / Flèches</b> — Se déplacer',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — Se faufiler (se cacher dans les herbes hautes)',
  'guide.controls.pounce': '<b class="text-slate-200">Espace</b> — Bond / Attaquer',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — Renifler (effluves)',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — Se toiletter (+humeur)',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — Interagir / Caresser / Pêcher',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — Invoquer le chat partenaire (rechargement 5 min)',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — Ouvrir les panneaux',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — Fermer le panneau',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 Instinct olfactif',
  'guide.smell.p1': 'Appuie sur <b class="text-slate-200">E</b> : des effluves colorés portés par le vent te révèlent ce qui t\'entoure :',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">Cyan</b> — sources d\'eau propre',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">Or</b> — proies : souris, saumons, sauterelles',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">Rose</b> — chats errants amicaux',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">Rouge</b> — prédateurs : sangliers, vipères, renards',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">Orange</b> — chats rivaux envahissant ton territoire',
  'guide.smell.p2': 'La <b class="text-slate-200">boussole « Instinct »</b> en haut pointe toujours vers la source d\'odeur la plus proche.',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 Astuces de survie',
  'guide.tips.1': 'Bois à une <b class="text-slate-200">source</b> (cyan) et pêche au bord de la rivière avec <b class="text-slate-200">F</b>.',
  'guide.tips.2': 'La pluie mouille ton pelage — <b class="text-slate-200">un pelage mouillé</b> ralentit la régénération d\'endurance. Fabrique un <b class="text-slate-200">chapeau de feuilles</b> ou sèche-toi près d\'un feu de grotte.',
  'guide.tips.3': 'Faufile-toi dans les <b class="text-slate-200">herbes hautes</b> pour éviter les prédateurs, puis bondis pour le coup fatal.',
  'guide.tips.4': 'Les grottes sont des refuges sûrs : dors dans le lit jusqu\'à l\'aube pour restaurer tes PV, et cuis le saumon près du feu.',
  'guide.tips.5': 'Appuie sur <b class="text-slate-200">Q</b> pour te toiletter et booster ton humeur ; une humeur très basse t\'affaiblit.',
  'guide.tips.6': 'Fais-toi des amis errants (rose) — à haute amitié, ils te préviennent du danger et combattent à tes côtés.',
  'guide.tips.7': 'L\'herbe à chat est un stimulant puissant... mais elle déclenche une « course folle ». À utiliser avec prudence.',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 Recettes d\'artisanat',
  'guide.recipes.1': '<b class="text-slate-200">Chapeau de feuilles</b> — Feuilles ×3 + Lianes ×2 (défense : -2 dégâts par coup)',
  'guide.recipes.2': '<b class="text-slate-200">Collier d\'arêtes</b> — Arêtes ×3 + Tendon ×1 (attaque +3, gain d\'amitié +50%)',
  'guide.recipes.3': '<b class="text-slate-200">Collier de dent de chat</b> — Arêtes ×4 + Tendon ×2 (attaque +20%)',
  'guide.recipes.4': '<b class="text-slate-200">Herbe à chat séchée</b> — Herbe à chat ×2 (nécessite la journée)',
  'guide.recipes.5': '<b class="text-slate-200">Pommade d\'herbes</b> — Herbes ×3 + Graisse de sanglier ×1',
  'guide.recipes.6': '<b class="text-slate-200">Thé à l\'herbe à chat</b> — Herbe à chat ×1 + Herbes ×1 (endurance +25, effet immédiat)',
  'guide.recipes.7': '<b class="text-slate-200">Potion d\'énergie</b> — Herbe à chat ×2 + Herbes ×2 + Graisse de sanglier ×1 (endurance +55, nécessite la compétence [Alchimie végétale])',
  'guide.recipes.8': '<b class="text-slate-200">Pendentif rubis de flamme</b> — Rubis ×1 + Arêtes ×2 + Tendon ×1 (attaque +40%)',
  'guide.recipes.9': '<b class="text-slate-200">Étoile de saphir</b> — Saphir ×1 + Arêtes ×2 + Tendon ×1 (attaque +25%, critique +12%)',
  'guide.recipes.10': '<b class="text-slate-200">Charme de jade</b> — Jade ×1 + Feuilles ×2 + Lianes ×2 (-6 dégâts par coup)',
  'guide.recipes.11': '<b class="text-slate-200">Armure de lianes</b> — Lianes ×3 + Feuilles ×2 + Lianes ×2 (-7 dégâts par coup, presque au sec sous la pluie)',
  'guide.recipes.12': '<b class="text-slate-200">Griffe de pierre</b> — Rubis ×1 + Tendon ×2 + Arêtes ×2 (attaque +8, gros boost de dégâts)',
  'guide.recipes.13': '<b class="text-slate-200">Potion de sang de dragon</b> — Herbe au sang de dragon ×2 + Herbes ×1 + Graisse de sanglier ×1 (restaure 60 PV, nécessite [Alchimie végétale])',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 Croissance & Compétences',
  'guide.growth.1': 'Chaque action octroie de l\'<b class="text-slate-200">EXP</b> — chasse, pêche, cueillette, animaux, défis, victoires de boss. À chaque niveau, +10 PV max, +6 Endurance max et +6 Humeur max sont ajoutés <b class="text-emerald-300">définitivement</b>, et la régénération d\'endurance accélère.',
  'guide.growth.2': 'Monter de niveau, gagner des défis et vaincre des boss octroient de l\'<b class="text-slate-200">EXP</b> ; mais <b class="text-amber-300">les points de compétence ne viennent que des niveaux</b> (+1 par niveau), planifie donc soigneusement. Investis librement dans les <b class="text-slate-200">cinq branches</b> du panneau 📈 : 🎯Chasse, 🛡️Survie, 🐈Lien, 💨Esquive, 🔨Artisanat.',
  'guide.growth.3': '<b class="text-slate-200">Instinct de chasseur</b> (dégâts), <b class="text-slate-200">Bond meurtrier</b> (portée de bond), <b class="text-slate-200">Fourrure épaisse</b> (réduction de dégâts), <b class="text-slate-200">Vitalité</b> (régénération d\'endurance), <b class="text-slate-200">Esquive agile</b> (taux d\'esquive) et <b class="text-slate-200">Maître artisan</b> (effets d\'artisanat) peuvent tous être <b class="text-amber-300">améliorés plusieurs fois</b>, avec un énorme potentiel de croissance.',
  'guide.growth.4': '<b class="text-slate-200">Alchimie végétale</b> débloque la <b class="text-slate-200">potion d\'énergie</b> ; le <b class="text-slate-200">thé à l\'herbe à chat</b> est aussi un excellent booster d\'endurance instantané — bois-en une gorgée quand ton endurance est au plus bas.',
  'guide.growth.5': '⚖️ <b class="text-amber-300">Difficulté dynamique</b> : la puissance des monstres, des boss et des défis <b class="text-slate-200">grandit avec ton niveau</b> (Plaines sauvages &lt; Quartier urbain &lt; Terres arides &lt; Forêt sombre, plus la zone est profonde, plus elle est dure) — même à haut niveau, reste vigilant ; défis et récompenses augmentent ensemble.',
  'guide.growth.6': '🐾 <b class="text-amber-300">Rythme de progression</b> : la densité de monstres augmente avec le niveau (+30% tous les 5 niveaux), les monstres <b class="text-slate-200">réapparaissent lentement</b> dans chaque zone, et la courbe d\'EXP reste douce — va dans les zones supérieures pour monter plus vite au lieu de camper une seule zone.',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ Zones & Boss',
  'guide.zones.1': 'Les <b class="text-slate-200">portails</b> en bord de carte mènent vers de nouvelles zones : <b class="text-slate-200">Quartier urbain</b>, <b class="text-slate-200">Terres arides</b> et <b class="text-slate-200">Forêt sombre</b> — <b class="text-emerald-300">aucune restriction de niveau</b>, va et viens librement.',
  'guide.zones.2': 'Chaque zone abrite un <b class="text-slate-200">boss</b> dans son <b class="text-slate-200">coin inférieur droit</b> : le sanglier géant (charges), le gamin au lance-pierre (cailloux à distance), le loup géant (morsures éclair), et le <b class="text-rose-300">cobra royal</b> — le boss final, immense, qui <b class="text-rose-300">crache du venin</b> (poison persistant) et <b class="text-rose-300">bondit de loin</b> (il se dresse avant de bondir). Il garde le <b class="text-amber-300">portail vers la zone suivante</b> — pour progresser, bats le boss d\'abord. Ils octroient beaucoup d\'EXP (les points de compétence ne viennent toujours que des niveaux).',
  'guide.zones.3': '🌋 <b class="text-slate-200">Terres arides</b> possèdent d\'immenses <b class="text-slate-200">cratères volcaniques</b> (la lave est infranchissable) et des <b class="text-slate-200">filons de gemmes</b> ; <b class="text-rose-300">les sources sont rares et la pluie presque inexistante</b> — hydrate-toi avec le <b class="text-slate-200">fruit de cactus</b>, et récolte l\'<b class="text-slate-200">herbe au sang de dragon</b> et des gemmes pour fabriquer du matériel puissant.',
  'guide.zones.4': '🌲 <b class="text-slate-200">Forêt sombre</b> est une longue <b class="text-slate-200">route</b> bordée d\'arbres infranchissables, <b class="text-sky-300">pluvieuse</b> — cueille des <b class="text-slate-200">lianes</b> pour tisser une <b class="text-slate-200">armure de lianes</b>, et méfie-toi des <b class="text-rose-300">singes</b> et <b class="text-rose-300">crocodiles</b> féroces, ainsi que des <b class="text-slate-200">reishis</b>.',
  'guide.zones.5': '🛏 Les <b class="text-slate-200">ruelles étroites</b> du quartier urbain et les <b class="text-slate-200">arbres creux</b> de la forêt sombre sont des abris où dormir — dors jusqu\'à l\'aube pour restaurer 40 PV et toute ton endurance.',
  'guide.zones.6': 'Une barre de vie de boss apparaît en haut de l\'écran quand un boss approche ; le bond est ta principale source de dégâts.',

  /* ============================================================ misc. 杂项 */
  'misc.title': 'Instinct sauvage : survie du chat siamois',
  'misc.north': 'N',
  'misc.cave': 'Grotte',
  'misc.spring': 'Source',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ Le ciel s\'éclaircit.',
  'log.weather.rain': '🌧️ Il commence à pleuvoir...',
  'log.weather.mist': '🌫️ Une brume légère s\'installe.',
  'log.boot.wake': '🐱 Tu te réveilles dans la nature. Fais confiance à ton instinct — appuie sur E pour renifler !',
  'log.boot.newJourney': '🌱 Une nouvelle aventure commence ! Tout repart de zéro.',
  'log.cave.idle': '🏕️ La grotte est calme et sûre. (Appuie sur F près du feu, du lit, de l\'établi ou de la sortie)',
  'log.cave.noPounce': '😺 Pas la place de bondir ici !',
  'log.cave.enter': '🕳️ Tu te glisses dans le refuge frais de la grotte.',
  'log.cave.exit': '🌤️ Tu retournes dans la nature.',
  'log.craft.workbench': '🛠 Tu prépares tes matériaux à l\'établi.',
  'log.craft.salmon': '🔥 Tu as fait griller un saumon au feu de camp !',
  'log.craft.dry': '🔥 Tu as séché ton pelage au feu — tout chaud !',
  'log.craft.fireIdle': '🔥 Le feu de camp crépite. (Apporte un saumon à cuire)',
  'log.craft.needSkill': '🔒 Compétence [{skill}] requise pour fabriquer.',   /* 插值: {skill} */
  'log.craft.done': '🔨 Objet fabriqué : {name} !',                           /* 插值: {name} */
  'log.bed.curl': '😴 Tu te blottis sur le lit de paille douce...',
  'log.bed.wake': '🌅 Tu te réveilles à l\'aube, en pleine forme. (+34 PV, endurance pleine)',
  'log.shelter.sleep': '😴 Tu te blottis dans l\'abri et t\'endors profondément...',
  'log.shelter.wake': '🌅 Tu te réveilles à l\'aube, en pleine forme ! (+40 PV, endurance pleine)',
  'log.zone.enter': '⛩ Tu es entré dans [{name}] !',                         /* 插值: {name} */
  'log.death': '☠️ Tu t\'effondres d\'épuisement... et te réveilles à l\'aube.',
  'log.stumble': '🐾 Tu trébuches, puis retrouves ton équilibre.',
  'log.pounce.water': '💦 Tu as failli tomber à l\'eau et regagné la rive à toute allure ! (pelage trempé)',
  'log.groom': '✨ Tu t\'es toiletté, tu te sens frais !',
  'log.catch': '🐾 Attrapé un {name} !',                                     /* 插值: {name} */
  'log.fish.run': '🎣 Attrapé un saumon au passage pendant la montaison !',
  'log.fish.none': '🐟 Pas de poisson au bord... si tu as soif, trouve une source (odeur cyan).',
  'log.combat.hit': '⚔️ Tu frappes {name} pour {dmg} dégâts{crit} !',        /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name} est vaincu.',                                /* 插值: {name} */
  'log.dodge': '💨 Tu esquives l\'attaque avec agilité !',
  'log.crit.bang': 'CRITIQUE !',
  'log.crit.wrap': '(critique !)',
  'log.damage': '💔 Tu subis {n} dégâts !',                                  /* 插值: {n} */
  'log.footsteps': '👂 Des pas se rapprochent...',
  'log.pred.alert': '⚠️ Un {name} t\'a repéré !',                            /* 插值: {name} */
  'log.poison.venom': '💚 Le venin t\'éclabousse ! (-{dmg} PV, empoisonné !)', /* 插值: {dmg} */
  'log.poison.tick': '💚 Le poison fait effet ! -{n} PV',                    /* 插值: {n} */
  'log.poison.gone': '🌿 Le poison se dissipe, tu récupères.',
  'log.level.up': '🎉 Niveau supérieur ! Tu es maintenant niveau {level} ! (+1 point de compétence)', /* 插值: {level} */
  'log.skill.point': '📌 +{n} point(s) de compétence ! (maintenant {points})', /* 插值: {n} {points} */
  'log.skill.none': '📖 Compétence inconnue !',
  'log.skill.maxed': '📖 {name} est déjà au niveau max (Nv.{max}) !',        /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 Pas assez de points de compétence — seuls les niveaux en donnent.',
  'log.skill.learned': '⭐ Compétence apprise : {name} Nv.{lv}/{max} ! (-1 point de compétence)', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 Livre de compétence trouvé : {name} ! (lis-le dans ton sac)', /* 插值: {name} */
  'log.skill.readBook': '📖 Tu lis un vieux livre de compétence : +40 EXP ! (les points de compétence ne viennent que des niveaux)',
  'log.equip.off': '⬇️ Tu retires {name} (toujours dans ton sac).',         /* 插值: {name} */
  'log.equip.on': '⬆️ Tu équipes {name} !',                                 /* 插值: {name} */
  'log.zoomies': '😵‍💫 Herbe à chat !! COURSE FOLLE !!! {name} !',            /* 插值: {name} */
  'log.item.use': '😋 Tu utilises {name}.',                                  /* 插值: {name} */
  'log.drop.jade': '💎 Un jade tombe du nid du singe !',
  'log.drop.sapphire': '💎 Un saphir est incrusté dans la peau du crocodile !',
  'log.dog.bite': '🐕 Un chien errant t\'a mordu ! (-{dmg} PV)',             /* 插值: {dmg} */
  'log.dog.bark': '🐕 Un chien errant aboie et te poursuit !',
  'log.dog.hit': '🐕 Tu frappes le chien errant — {crit}il fuit la queue entre les jambes !', /* 插值: {crit} */
  'log.dog.defeated': '💀 Tu as chassé le chien errant. (+tendon +12 EXP)',
  'log.boss.boar.charge': '🐗 Le sanglier géant charge vers toi !',
  'log.boss.boar.hit': '🐗 Le sanglier géant t\'envoie voler ! (-{dmg} PV)', /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 Le loup géant te mord ! (-{dmg} PV)',             /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 Le cobra royal crache un jet de venin !',
  'log.boss.cobra.leap': '🐍 Le cobra royal bondit telle une flèche !',
  'log.boss.cobra.leapHit': '🐍 Le bond du cobra te fracasse ! (-{dmg} PV, empoisonné !)', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 Le cobra royal se recroqueville et se redresse... (il va cracher !)',
  'log.boss.cobra.leapWindup': '🐍 Le cobra royal s\'arrête et enroule son corps... (il va bondir !)',
  'log.boss.cobra.bite': '🐍 Le cobra te mord ! (-{dmg} PV, empoisonné !)',  /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 Le gamin tire un caillou avec son lance-pierre !',
  'log.boss.kid.hit': '💢 Tu es touché par un caillou ! (-{dmg} PV)',       /* 插值: {dmg} */
  'log.boss.crit': '💥 Coup critique sur [{name}] ! {dmg} dégâts !',        /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 Tu as vaincu [{name}] ! Énorme EXP !',           /* 插值: {name} */
  'log.boss.respawn': '⚠️ [{name}] a réapparu dans l\'arène !',             /* 插值: {name} */
  'log.feature.berry': '🍓 Tu manges des baies sauvages. (+rassasiement, +2 PV)',
  'log.feature.catnip': '🌿 Herbe à chat fraîche récoltée.',
  'log.feature.herbs': '🌼 Herbes cueillies.',
  'log.feature.cactus': '🌵 Tu casses un fruit de cactus — nectar du désert !',
  'log.feature.dragonherb': '🌹 Tu cueilles une herbe au sang de dragon cramoisie, très puissante !',
  'log.feature.reishi': '🍄 Tu cueilles un reishi sur l\'arbre ancien, luisant de pouvoir.',
  'log.feature.vine': '🪵 Tu coupes une liane résistante.',
  'log.feature.spring': '💧 Tu bois à la source limpide.',
  'log.feature.gem': '💎 Gemme extraite : {name} ! (réapparaît dans 60 s)', /* 插值: {name} */
  'log.feature.trash': '🗑 Tu as déniché {name} dans les poubelles !',       /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 La poubelle est vide...',
  'log.feature.forest': '🍂 Tu ramasses des matériaux dans la forêt.',
  'log.feature.nothing': '😺 Rien à interagir ici...',
  'log.companion.warn': '🐈 {name} siffle : un prédateur approche !',        /* 插值: {name} */
  'log.companion.gift': '🎁 {name} t\'apporte {gift} !',                    /* 插值: {name} {gift} */
  'log.pet': '🐾 Tu caresses {name} — il ronronne de contentement. (+{n} ♥)', /* 插值: {name} {n} */
  'log.pet.first': '😺 {name} s\'attache à toi — continue de le caresser, ou nourris-le depuis le menu chat pour devenir amis plus vite !', /* 插值: {name} */
  'log.pet.ready': '💗 {name} est prêt à devenir ton ami — adopte-le depuis le menu chat !', /* 插值: {name} */
  'log.feed.none': '🍽️ Tu n\'as pas de nourriture à partager pour l\'instant (saumon, saumon grillé ou souris).',
  'log.feed': '🍖 Tu donnes {item} à {name} ! (+{n} ♥)',                    /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 {name} adore ! Continue et il te fera confiance.',  /* 插值: {name} */
  'log.adopt.notReady': '💭 {name} n\'est pas encore prêt — continue de caresser et de nourrir (60 ♥ requis).', /* 插值: {name} */
  'log.adopt.ok': '🎉 {name} est maintenant ton ami ! Il te suivra partout.', /* 插值: {name} */
  'log.perk.warn': '🐈 {name} te préviendra désormais du danger !',         /* 插值: {name} */
  'log.perk.hunt': '🐈 {name} chassera désormais à tes côtés (+dégâts) !',  /* 插值: {name} */
  'log.summon.end': '🐈 {name} a fini de combattre et revient près de toi.', /* 插值: {name} */
  'log.summon.cd': '📣 Invocation en rechargement ({n} s)',                 /* 插值: {n} */
  'log.summon.none': '😿 Tu n\'as pas de chat partenaire — adopte d\'abord un chat errant !',
  'log.summon.ok': '📣 {name} répond à l\'appel et combat à tes côtés ! (rechargement {n} min)', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 {name} bondit sur l\'ennemi ! ({dmg} dégâts)',  /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ Des chats rivaux envahissent ton territoire — bondis pour les chasser !',
  'log.challenge.rival.hit': '🐈‍⬛ Tu repousses un chat rival !',
  'log.challenge.rival.fled': '💨 Les chats rivaux fuient !',
  'log.challenge.rival.mark': '⚠️ Un chat rival marque ton territoire !',
  'log.challenge.rival.swat': '🐈‍⬛ Un chat rival te griffe ! (-{n} PV)',   /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ Les chats rivaux ont pris une partie de ton territoire ! Ils ont volé {name} !', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ Les chats rivaux ont pris une partie de ton territoire ! Ton humeur s\'effondre...',
  'log.challenge.rival.win': '🏆 Tu as chassé les chats rivaux ! (+{n} humeur)', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 Un chat rival a lâché un tendon !',
  'log.challenge.dog.start': '🐕 Un chien sauvage te poursuit — cours !',
  'log.challenge.dog.stun': '🐕 Whimper ! Tu as étourdi le chien sauvage — cours !',
  'log.challenge.dog.bite': '🐕 Le chien sauvage te mord ! (-{n} PV)',     /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 Le chien sauvage t\'a bien amoché...',
  'log.challenge.dog.bark': '🐕 Ouaf ! Ouaf !',
  'log.challenge.dog.win': '🏆 Tu as échappé au chien sauvage ! (+{n} endurance)', /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ Orage et foudre — trouve un abri !',
  'log.challenge.storm.hit': '⚡ La foudre frappe près de toi ! (-{n} PV)', /* 插值: {n} */
  'log.challenge.storm.far': '⚡ Un éclair explose non loin !',
  'log.challenge.storm.safe': '⚡ La tempête fait rage dehors — la grotte est sûre.',
  'log.challenge.storm.warn': '⚡ La foudre va tomber ! Trouve un abri !',
  'log.challenge.storm.win': '🏆 Tu as survécu à la tempête ! (+{n} humeur)', /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 Montaison du saumon ! Pêche au bord de la rivière — prise garantie !',
  'log.challenge.salmon.win': '🏆 La montaison est finie — belle prise !',
  'log.challenge.viper.start': '🐍 Des vipères t\'encerclent — repousse-les !',
  'log.challenge.viper.kill': '💀 Tu as écrasé une vipère ! (+herbes)',
  'log.challenge.viper.bite': '🐍 Une vipère te mord ! (-{n} PV)',         /* 插值: {n} */
  'log.challenge.viper.win': '🏆 Tu as repoussé les vipères ! (+{n} humeur)', /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 Une meute de loups t\'épie — riposte ou fuis !',
  'log.challenge.wolf.kill': '💀 Tu as abattu un loup ! (+18 EXP)',
  'log.challenge.wolf.stagger': '🐺 Le loup vacille !',
  'log.challenge.wolf.bite': '🐺 Un loup te mord ! (-{n} PV)',             /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 Tu as survécu à la meute ! (+10 humeur)',
  'log.challenge.stampede.start': '🐗 Charge de sangliers ! Évite les sangliers en pleine course !',
  'log.challenge.stampede.hit': '🐗 Un sanglier en charge te piétine ! (-{n} PV)', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 Tu as évité la charge ! (+{n} humeur)', /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 Un aigle tournoie au-dessus — esquive son piqué !',
  'log.challenge.eagle.hit': '🦅 Les serres de l\'aigle te griffent ! (-{n} PV)', /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 L\'aigle pique à côté de toi !',
  'log.challenge.eagle.dive': '🦅 L\'aigle commence son piqué — sors de l\'ombre !',
  'log.challenge.eagle.win': '🏆 L\'aigle s\'est envolé ! (+{n} humeur)',   /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ Brouillard épais — trouve la balise {name} et échappe-toi avant la fin du temps !', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 Tu as trouvé ton chemin dans le brouillard ! (+{n} humeur)', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ Perdu dans le brouillard... mouillé et glacé. (-6 humeur)',
};
