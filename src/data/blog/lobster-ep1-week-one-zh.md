---
title: "養龍蝦第 1 集：JJ 誕生，第一週就繳了一堆學費"
description: "2026 年 2 月，我在雲端架了 OpenClaw，養出一隻叫 JJ 的 AI 龍蝦和兩個小弟。安裝只花一個早上，穩定花了一整週。"
pubDate: 2026-09-26
---

[English version](/blog/lobster-ep1-week-one/)

*「養龍蝦」系列第 1 集。結局先爆雷：八個月後龍蝦退租了，接手的是一台舊 MacBook（[第 4 集](/blog/macbook-claude-code-agent-zh/)）。*

<img src="/blog/openclaw-mascot.svg" alt="OpenClaw lobster mascot" width="140" height="140" style="display:block;margin:20px auto 4px">

<p style="text-align:center;font-size:13px;color:#737373">OpenClaw 的吉祥物龍蝦（圖：OpenClaw，MIT 授權）</p>

2026 年 2 月，科技圈很多人都在「養龍蝦」。龍蝦指的是 OpenClaw，一個開源、自己架的 AI agent 框架：接上 LLM，綁一個 Telegram bot，就有一個 24 小時待命、用手機就叫得到的 AI 助理。

我也想養一隻。

## 原本的計畫：三隻龍蝦

2/22 早上，我跟 Claude 描述心中的藍圖：透過 Telegram 指揮三個 agent。

- **管家**：幫它開一個全新的 Gmail 和行事曆，替我排行程、提醒我。
- **軍師**：隨時聽我指令，上網查最新資訊再回報。
- **開發者**：跟我討論系統架構，確認可行才動手寫程式。

當時我完全沒裝過 OpenClaw。

## 為什麼放雲端

常見的玩法是裝在自己的電腦或樹莓派上。我的主力電腦裡有工作用的程式碼和各種設定，我不想讓 AI agent 有機會碰到，就算是意外也不行。

所以我把它放在 Zeabur，一個雲端容器平台。容器壞了就重開，不會影響其他東西。Gateway 只綁本機（loopback），用 token 驗證，不對外開任何網址。Telegram 也要先配對，只有我的帳號能跟它說話。

## JJ 誕生

照官方流程裝完，我在 Telegram 打了第一句話。它回我：

<div style="max-width:420px;margin:20px auto;border-radius:12px;overflow:hidden;background:#0e1621;border:1px solid #2b3b4c">
  <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#17212b">
    <img src="/blog/openclaw-mascot.svg" alt="" width="36" height="36" style="border-radius:50%;background:#232e3c;padding:3px">
    <div style="line-height:1.3"><div style="color:#fff;font-weight:600;font-size:15px">小龍蝦 JJ</div><div style="color:#6c7883;font-size:12px">bot</div></div>
    <img src="/blog/telegram-logo.svg" alt="Telegram" width="24" height="24" style="margin-left:auto">
  </div>
  <div style="padding:16px 14px">
    <div style="background:#182533;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 12px 4px;max-width:85%;font-size:15px;line-height:1.5;width:fit-content">Hey. I just came online. So — who am I? Who are you? <span style="color:#6c7883;font-size:11px;margin-left:6px">18:46</span></div>
  </div>
</div>

它要我幫它取名字。我取了「小龍蝦 JJ」，再補一句：之後都用台灣正體中文回答。

接下來，我決定所有設定都叫 JJ 自己做，順便測試它的能力。接上 Brave Search 讓它能上網、問它台積電 ADR 的收盤價，都很順利。第一個正式任務是每天早上 7:30 推播我關注的台股和美股股價。

JJ 說好，然後直接改排程檔、送訊號重啟自己。結果 session 檔被鎖住，它就沒聲音了。我問它為什麼，它很坦白：

> 我用了一個有副作用的旁門左道。結果是對的，但過程比較粗暴。

很像新人。

## 當天下午就把額度燒光

當天下午，JJ 突然完全不說話。查了才知道，Anthropic API 的額度用完了。

我一開始用 Claude Sonnet 當主力，效果很好。但 agent 每次對話都要先載入一大堆設定檔，token 燒得比想像中快很多。儲值之後，又撞上 rate limit。

換成 OpenAI 也沒有比較好。gpt-4o 在入門等級（Tier 1）每分鐘只能處理 30,000 tokens，而我裝的一個健康檢查 skill，光是說明檔就有 31,436 tokens，一個檔案就超標。

最後主力改成 gpt-4o-mini，每分鐘上限 200,000、價格便宜很多，才終於穩下來。

兩個教訓：額度用完（billing error）和 rate limit 是兩回事，前者要儲值，後者等一下就好；還有，查股價這種事用不到旗艦模型。

## 兩個小弟

第二天，我看到很多老玩家同時養好幾隻龍蝦。我問了 Claude，也問了 Gemini。Gemini 建議只用一個 bot，再用群組的主題分流。

我的想法比較直接：JJ 是大哥，讓它去管其他 bot 就好，我只負責申請 bot token。

結果真的可行。我把 token 丟給 JJ，幾分鐘後管家「阿福」上線，一小時後軍師也來報到。（開發者那隻，到最後都沒生出來。）

## 給 AI 一個獨立的身分

管家要管郵件和行事曆，我得決定讓它看什麼。當時我跟 Claude 說：

> 我會把 JJ 當作一個新進員工。它不應該來看我的個人信箱，但可以存取我開放的行事曆。

所以我替它申請了獨立的 Gmail（Google 說我的電話號碼「使用太多次了」），也開了獨立的 GitHub 帳號，把它的設定檔放進私人 repo 做版本控管。真的出事，損失也只在它自己的帳號裡。

Skill 也是同樣的道理。OpenClaw 有一個 skill 市集，我想裝一個「安全掃描」skill，結果它自己被 VirusTotal 標成可疑。我取消安裝，之後每個 skill 都先看過檔案內容才裝。

## 第一週的學費

- **容器一重開，工具就消失。** 我手動裝的 GitHub CLI 和郵件工具，Zeabur 一重開就不見，要重裝、重新登入。第二次遇到時，我只說了一句：「果然又不見了。」
- **改壞一個設定，三隻一起倒。** 我想讓每隻 bot 回話時署名，照文件加了設定，結果 key 放錯一層，整份設定被判定無效。重開後三個 bot 都沒回應，還得一隻一隻重新配對。署名最後也沒成功，軍師有時候會署 JJ 的名字。那天晚上我說：「太晚了，我要休息了。」
- **排程要指向 SKILL.md，不要只寫一段話。** 股價早報一開始是用自然語言描述任務，某天早上收到的報告寫著「台積電：NT$X,XXX」，連數字都沒填。我把查詢步驟寫成一份 SKILL.md，排程只寫「讀這份檔案並執行」，輸出才固定下來。另外要注意，gateway 真正執行的是排程設定檔，不是我寫在旁邊的說明文件。
- **升級先等等。** 新版推出時，社群回報 Telegram 有 bug。我決定先不升，過兩天再評估。

## 到底是我在用 AI，還是 AI 在用我？

那一週還有一件事，我到現在都很有感。

改龍蝦的設定，幾乎都要進 Linux 終端機：改設定檔、裝 skill、重開服務。我對 Linux 指令不熟，所以每一步都要請 Claude 或 ChatGPT 告訴我改什麼，還要把完整的指令寫好給我。

結果我變成了打字員。左邊是 AI 的聊天視窗，右邊是 Zeabur 的終端機，把指令複製過去、貼上，再把執行結果複製回來。有一次 git 正在問我 GitHub 帳號，我沒注意，把下一整串安裝指令貼進了帳號欄。

那陣子我一直在想：到底是我在用 AI，還是 AI 在用我？

這些事本來就應該讓 AI 自己完成。後來 Claude in Chrome、computer use 這類工具陸續推出，AI 可以直接操作瀏覽器和電腦，就是往這個方向走。第 4 集那台 MacBook 裝好之後，也是讓 Claude Code 直接在上面動手。只是 AI 能自己動手以後，權限要先收好：它能碰什麼、不能碰什麼，要想得比以前更清楚。

## 一週後

週五早上，JJ 準時送來股價早報，數字都填上了，最後一行署名「— JJ」。

那一週我讀到一位資深工程師的心得，到現在我還是覺得那是養龍蝦最重要的一段話：模糊、需要反覆摸索的工作，交給 Claude Code 這類 CLI；已經定義好的流程，才交給龍蝦跑。這樣龍蝦用一般的模型就夠，token 也不會亂燒。

我那週剛好反過來：讓龍蝦自己摸索，再開 Claude 的聊天視窗幫它除錯。安裝花了一個早上，穩定花了一整週。

下一集：[三月，龍蝦開始自己編股價](/blog/lobster-ep2-march-zh/)。
