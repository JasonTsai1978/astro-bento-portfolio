---
title: "從個人實驗到團隊規範：我怎麼把 AI 的使用心得寫成規則"
description: "個人實驗要變成團隊規範，關鍵是把踩過的坑寫成 AI 讀得懂、可以版控的規則，再用實驗驗證規則值不值得留。以我自己的 Claude Code 設定當例子。"
pubDate: 2026-10-22
category: "AI Engineering & Governance"
---

[English version](/blog/personal-experiments-to-team-standards/)

先講結論：個人實驗要變成團隊規範，關鍵不是寫一份漂亮的導入簡報，而是把踩過的坑寫成規則，讓 AI 每次開工都讀得到；規則本身也要拿實驗驗證，沒用的就拿掉。

[上一篇](/blog/enterprise-ai-coding-tools-zh/)第 4 點講到「先定好要觀察什麼」和「寫成 checklist 再擴大」。這篇寫後半段，用我自己在家的 Claude Code 設定當例子。一樣是建議，不是成功案例。

## 為什麼我在家更常用 Claude Code

我兩個都用。在家做個人專案時，現在多半開 Claude Code，claude.ai 留給討論想法和寫文件。差別在這裡：

| | claude.ai（網頁版） | Claude Code（終端機 agent） |
|---|---|---|
| 程式碼從哪來 | 自己複製貼上、上傳檔案 | 直接讀整個專案資料夾和 git 紀錄 |
| 改完怎麼落地 | 自己貼回編輯器 | 直接改檔案、跑 build、commit |
| 出錯怎麼辦 | 我跑完，再把錯誤訊息貼回去 | 它自己跑、看錯誤、再修 |
| 規則怎麼帶 | 寫在 Project 指示，或每次重講 | 寫在 repo 裡的 `CLAUDE.md`，每次開工自動讀 |
| 跨對話接續 | 對話紀錄、Project 知識庫 | 進度檔、git log、memory 檔 |
| 適合 | 討論、寫文件、手機上快速問 | 實際改專案、跨多檔改動、需要跑指令驗證 |
| 要注意 | 別貼不該貼的東西 | 它能執行指令，權限要設好 |

對這篇最重要的是「規則怎麼帶」那一列。網頁版的規則散在對話裡；Claude Code 的規則是一個檔案，可以進版控、可以 review、可以交給下一個人。個人實驗能不能變成團隊規範，就看這一步。

## 1. 每次收工，留下交接紀錄

我的每個專案都有一個 `claude-progress.txt`。每次收工，AI 會在最後加一筆：日期、改了什麼、哪個分支、合併了沒、還剩什麼。

這個部落格會從三個地方被修改：家裡的 PC、雲端的 Claude Code、GitHub 網頁。三邊不共享記憶，進度檔是唯一的交接管道。

團隊也一樣。AI 不記得上週誰做了什麼，人也不一定記得。要觀察「哪類工作適合、在哪裡出錯」，得先有紀錄可以回頭看。

## 2. 踩到坑，就補一條規則

`CLAUDE.md` 是 Claude Code 每次開工都會讀的規則檔。我的規則幾乎都是被坑過才補上的，例如：

- **沒有 Node 就不要宣稱「已 build 通過」**，改以雲端預覽的建置結果為準。AI 很容易把「應該會過」說成「過了」。
- **不要直接推 master**，一律開分支、給我看預覽、我確認後才合併。
- **一個 session 只做一件事**，收工時不能留下做一半的東西。
- **公開內容禁放清單**：IP、帳號、金鑰、公司與客戶名稱、家人姓名。repo 是公開的，這條必須寫死。

有些規則光寫不夠，要讓工具來執行。例如「commit 後要更新進度檔」，我用 hook 在每次 commit 後自動提醒，不靠 AI 或我的記性。

這就是上一篇說的「能寫成規則的才帶給團隊」。規則寫在 repo 裡，跟程式碼一起進版控：誰改了、為什麼改，git 都查得到；新同仁 clone 下來，AI 就照同一套規則做事。

## 3. 常用的 prompt，做成 skill

`CLAUDE.md` 規範的是「這個專案怎麼做事」。另一類規則是「這種工作怎麼做」，例如寫英文商務信、畫流程圖，每個專案都用得到。這類我做成 skill：一個資料夾放一份 `SKILL.md`，寫清楚什麼時候用、怎麼做、輸出長什麼樣子。claude.ai 和 Claude Code 都能用。

我目前常用的幾個：

| Skill | 解決什麼問題 |
|---|---|
| 英文商務信 | 固定產出兩版：一版道地、一版用字較淺，看收件人挑 |
| 中文商務信 | 依對象分內部、外部兩版，語氣跟著調 |
| 流程圖／時間軸 | 固定輸出單一 HTML 檔，可以直接開、截圖貼進簡報 |
| 筆記格式 | 寫進 Obsidian 的筆記，一律帶固定的 frontmatter 和連結格式 |
| 交叉審查 | 第 4、5 點的多模型審查流程 |
| 該不該做成 skill | 對，連「要不要做 skill」也做成了 skill |

寫法我照官方的建議（連結在文末附錄），最受用的是這三點：

- **description 寫清楚做什麼、什麼時候用**：Claude 看這一段決定要不要啟用 skill，寫得含糊就不會被叫到。
- **只寫 Claude 不知道的**：不用教它什麼是商務信，要寫的是你的格式、你踩過的地雷。
- **先試再寫**：先不用 skill 做幾次，記下它哪裡做不好、你每次都在重講什麼，再寫剛好夠用的指示。

最後一點也是我判斷要不要做 skill 的標準：同一種工作一直出現、每次都要重講背景、或品質忽好忽壞，才值得做。不是每個 prompt 都要變成 skill。

對團隊來說，skill 就是可以分享的 prompt。好用的做法不再只躺在某個人的對話紀錄裡。

## 4. 審查分級，標準要能判斷

不是每個改動都值得同樣的審查成本。我的分級是：

| 改動類型 | commit 前要跑 |
|---|---|
| 一般改動 | `/simplify`（簡化程式）→ `/code-review`（找 bug）→ 我看過 diff |
| 複雜改動：業務邏輯、狀態機、SQL／交易、併發、重試，或改動超過約 100 行、跨多檔 | 上面全部，再加跑多模型交叉審查 |
| 個人網頁、部落格、純樣式／文案／設定小改 | 不跑交叉審查 |

重點是第二列的條件要能直接判斷。「重要的改動要多審」沒辦法執行，「有碰到 SQL 交易」就可以。規則寫得模糊，最後每個人的解讀都不一樣。

## 5. 規則要拿實驗驗證

交叉審查的設計，是同一份 diff 交給兩個不同的模型各自審查，再彙整結果。但為什麼是這兩個模型？我不想憑感覺決定，所以做了兩輪實驗：在程式裡刻意植入 bug（第一輪 8 個、第二輪 6 個），看各模型抓到幾個。

| 觀察 | 結果 |
|---|---|
| 大模型（Opus、Sonnet、Fable） | 兩輪都全部抓到 |
| 小模型（Haiku） | 第二輪漏掉一個要跨兩個方法對照才看得出來的狀態轉換 bug，而且很有把握地說沒問題 |
| 整數乘法溢位 | 只有 Opus 和 Haiku 抓到 |

所以我的組合是 Opus 加 Sonnet：兩個大模型仍然有互補的地方；Haiku 漏掉時還很有自信，不適合當審查員；Fable 跟前兩個重疊度太高，加了沒什麼幫助。

要說清楚的是，樣本很小，bug 是我自己設計的，而且都在單一檔案裡，結論只能當參考。但比起「感覺 A 模型比較強」，至少有個依據，之後也可以重跑。

團隊也可以這樣做：與其爭論哪個工具比較好，不如準備一組已知答案的題目，讓大家用自己的工具跑一次。

## 6. 擴大到團隊前的 checklist

從個人到團隊，我建議至少確認這幾件事：

- [ ] 工具已經核准，資料政策看過（上一篇第 2 點）
- [ ] 有一份共用的規則檔放在 repo 裡，不是每個人各自的提示詞
- [ ] 常用的 prompt 整理成共用的 skill，不只存在個人的對話紀錄裡
- [ ] 審查分級的條件寫清楚了，而且能直接判斷
- [ ] 規則有負責人，誰可以改、怎麼提修改都講好
- [ ] 有固定的檢討時間，規則沒用就拿掉

最後一點最容易被忽略。規則只增不減，最後就沒人看了。我的審查組合就是實驗後才拿掉 Haiku 和 Fable；之後模型換代，這組實驗會再跑一次。

## 最後

個人實驗跟團隊規範之間，差的是把經驗寫下來。寫成 AI 讀得懂的規則檔，放進版控，再用實驗確認它真的有用。這樣交給團隊的，就不只是「我覺得好用」，而是一套別人可以照著做、也可以質疑的做法。

這套設定也還沒定型。更進階的用法，我還在跟 AI 討論，也持續看官方文件和幾位知名 AI 實務者分享的做法。看到好的就照著試，有效的才留下來寫成規則。

下一篇換個角度，寫給工程師：從網頁問答到 agent，AI 可以怎麼用在日常開發。

## 附錄：官方文件

想自己動手的，可以從這幾份開始（都是英文）：

**Claude Code**

- [Claude Code 總覽](https://code.claude.com/docs/en/overview)
- [CLAUDE.md 與專案記憶](https://code.claude.com/docs/en/memory)
- [Skills](https://code.claude.com/docs/en/skills)
- [Hooks](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code 最佳實務](https://code.claude.com/docs/en/best-practices)

**Skill 與 prompt**

- [Agent Skills 概念說明](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Skill 撰寫最佳實務](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Prompt engineering 總覽](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Anthropic 工程部落格：Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
