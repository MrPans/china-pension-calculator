# Retirement Exhaustion Summary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the retirement calculator defaults and replace the duplicated income-difference banner with a dynamic personal-investment depletion result and concise comparison.

**Architecture:** Extend the existing standalone model in `model-core` to record the first monthly depletion point through age 95. Keep presentation in the existing `update()` function, using the model result to select depleted or remaining-balance copy.

**Tech Stack:** Standalone HTML, CSS, vanilla JavaScript, inline SVG, Node.js built-in test runner.

## Global Constraints

- “折算为当前购买力” defaults off.
- “退休后继续个人投资” defaults on.
- The model stops at age 95 and never extrapolates beyond it.
- The black result band must not repeat the difference between the two monthly income figures.
- All calculations and charts remain offline and parameter-driven.

---

### Task 1: Defaults and page copy

**Files:**
- Modify: `tests/retirement-page.test.mjs`
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `RetirementModel.defaults`
- Produces: new default booleans and new static title/subtitle/banner markup

- [ ] Add tests asserting `purchasingPower === false`, `continueInvesting === true`, the new title/subtitle, and absence of the old difference copy.
- [ ] Run the focused tests and confirm they fail for the old defaults and copy.
- [ ] Change the HTML control states, model defaults, title, subtitle, and result-band markup.
- [ ] Run the focused tests and confirm they pass.

### Task 2: Monthly depletion result

**Files:**
- Modify: `tests/retirement-page.test.mjs`
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `calculate(raw)` parameters and existing monthly retirement loop
- Produces: `fundExhaustionMonths: number | null`, measured from retirement; `null` means the account still has money at age 95

- [ ] Add tests for an early-depletion scenario and a remaining-at-95 scenario.
- [ ] Run those tests and confirm the property is missing or incorrect.
- [ ] Record the first month where the raw investment balance reaches zero, without simulating beyond age 95.
- [ ] Verify that disabling retirement investing produces an equal or earlier depletion point than enabling it for the same scenario.
- [ ] Run the focused tests and confirm they pass.

### Task 3: Dynamic result band and full verification

**Files:**
- Modify: `tests/retirement-page.test.mjs`
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `fundExhaustionMonths`, `remainingAt95`, current purchasing-power mode
- Produces: `exhaustionHeadline` and `exhaustionSummary` text updated by `update()`

- [ ] Add markup tests for dedicated exhaustion headline and summary elements.
- [ ] Implement “预计在X岁Y个月耗尽” for depletion and “到95岁仍有余额约X” otherwise.
- [ ] Add one or two short comparison sentences covering lifetime social-security income, investment flexibility, inheritance, market risk, and depletion risk.
- [ ] Run `node --test tests/retirement-page.test.mjs` and require zero failures.
- [ ] Compile both inline scripts with `vm.Script` and require zero syntax errors.

This directory is not a Git repository, so commit steps do not apply.

