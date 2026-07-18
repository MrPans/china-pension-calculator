import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

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
