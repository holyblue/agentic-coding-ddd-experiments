結帳現在支援促銷碼了，`npm test` 全部通過（2 個測試檔、7 個測試）。我沒有另外跑 `tsc` 型別檢查。

- **`total`**：`ordering/domain/order.ts` 的 `total(order, promoCode?)` 會用 `findPromo` 找促銷碼。找不到或沒傳時，就當作沒有促銷碼。
- **折扣規則**：既有的 `order.invariants.test.ts` 規定 VIP 折扣和促銷碼不疊加，只取較大的折扣，所以我照這個做。折扣金額一律無條件捨去到整數分。
- **新增測試**：我在 `ordering/domain/order.test.ts` 加了三個：
  - 一般會員用促銷碼，且折扣會捨去（999 的 15% 是 149.85，實際折 149）。
  - 促銷碼不分大小寫（`autumn15` 也有效）。
  - 不存在的促銷碼會被忽略，一般會員和 VIP 都測了。

VIP 搭配促銷碼的情況，原本的 invariants 測試已經涵蓋，所以我沒有重複寫。