/* ==========================================================================
   Wilderness Feline Instinct — lang/ru.js
   俄语（Русский）字典：全部 key → 俄语译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js；
     缩写约定：ОЗ = очки здоровья（HP）、ОП = очки опыта（EXP）、Lv.）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.ru = {

  /* ============================================================ ui. HUD/панели/кнопки */
  'ui.hud.time': '{icon} {time} · День {day}',              /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ Ясно',
  'ui.hud.weather.rain': '🌧️ Дождь',
  'ui.hud.weather.mist': '🌫️ Туман',
  'ui.hud.zone': '⛩ {name}',                                /* 插值: {name} */
  'ui.hud.compass': 'Инстинкт',
  'ui.hud.xp': 'ОП',
  'ui.hud.level': 'Lv {n}',                                 /* 插值: {n} */
  'ui.hud.summon.none': '📣 Нет кота-напарника',
  'ui.hud.summon.ready': '📣 Готово (R)',
  'ui.hud.summon.cd': '📣 {n} с',                            /* 插值: {n} */
  'ui.hud.bossDefault': '👹 Босс',
  'ui.hud.boss': '👹 {name}',                               /* 插值: {name} */

  'ui.meter.hp': 'ОЗ',
  'ui.meter.satiety': 'Сытость',
  'ui.meter.hydration': 'Вода',
  'ui.meter.stamina': 'Выносливость',
  'ui.meter.mood': 'Настроение',
  'ui.meter.wetness': 'Влажность',

  'ui.btn.growth': 'Рост и навыки',
  'ui.btn.guide': 'Гайд выживания (G)',
  'ui.btn.inv': 'Инвентарь (I)',
  'ui.btn.friends': 'Друзья-коты (B)',
  'ui.btn.sound': 'Звук вкл/выкл',
  'ui.btn.reset': 'Новая игра',
  'ui.btn.lang': '🌐 {lang}',                               /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> Движение · <b class="text-white">Shift</b> Красться · <b class="text-white">Пробел</b> Прыжок · <b class="text-white">E</b> Нюхать · <b class="text-white">Q</b> Вылизываться · <b class="text-white">F</b> Взаимодействие',

  'ui.touch.pounce': 'Прыжок',
  'ui.touch.sniff': 'Нюхать',
  'ui.touch.groom': 'Вылизываться',
  'ui.touch.interact': 'Взаимодействие',
  'ui.touch.sneak': '🦎 Красться',
  'ui.touch.sneakTitle': 'Вкл/выкл крадучись',
  'ui.touch.summon': '📣 Призвать напарника',
  'ui.touch.summonTitle': 'Призвать кота-напарника (R)',

  'ui.catmenu.title': 'Действия с котом',
  'ui.catmenu.pet': '🐾 Погладить',
  'ui.catmenu.feed': '🍖 Покормить',
  'ui.catmenu.adopt': '🤝 Приютить',
  'ui.catmenu.adopted': '🤝 Приючен',

  'ui.modal.inv.title': '🎒 Инвентарь и крафт',
  'ui.modal.friends.title': '🐈 Друзья-коты',
  'ui.modal.guide.title': '📖 Гайд выживания',
  'ui.modal.growth.title': '📈 Рост и навыки',

  'ui.tab.inv': 'Сумка',
  'ui.tab.craft': 'Крафт',

  'ui.inv.empty': 'Сумка пуста — собирай, рыбачь и охотись, чтобы заполнить её.',
  'ui.inv.use': 'Использовать',
  'ui.inv.equip': 'Надеть',
  'ui.inv.unequip': 'Снять',
  'ui.inv.read': '📖 Читать',
  'ui.inv.equipped': '● Надето',

  'ui.craft.locked': '🔒 Закрыто',
  'ui.craft.needSkill': 'Нужен навык: {skill}',             /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 Только днём',
  'ui.craft.craft': 'Создать',

  'ui.confirm.reset': 'Начать новую игру? Текущее сохранение будет удалено.',
  'ui.confirm.resetTitle': '🆕 Новая игра',
  'ui.confirm.resetDesc': 'Весь прогресс (уровень, навыки, предметы, напарники, прогресс зон) будет удалён, и появится новый мир. Это действие необратимо!',
  'ui.confirm.ok': '🎮 Новая игра',
  'ui.confirm.cancel': 'Отмена',

  'ui.friends.intro': 'Подойди к бездомному коту и нажми <b class="text-slate-200">F</b>, чтобы погладить — над головой появится меню, где можно <b class="text-slate-200">покормить</b> (лосось/мышь) и <b class="text-slate-200">приютить</b> (дружба <b class="text-pink-300">60 ♥</b>). Розовый запах указывает, где коты.',
  'ui.friends.yourPets': '🐾 Твои питомцы ({n})',           /* 插值: {n} */
  'ui.friends.noPets': 'Питомцев пока нет — покорми бездомного до 60 ♥ и приюти его!',
  'ui.friends.strays': '🐈 Бездомные ({n})',                /* 插值: {n} */
  'ui.friends.unknown': 'Ещё {n} бездомных котов бродят в дикой природе — иди по розовому запаху, чтобы найти их.', /* 插值: {n} */
  'ui.friends.none': 'Рядом пока нет котов. Нажми E, чтобы принюхаться, и иди по розовым запаховым следам.',
  'ui.friends.status.adopted': 'Друг ❤️',
  'ui.friends.status.adoptable': 'Можно приютить — подойди и нажми F!',
  'ui.friends.status.approaching': '{n}/60 ♥ Можно приютить', /* 插值: {n} */
  'ui.friends.status.shy': 'Стесняется — сначала погладь',
  'ui.friends.friendship.best': '❤️ Лучший друг',
  'ui.friends.friendship.percent': '♥ {n}%',                /* 插值: {n} */
  'ui.friends.friendship.shy': '— Стесняется —',

  'ui.perk.mood': 'Аура настроения',
  'ui.perk.warn': 'Предупреждение об опасности',
  'ui.perk.hunt': 'Помощь в охоте',

  'ui.branch.hunt': '🎯 Охота',
  'ui.branch.survive': '🛡️ Выживание',
  'ui.branch.bond': '🐈 Связь',
  'ui.branch.dodge': '💨 Уклонение',
  'ui.branch.craft': '🔨 Крафт',

  'ui.skill.maxed': 'Макс.',
  'ui.skill.upgrade': 'Улучшить',
  'ui.skill.learn': 'Изучить',
  'ui.skill.lv': 'Lv.{lv}/{max}',                           /* 插值: {lv} {max} */

  'ui.growth.skillPoints': 'Очки навыков: {n}',             /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} ОП',                       /* 插值: {xp} {need} */
  'ui.growth.bonus': 'Бонус уровня: +{hp} макс. ОЗ · +{st} макс. выносливости · +{mood} макс. настроения · +{regen}% восстановления выносливости', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': 'Шанс крита от настроения: <b class="text-amber-300">{pct}%</b> (чем лучше настроение, тем выше шанс крита — двойной урон)', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': 'Очки навыков даются только за повышение уровня — по +1 за уровень, так что планируй прокачку; Инстинкт охотника / Смертельный прыжок / Густая шерсть / Живучесть / Проворное уклонение / Мастер-крафтер можно прокачивать повторно.',
  'ui.growth.skillTree': '📖 Дерево навыков (вложено {n} очков)', /* 插值: {n} */
  'ui.growth.journey': '🌱 Путь роста',

  'ui.journey.days': 'Дней выжито',
  'ui.journey.prey': 'Поймано добычи',
  'ui.journey.predators': 'Убито хищников',
  'ui.journey.fish': 'Поймано рыбы',
  'ui.journey.pets': 'Приютено питомцев',
  'ui.journey.challenges': 'Побед в испытаниях',
  'ui.journey.xp': 'Всего ОП',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': 'Дикая степь',
  'zone.1': 'Городской квартал',
  'zone.2': 'Сухая пустошь',
  'zone.3': 'Мрачный лес',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': 'Гигантский кабан',
  'boss.1': 'Сорванец с рогаткой',
  'boss.2': 'Гигантский волк',
  'boss.3': 'Большая кобра',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': 'Кабан',
  'enemy.fox': 'Лиса',
  'enemy.viper': 'Гадюка',
  'enemy.monkey': 'Обезьяна',
  'enemy.croc': 'Крокодил',
  'enemy.mouse': 'Полевая мышь',
  'enemy.grasshopper': 'Кузнечик',
  'enemy.salmon': 'Лосось',
  'enemy.straydog': 'Бродячий пёс',
  'enemy.rival': 'Кот-соперник',
  'enemy.dog': 'Дикая собака',
  'enemy.wolf': 'Волк',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': 'Лесные ягоды',
  'item.berry.desc': 'Сладкие лесные ягоды — восстанавливают немного ОЗ.',
  'item.mouse.name': 'Полевая мышь',
  'item.mouse.desc': 'Жирная полевая мышь — восстанавливает выносливость.',
  'item.grasshopper.name': 'Кузнечик',
  'item.grasshopper.desc': 'Хрустящий маленький прыгун.',
  'item.salmon.name': 'Лосось',
  'item.salmon.desc': 'Свежепойманный лосось, богатый питательными веществами.',
  'item.cooked_salmon.name': 'Жареный лосось',
  'item.cooked_salmon.desc': 'С дымком, нежный и сочный — настоящее пиршество.',
  'item.catnip.name': 'Свежая кошачья мята',
  'item.catnip.desc': 'Мгновенно взбадривает.',
  'item.dried_catnip.name': 'Сушёная кошачья мята',
  'item.dried_catnip.desc': 'Вдвое сильнее!',
  'item.herbs.name': 'Травы',
  'item.herbs.desc': 'Успокаивающие дикие травы.',
  'item.leaves.name': 'Листья',
  'item.leaves.desc': 'Широкие зелёные листья.',
  'item.vines.name': 'Лоза',
  'item.vines.desc': 'Крепкая и гибкая лоза.',
  'item.fishbone.name': 'Рыбья кость',
  'item.fishbone.desc': 'Чистая белая рыбья кость.',
  'item.sinew.name': 'Сухожилие',
  'item.sinew.desc': 'Прочное животное сухожилие.',
  'item.fat.name': 'Кабаний жир',
  'item.fat.desc': 'Толстый жирный слой сала.',
  'item.herb_salve.name': 'Травяная мазь',
  'item.herb_salve.desc': 'Нанеси на раны — восстановит 32 ОЗ.',
  'item.leaf_hat.name': 'Шляпа из листьев',
  'item.leaf_hat.desc': 'Защищает от дождя; -2 урона за удар (защита).',
  'item.fishbone_collar.name': 'Ошейник из рыбьей кости',
  'item.fishbone_collar.desc': 'Атака +3 (+1 за уровень Крафтера); бездомные быстрее доверяют тебе.',
  'item.cat_tooth_necklace.name': 'Ожерелье из кошачьих клыков',
  'item.cat_tooth_necklace.desc': 'Атака +20% (+4% за уровень Крафтера): наноси больше урона врагам.',
  'item.catnip_tea.name': 'Чай из кошачьей мяты',
  'item.catnip_tea.desc': 'Горячий чай мгновенно восстанавливает 25 выносливости.',
  'item.energy_potion.name': 'Энергетическое зелье',
  'item.energy_potion.desc': 'Алхимическая эссенция, мгновенно восстанавливает 55 выносливости.',
  'item.gem_ruby.name': 'Рубин',
  'item.gem_ruby.desc': 'Пылающий рубин, рождённый в вулканической лаве — ценный материал.',
  'item.gem_sapphire.name': 'Сапфир',
  'item.gem_sapphire.desc': 'Глубокий сапфир из тёмных вод — ценный материал.',
  'item.gem_jade.name': 'Нефрит',
  'item.gem_jade.desc': 'Изумрудный нефрит, рождённый древними корнями — ценный материал.',
  'item.flame_ruby_pendant.name': 'Подвеска «Пламенный рубин»',
  'item.flame_ruby_pendant.desc': 'Атака +40% (+8% за уровень Крафтера) — сильнее ожерелья из кошачьих клыков.',
  'item.sapphire_star.name': 'Сапфировая звезда',
  'item.sapphire_star.desc': 'Атака +25% и шанс крита +12%.',
  'item.jade_charm.name': 'Нефритовый амулет',
  'item.jade_charm.desc': '-6 урона за удар (-1 за уровень Крафтера) — твёрдый как нефрит.',
  'item.cactus_fruit.name': 'Плод кактуса',
  'item.cactus_fruit.desc': 'Оазис пустыни: +30 воды.',
  'item.dragon_herb.name': 'Драконья трава',
  'item.dragon_herb.desc': 'Алая трава из трещин вулкана; съешь — восстановит 18 ОЗ.',
  'item.reishi.name': 'Рейши',
  'item.reishi.desc': 'Эликсир древнего дерева: +12 ОЗ, +10 настроения.',
  'item.vine_strand.name': 'Лиана',
  'item.vine_strand.desc': 'Прочные лианы из Мрачного леса — материал для брони.',
  'item.vine_armor.name': 'Броня из лиан',
  'item.vine_armor.desc': '-7 урона за удар (-1 за уровень Крафтера); в дождь почти не мокнет.',
  'item.stone_claw.name': 'Каменный коготь',
  'item.stone_claw.desc': 'Атака +8 (+2 за уровень Крафтера) — когти с осколками самоцветов.',
  'item.dragon_potion.name': 'Зелье драконьей крови',
  'item.dragon_potion.desc': 'Кипящая эссенция драконьей крови — мгновенно восстанавливает 60 ОЗ.',
  'item.book_hunter.name': 'Инстинкт охотника',
  'item.book_hunter.desc': 'Урон прыжка +15%, больше радиус захвата.',
  'item.book_swift.name': 'Быстрые когти',
  'item.book_swift.desc': 'Скорость +10%, восстановление выносливости +25%.',
  'item.book_thick.name': 'Густая шерсть',
  'item.book_thick.desc': 'Получаемый урон -25%.',
  'item.book_keen.name': 'Чуткий нос',
  'item.book_keen.desc': 'Радиус нюха +40%, запаховые следы плотнее.',
  'item.book_brave.name': 'Храброе сердце',
  'item.book_brave.desc': 'Макс. настроение +25%, награды за испытания +50%.',
  'item.book_angler.name': 'Рыбацкий хвост',
  'item.book_angler.desc': 'Рыбалка всегда успешна.',
  'item.book_guardian.name': 'Сила хранителя',
  'item.book_guardian.desc': 'Рост дружбы +50%, помощь в охоте +4.',
  'item.book_camo.name': 'Лиственная маскировка',
  'item.book_camo.desc': 'Укрытие в высокой траве удваивается; красться стоит меньше выносливости.',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': 'Шляпа из листьев',
  'recipe.leaf_hat.desc': 'Защищает от дождя; -2 урона за удар (защита).',
  'recipe.fishbone_collar.name': 'Ошейник из рыбьей кости',
  'recipe.fishbone_collar.desc': 'Атака +3; бездомные быстрее доверяют тебе.',
  'recipe.cat_tooth_necklace.name': 'Ожерелье из кошачьих клыков',
  'recipe.cat_tooth_necklace.desc': 'Атака +20%, наноси больше урона врагам.',
  'recipe.dried_catnip.name': 'Сушёная кошачья мята',
  'recipe.dried_catnip.desc': 'Мощный заряд — нужно сушить днём.',
  'recipe.herb_salve.name': 'Травяная мазь',
  'recipe.herb_salve.desc': 'Нанеси на раны — восстановит 32 ОЗ.',
  'recipe.catnip_tea.name': 'Чай из кошачьей мяты',
  'recipe.catnip_tea.desc': 'Выносливость +25, действует мгновенно.',
  'recipe.energy_potion.name': 'Энергетическое зелье',
  'recipe.energy_potion.desc': 'Выносливость +55. Требуется навык [Травяная алхимия].',
  'recipe.flame_ruby_pendant.name': 'Подвеска «Пламенный рубин»',
  'recipe.flame_ruby_pendant.desc': 'Атака +40% — украшение высшего класса.',
  'recipe.sapphire_star.name': 'Сапфировая звезда',
  'recipe.sapphire_star.desc': 'Атака +25%, крит +12%.',
  'recipe.jade_charm.name': 'Нефритовый амулет',
  'recipe.jade_charm.desc': '-6 урона за удар.',
  'recipe.vine_armor.name': 'Броня из лиан',
  'recipe.vine_armor.desc': 'Защита -7, в дождь почти не мокнет.',
  'recipe.stone_claw.name': 'Каменный коготь',
  'recipe.stone_claw.desc': 'Атака +8 — серьёзная прибавка к урону.',
  'recipe.dragon_potion.name': 'Зелье драконьей крови',
  'recipe.dragon_potion.desc': 'Мгновенно восстанавливает 60 ОЗ. Требуется [Травяная алхимия].',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': 'Инстинкт охотника',
  'skill.hunter.desc': 'За уровень: урон прыжка +15%, больше радиус захвата',
  'skill.leap.name': 'Смертельный прыжок',
  'skill.leap.desc': 'За уровень: дальность прыжка +20% (макс. +60%)',
  'skill.keen.name': 'Чуткий нос',
  'skill.keen.desc': 'Радиус нюха +40%, запаховые следы плотнее',
  'skill.angler.name': 'Рыбацкий хвост',
  'skill.angler.desc': 'Рыбалка всегда успешна',
  'skill.swift.name': 'Быстрые когти',
  'skill.swift.desc': 'За уровень: скорость +10 % (макс. +30 %), восстановление выносливости +8 %',
  'skill.thick.name': 'Густая шерсть',
  'skill.thick.desc': 'За уровень: получаемый урон -12% (макс. -47%)',
  'skill.camo.name': 'Лиственная маскировка',
  'skill.camo.desc': 'Укрытие в высокой траве удваивается; красться стоит меньше выносливости',
  'skill.vitality.name': 'Живучесть',
  'skill.vitality.desc': 'За уровень: скорость восстановления выносливости +30% (макс. +150%)',
  'skill.guardian.name': 'Сила хранителя',
  'skill.guardian.desc': 'Рост дружбы +50%, помощь в охоте +4',
  'skill.brave.name': 'Храброе сердце',
  'skill.brave.desc': 'Макс. настроение +25%, награды за испытания +50%',
  'skill.summon.name': 'Усиление призыва',
  'skill.summon.desc': 'Время призыва 25→40 с, перезарядка 5→3 мин',
  'skill.dodge.name': 'Проворное уклонение',
  'skill.dodge.desc': 'За уровень: 6% шанс полностью уклониться от урона (макс. 30%)',
  'skill.agile.name': 'Лёгкий как пёрышко',
  'skill.agile.desc': 'Стоимость прыжка -40% выносливости, перезарядка -0.2 с',
  'skill.craft.name': 'Мастер-крафтер',
  'skill.craft.desc': 'За уровень: эффекты созданных предметов +20%, бонусы снаряжения тоже растут',
  'skill.alchemist.name': 'Травяная алхимия',
  'skill.alchemist.desc': 'Открывает мощные рецепты вроде энергетического зелья',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ Испытание',
  'challenge.rival.title': '🐈‍⬛ Вторжение на территорию',
  'challenge.rival.desc': 'Коты-соперники захватывают твою территорию — прыгай и прогоняй их!',
  'challenge.dog.title': '🐕 Погоня!',
  'challenge.dog.desc': 'Беги! Прячься в высокой траве или удирай в пещеру!',
  'challenge.storm.title': '⛈️ Гроза',
  'challenge.storm.desc': 'Скорее ищи укрытие от молний!',
  'challenge.salmon.title': '🐟 Ход лосося',
  'challenge.salmon.desc': 'Рыбачь у реки — улов гарантирован!',
  'challenge.viper.title': '🐍 Нашествие гадюк',
  'challenge.viper.desc': 'Отбейся от гадюк!',
  'challenge.wolf.title': '🐺 Волчья стая!',
  'challenge.wolf.desc': 'Стая охотится на тебя — дай отпор или беги в пещеру!',
  'challenge.stampede.title': '🐗 Бег кабанов!',
  'challenge.stampede.desc': 'Уклоняйся от несущихся кабанов!',
  'challenge.eagle.title': '🦅 Пикирующий орёл!',
  'challenge.eagle.desc': 'Следи за тенями — уворачивайся от пикирующего орла!',
  'challenge.fog.title': '🌫️ Потерялся в тумане!',
  'challenge.fog.desc': 'Найди маяк (пещеру или источник) до того, как время выйдет!',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                               /* 插值: {name} */
  'feature.prompt.gate': 'Идти: {name}',                     /* 插值: {name} */
  'feature.prompt.berry': 'Съесть ягоды',
  'feature.prompt.pickup': 'Подобрать',
  'feature.prompt.spring': 'Попить',
  'feature.prompt.gem': 'Добыть самоцвет',
  'feature.prompt.harvest': 'Собрать',
  'feature.prompt.vine': 'Срезать лиану',
  'feature.prompt.sleep': 'Спать',
  'feature.prompt.trash': 'Покопаться в мусоре',
  'feature.prompt.enter': 'Войти',
  'feature.prompt.fish': 'Рыбачить',
  'feature.prompt.pet': 'Погладить',
  'feature.prompt.workbench': 'F — Создать предмет',
  'feature.prompt.fire': 'F — Готовить / Сушиться',
  'feature.prompt.bed': 'F — Спать до рассвета',
  'feature.prompt.exit': 'F — Покинуть пещеру',
  'feature.shelter.hollow': '🛏 Укрытие в дупле',
  'feature.shelter.alley': '🛏 Укрытие в переулке',
  'feature.beacon': '📍 Маяк: {name}',                       /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 Управление',
  'guide.controls.move': '<b class="text-slate-200">WASD / Стрелки</b> — движение',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — красться (прячься в высокой траве)',
  'guide.controls.pounce': '<b class="text-slate-200">Пробел</b> — прыжок / атака',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — принюхаться (запаховые следы)',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — вылизать шерсть (+настроение)',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — взаимодействие / погладить / рыбачить',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — призвать кота-напарника (перезарядка 5 мин)',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — открыть панели',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — закрыть панель',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 Нюх и запахи',
  'guide.smell.p1': 'Нажми <b class="text-slate-200">E</b> — цветные запаховые следы, которые несёт ветер, расскажут, что вокруг:',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">Голубой</b> — чистые источники и вода',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">Золотой</b> — добыча: мыши, лосось, кузнечики',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">Розовый</b> — дружелюбные бездомные коты',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">Красный</b> — хищники: кабаны, гадюки, лисы',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">Оранжевый</b> — коты-соперники, вторгшиеся на твою территорию',
  'guide.smell.p2': 'Компас <b class="text-slate-200">«Инстинкт»</b> наверху всегда указывает на ближайший источник запаха.',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 Советы по выживанию',
  'guide.tips.1': 'Пей из <b class="text-slate-200">источника</b> (голубой) и рыбачь на берегу, нажимая <b class="text-slate-200">F</b>.',
  'guide.tips.2': 'Дождь мочит шерсть — <b class="text-slate-200">мокрая шерсть</b> замедляет восстановление выносливости. Скрафти <b class="text-slate-200">шляпу из листьев</b> или высушись у костра в пещере.',
  'guide.tips.3': 'Крадись через <b class="text-slate-200">высокую траву</b>, чтобы избежать хищников, и наноси смертельный прыжок.',
  'guide.tips.4': 'Пещеры — безопасное убежище: спи в кровати до рассвета, восстанавливая ОЗ, и жарь лосося у костра.',
  'guide.tips.5': 'Нажми <b class="text-slate-200">Q</b>, чтобы вылизаться и поднять настроение; слишком низкое настроение ослабляет тебя.',
  'guide.tips.6': 'Подружись с бездомными (розовый) — при высокой дружбе они предупреждают об опасности и сражаются рядом.',
  'guide.tips.7': 'Кошачья мята — мощный стимулятор... но вызывает «безумный забег». Пользуйся с осторожностью.',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 Рецепты крафта',
  'guide.recipes.1': '<b class="text-slate-200">Шляпа из листьев</b> — Листья ×3 + Лоза ×2 (защита: -2 урона за удар)',
  'guide.recipes.2': '<b class="text-slate-200">Ошейник из рыбьей кости</b> — Рыбья кость ×3 + Сухожилие ×1 (атака +3, рост дружбы +50%)',
  'guide.recipes.3': '<b class="text-slate-200">Ожерелье из кошачьих клыков</b> — Рыбья кость ×4 + Сухожилие ×2 (атака +20%)',
  'guide.recipes.4': '<b class="text-slate-200">Сушёная кошачья мята</b> — Кошачья мята ×2 (нужен день)',
  'guide.recipes.5': '<b class="text-slate-200">Травяная мазь</b> — Травы ×3 + Кабаний жир ×1',
  'guide.recipes.6': '<b class="text-slate-200">Чай из кошачьей мяты</b> — Кошачья мята ×1 + Травы ×1 (выносливость +25, мгновенно)',
  'guide.recipes.7': '<b class="text-slate-200">Энергетическое зелье</b> — Кошачья мята ×2 + Травы ×2 + Кабаний жир ×1 (выносливость +55, нужен навык [Травяная алхимия])',
  'guide.recipes.8': '<b class="text-slate-200">Подвеска «Пламенный рубин»</b> — Рубин ×1 + Рыбья кость ×2 + Сухожилие ×1 (атака +40%)',
  'guide.recipes.9': '<b class="text-slate-200">Сапфировая звезда</b> — Сапфир ×1 + Рыбья кость ×2 + Сухожилие ×1 (атака +25%, крит +12%)',
  'guide.recipes.10': '<b class="text-slate-200">Нефритовый амулет</b> — Нефрит ×1 + Листья ×2 + Лоза ×2 (-6 урона за удар)',
  'guide.recipes.11': '<b class="text-slate-200">Броня из лиан</b> — Лиана ×3 + Листья ×2 + Лоза ×2 (-7 урона за удар, в дождь почти не мокнет)',
  'guide.recipes.12': '<b class="text-slate-200">Каменный коготь</b> — Рубин ×1 + Сухожилие ×2 + Рыбья кость ×2 (атака +8, серьёзная прибавка к урону)',
  'guide.recipes.13': '<b class="text-slate-200">Зелье драконьей крови</b> — Драконья трава ×2 + Травы ×1 + Кабаний жир ×1 (восстанавливает 60 ОЗ, нужна [Травяная алхимия])',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 Рост и навыки',
  'guide.growth.1': 'Каждое действие даёт <b class="text-slate-200">ОП</b> — охота, рыбалка, сбор, питомцы, испытания и победы над боссами. Каждый уровень <b class="text-emerald-300">навсегда</b> добавляет +10 макс. ОЗ, +6 макс. выносливости, +6 макс. настроения, а восстановление выносливости ускоряется с уровнем.',
  'guide.growth.2': 'Повышение уровня, победы в испытаниях и победы над боссами дают <b class="text-slate-200">ОП</b>; но <b class="text-amber-300">очки навыков даются только за уровень</b> (+1 за уровень), так что планируй внимательно. Свободно вкладывай очки в <b class="text-slate-200">пять веток</b> на панели 📈 Рост: 🎯Охота, 🛡️Выживание, 🐈Связь, 💨Уклонение, 🔨Крафт.',
  'guide.growth.3': '<b class="text-slate-200">Инстинкт охотника</b> (урон), <b class="text-slate-200">Смертельный прыжок</b> (дальность прыжка), <b class="text-slate-200">Густая шерсть</b> (снижение урона), <b class="text-slate-200">Живучесть</b> (восстановление выносливости), <b class="text-slate-200">Проворное уклонение</b> (шанс уклонения) и <b class="text-slate-200">Мастер-крафтер</b> (эффекты крафта) можно <b class="text-amber-300">прокачивать повторно</b> — огромный потенциал роста.',
  'guide.growth.4': '<b class="text-slate-200">Травяная алхимия</b> открывает <b class="text-slate-200">энергетическое зелье</b>; <b class="text-slate-200">чай из кошачьей мяты</b> тоже отлично восстанавливает выносливость — не забудь глотнуть, когда она на исходе.',
  'guide.growth.5': '⚖️ <b class="text-amber-300">Динамическая сложность</b>: монстры, боссы и испытания растут <b class="text-slate-200">вместе с твоим уровнем</b> (Дикая степь &lt; Городской квартал &lt; Сухая пустошь &lt; Мрачный лес, глубже — сильнее) — даже на высоком уровне не расслабляйся; испытания и награды растут вместе.',
  'guide.growth.6': '🐾 <b class="text-amber-300">Темп роста</b>: плотность монстров растёт с уровнем (+30% каждые 5 уровней), монстры <b class="text-slate-200">медленно возрождаются</b> в зонах, а кривая ОП остаётся пологой — иди в зоны выше, чтобы качаться быстрее, а не сидеть на одном месте.',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ Зоны и боссы',
  'guide.zones.1': '<b class="text-slate-200">Порталы</b> на краю карты ведут в новые зоны: <b class="text-slate-200">Городской квартал</b>, <b class="text-slate-200">Сухая пустошь</b> и <b class="text-slate-200">Мрачный лес</b> — <b class="text-emerald-300">без ограничений по уровню</b>, заходи и выходи свободно.',
  'guide.zones.2': 'В каждой зоне в <b class="text-slate-200">правом нижнем углу</b> живёт <b class="text-slate-200">босс</b>: Гигантский кабан (таран), Сорванец с рогаткой (камни издалека), Гигантский волк (молниеносные укусы) и <b class="text-rose-300">Большая кобра</b> — финальный босс, огромная, плюётся <b class="text-rose-300">ядом</b> (долгое отравление) и совершает <b class="text-rose-300">дальние прыжки</b> (перед прыжком высоко приподнимается). Она охраняет <b class="text-amber-300">портал в следующую зону</b> — чтобы продвигаться, сначала победи босса. За них дают много ОП (очки навыков по-прежнему только за уровень).',
  'guide.zones.3': '🌋 В <b class="text-slate-200">Сухой пустоши</b> огромные <b class="text-slate-200">вулканические кратеры</b> (лава непроходима) и <b class="text-slate-200">залежи самоцветов</b>; <b class="text-rose-300">источников мало, дожди почти не идут</b> — утоляй жажду <b class="text-slate-200">плодами кактуса</b>, собирай <b class="text-slate-200">драконью траву</b> и самоцветы для мощного снаряжения.',
  'guide.zones.4': '🌲 <b class="text-slate-200">Мрачный лес</b> — это длинная <b class="text-slate-200">дорога</b> среди непроходимых деревьев, <b class="text-sky-300">дождливо</b> — собирай <b class="text-slate-200">лианы</b>, чтобы сплести <b class="text-slate-200">броню из лиан</b>, и остерегайся свирепых <b class="text-rose-300">обезьян</b>, <b class="text-rose-300">крокодилов</b> и <b class="text-slate-200">рейши</b>.',
  'guide.zones.5': '🛏 <b class="text-slate-200">Узкие переулки</b> Городского квартала и <b class="text-slate-200">дупла деревьев</b> Мрачного леса — укрытия, где можно спать: проспи до рассвета, восстановив 40 ОЗ и всю выносливость.',
  'guide.zones.6': 'Когда босс рядом, вверху экрана появляется полоса ОЗ; прыжок — твой основной источник урона.',

  /* ============================================================ misc. 杂项 */
  'misc.title': 'Дикий инстинкт: выживание сиамского кота',
  'misc.north': 'С',
  'misc.cave': 'Пещера',
  'misc.spring': 'Источник',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ Небо прояснилось.',
  'log.weather.rain': '🌧️ Начинается дождь...',
  'log.weather.mist': '🌫️ Стелется лёгкий туман.',
  'log.boot.wake': '🐱 Ты просыпаешься в дикой природе. Верь своим инстинктам — нажми E, чтобы принюхаться!',
  'log.boot.newJourney': '🌱 Новое путешествие начинается! Всё с нуля.',
  'log.cave.idle': '🏕️ В пещере тихо и безопасно. (Нажми F у костра, кровати, верстака или выхода)',
  'log.cave.noPounce': '😺 Здесь не развернуться для прыжка!',
  'log.cave.enter': '🕳️ Ты проскальзываешь в прохладное пещерное укрытие.',
  'log.cave.exit': '🌤️ Ты возвращаешься в дикую природу.',
  'log.craft.workbench': '🛠 Ты готовишь материалы у верстака.',
  'log.craft.salmon': '🔥 Ты пожарил лосося на костре!',
  'log.craft.dry': '🔥 Ты высушил шерсть у огня — тепло и уютно!',
  'log.craft.fireIdle': '🔥 Костер потрескивает. (Принеси лосося, чтобы пожарить)',
  'log.craft.needSkill': '🔒 Для крафта нужен навык [{skill}].',   /* 插值: {skill} */
  'log.craft.done': '🔨 Создано: {name}!',                         /* 插值: {name} */
  'log.bed.curl': '😴 Ты сворачиваешься клубком на мягкой соломенной кровати...',
  'log.bed.wake': '🌅 Ты просыпаешься на рассвете, полный сил. (+34 ОЗ, вся выносливость)',
  'log.shelter.sleep': '😴 Ты забираешься в укрытие и крепко засыпаешь...',
  'log.shelter.wake': '🌅 Ты просыпаешься на рассвете, полный сил! (+40 ОЗ, вся выносливость)',
  'log.zone.enter': '⛩ Ты вошёл: [{name}]!',                      /* 插值: {name} */
  'log.death': '☠️ Ты падаешь от истощения... и просыпаешься на рассвете.',
  'log.stumble': '🐾 Ты споткнулся, но удержался на лапах.',
  'log.pounce.water': '💦 Ты чуть не упал в воду и выкарабкался обратно на берег! (шерсть намокла)',
  'log.groom': '✨ Ты вылизал шерсть и почувствовал себя отлично!',
  'log.catch': '🐾 Поймано: {name}!',                              /* 插值: {name} */
  'log.fish.run': '🎣 Выловил одного во время хода лосося!',
  'log.fish.none': '🐟 У берега нет рыбы... если хочешь пить, найди источник (голубой запах).',
  'log.combat.hit': '⚔️ Удар по {name}: {dmg} урона{crit}!',       /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name} повержен.',                         /* 插值: {name} */
  'log.crit.bang': 'КРИТ! ',                                        /* 暴击后缀（流浪狗命中用） */
  'log.crit.wrap': ' (крит!)',                                      /* 暴击后缀（扑击命中用） */
  'log.dodge': '💨 Ты ловко уклонился от атаки!',
  'log.damage': '💔 Ты получаешь {n} урона!',                       /* 插值: {n} */
  'log.footsteps': '👂 Рядом шаги...',
  'log.pred.alert': '⚠️ Тебя заметили: {name}!',                    /* 插值: {name} */
  'log.poison.venom': '💚 Яд попал на тебя! (-{dmg} ОЗ, отравление!)', /* 插值: {dmg} */
  'log.poison.tick': '💚 Яд действует! -{n} ОЗ',                    /* 插值: {n} */
  'log.poison.gone': '🌿 Яд прошёл, ты восстановился.',
  'log.level.up': '🎉 Уровень повышен! Теперь ты {level} уровня! (+1 очко навыка)', /* 插值: {level} */
  'log.skill.point': '📌 Очки навыков: +{n}! (сейчас {points})',    /* 插值: {n} {points} */
  'log.skill.none': '📖 Нет такого навыка!',
  'log.skill.maxed': '📖 {name} уже прокачан до макс. (Lv.{max})!', /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 Не хватает очков навыков — очки даются только за уровень.',
  'log.skill.learned': '⭐ Изучен навык: {name} Lv.{lv}/{max}! (-1 очко навыка)', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 Найдена книга навыка: {name}! (прочитай в сумке)', /* 插值: {name} */
  'log.skill.readBook': '📖 Ты читаешь старую книгу навыков: +40 ОП! (очки навыков даются только за уровень)',
  'log.equip.off': '⬇️ Снято: {name} (всё ещё в сумке).',           /* 插值: {name} */
  'log.equip.on': '⬆️ Надето: {name}!',                             /* 插值: {name} */
  'log.zoomies': '😵‍💫 Кошачья мята!! БЕЗУМНЫЙ ЗАБЕГ!!! {name}!',    /* 插值: {name} */
  'log.item.use': '😋 Использовано: {name}.',                        /* 插值: {name} */
  'log.drop.jade': '💎 Из гнезда обезьяны выпал нефрит!',
  'log.drop.sapphire': '💎 В шкуре крокодила застрял сапфир!',
  'log.dog.bite': '🐕 Бродячий пёс укусил тебя! (-{dmg} ОЗ)',       /* 插值: {dmg} */
  'log.dog.bark': '🐕 Бродячий пёс лает и гонится за тобой!',
  'log.dog.hit': '🐕 Ты попал по бродячему псу — {crit}он удирает поджав хвост!', /* 插值: {crit} */
  'log.dog.defeated': '💀 Ты прогнал бродячего пса. (+сухожилие, +12 ОП)',
  'log.boss.boar.charge': '🐗 Гигантский кабан несётся на тебя!',
  'log.boss.boar.hit': '🐗 Гигантский кабан сбил тебя с ног! (-{dmg} ОЗ)', /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 Гигантский волк укусил тебя! (-{dmg} ОЗ)', /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 Большая кобра плюётся ядом!',
  'log.boss.cobra.leap': '🐍 Большая кобра прыгает как стрела!',
  'log.boss.cobra.leapHit': '🐍 Прыжок кобры сокрушает тебя! (-{dmg} ОЗ, отравление!)', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 Большая кобра сворачивается и приподнимается... (сейчас плюнет!)',
  'log.boss.cobra.leapWindup': '🐍 Большая кобра останавливается и сворачивается кольцами... (сейчас прыгнет!)',
  'log.boss.cobra.bite': '🐍 Кобра укусила тебя! (-{dmg} ОЗ, отравление!)', /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 Сорванец стреляет камешком из рогатки!',
  'log.boss.kid.hit': '💢 Тебя задело камешком! (-{dmg} ОЗ)',       /* 插值: {dmg} */
  'log.boss.crit': '💥 Крит по [{name}]! {dmg} урона!',              /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 Ты победил: [{name}]! Много ОП!',         /* 插值: {name} */
  'log.boss.respawn': '⚠️ [{name}] возродился на арене!',            /* 插值: {name} */
  'log.feature.berry': '🍓 Ты съел немного лесных ягод. (+сытость, +2 ОЗ)',
  'log.feature.catnip': '🌿 Собрана свежая кошачья мята.',
  'log.feature.herbs': '🌼 Собраны травы.',
  'log.feature.cactus': '🌵 Ты отломил плод кактуса — нектар пустыни!',
  'log.feature.dragonherb': '🌹 Сорвана алая драконья трава, мощная штука!',
  'log.feature.reishi': '🍄 Сорван рейши с древнего дерева, светится силой.',
  'log.feature.vine': '🪵 Срезана прочная лиана.',
  'log.feature.spring': '💧 Ты пьёшь из чистого источника.',
  'log.feature.gem': '💎 Добыт самоцвет: {name}! (возродится через 60 с)', /* 插值: {name} */
  'log.feature.trash': '🗑 Ты откопал {name} из мусора!',            /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 Мусорка пуста...',
  'log.feature.forest': '🍂 В лесу собраны кое-какие материалы.',
  'log.feature.nothing': '😺 Здесь не с чем взаимодействовать...',
  'log.companion.warn': '🐈 {name} шипит: рядом хищник!',            /* 插值: {name} */
  'log.companion.gift': '🎁 Подарок от {name}: {gift}!',             /* 插值: {name} {gift} */
  'log.pet': '🐾 Ты гладишь {name} — довольное мурлыканье. (+{n} ♥)', /* 插值: {name} {n} */
  'log.pet.first': '😺 {name} начинает доверять тебе — продолжай гладить или покорми из меню кота, чтобы быстрее подружиться!', /* 插值: {name} */
  'log.pet.ready': '💗 {name} готов стать твоим другом — приюти его из меню кота!', /* 插值: {name} */
  'log.feed.none': '🍽️ Сейчас у тебя нет еды, которой можно поделиться (лосось, жареный лосось или мышь).',
  'log.feed': '🍖 Ты даёшь {name}: {item}! (+{n} ♥)',                /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 {name} в восторге! Продолжай в том же духе, и он начнёт тебе доверять.', /* 插值: {name} */
  'log.adopt.notReady': '💭 {name} ещё не готов — продолжай гладить и кормить (нужно 60 ♥).', /* 插值: {name} */
  'log.adopt.ok': '🎉 {name} теперь твой друг! Он будет следовать за тобой повсюду.', /* 插值: {name} */
  'log.perk.warn': '🐈 {name} теперь будет предупреждать тебя об опасности!', /* 插值: {name} */
  'log.perk.hunt': '🐈 {name} теперь будет охотиться рядом с тобой (+урон)!', /* 插值: {name} */
  'log.summon.end': '🐈 {name} закончил бой и вернулся к тебе.',     /* 插值: {name} */
  'log.summon.cd': '📣 Призыв перезаряжается ({n} с)',               /* 插值: {n} */
  'log.summon.none': '😿 У тебя нет кота-напарника — сначала приюти бездомного!',
  'log.summon.ok': '📣 {name} откликается на зов и сражается рядом с тобой! (перезарядка {n} мин)', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 {name} прыгает на врага! ({dmg} урона)',  /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ Коты-соперники вторгаются на твою территорию — прыгай и прогоняй их!',
  'log.challenge.rival.hit': '🐈‍⬛ Ты шлёпнул кота-соперника!',
  'log.challenge.rival.fled': '💨 Коты-соперники удирают!',
  'log.challenge.rival.mark': '⚠️ Кот-соперник метит твою территорию!',
  'log.challenge.rival.swat': '🐈‍⬛ Кот-соперник оцарапал тебя! (-{n} ОЗ)', /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ Коты-соперники захватили часть твоей территории! Они украли {name}!', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ Коты-соперники захватили часть твоей территории! Твоё настроение падает...',
  'log.challenge.rival.win': '🏆 Ты прогнал котов-соперников! (+{n} настроения)', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 Кот-соперник уронил сухожилие!',
  'log.challenge.dog.start': '🐕 За тобой гонится дикая собака — беги!',
  'log.challenge.dog.stun': '🐕 Скулёж! Ты оглушил дикую собаку — беги!',
  'log.challenge.dog.bite': '🐕 Дикая собака укусила тебя! (-{n} ОЗ)', /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 Дикая собака здорово тебя потрепала...',
  'log.challenge.dog.bark': '🐕 Гав! Гав!',
  'log.challenge.dog.win': '🏆 Ты убежал от дикой собаки! (+{n} выносливости)', /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ Гроза и молнии — ищи укрытие!',
  'log.challenge.storm.hit': '⚡ Молния ударила рядом с тобой! (-{n} ОЗ)', /* 插值: {n} */
  'log.challenge.storm.far': '⚡ Где-то рядом грохочет разряд!',
  'log.challenge.storm.safe': '⚡ Снаружи бушует буря — в пещере безопасно.',
  'log.challenge.storm.warn': '⚡ Молния вот-вот ударит! Ищи укрытие!',
  'log.challenge.storm.win': '🏆 Ты пережил бурю! (+{n} настроения)', /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 Ход лосося! Рыбачь у реки — улов гарантирован!',
  'log.challenge.salmon.win': '🏆 Ход лосося закончился — отличный улов!',
  'log.challenge.viper.start': '🐍 Гадюки окружают тебя — отбивайся!',
  'log.challenge.viper.kill': '💀 Ты раздавил гадюку! (+травы)',
  'log.challenge.viper.bite': '🐍 Гадюка укусила тебя! (-{n} ОЗ)',  /* 插值: {n} */
  'log.challenge.viper.win': '🏆 Ты отбился от гадюк! (+{n} настроения)', /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 Волчья стая выслеживает тебя — дай отпор или беги!',
  'log.challenge.wolf.kill': '💀 Ты завалил волка! (+18 ОП)',
  'log.challenge.wolf.stagger': '🐺 Волк шатается от удара!',
  'log.challenge.wolf.bite': '🐺 Волк укусил тебя! (-{n} ОЗ)',       /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 Ты выжил после встречи со стаей! (+10 настроения)',
  'log.challenge.stampede.start': '🐗 Бег кабанов! Уклоняйся от несущихся кабанов!',
  'log.challenge.stampede.hit': '🐗 Несущийся кабан растоптал тебя! (-{n} ОЗ)', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 Ты увернулся от кабаньего бега! (+{n} настроения)', /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 Над головой кружит орёл — уворачивайся от его пике!',
  'log.challenge.eagle.hit': '🦅 Когти орла оцарапали тебя! (-{n} ОЗ)', /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 Орёл пронёсся мимо!',
  'log.challenge.eagle.dive': '🦅 Орёл начинает пике — уйди из тени!',
  'log.challenge.eagle.win': '🏆 Орёл улетел! (+{n} настроения)',    /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ Густой туман — найди маяк: {name} и выбирайся, пока время не вышло!', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 Ты нашёл дорогу сквозь туман! (+{n} настроения)', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ Ты потерялся в тумане... мокро и холодно. (-6 настроения)',
};
