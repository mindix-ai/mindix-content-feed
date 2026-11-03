# Mindix Content Feed

> 让 AI 愿意引用你的内容：9 块积木模板 + 校验器。

- **Gitee（国内）**：https://gitee.com/mindix-ai/mindix-content-feed
- **GitHub（海外）**：https://github.com/mindix-ai/mindix-content-feed

## 30 秒看懂

AI 不是读全文，是找「能直接回答问题的片段」。
这个仓库给你：一套写作模板 + 一个校验器，检查你的内容是不是「AI 能读懂的结构」。

## 快速开始

```bash
node bin/check.js examples/saas-product/post.md
```

输出每一条规则的通过情况 + 总分（低于 70 分建议补齐）。

## 9 块积木

| # | 积木 | 一句话 |
|---|---|---|
| 1 | 问题型标题 | 用客户会问的话做标题 |
| 2 | 标准答案 | 开头 2–3 句直接回答 |
| 3 | 判断标准 | 什么情况适用 |
| 4 | 适合谁 | 明确目标读者 |
| 5 | 不适合谁 | 明确边界 |
| 6 | 常见误区 | 2–3 个常见错误 |
| 7 | 风险边界 | 不承诺什么 |
| 8 | FAQ | 3–5 个问答 |
| 9 | 信源 | 来源、更新时间 |

## 示例

- [软件产品示例](examples/saas-product/post.md)
- [服务型企业示例](examples/service-company/post.md)

## 想知道 AI 现在怎么理解你？

→ 免费诊断：https://mindix.asia/products/ （选「品牌 AI 认知诊断」）

## 许可

- 代码：AGPL-3.0
- 模板与文档：CC BY-NC-SA 4.0
- 示例：CC0
