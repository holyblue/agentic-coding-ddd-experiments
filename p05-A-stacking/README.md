# 第 4–7、17 頁：實作 A（依序套用，折扣疊加）

條件：repo 裡沒有「不可疊加」的規則。

| 頁 | 看哪裡 |
|---|---|
| 5 | `code/ordering/domain/order.ts` 的 `total()` |
| 6 | `npm test`：1 個檔案、7 項通過 |
| 7 | VIP 2,000 分 + AUTUMN15：2000 → 1800 → 1530 |
| 17、21 | `code/ordering/domain/order.test.ts` 的 `stacks with the VIP discount`（`toBe(765)`） |

隱藏測試：7/9。不疊加的 2 項失敗。
