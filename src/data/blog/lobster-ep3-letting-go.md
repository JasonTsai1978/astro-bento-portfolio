---
title: "Raising a Lobster, Part 3: Why I Let the Lobster Go"
description: "After March 2026 I rarely opened Zeabur. In September I shut the lobster down. Not because it was bad, but because I realized I didn't actually need one."
pubDate: 2026-10-10
---

[中文版](/blog/lobster-ep3-letting-go-zh/)

*Part 3 of the "Raising a Lobster" series. [Part 1](/blog/lobster-ep1-week-one/) covered deployment and [Part 2](/blog/lobster-ep2-march/) covered March's maintenance. This one is about why I stopped.*

Bottom line first: in mid-September 2026 I shut down Zeabur and let the lobster go. Not because it was bad, but because I realized I didn't actually need a lobster.

## The last repair

On March 28, as usual, I asked Claude whether the latest lobster release was worth upgrading to.

The answer: the newest version was 2026.3.24, sixteen minor releases past my 3.8, mostly features I didn't use. But there was a CVSS 9.9 authentication bypass, fixed only in 3.12 and later. Verdict: time to upgrade.

That was the last time I talked to Claude about maintaining the lobster. Looking back through my chat history, the lobster barely shows up from April through August.

## Five reasons I let go

**1. AI apps caught up with what the lobster did.** From April to September, every AI company kept shipping. The web versions of Claude, ChatGPT and Gemini could search the web and summarize the news on their own, and with tools like Codex and Claude Code, a lot of what I wanted simply didn't need an always-on lobster.

**2. Anything complex was faster in Claude Code.** The lobster took orders through Telegram, with a paid API behind it. Simple lookups were fine. Once a task got complicated, going back and forth in chat messages was clumsy, and anything involving code was even harder to hand to the lobster. Opening Claude Code and doing it directly was much faster.

**3. I didn't have time to keep upgrading it.** Early versions shipped constantly, and every upgrade could break something. When it broke, I opened Zeabur, opened Claude, and debugged step by step. Looking back, most of the repairs in Part 2 were about chasing versions. After April and May got busy at work, I stopped keeping up. Honestly, that time felt a bit wasted.

**4. I don't actually need an assistant.** This was the real one. At the start I designed a butler to watch my inbox and manage my schedule. In practice, I don't need anyone watching my inbox and arranging my day. And my work email and calendar could never be handed to it anyway.

**5. The data was unreliable.** What I used most was the daily stock and industry news. When an API quota ran out or a site blocked the requests, the report came back with stale information or nothing at all. For a brief you glance at every morning, being occasionally wrong is worse than not having it, because you never know whether today's copy can be trusted.

## September: the hosted lobsters arrive

In mid-September I read a one-week review of Meta's new product, Muse. Muse is essentially a hosted lobster: everyone gets a dedicated cloud computer with long-term memory and its own browser to act on your behalf, with no maintenance on your side. Around the same time, xAI's Grok Bot was doing the same thing.

The author's conclusion: "An AI assistant's value isn't answering questions. It's remembering everything and doing your chores." He had handed it his bank accounts, brokerage statements and ten years of health checkup reports.

That holds for him. It doesn't hold for me. My work data can't leave, and my personal life doesn't have that many chores to delegate. Besides, Muse was US-only at the time. Looking back, the butler in my own lobster never took off, for the same reasons.

## But I still needed a machine

The one thing I couldn't give up was the morning news brief. It was the most useful job the lobster ever did.

On September 30 I asked Claude whether there was a way to get a daily AI news digest without running my own server. What I wrote at the time: "I don't have a computer that can stay on all day. I used to subscribe to Zeabur, but I've stopped."

A little over a week later, the MacBook that had sat unused at home for years took over that job.

## What I kept, and what I let go

| Kept | Let go |
| --- | --- |
| A morning news brief pushed to me on Telegram | A butler watching my inbox and calendar |
| Handoff notes, updated every time I stop work | Three agents, each with its own persona |
| Lock down permissions before the AI acts | Letting the AI figure everything out itself |
| The AI working directly on the machine | Me copying and pasting between two windows |

## In the lobster's defense

That said, I still think directing an AI agent through Telegram will become completely normal. The lobster was heading in the right direction. Maybe I just got there a little early, and then stopped keeping up.

Finale: [Turning a 2016 MacBook into an Always-On Claude Code Agent](/blog/macbook-claude-code-agent/).
