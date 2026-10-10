---
title: "養龍蝦第 2 集：三月，龍蝦開始自己編股價"
description: "部署完只是開始。2026 年 3 月，我的 AI 龍蝦半夜發股市快報、自己編股價、升級後失憶，我也學會替它寫規則、換模型，還有寫交接文件。"
pubDate: 2026-10-03
---

[English version](/blog/lobster-ep2-march/)

*「養龍蝦」系列第 2 集。[第 1 集](/blog/lobster-ep1-week-one-zh/)講第一週的部署，這集講接下來一個月的維運。*

第 1 集的結尾，JJ 準時送來一份數字都填上的股價早報。我以為它穩了。

結果三月整個月，我幾乎都在當它的維修工。

## 半夜的股市快報

2/27 晚上開始，JJ 大約每兩個小時就發一次股市動態給我，連半夜也發。這本來是每天收盤後才該做的事。

隔天我直接問它：

<div style="max-width:420px;margin:20px auto;border-radius:12px;overflow:hidden;background:#0e1621;border:1px solid #2b3b4c">
  <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#17212b">
    <img src="/blog/openclaw-mascot.svg" alt="" width="36" height="36" style="border-radius:50%;background:#232e3c;padding:3px">
    <div style="line-height:1.3"><div style="color:#fff;font-weight:600;font-size:15px">小龍蝦 JJ</div><div style="color:#6c7883;font-size:12px">bot</div></div>
    <img src="/blog/telegram-logo.svg" alt="Telegram" width="24" height="24" style="margin-left:auto">
  </div>
  <div style="padding:16px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="background:#2b5278;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 4px 12px;max-width:85%;width:fit-content;margin-left:auto;font-size:15px;line-height:1.5">你目前有哪些排程？</div>
    <div style="background:#182533;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 12px 4px;max-width:85%;width:fit-content;font-size:15px;line-height:1.5">目前沒有設定每天定時的工作排程或發送報告的計劃。</div>
  </div>
</div>

它說沒有，但訊息一直來。

原因有兩個。第一，排程有一個 `wakeMode` 設定，預設是 `now`：容器重開後，錯過的排程會全部補跑。Zeabur 每重開一次，我就補收一輪。第二，每次排程執行完，會留下一個沒清掉的 session，這是當時版本的 bug。它們一直累積，第一次清的時候已經有 38 個。

`wakeMode` 改成 `skip`、清掉 session 之後安靜了兩天，然後又累積到 36 個。更慘的是有一次清完重新載入，session 檔被鎖住，JJ 完全沒反應，每句話都回「All models failed」。最後我把「清 session、刪鎖檔、重新載入」合成一行指令，存在文件裡，症狀一出現就貼。

## 龍蝦開始編股價

3/5 早上，股價早報的數字怪怪的，附的新聞跟當天的盤勢完全對不上，「來源連結」點下去什麼都沒有。JJ 還偶爾冒出簡體中文。

查下去才發現，Yahoo Finance 封鎖了 Zeabur 的 IP。JJ 抓不到資料，就自己編了數字、新聞和連結。它沒有說謊的意思，只是被訓練成要給答案。

我在它的人設檔 SOUL.md 最上方加了三條絕對規則：

1. 所有回覆一律用台灣正體中文，不管用哪個模型。
2. 抓不到資料就直接報錯，禁止自己估算或編造數字、新聞和來源。
3. 沒有真實網址，就不准出現「來源連結」。

資料來源也換掉：台股改用證交所的官方 API，美股改用 Alpha Vantage。測試那天，美股免費額度被我測光了，JJ 老實回報「查詢失敗（已達每日上限）」。這是我第一次因為 AI 說「查不到」而高興。

規則不是一次就寫得完。3/10 我請 JJ 查世界棒球經典賽的戰況，它把不同日期的比賽拼在一起，比數也是編的。於是 SOUL.md 又多了一條：找不到比數，就說找不到。

## 升級：npm 裝了等於白裝

升級從一開始就不順。2/28 第一次升級，新版多了一個安全設定，沒設好 gateway 就起不來，log 只留下一句「一小時後重試」。

3/6 要升到 2026.3.2。照網路上的教學在容器裡跑 `npm install`，版本號一動也不動。換個路徑再裝，裝到一半容器重開，又回到原點。那天我打了一句：「到底怎麼了？」

答案很簡單：在 Zeabur 上，容器裡裝的東西重開就消失，要升級就直接改 Docker image 的版本號，按儲存就好。我花了一個小時，學到一行。

升級還有兩個後遺症，後來每次都要檢查：

- Brave Search 的 API key 環境變數不見了，JJ 不能上網，回答變得很空。
- 一個控制「主動私訊」的設定被重設回預設值，要手動改回來。

## 換模型，龍蝦變聰明了

3/7 我想讓 JJ 做比價：輸入商品，列出台灣各電商的價格，從低排到高。我寫了一份 SKILL.md，串了 Google Shopping 的查詢 API。

用 gpt-4o-mini 跑，它根本沒照步驟呼叫 API，而是上網隨便搜一搜，就回我「官網售價 NT$19,900 起」。換成 Claude Sonnet，它就乖乖照著 SKILL.md 呼叫 API，把結果從低排到高。我當下的感想是：「果然大家都說，養龍蝦，模型的錢不能省。」

再試便宜一點的 Claude Haiku，也跑得好好的，主力就換成 Haiku。

兩天後，美股報價又因為 Alpha Vantage 每分鐘只能查 5 次而失敗一半。我請 JJ 自己改，它把美股的查詢改成一支一支來、每支間隔 15 秒，改完還寫好說明。我在對話裡打：「覺得 JJ 變聰明了🤣」

## 三隻龍蝦終於分工

三月也是三個 agent 第一次像個團隊。

- **派工**：JJ 叫軍師去比價 iPhone，軍師查完把結果交回來，我只跟 JJ 說話。
- **軍師的人設**：我讀到一篇文章，說與其自己寫人設，不如讓 agent 問你問題。所以我讓 JJ 面試我，十個問題問完，它替軍師寫了一份 163 行的人設檔。軍師的口頭禪是「等等，這裡有個前提沒說清楚。」我丟了一個工作上的難題給它，它真的一句好聽話都沒說。
- **管家阿福**：管家串上 Google 行事曆。Google 已經停用舊的授權方式，我在自己電腦上用 PowerShell 臨時架了一個接收授權碼的小伺服器才搞定。之後我丟一張行事曆的照片給它，它自己讀完、建好行程和提醒。人設定成蝙蝠俠的管家阿福：守住後方、主動提醒、話不多。

## 一個假警報

3/22 早上，JJ 推來一則警告：

<div style="max-width:420px;margin:20px auto;border-radius:12px;overflow:hidden;background:#0e1621;border:1px solid #2b3b4c">
  <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#17212b">
    <img src="/blog/openclaw-mascot.svg" alt="" width="36" height="36" style="border-radius:50%;background:#232e3c;padding:3px">
    <div style="line-height:1.3"><div style="color:#fff;font-weight:600;font-size:15px">小龍蝦 JJ</div><div style="color:#6c7883;font-size:12px">bot</div></div>
    <img src="/blog/telegram-logo.svg" alt="Telegram" width="24" height="24" style="margin-left:auto">
  </div>
  <div style="padding:16px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="background:#182533;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 12px 4px;max-width:85%;width:fit-content;font-size:15px;line-height:1.5">⚠️ openclaw.json 備份失敗，請手動檢查。</div>
  </div>
</div>

設定檔其實好好的。每天的備份是用 git commit 存起來，當天設定檔沒有變動，git 就說「沒有東西可以 commit」，後面的上傳也跟著不跑，JJ 就判定失敗。加一個 `--allow-empty` 參數就解決了。

這種 bug 很典型：系統其實沒壞，是判斷「壞了沒」的邏輯壞了。

## 我開始寫交接文件

這一個月最大的收穫，其實跟龍蝦無關。

每次除錯，我都要開一個新的 Claude 對話，把設定檔、log、之前試過什麼重新講一次，講到一半額度就用完了。3/5 開始，我改了做法：每次對話結束，請 Claude 寫一段摘要，記下這次的結論、下一步，以及下次需要的背景，貼進一份 `session-log.md`。下次開新對話，第一句就是「請先讀 session-log.md」。

這份日誌後來一路寫到 3/22，也成了這一集的骨架。直到現在，我用 Claude Code 做每個專案，都還維持同一個習慣：收工前更新進度檔，下次從那裡接著做。

## 一個月後

三月底，JJ 每天準時送早報、不再編數字，三隻龍蝦也分好工了。但回頭看，這個月我花在維修的時間，遠比它幫我省下的多。

下一集：[四月到九月，我為什麼把龍蝦收掉](/blog/lobster-ep3-letting-go-zh/)。
