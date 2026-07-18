# 两种养老方案单页网页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 生成一份面向老年读者、可离线打开的中文养老方案对比单页。

**Architecture:** 一个自包含 HTML 文件承载语义结构、样式与少量渐进增强脚本。一个 Node 测试文件检查内容完整性、可访问性与离线约束。

**Tech Stack:** HTML5、CSS3、原生 JavaScript、Node.js 内置测试运行器。

## Global Constraints

- 所有核心数据采用用户给定口径，不从网络更新。
- 正文大字体、高对比、响应式、无外部依赖。
- 明确区分社保终身待遇与私人账户 139 个月提款。

---

### Task 1: 验收测试

**Files:**
- Create: `tests/retirement-page.test.mjs`
- Test: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: `outputs/两种养老方案_老人易懂版.html`
- Produces: 对页面结构、内容和离线性的自动验证。

- [ ] 编写测试，检查标题、关键金额、139 个月解释、终身提示、风险、折叠区、视口与无外链。
- [ ] 运行测试并确认因 HTML 尚不存在而失败。

### Task 2: 独立 HTML 页面

**Files:**
- Create: `outputs/两种养老方案_老人易懂版.html`
- Test: `tests/retirement-page.test.mjs`

**Interfaces:**
- Consumes: 设计文档中固定的数据口径。
- Produces: 可下载、可离线打开的单页网页。

- [ ] 实现语义化内容结构、卡片、钱包图示、时间轴、比较表和折叠计算说明。
- [ ] 实现大字体、高对比、响应式、打印和减少动态效果样式。
- [ ] 运行测试并修正至全部通过。

### Task 3: 打开与视觉检查

**Files:**
- Verify: `outputs/两种养老方案_老人易懂版.html`

**Interfaces:**
- Consumes: 已通过自动测试的 HTML。
- Produces: 对桌面、手机与交互状态的验证结论。

- [ ] 通过本地服务打开页面，检查桌面首屏、手机布局和折叠内容。
- [ ] 运行最终自动测试与 HTML 解析检查，确认无控制台错误和外部请求。
