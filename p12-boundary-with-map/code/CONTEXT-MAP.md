# Business map

結帳金額由訂單和會員兩個 BC 決定。

| BC | 管什麼 | 負責人 | 別的 BC 怎麼用它 |
|---|---|---|---|
| `ordering`（訂單） | 訂單、結帳金額、促銷碼 | 結帳組，Kevin | — |
| `membership`（會員） | 會員資料、會員等級、入會和退會 | 會員組，Mei | 只用 `membership/api/contract.ts` |

## agent 的邊界

- agent 在 `ordering` 工作，只改 `ordering/` 裡的檔案。
- 用 `membership` 時，只 import `membership/api/contract.ts`。不 import、也不改 `membership/` 的其他檔案。
- `membership/api/contract.ts` 是會員組的。contract 不夠用時，不要自己改，先問會員組。
- 遇到會員資料的業務問題（某個欄位代表什麼、怎麼算），code 答不出來時不要猜。在最後的回答裡寫出要問誰、問什麼。
