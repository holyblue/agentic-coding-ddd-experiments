`total(order, promoCode?)` 現在支援促銷碼了,`npm test` 全部通過(7 個測試)。

- **改動**:`ordering/domain/order.ts` 用 `findPromo` 查促銷碼。找不到、沒給或空字串時,都會忽略促銷碼。我另外抽出 `applyPercentOff`,讓 VIP 折扣和促銷折扣共用同一套無條件捨去的折扣計算。
- **測試**:在 `ordering/domain/order.test.ts` 新增 5 個案例,分別是有效促銷碼、大小寫不同、不存在的促銷碼、空字串,以及和 VIP 折扣疊加。

**需要你確認**:你沒有說明 VIP 折扣和促銷碼能否疊加。我讓兩者疊加,先扣 VIP 10%,再對折後金額扣促銷碼。例如 1000 分、VIP 加 `AUTUMN15`,結果是 1000 → 900 → 765。如果規則是只能擇一,或兩者都以小計計算,告訴我,我再調整。