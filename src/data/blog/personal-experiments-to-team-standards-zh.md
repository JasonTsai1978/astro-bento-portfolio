---
title: "從個人實驗到團隊規範：我怎麼把 AI 的使用心得寫成規則"
description: "個人實驗要變成團隊規範，關鍵是把踩過的坑寫成 AI 讀得懂、可以版控的規則，再用實驗驗證規則值不值得留。以我自己的 Claude Code 設定當例子。"
pubDate: 2026-10-18
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

`CLAUDE.md` 是 Claude Code 每次開工都會讀的規則檔。我的規則幾乎都是被坑過才補上的。例如 AI 很容易把「應該會過」說成「已經過了」，所以我加了一條：沒實際跑過，就不能說通過。

這就是上一篇說的「能寫成規則的才帶給團隊」。規則檔跟程式碼放在一起、一起進版控，新同仁拿到專案，AI 就照同一套規則做事。

## 3. 常用的 prompt，做成 skill

規則檔管的是「這個專案怎麼做事」。另一類是「這種工作怎麼做」，跨專案都用得到。這類我做成 skill，等於把常用的 prompt 存成一份固定的做法，claude.ai 和 Claude Code 都能用。

最常用的是英文商務信。工作上幾乎每天都要寫大量英文信，收件人有英文母語的同事，也有一般的台灣同事。同一封信用同一種寫法，不是對母語者太生硬，就是對台灣同事太難讀。所以我請 AI 幫我做了一個 skill，每次固定產出兩版：給母語者的道地版，和給台灣同事、語氣和詞彙都淺一點的版本。

其他還有中文商務信、流程圖、筆記格式，以及下面會提到的交叉審查。連「這件事值不值得做成 skill」本身也是一個 skill。

我的判斷標準是：同一種工作一直出現、每次都要重講背景、或品質忽好忽壞，才值得做。不是每個 prompt 都要變成 skill。

對團隊來說，skill 就是可以分享的 prompt。好用的做法不再只躺在某個人的對話紀錄裡。

## 4. 審查分級，複雜的交給多個 agent 確認

不是每個改動都值得同樣的審查成本。我的做法參考了官方建議的 code review 流程，也參考了一些網路上專家的建議：一般改動，讓 AI 先簡化程式、再找 bug，最後自己看過才 commit；複雜的專案或程式碼，例如碰到 SQL、交易，就多派幾個 agent 各自審查，再交叉確認結果；部落格這種改文字的就不用。

分級的條件要能直接判斷。「重要的改動要多審」沒辦法執行，「有碰到 SQL 交易」就可以。

至於要派哪幾個模型，我也不想憑感覺決定，所以做了個小實驗：在程式裡刻意埋 bug，看各模型抓到幾個。結果兩個大模型搭配最好，彼此有互補；小模型漏抓時還很有把握地說沒問題，不適合當審查員。樣本很小，只能當參考，但比「感覺 A 比較強」有依據，之後也能重跑。

團隊也可以這樣做：與其爭論哪個工具比較好，不如準備一組已知答案的題目，讓大家用自己的工具各跑一次。

## 5. 擴大到團隊前的 checklist

從個人到團隊，我建議至少確認這幾件事：

- [ ] 工具已經核准，資料政策看過（上一篇第 2 點）
- [ ] 有一份共用的規則檔放在 repo 裡，不是每個人各自的提示詞
- [ ] 常用的 prompt 整理成共用的 skill，不只存在個人的對話紀錄裡
- [ ] 審查分級的條件寫清楚了，而且能直接判斷
- [ ] 規則有負責人，誰可以改、怎麼提修改都講好
- [ ] 有固定的檢討時間，規則沒用就拿掉

最後一點最容易被忽略。規則只增不減，最後就沒人看了。我的審查組合也是做完實驗才決定拿掉哪些模型；之後模型換代，這組實驗會再跑一次。

## 最後

個人實驗跟團隊規範之間，差的是把經驗寫下來。寫成 AI 讀得懂的規則檔，放進版控，再用實驗確認它真的有用。這樣交給團隊的，就不只是「我覺得好用」，而是一套別人可以照著做、也可以質疑的做法。

這套設定也還沒定型。官方有新文章我會去看，看不太懂的就請 AI 幫忙解釋，再判斷我正在用的設定要不要跟著改。

下一篇換個角度，寫給工程師：從網頁問答到 agent，AI 可以怎麼用在日常開發。

## 附錄：官方文件

有興趣的人可以從這幾份開始（都是英文）：

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
