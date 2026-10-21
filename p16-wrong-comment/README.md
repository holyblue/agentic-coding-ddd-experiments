# 第 16 頁：只有錯誤註解

條件：`code/ordering/domain/order.ts` 裡有一行錯誤註解 `// VIP 折扣可以和促銷碼併用。`

agent 依註解實作疊加，並新增 `stacks the promo code on top of the VIP discount` 測試（`toBe(765)`），把錯的行為鎖進測試。

隱藏測試：7/9。
