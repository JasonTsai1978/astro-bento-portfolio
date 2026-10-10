---
title: "Raising a Lobster, Part 2: March, When the Lobster Started Making Up Stock Prices"
description: "Deployment was only the start. In March 2026 my AI lobster sent market updates at midnight, invented stock prices and forgot things after every upgrade. I learned to write it rules, switch models, and keep a handoff log."
pubDate: 2026-10-10
---

[中文版](/blog/lobster-ep2-march-zh/)

*Part 2 of the "Raising a Lobster" series. [Part 1](/blog/lobster-ep1-week-one/) covered week one. This one covers the month of operations that followed.*

Part 1 ended with JJ delivering a stock brief on time, every number filled in. I thought it was stable.

I spent most of March as its repairman.

## Market updates at midnight

Starting the evening of February 27, JJ sent me a market update roughly every two hours, including in the middle of the night. That job was supposed to run once a day, after the market closed.

The next day I asked it directly:

<div style="max-width:420px;margin:20px auto;border-radius:12px;overflow:hidden;background:#0e1621;border:1px solid #2b3b4c">
  <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#17212b">
    <img src="/blog/openclaw-mascot.svg" alt="" width="36" height="36" style="border-radius:50%;background:#232e3c;padding:3px">
    <div style="line-height:1.3"><div style="color:#fff;font-weight:600;font-size:15px">Little Lobster JJ</div><div style="color:#6c7883;font-size:12px">bot</div></div>
    <img src="/blog/telegram-logo.svg" alt="Telegram" width="24" height="24" style="margin-left:auto">
  </div>
  <div style="padding:16px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="background:#2b5278;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 4px 12px;max-width:85%;width:fit-content;margin-left:auto;font-size:15px;line-height:1.5">What schedules do you have right now?</div>
    <div style="background:#182533;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 12px 4px;max-width:85%;width:fit-content;font-size:15px;line-height:1.5">There are currently no daily scheduled jobs or report plans set up.</div>
  </div>
</div>

It said there were none. The messages kept coming.

There were two causes. First, scheduled jobs have a `wakeMode` setting that defaults to `now`: after a container restart, every missed job runs again. Each time Zeabur restarted the container, I got another round. Second, every job run left behind a session that never got cleaned up, a bug in that version. They piled up. The first time I cleared them, there were 38.

After switching `wakeMode` to `skip` and clearing the sessions, things were quiet for two days, and then there were 36 again. Worse, one time after a cleanup and reload, a session file stayed locked and JJ went completely silent, answering everything with "All models failed." In the end I combined "clear sessions, delete lock files, reload" into one command, saved it in my notes, and pasted it whenever the symptoms showed up.

## The lobster starts making up stock prices

On the morning of March 5, the numbers in the stock brief looked off. The news it attached didn't match that day's market at all, and the "source links" went nowhere. JJ also slipped into Simplified Chinese now and then.

It turned out Yahoo Finance was blocking Zeabur's IP addresses. When JJ couldn't get data, it made up the numbers, the news and the links. It wasn't trying to lie. It was trained to produce an answer.

I added three absolute rules to the top of SOUL.md, its persona file:

1. Always reply in Traditional Chinese, whatever model is running.
2. If data can't be fetched, report an error. Never estimate or invent numbers, headlines or sources.
3. No real URL, no "source link."

I also changed the data sources: Taiwan's stock exchange official API for local stocks, and Alpha Vantage for US stocks. On test day I used up the free US quota, and JJ reported "lookup failed (daily limit reached)" instead of guessing. It was the first time an AI saying "I couldn't find it" made me happy.

The rules were never finished in one go. On March 10 I asked JJ about the World Baseball Classic. It stitched games from different days together and invented the scores. SOUL.md got another rule: if you can't find the score, say so.

## Upgrading: npm installs that vanish

Upgrades were rough from the start. On February 28, the first upgrade added a new security setting; until it was set, the gateway wouldn't start, and the log only said it would retry in an hour.

On March 6 I tried to move to 2026.3.2. Following an online guide, I ran `npm install` inside the container, and the version number didn't budge. I installed to another path, the container restarted halfway through, and I was back at the start. At one point I simply typed: "What is going on?"

The answer was simple. On Zeabur, anything installed inside the container disappears on restart. To upgrade, change the version tag of the Docker image and click save. An hour of my time, one line of knowledge.

Upgrades also had two side effects I learned to check every time:

- The Brave Search API key environment variable disappeared, so JJ couldn't search and its answers went hollow.
- A setting that controls proactive direct messages reset to its default and had to be changed back by hand.

## A better model, a smarter lobster

On March 7 I wanted JJ to compare prices: give it a product, and it lists prices from Taiwan's online stores, cheapest first. I wrote a SKILL.md that called a Google Shopping search API.

On gpt-4o-mini, it ignored the steps entirely, did a quick web search, and told me the official price "starts at NT$19,900." On Claude Sonnet, it followed the SKILL.md, called the API, and sorted the results from low to high. My reaction at the time: "Everyone was right. When you raise a lobster, don't skimp on the model."

I also tried the cheaper Claude Haiku, which handled it fine, so Haiku became the main model.

Two days later, half the US stock quotes failed again because Alpha Vantage allows only five requests a minute. I asked JJ to fix it. It changed the US lookups to run one at a time, 15 seconds apart, and documented the change. I typed: "I think JJ got smarter 🤣"

## Three lobsters, finally a team

March was also when the three agents started working as a team.

- **Delegation**: JJ sent the advisor to compare iPhone prices, and the advisor handed the results back. I only talked to JJ.
- **The advisor's persona**: I read that instead of writing an agent's persona yourself, you should let the agent interview you. So JJ asked me ten questions and wrote a 163-line persona file for the advisor. The advisor's catchphrase: "Wait, there's an assumption here nobody has stated." I gave it a hard question from work, and it didn't offer me a single comforting word.
- **Alfred the butler**: The butler got connected to Google Calendar. Google had retired the old authorization flow, so I ended up running a tiny PowerShell server on my own PC to catch the authorization code. After that, I sent it a photo of a calendar, and it read it and created the events and reminders on its own. Its persona is Batman's Alfred: holds the fort, reminds you before you ask, keeps it short.

## A false alarm

On the morning of March 22, JJ pushed a warning:

<div style="max-width:420px;margin:20px auto;border-radius:12px;overflow:hidden;background:#0e1621;border:1px solid #2b3b4c">
  <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#17212b">
    <img src="/blog/openclaw-mascot.svg" alt="" width="36" height="36" style="border-radius:50%;background:#232e3c;padding:3px">
    <div style="line-height:1.3"><div style="color:#fff;font-weight:600;font-size:15px">Little Lobster JJ</div><div style="color:#6c7883;font-size:12px">bot</div></div>
    <img src="/blog/telegram-logo.svg" alt="Telegram" width="24" height="24" style="margin-left:auto">
  </div>
  <div style="padding:16px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="background:#182533;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 12px 4px;max-width:85%;width:fit-content;font-size:15px;line-height:1.5">⚠️ openclaw.json backup failed. Please check manually.</div>
  </div>
</div>

The config file was fine. The daily backup saved it with a git commit. When the file hadn't changed that day, git said there was nothing to commit, the upload step after it never ran, and JJ concluded the backup had failed. Adding the `--allow-empty` flag fixed it.

A classic bug: the system wasn't broken. The logic that decides whether it's broken was.

## I started writing handoff notes

The biggest lesson of the month had nothing to do with the lobster.

Every debugging session meant opening a new Claude chat and re-explaining the config, the logs and everything I had already tried, and I often hit my usage limit halfway through. From March 5 I changed my approach. At the end of each chat, I asked Claude for a short summary of what we concluded, what comes next and what the next chat needs to know, and appended it to a `session-log.md`. Every new chat started with: "Please read session-log.md first."

That log ran through March 22, and it became the skeleton of this post. I still work the same way with Claude Code on every project: update the progress file before stopping, and pick up from there next time.

## A month later

By the end of March, JJ delivered its brief on time every morning, no longer made up numbers, and the three lobsters had clear roles. Looking back, though, I spent far more time repairing it that month than it saved me.

Next time: [April to September, and why I shut the lobster down](/blog/lobster-ep3-letting-go/).
