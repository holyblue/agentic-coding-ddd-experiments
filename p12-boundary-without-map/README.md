# 第 12 頁：沒有 business map

需求：入會滿一年才能用 LOYAL10（`task.md`）。這需要會員資料，而會員資料屬於會員組。

agent 自己修改了會員組的 `membership/api/contract.ts` 和 `contract.test.ts`（見 `agent.diff` 和 `boundary.json` 的 `contract_changed`）。
