# 顶部临界点洞察 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用动态寿命—回报临界点洞察替换顶部重复的月收入卡片。

**Architecture:** 在单文件 `RetirementModel` 中增加家庭累计价值模拟与 0%–20% 二分求根接口，页面层在每次参数变化时计算 70/75/80/85/95 岁临界点。顶部保留现有两列结构，左侧缩小标题，右侧渲染半透明洞察卡；下方 KPI 与图表保持不变。

**Tech Stack:** 原生 HTML、CSS、JavaScript、Node.js 内置测试运行器

## Global Constraints

- 不增加网络请求、第三方库或新的预期寿命输入框。
- 家庭累计价值必须计入累计领取/提款与目标年龄的可继承余额。
- 主代表寿命固定为 85 岁，参考点固定为 70、75、80、85、95 岁。
- 临界点在扫描区间外时显示“低于 0%”或“高于 20%”。
- 320px 宽度下不得截断洞察内容。

---

### Task 1: 家庭累计价值与临界回报率模型

**Files:**
- Modify: `index.html`
- Modify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Produces: `RetirementModel.familyValueAtAge(raw, deathAge)` 返回 `{social, investment, exhaustedAt}`。
- Produces: `RetirementModel.breakEvenReturnAtAge(raw, deathAge)` 返回 `{status: "within"|"below"|"above", rate}`。

- [ ] **Step 1: 写失败测试**

测试从 `index.html` 提取并执行 `model-core`，断言默认参数的 70/75/80/85/95 岁临界回报率分别近似 4.33/5.61/6.47/7.01/7.61，并断言接口随 `continueInvesting` 与养老金调整参数变化。

- [ ] **Step 2: 运行测试确认失败**

运行：`node --test tests/retirement-page.test.mjs`

预期：失败信息为 `familyValueAtAge` 或 `breakEvenReturnAtAge` 不存在。

- [ ] **Step 3: 实现逐月家庭累计价值**

在 `calculate()` 后增加 `familyValueAtAge()`：退休前比较个人账户与投资账户余额；退休后逐月累计养老金和投资提款，扣减社保个人账户可继承余额，并根据 `continueInvesting` 决定退休后投资余额是否继续复利。

- [ ] **Step 4: 实现临界点求根**

在 0%–20% 检查区间端点；区间内执行 50 次二分迭代，以 `investment - social` 的符号收敛到临界回报率；将两个接口暴露在 `globalThis.RetirementModel`。

- [ ] **Step 5: 运行模型测试**

运行：`node --test tests/retirement-page.test.mjs`

预期：模型临界点测试通过，原有测试无回归。

### Task 2: 顶部洞察卡与动态更新

**Files:**
- Modify: `index.html`
- Modify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: `RetirementModel.breakEvenReturnAtAge()`。
- Produces: `#breakEvenRate85` 主值和 `#breakEvenRate70/#breakEvenRate75/#breakEvenRate80/#breakEvenRate95` 参考值。

- [ ] **Step 1: 写失败的结构与文案测试**

断言标题原文存在、副标题等于用户确认文案、顶部包含临界点 ID 与 `aria-live="polite"`，并断言旧 `heroSocial`/`heroFund` 元素已移除。

- [ ] **Step 2: 运行测试确认失败**

运行：`node --test tests/retirement-page.test.mjs`

预期：缺少临界点结构并仍存在旧顶部 KPI。

- [ ] **Step 3: 替换 HTML 与 CSS**

将 `.snapshot` 替换为 `.break-even-insight`；桌面两列使用 `1.05fr .95fr`，标题最大字号 52px；960px 以下单列，参考点在窄屏允许换行。

- [ ] **Step 4: 更新页面脚本**

删除 `heroSocial`、`heroFund` 和 `heroFundDuration` 更新，新增 `renderBreakEvenInsights(params)`，统一格式化区间内与区间外结果，并更新五个寿命点。

- [ ] **Step 5: 完整验证**

运行：

```bash
node --test tests/retirement-page.test.mjs
node -e 'const fs=require("fs"),s=fs.readFileSync("index.html","utf8"),scripts=[...s.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/gi)].map(m=>m[1]); scripts.forEach(code=>new Function(code)); console.log(`verified ${scripts.length} scripts`)'
git diff --check
```

预期：全部测试通过、两个脚本语法通过、无空白错误。

### Task 3: 提交与发布

**Files:**
- Modify: `.gitignore`
- Modify: `docs/superpowers/plans/2026-07-18-hero-break-even-insight.md`

- [ ] **Step 1: 最终检查**

运行 `git status --short`，确认 `.superpowers/` 已被忽略，产品变更仅为 `index.html`、测试、`.gitignore` 和本计划。

- [ ] **Step 2: 提交并推送**

```bash
git add .gitignore index.html tests/retirement-page.test.mjs docs/superpowers/plans/2026-07-18-hero-break-even-insight.md
git commit -m "Replace hero KPIs with break-even insight"
git push
```
