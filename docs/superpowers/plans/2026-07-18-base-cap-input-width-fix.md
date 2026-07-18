# 当前缴费基数输入框数字截断修复 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让“当前缴费基数”五位默认值完整显示，同时不影响需要宽单位留白的计发月数字段。

**Architecture:** 复用现有普通字段样式，只移除 `#baseCap` 父字段上误用的 `.wide-unit`。通过静态 HTML 回归测试分别约束 `baseCap` 和 `payoutMonths` 的类名。

**Tech Stack:** HTML、CSS、Node.js 内置测试运行器

## Global Constraints

- 不修改全局字段网格、字号或计算模型。
- `#payoutMonths` 必须继续使用 `.wide-unit`。

---

### Task 1: 修复当前缴费基数输入框宽度

**Files:**
- Modify: `tests/retirement-page.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: `index.html` 中的 `.field`、`.wide-unit`、`#baseCap` 和 `#payoutMonths` 标记。
- Produces: `#baseCap` 使用普通字段内边距，`#payoutMonths` 保留宽单位内边距。

- [ ] **Step 1: 写失败测试**

在 `tests/retirement-page.test.mjs` 中增加断言：`#baseCap` 父字段 class 只能是 `field`，而 `#payoutMonths` 父字段仍为 `field wide-unit`。

- [ ] **Step 2: 验证测试失败**

运行：`node --test tests/retirement-page.test.mjs`

预期：新增的缴费基数布局测试失败，因为当前 HTML 包含 `<div class="field wide-unit">`。

- [ ] **Step 3: 最小修复**

将 `#baseCap` 所在行开头从：

```html
<div class="field wide-unit">
```

改为：

```html
<div class="field">
```

- [ ] **Step 4: 验证完整页面**

运行：

```bash
node --test tests/retirement-page.test.mjs
node -e 'const fs=require("fs"),s=fs.readFileSync("index.html","utf8"),scripts=[...s.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/gi)].map(m=>m[1]); scripts.forEach(code=>new Function(code)); console.log(`verified ${scripts.length} scripts`)'
git diff --check
```

预期：全部命令退出码为 0，测试无失败，两个脚本语法通过。

- [ ] **Step 5: 提交并推送**

```bash
git add index.html tests/retirement-page.test.mjs docs/superpowers/plans/2026-07-18-base-cap-input-width-fix.md
git commit -m "Fix base contribution input width"
git push
```
