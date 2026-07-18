# 年轻用户养老方案互动测算器 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有静态老人版网页升级为年轻用户可调参数、实时重算并联动图表的养老方案模拟器。

**Architecture:** 保持单个离线 HTML 文件。纯计算模型放在独立内嵌脚本中，界面脚本读取表单、更新指标和生成原生 SVG 图表；Node 测试直接提取并执行纯模型。

**Tech Stack:** HTML5、CSS3、原生 JavaScript、SVG、Node.js 内置 test/vm。

## Global Constraints

- 离线可用，不引入外部脚本、字体或数据。
- 默认参数与既有模型口径一致。
- 320px 以上无横向溢出；输入有标签，图表有可访问说明。
- 不使用打字动画或夸张超大字号。

---

### Task 1: 互动与模型验收测试

**Files:**
- Modify: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: `outputs/两种养老方案_老人易懂版.html`
- Produces: 静态结构与纯计算模型的回归测试。

- [ ] 写入8项输入、3个SVG图表、模型脚本和默认结果测试。
- [ ] 运行测试，确认旧页面因缺少互动控件与模型而失败。

### Task 2: 互动测算器页面

**Files:**
- Modify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: 表单参数对象。
- Produces: `RetirementModel.calculate(params)`、实时指标、三张SVG图表。

- [ ] 替换为现代数据工作台布局与年轻化文案。
- [ ] 实现纯计算模型与输入边界处理。
- [ ] 实现三张响应式SVG图表、联动更新和默认值恢复。
- [ ] 运行 Node 测试直至全部通过。

### Task 3: 浏览器验收

**Files:**
- Verify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: 完成的独立网页。
- Produces: 桌面、手机、输入联动和重置验证证据。

- [ ] 打开页面，调整标普回报率并验证指标与图表路径变化。
- [ ] 恢复默认值，检查移动端溢出、控制台错误与外部资源。
- [ ] 运行最终 Node 测试。
