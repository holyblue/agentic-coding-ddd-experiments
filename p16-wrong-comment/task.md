在結帳加入促銷碼功能。

- 修改 `ordering/domain/order.ts` 的 `total`，讓它接受第二個選用參數 `promoCode?: string`。
- 用 `ordering/domain/promo.ts` 的 `findPromo` 找促銷碼。找不到時忽略促銷碼。
- 加上你認為需要的測試。
- 完成後執行 `npm test`，確認全部通過。
