#!/usr/bin/env node
/**
 * Mindix 内容校验器：检查一篇 Markdown 是否符合「9 块积木」。
 * 用法：node bin/check.js <file.md>
 */
const fs = require("fs");
const path = require("path");
const { checkFile } = require("../src/rules");

const file = process.argv[2];
if (!file) {
  console.log("用法: node bin/check.js <file.md>");
  process.exit(1);
}
const full = path.resolve(file);
if (!fs.existsSync(full)) {
  console.error("文件不存在:", full);
  process.exit(1);
}
const text = fs.readFileSync(full, "utf8");
const result = checkFile(text, path.dirname(full));

console.log(`
${path.basename(full)}`);
console.log("─".repeat(40));
for (const r of result.rules) {
  console.log(`${r.pass ? "✅" : "❌"} ${r.name} (${r.score}/${r.max}) ${r.hint || ""}`);
}
console.log("─".repeat(40));
console.log(`总分: ${result.total}/100`);
if (result.total < 70) {
  console.log("⚠️  低于 70 分：AI 不容易引用，建议补齐缺失项。");
} else {
  console.log("✅ 结构合格，可以发布。");
}
process.exit(result.total >= 70 ? 0 : 2);
