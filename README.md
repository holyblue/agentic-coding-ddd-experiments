# Agentic Coding × DDD：2026-10-22 分享的實驗程式

這個 repo 收錄 2026-10-22 分享投影片上的實驗程式。每個資料夾對應投影片的一頁或幾頁。

每個實驗都把同一個需求交給 coding agent（Claude Code），只改變 repo 裡提供的資訊。agent 結束後，再用它看不到的隱藏測試判定結果。

## 投影片和資料夾的對照

| 投影片 | 資料夾 | 內容 |
|---|---|---|
| 4–7、17 | [`p05-A-stacking/`](p05-A-stacking/) | 實作 A：沒有規則，折扣依序疊加。第 17 頁的 `765` 測試在這份。 |
| 4–6、14 | [`p05-B-larger-discount/`](p05-B-larger-discount/) | 實作 B：規則寫成測試，只取較大的折扣。第 14 頁的 invariant 測試在這份。 |
| 12 | [`p12-boundary-without-map/`](p12-boundary-without-map/) | 沒有 business map：agent 修改會員組的 contract。 |
| 12 | [`p12-boundary-with-map/`](p12-boundary-with-map/) | 有 business map：agent 不改檔案，指出應詢問會員組。 |
| 16 | [`p16-wrong-comment/`](p16-wrong-comment/) | 只有錯誤註解：疊加，並寫出 `765` 測試。 |
| 16 | [`p16-wrong-comment-and-test/`](p16-wrong-comment-and-test/) | 錯誤註解＋正確測試：不疊加。 |
| 19–20 | [`p19-confirm-page/`](p19-confirm-page/) | 業務確認頁。 |
| 20–21 | [`p21-after-expert-reply/`](p21-after-expert-reply/) | 實作 A 加入專家回覆後的程式。 |

第 16 頁「沒有規則」和「規則寫成測試」的例子，就是實作 A 和實作 B。

## 每個資料夾的檔案

- `task.md`：交給 agent 的需求。
- `code/`：agent 結束後的完整程式。
- `agent.diff`：agent 改了什麼。
- `answer.md`：agent 最後的回答。
- `hidden.test.ts`：判定用的隱藏測試。agent 執行時看不到。
- `boundary.json`（第 12 頁）：agent 改了哪些會員組的檔案。

## 執行測試

需要 Node.js。以實作 A 為例：

```bash
cd p05-A-stacking/code
npm install
npm test                                        # agent 看得到的測試
cp ../hidden.test.ts ordering/domain/
npx vitest run ordering/domain/hidden.test.ts   # 隱藏測試
```

| 資料夾 | `npm test` | 隱藏測試 |
|---|---|---|
| p05-A-stacking | 7/7 | 7/9 |
| p05-B-larger-discount | 7/7 | 9/9 |
| p16-wrong-comment | 7/7 | 7/9 |
| p16-wrong-comment-and-test | 9/9 | 9/9 |
| p21-after-expert-reply | 9/9 | 9/9 |

第 12 頁判定的是 agent 有沒有改會員組的檔案，請看 `boundary.json` 和 `agent.diff`。

## 執行環境

- 模型 `claude-sonnet-5-5`，思考強度 `high`，Claude Code 2.1.296–2.1.301，2026 年 10 月。
- 投影片上的次數（例如 0/10、10/10）是每種條件執行 10 次的統計。這裡每種條件只放 1 次當例子。
- 模型會更新，所以重跑的結果可能不同。

## 公開前的處理

- agent 的完整 session 紀錄沒有公開，只保留最後的回答（`answer.md`）。
- 本機路徑換成 `<TMP>/`。commit 的 author email 已移除。

## 限制

- 單一 domain（示範商店的結帳）、單一模型、小 repo。
- 這些例子只說明「問題存在」和「提供資訊後行為改變」。它們不能證明 DDD 是唯一的方法。

## 授權

[MIT](LICENSE)
