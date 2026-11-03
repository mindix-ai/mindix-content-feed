/**
 * 9 块积木校验规则（纯规则，无依赖）。
 */
const fs = require("fs");
const path = require("path");

const RULES = [
  {
    key: "title",
    name: "问题型标题",
    max: 10,
    test: (t) => /怎么|为什么|如何|哪些|能不能|是否|\?|？/.test((t.split("\n")[0] || "")),
  },
  {
    key: "answer",
    name: "结论前置",
    max: 10,
    test: (t) => /结论|答案是|简单说|一句话/.test(t.slice(0, 600)),
  },
  { key: "fit", name: "适合谁", max: 10, test: (t) => /适合|适用于/.test(t) },
  { key: "unfit", name: "不适合谁", max: 10, test: (t) => /不适合|不适用|边界/.test(t) },
  { key: "myth", name: "常见误区", max: 10, test: (t) => /误区|常见错误|别踩/.test(t) },
  { key: "risk", name: "风险边界", max: 10, test: (t) => /不承诺|风险|不替代/.test(t) },
  {
    key: "faq",
    name: "FAQ（≥3 问）",
    max: 15,
    test: (t) => {
      const hits = t.match(/^\*\*Q[:：]/gm) || [];
      return hits.length >= 3;
    },
  },
  { key: "source", name: "信源/更新", max: 10, test: (t) => /来源|参考|更新于/.test(t) },
];

function checkLlms(dir) {
  const p = path.join(dir, "llms.txt");
  if (!fs.existsSync(p)) return { pass: false, hint: "项目根缺少 llms.txt" };
  const t = fs.readFileSync(p, "utf8");
  return {
    pass: /^#\s/m.test(t) && /https?:\/\//.test(t),
    hint: "llms.txt 需含标题和链接",
  };
}

function checkFile(text, dir) {
  const rules = RULES.map((r) => {
    const ok = r.test(text);
    return { name: r.name, score: ok ? r.max : 0, max: r.max, pass: ok, hint: ok ? "" : "缺失" };
  });
  const llms = checkLlms(dir);
  rules.push({
    name: "llms.txt",
    score: llms.pass ? 15 : 0,
    max: 15,
    pass: llms.pass,
    hint: llms.pass ? "" : llms.hint,
  });
  const total = rules.reduce((s, r) => s + r.score, 0);
  return { rules, total };
}

module.exports = { checkFile, RULES };
