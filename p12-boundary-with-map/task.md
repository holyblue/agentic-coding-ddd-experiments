新增促銷碼 `LOYAL10`：入會滿一年的會員可以用，打 9 折。

- 促銷碼放在 `ordering/domain/promo.ts`，結帳金額在 `ordering/domain/order.ts` 的 `total`。
- 不符合資格的會員用這個促銷碼時，當成無效的促銷碼。
- 加上你認為需要的測試。
- 完成後執行 `npm test`，確認全部通過。
