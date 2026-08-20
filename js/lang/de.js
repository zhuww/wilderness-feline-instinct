/* ==========================================================================
   Wilderness Feline Instinct — lang/de.js
   德语（Deutsch）字典：全部 key → 德语译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.de = {

  /* ============================================================ ui. HUD/面板/按钮 */
  'ui.hud.time': '{icon} {time} · Tag {day}',               /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ Klar',
  'ui.hud.weather.rain': '🌧️ Regen',
  'ui.hud.weather.mist': '🌫️ Nebel',
  'ui.hud.zone': '⛩ {name}',                                /* 插值: {name} */
  'ui.hud.compass': 'Instinkt',
  'ui.hud.xp': 'EP',
  'ui.hud.level': 'Lv {n}',                                 /* 插值: {n} */
  'ui.hud.summon.none': '📣 Keine Begleiterkatze',
  'ui.hud.summon.ready': '📣 Bereit (R)',
  'ui.hud.summon.cd': '📣 {n}s',                            /* 插值: {n} */
  'ui.hud.bossDefault': '👹 Boss',
  'ui.hud.boss': '👹 {name}',                               /* 插值: {name} */

  'ui.meter.hp': 'LP',
  'ui.meter.satiety': 'Sättigung',
  'ui.meter.hydration': 'Hydration',
  'ui.meter.stamina': 'Ausdauer',
  'ui.meter.mood': 'Stimmung',
  'ui.meter.wetness': 'Nässe',

  'ui.btn.growth': 'Wachstum & Fähigkeiten',
  'ui.btn.guide': 'Überlebensführer (G)',
  'ui.btn.inv': 'Inventar (I)',
  'ui.btn.friends': 'Katzenfreunde (B)',
  'ui.btn.sound': 'Ton an/aus',
  'ui.btn.reset': 'Neues Spiel',
  'ui.btn.lang': '🌐 {lang}',                               /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> Bewegen · <b class="text-white">Shift</b> Schleichen · <b class="text-white">Leertaste</b> Sprung · <b class="text-white">E</b> Schnüffeln · <b class="text-white">Q</b> Putzen · <b class="text-white">F</b> Interagieren',

  'ui.touch.pounce': 'Sprung',
  'ui.touch.sniff': 'Schnüffeln',
  'ui.touch.groom': 'Putzen',
  'ui.touch.interact': 'Interagieren',
  'ui.touch.sneak': '🦎 Schleichen',
  'ui.touch.sneakTitle': 'Schleichen umschalten',
  'ui.touch.summon': '📣 Begleiter rufen',
  'ui.touch.summonTitle': 'Begleiterkatze rufen (R)',

  'ui.catmenu.title': 'Katzenaktionen',
  'ui.catmenu.pet': '🐾 Streicheln',
  'ui.catmenu.feed': '🍖 Füttern',
  'ui.catmenu.adopt': '🤝 Adoptieren',
  'ui.catmenu.adopted': '🤝 Adoptiert',

  'ui.modal.inv.title': '🎒 Inventar & Handwerk',
  'ui.modal.friends.title': '🐈 Katzenfreunde',
  'ui.modal.guide.title': '📖 Überlebensführer',
  'ui.modal.growth.title': '📈 Wachstum & Fähigkeiten',

  'ui.tab.inv': 'Beutel',
  'ui.tab.craft': 'Herstellen',

  'ui.inv.empty': 'Dein Beutel ist leer – sammle, angle und jage, um ihn zu füllen.',
  'ui.inv.use': 'Benutzen',
  'ui.inv.equip': 'Anlegen',
  'ui.inv.unequip': 'Ablegen',
  'ui.inv.read': '📖 Lesen',
  'ui.inv.equipped': '● Angelegt',

  'ui.craft.locked': '🔒 Gesperrt',
  'ui.craft.needSkill': 'Erfordert Fähigkeit: {skill}',      /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 Nur tagsüber',
  'ui.craft.craft': 'Herstellen',

  'ui.confirm.reset': 'Neues Spiel beginnen? Dein aktueller Spielstand wird gelöscht.',
  'ui.confirm.resetTitle': '🆕 Neues Spiel',
  'ui.confirm.resetDesc': 'Dein gesamter Fortschritt (Level, Fähigkeiten, Gegenstände, Begleiter, Zonenfortschritt) wird gelöscht und eine völlig neue Welt erzeugt. Diese Aktion ist unwiderruflich!',
  'ui.confirm.ok': '🎮 Neues Spiel',
  'ui.confirm.cancel': 'Abbrechen',

  'ui.friends.intro': 'Geh zu einer Streunerkatze und drücke <b class="text-slate-200">F</b>, um sie zu streicheln – über ihrem Kopf erscheint ein Aktionsmenü zum <b class="text-slate-200">Füttern</b> (Lachs/Maus) und <b class="text-slate-200">Adoptieren</b> (Freundschaft bei <b class="text-pink-300">60 ♥</b>). Der rosa Geruch markiert die Katzen.',
  'ui.friends.yourPets': '🐾 Deine Haustiere ({n})',         /* 插值: {n} */
  'ui.friends.noPets': 'Noch keine Haustiere – füttere eine Streunerkatze bis 60 ♥ und adoptiere sie!',
  'ui.friends.strays': '🐈 Streuner ({n})',                  /* 插值: {n} */
  'ui.friends.unknown': 'Noch {n} Streunerkatzen streifen durch die Wildnis – folge dem rosa Geruch, um sie zu finden.', /* 插值: {n} */
  'ui.friends.none': 'Noch keine Katzen in der Nähe. Drücke E zum Schnüffeln und folge den rosa Geruchsspuren.',
  'ui.friends.status.adopted': 'Freund ❤️',
  'ui.friends.status.adoptable': 'Adoptierbar – geh hin und drücke F!',
  'ui.friends.status.approaching': '{n}/60 ♥ Adoptierbar',   /* 插值: {n} */
  'ui.friends.status.shy': 'Scheu – erst streicheln',
  'ui.friends.friendship.best': '❤️ Bester Freund',
  'ui.friends.friendship.percent': '♥ {n}%',                 /* 插值: {n} */
  'ui.friends.friendship.shy': '— Scheu —',

  'ui.perk.mood': 'Stimmungs-Aura',
  'ui.perk.warn': 'Gefahrenwarnung',
  'ui.perk.hunt': 'Jagdunterstützung',

  'ui.branch.hunt': '🎯 Jagd',
  'ui.branch.survive': '🛡️ Überleben',
  'ui.branch.bond': '🐈 Bindung',
  'ui.branch.dodge': '💨 Ausweichen',
  'ui.branch.craft': '🔨 Handwerk',

  'ui.skill.maxed': 'Maximal',
  'ui.skill.upgrade': 'Verbessern',
  'ui.skill.learn': 'Lernen',
  'ui.skill.lv': 'Lv.{lv}/{max}',                            /* 插值: {lv} {max} */

  'ui.growth.skillPoints': 'Fähigkeitspunkte: {n}',          /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} EP',                        /* 插值: {xp} {need} */
  'ui.growth.bonus': 'Stufenbonus: +{hp} max. LP · +{st} max. Ausdauer · +{mood} max. Stimmung · +{regen}% Ausdauer-Regeneration', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': 'Stimmungskrit-Rate: <b class="text-amber-300">{pct}%</b> (bessere Stimmung = mehr Krit, doppelter Schaden)', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': 'Fähigkeitspunkte gibt es nur beim Aufleveln – +1 pro Stufe, plane deinen Build also sorgfältig; Jägerinstinkt / Todesprung / Dickes Fell / Vitalität / Flinke Ausweiche / Meisterhandwerker können mehrfach verbessert werden.',
  'ui.growth.skillTree': '📖 Fertigkeitsbaum ({n} Punkte investiert)', /* 插值: {n} */
  'ui.growth.journey': '🌱 Werdegang',

  'ui.journey.days': 'Überlebte Tage',
  'ui.journey.prey': 'Beute gefangen',
  'ui.journey.predators': 'Räuber erlegt',
  'ui.journey.fish': 'Fische gefangen',
  'ui.journey.pets': 'Haustiere adoptiert',
  'ui.journey.challenges': 'Herausforderungen gewonnen',
  'ui.journey.xp': 'Gesamt-EP',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': 'Wildes Grasland',
  'zone.1': 'Stadtviertel',
  'zone.2': 'Trockenes Ödland',
  'zone.3': 'Dunkler Wald',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': 'Rieseneber',
  'boss.1': 'Schleuder-Knirps',
  'boss.2': 'Riesenwolf',
  'boss.3': 'Königskobra',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': 'Wildschwein',
  'enemy.fox': 'Fuchs',
  'enemy.viper': 'Viper',
  'enemy.monkey': 'Affe',
  'enemy.croc': 'Krokodil',
  'enemy.mouse': 'Feldmaus',
  'enemy.grasshopper': 'Heuschrecke',
  'enemy.salmon': 'Lachs',
  'enemy.straydog': 'Streunerhund',
  'enemy.rival': 'Rivalenkatze',
  'enemy.dog': 'Wildhund',
  'enemy.wolf': 'Wolf',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': 'Wildbeeren',
  'item.berry.desc': 'Süße Waldbeeren, die ein wenig LP wiederherstellen.',
  'item.mouse.name': 'Feldmaus',
  'item.mouse.desc': 'Eine fette Feldmaus, die Ausdauer wiederherstellt.',
  'item.grasshopper.name': 'Heuschrecke',
  'item.grasshopper.desc': 'Ein knackiges kleines Hüpferlein.',
  'item.salmon.name': 'Lachs',
  'item.salmon.desc': 'Frisch gefangener Lachs, reich an Nährstoffen.',
  'item.cooked_salmon.name': 'Gegrillter Lachs',
  'item.cooked_salmon.desc': 'Räucherig, zart und saftig – ein echtes Festmahl.',
  'item.catnip.name': 'Frische Katzenminze',
  'item.catnip.desc': 'Belebt sofort wieder.',
  'item.dried_catnip.name': 'Getrocknete Katzenminze',
  'item.dried_catnip.desc': 'Doppelte Wirkung!',
  'item.herbs.name': 'Kräuter',
  'item.herbs.desc': 'Beruhigende Wildkräuter.',
  'item.leaves.name': 'Blätter',
  'item.leaves.desc': 'Breite grüne Blätter.',
  'item.vines.name': 'Ranken',
  'item.vines.desc': 'Starke, flexible Ranken.',
  'item.fishbone.name': 'Fischgräte',
  'item.fishbone.desc': 'Eine saubere, weiße Fischgräte.',
  'item.sinew.name': 'Sehne',
  'item.sinew.desc': 'Zähe Tiersehne.',
  'item.fat.name': 'Eberfett',
  'item.fat.desc': 'Dickes, fettiges Fett.',
  'item.herb_salve.name': 'Kräutersalbe',
  'item.herb_salve.desc': 'Auf Wunden auftragen, um 32 LP wiederherzustellen.',
  'item.leaf_hat.name': 'Blätterhut',
  'item.leaf_hat.desc': 'Hält dich im Regen trocken; -2 Schaden pro Treffer (Verteidigung).',
  'item.fishbone_collar.name': 'Grätenhalsband',
  'item.fishbone_collar.desc': 'Angriff +3 (+1 pro Handwerker-Stufe); Streuner vertrauen dir schneller.',
  'item.cat_tooth_necklace.name': 'Katzenzahn-Amulett',
  'item.cat_tooth_necklace.desc': 'Angriff +20% (+4% pro Handwerker-Stufe): füge Feinden mehr Schaden zu.',
  'item.catnip_tea.name': 'Katzenminze-Tee',
  'item.catnip_tea.desc': 'Eine heiße Tasse stellt sofort 25 Ausdauer wieder her.',
  'item.energy_potion.name': 'Energietrank',
  'item.energy_potion.desc': 'Alchemistische Essenz, stellt sofort 55 Ausdauer wieder her.',
  'item.gem_ruby.name': 'Rubin',
  'item.gem_ruby.desc': 'Ein glühender Rubin aus Vulkangestein – ein wertvolles Material.',
  'item.gem_sapphire.name': 'Saphir',
  'item.gem_sapphire.desc': 'Ein tiefblauer Saphir aus dunklen Gewässern – ein wertvolles Material.',
  'item.gem_jade.name': 'Jade',
  'item.gem_jade.desc': 'Ein smaragdgrüner Jade aus uralten Wurzeln – ein wertvolles Material.',
  'item.flame_ruby_pendant.name': 'Flammenrubin-Anhänger',
  'item.flame_ruby_pendant.desc': 'Angriff +40% (+8% pro Handwerker-Stufe) – stärker als das Katzenzahn-Amulett.',
  'item.sapphire_star.name': 'Saphirstern',
  'item.sapphire_star.desc': 'Angriff +25% und Krit-Rate +12%.',
  'item.jade_charm.name': 'Jade-Amulett',
  'item.jade_charm.desc': '-6 Schaden pro Treffer (-1 pro Handwerker-Stufe) – hart wie Jade.',
  'item.cactus_fruit.name': 'Kaktusfrucht',
  'item.cactus_fruit.desc': 'Eine Oase im Wüstensand: +30 Hydration.',
  'item.dragon_herb.name': 'Drachenblutkraut',
  'item.dragon_herb.desc': 'Ein scharlachrotes Kraut aus Vulkanritzen; iss es, um 18 LP wiederherzustellen.',
  'item.reishi.name': 'Reishi',
  'item.reishi.desc': 'Ein Elixier uralter Bäume: stellt 12 LP wieder her, +10 Stimmung.',
  'item.vine_strand.name': 'Ranke',
  'item.vine_strand.desc': 'Robuste Ranken aus dem Dunklen Wald – Material für Rüstungen.',
  'item.vine_armor.name': 'Rankenrüstung',
  'item.vine_armor.desc': '-7 Schaden pro Treffer (-1 pro Handwerker-Stufe); bleibt im Regen fast trocken.',
  'item.stone_claw.name': 'Steinklaue',
  'item.stone_claw.desc': 'Angriff +8 (+2 pro Handwerker-Stufe) – Krallen mit Edelsteinsplittern besetzt.',
  'item.dragon_potion.name': 'Drachenbluttrank',
  'item.dragon_potion.desc': 'Brodelnde Drachenblut-Essenz, stellt sofort 60 LP wieder her.',
  'item.book_hunter.name': 'Jägerinstinkt',
  'item.book_hunter.desc': 'Sprungschaden +15%, größerer Fangradius.',
  'item.book_swift.name': 'Blitzkrallen',
  'item.book_swift.desc': 'Bewegungstempo +10%, Ausdauer-Regeneration +25%.',
  'item.book_thick.name': 'Dickes Fell',
  'item.book_thick.desc': 'Erlittener Schaden -25%.',
  'item.book_keen.name': 'Feine Nase',
  'item.book_keen.desc': 'Schnüffelradius +40%, dichtere Geruchsspuren.',
  'item.book_brave.name': 'Tapferes Herz',
  'item.book_brave.desc': 'Stimmungslimit +25%, Herausforderungsbelohnungen +50%.',
  'item.book_angler.name': 'Anglerschwanz',
  'item.book_angler.desc': 'Angeln gelingt immer.',
  'item.book_guardian.name': 'Wächterkraft',
  'item.book_guardian.desc': 'Freundschaftsgewinn +50%, Jagdunterstützung +4.',
  'item.book_camo.name': 'Blättertarnung',
  'item.book_camo.desc': 'Tarnung im hohen Gras verdoppelt; Schleichen kostet weniger Ausdauer.',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': 'Blätterhut',
  'recipe.leaf_hat.desc': 'Hält dich im Regen trocken; -2 Schaden pro Treffer (Verteidigung).',
  'recipe.fishbone_collar.name': 'Grätenhalsband',
  'recipe.fishbone_collar.desc': 'Angriff +3; Streuner vertrauen dir schneller.',
  'recipe.cat_tooth_necklace.name': 'Katzenzahn-Amulett',
  'recipe.cat_tooth_necklace.desc': 'Angriff +20%, füge Feinden mehr Schaden zu.',
  'recipe.dried_catnip.name': 'Getrocknete Katzenminze',
  'recipe.dried_catnip.desc': 'Starker Aufputsch – muss tagsüber getrocknet werden.',
  'recipe.herb_salve.name': 'Kräutersalbe',
  'recipe.herb_salve.desc': 'Auf Wunden auftragen, um 32 LP wiederherzustellen.',
  'recipe.catnip_tea.name': 'Katzenminze-Tee',
  'recipe.catnip_tea.desc': 'Ausdauer +25, wirkt sofort.',
  'recipe.energy_potion.name': 'Energietrank',
  'recipe.energy_potion.desc': 'Ausdauer +55. Erfordert die Fähigkeit [Kräuteralchemie].',
  'recipe.flame_ruby_pendant.name': 'Flammenrubin-Anhänger',
  'recipe.flame_ruby_pendant.desc': 'Angriff +40% – Top-Accessoire.',
  'recipe.sapphire_star.name': 'Saphirstern',
  'recipe.sapphire_star.desc': 'Angriff +25%, Krit +12%.',
  'recipe.jade_charm.name': 'Jade-Amulett',
  'recipe.jade_charm.desc': '-6 Schaden pro Treffer.',
  'recipe.vine_armor.name': 'Rankenrüstung',
  'recipe.vine_armor.desc': 'Verteidigung -7, bleibt im Regen fast trocken.',
  'recipe.stone_claw.name': 'Steinklaue',
  'recipe.stone_claw.desc': 'Angriff +8 – ein großer Schadensschub.',
  'recipe.dragon_potion.name': 'Drachenbluttrank',
  'recipe.dragon_potion.desc': 'Stellt sofort 60 LP wieder her. Erfordert [Kräuteralchemie].',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': 'Jägerinstinkt',
  'skill.hunter.desc': 'Pro Stufe: Sprungschaden +15%, größerer Fangradius',
  'skill.leap.name': 'Todesprung',
  'skill.leap.desc': 'Pro Stufe: Sprungreichweite +20% (max. +60%)',
  'skill.keen.name': 'Feine Nase',
  'skill.keen.desc': 'Schnüffelradius +40%, dichtere Geruchsspuren',
  'skill.angler.name': 'Anglerschwanz',
  'skill.angler.desc': 'Angeln gelingt immer',
  'skill.swift.name': 'Blitzkrallen',
  'skill.swift.desc': 'Bewegungstempo +10%, Ausdauer-Regeneration +25%',
  'skill.thick.name': 'Dickes Fell',
  'skill.thick.desc': 'Pro Stufe: erlittener Schaden -12% (max. -47%)',
  'skill.camo.name': 'Blättertarnung',
  'skill.camo.desc': 'Tarnung im hohen Gras verdoppelt; Schleichen kostet weniger Ausdauer',
  'skill.vitality.name': 'Vitalität',
  'skill.vitality.desc': 'Pro Stufe: Ausdauer-Regeneration +30% (max. +150%)',
  'skill.guardian.name': 'Wächterkraft',
  'skill.guardian.desc': 'Freundschaftsgewinn +50%, Jagdunterstützung +4',
  'skill.brave.name': 'Tapferes Herz',
  'skill.brave.desc': 'Stimmungslimit +25%, Herausforderungsbelohnungen +50%',
  'skill.summon.name': 'Rufverstärkung',
  'skill.summon.desc': 'Rufdauer 25→40 s, Abklingzeit 5→3 Min.',
  'skill.dodge.name': 'Flinke Ausweiche',
  'skill.dodge.desc': 'Pro Stufe: 6% Chance, Schaden komplett auszuweichen (max. 30%)',
  'skill.agile.name': 'Leicht wie eine Feder',
  'skill.agile.desc': 'Sprung-Ausdauerkosten -40%, Abklingzeit -0,2 s',
  'skill.craft.name': 'Meisterhandwerker',
  'skill.craft.desc': 'Pro Stufe: Effekte hergestellter Gegenstände +20%, auch Ausrüstungsboni',
  'skill.alchemist.name': 'Kräuteralchemie',
  'skill.alchemist.desc': 'Schaltet mächtige Rezepte wie den Energietrank frei',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ Herausforderung',
  'challenge.rival.title': '🐈‍⬛ Revierinvasion',
  'challenge.rival.desc': 'Rivalenkatzen nehmen dein Revier ein – spring sie an, um sie zu vertreiben!',
  'challenge.dog.title': '🐕 Hundejagd!',
  'challenge.dog.desc': 'Renn! Versteck dich im hohen Gras oder flieh in eine Höhle!',
  'challenge.storm.title': '⛈️ Gewittersturm',
  'challenge.storm.desc': 'Such schnell Schutz vor den Blitzen!',
  'challenge.salmon.title': '🐟 Lachswanderung',
  'challenge.salmon.desc': 'Angeln am Fluss – Fang garantiert!',
  'challenge.viper.title': '🐍 Vipernangriff',
  'challenge.viper.desc': 'Wehre die Vipern ab!',
  'challenge.wolf.title': '🐺 Wolfsrudel!',
  'challenge.wolf.desc': 'Das Rudel jagt dich – wehr dich oder flieh in eine Höhle!',
  'challenge.stampede.title': '🐗 Eberstampede!',
  'challenge.stampede.desc': 'Weich den rasenden Ebern aus!',
  'challenge.eagle.title': '🦅 Adlersturzflug!',
  'challenge.eagle.desc': 'Achte auf die Schatten am Boden – weich dem Sturzflug des Adlers aus!',
  'challenge.fog.title': '🌫️ Im Nebel verirrt!',
  'challenge.fog.desc': 'Finde die Bake (Höhle oder Quelle), bevor die Zeit abläuft!',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                               /* 插值: {name} */
  'feature.prompt.gate': 'Zu {name} gehen',                  /* 插值: {name} */
  'feature.prompt.berry': 'Beeren essen',
  'feature.prompt.pickup': 'Aufheben',
  'feature.prompt.spring': 'Trinken',
  'feature.prompt.gem': 'Edelstein abbauen',
  'feature.prompt.harvest': 'Pflücken',
  'feature.prompt.vine': 'Ranke schneiden',
  'feature.prompt.sleep': 'Schlafen',
  'feature.prompt.trash': 'Müll durchwühlen',
  'feature.prompt.enter': 'Betreten',
  'feature.prompt.fish': 'Angeln',
  'feature.prompt.pet': 'Streicheln',
  'feature.prompt.workbench': 'F — Gegenstände herstellen',
  'feature.prompt.fire': 'F — Kochen / Trocknen',
  'feature.prompt.bed': 'F — Bis zum Morgengrauen schlafen',
  'feature.prompt.exit': 'F — Höhle verlassen',
  'feature.shelter.hollow': '🛏 Baumhöhlen-Unterstand',
  'feature.shelter.alley': '🛏 Gassen-Unterstand',
  'feature.beacon': '📍 {name}-Bake',                        /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 Steuerung',
  'guide.controls.move': '<b class="text-slate-200">WASD / Pfeiltasten</b> — Bewegen',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — Schleichen (im hohen Gras verstecken)',
  'guide.controls.pounce': '<b class="text-slate-200">Leertaste</b> — Sprung / Angriff',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — Schnüffeln (Geruchsspuren)',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — Fell putzen (+Stimmung)',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — Interagieren / Streicheln / Angeln',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — Begleiterkatze rufen (5 Min. Abklingzeit)',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — Panels öffnen',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — Panel schließen',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 Geruchssinn',
  'guide.smell.p1': 'Drücke <b class="text-slate-200">E</b> – farbige Geruchsspuren im Wind verraten dir, was dich umgibt:',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">Cyan</b> — saubere Quellen und Wasser',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">Gold</b> — Beute: Mäuse, Lachse, Heuschrecken',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">Rosa</b> — freundliche Streunerkatzen',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">Rot</b> — Räuber: Wildschweine, Vipern, Füchse',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">Orange</b> — Rivalenkatzen, die dein Revier bedrängen',
  'guide.smell.p2': 'Der <b class="text-slate-200">„Instinkt“-Kompass</b> oben zeigt immer zur nächsten Geruchsquelle.',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 Überlebenstipps',
  'guide.tips.1': 'Trink an einer <b class="text-slate-200">Quelle</b> (cyan) und angle am Flussufer mit <b class="text-slate-200">F</b>.',
  'guide.tips.2': 'Regen macht dein Fell nass – <b class="text-slate-200">nasses Fell</b> verlangsamt die Ausdauer-Regeneration. Stelle einen <b class="text-slate-200">Blätterhut</b> her oder trockne dich am Höhlenfeuer.',
  'guide.tips.3': 'Schleich durchs <b class="text-slate-200">hohe Gras</b>, um Räubern auszuweichen, und spring dann zum tödlichen Schlag an.',
  'guide.tips.4': 'Höhlen sind sichere Zufluchten: schlaf im Bett bis zum Morgengrauen, um LP zu regenerieren, und grill den Lachs am Feuer.',
  'guide.tips.5': 'Drücke <b class="text-slate-200">Q</b> zum Putzen, um die Stimmung zu heben; sehr niedrige Stimmung schwächt dich.',
  'guide.tips.6': 'Freunde dich mit Streunern an (rosa) – bei hoher Freundschaft warnen sie dich vor Gefahr und kämpfen an deiner Seite.',
  'guide.tips.7': 'Katzenminze ist ein starkes Aufputschmittel ... aber sie löst „verrückte Zickzack-Rennen“ aus. Mit Vorsicht verwenden.',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 Handwerksrezepte',
  'guide.recipes.1': '<b class="text-slate-200">Blätterhut</b> — Blätter ×3 + Ranken ×2 (Verteidigung: -2 Schaden pro Treffer)',
  'guide.recipes.2': '<b class="text-slate-200">Grätenhalsband</b> — Fischgräten ×3 + Sehne ×1 (Angriff +3, Freundschaftsgewinn +50%)',
  'guide.recipes.3': '<b class="text-slate-200">Katzenzahn-Amulett</b> — Fischgräten ×4 + Sehne ×2 (Angriff +20%)',
  'guide.recipes.4': '<b class="text-slate-200">Getrocknete Katzenminze</b> — Katzenminze ×2 (nur tagsüber)',
  'guide.recipes.5': '<b class="text-slate-200">Kräutersalbe</b> — Kräuter ×3 + Eberfett ×1',
  'guide.recipes.6': '<b class="text-slate-200">Katzenminze-Tee</b> — Katzenminze ×1 + Kräuter ×1 (Ausdauer +25, sofortige Wirkung)',
  'guide.recipes.7': '<b class="text-slate-200">Energietrank</b> — Katzenminze ×2 + Kräuter ×2 + Eberfett ×1 (Ausdauer +55, erfordert [Kräuteralchemie])',
  'guide.recipes.8': '<b class="text-slate-200">Flammenrubin-Anhänger</b> — Rubin ×1 + Fischgräten ×2 + Sehne ×1 (Angriff +40%)',
  'guide.recipes.9': '<b class="text-slate-200">Saphirstern</b> — Saphir ×1 + Fischgräten ×2 + Sehne ×1 (Angriff +25%, Krit +12%)',
  'guide.recipes.10': '<b class="text-slate-200">Jade-Amulett</b> — Jade ×1 + Blätter ×2 + Ranken ×2 (-6 Schaden pro Treffer)',
  'guide.recipes.11': '<b class="text-slate-200">Rankenrüstung</b> — Ranken ×3 + Blätter ×2 + Ranken ×2 (-7 Schaden pro Treffer, im Regen fast trocken)',
  'guide.recipes.12': '<b class="text-slate-200">Steinklaue</b> — Rubin ×1 + Sehne ×2 + Fischgräten ×2 (Angriff +8, großer Schadensschub)',
  'guide.recipes.13': '<b class="text-slate-200">Drachenbluttrank</b> — Drachenblutkraut ×2 + Kräuter ×1 + Eberfett ×1 (stellt 60 LP wieder her, erfordert [Kräuteralchemie])',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 Wachstum & Fähigkeiten',
  'guide.growth.1': 'Jede Aktion bringt <b class="text-slate-200">EP</b> – Jagen, Angeln, Sammeln, Haustiere, Herausforderungen und Boss-Siege. Mit jeder Stufe kommen <b class="text-emerald-300">dauerhaft</b> +10 max. LP, +6 max. Ausdauer und +6 max. Stimmung dazu, und die Ausdauer-Regeneration wird schneller.',
  'guide.growth.2': 'Aufleveln, Herausforderungen gewinnen und Bosse besiegen bringen <b class="text-slate-200">EP</b>; aber <b class="text-amber-300">Fähigkeitspunkte gibt es nur beim Aufleveln</b> (+1 pro Stufe), also plane sorgfältig. Investiere frei in die <b class="text-slate-200">fünf Zweige</b> im 📈-Panel: 🎯Jagd, 🛡️Überleben, 🐈Bindung, 💨Ausweichen, 🔨Handwerk.',
  'guide.growth.3': '<b class="text-slate-200">Jägerinstinkt</b> (Schaden), <b class="text-slate-200">Todesprung</b> (Sprungreichweite), <b class="text-slate-200">Dickes Fell</b> (Schadensreduktion), <b class="text-slate-200">Vitalität</b> (Ausdauer-Regeneration), <b class="text-slate-200">Flinke Ausweiche</b> (Ausweichrate) und <b class="text-slate-200">Meisterhandwerker</b> (Handwerkseffekte) können alle <b class="text-amber-300">mehrfach verbessert</b> werden – mit riesigem Wachstumspotenzial.',
  'guide.growth.4': '<b class="text-slate-200">Kräuteralchemie</b> schaltet den <b class="text-slate-200">Energietrank</b> frei; <b class="text-slate-200">Katzenminze-Tee</b> ist auch ein toller sofortiger Ausdauer-Boost – trink einen Schluck, wenn deine Ausdauer zur Neige geht.',
  'guide.growth.5': '⚖️ <b class="text-amber-300">Dynamischer Schwierigkeitsgrad</b>: Monster, Bosse und Herausforderungen werden <b class="text-slate-200">mit deiner Stufe stärker</b> (Wildes Grasland &lt; Stadtviertel &lt; Trockenes Ödland &lt; Dunkler Wald, je tiefer desto härter) – auch auf hoher Stufe nicht nachlassen; Herausforderungen und Belohnungen wachsen zusammen.',
  'guide.growth.6': '🐾 <b class="text-amber-300">Spieltempo</b>: Die Monsterspawnrate steigt mit der Stufe (+30% alle 5 Stufen), Monster <b class="text-slate-200">erscheinen langsam nach</b> und die EP-Kurve bleibt sanft – gehe in höhere Zonen, um schneller aufzusteigen, statt in einer Zone zu campen.',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ Zonen & Bosse',
  'guide.zones.1': '<b class="text-slate-200">Portale</b> am Kartenrand führen in neue Zonen: <b class="text-slate-200">Stadtviertel</b>, <b class="text-slate-200">Trockenes Ödland</b> und <b class="text-slate-200">Dunkler Wald</b> – <b class="text-emerald-300">keine Stufenbeschränkung</b>, jederzeit frei hin und zurück.',
  'guide.zones.2': 'Jede Zone beherbergt in ihrer <b class="text-slate-200">unteren rechten Ecke</b> einen <b class="text-slate-200">Boss</b>: den Rieseneber (Rammstöße), den Schleuder-Knirps (Fernsteine), den Riesenwolf (Blitzbisse) und die <b class="text-rose-300">Königskobra</b> – den Endboss, riesig, die <b class="text-rose-300">Gift spuckt</b> (anhaltender Giftschaden) und <b class="text-rose-300">aus der Ferne springt</b> (sie richtet sich vor dem Sprung auf). Sie bewacht das <b class="text-amber-300">Portal zur nächsten Zone</b> – um voranzukommen, musst du zuerst den Boss besiegen. Sie geben viel EP (Fähigkeitspunkte gibt es weiterhin nur durch Aufleveln).',
  'guide.zones.3': '🌋 Das <b class="text-slate-200">Trockene Ödland</b> hat riesige <b class="text-slate-200">Vulkankrater</b> (Lava ist unpassierbar) und <b class="text-slate-200">Edelsteinadern</b>; <b class="text-rose-300">Quellen sind selten und Regen fast nie</b> – trink von der <b class="text-slate-200">Kaktusfrucht</b>, und sammle <b class="text-slate-200">Drachenblutkraut</b> und Edelsteine für mächtige Ausrüstung.',
  'guide.zones.4': '🌲 Der <b class="text-slate-200">Dunkle Wald</b> ist ein langer <b class="text-slate-200">Weg</b>, gesäumt von unpassierbaren Bäumen, <b class="text-sky-300">regnerisch</b> – sammle <b class="text-slate-200">Ranken</b>, um die <b class="text-slate-200">Rankenrüstung</b> zu flechten, und hüte dich vor wilden <b class="text-rose-300">Affen</b>, <b class="text-rose-300">Krokodilen</b> und dem <b class="text-slate-200">Reishi</b>.',
  'guide.zones.5': '🛏 Die <b class="text-slate-200">engen Gassen</b> des Stadtviertels und die <b class="text-slate-200">Baumhöhlen</b> des Dunklen Waldes sind schlafbare Unterstände – schlaf bis zum Morgengrauen, um 40 LP und volle Ausdauer zu regenerieren.',
  'guide.zones.6': 'Wenn ein Boss in der Nähe ist, erscheint oben eine Boss-Leiste; der Sprung ist deine Hauptschadensquelle.',

  /* ============================================================ misc. 杂项 */
  'misc.title': 'Wilder Instinkt: Siamkatzen-Überleben',
  'misc.north': 'N',
  'misc.cave': 'Höhle',
  'misc.spring': 'Quelle',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ Der Himmel klart auf.',
  'log.weather.rain': '🌧️ Es beginnt zu regnen ...',
  'log.weather.mist': '🌫️ Ein leichter Nebel zieht auf.',
  'log.boot.wake': '🐱 Du erwachst in der Wildnis. Vertrau deinem Instinkt – drücke E zum Schnüffeln!',
  'log.boot.newJourney': '🌱 Eine neue Reise beginnt! Alles startet von Null.',
  'log.cave.idle': '🏕️ Die Höhle ist ruhig und sicher. (Drücke F am Feuer, Bett, Werkbank oder Ausgang)',
  'log.cave.noPounce': '😺 Hier ist kein Platz zum Springen!',
  'log.cave.enter': '🕳️ Du schlüpfst in den kühlen Höhlenunterstand.',
  'log.cave.exit': '🌤️ Du kehrst in die Wildnis zurück.',
  'log.craft.workbench': '🛠 Du machst deine Materialien an der Werkbank bereit.',
  'log.craft.salmon': '🔥 Du hast einen Lachs über dem Lagerfeuer gegrillt!',
  'log.craft.dry': '🔥 Du hast dein Fell am Feuer getrocknet – schön warm!',
  'log.craft.fireIdle': '🔥 Das Lagerfeuer knistert. (Bring einen Lachs zum Grillen mit)',
  'log.craft.needSkill': '🔒 Erfordert die Fähigkeit [{skill}] zum Herstellen.',   /* 插值: {skill} */
  'log.craft.done': '🔨 Hergestellt: {name}!',                                    /* 插值: {name} */
  'log.bed.curl': '😴 Du kuschelst dich auf dem weichen Strohbett zusammen ...',
  'log.bed.wake': '🌅 Du erwachst im Morgengrauen, frisch und munter. (+34 LP, volle Ausdauer)',
  'log.shelter.sleep': '😴 Du kuschelst dich in den Unterstand und schläfst tief ...',
  'log.shelter.wake': '🌅 Du erwachst im Morgengrauen, frisch und munter! (+40 LP, volle Ausdauer)',
  'log.zone.enter': '⛩ Du bist in [{name}] eingetreten!',                         /* 插值: {name} */
  'log.death': '☠️ Du brichst vor Erschöpfung zusammen ... und erwachst im Morgengrauen.',
  'log.stumble': '🐾 Du stolperst und findest wieder Halt.',
  'log.pounce.water': '💦 Du bist fast ins Wasser gefallen und zurück ans Ufer gesprungen! (Fell nass)',
  'log.groom': '✨ Du hast dich geputzt und fühlst dich frisch!',
  'log.catch': '🐾 Ein {name} gefangen!',                                         /* 插值: {name} */
  'log.fish.run': '🎣 Bei der Lachswanderung nebenbei einen erwischt!',
  'log.fish.none': '🐟 Keine Fische am Ufer ... wenn du Durst hast, such eine Quelle (cyaner Geruch).',
  'log.combat.hit': '⚔️ Du triffst {name} für {dmg} Schaden{crit}!',              /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name} ist gefallen.',                                   /* 插值: {name} */
  'log.dodge': '💨 Du weichst dem Angriff flink aus!',
  'log.crit.bang': 'KRITISCHER TREFFER!',
  'log.crit.wrap': '(kritischer Treffer!)',
  'log.damage': '💔 Du erleidest {n} Schaden!',                                   /* 插值: {n} */
  'log.footsteps': '👂 Schritte in der Nähe ...',
  'log.pred.alert': '⚠️ Ein {name} hat dich entdeckt!',                           /* 插值: {name} */
  'log.poison.venom': '💚 Gift spritzt auf dich! (-{dmg} LP, vergiftet!)',         /* 插值: {dmg} */
  'log.poison.tick': '💚 Das Gift wirkt! -{n} LP',                                /* 插值: {n} */
  'log.poison.gone': '🌿 Das Gift lässt nach, du erholst dich.',
  'log.level.up': '🎉 Stufenaufstieg! Du bist jetzt Stufe {level}! (+1 Fähigkeitspunkt)', /* 插值: {level} */
  'log.skill.point': '📌 +{n} Fähigkeitspunkt(e)! (jetzt {points})',              /* 插值: {n} {points} */
  'log.skill.none': '📖 Diese Fähigkeit gibt es nicht!',
  'log.skill.maxed': '📖 {name} ist bereits max (Lv.{max})!',                     /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 Nicht genug Fähigkeitspunkte – nur Aufleveln bringt Fähigkeitspunkte.',
  'log.skill.learned': '⭐ Fähigkeit gelernt: {name} Lv.{lv}/{max}! (-1 Fähigkeitspunkt)', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 Fähigkeitsbuch gefunden: {name}! (Lies es in deinem Beutel)', /* 插值: {name} */
  'log.skill.readBook': '📖 Du liest ein altes Fähigkeitsbuch: +40 EP! (Fähigkeitspunkte gibt es nur beim Aufleveln)',
  'log.equip.off': '⬇️ {name} abgelegt (bleibt im Beutel).',                      /* 插值: {name} */
  'log.equip.on': '⬆️ {name} angelegt!',                                         /* 插值: {name} */
  'log.zoomies': '😵‍💫 Katzenminze!! VERÜCKTE ZICKZACK-RENNEN!!! {name}!',          /* 插值: {name} */
  'log.item.use': '😋 {name} benutzt.',                                           /* 插值: {name} */
  'log.drop.jade': '💎 Aus dem Affennest fällt eine Jade!',
  'log.drop.sapphire': '💎 In der Krokodilhaut steckt ein Saphir!',
  'log.dog.bite': '🐕 Ein Streunerhund hat dich gebissen! (-{dmg} LP)',           /* 插值: {dmg} */
  'log.dog.bark': '🐕 Ein Streunerhund bellt und jagt dich!',
  'log.dog.hit': '🐕 Du triffst den Streunerhund – {crit}er flieht mit eingezogenem Schwanz!', /* 插值: {crit} */
  'log.dog.defeated': '💀 Du hast den Streunerhund vertrieben. (+Sehne +12 EP)',
  'log.boss.boar.charge': '🐗 Der Rieseneber rammt auf dich zu!',
  'log.boss.boar.hit': '🐗 Der Rieseneber schleudert dich durch die Luft! (-{dmg} LP)', /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 Der Riesenwolf beißt dich! (-{dmg} LP)',               /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 Die Königskobra spuckt einen Klumpen Gift!',
  'log.boss.cobra.leap': '🐍 Die Königskobra springt wie ein Pfeil auf dich zu!',
  'log.boss.cobra.leapHit': '🐍 Der Sprung der Kobra trifft dich schwer! (-{dmg} LP, vergiftet!)', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 Die Königskobra kauert sich zusammen und richtet sich auf ... (sie wird spucken!)',
  'log.boss.cobra.leapWindup': '🐍 Die Königskobra hält an und rollt ihren Körper ein ... (sie wird springen!)',
  'log.boss.cobra.bite': '🐍 Die Kobra beißt dich! (-{dmg} LP, vergiftet!)',      /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 Der Knirps feuert einen Stein mit der Schleuder!',
  'log.boss.kid.hit': '💢 Du wurdest von einem Stein getroffen! (-{dmg} LP)',     /* 插值: {dmg} */
  'log.boss.crit': '💥 Kritischer Treffer auf [{name}]! {dmg} Schaden!',          /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 Du hast [{name}] besiegt! Massig EP!',                 /* 插值: {name} */
  'log.boss.respawn': '⚠️ [{name}] ist in der Arena wiederauferstanden!',         /* 插值: {name} */
  'log.feature.berry': '🍓 Du hast ein paar Wildbeeren gegessen. (+Sättigung, +2 LP)',
  'log.feature.catnip': '🌿 Frische Katzenminze geerntet.',
  'log.feature.herbs': '🌼 Kräuter gesammelt.',
  'log.feature.cactus': '🌵 Du brichst eine Kaktusfrucht ab – Nektar der Wüste!',
  'log.feature.dragonherb': '🌹 Du pflückst scharlachrotes Drachenblutkraut, starke Wirkung!',
  'log.feature.reishi': '🍄 Du pflückst einen Reishi vom uralten Baum, schimmernd vor Kraft.',
  'log.feature.vine': '🪵 Du schneidest eine robuste Ranke ab.',
  'log.feature.spring': '💧 Du trinkst aus der klaren Quelle.',
  'log.feature.gem': '💎 Edelstein abgebaut: {name}! (erscheint in 60 s wieder)', /* 插值: {name} */
  'log.feature.trash': '🗑 Du hast {name} aus dem Müll gefischt!',                /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 Der Mülleimer ist leer ...',
  'log.feature.forest': '🍂 Du sammelst im Wald ein paar Materialien.',
  'log.feature.nothing': '😺 Hier gibt es nichts zum Interagieren ...',
  'log.companion.warn': '🐈 {name} faucht: Ein Räuber ist in der Nähe!',          /* 插值: {name} */
  'log.companion.gift': '🎁 {name} bringt dir {gift}!',                           /* 插值: {name} {gift} */
  'log.pet': '🐾 Du streichelst {name} – es schnurrt zufrieden. (+{n} ♥)',        /* 插值: {name} {n} */
  'log.pet.first': '😺 {name} taut auf – streichle weiter oder füttere es über das Katzenmenü, um schneller Freunde zu werden!', /* 插值: {name} */
  'log.pet.ready': '💗 {name} ist bereit, dein Freund zu werden – adoptiere es über das Katzenmenü!', /* 插值: {name} */
  'log.feed.none': '🍽️ Du hast gerade kein Futter zum Teilen (Lachs, gegrillter Lachs oder Maus).',
  'log.feed': '🍖 Du gibst {name} {item}! (+{n} ♥)',                              /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 {name} liebt es! Mach weiter, dann wird es dir vertrauen.', /* 插值: {name} */
  'log.adopt.notReady': '💭 {name} ist noch nicht bereit – streichle und füttere weiter (60 ♥ nötig).', /* 插值: {name} */
  'log.adopt.ok': '🎉 {name} ist jetzt dein Freund! Es wird dir überallhin folgen.', /* 插值: {name} */
  'log.perk.warn': '🐈 {name} warnt dich jetzt vor Gefahren!',                    /* 插值: {name} */
  'log.perk.hunt': '🐈 {name} jagt jetzt an deiner Seite (+Schaden)!',            /* 插值: {name} */
  'log.summon.end': '🐈 {name} hat den Kampf beendet und kehrt zu dir zurück.',   /* 插值: {name} */
  'log.summon.cd': '📣 Ruf in Abklingzeit ({n} s)',                               /* 插值: {n} */
  'log.summon.none': '😿 Du hast keine Begleiterkatze – adoptiere zuerst eine Streunerkatze!',
  'log.summon.ok': '📣 {name} folgt dem Ruf und kämpft an deiner Seite! (Abklingzeit {n} Min.)', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 {name} springt den Feind an! ({dmg} Schaden)',        /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ Rivalenkatzen dringen in dein Revier ein – spring sie an, um sie zu vertreiben!',
  'log.challenge.rival.hit': '🐈‍⬛ Du schlägst eine Rivalenkatze weg!',
  'log.challenge.rival.fled': '💨 Die Rivalenkatzen fliehen!',
  'log.challenge.rival.mark': '⚠️ Eine Rivalenkatze markiert dein Revier!',
  'log.challenge.rival.swat': '🐈‍⬛ Eine Rivalenkatze kratzt dich! (-{n} LP)',    /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ Rivalenkatzen haben Teile deines Reviers übernommen! Sie haben {name} gestohlen!', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ Rivalenkatzen haben Teile deines Reviers übernommen! Deine Stimmung stürzt ab ...',
  'log.challenge.rival.win': '🏆 Du hast die Rivalenkatzen vertrieben! (+{n} Stimmung)', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 Eine Rivalenkatze hat eine Sehne fallen gelassen!',
  'log.challenge.dog.start': '🐕 Ein Wildhund jagt dich – renn!',
  'log.challenge.dog.stun': '🐕 Wimmern! Du hast den Wildhund betäubt – renn!',
  'log.challenge.dog.bite': '🐕 Der Wildhund beißt dich! (-{n} LP)',             /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 Der Wildhund hat dich übel zugerichtet ...',
  'log.challenge.dog.bark': '🐕 Wuff! Wuff!',
  'log.challenge.dog.win': '🏆 Du bist dem Wildhund entkommen! (+{n} Ausdauer)',  /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ Sturm und Blitz – such Schutz!',
  'log.challenge.storm.hit': '⚡ Ein Blitz schlägt neben dir ein! (-{n} LP)',     /* 插值: {n} */
  'log.challenge.storm.far': '⚡ Ein Blitz kracht nicht weit entfernt!',
  'log.challenge.storm.safe': '⚡ Draußen tobt der Sturm – in der Höhle bist du sicher.',
  'log.challenge.storm.warn': '⚡ Der Blitz wird gleich einschlagen! Such Schutz!',
  'log.challenge.storm.win': '🏆 Du hast den Sturm überstanden! (+{n} Stimmung)', /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 Lachswanderung! Angle am Fluss – Fang garantiert!',
  'log.challenge.salmon.win': '🏆 Die Lachswanderung ist vorbei – reiche Ausbeute!',
  'log.challenge.viper.start': '🐍 Vipern umzingeln dich – wehr sie ab!',
  'log.challenge.viper.kill': '💀 Du hast eine Viper zerquetscht! (+Kräuter)',
  'log.challenge.viper.bite': '🐍 Eine Viper beißt dich! (-{n} LP)',             /* 插值: {n} */
  'log.challenge.viper.win': '🏆 Du hast die Vipern abgewehrt! (+{n} Stimmung)',  /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 Ein Wolfsrudel belauert dich – wehr dich oder flieh!',
  'log.challenge.wolf.kill': '💀 Du hast einen Wolf erlegt! (+18 EP)',
  'log.challenge.wolf.stagger': '🐺 Der Wolf taumelt!',
  'log.challenge.wolf.bite': '🐺 Ein Wolf beißt dich! (-{n} LP)',                /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 Du hast das Rudel überlebt! (+10 Stimmung)',
  'log.challenge.stampede.start': '🐗 Eberstampede! Weich den rasenden Ebern aus!',
  'log.challenge.stampede.hit': '🐗 Ein rasender Eber trampelt auf dir herum! (-{n} LP)', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 Du hast der Stampede ausgewichen! (+{n} Stimmung)', /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 Ein Adler kreist über dir – weich seinem Sturzflug aus!',
  'log.challenge.eagle.hit': '🦅 Adlerkrallen kratzen dich! (-{n} LP)',          /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 Der Adler rauscht an dir vorbei!',
  'log.challenge.eagle.dive': '🦅 Der Adler beginnt den Sturzflug – raus aus dem Schatten!',
  'log.challenge.eagle.win': '🏆 Der Adler ist davongeflogen! (+{n} Stimmung)',  /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ Dichter Nebel – finde die {name}-Bake und entkomme, bevor die Zeit abläuft!', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 Du hast den Weg durch den Nebel gefunden! (+{n} Stimmung)', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ Im Nebel verirrt ... nass und kalt. (-6 Stimmung)',
};
