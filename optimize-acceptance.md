# 第二轮优化验收报告（optimize-test / acceptor2）

- 验收对象：`test_project`（HTML5 Canvas 2D 生存游戏）第二轮优化成果
- 验收依据：t1（tester-perf 性能验证，18/18 断言 PASS）+ t2（tester-func2 功能/挑战回归，139/139 断言 PASS）+ 本次独立代码核验（不重复测试）
- 验收方式：读取 t1/t2 output 与队长信箱完整报告；对 8 项目标逐项 grep/read 源码核对（文件:行号）；node --check 全部 js；全项目扫描 `_tmp_*` 残留
- 验收日期：第二轮验收轮次

## 一、验收结论：✅ 通过（PASS）

两位测试员共 **157 项断言全部通过（0 失败）**；本次源码核验 8 项目标全部「✅已落实」，无 ❌ 项、无 ⚠️ 项；四区域渲染/夜间路径/上一轮 Top1-5 无回归；全部 js 文件 `node --check` 通过；无 `_tmp_*` 残留。未发现需要阻塞发布的问题。

## 二、本轮目标达成度清单

| # | 目标 | 结论 | 文件:行号 依据 |
|---|------|------|----------------|
| 1 | HUD/罗盘 DOM 写入降频 | ✅已落实 | `js/ui.js:187-193` `maybeDrawCompass` 200ms 节流（`compassT` 初始 -Infinity 首帧必绘）；`ui.js:213-257` `hudLast` 缓存 + `writeText`(221)/`writeClass`(228)/`writeStyle`(235)/`writeWidth`(244，0.1% 量化 + eps 阈值)/`writeHidden`(253，对照真实 classList)；`ui.js:346-364` log 单定时器（4200ms 一次性淡出移除，无嵌套定时器）。实测（t1）：静止 120 帧时间标签 textContent 写入 5 次、总写入 10 次；移动/扣血时 style.width 仍更新（8 次/0→3 次），UI 不僵死 |
| 2 | 渐变缓存 + 草叶/树预计算 | ✅已落实 | `js/render.js:96-103` `gradCache`(Map, GRAD_CACHE_MAX=512)/`bladeCache`/`treeCache`(CACHE_MAX=4096) + 命中统计；`render.js:106-112` `lruSet`、`render.js:115-129` `gradGet` LRU（超限淘汰最旧）；`render.js:1099-1108` 树缓存（hash/半径/相位）、`render.js:1127-1145` 草叶缓存（变体/颜色/叶片几何）；`render.js:135-141` `cacheInfo()` 诊断 API。实测（t1）：稳态 10 帧渐变创建 4.3 个/帧（未缓存等效 33.3，约 **7.7 倍**减少），grad hits 29/帧、blade hits 23/帧、tree hits 36/帧；换种子/换区 blades/trees/chunks 归零后重新增长 |
| 3 | drawSwamp 世界坐标锚定 | ✅已落实 | `js/render.js:795-833`：装饰相位一律 `U.hash2(tx+…, ty+…)` 世界格坐标（807/811/830），波纹 `sin(t*1.2 + tx*W.TILE*0.01 + ty*W.TILE*0.013)`（801）；px/py 仅作该格屏幕偏移基线；函数体内无 cam.x/cam.y/view.cam 屏幕坐标残留（t1 正则+括号平衡验证） |
| 4 | ITEMS 原型链统一（itemDef + 7 处改用） | ✅已落实 | `js/entities.js:60-62` `itemDef` 用 `hasOwnProperty` 只读自有属性，`__proto__`/`constructor` 返回 undefined；7 处改用：entities.js:697/704/1101/1434/1486/1697/1719；导出 entities.js:1865。t2 验证（12 断言）：猫薄荷茶/采宝石/翻垃圾桶路径行为不变、非法 id 无副作用。注：ui.js:459 自带 hasOwnProperty 防护；ui.js:497/521、challenges.js:566 仍有直接 ITEMS 访问，但键均来自静态 RECIPES/固定 foodIds 表，非用户输入，风险可忽略（见遗留建议） |
| 5 | minLevel 死代码清理 | ✅已落实 | `js/world.js:425-457` `placeGates()` 无 minLevel 参数、门对象无 minLevel 字段；`world.js:20-26` `ZONE_INFO` 已无 min 字段（注释明示随等级门移除）；grep 全项目 js 零残留（仅 review-summary.md 文档提及）。t2 验证（13 断言）：zone0=4 门、zone1=2、zone2=3、zone3=2，无误导注释 |
| 6 | sneakFactor 潜行统一 | ✅已落实 | `js/entities.js:338-345` 定义（1 / 0.35 / 0.18 / 0.55 / 0.4 / 0.8），导出 entities.js:1876；共用方：`entities.js:373` updateStrayDog（235×）、`entities.js:1278` updatePredator（e.aggro×）、`challenges.js:309` 挑战狗（430×）、`challenges.js:419` 挑战狼（400×）。t2 验证（19 断言）：系数与边界距离全部正确 |
| 7 | 挑战每帧 filter 零分配 + storm 天气恢复 | ✅已落实 | `js/challenges.js:569-580` checkEnd 存活计数改原地遍历；`challenges.js:719-723` 死亡实体反向遍历 splice（注释明示避免 filter 每帧分配）；仅 `challenges.js:560-567` stealFood 用 filter——但仅在挑战失败结算时执行一次，非每帧。t2 验证：480 挑战帧 filter 计数 = 0。天气恢复：`challenges.js:105-111` start 保存 prevWeather/prevWeatherT；`challenges.js:634-638` storm win 置 weather='clear'、weatherT=45；`challenges.js:685-697` endChallenge 非 win 时恢复进入前天气与剩余 weatherT |
| 8 | CAVE_WORK 单一来源 | ✅已落实 | 定义仅 1 处 `js/render.js:2593` `{x:250, y:500}`，导出 render.js:2778；`js/main.js:143` 引用 `Game.render.CAVE_WORK.x/y`（注释「坐标单一来源」）；render.js 内部使用（2636/2748/2751）用本地常量。全项目无第二处硬编码 250/500 工作台坐标 |

## 三、回归风险检查

1. **上一轮 Top1-5 完好** — ✅（t2 结论，51 断言）：存档白名单（恶意存档 skills={}/坏 inventory/`__proto__` 注入/`<img>` 注入 boot 不崩无污染）、esc 转义、伙伴 adopted/met 持久化、跨区 keepPlayer 保留收养猫、渲染离屏缓存 chunkInfo 四区域跑帧不崩、粒子环形缓冲 5000 spawn ≤ MAX(1400)。核心玩法冒烟 15 断言亦全过。
2. **四区域渲染与夜间路径无回归** — ✅（t1 结论）：24 轮（12 关键位置 × 白天/夜间各 40 帧）0 崩溃，含城市 4 风格、熔岩、沼泽、3 个 Boss 竞技场、夜间渐变路径（星点/夜视光池/萤火）、洞穴冒烟。
3. **全部 js 文件 node --check** — ✅：`challenges.js / entities.js / main.js / particles.js / render.js / ui.js / utils.js / world.js / server.js` 共 9 个全部 OK（本次复跑确认）。
4. **项目无 `_tmp_*` 残留** — ✅：全项目递归扫描（含 .agent-teams）无任何匹配文件。

## 四、遗留问题与建议（均非阻塞）

1. **直接 ITEMS 下标访问残留（低风险）**：`js/ui.js:497`、`js/ui.js:521`、`js/challenges.js:566` 仍直接 `ITEMS[key]`，但键均来自静态 RECIPES（parts/id）与固定 foodIds 表，非用户/存档输入，原型污染风险可忽略。建议后续轮次统一改走 `itemDef()` 以保持单一入口。
2. **cacheInfo 计数语义（诊断性）**：tester-perf 备注 `cacheInfo()` 的 hits/misses 为累计值，`invalidateChunks` 只清 Map 不清计数；压测看增量需自行取差值。非缺陷，仅建议文档注明或增加 reset 入口。
3. **根目录日志文件**：`server.err.log` / `server.log` 存在于项目根（非 `_tmp_*`，非本轮产物），如属构建/运行残留可考虑清理或加入 .gitignore。
4. **文档残留**：`review-summary.md:63,87` 仍提及 minLevel（历史记录），属文档非代码，可保留。

## 五、结论复核

- 目标达成：**8/8 全部落实**（0 ⚠️、0 ❌）
- 测试证据：t1 18/18 + t2 139/139 = **157/157 断言 PASS**
- 回归证据：四区域/夜间 24 轮 0 崩溃；Top1-5 51 断言完好；node --check 9/9；无临时文件残留
- **验收判定：通过（PASS），可以进入下一阶段**
