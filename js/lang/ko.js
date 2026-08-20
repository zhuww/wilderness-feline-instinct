/* ==========================================================================
   Wilderness Feline Instinct — lang/ko.js
   한국어（韩语）사전：全部 key → 韩语译文
   （key 清单与插值占位说明见项目根目录 i18n-keys.md；
     缺失 key 时 Game.i18n.t 自动回退中文 zh.js）
   ========================================================================== */
Game.i18n = Game.i18n || {};
Game.i18n.dicts = Game.i18n.dicts || {};
Game.i18n.dicts.ko = {

  /* ============================================================ ui. HUD/面板/按钮 */
  'ui.hud.time': '{icon} {time} · {day}일째',               /* 插值: {icon} {time} {day} */
  'ui.hud.weather.clear': '☀️ 맑음',
  'ui.hud.weather.rain': '🌧️ 비',
  'ui.hud.weather.mist': '🌫️ 안개',
  'ui.hud.zone': '⛩ {name}',                                /* 插值: {name} */
  'ui.hud.compass': '본능',
  'ui.hud.xp': '경험치',
  'ui.hud.level': 'Lv {n}',                                  /* 插值: {n} */
  'ui.hud.summon.none': '📣 파트너 고양이 없음',
  'ui.hud.summon.ready': '📣 준비됨(R)',
  'ui.hud.summon.cd': '📣 {n}s',                             /* 插值: {n} */
  'ui.hud.bossDefault': '👹 보스',
  'ui.hud.boss': '👹 {name}',                                /* 插值: {name} */

  'ui.meter.hp': '체력',
  'ui.meter.satiety': '포만감',
  'ui.meter.hydration': '수분',
  'ui.meter.stamina': '스태미나',
  'ui.meter.mood': '기분',
  'ui.meter.wetness': '털 젖음',

  'ui.btn.growth': '성장과 스킬',
  'ui.btn.guide': '생존 가이드 (G)',
  'ui.btn.inv': '가방 (I)',
  'ui.btn.friends': '고양이 친구 (B)',
  'ui.btn.sound': '소리 켜기/끄기',
  'ui.btn.reset': '새 게임',
  'ui.btn.lang': '🌐 {lang}',                                /* 插值: {lang} */

  'ui.hint': '<b class="text-white">WASD</b> 이동 · <b class="text-white">Shift</b> 은신 · <b class="text-white">Space</b> 덮치기 · <b class="text-white">E</b> 냄새 맡기 · <b class="text-white">Q</b> 털 손질 · <b class="text-white">F</b> 상호작용',

  'ui.touch.pounce': '덮치기',
  'ui.touch.sniff': '냄새 맡기',
  'ui.touch.groom': '털 손질',
  'ui.touch.interact': '상호작용',
  'ui.touch.sneak': '🦎 은신',
  'ui.touch.sneakTitle': '은신 전환',
  'ui.touch.summon': '📣 파트너 소환',
  'ui.touch.summonTitle': '파트너 고양이 소환 (R)',

  'ui.catmenu.title': '고양이 행동',
  'ui.catmenu.pet': '🐾 쓰다듬기',
  'ui.catmenu.feed': '🍖 먹이 주기',
  'ui.catmenu.adopt': '🤝 입양',
  'ui.catmenu.adopted': '🤝 입양됨',

  'ui.modal.inv.title': '🎒 가방 & 제작',
  'ui.modal.friends.title': '🐈 고양이 친구',
  'ui.modal.guide.title': '📖 생존 가이드',
  'ui.modal.growth.title': '📈 성장과 스킬',

  'ui.tab.inv': '주머니',
  'ui.tab.craft': '제작',

  'ui.inv.empty': '주머니가 비어 있어요 — 채집, 낚시, 사냥으로 채워 보세요.',
  'ui.inv.use': '사용',
  'ui.inv.equip': '장착',
  'ui.inv.unequip': '해제',
  'ui.inv.read': '📖 읽기',
  'ui.inv.equipped': '● 장착됨',

  'ui.craft.locked': '🔒 잠김',
  'ui.craft.needSkill': '필요 스킬: {skill}',                /* 插值: {skill} */
  'ui.craft.dayOnly': '🌙 낮에만 가능',
  'ui.craft.craft': '제작',

  'ui.confirm.reset': '새 게임을 시작할까요? 현재 저장은 사라집니다.',
  'ui.confirm.resetTitle': '🆕 새 게임 시작',
  'ui.confirm.resetDesc': '모든 진행(레벨, 스킬, 아이템, 동료, 지역 진행)이 사라지고 완전히 새로운 세계가 생성됩니다. 이 작업은 되돌릴 수 없어요!',
  'ui.confirm.ok': '🎮 새 게임',
  'ui.confirm.cancel': '취소',

  'ui.friends.intro': '길고양이에게 다가가 <b class="text-slate-200">F</b>를 눌러 쓰다듬으세요 — 머리 위에 행동 메뉴가 나타나 <b class="text-slate-200">먹이 주기</b>(연어/쥐)와 <b class="text-slate-200">입양</b>(친밀도 <b class="text-pink-300">60 ♥</b>)을 할 수 있어요. 분홍 냄새가 고양이 위치를 알려줍니다.',
  'ui.friends.yourPets': '🐾 내 반려묘 ({n})',               /* 插值: {n} */
  'ui.friends.noPets': '아직 반려묘가 없어요 — 길고양이에게 60 ♥까지 먹이를 주고 입양하세요!',
  'ui.friends.strays': '🐈 길고양이 ({n})',                  /* 插值: {n} */
  'ui.friends.unknown': '아직 {n}마리의 길고양이가 야생을 배회하고 있어요 — 분홍 냄새를 따라 찾아보세요.', /* 插值: {n} */
  'ui.friends.none': '근처에 아직 고양이가 없어요. E를 눌러 냄새를 맡고 분홍 냄새 흔적을 따라가 보세요.',
  'ui.friends.status.adopted': '친구 ❤️',
  'ui.friends.status.adoptable': '입양 가능 — 다가가서 F를 누르세요!',
  'ui.friends.status.approaching': '{n}/60 ♥ 입양 가능',     /* 插值: {n} */
  'ui.friends.status.shy': '수줍음 — 먼저 쓰다듬기',
  'ui.friends.friendship.best': '❤️ 절친',
  'ui.friends.friendship.percent': '♥ {n}%',                 /* 插值: {n} */
  'ui.friends.friendship.shy': '— 수줍음 —',

  'ui.perk.mood': '기분 오라',
  'ui.perk.warn': '위험 경보',
  'ui.perk.hunt': '사냥 지원',

  'ui.branch.hunt': '🎯 사냥',
  'ui.branch.survive': '🛡️ 생존',
  'ui.branch.bond': '🐈 유대',
  'ui.branch.dodge': '💨 회피',
  'ui.branch.craft': '🔨 제작',

  'ui.skill.maxed': '최대 레벨',
  'ui.skill.upgrade': '강화',
  'ui.skill.learn': '습득',
  'ui.skill.lv': 'Lv.{lv}/{max}',                            /* 插值: {lv} {max} */

  'ui.growth.skillPoints': '스킬 포인트: {n}',                /* 插值: {n} */
  'ui.growth.xp': '{xp} / {need} 경험치',                     /* 插值: {xp} {need} */
  'ui.growth.bonus': '레벨 보너스: 최대 HP +{hp} · 최대 스태미나 +{st} · 최대 기분 +{mood} · 스태미나 회복 +{regen}%', /* 插值: {hp} {st} {mood} {regen} */
  'ui.growth.crit': '기분 치명타율: <b class="text-amber-300">{pct}%</b> (기분이 좋을수록 치명타가 잘 터져요, 두 배 피해)', /* 插值: {pct}（含 HTML 样式，保留 <b> 标签） */
  'ui.growth.notes': '스킬 포인트는 레벨업 때만 얻어요 — 레벨당 +1포인트, 신중하게 투자하세요. 사냥꾼 본능 / 비상 덮치기 / 두꺼운 털 / 생기 넘침 / 민첩한 회피 / 달인 제작가는 반복 투자가 가능해요.',
  'ui.growth.skillTree': '📖 스킬 트리 ({n} 포인트 사용)',    /* 插值: {n} */
  'ui.growth.journey': '🌱 성장 기록',

  'ui.journey.days': '생존 일수',
  'ui.journey.prey': '사냥한 사냥감',
  'ui.journey.predators': '처치한 포식자',
  'ui.journey.fish': '잡은 물고기',
  'ui.journey.pets': '입양한 반려묘',
  'ui.journey.challenges': '챌린지 승리',
  'ui.journey.xp': '총 경험치',

  /* ============================================================ zone. 区域名 0-3 */
  'zone.0': '야생 초원',
  'zone.1': '도시 구역',
  'zone.2': '메마른 황무지',
  'zone.3': '어두운 숲',

  /* ============================================================ boss. Boss 名（按区域索引） */
  'boss.0': '거대 멧돼지',
  'boss.1': '새총 꼬마',
  'boss.2': '거대 늑대',
  'boss.3': '킹 코브라',

  /* ============================================================ enemy. 敌人/猎物名 */
  'enemy.boar': '멧돼지',
  'enemy.fox': '여우',
  'enemy.viper': '독사',
  'enemy.monkey': '원숭이',
  'enemy.croc': '악어',
  'enemy.mouse': '들쥐',
  'enemy.grasshopper': '메뚜기',
  'enemy.salmon': '연어',
  'enemy.straydog': '길 잃은 개',
  'enemy.rival': '라이벌 고양이',
  'enemy.dog': '들개',
  'enemy.wolf': '늑대',

  /* ============================================================ item. 物品 name/desc */
  'item.berry.name': '야생 베리',
  'item.berry.desc': '달콤한 숲속 베리. 먹으면 HP가 조금 회복돼요.',
  'item.mouse.name': '들쥐',
  'item.mouse.desc': '통통한 들쥐. 스태미나를 회복해 줘요.',
  'item.grasshopper.name': '메뚜기',
  'item.grasshopper.desc': '아삭아삭 씹히는 작은 팔딱이.',
  'item.salmon.name': '연어',
  'item.salmon.desc': '방금 잡은 신선한 연어, 영양이 가득해요.',
  'item.cooked_salmon.name': '구운 연어',
  'item.cooked_salmon.desc': '훈연 향 가득, 부드럽고 촉촉한 진미!',
  'item.catnip.name': '신선한 캣닢',
  'item.catnip.desc': '즉시 정신이 맑아져요.',
  'item.dried_catnip.name': '말린 캣닢',
  'item.dried_catnip.desc': '효과가 두 배!',
  'item.herbs.name': '약초',
  'item.herbs.desc': '마음을 편안하게 하는 야생 약초.',
  'item.leaves.name': '나뭇잎',
  'item.leaves.desc': '넓직한 초록 잎.',
  'item.vines.name': '덩굴',
  'item.vines.desc': '튼튼하고 유연한 덩굴.',
  'item.fishbone.name': '생선 가시',
  'item.fishbone.desc': '깨끗하고 하얀 생선 가시.',
  'item.sinew.name': '힘줄',
  'item.sinew.desc': '질긴 동물 힘줄.',
  'item.fat.name': '멧돼지 기름',
  'item.fat.desc': '두툼하고 미끈한 기름.',
  'item.herb_salve.name': '약초 연고',
  'item.herb_salve.desc': '상처에 바르면 HP 32 회복.',
  'item.leaf_hat.name': '잎사귀 우비 모자',
  'item.leaf_hat.desc': '비를 막아 주고, 공격받을 때마다 피해 -2 (방어).',
  'item.fishbone_collar.name': '생선 가시 목걸이',
  'item.fishbone_collar.desc': '공격 +3 (달인 제작가 레벨당 +1), 길고양이가 더 빨리 신뢰해요.',
  'item.cat_tooth_necklace.name': '고양이 이빨 목걸이',
  'item.cat_tooth_necklace.desc': '공격 +20% (달인 제작가 레벨당 +4%): 적에게 더 큰 피해.',
  'item.catnip_tea.name': '캣닢 차',
  'item.catnip_tea.desc': '뜨거운 차 한 잔으로 스태미나 25 즉시 회복.',
  'item.energy_potion.name': '활력 포션',
  'item.energy_potion.desc': '연금술 정수가 스태미나 55를 즉시 회복.',
  'item.gem_ruby.name': '루비',
  'item.gem_ruby.desc': '화산 용암에서 만들어진 붉은 루비, 귀한 재료.',
  'item.gem_sapphire.name': '사파이어',
  'item.gem_sapphire.desc': '어두운 물속 깊은 곳의 사파이어, 귀한 재료.',
  'item.gem_jade.name': '옥',
  'item.gem_jade.desc': '고대 나무 뿌리에서 태어난 초록 옥, 귀한 재료.',
  'item.flame_ruby_pendant.name': '불꽃 루비 펜던트',
  'item.flame_ruby_pendant.desc': '공격 +40% (달인 제작가 레벨당 +8%) — 고양이 이빨 목걸이보다 강해요.',
  'item.sapphire_star.name': '사파이어 별',
  'item.sapphire_star.desc': '공격 +25%, 치명타 확률 +12%.',
  'item.jade_charm.name': '옥 부적',
  'item.jade_charm.desc': '공격받을 때마다 피해 -6 (달인 제작가 레벨당 -1) — 옥처럼 단단해요.',
  'item.cactus_fruit.name': '선인장 열매',
  'item.cactus_fruit.desc': '사막의 오아시스 열매: 수분 +30.',
  'item.dragon_herb.name': '용혈초',
  'item.dragon_herb.desc': '화산 틈에서 자라는 붉은 약초, 먹으면 HP 18 회복.',
  'item.reishi.name': '영지버섯',
  'item.reishi.desc': '고대 나무의 영약: HP 12 회복, 기분 +10.',
  'item.vine_strand.name': '덩굴 줄기',
  'item.vine_strand.desc': '어두운 숲의 질긴 덩굴 줄기, 갑옷 제작 재료.',
  'item.vine_armor.name': '덩굴 갑옷',
  'item.vine_armor.desc': '공격받을 때마다 피해 -7 (달인 제작가 레벨당 -1), 비에도 거의 젖지 않아요.',
  'item.stone_claw.name': '돌 발톱',
  'item.stone_claw.desc': '공격 +8 (달인 제작가 레벨당 +2) — 보석 조각이 박힌 발톱.',
  'item.dragon_potion.name': '용혈 포션',
  'item.dragon_potion.desc': '끓어오르는 용혈 정수, HP 60 즉시 회복.',
  'item.book_hunter.name': '사냥꾼 본능',
  'item.book_hunter.desc': '덮치기 피해 +15%, 포획 범위 증가.',
  'item.book_swift.name': '날렵한 발톱',
  'item.book_swift.desc': '이동 속도 +10%, 스태미나 회복 +25%.',
  'item.book_thick.name': '두꺼운 털',
  'item.book_thick.desc': '받는 피해 -25%.',
  'item.book_keen.name': '예리한 코',
  'item.book_keen.desc': '냄새 감지 범위 +40%, 냄새 흔적이 더 짙어져요.',
  'item.book_brave.name': '용감한 마음',
  'item.book_brave.desc': '기분 최대치 +25%, 챌린지 보상 +50%.',
  'item.book_angler.name': '낚시꾼의 꼬리',
  'item.book_angler.desc': '낚시가 항상 성공해요.',
  'item.book_guardian.name': '수호의 힘',
  'item.book_guardian.desc': '우정 획득 +50%, 사냥 지원 +4.',
  'item.book_camo.name': '잎사귀 위장',
  'item.book_camo.desc': '높은 풀숲 은신 효과 두 배, 은신 스태미나 소모 감소.',

  /* ============================================================ recipe. 合成配方 name/desc */
  'recipe.leaf_hat.name': '잎사귀 우비 모자',
  'recipe.leaf_hat.desc': '비를 막아 주고, 공격받을 때마다 피해 -2 (방어).',
  'recipe.fishbone_collar.name': '생선 가시 목걸이',
  'recipe.fishbone_collar.desc': '공격 +3, 길고양이가 더 빨리 신뢰해요.',
  'recipe.cat_tooth_necklace.name': '고양이 이빨 목걸이',
  'recipe.cat_tooth_necklace.desc': '공격 +20%, 적에게 더 큰 피해.',
  'recipe.dried_catnip.name': '말린 캣닢',
  'recipe.dried_catnip.desc': '강력한 효과 — 낮에 말려야 해요.',
  'recipe.herb_salve.name': '약초 연고',
  'recipe.herb_salve.desc': '상처에 바르면 HP 32 회복.',
  'recipe.catnip_tea.name': '캣닢 차',
  'recipe.catnip_tea.desc': '스태미나 +25, 즉시 효과.',
  'recipe.energy_potion.name': '활력 포션',
  'recipe.energy_potion.desc': '스태미나 +55. [약초 연금술] 스킬 필요.',
  'recipe.flame_ruby_pendant.name': '불꽃 루비 펜던트',
  'recipe.flame_ruby_pendant.desc': '공격 +40% — 최고급 액세서리.',
  'recipe.sapphire_star.name': '사파이어 별',
  'recipe.sapphire_star.desc': '공격 +25%, 치명타 +12%.',
  'recipe.jade_charm.name': '옥 부적',
  'recipe.jade_charm.desc': '공격받을 때마다 피해 -6.',
  'recipe.vine_armor.name': '덩굴 갑옷',
  'recipe.vine_armor.desc': '방어 -7, 비에도 거의 젖지 않아요.',
  'recipe.stone_claw.name': '돌 발톱',
  'recipe.stone_claw.desc': '공격 +8 — 피해가 크게 늘어나요.',
  'recipe.dragon_potion.name': '용혈 포션',
  'recipe.dragon_potion.desc': 'HP 60 즉시 회복. [약초 연금술] 필요.',

  /* ============================================================ skill. 技能 name/desc */
  'skill.hunter.name': '사냥꾼 본능',
  'skill.hunter.desc': '레벨당: 덮치기 피해 +15%, 포획 범위 증가',
  'skill.leap.name': '비상 덮치기',
  'skill.leap.desc': '레벨당: 덮치기 거리 +20% (최대 +60%)',
  'skill.keen.name': '예리한 코',
  'skill.keen.desc': '냄새 감지 범위 +40%, 냄새 흔적이 더 짙어짐',
  'skill.angler.name': '낚시꾼의 꼬리',
  'skill.angler.desc': '낚시가 항상 성공',
  'skill.swift.name': '날렵한 발톱',
  'skill.swift.desc': '이동 속도 +10%, 스태미나 회복 +25%',
  'skill.thick.name': '두꺼운 털',
  'skill.thick.desc': '레벨당: 받는 피해 -12% (최대 -47%)',
  'skill.camo.name': '잎사귀 위장',
  'skill.camo.desc': '높은 풀숲 은신 효과 두 배, 은신 스태미나 소모 감소',
  'skill.vitality.name': '생기 넘침',
  'skill.vitality.desc': '레벨당: 스태미나 회복 속도 +30% (최대 +150%)',
  'skill.guardian.name': '수호의 힘',
  'skill.guardian.desc': '우정 획득 +50%, 사냥 지원 +4',
  'skill.brave.name': '용감한 마음',
  'skill.brave.desc': '기분 최대치 +25%, 챌린지 보상 +50%',
  'skill.summon.name': '소환 강화',
  'skill.summon.desc': '소환 시간 25→40초, 재사용 대기 5→3분',
  'skill.dodge.name': '민첩한 회피',
  'skill.dodge.desc': '레벨당: 6% 확률로 피해 완전 회피 (최대 30%)',
  'skill.agile.name': '깃털처럼 가볍게',
  'skill.agile.desc': '덮치기 스태미나 소모 -40%, 재사용 대기 -0.2초',
  'skill.craft.name': '달인 제작가',
  'skill.craft.desc': '레벨당: 제작 아이템 효과 +20%, 장비 보너스도 상승',
  'skill.alchemist.name': '약초 연금술',
  'skill.alchemist.desc': '활력 포션 같은 강력한 레시피 잠금 해제',

  /* ============================================================ challenge. 挑战横幅 title/desc */
  'challenge.fallback': '⚠️ 챌린지',
  'challenge.rival.title': '🐈‍⬛ 영토 침입',
  'challenge.rival.desc': '라이벌 고양이가 네 영토를 차지하고 있어 — 덮쳐서 쫓아내!',
  'challenge.dog.title': '🐕 개 추격!',
  'challenge.dog.desc': '달려! 높은 풀숲에 숨거나 동굴로 도망쳐!',
  'challenge.storm.title': '⛈️ 뇌우 폭풍',
  'challenge.storm.desc': '번개를 피할 곳을 빨리 찾아!',
  'challenge.salmon.title': '🐟 연어 대이동',
  'challenge.salmon.desc': '강가에서 낚시 — 무조건 낚여!',
  'challenge.viper.title': '🐍 독사 습격',
  'challenge.viper.desc': '독사 떼를 물리쳐!',
  'challenge.wolf.title': '🐺 늑대 무리!',
  'challenge.wolf.desc': '늑대 무리가 너를 노리고 있어 — 맞서 싸우거나 동굴로 도망쳐!',
  'challenge.stampede.title': '🐗 멧돼지 돌진!',
  'challenge.stampede.desc': '돌진하는 멧돼지를 피해!',
  'challenge.eagle.title': '🦅 독수리 급강하!',
  'challenge.eagle.desc': '땅의 그림자를 조심해 — 급강하하는 독수리를 피해!',
  'challenge.fog.title': '🌫️ 안개 속에서 길을 잃다!',
  'challenge.fog.desc': '시간이 다 가기 전에 신호(동굴 또는 샘)를 찾아!',

  /* ============================================================ feature. 互动提示 */
  'feature.gate': '⛩ {name}',                                /* 插值: {name} */
  'feature.prompt.gate': '{name}으로 이동',                   /* 插值: {name} */
  'feature.prompt.berry': '베리 먹기',
  'feature.prompt.pickup': '줍기',
  'feature.prompt.spring': '물 마시기',
  'feature.prompt.gem': '보석 채굴',
  'feature.prompt.harvest': '채집',
  'feature.prompt.vine': '덩굴 자르기',
  'feature.prompt.sleep': '잠자기',
  'feature.prompt.trash': '쓰레기 뒤지기',
  'feature.prompt.enter': '입장',
  'feature.prompt.fish': '물고기 잡기',
  'feature.prompt.pet': '쓰다듬기',
  'feature.prompt.workbench': 'F — 아이템 제작',
  'feature.prompt.fire': 'F — 요리 / 건조',
  'feature.prompt.bed': 'F — 새벽까지 잠자기',
  'feature.prompt.exit': 'F — 동굴 나가기',
  'feature.shelter.hollow': '🛏 나무 구멍 은신처',
  'feature.shelter.alley': '🛏 골목 은신처',
  'feature.beacon': '📍 {name} 신호',                         /* 插值: {name}（洞穴/泉水） */

  /* ============================================================ guide. 生存指南 6 板块 */
  /* ---- 🎮 操作 ---- */
  'guide.controls.title': '🎮 조작',
  'guide.controls.move': '<b class="text-slate-200">WASD / 방향키</b> — 이동',
  'guide.controls.sneak': '<b class="text-slate-200">Shift</b> — 은신 (높은 풀숲에 숨기)',
  'guide.controls.pounce': '<b class="text-slate-200">Space</b> — 덮치기 / 공격',
  'guide.controls.sniff': '<b class="text-slate-200">E</b> — 냄새 맡기 (냄새 흔적)',
  'guide.controls.groom': '<b class="text-slate-200">Q</b> — 털 손질 (+기분)',
  'guide.controls.interact': '<b class="text-slate-200">F</b> — 상호작용 / 쓰다듬기 / 낚시',
  'guide.controls.summon': '<b class="text-slate-200">R</b> — 파트너 고양이 소환 (재사용 대기 5분)',
  'guide.controls.panels': '<b class="text-slate-200">I / B / G</b> — 패널 열기',
  'guide.controls.close': '<b class="text-slate-200">Esc</b> — 패널 닫기',
  /* ---- 👃 嗅觉本能 ---- */
  'guide.smell.title': '👃 냄새 본능',
  'guide.smell.p1': '<b class="text-slate-200">E</b>를 누르면 바람에 실려 온 색깔 냄새 흔적이 주변 상황을 알려줘요:',
  'guide.smell.cyan': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#3ee6ff"></span><b class="text-cyan-300">청록색</b> — 깨끗한 샘과 물',
  'guide.smell.gold': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ffd75e"></span><b class="text-amber-300">금색</b> — 사냥감: 쥐, 연어, 메뚜기',
  'guide.smell.pink': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff9ad5"></span><b class="text-pink-300">분홍색</b> — 호의적인 길고양이',
  'guide.smell.red': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff4d4d"></span><b class="text-rose-400">빨간색</b> — 포식자: 멧돼지, 독사, 여우',
  'guide.smell.orange': '<span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background:#ff8a3d"></span><b class="text-orange-400">주황색</b> — 네 영토를 침범하는 라이벌 고양이',
  'guide.smell.p2': '상단의 <b class="text-slate-200">"본능" 나침반</b>이 항상 가장 가까운 냄새의 근원을 가리켜요.',
  /* ---- 🐾 生存小贴士 ---- */
  'guide.tips.title': '🐾 생존 꿀팁',
  'guide.tips.1': '<b class="text-slate-200">샘</b>(청록색)에서 물을 마시고, 강가에서 <b class="text-slate-200">F</b>를 눌러 낚시하세요.',
  'guide.tips.2': '비에 털이 젖으면 — <b class="text-slate-200">젖은 털</b>이 스태미나 회복을 늦춰요. <b class="text-slate-200">잎사귀 우비 모자</b>를 만들거나 동굴 불 옆에서 말리세요.',
  'guide.tips.3': '<b class="text-slate-200">높은 풀숲</b>을 은신하며 지나가 포식자를 피하고, 덮쳐서 결정타를 날리세요.',
  'guide.tips.4': '동굴은 안전한 피난처예요: 침대에서 새벽까지 자면 HP를 회복하고, 불 옆에서 연어를 구워 먹을 수 있어요.',
  'guide.tips.5': '<b class="text-slate-200">Q</b>를 눌러 털을 손질하면 기분이 올라가요. 기분이 너무 낮으면 계속 약해져요.',
  'guide.tips.6': '길고양이(분홍색)와 친해지면 — 친밀도가 높아지면 위험을 경고하고 함께 싸워 줘요.',
  'guide.tips.7': '캣닢은 강한 각성제예요... 하지만 "미친 폭주"를 일으키죠. 조심해서 쓰세요.',
  /* ---- 🔨 合成配方 ---- */
  'guide.recipes.title': '🔨 제작 레시피',
  'guide.recipes.1': '<b class="text-slate-200">잎사귀 우비 모자</b> — 나뭇잎 ×3 + 덩굴 ×2 (방어: 피해 -2)',
  'guide.recipes.2': '<b class="text-slate-200">생선 가시 목걸이</b> — 생선 가시 ×3 + 힘줄 ×1 (공격 +3, 우정 획득 +50%)',
  'guide.recipes.3': '<b class="text-slate-200">고양이 이빨 목걸이</b> — 생선 가시 ×4 + 힘줄 ×2 (공격 +20%)',
  'guide.recipes.4': '<b class="text-slate-200">말린 캣닢</b> — 캣닢 ×2 (낮에만 가능)',
  'guide.recipes.5': '<b class="text-slate-200">약초 연고</b> — 약초 ×3 + 멧돼지 기름 ×1',
  'guide.recipes.6': '<b class="text-slate-200">캣닢 차</b> — 캣닢 ×1 + 약초 ×1 (스태미나 +25, 즉시 회복)',
  'guide.recipes.7': '<b class="text-slate-200">활력 포션</b> — 캣닢 ×2 + 약초 ×2 + 멧돼지 기름 ×1 (스태미나 +55, [약초 연금술] 스킬 필요)',
  'guide.recipes.8': '<b class="text-slate-200">불꽃 루비 펜던트</b> — 루비 ×1 + 생선 가시 ×2 + 힘줄 ×1 (공격 +40%)',
  'guide.recipes.9': '<b class="text-slate-200">사파이어 별</b> — 사파이어 ×1 + 생선 가시 ×2 + 힘줄 ×1 (공격 +25%, 치명타 +12%)',
  'guide.recipes.10': '<b class="text-slate-200">옥 부적</b> — 옥 ×1 + 나뭇잎 ×2 + 덩굴 ×2 (공격받을 때마다 피해 -6)',
  'guide.recipes.11': '<b class="text-slate-200">덩굴 갑옷</b> — 덩굴 줄기 ×3 + 나뭇잎 ×2 + 덩굴 ×2 (피해 -7, 비에도 거의 안 젖음)',
  'guide.recipes.12': '<b class="text-slate-200">돌 발톱</b> — 루비 ×1 + 힘줄 ×2 + 생선 가시 ×2 (공격 +8, 피해 크게 증가)',
  'guide.recipes.13': '<b class="text-slate-200">용혈 포션</b> — 용혈초 ×2 + 약초 ×1 + 멧돼지 기름 ×1 (HP 60 회복, [약초 연금술] 필요)',
  /* ---- 📈 成长与技能 ---- */
  'guide.growth.title': '📈 성장과 스킬',
  'guide.growth.1': '사냥, 낚시, 채집, 반려묘, 챌린지, 보스 처치 등 모든 행동이 <b class="text-slate-200">경험치</b>를 줘요. 레벨업할 때마다 <b class="text-emerald-300">영구적으로</b> 최대 HP +10, 최대 스태미나 +6, 최대 기분 +6, 스태미나 회복 속도도 레벨에 따라 빨라져요.',
  'guide.growth.2': '레벨업, 챌린지 승리, 보스 처치 모두 <b class="text-slate-200">경험치</b>를 줘요. 하지만 <b class="text-amber-300">스킬 포인트는 레벨업에서만 얻을 수 있어요</b> (레벨당 +1), 신중하게 계획하세요. 📈 성장 패널에서 <b class="text-slate-200">다섯 갈래</b>에 자유롭게 투자하세요: 🎯사냥, 🛡️생존, 🐈유대, 💨회피, 🔨제작.',
  'guide.growth.3': '<b class="text-slate-200">사냥꾼 본능</b>(피해), <b class="text-slate-200">비상 덮치기</b>(덮치기 거리), <b class="text-slate-200">두꺼운 털</b>(피해 감소), <b class="text-slate-200">생기 넘침</b>(스태미나 회복), <b class="text-slate-200">민첩한 회피</b>(회피율), <b class="text-slate-200">달인 제작가</b>(제작 효과)는 모두 <b class="text-amber-300">반복 투자</b>가 가능해서 성장 잠재력이 커요.',
  'guide.growth.4': '<b class="text-slate-200">약초 연금술</b>이 <b class="text-slate-200">활력 포션</b>을 잠금 해제해요. <b class="text-slate-200">캣닢 차</b>도 즉시 스태미나를 회복하는 좋은 방법 — 스태미나가 바닥날 때 한 모금 마셔 보세요.',
  'guide.growth.5': '⚖️ <b class="text-amber-300">동적 난이도</b>: 몬스터, 보스, 챌린지의 강도가 네 레벨에 따라 <b class="text-slate-200">함께 성장</b>해요 (야생 초원 &lt; 도시 구역 &lt; 메마른 황무지 &lt; 어두운 숲, 깊은 지역일수록 기본이 강해요) — 레벨이 높아도 방심하지 마세요, 챌린지와 보상도 함께 올라가요.',
  'guide.growth.6': '🐾 <b class="text-amber-300">성장 속도</b>: 몬스터 밀도가 레벨에 따라 올라가고 (5레벨마다 +30%), 지역 안에서 몬스터가 <b class="text-slate-200">천천히 다시 리젠</b>되며, 경험치 곡선은 완만해요 — 한 지역에 머물지 말고 더 높은 지역으로 나아가 빠르게 레벨업하세요.',
  /* ---- ⛩ 区域与 Boss ---- */
  'guide.zones.title': '⛩ 지역과 보스',
  'guide.zones.1': '지도 가장자리의 <b class="text-slate-200">포털</b>이 새 지역으로 이어져요: <b class="text-slate-200">도시 구역</b>, <b class="text-slate-200">메마른 황무지</b>, <b class="text-slate-200">어두운 숲</b> — <b class="text-emerald-300">레벨 제한 없음</b>, 언제든 자유롭게 오갈 수 있어요.',
  'guide.zones.2': '모든 지역의 <b class="text-slate-200">오른쪽 아래</b>에는 <b class="text-slate-200">지역 보스</b>가 숨어 있어요: 거대 멧돼지(돌진), 새총 꼬마(원거리 돌멩이), 거대 늑대(번개 같은 물기), 그리고 <b class="text-rose-300">킹 코브라</b> — 최종 보스로, 몸집이 거대하고 <b class="text-rose-300">독액을 뿜으며</b>(맞으면 계속 독 피해) <b class="text-rose-300">멀리 덮치기</b>(덮치기 전에 몸을 높이 세워요)를 해요. <b class="text-amber-300">다음 지역으로 가는 포털</b>을 지키고 있어서 — 진행하려면 먼저 보스를 쓰러뜨려야 해요. 보스를 처치하면 많은 경험치를 줘요 (스킬 포인트는 여전히 레벨업에서만 얻어요).',
  'guide.zones.3': '🌋 <b class="text-slate-200">메마른 황무지</b>에는 거대한 <b class="text-slate-200">화산 분화구</b>(용암은 지나갈 수 없어요)와 <b class="text-slate-200">보석 광맥</b>이 있어요. <b class="text-rose-300">샘은 드물고 비도 거의 안 와요</b> — <b class="text-slate-200">선인장 열매</b>로 수분을 채우고, <b class="text-slate-200">용혈초</b>와 보석을 모아 강력한 장비를 만들어 보세요.',
  'guide.zones.4': '🌲 <b class="text-slate-200">어두운 숲</b>은 지나갈 수 없는 나무들로 둘러싸인 긴 <b class="text-slate-200">길</b>이에요, <b class="text-sky-300">비가 자주 와요</b> — <b class="text-slate-200">덩굴 줄기</b>를 모아 <b class="text-slate-200">덩굴 갑옷</b>을 짜고, 길 위의 사나운 <b class="text-rose-300">원숭이</b>, <b class="text-rose-300">악어</b>, <b class="text-slate-200">영지버섯</b>을 조심하세요.',
  'guide.zones.5': '🛏 도시 구역의 <b class="text-slate-200">좁은 골목</b>과 어두운 숲의 <b class="text-slate-200">나무 구멍</b>은 잠잘 수 있는 은신처예요 — 새벽까지 자면 HP 40 회복, 스태미나 완전 회복.',
  'guide.zones.6': '보스가 가까우면 화면 위에 HP 바가 나타나요. 덮치기가 주된 공격 수단이에요.',

  /* ============================================================ misc. 杂项 */
  'misc.title': '야생 본능: 샴 고양이 생존기',
  'misc.north': '북',
  'misc.cave': '동굴',
  'misc.spring': '샘',

  /* ============================================================ log. 游戏日志 */
  'log.weather.clear': '☀️ 하늘이 맑아졌어요.',
  'log.weather.rain': '🌧️ 비가 내리기 시작했어요...',
  'log.weather.mist': '🌫️ 옅은 안개가 스며들어요.',
  'log.boot.wake': '🐱 야생에서 눈을 떴어요. 본능을 믿으세요 — E를 눌러 냄새를 맡아 보세요!',
  'log.boot.newJourney': '🌱 새로운 여정이 시작돼요! 모든 게 0부터 시작해요.',
  'log.cave.idle': '🏕️ 동굴은 조용하고 안전해요. (불, 침대, 작업대 또는 출구 옆에서 F를 누르세요)',
  'log.cave.noPounce': '😺 여기서는 덮칠 공간이 없어요!',
  'log.cave.enter': '🕳️ 서늘한 동굴 은신처로 들어갔어요.',
  'log.cave.exit': '🌤️ 다시 야생으로 나왔어요.',
  'log.craft.workbench': '🛠 작업대 앞에서 재료를 준비했어요.',
  'log.craft.salmon': '🔥 모닥불에서 연어를 구웠어요!',
  'log.craft.dry': '🔥 불 옆에서 털을 말렸어요 — 따뜻하고 포근해요!',
  'log.craft.fireIdle': '🔥 모닥불이 타닥타닥 소리를 내요. (구울 연어를 가져오세요)',
  'log.craft.needSkill': '🔒 제작하려면 [{skill}] 스킬이 필요해요.',   /* 插值: {skill} */
  'log.craft.done': '🔨 {name} 제작 완료!',                     /* 插值: {name} */
  'log.bed.curl': '😴 부드러운 짚 침대에 몸을 웅크렸어요...',
  'log.bed.wake': '🌅 새벽에 눈을 떴어요, 완전히 회복됐어요. (+34 HP, 스태미나 완전 회복)',
  'log.shelter.sleep': '😴 은신처에 몸을 웅크리고 깊이 잠들었어요...',
  'log.shelter.wake': '🌅 새벽에 눈을 떴어요, 완전히 회복됐어요! (+40 HP, 스태미나 완전 회복)',
  'log.zone.enter': '⛩ [{name}]에 들어왔어요!',                 /* 插值: {name} */
  'log.death': '☠️ 지쳐 쓰러졌어요... 새벽에 눈을 떠요.',
  'log.stumble': '🐾 비틀거렸지만 자세를 바로잡았어요.',
  'log.pounce.water': '💦 물에 빠질 뻔했지만 허둥지둥 기슭으로 뛰어올랐어요! (털이 젖었어요)',
  'log.groom': '✨ 털을 손질하니 상쾌해졌어요!',
  'log.catch': '🐾 {name}을(를) 잡았어요!',                     /* 插值: {name} */
  'log.fish.run': '🎣 연어 대이동 중에 덜컥 한 마리 걸렸어요!',
  'log.fish.none': '🐟 강가에 물고기가 없어요... 목이 마르면 깨끗한 샘을 찾아보세요 (청록색 냄새).',
  'log.combat.hit': '⚔️ {name}에게 {dmg} 피해를 줬어요{crit}!',  /* 插值: {name} {dmg} {crit} */
  'log.combat.kill': '💀 {name}이(가) 쓰러졌어요.',             /* 插值: {name} */
  'log.crit.bang': '치명타!',                                   /* 暴击后缀（流浪狗命中用） */
  'log.crit.wrap': '(치명타!)',                                 /* 暴击后缀（扑击命中用） */
  'log.dodge': '💨 민첩하게 공격을 피했어요!',
  'log.damage': '💔 {n} 피해를 받았어요!',                       /* 插值: {n} */
  'log.footsteps': '👂 근처에서 발소리가 들려요...',
  'log.pred.alert': '⚠️ {name}이(가) 너를 발견했어요!',          /* 插值: {name} */
  'log.poison.venom': '💚 독액이 튀었어요! (-{dmg} HP, 중독!)',  /* 插值: {dmg} */
  'log.poison.tick': '💚 독이 퍼져요! -{n} HP',                 /* 插值: {n} */
  'log.poison.gone': '🌿 독이 가시고 회복했어요.',
  'log.level.up': '🎉 레벨업! 이제 {level} 레벨이에요! (+1 스킬 포인트)', /* 插值: {level} */
  'log.skill.point': '📌 스킬 포인트 {n} 획득! (현재 {points})', /* 插值: {n} {points} */
  'log.skill.none': '📖 그런 스킬은 없어요!',
  'log.skill.maxed': '📖 {name}은(는) 이미 최대 레벨이에요 (Lv.{max})!', /* 插值: {name} {max} */
  'log.skill.noPoint': '📌 스킬 포인트가 부족해요 — 레벨업으로만 얻을 수 있어요.',
  'log.skill.learned': '⭐ 스킬 습득: {name} Lv.{lv}/{max}! (-1 스킬 포인트)', /* 插值: {name} {lv} {max} */
  'log.skill.book': '📖 스킬 북 발견: {name}! (주머니에서 읽으세요)', /* 插值: {name} */
  'log.skill.readBook': '📖 오래된 스킬 북을 읽었어요: +40 경험치! (스킬 포인트는 레벨업에서만 얻어요)',
  'log.equip.off': '⬇️ {name}을(를) 해제했어요 (주머니에 그대로 있어요).', /* 插值: {name} */
  'log.equip.on': '⬆️ {name}을(를) 장착했어요!',               /* 插值: {name} */
  'log.zoomies': '😵‍💫 캣닢!! 미친 폭주!!! {name}!',             /* 插值: {name} */
  'log.item.use': '😋 {name}을(를) 사용했어요.',                 /* 插值: {name} */
  'log.drop.jade': '💎 원숭이 둥지에서 옥이 떨어졌어요!',
  'log.drop.sapphire': '💎 악어 가죽에 사파이어가 박혀 있어요!',
  'log.dog.bite': '🐕 길 잃은 개에게 물렸어요! (-{dmg} HP)',     /* 插值: {dmg} */
  'log.dog.bark': '🐕 길 잃은 개가 짖으며 쫓아와요!',
  'log.dog.hit': '🐕 길 잃은 개를 때렸어요 — {crit}꼬리를 내리고 도망가요!', /* 插值: {crit} */
  'log.dog.defeated': '💀 길 잃은 개를 쫓아냈어요. (+힘줄 +12 경험치)',
  'log.boss.boar.charge': '🐗 거대 멧돼지가 돌진해요!',
  'log.boss.boar.hit': '🐗 거대 멧돼지에게 날아갔어요! (-{dmg} HP)', /* 插值: {dmg} */
  'log.boss.wolf.hit': '🐺 거대 늑대에게 물렸어요! (-{dmg} HP)', /* 插值: {dmg} */
  'log.boss.cobra.spit': '🐍 킹 코브라가 독액 덩어리를 뿜어요!',
  'log.boss.cobra.leap': '🐍 킹 코브라가 화살처럼 덮쳐와요!',
  'log.boss.cobra.leapHit': '🐍 코브라의 덮치기에 크게 당했어요! (-{dmg} HP, 중독!)', /* 插值: {dmg} */
  'log.boss.cobra.spitWindup': '🐍 킹 코브라가 몸을 웅크리며 기세를 모아요... (곧 독을 뿜어요!)',
  'log.boss.cobra.leapWindup': '🐍 킹 코브라가 멈춰서 몸을 감아요... (곧 덮쳐요!)',
  'log.boss.cobra.bite': '🐍 코브라에게 물렸어요! (-{dmg} HP, 중독!)', /* 插值: {dmg} */
  'log.boss.kid.shoot': '🧒 꼬마가 새총으로 돌멩이를 쏴요!',
  'log.boss.kid.hit': '💢 돌멩이에 맞았어요! (-{dmg} HP)',       /* 插值: {dmg} */
  'log.boss.crit': '💥 [{name}]에게 치명타! {dmg} 피해!',        /* 插值: {name} {dmg} */
  'log.boss.defeated': '🏆 [{name}]을(를) 처치했어요! 엄청난 경험치!', /* 插值: {name} */
  'log.boss.respawn': '⚠️ [{name}]이(가) 경기장에서 부활했어요!', /* 插值: {name} */
  'log.feature.berry': '🍓 야생 베리를 좀 먹었어요. (+포만감, +2 HP)',
  'log.feature.catnip': '🌿 신선한 캣닢을 채집했어요.',
  'log.feature.herbs': '🌼 약초를 모았어요.',
  'log.feature.cactus': '🌵 선인장 열매를 꺾었어요 — 사막의 감로!',
  'log.feature.dragonherb': '🌹 붉은 용혈초를 꺾었어요, 효능이 강해요!',
  'log.feature.reishi': '🍄 고대 나무에서 영지버섯을 땄어요, 힘이 반짝여요.',
  'log.feature.vine': '🪵 질긴 덩굴 줄기를 잘랐어요.',
  'log.feature.spring': '💧 맑은 샘물을 마셨어요.',
  'log.feature.gem': '💎 {name}을(를) 채굴했어요! (60초 후 재생성)', /* 插值: {name} */
  'log.feature.trash': '🗑 쓰레기통에서 {name}을(를) 찾아냈어요!', /* 插值: {name} */
  'log.feature.trashEmpty': '🗑 쓰레기통이 비어 있어요...',
  'log.feature.forest': '🍂 숲에서 재료를 좀 주웠어요.',
  'log.feature.nothing': '😺 여기 상호작용할 게 없어요...',
  'log.companion.warn': '🐈 {name}이(가) 쉿 소리를 내요: 포식자가 가까워요!', /* 插值: {name} */
  'log.companion.gift': '🎁 {name}이(가) {gift}을(를) 가져왔어요!', /* 插值: {name} {gift} */
  'log.pet': '🐾 {name}을(를) 쓰다듬었어요 — 만족스럽게 가르릉거려요. (+{n} ♥)', /* 插值: {name} {n} */
  'log.pet.first': '😺 {name}이(가) 너에게 마음을 열고 있어요 — 계속 쓰다듬거나, 고양이 메뉴에서 먹이를 주면 더 빨리 친구가 돼요!', /* 插值: {name} */
  'log.pet.ready': '💗 {name}이(가) 친구가 될 준비가 됐어요 — 고양이 메뉴에서 입양하세요!', /* 插值: {name} */
  'log.feed.none': '🍽️ 지금 나눠 줄 음식이 없어요 (연어, 구운 연어 또는 쥐).',
  'log.feed': '🍖 {name}에게 {item}을(를) 줬어요! (+{n} ♥)',   /* 插值: {item} {name} {n} */
  'log.feed.first': '😺 {name}이(가) 좋아해요! 계속하면 너를 신뢰할 거예요.', /* 插值: {name} */
  'log.adopt.notReady': '💭 {name}은(는) 아직 준비가 안 됐어요 — 계속 쓰다듬고 먹이를 주세요 (60 ♥ 필요).', /* 插值: {name} */
  'log.adopt.ok': '🎉 {name}이(가) 이제 네 친구야! 어디든 따라다닐 거예요.', /* 插值: {name} */
  'log.perk.warn': '🐈 {name}이(가) 이제 위험을 경고해 줘요!',  /* 插值: {name} */
  'log.perk.hunt': '🐈 {name}이(가) 이제 함께 사냥해요 (+피해)!', /* 插值: {name} */
  'log.summon.end': '🐈 {name}이(가) 싸움을 끝내고 네 곁으로 돌아왔어요.', /* 插值: {name} */
  'log.summon.cd': '📣 소환 재사용 대기 중 ({n}초)',            /* 插值: {n} */
  'log.summon.none': '😿 파트너 고양이가 없어요 — 먼저 길고양이를 입양하세요!',
  'log.summon.ok': '📣 {name}이(가) 부름에 응해 곁에서 싸워요! (재사용 대기 {n}분)', /* 插值: {name} {n} */
  'log.summon.strike': '🐈 {name}이(가) 적에게 덮쳤어요! ({dmg} 피해)', /* 插值: {name} {dmg} */
  'log.challenge.rival.start': '⚠️ 라이벌 고양이가 네 영토를 침범했어요 — 덮쳐서 쫓아내세요!',
  'log.challenge.rival.hit': '🐈‍⬛ 라이벌 고양이를 한 대 쳐냈어요!',
  'log.challenge.rival.fled': '💨 라이벌 고양이들이 도망가요!',
  'log.challenge.rival.mark': '⚠️ 라이벌 고양이가 네 영토에 표시를 하고 있어요!',
  'log.challenge.rival.swat': '🐈‍⬛ 라이벌 고양이가 할퀴었어요! (-{n} HP)', /* 插值: {n} */
  'log.challenge.rival.loseStolen': '🏳️ 라이벌 고양이가 네 영토 일부를 차지했어요! {name}을(를) 훔쳐갔어요!', /* 插值: {name} */
  'log.challenge.rival.lose': '🏳️ 라이벌 고양이가 네 영토 일부를 차지했어요! 기분이 곤두박질쳤어요...',
  'log.challenge.rival.win': '🏆 라이벌 고양이를 쫓아냈어요! (+{n} 기분)', /* 插值: {n} */
  'log.challenge.rival.drop': '🎁 라이벌 고양이가 힘줄을 떨어뜨렸어요!',
  'log.challenge.dog.start': '🐕 들개가 너를 쫓고 있어요 — 달려!',
  'log.challenge.dog.stun': '🐕 낑낑! 들개를 기절시켰어요 — 달려!',
  'log.challenge.dog.bite': '🐕 들개에게 물렸어요! (-{n} HP)',  /* 插值: {n} */
  'log.challenge.dog.mauled': '🐕 들개에게 물어뜯겼어요...',
  'log.challenge.dog.bark': '🐕 멍! 멍!',
  'log.challenge.dog.win': '🏆 들개에게서 도망쳤어요! (+{n} 스태미나)', /* 插值: {n} */
  'log.challenge.storm.start': '⛈️ 폭풍과 번개가 몰아쳐요 — 피할 곳을 찾아!',
  'log.challenge.storm.hit': '⚡ 번개가 네 근처에 떨어졌어요! (-{n} HP)', /* 插值: {n} */
  'log.challenge.storm.far': '⚡ 멀지 않은 곳에 번개가 떨어져요!',
  'log.challenge.storm.safe': '⚡ 폭풍이 동굴 밖에서 몰아치지만 — 동굴은 안전해요.',
  'log.challenge.storm.warn': '⚡ 번개가 곧 떨어져요! 피할 곳을 찾아!',
  'log.challenge.storm.win': '🏆 폭풍을 버텨냈어요! (+{n} 기분)', /* 插值: {n} */
  'log.challenge.salmon.start': '🐟 연어 대이동! 강가에서 낚시 — 무조건 낚여!',
  'log.challenge.salmon.win': '🏆 연어 대이동이 끝났어요 — 큰 수확!',
  'log.challenge.viper.start': '🐍 독사들이 너를 둘러쌌어요 — 물리쳐!',
  'log.challenge.viper.kill': '💀 독사를 박살냈어요! (+약초)',
  'log.challenge.viper.bite': '🐍 독사에게 물렸어요! (-{n} HP)', /* 插值: {n} */
  'log.challenge.viper.win': '🏆 독사 떼를 물리쳤어요! (+{n} 기분)', /* 插值: {n} */
  'log.challenge.wolf.start': '🐺 늑대 무리가 너를 노려보고 있어요 — 싸우거나 도망쳐!',
  'log.challenge.wolf.kill': '💀 늑대 한 마리를 쓰러뜨렸어요! (+18 경험치)',
  'log.challenge.wolf.stagger': '🐺 늑대가 비틀거려요!',
  'log.challenge.wolf.bite': '🐺 늑대에게 물렸어요! (-{n} HP)', /* 插值: {n} */
  'log.challenge.wolf.win': '🏆 늑대 무리에서 살아남았어요! (+10 기분)',
  'log.challenge.stampede.start': '🐗 멧돼지 돌진! 돌진하는 멧돼지를 피해!',
  'log.challenge.stampede.hit': '🐗 돌진하는 멧돼지에게 밟혔어요! (-{n} HP)', /* 插值: {n} */
  'log.challenge.stampede.win': '🏆 멧돼지 돌진을 피했어요! (+{n} 기분)', /* 插值: {n} */
  'log.challenge.eagle.start': '🦅 독수리가 머리 위를 맴돌아요 — 급강하를 피해!',
  'log.challenge.eagle.hit': '🦅 독수리 발톱에 할퀴었어요! (-{n} HP)', /* 插值: {n} */
  'log.challenge.eagle.miss': '🦅 독수리가 네 옆으로 급강하해 지나갔어요!',
  'log.challenge.eagle.dive': '🦅 독수리가 급강하를 시작해요 — 그림자에서 벗어나!',
  'log.challenge.eagle.win': '🏆 독수리가 날아갔어요! (+{n} 기분)', /* 插值: {n} */
  'log.challenge.fog.start': '🌫️ 짙은 안개 — 시간이 다 가기 전에 {name} 신호를 찾아 탈출하세요!', /* 插值: {name}（洞穴/泉水） */
  'log.challenge.fog.win': '🏆 안개를 뚫고 길을 찾았어요! (+{n} 기분)', /* 插值: {n} */
  'log.challenge.fog.fail': '🌫️ 안개 속에서 길을 잃었어요... 털이 젖고 추워요. (-6 기분)',
};
