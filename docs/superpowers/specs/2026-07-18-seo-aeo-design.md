# SEO 与 AEO 优化设计

## 目标

让中国职工养老保险与个人投资养老计算器更容易被搜索引擎抓取、正确归一到正式地址，并让搜索引擎及 AI Agent 能从页面的可见正文和机器可读数据中准确理解其用途、结论、边界与常见问题。

正式页面地址统一为：

`https://www.shengpan.net/china-pension-calculator/`

本项目不承诺排名、收录、富媒体结果或 AI 知识库引用，只提供符合公开规范的抓取、语义与内容基础。

## 方案选择

采用完整静态 SEO/AEO 套件：页面元数据与结构化数据、可见的核心结论和 FAQ、站点级抓取文件。相比仅修改 `<head>`，此方案能为人类、传统搜索引擎和 AI Agent 提供一致且可引用的正文；相比只增加正文，它同时解决 canonical 与 URL 发现问题。

## 页面元数据

在 `index.html` 中增加或调整：

- 中文、描述性且不过度堆砌关键词的 `<title>` 和 meta description。
- 指向正式地址的自引用 canonical。
- `robots` 允许索引、跟随链接，并允许搜索引擎自行选择摘要长度与大图预览。
- Open Graph 与 Twitter Card 的标题、摘要、类型、语言和 URL。
- 不添加不存在的社交分享图片，也不添加无实际价值的关键词 meta 标签。
- 不添加 `hreflang`，因为目前只有一个简体中文版本。

canonical、站点地图和结构化数据中的 URL 必须完全一致，均使用带末尾斜杠的正式地址。

## 可见正文

在主要测算内容之后、页脚之前增加一个语义明确的说明区，包含：

### 核心结论

- 社保包含单位缴费形成的统筹待遇、个人账户养老金和通常持续终身的发放，寿命越长，其累计领取优势通常越明显。
- 寿命较短时，可继承的个人投资余额可能更有价值。
- 个人投资回报越高且退休后继续投资，账户越不容易耗尽；足够高的长期回报可能使个人投资在模型期内始终领先。
- 临界点不是固定常数，会随着寿命、工资与缴费基数增长、养老金调整、投资回报、提款倍数和是否继续投资而变化。
- 税务、政策变化、市场波动和个体健康差异未被完整纳入，结果只用于情景比较，不构成投资建议。

### 常见问题

使用原生 `<details>` / `<summary>` 展示六个简明问题：

1. 这个计算器比较的是什么？
2. 临界回报率是什么意思？
3. 为什么寿命越长，社保通常越有优势？
4. 寿命较短时，为什么个人投资可能更有优势？
5. 个人投资账户一定会耗尽吗？
6. 计算是否考虑税务，结果能否直接作为决策依据？

答案必须与页面模型和 README 的分析一致，不把模型情景写成确定事实。正文默认存在于 HTML 中，不依赖 JavaScript 请求或渲染。

## 结构化数据

使用一个 JSON-LD `@graph` 描述：

- `WebPage`：名称、描述、URL、语言、主要实体和 FAQ 关系。
- `WebApplication`：免费、浏览器运行、金融/养老测算类别、功能列表、适用国家和语言。
- `FAQPage`：其问答必须逐字对应页面中用户可见的 FAQ，避免隐藏或误导性的标记。

采用 JSON-LD 是因为 Google 官方建议在可行时使用该格式，Schema.org 也定义了 `WebApplication` 和 `FAQPage`。FAQ 标记用于语义一致性，不宣称本网站能获得 FAQ 富媒体结果；Google 当前通常只向权威政府和健康网站展示该类富媒体结果。

不使用 `Product`、评分、评论、作者资质或其他页面无法证明的属性。

## 站点级文件

新增：

- `robots.txt`：允许通用爬虫访问，并声明正式 sitemap 地址。
- `sitemap.xml`：只列出正式 canonical 页面，使用绝对 URL，不伪造更新频率或优先级。
- `llms.txt`：用简短 Markdown 介绍页面用途、正式地址、模型覆盖范围、核心限制和主要内容入口。该文件仅作为辅助 AI Agent 理解站点的约定，不把它描述为搜索引擎标准或排名信号。

本次不接入 IndexNow：单页静态站点上线后更新频率低，且在没有自动提交或密钥管理流程时收益有限。发布后可在 Google Search Console 与 Bing Webmaster Tools 手动提交 sitemap。

## 样式与无障碍

新内容沿用现有白色卡片、蓝色强调和圆角体系。核心结论采用短段落或列表，FAQ 使用键盘可访问的原生交互元素。移动端不得产生横向溢出；打印样式保持内容可读。

## 测试与验收

自动化测试验证：

- title、description、canonical、robots、Open Graph 和 Twitter 字段存在且值正确。
- JSON-LD 可被解析，类型与正式 URL 正确。
- FAQ JSON-LD 的问题和答案与可见正文一致。
- `robots.txt` 指向正确 sitemap。
- `sitemap.xml` 是有效 XML，只包含正式 canonical。
- `llms.txt` 包含正式 URL、用途与限制。
- 所有正式 URL 均使用 HTTPS、`www.shengpan.net` 和 `/china-pension-calculator/` 路径。

视觉验收覆盖桌面宽度和 320px 移动宽度，检查新增区块布局、FAQ 操作、横向溢出与控制台错误。发布后的抓取状态与富媒体资格需在真实域名上线后通过 Search Console、URL Inspection 和 Rich Results Test 复核。

## 官方规范依据

- Google Search Central：canonical、robots meta、站点地图、结构化数据总则及 FAQ 展示限制。
- Schema.org：`WebApplication` 与 `FAQPage` 类型定义。
- IndexNow 官方协议：评估后本次不接入即时提交机制。
