# 五语言回归测试报告（i18n-tester）

测试时间：2026-08-20T09:54:34.474Z

测试项目：test_project（HTML5 Canvas 2D 生存游戏）
范围：i18n 框架 + 5 语言字典 + ui/entities/render/world/challenges/main 全模块

## 结果汇总

| 项 | 结果 |
|---|---|
| 1 | ✅ 通过 |
| 2 | ✅ 通过 |
| 3 | ✅ 通过 |
| 4 | ✅ 通过 |
| 5 | ✅ 通过 |
| 6 | ✅ 通过 |
| 7 | ✅ 通过 |
| 8 | ✅ 通过 |
| 9 | ✅ 通过 |

通过 9 / 9 项

## 1. 框架：t / 回退 / setLang 持久化 / cycleLang — ✅ 通过

- PASS Game.i18n.t 类型 = function
- PASS zh t('ui.hud.level',{n:3}) = "Lv 3"
- PASS zh 值正确
- PASS t('不存在.key') = "不存在.key"
- PASS 回退原 key 正确
- PASS setLang(en) 返回 true，localStorage wfi_lang = "en"
- PASS setLang 持久化正确
- PASS setLang(非法语言) 返回 false
- PASS cycleLang 顺序 = en→fr→es→de→zh
- PASS cycleLang zh→en→fr→es→de→zh 正确

## 2. 五语言覆盖：全 key 非空 + 15 高频 key 抽查 — ✅ 通过

- note i18n-keys.md 共 490 个 key（文档声明 487）
- note 去重后 490 个 key
- PASS zh：全部 490 个 key 均有非空值
- PASS en：全部 490 个 key 均有非空值
- PASS fr：全部 490 个 key 均有非空值
- PASS es：全部 490 个 key 均有非空值
- PASS de：全部 490 个 key 均有非空值
- note zh 字典 490 个 key；zh 有而 md 无：无；md 有而 zh 无：无
- PASS 15 个高频 key × 5 语言抽查全部通过
- note item.berry.name = zh:野莓 | en:Wild Berries | fr:Baies sauvages | es:Bayas Silvestres | de:Wildbeeren
- note skill.hunter.name = zh:猎手本能 | en:Hunter Instinct | fr:Instinct de chasseur | es:Instinto de Cazador | de:Jägerinstinkt
- note boss.3 = zh:大眼镜蛇 | en:King Cobra | fr:Cobra royal | es:Cobra Real | de:Königskobra
- note zone.0 = zh:荒野草原 | en:Wild Grassland | fr:Plaines sauvages | es:Pradera Salvaje | de:Wildes Grasland
- note challenge.dog.title = zh:🐕 恶犬追击！ | en:🐕 Dog Chase! | fr:🐕 Chien en furie ! | es:🐕 ¡Perro en Persecución! | de:🐕 Hundejagd!
- note ui.hud.level = zh:Lv {n} | en:Lv {n} | fr:Nv {n} | es:Nv {n} | de:Lv {n}
- note guide.controls.title = zh:🎮 操作 | en:🎮 Controls | fr:🎮 Commandes | es:🎮 Controles | de:🎮 Steuerung
- note log.damage = zh:💔 你受到 {n} 点伤害！ | en:💔 You take {n} damage! | fr:💔 Tu subis {n} dégâts ! | es:💔 ¡Recibes {n} de daño! | de:💔 Du erleidest {n} Schaden!
- note enemy.boar = zh:野猪 | en:Boar | fr:Sanglier | es:Jabalí | de:Wildschwein
- note item.catnip_tea.name = zh:猫薄荷茶 | en:Catnip Tea | fr:Thé à l'herbe à chat | es:Té de Hierba Gatera | de:Katzenminze-Tee
- note recipe.energy_potion.name = zh:活力药剂 | en:Energy Potion | fr:Potion d'énergie | es:Poción de Energía | de:Energietrank
- note feature.shelter.hollow = zh:🛏 树洞避难所 | en:🛏 Hollow Shelter | fr:🛏 Abri creux | es:🛏 Refugio del Árbol Hueco | de:🛏 Baumhöhlen-Unterstand
- note misc.title = zh:荒野本能：暹罗猫求生 | en:Wild Instinct: Siamese Survival | fr:Instinct sauvage : survie du chat siamois | es:Instinto Salvaje: Supervivencia del Gato Siamés | de:Wilder Instinkt: Siamkatzen-Überleben
- note ui.inv.equip = zh:装备 | en:Equip | fr:Équiper | es:Equipar | de:Anlegen
- note skill.alchemist.name = zh:草药炼金 | en:Herbal Alchemy | fr:Alchimie végétale | es:Alquimia Herbolaria | de:Kräuteralchemie

## 3. 插值占位符一致性（对比 zh） — ✅ 通过

- PASS 全部含占位符 key 在 4 语言中占位符集合一致

## 4. UI 切换：refreshModals + updateHUD 五语言无异常、无中文残留 — ✅ 通过

- PASS en 切换无异常
- PASS en 四面板 + HUD 无中文残留
- PASS fr 切换无异常
- PASS fr 四面板 + HUD 无中文残留
- PASS es 切换无异常
- PASS es 四面板 + HUD 无中文残留
- PASS de 切换无异常
- PASS de 四面板 + HUD 无中文残留
- PASS zh 切换无异常
- PASS zh 面板恢复中文

## 5. 日志翻译：升级/学技能/用物品/采宝石/受伤/召唤 随语言变化 — ✅ 通过

- PASS zh 捕获 22 条日志，全部非空（含前3条："📌 获得 1 技能点！（当前 4）" | "🎉 升级！你现在是 2 级！（+1 技能点）" | "📌 获得 1 技能点！（当前 5）"）
- PASS zh 日志含中文
- PASS en 捕获 12 条日志，全部非空（含前3条："📌 Gained 1 skill point(s)! (now 12)" | "🎉 Level up! You are now level 11! (+1 skill point)" | "📌 Gained 1 skill point(s)! (now 13)"）
- PASS en 日志无中文残留
- PASS fr 捕获 10 条日志，全部非空（含前3条："📌 +1 point(s) de compétence ! (maintenant 15)" | "🎉 Niveau supérieur ! Tu es maintenant niveau 15 ! (+1 point de compétence)" | "📌 +1 point(s) de compétence ! (maintenant 16)"）
- PASS fr 日志无中文残留
- PASS es 捕获 10 条日志，全部非空（含前3条："📌 ¡Obtienes 1 punto(s) de habilidad! (ahora 17)" | "🎉 ¡Subes de nivel! Ahora eres nivel 18. (+1 punto de habilidad)" | "📌 ¡Obtienes 1 punto(s) de habilidad! (ahora 18)"）
- PASS es 日志无中文残留
- PASS de 捕获 8 条日志，全部非空（含前3条："📌 +1 Fähigkeitspunkt(e)! (jetzt 19)" | "🎉 Stufenaufstieg! Du bist jetzt Stufe 21! (+1 Fähigkeitspunkt)" | "📌 +1 Fähigkeitspunkt(e)! (jetzt 20)"）
- PASS de 日志无中文残留
- PASS zh 与 en 日志消息集合互相不同（随语言变化）

## 6. canvas 渲染：zone0-3 × zh/en × ~30帧 + Boss/传送门/F提示/避难所 标签路径 — ✅ 通过

- PASS zone0(荒野草原) [zh] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone0(荒野草原) [en] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone1(城市小区) [zh] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone1(城市小区) [en] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone2(干燥荒野(熔岩)) [zh] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone2(干燥荒野(熔岩)) [en] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone3(幽暗森林(树洞暗巷)) [zh] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩
- PASS zone3(幽暗森林(树洞暗巷)) [en] 30帧+Boss/门/避难所/F/水/洞穴 标签路径全部不崩

## 7. 挑战：dog / storm / viper × zh/en × ~20帧 — ✅ 通过

- PASS dog [zh] 20帧不崩，横幅="🐕 恶犬追击！"
- PASS storm [zh] 20帧不崩，横幅="⛈️ 雷雨风暴"
- PASS viper [zh] 20帧不崩，横幅="🐍 毒蛇群袭"
- PASS dog [en] 20帧不崩，横幅="🐕 Dog Chase!"
- PASS storm [en] 20帧不崩，横幅="⛈️ Thunderstorm"
- PASS viper [en] 20帧不崩，横幅="🐍 Viper Swarm"

## 8. index.html data-i18n：applyPage 填充 data-i18n / -html / -title — ✅ 通过

- PASS zh applyPage：title="荒野本能：暹罗猫求生" meter="生命" hint="<b class="text-white">WASD</b> 移动 · <b c…" btn="成长与技能"
- PASS zh data-i18n 全部正确填充
- PASS en applyPage：title="Wild Instinct: Siamese Survival" meter="HP" hint="<b class="text-white">WASD</b> Move · <b…" btn="Growth & Skills"
- PASS en data-i18n 随语言切换正确
- PASS en 标题与 zh 不同且无中文
- PASS btn-lang zh = "🌐 中文"
- PASS 语言按钮 zh 文案正确
- PASS btn-lang de = "🌐 Deutsch"
- PASS 语言按钮 de 文案正确

## 9. 全部 js 文件 node --check — ✅ 通过

- PASS js/utils.js ✓
- PASS js/i18n.js ✓
- PASS js/lang/zh.js ✓
- PASS js/lang/en.js ✓
- PASS js/lang/fr.js ✓
- PASS js/lang/es.js ✓
- PASS js/lang/de.js ✓
- PASS js/world.js ✓
- PASS js/particles.js ✓
- PASS js/entities.js ✓
- PASS js/render.js ✓
- PASS js/ui.js ✓
- PASS js/challenges.js ✓
- PASS js/main.js ✓
- PASS 全部 14 个 js 文件语法检查通过

## 结论

全部通过，五语言切换功能正常。
