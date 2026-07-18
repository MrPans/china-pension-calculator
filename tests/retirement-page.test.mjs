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
