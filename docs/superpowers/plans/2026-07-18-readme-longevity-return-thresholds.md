# README 寿命与投资回报临界点分析 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用当前养老金模型计算寿命与个人投资年化回报率的二维临界点，并把结论写到 README 顶部。

**Architecture:** 从 `index.html` 加载 `RetirementModel`，以页面默认参数逐月重放社保领取、个人账户余额、投资提款和投资余额。用二分搜索求代表去世年龄下两侧家庭累计价值相等的回报率，并将结果、口径与局限写入 `README.md`。

**Tech Stack:** Node.js、原生 JavaScript、Markdown

## Global Constraints

- 产品内容只修改 `README.md`，不修改 `index.html` 或计算模型。
- 默认参数必须与 `RetirementModel.defaults` 一致。
- “家庭累计价值”口径必须计入累计领取与去世时可继承余额。
- 不将模型截至 95 岁仍有余额表述成现实中的永久可持续。

---

### Task 1: 计算二维临界点

**Files:**
- Read: `index.html`
- Temporary analysis only: `/tmp/pension-threshold-analysis.mjs`

**Interfaces:**
- Consumes: `RetirementModel.defaults`、`normalize()`、`adjustPension()` 和 `calculate()`。
- Produces: 60、65、70、75、80、85、90、95 岁的临界投资回报率；默认 8% 回报下的寿命临界点与账户耗尽年龄。

- [ ] **Step 1: 写逐月分析脚本**

脚本必须分别累计社保养老金、社保个人账户可继承余额、个人投资提款和投资剩余余额，并输出每个代表年龄的两侧家庭累计价值差额。

- [ ] **Step 2: 校验分析脚本边界**

运行脚本并确认：25–60 岁期间投资余额高于低记账利率的社保个人账户；退休后社保累计领取持续增加；个人投资余额不会小于零；所有临界点位于扫描区间 0%–20% 或明确标记为区间外。

- [ ] **Step 3: 保存计算输出用于写作**

运行：`node /tmp/pension-threshold-analysis.mjs`

预期：输出 JSON，包含 `thresholdsByDeathAge`、`defaultReturnLongevityCrossover`、`defaultReturnExhaustionAge` 和 `assumptions`。

### Task 2: 更新 README 结论

**Files:**
- Modify: `README.md`
- Modify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: Task 1 输出的临界点和官方制度口径。
- Produces: README 顶部的模型结论、二维临界表、解读、限制和官方来源链接。

- [ ] **Step 1: 写失败测试**

在 `tests/retirement-page.test.mjs` 中读取 `README.md`，断言它包含“家庭累计价值”“临界回报率”“寿命”“税务”和“仅是固定收益情景”五项说明。

- [ ] **Step 2: 验证测试失败**

运行：`node --test tests/retirement-page.test.mjs`

预期：README 内容断言失败。

- [ ] **Step 3: 写入分析结论**

在项目简介之后、本地使用说明之前加入结论；明确默认参数、比较公式、临界表、短寿/长寿/高回报解读、税务与未纳入项，并链接官方缴费与继承依据。

- [ ] **Step 4: 完整验证**

运行：

```bash
node --test tests/retirement-page.test.mjs
git diff --check
git status --short
```

预期：全部测试通过、无空白错误，产品文件变更仅包含 `README.md` 和 README 回归测试。

- [ ] **Step 5: 提交并推送**

```bash
git add README.md tests/retirement-page.test.mjs docs/superpowers/plans/2026-07-18-readme-longevity-return-thresholds.md
git commit -m "Document pension longevity and return thresholds"
git push
```
