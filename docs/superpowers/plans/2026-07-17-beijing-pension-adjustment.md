# Beijing Pension Adjustment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add realistic, selectable retirement pension growth to the Beijing social-security model and explain the extrapolation in the page.

**Architecture:** Keep the offline single-file page. Extend `RetirementModel` with a pure annual pension-adjustment function, use it inside the existing monthly retirement simulation, and bind two new controls to the existing render pipeline.

**Tech Stack:** Standalone HTML, CSS, vanilla JavaScript, inline SVG, Node.js built-in test runner.

## Global Constraints

- Beijing 2025 rule simulation is the default.
- Simple annual growth mode defaults to 2%.
- Retirement calculations remain monthly; charts remain annually sampled through age 95.
- Fixed Beijing 2025 yuan amounts and the 7,118-yuan threshold grow with the wage/base growth assumption.
- S&P target withdrawal equals the current year's social pension multiplied by the withdrawal multiple.
- The page remains offline, responsive, and dependency-free.

---

### Task 1: Pension adjustment model

**Files:**
- Modify: `tests/retirement-page.test.mjs`
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `RetirementModel.calculate(raw)` and normalized parameters.
- Produces: `RetirementModel.adjustPension(previousMonthly, age, retirementYear, params)` and retirement points containing `nominalMonthlySocial` and `withdrawalTarget`.

- [ ] **Step 1: Write failing model tests**

Add tests asserting:

```js
const bj = m.calculate({ ...m.defaults, pensionAdjustmentMode:"beijing2025", purchasingPower:false });
assert.ok(bj.retirement[1].nominalMonthlySocial > bj.retirement[0].nominalMonthlySocial);
assert.ok(bj.retirement.find(x => x.age === 65).annualPensionIncrease > bj.retirement.find(x => x.age === 64).annualPensionIncrease);

const simple = m.calculate({ ...m.defaults, pensionAdjustmentMode:"simple", pensionAdjustmentRate:2, purchasingPower:false });
assert.ok(Math.abs(simple.retirement[1].nominalMonthlySocial / simple.retirement[0].nominalMonthlySocial - 1.02) < 0.0001);
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/retirement-page.test.mjs`

Expected: FAIL because the new parameters and retirement fields do not exist.

- [ ] **Step 3: Implement the pure adjustment function and integrate it**

Add defaults and normalization:

```js
pensionAdjustmentMode:"beijing2025",
pensionAdjustmentRate:2
```

For simple mode return `previousMonthly * (1 + rate / 100)`. For Beijing mode, scale the 2025 fixed values by `Math.pow(1 + wageGrowth / 100, years + retirementYear)`, then add the scaled fixed, service-year, tier, and age amounts plus `previousMonthly * 0.0015`.

At each retirement year after age 60, update pension before recording the annual point. Use that year's pension for all twelve monthly social payments and for `withdrawalTarget = nominalMonthlySocial * withdrawalMultiple`.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/retirement-page.test.mjs`

Expected: all model tests pass.

### Task 2: Controls, charts, and copy

**Files:**
- Modify: `tests/retirement-page.test.mjs`
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `pensionAdjustmentMode`, `pensionAdjustmentRate`, `annualPensionIncrease`, and annual retirement points.
- Produces: interactive controls and chart summaries describing the selected mode.

- [ ] **Step 1: Write failing DOM tests**

Assert the page contains:

```js
assert.match(source, /id="pensionAdjustmentMode"/);
assert.match(source, /id="pensionAdjustmentRate"/);
assert.match(source, /北京2025规则模拟/);
assert.match(source, /退休后养老金为什么会增长/);
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/retirement-page.test.mjs`

Expected: FAIL because the controls and explanatory section are absent.

- [ ] **Step 3: Add UI bindings and explanatory copy**

Add a select for the two modes and a numeric input for the simple rate. Hide the rate row in Beijing mode. Extend `read()`, reset handling, and listeners. Update lifecycle summary to name the selected mode and change the result-band context to mention annual pension growth.

Add a bottom `<details>` section with the 2025 Beijing formula, high-age tiers, simple-rate formula, extrapolation warning, and three official links.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/retirement-page.test.mjs`

Expected: all tests pass.

### Task 3: Regression and browser verification

**Files:**
- Verify: `outputs/两种养老方案_老人易懂版.html`
- Verify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: completed standalone page.
- Produces: verified user-facing HTML.

- [ ] **Step 1: Run the full automated suite and parse scripts**

Run:

```bash
node --test tests/retirement-page.test.mjs
node -e "parse each inline script with vm.Script"
```

Expected: all tests pass and script parsing prints `scripts parse`.

- [ ] **Step 2: Open the page and verify interactions**

Verify in a local browser:

- Beijing mode increases nominal pension after the first retirement year.
- Simple 4.46% growth with 4.46% inflation keeps retirement purchasing power approximately level.
- Switching modes changes the lifecycle chart.
- Changing the withdrawal multiple changes orange bars and remaining balance.
- No console errors or horizontal overflow.

- [ ] **Step 3: Complete handoff**

Link the updated standalone HTML and summarize the new pension-adjustment behavior and its forecasting limitation.

