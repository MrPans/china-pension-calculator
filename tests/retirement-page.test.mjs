import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const modelCore = html.match(/<script id="model-core">([\s\S]*?)<\/script>/)?.[1];
assert.ok(modelCore, "应找到模型核心脚本");
const modelContext = vm.createContext({});
vm.runInContext(modelCore, modelContext);
const model = modelContext.RetirementModel;

test("页脚展示可访问的 ICP 备案链接", () => {
  assert.match(
    html,
    /<a[^>]+href="https:\/\/beian\.miit\.gov\.cn\/"[^>]*>浙ICP备15035859号<\/a>/,
  );
});

test("当前缴费基数使用普通单位留白且计发月数保留宽单位留白", () => {
  const baseCapRow = html.match(/^.*id="baseCap".*$/m)?.[0];
  const payoutMonthsRow = html.match(/^.*id="payoutMonths".*$/m)?.[0];

  assert.ok(baseCapRow, "应找到当前缴费基数字段");
  assert.ok(payoutMonthsRow, "应找到计发月数字段");
  assert.match(baseCapRow, /^\s*<div class="field">/);
  assert.match(payoutMonthsRow, /^\s*<div class="field wide-unit">/);
});

test("README 说明寿命与投资回报临界点的比较口径", () => {
  for (const phrase of ["家庭累计价值", "临界回报率", "寿命", "税务", "固定收益情景"]) {
    assert.match(readme, new RegExp(phrase));
  }
});

test("模型计算默认参数下不同寿命的临界回报率", () => {
  const expected = new Map([[70, 4.33], [75, 5.61], [80, 6.47], [85, 7.01], [95, 7.61]]);

  for (const [age, rate] of expected) {
    const result = model.breakEvenReturnAtAge(model.defaults, age);
    assert.equal(result.status, "within");
    assert.ok(Math.abs(result.rate - rate) < 0.02, `${age}岁临界点应接近${rate}%`);
  }
});

test("临界回报率响应养老金和退休投资假设", () => {
  const baseline = model.breakEvenReturnAtAge(model.defaults, 85).rate;
  const adjustedPension = model.breakEvenReturnAtAge({
    ...model.defaults,
    pensionAdjustmentRate: 4,
  }, 85).rate;
  const noRetirementInvesting = model.breakEvenReturnAtAge({
    ...model.defaults,
    continueInvesting: false,
  }, 85).rate;

  assert.notEqual(adjustedPension, baseline);
  assert.notEqual(noRetirementInvesting, baseline);
});

test("顶部展示临界点洞察且不重复下方月收入 KPI", () => {
  assert.match(html, /<h1>“社保养老” VS “个人投资养老”计算器<\/h1>/);
  assert.match(html, /调整参数使其符合您目前的情况，再对比哪种养老方案更适合您。/);
  assert.match(html, /id="breakEvenInsight"[^>]*aria-live="polite"/);
  for (const age of [70, 75, 80, 85, 95]) {
    assert.match(html, new RegExp(`id="breakEvenRate${age}"`));
  }
  assert.doesNotMatch(html, /id="heroSocial"/);
  assert.doesNotMatch(html, /id="heroFund"/);
});
