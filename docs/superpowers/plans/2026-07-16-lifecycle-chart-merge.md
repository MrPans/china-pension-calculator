# 养老生命周期图合并 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将两个阶段图合并成共享年龄轴、上下独立量纲的生命周期图。

**Architecture:** 保持现有单文件页面与计算模型不变。用一个 `renderLifecycle` 函数生成上下两个SVG绘图区，并继续由现有 `update` 调用。

**Tech Stack:** HTML5、CSS3、原生JavaScript、SVG、Node.js test。

## Global Constraints

- 账户余额与月收入使用独立纵轴。
- 共享年龄横轴，退休年龄用贯穿标记连接两个阶段。
- 参数联动、离线使用和移动端适配保持不变。

---

### Task 1: 合并结构测试

**Files:**
- Modify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: 页面HTML。
- Produces: 生命周期图存在且旧图已移除的回归检查。

- [ ] 将三图断言改为两图断言，并检查 `renderLifecycle`。
- [ ] 运行测试，确认旧页面因缺少生命周期图而失败。

### Task 2: 生命周期图实现

**Files:**
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: `RetirementModel.calculate` 的积累序列与退休结果。
- Produces: `renderLifecycle(result)` 生成的上下分层SVG。

- [ ] 合并两张卡片的标题、图例、SVG和摘要。
- [ ] 用共享横轴绘制资产层、退休收入层和退休分界线。
- [ ] 删除 `renderGrowth`、`renderIncome`，改为调用 `renderLifecycle`。
- [ ] 运行测试并修正至全部通过。

### Task 3: 浏览器验收

**Files:**
- Verify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: 合并后的页面。
- Produces: 参数联动、手机布局和运行时错误检查证据。

- [ ] 调整标普回报率，验证生命周期资产路径变化。
- [ ] 检查上下层标签、退休分界线和移动端溢出。
- [ ] 运行最终测试。
