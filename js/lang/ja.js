/* ==========================================================================
   Wilderness Feline Instinct — lang/ja.js
   日语（日本語）字典：全部 key → 日语译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.ja = {

  /* ============================================================ ui. HUD/面板/按钮 */
  'ui.hud.time': '{icon} {time} · {day}日目',              /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ 晴れ',
  'ui.hud.weather.rain': '🌧️ 雨',
  'ui.hud.weather.mist': '🌫️ 霧',
  'ui.hud.zone': '⛩ {name}',                               /* 插值: {name} */
  'ui.hud.compass': '本能',
  'ui.hud.xp': 'EXP',
  'ui.hud.level': 'Lv {n}',                                /* 插值: {n} */
  'ui.hud.summon.none': '📣 パートナー猫なし',
  'ui.hud.summon.ready': '📣 召喚OK(R)',
  'ui.hud.summon.cd': '📣 {n}s',                           /* 插值: {n} */
  'ui.hud.bossDefault': '👹 Boss',
  'ui.hud.boss': '👹 {name}',                              /* 插值: {name} */

  'ui.meter.hp': 'HP',
  'ui.meter.satiety': '満腹度',
  'ui.meter.hydration': '水分',
  'ui.meter.stamina': 'スタミナ',
  'ui.meter.mood': '気分',
  'ui.meter.wetness': '濡れ具合',

  'ui.btn.growth': '成長とスキル',
  'ui.btn.guide': 'サバイバルガイド (G)',
  'ui.btn.inv': 'インベントリ (I)',
  'ui.btn.friends': 'ネコの友達 (B)',
  'ui.btn.sound': 'サウンド切替',
  'ui.btn.reset': 'ニューゲーム',
  'ui.btn.lang': '🌐 {lang}',                              /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> 移動 · <b class="text-white">Shift</b> スニーク · <b class="text-white">スペース</b> 飛びかかり · <b class="text-white">E</b> 嗅ぐ · <b class="text-white">Q</b> 毛づくろい · <b class="text-white">F</b> インタラクト',

  'ui.touch.pounce': '飛びかかり',
  'ui.touch.sniff': '嗅ぐ',
  'ui.touch.groom': '毛づくろい',
  'ui.touch.interact': 'インタラクト',
  'ui.touch.sneak': '🦎 スニーク',
  'ui.touch.sneakTitle': 'スニーク切替',
  'ui.touch.summon': '📣 仲間を召喚',
  'ui.touch.summonTitle': 'パートナー猫を召喚（R）',

  'ui.catmenu.title': 'ネコとのアクション',
  'ui.catmenu.pet': '🐾 なでる',
  'ui.catmenu.feed': '🍖 ごはんをあげる',
  'ui.catmenu.adopt': '🤝 仲間にする',
  'ui.catmenu.adopted': '🤝 仲間',

  'ui.modal.inv.title': '🎒 インベントリ & クラフト',
  'ui.modal.friends.title': '🐈 ネコの友達',
  'ui.modal.guide.title': '📖 サバイバルガイド',
  'ui.modal.growth.title': '📈 成長とスキル',

  'ui.tab.inv': 'バッグ',
  'ui.tab.craft': 'クラフト',

  'ui.inv.empty': 'バッグは空っぽ——採集・釣り・狩りでいっぱいにしよう。',
  'ui.inv.use': '使う',
  'ui.inv.equip': '装備',
  'ui.inv.unequip': '外す',
  'ui.inv.read': '📖 読む',
  'ui.inv.equipped': '● 装備中',

  'ui.craft.locked': '🔒 未開放',
  'ui.craft.needSkill': '必要スキル：{skill}',              /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 昼間のみ',
  'ui.craft.craft': 'クラフト',

  'ui.confirm.reset': 'ニューゲームを開始しますか？現在のセーブデータは消去されます。',
  'ui.confirm.resetTitle': '🆕 ニューゲーム',
  'ui.confirm.resetDesc': '現在の進行状況（レベル、スキル、アイテム、仲間、エリア進行）はすべて消去され、まったく新しい世界が生成されます。この操作は取り消せません！',
  'ui.confirm.ok': '🎮 ニューゲーム',
  'ui.confirm.cancel': 'キャンセル',

  'ui.friends.intro': '野良猫に近づいて <b class="text-slate-200">F</b> でなでると、頭上にアクションメニューが表示されます。<b class="text-slate-200">ごはん</b>（サーモン/ネズミ）をあげたり、<b class="text-pink-300">60 ♥</b> まで親密度を上げて<b class="text-slate-200">仲間にする</b>ことができます。ピンクの匂いがネコの位置を示します。',
  'ui.friends.yourPets': '🐾 あなたのペット（{n}）',        /* 插值: {n} */
  'ui.friends.noPets': 'まだペットがいません——野良猫に 60 ♥ 分ごはんをあげて、仲間にしよう！',
  'ui.friends.strays': '🐈 野良猫（{n}）',                   /* 插值: {n} */
  'ui.friends.unknown': 'あと {n} 匹の野良猫が荒野をうろついています——ピンクの匂いをたどって探しましょう。', /* 插值: {n} */
  'ui.friends.none': '近くにネコはいません。E で嗅いで、ピンクの匂いをたどって探しましょう。',
  'ui.friends.status.adopted': '友達 ❤️',
  'ui.friends.status.adoptable': '仲間にできる——近づいて F！',
  'ui.friends.status.approaching': '{n}/60 ♥ 仲間OK',       /* 插值: {n} */
  'ui.friends.status.shy': '恥ずかしがり——まずなでよう',
  'ui.friends.friendship.best': '❤️ 親友',
  'ui.friends.friendship.percent': '♥ {n}%',                /* 插值: {n} */
  'ui.friends.friendship.shy': '— 恥ずかしがり —',

  'ui.perk.mood': '気分オーラ',
  'ui.perk.warn': '危険予告',
  'ui.perk.hunt': '狩りアシスト',

  'ui.branch.hunt': '🎯 狩り',
  'ui.branch.survive': '🛡️ サバイバル',
  'ui.branch.bond': '🐈 きずな',
  'ui.branch.dodge': '💨 回避',
  'ui.branch.craft': '🔨 クラフト',

  'ui.skill.maxed': '最大レベル',
  'ui.skill.upgrade': 'レベルアップ',
  'ui.skill.learn': '習得',
  'ui.skill.lv': 'Lv.{lv}/{max}',                           /* 插值: {lv} {max} */

  'ui.growth.skillPoints': 'スキルポイント：{n}',            /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} 経験値',                   /* 插值: {xp} {need} */
  'ui.growth.bonus': 'レベルボーナス：最大HP +{hp} · 最大スタミナ +{st} · 最大気分 +{mood} · スタミナ回復 +{regen}%', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': '気分クリティカル率：<b class="text-amber-300">{pct}%</b>（気分が高いほどクリティカルが出やすく、ダメージ2倍）', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': 'スキルポイントはレベルアップ時のみ獲得できます——レベル1ごとに+1。慎重にビルドを計画しましょう。ハンター本能 / 飛びかかり襲撃 / 分厚い毛皮 / 活力みなぎる / 軽やかな回避 / 匠の技は繰り返し強化できます。',
  'ui.growth.skillTree': '📖 スキルツリー（{n} ポイント投入済み）', /* 插值: {n} */
  'ui.growth.journey': '🌱 成長の軌跡',

  'ui.journey.days': '生存日数',
  'ui.journey.prey': '捕獲数',
  'ui.journey.predators': '捕食者撃破数',
  'ui.journey.fish': '釣果数',
  'ui.journey.pets': '仲間にしたペット',
  'ui.journey.challenges': 'チャレンジ勝利数',
  'ui.journey.xp': '累計経験値',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': '荒野の草原',
  'zone.1': '住宅街',
  'zone.2': '乾いた荒野',
  'zone.3': '暗い森',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': '巨大イノシシ',
  'boss.1': 'パチンコの悪ガキ',
  'boss.2': '巨大オオカミ',
  'boss.3': 'キングコブラ',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': 'イノシシ',
  'enemy.fox': 'キツネ',
  'enemy.viper': '毒ヘビ',
  'enemy.monkey': 'サル',
  'enemy.croc': 'ワニ',
  'enemy.mouse': 'ハタネズミ',
  'enemy.grasshopper': 'バッタ',
  'enemy.salmon': 'サーモン',
  'enemy.straydog': '野良犬',
  'enemy.rival': 'ライバル猫',
  'enemy.dog': '野犬',
  'enemy.wolf': 'オオカミ',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': '野イチゴ',
  'item.berry.desc': '甘い森の野イチゴ。食べるとHPが少し回復する。',
  'item.mouse.name': 'ハタネズミ',
  'item.mouse.desc': 'ぷっくり太ったハタネズミ。スタミナを回復する。',
  'item.grasshopper.name': 'バッタ',
  'item.grasshopper.desc': 'パリッと香ばしい小さな跳ね虫。',
  'item.salmon.name': 'サーモン',
  'item.salmon.desc': '獲れたてのサーモン。栄養満点。',
  'item.cooked_salmon.name': '焼きサーモン',
  'item.cooked_salmon.desc': '燻製の香り、柔らかくジューシーで滋養たっぷり。',
  'item.catnip.name': '新鮮なキャットニップ',
  'item.catnip.desc': 'すぐに頭がスッキリする。',
  'item.dried_catnip.name': '干しキャットニップ',
  'item.dried_catnip.desc': '効果は2倍！',
  'item.herbs.name': '薬草',
  'item.herbs.desc': '心落ち着く野の薬草。',
  'item.leaves.name': '葉っぱ',
  'item.leaves.desc': '大きく広がった緑の葉。',
  'item.vines.name': 'ツタ',
  'item.vines.desc': '丈夫でしなやかなツタ。',
  'item.fishbone.name': '魚の骨',
  'item.fishbone.desc': 'きれいで白い魚の骨。',
  'item.sinew.name': 'スジ',
  'item.sinew.desc': '丈夫な動物のスジ。',
  'item.fat.name': 'イノシシの脂',
  'item.fat.desc': '分厚くて脂ぎった脂肪。',
  'item.herb_salve.name': '薬草軟膏',
  'item.herb_salve.desc': '傷口に塗るとHPを32回復する。',
  'item.leaf_hat.name': '葉っぱの雨よけ帽',
  'item.leaf_hat.desc': '雨の日も濡れず、受けるダメージ-2（防御）。',
  'item.fishbone_collar.name': '魚骨の首輪',
  'item.fishbone_collar.desc': '攻撃+3（匠の技レベルごとにさらに+1）。野良猫がより早く懐く。',
  'item.cat_tooth_necklace.name': '猫牙のネックレス',
  'item.cat_tooth_necklace.desc': '攻撃+20%（匠の技レベルごとにさらに+4%）：敵により大きなダメージを与える。',
  'item.catnip_tea.name': 'キャットニップ茶',
  'item.catnip_tea.desc': '熱いお茶を飲むとスタミナが25回復する。',
  'item.energy_potion.name': '活力ポーション',
  'item.energy_potion.desc': '錬金のエッセンス。スタミナを55回復する。',
  'item.gem_ruby.name': 'ルビー',
  'item.gem_ruby.desc': '火山の溶岩で生まれた燃えるようなルビー。貴重な素材。',
  'item.gem_sapphire.name': 'サファイア',
  'item.gem_sapphire.desc': '暗い水の底で育まれた深いサファイア。貴重な素材。',
  'item.gem_jade.name': 'ヒスイ',
  'item.gem_jade.desc': '古い森の根が生んだ深緑の美しい玉。貴重な素材。',
  'item.flame_ruby_pendant.name': '紅炎ルビーのペンダント',
  'item.flame_ruby_pendant.desc': '攻撃+40%（匠の技レベルごとにさらに+8%）——猫牙のネックレスより強力。',
  'item.sapphire_star.name': 'サファイアの星飾り',
  'item.sapphire_star.desc': '攻撃+25%、クリティカル率+12%。',
  'item.jade_charm.name': 'ヒスイのお守り',
  'item.jade_charm.desc': '受けるダメージ-6（匠の技レベルごとにさらに-1）——ヒスイのように硬い。',
  'item.cactus_fruit.name': 'サボテンの実',
  'item.cactus_fruit.desc': '砂漠のオアシスの実：水分+30。',
  'item.dragon_herb.name': '竜血草',
  'item.dragon_herb.desc': '火山の岩の割れ目に生える真紅の薬草。食べるとHPを18回復する。',
  'item.reishi.name': '霊芝',
  'item.reishi.desc': '古木に生える霊薬：HP12回復、気分+10。',
  'item.vine_strand.name': 'ツタの蔓',
  'item.vine_strand.desc': '暗い森の丈夫な蔓。防具を作る素材。',
  'item.vine_armor.name': 'ツタの鎧',
  'item.vine_armor.desc': '受けるダメージ-7（匠の技レベルごとにさらに-1）。雨の日もほとんど濡れない。',
  'item.stone_claw.name': '石の爪',
  'item.stone_claw.desc': '攻撃+8（匠の技レベルごとにさらに+2）——爪先に宝石の欠片がちりばめられている。',
  'item.dragon_potion.name': '竜血ポーション',
  'item.dragon_potion.desc': '煮えたぎる竜血のエッセンス。HPを60回復する。',
  'item.book_hunter.name': 'ハンター本能',
  'item.book_hunter.desc': '飛びかかりダメージ+15%、捕獲範囲が広くなる。',
  'item.book_swift.name': '疾風の爪',
  'item.book_swift.desc': '移動速度+10%、スタミナ回復+25%。',
  'item.book_thick.name': '分厚い毛皮',
  'item.book_thick.desc': '受けるダメージ-25%。',
  'item.book_keen.name': '鋭い嗅覚',
  'item.book_keen.desc': '嗅ぎ分け範囲+40%、匂いがより濃くなる。',
  'item.book_brave.name': '恐れ知らずの心',
  'item.book_brave.desc': '気分の上限+25%、チャレンジ報酬+50%。',
  'item.book_angler.name': '釣り人の尾',
  'item.book_angler.desc': '釣りが必ず成功する。',
  'item.book_guardian.name': '守護の力',
  'item.book_guardian.desc': '友情の獲得+50%、狩りアシスト+4。',
  'item.book_camo.name': '葉っぱのカモフラージュ',
  'item.book_camo.desc': '高い草むらの隠れ効果が2倍になり、スニークのスタミナ消費が減る。',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': '葉っぱの雨よけ帽',
  'recipe.leaf_hat.desc': '雨の日も濡れず、受けるダメージ-2（防御）。',
  'recipe.fishbone_collar.name': '魚骨の首輪',
  'recipe.fishbone_collar.desc': '攻撃+3。野良猫がより早く懐く。',
  'recipe.cat_tooth_necklace.name': '猫牙のネックレス',
  'recipe.cat_tooth_necklace.desc': '攻撃+20%。敵により大きなダメージを与える。',
  'recipe.dried_catnip.name': '干しキャットニップ',
  'recipe.dried_catnip.desc': '強力な覚醒効果 — 昼間に干す必要がある。',
  'recipe.herb_salve.name': '薬草軟膏',
  'recipe.herb_salve.desc': '傷口に塗るとHPを32回復する。',
  'recipe.catnip_tea.name': 'キャットニップ茶',
  'recipe.catnip_tea.desc': 'スタミナ+25。即効性あり。',
  'recipe.energy_potion.name': '活力ポーション',
  'recipe.energy_potion.desc': 'スタミナ+55。【薬草錬金】スキルが必要。',
  'recipe.flame_ruby_pendant.name': '紅炎ルビーのペンダント',
  'recipe.flame_ruby_pendant.desc': '攻撃+40%——最高級のアクセサリー。',
  'recipe.sapphire_star.name': 'サファイアの星飾り',
  'recipe.sapphire_star.desc': '攻撃+25%、クリティカル+12%。',
  'recipe.jade_charm.name': 'ヒスイのお守り',
  'recipe.jade_charm.desc': '受けるダメージ-6。',
  'recipe.vine_armor.name': 'ツタの鎧',
  'recipe.vine_armor.desc': '防御-7、雨の日もほとんど濡れない。',
  'recipe.stone_claw.name': '石の爪',
  'recipe.stone_claw.desc': '攻撃+8——ダメージが大幅にアップ。',
  'recipe.dragon_potion.name': '竜血ポーション',
  'recipe.dragon_potion.desc': 'HPを60回復する。【薬草錬金】が必要。',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': 'ハンター本能',
  'skill.hunter.desc': 'レベルごと：飛びかかりダメージ+15%、捕獲範囲が広くなる',
  'skill.leap.name': '飛びかかり襲撃',
  'skill.leap.desc': 'レベルごと：飛びかかり距離+20%（最大+60%）',
  'skill.keen.name': '鋭い嗅覚',
  'skill.keen.desc': '嗅ぎ分け範囲+40%、匂いがより濃くなる',
  'skill.angler.name': '釣り人の尾',
  'skill.angler.desc': '釣りが必ず成功する',
  'skill.swift.name': '疾風の爪',
  'skill.swift.desc': '移動速度+10%、スタミナ回復+25%',
  'skill.thick.name': '分厚い毛皮',
  'skill.thick.desc': 'レベルごと：受けるダメージ-12%（最大-47%）',
  'skill.camo.name': '葉っぱのカモフラージュ',
  'skill.camo.desc': '高い草むらの隠れ効果が2倍になり、スニークのスタミナ消費が減る',
  'skill.vitality.name': '活力みなぎる',
  'skill.vitality.desc': 'レベルごと：スタミナ回復速度+30%（最大+150%）',
  'skill.guardian.name': '守護の力',
  'skill.guardian.desc': '友情の獲得+50%、狩りアシスト+4',
  'skill.brave.name': '恐れ知らずの心',
  'skill.brave.desc': '気分の上限+25%、チャレンジ報酬+50%',
  'skill.summon.name': '召喚強化',
  'skill.summon.desc': '召喚時間 25→40秒、クールダウン 5→3分',
  'skill.dodge.name': '軽やかな回避',
  'skill.dodge.desc': 'レベルごと：6%の確率でダメージを完全回避（最大30%）',
  'skill.agile.name': '燕のように軽やか',
  'skill.agile.desc': '飛びかかりのスタミナ消費-40%、クールダウン-0.2秒',
  'skill.craft.name': '匠の技',
  'skill.craft.desc': 'レベルごと：作製アイテムの効果+20%、装備のボーナスも上昇',
  'skill.alchemist.name': '薬草錬金',
  'skill.alchemist.desc': '活力ポーションなどの強力なレシピを解放',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ チャレンジ',
  'challenge.rival.title': '🐈‍⬛ 縄張り侵入',
  'challenge.rival.desc': 'ライバル猫があなたの縄張りを狙っている——飛びかかって追い払え！',
  'challenge.dog.title': '🐕 悪犬の追跡！',
  'challenge.dog.desc': '走れ！高い草むらに隠れるか、洞窟に逃げ込め！',
  'challenge.storm.title': '⛈️ 雷雨の嵐',
  'challenge.storm.desc': 'すぐに雷から身を隠せ！',
  'challenge.salmon.title': '🐟 サーモンの遡上',
  'challenge.salmon.desc': '川辺で釣りをしよう——必ず釣れる！',
  'challenge.viper.title': '🐍 毒ヘビの群れ',
  'challenge.viper.desc': '毒ヘビの群れを撃退しろ！',
  'challenge.wolf.title': '🐺 オオカミの群れ！',
  'challenge.wolf.desc': 'オオカミの群れが狙っている——反撃するか洞窟へ逃げろ！',
  'challenge.stampede.title': '🐗 イノシシの暴走！',
  'challenge.stampede.desc': '突進してくるイノシシをかわせ！',
  'challenge.eagle.title': '🦅 ワシの急降下！',
  'challenge.eagle.desc': '地面の影に注意——急降下するワシをかわせ！',
  'challenge.fog.title': '🌫️ 濃霧で迷子！',
  'challenge.fog.desc': '時間切れになる前にビーコン（洞窟か泉）を見つけろ！',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                               /* 插值: {name} */
  'feature.prompt.gate': '{name}へ行く',                     /* 插值: {name} */
  'feature.prompt.berry': 'ベリーを食べる',
  'feature.prompt.pickup': '拾う',
  'feature.prompt.spring': '水を飲む',
  'feature.prompt.gem': '宝石を採掘',
  'feature.prompt.harvest': '採る',
  'feature.prompt.vine': '蔓を切る',
  'feature.prompt.sleep': '眠る',
  'feature.prompt.trash': 'ゴミを漁る',
  'feature.prompt.enter': '入る',
  'feature.prompt.fish': '魚をすくう',
  'feature.prompt.pet': 'なでる',
  'feature.prompt.workbench': 'F — アイテムを作る',
  'feature.prompt.fire': 'F — 料理 / 乾かす',
  'feature.prompt.bed': 'F — 朝まで眠る',
  'feature.prompt.exit': 'F — 洞窟から出る',
  'feature.shelter.hollow': '🛏 木の洞の避難所',
  'feature.shelter.alley': '🛏 路地の避難所',
  'feature.beacon': '📍 {name} ビーコン',                    /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 操作',
  'guide.controls.move': '<b class="text-slate-200">WASD / 矢印キー</b> — 移動',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — スニーク（高い草むらに隠れる）',
  'guide.controls.pounce': '<b class="text-slate-200">スペース</b> — 飛びかかり / 攻撃',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — 嗅ぐ（匂いの流れ）',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — 毛づくろい（気分+）',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — インタラクト / なでる / 釣り',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — パートナー猫を召喚して戦う（クールダウン5分）',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — パネルを開く',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — パネルを閉じる',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 嗅覚の本能',
  'guide.smell.p1': '<b class="text-slate-200">E</b> を押すと、風に乗った色付きの匂いの流れが周囲の状況を教えてくれます：',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">水色</b> — きれいな水源の泉',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">金色</b> — 獲物：ネズミ、サーモン、バッタ',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">ピンク</b> — 友好的な野良猫',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">赤色</b> — 捕食者：イノシシ、毒ヘビ、キツネ',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">オレンジ</b> — 縄張りに侵入するライバル猫',
  'guide.smell.p2': '上部の<b class="text-slate-200">「本能」コンパス</b>が常に最も近い匂いの発生源を指し示します。',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 サバイバルのコツ',
  'guide.tips.1': '<b class="text-slate-200">泉</b>（水色）で水を飲み、川岸で <b class="text-slate-200">F</b> を押して釣りをしましょう。',
  'guide.tips.2': '雨で毛が濡れると——<b class="text-slate-200">濡れ毛</b>はスタミナ回復を遅らせます。<b class="text-slate-200">葉っぱの雨よけ帽</b>を作るか、洞窟の焚き火で乾かしましょう。',
  'guide.tips.3': '<b class="text-slate-200">高い草むら</b>をスニークで通り抜けて捕食者を避け、飛びかかりでとどめを刺しましょう。',
  'guide.tips.4': '洞窟は安全な避難所：ベッドで朝まで眠ればHPが回復し、焚き火でサーモンを焼けます。',
  'guide.tips.5': '<b class="text-slate-200">Q</b> で毛づくろいをして気分を上げましょう。気分が低すぎると弱体化し続けます。',
  'guide.tips.6': '野良猫（ピンク）と仲良くなろう——親密度が高まると危険を教えてくれたり、一緒に戦ってくれます。',
  'guide.tips.7': 'キャットニップは強力な覚醒薬草……ただし「狂った猛ダッシュ」を引き起こします。使用は慎重に。',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 クラフトレシピ',
  'guide.recipes.1': '<b class="text-slate-200">葉っぱの雨よけ帽</b> — 葉っぱ ×3 + ツタ ×2（防御：ダメージ-2）',
  'guide.recipes.2': '<b class="text-slate-200">魚骨の首輪</b> — 魚の骨 ×3 + スジ ×1（攻撃+3、友情獲得+50%）',
  'guide.recipes.3': '<b class="text-slate-200">猫牙のネックレス</b> — 魚の骨 ×4 + スジ ×2（攻撃+20%）',
  'guide.recipes.4': '<b class="text-slate-200">干しキャットニップ</b> — キャットニップ ×2（昼間のみ）',
  'guide.recipes.5': '<b class="text-slate-200">薬草軟膏</b> — 薬草 ×3 + イノシシの脂 ×1',
  'guide.recipes.6': '<b class="text-slate-200">キャットニップ茶</b> — キャットニップ ×1 + 薬草 ×1（スタミナ+25、即時回復）',
  'guide.recipes.7': '<b class="text-slate-200">活力ポーション</b> — キャットニップ ×2 + 薬草 ×2 + イノシシの脂 ×1（スタミナ+55、【薬草錬金】スキルが必要）',
  'guide.recipes.8': '<b class="text-slate-200">紅炎ルビーのペンダント</b> — ルビー ×1 + 魚の骨 ×2 + スジ ×1（攻撃+40%）',
  'guide.recipes.9': '<b class="text-slate-200">サファイアの星飾り</b> — サファイア ×1 + 魚の骨 ×2 + スジ ×1（攻撃+25%、クリティカル+12%）',
  'guide.recipes.10': '<b class="text-slate-200">ヒスイのお守り</b> — ヒスイ ×1 + 葉っぱ ×2 + ツタ ×2（受けるダメージ-6）',
  'guide.recipes.11': '<b class="text-slate-200">ツタの鎧</b> — ツタの蔓 ×3 + 葉っぱ ×2 + ツタ ×2（ダメージ-7、雨の日もほとんど濡れない）',
  'guide.recipes.12': '<b class="text-slate-200">石の爪</b> — ルビー ×1 + スジ ×2 + 魚の骨 ×2（攻撃+8、ダメージが大幅にアップ）',
  'guide.recipes.13': '<b class="text-slate-200">竜血ポーション</b> — 竜血草 ×2 + 薬草 ×1 + イノシシの脂 ×1（HP60回復、【薬草錬金】が必要）',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 成長とスキル',
  'guide.growth.1': '狩り、釣り、採集、ペット、チャレンジ、Boss撃破など、あらゆる行動で<b class="text-slate-200">経験値</b>を獲得できます。レベルアップごとに最大HP +10、最大スタミナ +6、最大気分 +6 が<b class="text-emerald-300">永続的</b>に増加し、スタミナ回復速度もレベルに応じて速くなります。',
  'guide.growth.2': 'レベルアップ、チャレンジ勝利、Boss撃破で<b class="text-slate-200">経験値</b>を獲得できます。ただし<b class="text-amber-300">スキルポイントはレベルアップ時のみ</b>（毎レベル+1）なので、慎重に計画しましょう。📈 成長パネルで<b class="text-slate-200">5つの系統</b>を自由に強化できます：🎯狩り、🛡️サバイバル、🐈きずな、💨回避、🔨クラフト。',
  'guide.growth.3': '<b class="text-slate-200">ハンター本能</b>（ダメージ）、<b class="text-slate-200">飛びかかり襲撃</b>（飛びかかり距離）、<b class="text-slate-200">分厚い毛皮</b>（被ダメージ軽減）、<b class="text-slate-200">活力みなぎる</b>（スタミナ回復）、<b class="text-slate-200">軽やかな回避</b>（回避率）、<b class="text-slate-200">匠の技</b>（クラフト効果）はすべて<b class="text-amber-300">繰り返し強化</b>可能で、成長の可能性は無限大です。',
  'guide.growth.4': '<b class="text-slate-200">薬草錬金</b>で<b class="text-slate-200">活力ポーション</b>が解放されます。<b class="text-slate-200">キャットニップ茶</b>もスタミナを即回復する頼もしい味方——スタミナが尽きそうになったら忘れずにひと口。',
  'guide.growth.5': '⚖️ <b class="text-amber-300">動的難易度</b>：モンスター、Boss、チャレンジの強さはあなたのレベルに合わせて<b class="text-slate-200">一緒に成長</b>します（荒野の草原 &lt; 住宅街 &lt; 乾いた荒野 &lt; 暗い森、奥のエリアほど基礎が強い）——レベルが高くても油断は禁物。チャレンジも報酬も一緒に高まります。',
  'guide.growth.6': '🐾 <b class="text-amber-300">成長ペース</b>：モンスターの密度はレベルに応じて上昇（5レベルごとに+30%）、エリア内のモンスターは<b class="text-slate-200">ゆっくり再出現</b>し、レベルアップに必要な経験値の曲線は穏やか——より高難度のエリアで狩るほうが早くレベルアップできるので、ひとつの場所に固執する必要はありません。',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ エリアとBoss',
  'guide.zones.1': 'マップの端にある<b class="text-slate-200">転送ゲート</b>で新しいエリアへ：<b class="text-slate-200">住宅街</b>、<b class="text-slate-200">乾いた荒野</b>、<b class="text-slate-200">暗い森</b>——<b class="text-emerald-300">レベル制限なし</b>で、いつでも自由に行き来できます。',
  'guide.zones.2': '各エリアの<b class="text-slate-200">右下</b>には<b class="text-slate-200">エリアボス</b>が潜んでいます：巨大イノシシ（突進）、パチンコの悪ガキ（遠距離の石）、巨大オオカミ（超高速の噛みつき）、<b class="text-rose-300">キングコブラ</b>——最後のBossで、巨大な体から<b class="text-rose-300">毒液を吐き</b>（命中すると毒で継続ダメージ）、<b class="text-rose-300">遠距離に飛びかかり</b>（飛びかかる前に体を高く起こします）。彼は<b class="text-amber-300">次のエリアへの転送ゲート</b>を守っています——ストーリーを進めるには、まずBossを倒さなければなりません。撃破すると大量の経験値を獲得できます（スキルポイントは依然としてレベルアップのみ）。',
  'guide.zones.3': '🌋 <b class="text-slate-200">乾いた荒野</b>には大きな<b class="text-slate-200">火山口</b>（溶岩は通行不可）と<b class="text-slate-200">宝石の鉱脈</b>があります。<b class="text-rose-300">泉は少なく、ほとんど雨が降りません</b>——<b class="text-slate-200">サボテンの実</b>で水分を補給し、<b class="text-slate-200">竜血草</b>と宝石を集めて強力なアイテムを作りましょう。',
  'guide.zones.4': '🌲 <b class="text-slate-200">暗い森</b>は縦に伸びる<b class="text-slate-200">長い道</b>で、両側は通行できない高い木々が生い茂り、<b class="text-sky-300">雨が多い</b>——<b class="text-slate-200">ツタの蔓</b>を集めて<b class="text-slate-200">ツタの鎧</b>を編み、雨と身を守りましょう。道中には凶暴な<b class="text-rose-300">サル</b>、<b class="text-rose-300">ワニ</b>、そして<b class="text-slate-200">霊芝</b>もいます。',
  'guide.zones.5': '🛏 住宅街の<b class="text-slate-200">狭い路地</b>と暗い森の<b class="text-slate-200">木の洞</b>は眠れる避難所です——朝まで眠るとHPが40回復し、スタミナも全回復します。',
  'guide.zones.6': 'Bossが近づくと画面の上にHPバーが表示されます。飛びかかりが主な攻撃手段です。',

  /* ============================================================ misc. 杂项 */
  'misc.title': 'ワイルド本能：シャム猫サバイバル',
  'misc.north': '北',
  'misc.cave': '洞窟',
  'misc.spring': '泉',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ 空が晴れた。',
  'log.weather.rain': '🌧️ 雨が降り始めた……',
  'log.weather.mist': '🌫️ 軽い霧が立ちこめてきた。',
  'log.boot.wake': '🐱 荒野で目を覚ました。本能を信じろ——Eで嗅げ！',
  'log.boot.newJourney': '🌱 新しい旅が始まった！すべてゼロからのスタートだ。',
  'log.cave.idle': '🏕️ 洞窟の中は静かで安全だ。（焚き火、ベッド、作業台、出口のそばでF）',
  'log.cave.noPounce': '😺 ここでは飛びかかれない！',
  'log.cave.enter': '🕳️ ひんやりとした洞窟の避難所に滑り込んだ。',
  'log.cave.exit': '🌤️ 荒野に戻った。',
  'log.craft.workbench': '🛠 作業台の前でアイテムを作る準備をした。',
  'log.craft.salmon': '🔥 焚き火でサーモンを焼き上げた！',
  'log.craft.dry': '🔥 火のそばで毛を乾かした——ぽかぽかだ！',
  'log.craft.fireIdle': '🔥 焚き火がパチパチと音を立てている。（サーモンを持ってきて焼こう）',
  'log.craft.needSkill': '🔒 クラフトにはスキル【{skill}】が必要だ。',   /* 插值: {skill} */
  'log.craft.done': '🔨 {name} を作った！',                     /* 插值: {name} */
  'log.bed.curl': '😴 柔らかい藁のベッドで丸くなった……',
  'log.bed.wake': '🌅 夜明けに目覚めた——気分は爽快。（HP+34、スタミナ全回復）',
  'log.shelter.sleep': '😴 避難所に丸まって、ぐっすり眠った……',
  'log.shelter.wake': '🌅 夜明けに目覚めた——気分は爽快！（HP+40、スタミナ全回復）',
  'log.zone.enter': '⛩ 【{name}】に入った！',                     /* 插值: {name} */
  'log.death': '☠️ 力尽きて倒れた……夜明けに目を覚ます。',
  'log.stumble': '🐾 よろめいたが、踏ん張って体勢を立て直した。',
  'log.pounce.water': '💦 もう少しで水に落ちるところだった——必死に岸に跳ね返った！（毛が濡れた）',
  'log.groom': '✨ 毛づくろいをして、すっきり爽快！',
  'log.catch': '🐾 {name} を捕まえた！',                          /* 插值: {name} */
  'log.fish.run': '🎣 サーモンの遡上中、すくい上げた！',
  'log.fish.none': '🐟 岸に魚はいない……喉が渇いたら清らかな泉（水色の匂い）を探そう。',
  'log.combat.hit': '⚔️ {name} に命中、{dmg} のダメージ{crit}！', /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name} が倒れた。',                      /* 插值: {name} */
  'log.crit.bang': 'クリティカル！',                              /* 暴击后缀（流浪狗命中用） */
  'log.crit.wrap': '（クリティカル！）',                           /* 暴击后缀（扑击命中用） */
  'log.dodge': '💨 身軽に攻撃をかわした！',
  'log.damage': '💔 {n} のダメージを受けた！',                     /* 插值: {n} */
  'log.footsteps': '👂 近くで足音がする……',
  'log.pred.alert': '⚠️ {name} があなたに気づいた！',              /* 插值: {name} */
  'log.poison.venom': '💚 毒液がかかった！（HP-{dmg}、毒状態！）',  /* 插值: {dmg} */
  'log.poison.tick': '💚 毒が発作！HP-{n}',                        /* 插值: {n} */
  'log.poison.gone': '🌿 毒が抜けて、体調が戻った。',
  'log.level.up': '🎉 レベルアップ！レベル {level} になった！（スキルポイント+1）', /* 插值: {level} */
  'log.skill.point': '📌 スキルポイントを {n} 獲得！（現在 {points}）', /* 插值: {n} {points} */
  'log.skill.none': '📖 そんなスキルはない！',
  'log.skill.maxed': '📖 {name} はすでに最大レベル（Lv.{max}）だ！', /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 スキルポイントが足りない——スキルポイントはレベルアップでのみ獲得できる。',
  'log.skill.learned': '⭐ スキル習得：{name} Lv.{lv}/{max}！（スキルポイント-1）', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 スキルブックを発見：{name}！（バッグの中で読める）', /* 插值: {name} */
  'log.skill.readBook': '📖 古いスキルブックを読んだ：経験値+40！（スキルポイントはレベルアップでのみ獲得できる）',
  'log.equip.off': '⬇️ {name} を外した（バッグに入ったまま）。',   /* 插值: {name} */
  'log.equip.on': '⬆️ {name} を装備した！',                        /* 插值: {name} */
  'log.zoomies': '😵‍💫 キャットニップ！！狂った猛ダッシュ！！！{name}！', /* 插值: {name} */
  'log.item.use': '😋 {name} を使った。',                          /* 插值: {name} */
  'log.drop.jade': '💎 サルの巣からヒスイが落ちてきた！',
  'log.drop.sapphire': '💎 ワニの皮にサファイアが埋まっていた！',
  'log.dog.bite': '🐕 野良犬に噛まれた！（HP-{dmg}）',             /* 插值: {dmg} */
  'log.dog.bark': '🐕 野良犬が吠えながら追いかけてくる！',
  'log.dog.hit': '🐕 野良犬に命中！{crit}尻尾を巻いて逃げていった！', /* 插值: {crit} */
  'log.dog.defeated': '💀 野良犬を追い払った。（スジ獲得、経験値+12）',
  'log.boss.boar.charge': '🐗 巨大イノシシが突進してくる！',
  'log.boss.boar.hit': '🐗 巨大イノシシに吹き飛ばされた！（HP-{dmg}）', /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 巨大オオカミに噛まれた！（HP-{dmg}）',   /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 キングコブラが毒液を吐いた！',
  'log.boss.cobra.leap': '🐍 キングコブラが矢のように飛びかかってきた！',
  'log.boss.cobra.leapHit': '🐍 コブラの飛びかかりが直撃！（HP-{dmg}、毒状態！）', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 キングコブラが体を丸めて力を溜めている……（毒を吐くぞ！）',
  'log.boss.cobra.leapWindup': '🐍 キングコブラが立ち止まり、体を巻き付けている……（飛びかかってくるぞ！）',
  'log.boss.cobra.bite': '🐍 コブラに噛まれた！（HP-{dmg}、毒状態！）', /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 悪ガキがパチンコで石を撃ってきた！',
  'log.boss.kid.hit': '💢 石が直撃した！（HP-{dmg}）',             /* 插值: {dmg} */
  'log.boss.crit': '💥 【{name}】にクリティカル！{dmg} ダメージ！', /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 【{name}】を撃破した！大量の経験値を獲得！', /* 插值: {name} */
  'log.boss.respawn': '⚠️ 【{name}】がアリーナで復活した！',        /* 插值: {name} */
  'log.feature.berry': '🍓 野イチゴを食べた。（満腹+、HP+2）',
  'log.feature.catnip': '🌿 新鮮なキャットニップを収穫した。',
  'log.feature.herbs': '🌼 薬草を採った。',
  'log.feature.cactus': '🌵 サボテンの実をもぎ取った——砂漠の甘露だ！',
  'log.feature.dragonherb': '🌹 真紅の竜血草を採った——薬効が強い！',
  'log.feature.reishi': '🍄 古木の霊芝を摘んだ——霊光が揺らめいている。',
  'log.feature.vine': '🪵 丈夫なツタの蔓を切り取った。',
  'log.feature.spring': '💧 清らかな泉の水を飲んだ。',
  'log.feature.gem': '💎 {name} を採掘した！（60秒後に再生成）',    /* 插值: {name} */
  'log.feature.trash': '🗑 ゴミの山から {name} を掘り出した！',     /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 ゴミ箱は空っぽだ……',
  'log.feature.forest': '🍂 森で材料を拾った。',
  'log.feature.nothing': '😺 ここには触れ合えるものはない……',
  'log.companion.warn': '🐈 {name} が威嚇：捕食者が近づいている！', /* 插值: {name} */
  'log.companion.gift': '🎁 {name} が {gift} を届けてくれた！',    /* 插值: {name} {gift} */
  'log.pet': '🐾 {name} をなでた——満足そうにゴロゴロと喉を鳴らしている。（♥+{n}）', /* 插值: {name} {n} */
  'log.pet.first': '😺 {name} があなたに懐き始めた——なで続けるか、ネコメニューからごはんをあげると早く友達になれる！', /* 插值: {name} */
  'log.pet.ready': '💗 {name} はあなたの友達になる準備ができている——ネコメニューから仲間にしよう！', /* 插值: {name} */
  'log.feed.none': '🍽️ 今は分けられる食べ物がない（サーモン、焼きサーモン、またはネズミ）。',
  'log.feed': '🍖 {item} を {name} にあげた！（♥+{n}）',           /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 {name} は大喜び！続ければあなたを信頼するようになる。', /* 插值: {name} */
  'log.adopt.notReady': '💭 {name} はまだ準備ができていない——なでたりごはんをあげ続けよう（60 ♥ 必要）。', /* 插值: {name} */
  'log.adopt.ok': '🎉 {name} はもうあなたの友達だ！ずっとついてきてくれる。', /* 插值: {name} */
  'log.perk.warn': '🐈 {name} はこれから周囲の危険を教えてくれる！', /* 插值: {name} */
  'log.perk.hunt': '🐈 {name} はこれから一緒に狩りをする（ダメージ+）！', /* 插值: {name} */
  'log.summon.end': '🐈 {name} の戦闘が終わり、あなたのそばに戻ってきた。', /* 插值: {name} */
  'log.summon.cd': '📣 召喚のクールダウン中（{n} 秒）',             /* 插值: {n} */
  'log.summon.none': '😿 まだパートナー猫がいない——まず野良猫を一匹仲間にしよう！',
  'log.summon.ok': '📣 {name} が呼び出しに応じて、一緒に戦ってくれる！（クールダウン {n} 分）', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 {name} が敵に飛びかかった！（{dmg} ダメージ）', /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ ライバル猫が縄張りに侵入してきた——飛びかかって追い払え！',
  'log.challenge.rival.hit': '🐈‍⬛ ライバル猫をひと跳ねで払いのけた！',
  'log.challenge.rival.fled': '💨 ライバル猫が逃げていった！',
  'log.challenge.rival.mark': '⚠️ ライバル猫があなたの縄張りにマーキングしている！',
  'log.challenge.rival.swat': '🐈‍⬛ ライバル猫に引っかかれた！（HP-{n}）', /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ ライバル猫に縄張りの一部を占拠された！{name} を盗まれてしまった！', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ ライバル猫に縄張りの一部を占拠された！気分が落ち込みまくり……',
  'log.challenge.rival.win': '🏆 ライバル猫を追い払った！（気分+{n}）', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 ライバル猫がスジを落とした！',
  'log.challenge.dog.start': '🐕 野犬が追いかけてくる——走れ！',
  'log.challenge.dog.stun': '🐕 クゥン！野犬をひるませた——走れ！',
  'log.challenge.dog.bite': '🐕 野犬に噛まれた！（HP-{n}）',        /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 野犬にボロボロに噛まれた……',
  'log.challenge.dog.bark': '🐕 ワン！ワン！',
  'log.challenge.dog.win': '🏆 野犬から逃げ切った！（スタミナ+{n}）', /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ 豪雨と雷が襲来——すぐに身を隠せ！',
  'log.challenge.storm.hit': '⚡ あなたの近くに雷が落ちた！（HP-{n}）', /* 插值: {n} */
  'log.challenge.storm.far': '⚡ 少し離れたところで雷が炸裂した！',
  'log.challenge.storm.safe': '⚡ 嵐は洞窟の外で荒れ狂っている——中は安全だ。',
  'log.challenge.storm.warn': '⚡ 雷が落ちるぞ！すぐに身を隠せ！',
  'log.challenge.storm.win': '🏆 嵐を乗り切った！（気分+{n}）',     /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 サーモンの遡上だ！川辺で釣りをしよう——必ず釣れる！',
  'log.challenge.salmon.win': '🏆 サーモンの遡上が終わった——大漁だ！',
  'log.challenge.viper.start': '🐍 毒ヘビの群れに囲まれた——撃退しろ！',
  'log.challenge.viper.kill': '💀 毒ヘビを踏みつぶした！（薬草獲得）',
  'log.challenge.viper.bite': '🐍 毒ヘビに噛まれた！（HP-{n}）',    /* 插值: {n} */
  'log.challenge.viper.win': '🏆 毒ヘビの群れを撃退した！（気分+{n}）', /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 オオカミの群れが狙っている——反撃するか逃げろ！',
  'log.challenge.wolf.kill': '💀 オオカミを一匹倒した！（経験値+18）',
  'log.challenge.wolf.stagger': '🐺 オオカミがよろめいた！',
  'log.challenge.wolf.bite': '🐺 オオカミに噛まれた！（HP-{n}）',   /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 オオカミの群れを生き延びた！（気分+10）',
  'log.challenge.stampede.start': '🐗 イノシシの暴走！突進をかわせ！',
  'log.challenge.stampede.hit': '🐗 暴走するイノシシに踏まれた！（HP-{n}）', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 イノシシの暴走をかわした！（気分+{n}）', /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 頭上をワシが旋回している——急降下をかわせ！',
  'log.challenge.eagle.hit': '🦅 ワシの爪で引っかかれた！（HP-{n}）', /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 ワシがそばを急降下していった！',
  'log.challenge.eagle.dive': '🦅 ワシが急降下を始めた——影から離れろ！',
  'log.challenge.eagle.win': '🏆 ワシは飛び去った！（気分+{n}）',   /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ 濃霧が立ちこめた——時間切れになる前に {name} のビーコンを見つけて脱出しろ！', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 濃霧を抜ける道を見つけた！（気分+{n}）', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ 濃霧の中で迷った……毛は濡れて冷たい。（気分-6）',
};
