# 荒野猫咪生存游戏 — 三角度代码审查汇总验收报告

> 验收人：reviewer（评审验收员）｜汇总 t1 性能审查、t2 安全审查、t3 架构审查
> 项目：`test_project`（HTML5 Canvas 2D 生存游戏）｜共 30 条发现（10 高 / 10 中 / 10 低）

---

## 一、验证摘要（交叉验证）

随机抽查 3 位审查员报告中的 **10 条高严重性发现**，逐一用 read/grep 打开源码核实行号与描述，**全部 10 条【已验证】，0 条【存疑】**：

| # | 审查来源 | 文件:行号 | 验证结果 |
|---|---------|----------|---------|
| 1 | 性能 t1 | js/render.js:76-124 每帧重建 draws 数组 + 闭包 | 【已验证】L76 `const draws = []`，L82/84/93/99/105/113/120 各 push 闭包，L123 sort，L124 `d.f()`；行号与描述完全一致 |
| 2 | 性能 t1 | js/render.js:163-215 静态地形无离屏缓存 | 【已验证】L164 `drawTileBase`、L167 hash2、L170 fillRect、L172-212 额外绘制；GRASS 确实二次绘制（L199 `drawGrassTile` + L84 再 push `drawGrassBlades`） |
| 3 | 性能 t1 | js/render.js:226-264 + 338-536 城市建筑热点 | 【已验证】L226 `drawCityBuilding`，L248-257 save/clip/translate/restore，L260-263 暗色覆盖；paintNYC@p338 / paintSydney@p407 / paintKunming@p438 / paintBeijing@p480 均存在（338-536 范围成立） |
| 4 | 性能 t1 | js/particles.js:23-24 + js/entities.js:1164-1167/1222-1225 粒子 shift() O(n) | 【已验证】particles.js L19 `MAX=1400`、L24 `if (list.length >= MAX) list.shift()`；entities.js L1164-1167 猎物嗅探 0.14s 发射、L1222-1225 捕食者 0.16s，与描述一致 |
| 5 | 安全 t2 | js/ui.js:395 / 549-556 / 479 存储型 XSS | 【已验证】L395 `×' + it.qty`、L479 `style="width:' + c.friendship + '%"`、L549-556 journey/level/skillPoints/xp 均未转义直接拼 innerHTML；esc()（L370-372）只转义 & < >，与描述一致 |
| 6 | 安全 t2 | server.js:35 空字节 DoS | 【已验证】L26 `decodeURIComponent`、L31-32 normalize/join + startsWith、L35 `fs.readFile` 无 try/catch；含 `\0` 的路径会同步抛 ERR_INVALID_ARG_VALUE 击穿 handler |
| 7 | 安全 t2 | server.js:31-34 startsWith 前缀边界缺陷（中） | 【已验证】`filePath.startsWith(root)` 为字符串前缀比较，`/../test_project_backup/x` 归一化后仍以 root 开头，可读前缀同名兄弟目录 |
| 8 | 架构 t3 | main.js:291,334-337 + entities.js:172 存档映射缺失 | 【已验证】L291 save 仅序列化 `{name,friendship,perk,colorIdx}`；L334-337 applySave 按数组索引只回填这 4 项；entities.js L172 `met:false, adopted:false` 从未入库 |
| 9 | 架构 t3 | entities.js:225,273 换区清空伙伴猫 | 【已验证】L225 `companions.length = 0`（init 内无条件执行），L273 按 cfg.comp 重刷新流浪猫；main.js:439 `init(to,pos,true)` 保留玩家但不保留伙伴 |
| 10 | 架构 t3 | entities.js↔challenges.js 双向耦合 + main.js:15-35 Game.state 隐式依赖 | 【已验证】grep 证实 entities.js 恰好 15 处引用 `Game.challenges`（882,883,1003-1012,1153,1171,1242,1330-1345,1695）；Game.state 定义于 main.js:15-35，index.html:304 确认 main.js 最后加载，entities.js 大量 `Game.state &&` 守卫（556 等） |

---

## 二、合并分级清单（高严重性在前，标注来源角度）

### 🔴 高严重性（10 条）

1. **[安全] js/ui.js:395/549-556/479 — 存储型 XSS：存档可控字段未转义拼 innerHTML**。改 localStorage `wfissave` 的 qty/level/xp/journey/friendship 后打开背包/成长/好友面板即执行脚本。applySave（main.js:314-343）零校验直接赋值。修复：字段类型白名单 + 全量 esc()（补引号转义）或 textContent 构建。
2. **[安全] server.js:35 — 空字节请求致 Node 进程崩溃（DoS）**。`GET /%00` 解码后通过 path 检查，fs.readFile 同步抛异常且无 try/catch，进程直接退出。修复：decode 后拦 `\0`/控制字符回 400 + handler 包 try/catch。
3. **[性能] js/render.js:76-124 — 每帧重建 draws 排序数组 + 数百闭包 + O(n log n) sort**。每秒上万次堆分配，GC 压力大。修复：数据对象 + switch 分发、桶排序、静态列表预计算。
4. **[性能] js/render.js:163-215 — 静态地形每帧全量重绘，无离屏缓存**。~920 格 × 2-8 次 canvas 调用/帧。修复：静态层离屏 canvas 缓存，仅动画格逐格重绘。
5. **[性能] js/render.js:226-264/338-536 — 城市建筑每帧 ~400 格 × 30-70 次绘制 + 每格 save/clip/restore**。全区最大渲染热点（1.5-2.5 万次调用/帧）。修复：建筑立面按 block 预渲染贴图，每格只 drawImage。
6. **[性能] js/particles.js:24 — 粒子满容 list.shift() O(n)，嗅探时 ~2000 次/秒触发**。每秒 2000 次 O(1400) 搬移 + GC。修复：环形缓冲/对象池，气味发射随距离降频。
7. **[架构] main.js:291,334-337 + entities.js:172 — 存档映射不完整：adopted/met 丢失**。刷新后已收养宠物全退化为流浪猫，friends 按索引回填还会错位。修复：序列化补 met/adopted，friends 按唯一 id 匹配。
8. **[架构] entities.js:225,273 — 跨区传送清空所有伙伴猫**。与"保留玩家成长"设计矛盾，羁绊系统被系统性抹掉。修复：伙伴作为持久实体跨区保留或明确设计并提示。
9. **[架构] entities.js↔challenges.js 双向深度耦合（15 处 vs 全局引用）**。互相穿透内部状态，无法独立测试/复用。修复：抽"可命中实体"接口，挑战实体并入统一实体系统。
10. **[架构] main.js:15-35 — Game.state 定义在最后加载文件，6 模块隐式依赖**。靠加载顺序 + `&&` 守卫维持，调整即崩。修复：state 前移到独立模块或提供显式初始化契约。

### 🟡 中严重性（10 条）

11. **[安全] main.js:314-343 — applySave 零类型校验**：d.skills={} 使 recalcMaxStats（entities.js:547 `p.skills.includes`）抛错、boot（main.js:469）无 try/catch → 黑屏无法启动；数值字段 NaN 传播。
12. **[安全] server.js:31-34 — startsWith 前缀边界缺陷**：可读前缀同名兄弟目录（如 test_project_backup）内任意文件。
13. **[性能] main.js:365 + ui.js:193-267 — HUD/罗盘每帧全量 DOM 写入 + 重绘**。
14. **[性能] render.js:2335-2349 — 每帧创建 30+ 个不变渐变**。
15. **[性能] entities.js:1192-1200 — 猎物 O(猎物×实体) 全表扫描**，且被 nearbyChasingPredator/dogChase/nearbyThreat 多处重复。
16. **[性能] render.js:925-944 — 草叶/树每帧重算 hash2+sin**。
17. **[架构] render.js:2356 + main.js:139 — CAVE_WORK 坐标重复定义**。
18. **[架构] entities.js:334-336 / challenges.js:304-307,415-418 — 潜行侦测三处重复且数值不一致**。
19. **[架构] entities.js:915,920 / main.js:203,207 — 体力公式复制两份**。
20. **[架构] render.js 绘制中 spawn 粒子 — UI 命令与渲染副作用混入业务**。

### 🟢 低严重性（10 条）

21. **[安全] main.js:332 — Object.assign 合并 journey 时 `__proto__` 键触发原型 setter**（可放大 XSS）。
22. **[安全] ui.js:370-372 — esc() 不转义引号**（当前仅文本上下文，潜在）。
23. **[安全] entities.js:667 / ui.js:384 — ITEMS[id] 原型链查找** + server 缺 nosniff + index.html:7 CDN 无 SRI。
24. **[性能] render.js:2214 / ui.js:85-89 — 每帧 features 全量扫描**。
25. **[性能] challenges.js:699 — 每帧 filter**。
26. **[性能] ui.js:292-296 — 日志双 setTimeout**。
27. **[架构] world.js:427,436 — minLevel 门控死代码**（transitionZone 从不检查）。
28. **[架构] 气味色/交互类型列表跨模块重复**。
29. **[架构] 主循环无 try/catch**。
30. **[架构] challenges 直接写 Game.state.weather**。

---

## 三、优先修复 Top5（按性价比排序）

| 优先级 | 修复项 | 涉及 | 成本 | 收益 |
|-------|--------|------|------|------|
| 1 | **存档字段白名单校验 + 动态值全量 esc()** | sec 高1 + 中11 | 低（集中改 applySave + refreshModals） | 一举消灭存储型 XSS 与加载即崩溃，安全收益最高 |
| 2 | **server.js 空字节拦截 + 路径边界校验** | sec 高2 + 中12 | 极低（数行） | 消除 DoS 崩溃与目录逃逸 |
| 3 | **存档补 met/adopted + friends 按唯一 id 匹配** | arch 高7 + 高8 | 低-中 | 保住玩家核心进度（宠物/羁绊），玩法价值高 |
| 4 | **静态地形 + 城市建筑离屏缓存** | perf 高4 + 高5 | 中 | 渲染最大热点，低端机 FPS 提升最明显 |
| 5 | **draws 数据对象替代闭包 + 粒子环形缓冲** | perf 高3 + 高6 | 中 | 减少每帧分配与 GC 卡顿 |

## 四、非阻塞但建议改进

- HUD/罗盘每帧 DOM 写入降频（中13）
- 不变渐变缓存、草叶/树 hash 预计算（中14/16）
- 猎物 O(n²) 扫描合并去重（中15）
- 重复定义收敛：CAVE_WORK 坐标、体力公式、潜行侦测数值统一（中17/18/19）
- esc() 补引号转义、`__proto__` 合并防护、CDN 加 SRI、server 加 nosniff（低21-23）
- 死代码清理（minLevel）、主循环 try/catch、features/challenges 每帧扫描优化（低24-30）

## 五、总体结论

**代码质量：中等偏上，可玩性完整的成品级小游戏，但"信任边界"与"每帧重复劳动"是两大软肋。**

正面确认：主循环结构健康（dt 钳制、视野裁剪、逐帧剪枝），无 eval/Function/document.write 等动态代码，日志/HUD/猫名渲染均走 textContent/canvas；内存无泄漏（粒子/实体/弹道均有上限与清理）；模块按文件划分清晰、注释良好；三份审查在"行号可核实"上全部通过，说明报告可信度高。

负面问题按严重性分三层：
1. **安全层（最优先）**：存档系统是"无信任边界"的——localStorage 内容直通 innerHTML 与运行时对象，既构成存储型 XSS 入口，又能让游戏加载即崩溃；server.js 一个空字节即可击穿进程。这两处修复成本极低、收益立竿见影，应作为第一优先级。
2. **性能层（体验瓶颈）**：渲染管线每帧重复劳动量大——draws 闭包重建、静态地形与城市建筑无离屏缓存、粒子满容 shift()。60fps 目标下这些是主要的 GC 与 draw call 开销来源，离屏缓存是性价比最高的优化。
3. **架构层（可持续性）**：存档映射不完整导致玩家进度丢失（宠物/羁绊），entities↔challenges 双向耦合与 Game.state 隐式加载顺序依赖使扩展脆弱（新增地形需改约 6 处、新敌人约 7 处）。建议在下次功能迭代前先补存档字段与伙伴持久化，其余耦合重构可随扩展需求逐步推进。

**一句话**：先修 Top1-3（安全 + 存档完整性，半天工作量），再做 Top4-5（渲染缓存，一天工作量），即可同时消除"能被人搞崩"和"帧率不稳"两类最影响体验的问题；架构耦合问题建议作为后续扩展时的重构项，而非现在大动干戈。
