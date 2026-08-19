# 升级验收报告 — Top1-5 修复达成度审查（最终验收）

> 验收人：acceptor（验收审查员）｜项目：`test_project`（HTML5 Canvas 2D 生存游戏）
> 依据：review-summary.md 的 Top1-5 及高严重性发现 1-6、11-12、21-23；t1（功能/存档，242/242 断言通过）、t2（渲染/服务器，36/36 + 24/24 断言通过）回归测试结论；本验收对源码的逐项抽查与运行时复核。
> 本验收未修改任何业务代码。

---

## 一、验收结论：**通过** ✅

Top1-5 五项修复全部**已落实**，两位测试员的回归测试（共 302 项断言）全部通过且未引入新缺陷；本验收的独立复核（node --check × 9、常驻服务器 nosniff/空字节实测、entities.js 并发改动共存性）也全部通过。无阻塞问题，仅 2 条低严重性观察与若干后续迭代建议（见 §四）。

---

## 二、Top1-5 达成度清单

| 项 | 修复内容 | 达成度 | 依据（文件:行号） |
|----|---------|--------|------------------|
| Top1 | 存档白名单校验 + 动态值全量 esc()（含引号转义） | ✅ 已落实 | `js/main.js:333-381` applySave 全字段白名单：clampNum 数值兜底(L325-329)、inventory 过滤 id∈ITEMS+hasOwnProperty 且 qty 正整数夹取(L350-357)、equipped 三槽白名单(L358-364)、skills 白名单数组(L370-372)、journey 6 键白名单合并防 `__proto__`(L374-381)；`js/ui.js:371-378` esc() 全量转义 `& < > " '`（引号已补）；refreshModals 四面板动态值全部经 esc()（背包 L398-403、好友 L477-489、成长 L556-568、制作 L537-539） |
| Top2 | server.js 空字节拦截 + 路径边界 + try/catch | ✅ 已落实 | `server.js:38` 原始 URL/解码路径/解码查询三路拦截 `\x00-\x1f\x7f`→400；L24-77 外层 try/catch + L56-72 回调内 try/catch；L45-48 `path.relative` 精确边界校验（替代 startsWith 前缀比较）→403；L50-54 隐藏文件（.git 等）→404；L66 `X-Content-Type-Options: nosniff` |
| Top3 | 伙伴持久化（id/met/adopted 序列化、按 id 回填、跨区保留） | ✅ 已落实 | `js/main.js:291-294` save() 序列化 id/name/friendship/perk/colorIdx/met/adopted；L384-409 applySave 按唯一 id 匹配回填（byId 映射，非索引），存档中已收养但场景未匹配的猫经 spawnCompanion 重建(L400-408)；`js/entities.js:230-238,286-293` init(zone,pos,keepPlayer=true) 保留 adopted 伙伴并就近放置；`js/main.js:511` 换区传 true、L536 新档传 false |
| Top4 | 渲染离屏缓存（懒生成、LRU、换区重建、动画层仍逐帧） | ✅ 已落实 | `js/render.js:42-48` 16×16 区块缓存 + CHUNK_MAX=48；L50-64 invalidateChunks/chunkTouch（LRU）；L66-83 懒生成（每帧预算 8 块）；L90-99 包裹 world.generate 换区/换种子失效 + L128-133 zone 变化兜底；L160-168 动画层（水/熔岩/沼泽/草叶露珠/密林萤火）仍逐帧 drawTileAnim；drawCityBuilding 移入 drawTileStatic(L308)→城市建筑立面入缓存（save/clip 仅在建块时发生） |
| Top5 | draws 去闭包 + 粒子环形缓冲 | ✅ 已落实 | `js/render.js:119` draws 为模块级复用数组；L171-217 push 纯数据对象 `{y,kind,...}`；L218 排序一次；L219-228 switch 分发，无每帧闭包。`js/particles.js:19-30` 预分配定长池 Array(MAX=1400) + head/size 环形窗口 + free 死洞复用；L33-60 spawn 全程 O(1)（满容覆盖最旧，evictions 计数）；L96 dead 原地标记；L117-133 原地保序压缩（摊还 O(1)）；L260 只读 size |

### 对应发现覆盖核验

- **高 1**（存储型 XSS）→ Top1 ✅｜**高 2**（空字节 DoS）→ Top2 ✅｜**高 3**（draws 闭包）→ Top5 ✅｜**高 4**（静态地形无缓存）→ Top4 ✅｜**高 5**（城市建筑热点）→ Top4 ✅｜**高 6**（粒子 shift O(n)）→ Top5 ✅｜**高 7**（存档映射不完整）→ Top3 ✅｜**高 8**（跨区清空伙伴）→ Top3 ✅
- **中 11**（applySave 零校验）→ Top1 ✅｜**中 12**（startsWith 前缀边界）→ Top2 ✅
- **低 21**（`__proto__` 合并污染）→ Top1 ✅（J_KEYS 白名单键合并）｜**低 22**（esc 不转义引号）→ Top1 ✅｜**低 23**（缺 nosniff）→ Top2 ✅

---

## 三、回归风险检查

1. **entities.js 并发改动共存性** ✅ — 伙伴持久化（init keepPlayer 分支 L230-238/286-293、spawnCompanion 按 init 恢复 L166-196）与气味降频（猎物 L1188-1189 `dS>700→0.5s / >380→0.26s / 近距0.14s`、捕食者 L1247-1249 `0.16s`）两者完整共存，互不覆盖。
2. **render.js 缓存未破坏四区域视觉** ✅ — t2 结论：36/36 断言通过（zone0-3 共 ~1300 帧真实主循环零异常；静止帧 built+0、clip+0、每帧仅 4 次 drawImage → 静态层确在缓存；熔岩视野 fillRect 110/帧 vs 平地 2/帧 → 动画层逐帧；换区返回与同区换 seed 缓存正确重建；全图 121 区块 >48 上限两轮扫描 LRU 淘汰重建正常）。
3. **服务器以新代码运行** ✅ — 本验收实测常驻 8080：`/`→200 且 `X-Content-Type-Options: nosniff` + `Cache-Control: no-store, must-revalidate, no-cache, max-age=0`（与 server.js:62-67 一致）；`/%00`→400 且进程存活（随后 `/` 仍 200）；`/js/main.js`→200 text/javascript。
4. **语法复核** ✅ — 本验收独立执行 `node --check` 于全部 8 个游戏 js + server.js，9/9 通过。
5. **测试脚本清理** ✅ — 项目内无 `_tmp_*` 残留，测试员未改动业务源码。

---

## 四、遗留问题与建议（均非阻塞）

1. **低**：`js/entities.js:681/688/1085/1421/1473/1684/1706` 等运行路径仍用 `ITEMS[id]` 直接索引（低 23 的原型链查找残留）；存档入口已被 applySave 的 hasOwnProperty 白名单封堵（main.js:354），当前不可经由存档利用，建议后续统一改为 `hasOwnProperty` 查询。
2. **低**（t2 观察）：`drawSwamp` 动画层用屏幕坐标计算睡莲/芦苇位置，相机移动时轻微漂移（纯装饰）；`tx2(px)` 恒等函数残留可清理；缓存诊断仅暴露 built/blitted，chunkMap 大小不可直接观测（建议暴露 size 便于未来压测）。
3. **建议**：架构类发现（高 9 双向耦合、高 10 Game.state 隐式依赖、中 13-20、低 24-30）不在本次 Top1-5 范围内，review-summary.md §四 已列改进路径，建议随下次功能迭代逐步处理；HUD/罗盘每帧 DOM 写入与不变渐变缓存（中 13/14）是下一轮性价比最高的性能项。

---

*验收完成时间：本报告随 t3 任务 output 同步归档。*
