# 退休提款组合图与购买力开关 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 增加提款倍数和两个开关，用月度退休模型驱动年度柱线组合图及95岁余额敏感性图。

**Architecture:** 扩展现有纯计算模型，在 `calculate` 中生成年度退休序列；UI继续使用单一 `update` 读取表单，并由 `renderLifecycle` 与 `renderSensitivity` 消费模型结果。

**Tech Stack:** HTML5、CSS3、原生JavaScript、SVG、Node.js test/vm。

## Global Constraints

- 内部按月计算、退休图按年度取样至95岁。
- 所有图表金额受购买力开关统一控制。
- 退休后继续投资使用同一标普年化回报率。
- 实际提款不得超过账户余额。

---

### Task 1: 模型与结构测试

**Files:**
- Modify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: 页面HTML与 `RetirementModel`。
- Produces: 新控件、年度退休序列、提款和购买力规则的回归测试。

- [ ] 添加三个控件及四个柱线系列的结构断言。
- [ ] 添加继续投资、提款倍数和购买力口径测试。
- [ ] 运行测试，确认旧实现失败。

### Task 2: 退休月度模型和控件

**Files:**
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: 三个新参数与现有社保/积累参数。
- Produces: `retirement` 年度序列和 `remainingAt95`。

- [ ] 添加提款倍数输入与两个原生开关。
- [ ] 扩展默认值、参数规范化、月度退休模拟和敏感性输出。
- [ ] 更新指标、摘要和公式文案。

### Task 3: 柱线组合图

**Files:**
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `retirement` 序列。
- Produces: 年度双柱与双折线、双纵轴和动态单位标签。

- [ ] 替换退休阶段的旧折线为年度柱线组合图。
- [ ] 使工作期资产和95岁余额敏感性图遵守购买力开关。
- [ ] 运行测试并修正至通过。

### Task 4: 浏览器验收

**Files:**
- Verify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: 完成页面。
- Produces: 控件联动、桌面/手机布局和运行日志证据。

- [ ] 切换购买力和退休后投资，修改提款倍数，验证图形变化。
- [ ] 检查手机端无横向溢出和控制台无错误。
- [ ] 运行最终测试。
