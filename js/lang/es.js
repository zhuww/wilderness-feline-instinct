/* ==========================================================================
   Wilderness Feline Instinct — lang/es.js
   西班牙语（Español）字典：全部 key → 西班牙语译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.es = {

  /* ============================================================ ui. HUD/面板/按钮 */
  'ui.hud.time': '{icon} {time} · Día {day}',               /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ Despejado',
  'ui.hud.weather.rain': '🌧️ Lluvia',
  'ui.hud.weather.mist': '🌫️ Niebla',
  'ui.hud.zone': '⛩ {name}',                                /* 插值: {name} */
  'ui.hud.compass': 'Instinto',
  'ui.hud.xp': 'EXP',
  'ui.hud.level': 'Nv {n}',                                 /* 插值: {n} */
  'ui.hud.summon.none': '📣 Sin gato compañero',
  'ui.hud.summon.ready': '📣 Listo (R)',
  'ui.hud.summon.cd': '📣 {n}s',                            /* 插值: {n} */
  'ui.hud.bossDefault': '👹 Jefe',
  'ui.hud.boss': '👹 {name}',                               /* 插值: {name} */

  'ui.meter.hp': 'PV',
  'ui.meter.satiety': 'Saciedad',
  'ui.meter.hydration': 'Hidratación',
  'ui.meter.stamina': 'Resistencia',
  'ui.meter.mood': 'Ánimo',
  'ui.meter.wetness': 'Humedad',

  'ui.btn.growth': 'Crecimiento y Habilidades',
  'ui.btn.guide': 'Guía de Supervivencia (G)',
  'ui.btn.inv': 'Inventario (I)',
  'ui.btn.friends': 'Amigos Felinos (B)',
  'ui.btn.sound': 'Activar/Desactivar Sonido',
  'ui.btn.reset': 'Nueva Partida',
  'ui.btn.lang': '🌐 {lang}',                               /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> Moverse · <b class="text-white">Shift</b> Sigilo · <b class="text-white">Espacio</b> Salto · <b class="text-white">E</b> Olfatear · <b class="text-white">Q</b> Acicalarse · <b class="text-white">F</b> Interactuar',

  'ui.touch.pounce': 'Salto',
  'ui.touch.sniff': 'Olfatear',
  'ui.touch.groom': 'Acicalarse',
  'ui.touch.interact': 'Interactuar',
  'ui.touch.sneak': '🦎 Sigilo',
  'ui.touch.sneakTitle': 'Cambiar Sigilo',
  'ui.touch.summon': '📣 Invocar Compañero',
  'ui.touch.summonTitle': 'Invocar Gato Compañero (R)',

  'ui.catmenu.title': 'Acciones del Gato',
  'ui.catmenu.pet': '🐾 Acariciar',
  'ui.catmenu.feed': '🍖 Alimentar',
  'ui.catmenu.adopt': '🤝 Adoptar',
  'ui.catmenu.adopted': '🤝 Adoptado',

  'ui.modal.inv.title': '🎒 Mochila y Fabricación',
  'ui.modal.friends.title': '🐈 Amigos Felinos',
  'ui.modal.guide.title': '📖 Guía de Supervivencia',
  'ui.modal.growth.title': '📈 Crecimiento y Habilidades',

  'ui.tab.inv': 'Mochila',
  'ui.tab.craft': 'Fabricar',

  'ui.inv.empty': 'Tu mochila está vacía: recolecta, pesca y caza para llenarla.',
  'ui.inv.use': 'Usar',
  'ui.inv.equip': 'Equipar',
  'ui.inv.unequip': 'Quitar',
  'ui.inv.read': '📖 Leer',
  'ui.inv.equipped': '● Equipado',

  'ui.craft.locked': '🔒 Bloqueado',
  'ui.craft.needSkill': 'Requiere habilidad: {skill}',       /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 Solo de día',
  'ui.craft.craft': 'Fabricar',

  'ui.confirm.reset': '¿Empezar una nueva partida? Se borrará tu guardado actual.',
  'ui.confirm.resetTitle': '🆕 Nueva partida',
  'ui.confirm.resetDesc': 'Se borrará todo tu progreso (nivel, habilidades, objetos, compañeros, progreso de zona) y se generará un mundo completamente nuevo. ¡Esta acción no se puede deshacer!',
  'ui.confirm.ok': '🎮 Nueva partida',
  'ui.confirm.cancel': 'Cancelar',

  'ui.friends.intro': 'Acércate a un gato callejero y pulsa <b class="text-slate-200">F</b> para acariciarlo: aparecerá un menú sobre su cabeza donde puedes <b class="text-slate-200">alimentarlo</b> (salmón/ratón) y <b class="text-slate-200">adoptarlo</b> (amistad en <b class="text-pink-300">60 ♥</b>). El olor rosa marca dónde están los gatos.',
  'ui.friends.yourPets': '🐾 Tus Mascotas ({n})',            /* 插值: {n} */
  'ui.friends.noPets': 'Aún no tienes mascotas: alimenta a un callejero hasta 60 ♥ y ¡adóptalo!',
  'ui.friends.strays': '🐈 Callejeros ({n})',                /* 插值: {n} */
  'ui.friends.unknown': 'Quedan {n} gatos callejeros en la naturaleza: sigue el olor rosa para encontrarlos.', /* 插值: {n} */
  'ui.friends.none': 'Aún no hay gatos cerca. Pulsa E para olfatear y sigue los rastros de olor rosa.',
  'ui.friends.status.adopted': 'Amigo ❤️',
  'ui.friends.status.adoptable': 'Adoptable: acércate y pulsa F.',
  'ui.friends.status.approaching': '{n}/60 ♥ Adoptable',     /* 插值: {n} */
  'ui.friends.status.shy': 'Tímido: acarícialo primero',
  'ui.friends.friendship.best': '❤️ Mejor Amigo',
  'ui.friends.friendship.percent': '♥ {n}%',                 /* 插值: {n} */
  'ui.friends.friendship.shy': '— Tímido —',

  'ui.perk.mood': 'Aura de Ánimo',
  'ui.perk.warn': 'Alerta de Peligro',
  'ui.perk.hunt': 'Asistencia de Caza',

  'ui.branch.hunt': '🎯 Caza',
  'ui.branch.survive': '🛡️ Supervivencia',
  'ui.branch.bond': '🐈 Vínculo',
  'ui.branch.dodge': '💨 Esquiva',
  'ui.branch.craft': '🔨 Fabricación',

  'ui.skill.maxed': 'Máximo',
  'ui.skill.upgrade': 'Mejorar',
  'ui.skill.learn': 'Aprender',
  'ui.skill.lv': 'Nv.{lv}/{max}',                            /* 插值: {lv} {max} */

  'ui.growth.skillPoints': 'Puntos de Habilidad: {n}',       /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} EXP',                       /* 插值: {xp} {need} */
  'ui.growth.bonus': 'Bonus de nivel: +{hp} PV máx · +{st} Resistencia máx · +{mood} Ánimo máx · +{regen}% de regeneración de resistencia', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': 'Prob. de crítico por ánimo: <b class="text-amber-300">{pct}%</b> (mejor ánimo = más críticos, daño doble)', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': 'Los puntos de habilidad solo se obtienen al subir de nivel (+1 por nivel); planifica tu build con cuidado. Instinto de Cazador / Salto Letal / Pelaje Grueso / Vitalidad / Esquiva Ágil / Maestro Artesano se pueden mejorar varias veces.',
  'ui.growth.skillTree': '📖 Árbol de Habilidades ({n} puntos invertidos)', /* 插值: {n} */
  'ui.growth.journey': '🌱 Trayectoria',

  'ui.journey.days': 'Días Sobrevividos',
  'ui.journey.prey': 'Presas Cazadas',
  'ui.journey.predators': 'Depredadores Abatidos',
  'ui.journey.fish': 'Peces Pesados',
  'ui.journey.pets': 'Mascotas Adoptadas',
  'ui.journey.challenges': 'Desafíos Ganados',
  'ui.journey.xp': 'EXP Total',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': 'Pradera Salvaje',
  'zone.1': 'Barrio Urbano',
  'zone.2': 'Páramo Seco',
  'zone.3': 'Bosque Oscuro',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': 'Jabalí Gigante',
  'boss.1': 'Niño del Tirachinas',
  'boss.2': 'Lobo Gigante',
  'boss.3': 'Cobra Real',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': 'Jabalí',
  'enemy.fox': 'Zorro',
  'enemy.viper': 'Víbora',
  'enemy.monkey': 'Mono',
  'enemy.croc': 'Cocodrilo',
  'enemy.mouse': 'Ratón de Campo',
  'enemy.grasshopper': 'Saltamontes',
  'enemy.salmon': 'Salmón',
  'enemy.straydog': 'Perro Callejero',
  'enemy.rival': 'Gato Rival',
  'enemy.dog': 'Perro Salvaje',
  'enemy.wolf': 'Lobo',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': 'Bayas Silvestres',
  'item.berry.desc': 'Bayas dulces del bosque que restauran un poco de PV.',
  'item.mouse.name': 'Ratón de Campo',
  'item.mouse.desc': 'Un ratón regordete que restaura resistencia.',
  'item.grasshopper.name': 'Saltamontes',
  'item.grasshopper.desc': 'Un pequeño saltador crujiente.',
  'item.salmon.name': 'Salmón',
  'item.salmon.desc': 'Salmón recién pescado, rico en nutrientes.',
  'item.cooked_salmon.name': 'Salmón Asado',
  'item.cooked_salmon.desc': 'Ahumado, tierno y jugoso: un verdadero festín.',
  'item.catnip.name': 'Hierba Gatera Fresca',
  'item.catnip.desc': 'Revitaliza al instante.',
  'item.dried_catnip.name': 'Hierba Gatera Seca',
  'item.dried_catnip.desc': '¡El doble de potencia!',
  'item.herbs.name': 'Hierbas',
  'item.herbs.desc': 'Hierbas silvestres calmantes.',
  'item.leaves.name': 'Hojas',
  'item.leaves.desc': 'Hojas verdes y anchas.',
  'item.vines.name': 'Enredaderas',
  'item.vines.desc': 'Enredaderas fuertes y flexibles.',
  'item.fishbone.name': 'Espina de Pescado',
  'item.fishbone.desc': 'Una espina limpia y blanca.',
  'item.sinew.name': 'Tendón',
  'item.sinew.desc': 'Un tendón animal resistente.',
  'item.fat.name': 'Grasa de Jabalí',
  'item.fat.desc': 'Grasa espesa y aceitosa.',
  'item.herb_salve.name': 'Pomada de Hierbas',
  'item.herb_salve.desc': 'Aplícala en las heridas para restaurar 32 PV.',
  'item.leaf_hat.name': 'Sombrero de Hojas',
  'item.leaf_hat.desc': 'Te mantiene seco bajo la lluvia; -2 de daño por golpe (defensa).',
  'item.fishbone_collar.name': 'Collar de Espinas',
  'item.fishbone_collar.desc': 'Ataque +3 (+1 por nivel de artesano); los callejeros confían en ti más rápido.',
  'item.cat_tooth_necklace.name': 'Collar de Diente de Gato',
  'item.cat_tooth_necklace.desc': 'Ataque +20% (+4% por nivel de artesano): inflige más daño a los enemigos.',
  'item.catnip_tea.name': 'Té de Hierba Gatera',
  'item.catnip_tea.desc': 'Una taza caliente restaura 25 de resistencia al instante.',
  'item.energy_potion.name': 'Poción de Energía',
  'item.energy_potion.desc': 'Esencia alquímica que restaura 55 de resistencia al instante.',
  'item.gem_ruby.name': 'Rubí',
  'item.gem_ruby.desc': 'Un rubí ardiente forjado en lava volcánica: material precioso.',
  'item.gem_sapphire.name': 'Zafiro',
  'item.gem_sapphire.desc': 'Un zafiro profundo de aguas oscuras: material precioso.',
  'item.gem_jade.name': 'Jade',
  'item.gem_jade.desc': 'Un jade esmeralda nacido de raíces antiguas: material precioso.',
  'item.flame_ruby_pendant.name': 'Colgante de Rubí Llameante',
  'item.flame_ruby_pendant.desc': 'Ataque +40% (+8% por nivel de artesano): más fuerte que el Collar de Diente de Gato.',
  'item.sapphire_star.name': 'Estrella de Zafiro',
  'item.sapphire_star.desc': 'Ataque +25% y probabilidad de crítico +12%.',
  'item.jade_charm.name': 'Amuleto de Jade',
  'item.jade_charm.desc': '-6 de daño por golpe (-1 por nivel de artesano): duro como el jade.',
  'item.cactus_fruit.name': 'Fruta de Cactus',
  'item.cactus_fruit.desc': 'Un oasis del desierto: +30 de hidratación.',
  'item.dragon_herb.name': 'Hierba de Sangre de Dragón',
  'item.dragon_herb.desc': 'Una hierba carmesí de las grietas volcánicas; cómela para restaurar 18 PV.',
  'item.reishi.name': 'Reishi',
  'item.reishi.desc': 'Un elixir de árboles antiguos: restaura 12 PV y +10 de ánimo.',
  'item.vine_strand.name': 'Bejuco',
  'item.vine_strand.desc': 'Bejucos resistentes del Bosque Oscuro: material para armaduras.',
  'item.vine_armor.name': 'Armadura de Enredaderas',
  'item.vine_armor.desc': '-7 de daño por golpe (-1 por nivel de artesano); casi no te mojas con la lluvia.',
  'item.stone_claw.name': 'Garra de Piedra',
  'item.stone_claw.desc': 'Ataque +8 (+2 por nivel de artesano): garras incrustadas con astillas de gema.',
  'item.dragon_potion.name': 'Poción de Sangre de Dragón',
  'item.dragon_potion.desc': 'Esencia de sangre de dragón hirviendo, restaura 60 PV al instante.',
  'item.book_hunter.name': 'Instinto de Cazador',
  'item.book_hunter.desc': 'Daño de salto +15%, mayor rango de captura.',
  'item.book_swift.name': 'Garras Veloces',
  'item.book_swift.desc': 'Velocidad de movimiento +10%, regeneración de resistencia +25%.',
  'item.book_thick.name': 'Pelaje Grueso',
  'item.book_thick.desc': 'Daño recibido -25%.',
  'item.book_keen.name': 'Olfato Agudo',
  'item.book_keen.desc': 'Alcance de olfateo +40%, rastros de olor más densos.',
  'item.book_brave.name': 'Corazón Valiente',
  'item.book_brave.desc': 'Ánimo máximo +25%, recompensas de desafíos +50%.',
  'item.book_angler.name': 'Cola de Pescador',
  'item.book_angler.desc': 'La pesca siempre tiene éxito.',
  'item.book_guardian.name': 'Poder Guardián',
  'item.book_guardian.desc': 'Ganancia de amistad +50%, asistencia de caza +4.',
  'item.book_camo.name': 'Camuflaje de Hojas',
  'item.book_camo.desc': 'La ocultación en hierba alta se duplica; el sigilo gasta menos resistencia.',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': 'Sombrero de Hojas',
  'recipe.leaf_hat.desc': 'Te mantiene seco bajo la lluvia; -2 de daño por golpe (defensa).',
  'recipe.fishbone_collar.name': 'Collar de Espinas',
  'recipe.fishbone_collar.desc': 'Ataque +3; los callejeros confían en ti más rápido.',
  'recipe.cat_tooth_necklace.name': 'Collar de Diente de Gato',
  'recipe.cat_tooth_necklace.desc': 'Ataque +20%, inflige más daño a los enemigos.',
  'recipe.dried_catnip.name': 'Hierba Gatera Seca',
  'recipe.dried_catnip.desc': 'Potente estímulo: necesita secarse de día.',
  'recipe.herb_salve.name': 'Pomada de Hierbas',
  'recipe.herb_salve.desc': 'Aplícala en las heridas para restaurar 32 PV.',
  'recipe.catnip_tea.name': 'Té de Hierba Gatera',
  'recipe.catnip_tea.desc': 'Resistencia +25, efecto inmediato.',
  'recipe.energy_potion.name': 'Poción de Energía',
  'recipe.energy_potion.desc': 'Resistencia +55. Requiere la habilidad [Alquimia Herbolaria].',
  'recipe.flame_ruby_pendant.name': 'Colgante de Rubí Llameante',
  'recipe.flame_ruby_pendant.desc': 'Ataque +40%: accesorio de primera.',
  'recipe.sapphire_star.name': 'Estrella de Zafiro',
  'recipe.sapphire_star.desc': 'Ataque +25%, crítico +12%.',
  'recipe.jade_charm.name': 'Amuleto de Jade',
  'recipe.jade_charm.desc': '-6 de daño por golpe.',
  'recipe.vine_armor.name': 'Armadura de Enredaderas',
  'recipe.vine_armor.desc': 'Defensa -7, casi no te mojas con la lluvia.',
  'recipe.stone_claw.name': 'Garra de Piedra',
  'recipe.stone_claw.desc': 'Ataque +8: un gran aumento de daño.',
  'recipe.dragon_potion.name': 'Poción de Sangre de Dragón',
  'recipe.dragon_potion.desc': 'Restaura 60 PV al instante. Requiere [Alquimia Herbolaria].',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': 'Instinto de Cazador',
  'skill.hunter.desc': 'Por nivel: daño de salto +15%, mayor rango de captura',
  'skill.leap.name': 'Salto Letal',
  'skill.leap.desc': 'Por nivel: alcance de salto +20% (máx. +60%)',
  'skill.keen.name': 'Olfato Agudo',
  'skill.keen.desc': 'Alcance de olfateo +40%, rastros más densos',
  'skill.angler.name': 'Cola de Pescador',
  'skill.angler.desc': 'La pesca siempre tiene éxito',
  'skill.swift.name': 'Garras Veloces',
  'skill.swift.desc': 'Por nivel: velocidad +10 % (máx. +30 %), regeneración de resistencia +8 %',
  'skill.thick.name': 'Pelaje Grueso',
  'skill.thick.desc': 'Por nivel: daño recibido -12% (máx. -47%)',
  'skill.camo.name': 'Camuflaje de Hojas',
  'skill.camo.desc': 'Ocultación en hierba alta duplicada; el sigilo gasta menos resistencia',
  'skill.vitality.name': 'Vitalidad',
  'skill.vitality.desc': 'Por nivel: velocidad de regeneración de resistencia +30% (máx. +150%)',
  'skill.guardian.name': 'Poder Guardián',
  'skill.guardian.desc': 'Ganancia de amistad +50%, asistencia de caza +4',
  'skill.brave.name': 'Corazón Valiente',
  'skill.brave.desc': 'Ánimo máximo +25%, recompensas de desafíos +50%',
  'skill.summon.name': 'Invocación Reforzada',
  'skill.summon.desc': 'Duración de invocación 25→40 s, enfriamiento 5→3 min',
  'skill.dodge.name': 'Esquiva Ágil',
  'skill.dodge.desc': 'Por nivel: 6% de probabilidad de esquivar todo el daño (máx. 30%)',
  'skill.agile.name': 'Ligero como una Pluma',
  'skill.agile.desc': 'Coste de resistencia del salto -40%, enfriamiento -0,2 s',
  'skill.craft.name': 'Maestro Artesano',
  'skill.craft.desc': 'Por nivel: efectos de objetos fabricados +20%, también los bonus de equipo',
  'skill.alchemist.name': 'Alquimia Herbolaria',
  'skill.alchemist.desc': 'Desbloquea recetas poderosas como la Poción de Energía',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ Desafío',
  'challenge.rival.title': '🐈‍⬛ Invasión de Territorio',
  'challenge.rival.desc': '¡Los gatos rivales se están apoderando de tu territorio: salta para ahuyentarlos!',
  'challenge.dog.title': '🐕 ¡Perro en Persecución!',
  'challenge.dog.desc': '¡Corre! Escóndete en la hierba alta o huye a una cueva.',
  'challenge.storm.title': '⛈️ Tormenta Eléctrica',
  'challenge.storm.desc': '¡Busca refugio de los rayos rápido!',
  'challenge.salmon.title': '🐟 Remonte del Salmón',
  'challenge.salmon.desc': 'Pesca junto al río: ¡captura garantizada!',
  'challenge.viper.title': '🐍 Enjambre de Víboras',
  'challenge.viper.desc': '¡Repele a las víboras!',
  'challenge.wolf.title': '🐺 ¡Manada de Lobos!',
  'challenge.wolf.desc': '¡La manada te está cazando: contraataca o huye a una cueva!',
  'challenge.stampede.title': '🐗 ¡Estampida de Jabalíes!',
  'challenge.stampede.desc': '¡Esquiva a los jabalíes en estampida!',
  'challenge.eagle.title': '🦅 ¡Picado de Águila!',
  'challenge.eagle.desc': '¡Vigila las sombras del suelo: esquiva el picado del águila!',
  'challenge.fog.title': '🌫️ ¡Perdido en la Niebla!',
  'challenge.fog.desc': '¡Encuentra la baliza (cueva o manantial) antes de que se acabe el tiempo!',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                               /* 插值: {name} */
  'feature.prompt.gate': 'Ir a {name}',                      /* 插值: {name} */
  'feature.prompt.berry': 'Comer Bayas',
  'feature.prompt.pickup': 'Recoger',
  'feature.prompt.spring': 'Beber',
  'feature.prompt.gem': 'Extraer Gema',
  'feature.prompt.harvest': 'Cosechar',
  'feature.prompt.vine': 'Cortar Bejuco',
  'feature.prompt.sleep': 'Dormir',
  'feature.prompt.trash': 'Revolver Basura',
  'feature.prompt.enter': 'Entrar',
  'feature.prompt.fish': 'Pescar',
  'feature.prompt.pet': 'Acariciar',
  'feature.prompt.workbench': 'F — Fabricar Objetos',
  'feature.prompt.fire': 'F — Cocinar / Secar',
  'feature.prompt.bed': 'F — Dormir hasta el Amanecer',
  'feature.prompt.exit': 'F — Salir de la Cueva',
  'feature.shelter.hollow': '🛏 Refugio del Árbol Hueco',
  'feature.shelter.alley': '🛏 Refugio del Callejón',
  'feature.beacon': '📍 Baliza {name}',                      /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 Controles',
  'guide.controls.move': '<b class="text-slate-200">WASD / Flechas</b> — Moverse',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — Sigilo (escóndete en la hierba alta)',
  'guide.controls.pounce': '<b class="text-slate-200">Espacio</b> — Salto / Atacar',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — Olfatear (rastros de olor)',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — Acicalarse (+ánimo)',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — Interactuar / Acariciar / Pescar',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — Invocar gato compañero (enfriamiento de 5 min)',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — Abrir paneles',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — Cerrar panel',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 Instinto Olfativo',
  'guide.smell.p1': 'Pulsa <b class="text-slate-200">E</b> y los rastros de olor de colores que trae el viento te dirán qué hay a tu alrededor:',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">Cian</b> — manantiales de agua limpia',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">Dorado</b> — presas: ratones, salmones, saltamontes',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">Rosa</b> — gatos callejeros amistosos',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">Rojo</b> — depredadores: jabalíes, víboras, zorros',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">Naranja</b> — gatos rivales invadiendo tu territorio',
  'guide.smell.p2': 'La <b class="text-slate-200">brújula «Instinto»</b> de arriba siempre apunta a la fuente de olor más cercana.',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 Consejos de Supervivencia',
  'guide.tips.1': 'Bebe en un <b class="text-slate-200">manantial</b> (cian) y pesca en la orilla del río con <b class="text-slate-200">F</b>.',
  'guide.tips.2': 'La lluvia empapa tu pelaje: el <b class="text-slate-200">pelo mojado</b> frena la regeneración de resistencia. Fabrica un <b class="text-slate-200">Sombrero de Hojas</b> o sécate junto al fuego de la cueva.',
  'guide.tips.3': 'Muévete en sigilo por la <b class="text-slate-200">hierba alta</b> para evitar depredadores y luego salta para el golpe final.',
  'guide.tips.4': 'Las cuevas son refugios seguros: duerme en la cama hasta el amanecer para recuperar PV y asa salmón junto al fuego.',
  'guide.tips.5': 'Pulsa <b class="text-slate-200">Q</b> para acicalarte y subir el ánimo; un ánimo muy bajo te debilita.',
  'guide.tips.6': 'Hazte amigo de los callejeros (rosa): con amistad alta te avisarán del peligro y lucharán a tu lado.',
  'guide.tips.7': 'La hierba gatera es un estimulante muy potente... pero provoca "locura corredora". Úsala con cuidado.',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 Recetas de Fabricación',
  'guide.recipes.1': '<b class="text-slate-200">Sombrero de Hojas</b> — Hojas ×3 + Enredaderas ×2 (defensa: -2 de daño por golpe)',
  'guide.recipes.2': '<b class="text-slate-200">Collar de Espinas</b> — Espinas ×3 + Tendón ×1 (ataque +3, ganancia de amistad +50%)',
  'guide.recipes.3': '<b class="text-slate-200">Collar de Diente de Gato</b> — Espinas ×4 + Tendón ×2 (ataque +20%)',
  'guide.recipes.4': '<b class="text-slate-200">Hierba Gatera Seca</b> — Hierba Gatera ×2 (necesita día)',
  'guide.recipes.5': '<b class="text-slate-200">Pomada de Hierbas</b> — Hierbas ×3 + Grasa de Jabalí ×1',
  'guide.recipes.6': '<b class="text-slate-200">Té de Hierba Gatera</b> — Hierba Gatera ×1 + Hierbas ×1 (resistencia +25, efecto inmediato)',
  'guide.recipes.7': '<b class="text-slate-200">Poción de Energía</b> — Hierba Gatera ×2 + Hierbas ×2 + Grasa de Jabalí ×1 (resistencia +55, requiere [Alquimia Herbolaria])',
  'guide.recipes.8': '<b class="text-slate-200">Colgante de Rubí Llameante</b> — Rubí ×1 + Espinas ×2 + Tendón ×1 (ataque +40%)',
  'guide.recipes.9': '<b class="text-slate-200">Estrella de Zafiro</b> — Zafiro ×1 + Espinas ×2 + Tendón ×1 (ataque +25%, crítico +12%)',
  'guide.recipes.10': '<b class="text-slate-200">Amuleto de Jade</b> — Jade ×1 + Hojas ×2 + Enredaderas ×2 (-6 de daño por golpe)',
  'guide.recipes.11': '<b class="text-slate-200">Armadura de Enredaderas</b> — Bejuco ×3 + Hojas ×2 + Enredaderas ×2 (-7 de daño por golpe, casi no te mojas)',
  'guide.recipes.12': '<b class="text-slate-200">Garra de Piedra</b> — Rubí ×1 + Tendón ×2 + Espinas ×2 (ataque +8, gran aumento de daño)',
  'guide.recipes.13': '<b class="text-slate-200">Poción de Sangre de Dragón</b> — Hierba de Sangre de Dragón ×2 + Hierbas ×1 + Grasa de Jabalí ×1 (restaura 60 PV, requiere [Alquimia Herbolaria])',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 Crecimiento y Habilidades',
  'guide.growth.1': 'Cada acción otorga <b class="text-slate-200">EXP</b>: cazar, pescar, recolectar, mascotas, desafíos y derrotar jefes. Cada nivel añade <b class="text-emerald-300">permanentemente</b> +10 PV máx, +6 Resistencia máx y +6 Ánimo máx, y la regeneración de resistencia también acelera con el nivel.',
  'guide.growth.2': 'Subir de nivel, ganar desafíos y derrotar jefes otorgan <b class="text-slate-200">EXP</b>; pero <b class="text-amber-300">los puntos de habilidad solo se obtienen al subir de nivel</b> (+1 por nivel), así que planifica con cuidado. Invierte libremente en las <b class="text-slate-200">cinco ramas</b> del panel 📈: 🎯Caza, 🛡️Supervivencia, 🐈Vínculo, 💨Esquiva, 🔨Fabricación.',
  'guide.growth.3': '<b class="text-slate-200">Instinto de Cazador</b> (daño), <b class="text-slate-200">Salto Letal</b> (alcance), <b class="text-slate-200">Pelaje Grueso</b> (reducción de daño), <b class="text-slate-200">Vitalidad</b> (regeneración), <b class="text-slate-200">Esquiva Ágil</b> (probabilidad de esquiva) y <b class="text-slate-200">Maestro Artesano</b> (efectos de fabricación) se pueden <b class="text-amber-300">mejorar varias veces</b> con un enorme potencial de crecimiento.',
  'guide.growth.4': '<b class="text-slate-200">Alquimia Herbolaria</b> desbloquea la <b class="text-slate-200">Poción de Energía</b>; el <b class="text-slate-200">Té de Hierba Gatera</b> también es un gran apoyo instantáneo de resistencia: tómalo cuando te quedes sin energía.',
  'guide.growth.5': '⚖️ <b class="text-amber-300">Dificultad dinámica</b>: la fuerza de monstruos, jefes y desafíos <b class="text-slate-200">crece con tu nivel</b> (Pradera Salvaje &lt; Barrio Urbano &lt; Páramo Seco &lt; Bosque Oscuro, a mayor profundidad más duro) — incluso a nivel alto no te confíes; los desafíos y las recompensas aumentan juntos.',
  'guide.growth.6': '🐾 <b class="text-amber-300">Ritmo de progreso</b>: la densidad de monstruos sube con el nivel (+30% cada 5 niveles), los monstruos <b class="text-slate-200">reaparecen lentamente</b> en cada zona y la curva de EXP es más suave: entra en zonas superiores para subir más rápido en lugar de quedarte en una sola.',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ Zonas y Jefes',
  'guide.zones.1': 'Los <b class="text-slate-200">portales</b> en el borde del mapa llevan a nuevas zonas: <b class="text-slate-200">Barrio Urbano</b>, <b class="text-slate-200">Páramo Seco</b> y <b class="text-slate-200">Bosque Oscuro</b>: <b class="text-emerald-300">sin requisito de nivel</b>, entra y sal libremente.',
  'guide.zones.2': 'Cada zona alberga un <b class="text-slate-200">jefe</b> en su <b class="text-slate-200">esquina inferior derecha</b>: el Jabalí Gigante (embestidas), el Niño del Tirachinas (piedras a distancia), el Lobo Gigante (mordiscos veloces) y la <b class="text-rose-300">Cobra Real</b>: el jefe final, enorme, que <b class="text-rose-300">escupe veneno</b> (envenenamiento persistente) y <b class="text-rose-300">salta desde lejos</b> (se yergue antes de saltar). Custodia el <b class="text-amber-300">portal a la siguiente zona</b>: para avanzar, derrota al jefe primero. Otorgan mucha EXP (los puntos de habilidad solo vienen de los niveles).',
  'guide.zones.3': '🌋 El <b class="text-slate-200">Páramo Seco</b> tiene enormes <b class="text-slate-200">cráteres volcánicos</b> (la lava es infranqueable) y <b class="text-slate-200">vetas de gemas</b>; <b class="text-rose-300">los manantiales escasean y casi nunca llueve</b>: hidrátate con la <b class="text-slate-200">Fruta de Cactus</b> y recolecta <b class="text-slate-200">Hierba de Sangre de Dragón</b> y gemas para fabricar objetos potentes.',
  'guide.zones.4': '🌲 El <b class="text-slate-200">Bosque Oscuro</b> es un <b class="text-slate-200">camino largo</b> flanqueado de árboles infranqueables, <b class="text-sky-300">lluvioso</b>: recolecta <b class="text-slate-200">bejucos</b> para tejer la <b class="text-slate-200">Armadura de Enredaderas</b>, y cuidado con los feroces <b class="text-rose-300">monos</b>, <b class="text-rose-300">cocodrilos</b> y el <b class="text-slate-200">Reishi</b>.',
  'guide.zones.5': '🛏 Los <b class="text-slate-200">callejones estrechos</b> del Barrio Urbano y los <b class="text-slate-200">árboles huecos</b> del Bosque Oscuro son refugios donde dormir: duerme hasta el amanecer para recuperar 40 PV y toda la resistencia.',
  'guide.zones.6': 'Cuando un jefe se acerca, aparece una barra de vida arriba en la pantalla; el salto es tu principal fuente de daño.',

  /* ============================================================ misc. 杂项 */
  'misc.title': 'Instinto Salvaje: Supervivencia del Gato Siamés',
  'misc.north': 'N',
  'misc.cave': 'Cueva',
  'misc.spring': 'Manantial',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ El cielo se ha despejado.',
  'log.weather.rain': '🌧️ Empieza a llover...',
  'log.weather.mist': '🌫️ Una niebla ligera se extiende.',
  'log.boot.wake': '🐱 Despiertas en la naturaleza. Confía en tu instinto: ¡pulsa E para olfatear!',
  'log.boot.newJourney': '🌱 ¡Comienza una nueva aventura! Todo vuelve a empezar desde cero.',
  'log.cave.idle': '🏕️ La cueva está tranquila y segura. (Pulsa F junto al fuego, la cama, el banco de trabajo o la salida)',
  'log.cave.noPounce': '😺 ¡Aquí no hay espacio para saltar!',
  'log.cave.enter': '🕳️ Te deslizas al fresco refugio de la cueva.',
  'log.cave.exit': '🌤️ Vuelves a la naturaleza.',
  'log.craft.workbench': '🛠 Preparas tus materiales en el banco de trabajo.',
  'log.craft.salmon': '🔥 ¡Asaste un salmón en la fogata!',
  'log.craft.dry': '🔥 ¡Secaste tu pelaje junto al fuego, bien calentito!',
  'log.craft.fireIdle': '🔥 La fogata crepita. (Trae un salmón para asar)',
  'log.craft.needSkill': '🔒 Requiere la habilidad [{skill}] para fabricar.',   /* 插值: {skill} */
  'log.craft.done': '🔨 ¡Fabricado: {name}!',                                  /* 插值: {name} */
  'log.bed.curl': '😴 Te acurrucas en la suave cama de paja...',
  'log.bed.wake': '🌅 Despiertas al amanecer, lleno de energía. (+34 PV, resistencia completa)',
  'log.shelter.sleep': '😴 Te acurrucas en el refugio y te duermes profundamente...',
  'log.shelter.wake': '🌅 ¡Despiertas al amanecer, lleno de energía! (+40 PV, resistencia completa)',
  'log.zone.enter': '⛩ ¡Has entrado en [{name}]!',                             /* 插值: {name} */
  'log.death': '☠️ Te derrumbas por el agotamiento... y despiertas al amanecer.',
  'log.stumble': '🐾 Tropiezas y recuperas el equilibrio.',
  'log.pounce.water': '💦 ¡Casi caes al agua y vuelves a la orilla de un salto! (pelaje empapado)',
  'log.groom': '✨ ¡Te acicalas y te sientes renovado!',
  'log.catch': '🐾 ¡Atrapaste un {name}!',                                     /* 插值: {name} */
  'log.fish.run': '🎣 ¡Pescaste uno al paso durante el remonte del salmón!',
  'log.fish.none': '🐟 No hay peces en la orilla... si tienes sed, busca un manantial (olor cian).',
  'log.combat.hit': '⚔️ ¡Golpeas a {name} e infliges {dmg} de daño{crit}!',     /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name} ha caído.',                                    /* 插值: {name} */
  'log.dodge': '💨 ¡Esquivas el ataque con agilidad!',
  'log.crit.bang': '¡CRÍTICO!',
  'log.crit.wrap': '(¡crítico!)',
  'log.damage': '💔 ¡Recibes {n} de daño!',                                    /* 插值: {n} */
  'log.footsteps': '👂 Se oyen pasos cerca...',
  'log.pred.alert': '⚠️ ¡Un {name} te ha visto!',                              /* 插值: {name} */
  'log.poison.venom': '💚 ¡El veneno te salpica! (-{dmg} PV, ¡envenenado!)',    /* 插值: {dmg} */
  'log.poison.tick': '💚 ¡El veneno hace efecto! -{n} PV',                     /* 插值: {n} */
  'log.poison.gone': '🌿 El veneno desaparece y te recuperas.',
  'log.level.up': '🎉 ¡Subes de nivel! Ahora eres nivel {level}. (+1 punto de habilidad)', /* 插值: {level} */
  'log.skill.point': '📌 ¡Obtienes {n} punto(s) de habilidad! (ahora {points})', /* 插值: {n} {points} */
  'log.skill.none': '📖 ¡Esa habilidad no existe!',
  'log.skill.maxed': '📖 ¡{name} ya está al máximo (Nv.{max})!',               /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 No hay suficientes puntos de habilidad: solo los niveles los otorgan.',
  'log.skill.learned': '⭐ ¡Habilidad aprendida: {name} Nv.{lv}/{max}! (-1 punto de habilidad)', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 ¡Encontraste un libro de habilidad: {name}! (léelo en tu mochila)', /* 插值: {name} */
  'log.skill.readBook': '📖 Lees un viejo libro de habilidad: ¡+40 EXP! (los puntos de habilidad solo vienen de los niveles)',
  'log.equip.off': '⬇️ Te quitaste {name} (sigue en tu mochila).',             /* 插值: {name} */
  'log.equip.on': '⬆️ ¡Te equipaste {name}!',                                 /* 插值: {name} */
  'log.zoomies': '😵‍💫 ¡¡Hierba gatera!! ¡¡¡LOCURA CORREDORA!!! ¡{name}!',       /* 插值: {name} */
  'log.item.use': '😋 Usaste {name}.',                                         /* 插值: {name} */
  'log.drop.jade': '💎 ¡Un jade cae del nido del mono!',
  'log.drop.sapphire': '💎 ¡Un zafiro está incrustado en la piel del cocodrilo!',
  'log.dog.bite': '🐕 ¡Un perro callejero te mordió! (-{dmg} PV)',             /* 插值: {dmg} */
  'log.dog.bark': '🐕 ¡Un perro callejero ladra y te persigue!',
  'log.dog.hit': '🐕 Golpeas al perro callejero: {crit}huye con el rabo entre las piernas.', /* 插值: {crit} */
  'log.dog.defeated': '💀 Ahuyentaste al perro callejero. (+tendón +12 EXP)',
  'log.boss.boar.charge': '🐗 ¡El Jabalí Gigante carga contra ti!',
  'log.boss.boar.hit': '🐗 ¡El Jabalí Gigante te embiste! (-{dmg} PV)',        /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 ¡El Lobo Gigante te muerde! (-{dmg} PV)',           /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 ¡La Cobra Real escupe un chorro de veneno!',
  'log.boss.cobra.leap': '🐍 ¡La Cobra Real salta como una flecha!',
  'log.boss.cobra.leapHit': '🐍 ¡El salto de la cobra te destroza! (-{dmg} PV, ¡envenenado!)', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 La Cobra Real se enrosca y se yergue... (¡va a escupir!)',
  'log.boss.cobra.leapWindup': '🐍 La Cobra Real se detiene y enrosca su cuerpo... (¡va a saltar!)',
  'log.boss.cobra.bite': '🐍 ¡La cobra te muerde! (-{dmg} PV, ¡envenenado!)',  /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 ¡El niño dispara una piedra con su tirachinas!',
  'log.boss.kid.hit': '💢 ¡Te golpeó una piedra! (-{dmg} PV)',                 /* 插值: {dmg} */
  'log.boss.crit': '💥 ¡Golpe crítico a [{name}]! ¡{dmg} de daño!',            /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 ¡Derrotaste a [{name}]! ¡Muchísima EXP!',           /* 插值: {name} */
  'log.boss.respawn': '⚠️ ¡[{name}] ha revivido en la arena!',                 /* 插值: {name} */
  'log.feature.berry': '🍓 Comiste algunas bayas silvestres. (+saciedad, +2 PV)',
  'log.feature.catnip': '🌿 Hierba gatera fresca recolectada.',
  'log.feature.herbs': '🌼 Hierbas recogidas.',
  'log.feature.cactus': '🌵 Arrancas una fruta de cactus: ¡néctar del desierto!',
  'log.feature.dragonherb': '🌹 Recolectas una hierba de sangre de dragón carmesí, ¡muy potente!',
  'log.feature.reishi': '🍄 Arrancas un reishi del árbol antiguo, brillando de poder.',
  'log.feature.vine': '🪵 Cortas un bejuco resistente.',
  'log.feature.spring': '💧 Bebes del manantial cristalino.',
  'log.feature.gem': '💎 ¡Extraes un {name}! (reaparece en 60 s)',             /* 插值: {name} */
  'log.feature.trash': '🗑 ¡Encontraste un {name} en la basura!',              /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 El cubo de basura está vacío...',
  'log.feature.forest': '🍂 Recoges algunos materiales en el bosque.',
  'log.feature.nothing': '😺 No hay nada con lo que interactuar aquí...',
  'log.companion.warn': '🐈 ¡{name} sisea: un depredador se acerca!',          /* 插值: {name} */
  'log.companion.gift': '🎁 ¡{name} te trajo {gift}!',                         /* 插值: {name} {gift} */
  'log.pet': '🐾 Acaricias a {name}: ronronea satisfecho. (+{n} ♥)',           /* 插值: {name} {n} */
  'log.pet.first': '😺 {name} se está encariñando contigo: sigue acariciándolo, o aliméntalo desde el menú del gato para ser amigos más rápido.', /* 插值: {name} */
  'log.pet.ready': '💗 {name} está listo para ser tu amigo: ¡adóptalo desde el menú del gato!', /* 插值: {name} */
  'log.feed.none': '🍽️ No tienes comida para compartir ahora (salmón, salmón asado o ratón).',
  'log.feed': '🍖 ¡Le das {item} a {name}! (+{n} ♥)',                          /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 ¡A {name} le encanta! Sigue así y confiará en ti.',    /* 插值: {name} */
  'log.adopt.notReady': '💭 {name} aún no está listo: sigue acariciando y alimentando (necesita 60 ♥).', /* 插值: {name} */
  'log.adopt.ok': '🎉 ¡{name} ahora es tu amigo! Te seguirá a todas partes.',   /* 插值: {name} */
  'log.perk.warn': '🐈 ¡{name} ahora te avisará del peligro cercano!',         /* 插值: {name} */
  'log.perk.hunt': '🐈 ¡{name} ahora cazará contigo (+daño)!',                 /* 插值: {name} */
  'log.summon.end': '🐈 {name} terminó de luchar y vuelve a tu lado.',         /* 插值: {name} */
  'log.summon.cd': '📣 Invocación en enfriamiento ({n} s)',                    /* 插值: {n} */
  'log.summon.none': '😿 No tienes gato compañero: ¡adopta primero un callejero!',
  'log.summon.ok': '📣 ¡{name} responde a la llamada y lucha a tu lado! (enfriamiento de {n} min)', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 ¡{name} salta sobre el enemigo! ({dmg} de daño)',   /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ ¡Los gatos rivales invaden tu territorio: salta para ahuyentarlos!',
  'log.challenge.rival.hit': '🐈‍⬛ ¡Repele a un gato rival!',
  'log.challenge.rival.fled': '💨 ¡Los gatos rivales huyen!',
  'log.challenge.rival.mark': '⚠️ ¡Un gato rival está marcando tu territorio!',
  'log.challenge.rival.swat': '🐈‍⬛ ¡Un gato rival te araña! (-{n} PV)',        /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ ¡Los gatos rivales ocuparon parte de tu territorio! ¡Robaron {name}!', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ Los gatos rivales ocuparon parte de tu territorio. Tu ánimo se desploma...',
  'log.challenge.rival.win': '🏆 ¡Ahuyentaste a los gatos rivales! (+{n} ánimo)', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 ¡Un gato rival soltó un tendón!',
  'log.challenge.dog.start': '🐕 ¡Un perro salvaje te persigue: corre!',
  'log.challenge.dog.stun': '🐕 ¡Gimoteo! Aturdiste al perro salvaje: ¡corre!',
  'log.challenge.dog.bite': '🐕 ¡El perro salvaje te muerde! (-{n} PV)',       /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 El perro salvaje te destrozó...',
  'log.challenge.dog.bark': '🐕 ¡Guau! ¡Guau!',
  'log.challenge.dog.win': '🏆 ¡Escapaste del perro salvaje! (+{n} resistencia)', /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ ¡Tormenta y rayos: busca refugio!',
  'log.challenge.storm.hit': '⚡ ¡Un rayo cae cerca de ti! (-{n} PV)',         /* 插值: {n} */
  'log.challenge.storm.far': '⚡ ¡Un rayo estalla no muy lejos!',
  'log.challenge.storm.safe': '⚡ La tormenta ruge fuera: la cueva es segura.',
  'log.challenge.storm.warn': '⚡ ¡El rayo va a caer: busca refugio!',
  'log.challenge.storm.win': '🏆 ¡Sobreviviste a la tormenta! (+{n} ánimo)',   /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 ¡Remonte del salmón! Pesca junto al río: ¡captura garantizada!',
  'log.challenge.salmon.win': '🏆 ¡El remonte terminó: gran botín!',
  'log.challenge.viper.start': '🐍 ¡Las víboras te rodean: repélalas!',
  'log.challenge.viper.kill': '💀 ¡Aplastaste una víbora! (+hierbas)',
  'log.challenge.viper.bite': '🐍 ¡Una víbora te muerde! (-{n} PV)',           /* 插值: {n} */
  'log.challenge.viper.win': '🏆 ¡Repele las víboras! (+{n} ánimo)',           /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 ¡Una manada de lobos te acecha: contraataca o huye!',
  'log.challenge.wolf.kill': '💀 ¡Derribaste a un lobo! (+18 EXP)',
  'log.challenge.wolf.stagger': '🐺 ¡El lobo tambalea!',
  'log.challenge.wolf.bite': '🐺 ¡Un lobo te muerde! (-{n} PV)',               /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 ¡Sobreviviste a la manada! (+10 ánimo)',
  'log.challenge.stampede.start': '🐗 ¡Estampida de jabalíes! ¡Esquiva a los jabalíes en carrera!',
  'log.challenge.stampede.hit': '🐗 ¡Un jabalí en estampida te pisotea! (-{n} PV)', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 ¡Esquivaste la estampida! (+{n} ánimo)',   /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 Un águila da vueltas arriba: ¡esquiva su picado!',
  'log.challenge.eagle.hit': '🦅 ¡Las garras del águila te arañan! (-{n} PV)', /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 ¡El águila pasa en picado a tu lado!',
  'log.challenge.eagle.dive': '🦅 ¡El águila empieza su picado: sal de la sombra!',
  'log.challenge.eagle.win': '🏆 ¡El águila se fue volando! (+{n} ánimo)',     /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ Niebla densa: ¡encuentra la baliza {name} y escapa antes de que se acabe el tiempo!', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 ¡Encontraste el camino a través de la niebla! (+{n} ánimo)', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ Perdido en la niebla... mojado y helado. (-6 ánimo)',
};
