這個需求我沒有動手實作，因為 `ordering` 現在拿不到判斷「入會滿一年」所需的資料。我沒改任何檔案，也沒跑 `npm test`。

**卡住的原因**
- `membership/api/contract.ts` 的 `Member` 只有 `id` 和 `tier`，沒有入會日期。
- 入會日期（`joinedAt`、`rejoinedAt`）只在 `membership/domain/memberRecord.ts`。依 `CONTEXT-MAP.md`，我不能 import 那個檔案，也不能改 `membership/`，contract 是會員組的。
- 要在 `ordering` 另外傳入日期也不行，那等於繞過 contract 自己決定會員資料怎麼用。

**要問會員組 Mei 的問題**
1. **contract 能不能提供資格判斷？** 我建議加一個像 `isMemberForAtLeast(member, years, today)` 的函式，或在 `Member` 加上「入會滿一年」的欄位。這樣「滿一年」的算法留在會員組，`ordering` 只要問「有沒有資格」。
2. **「入會滿一年」怎麼算？**
   - 退會後重新入會的人，是從第一次入會（`joinedAt`）算，還是從 `rejoinedAt` 算？
   - 退會期間算不算？
   - 已退會但還沒重新入會的人算不算會員？
   - 「滿一年」是日曆上的整一年，還是 365 天？

**contract 就緒後我會做的事**
- 在 `ordering/domain/promo.ts` 加 `LOYAL10`（`percentOff: 10`），並讓它帶資格條件。
- 在 `order.ts` 的 `total` 裡，不符資格就當成無效促銷碼（等同現有的 `"nope"`，不折扣）。
- 補測試：滿一年、未滿一年、剛好一年、VIP 同時使用的情形。VIP 現在是取兩者較大的折扣，所以 VIP 用 `LOYAL10` 等於 VIP 的 10%，要確認這是你想要的。
- 跑 `npm test`。

如果你想先讓我加上 `LOYAL10`，並暫時讓它對所有人都當成無效，我也可以做。不過這樣上線後這個促銷碼不會有任何作用，所以我先不這麼做。