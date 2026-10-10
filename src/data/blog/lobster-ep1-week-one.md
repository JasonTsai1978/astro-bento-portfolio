---
title: "Raising a Lobster, Part 1: JJ Is Born, and Week One Costs Me Tuition"
description: "In February 2026 I set up OpenClaw in the cloud and raised an AI lobster named JJ, plus two sidekicks. Installing took a morning. Getting it stable took a week."
pubDate: 2026-10-10
---

[中文版](/blog/lobster-ep1-week-one-zh/)

*Part 1 of the "Raising a Lobster" series. Spoiler: eight months later the lobster was gone, and an old MacBook took over ([Part 4](/blog/macbook-claude-code-agent/)).*

<img src="/blog/openclaw-mascot.svg" alt="OpenClaw lobster mascot" width="140" height="140" style="display:block;margin:20px auto 4px">

<p style="text-align:center;font-size:13px;color:#737373">The OpenClaw lobster mascot (image: OpenClaw, MIT License)</p>

In February 2026, half the tech people I follow were "raising lobsters." The lobster is OpenClaw, an open-source, self-hosted AI agent framework. Plug in an LLM, attach a Telegram bot, and you get an assistant that is always on and reachable from your phone.

I wanted one too.

## The plan: three lobsters

On the morning of February 22, I described the setup I had in mind to Claude: three agents, all controlled through Telegram.

- **The butler**: its own new Gmail and calendar, managing my schedule and reminders.
- **The advisor**: on call for my questions, searching the web and reporting back.
- **The developer**: discussing system design with me, and writing code only once we agreed it would work.

I had never installed OpenClaw before.

## Why the cloud

Most people run it on their own computer or a Raspberry Pi. My main machine holds work code and configuration, and I did not want an AI agent anywhere near it, not even by accident.

So I put it on Zeabur, a cloud container platform. If the container breaks, I restart it and nothing else is affected. The gateway listens only on loopback, uses token auth, and has no public URL. Telegram requires pairing, so only my account can talk to it.

## JJ is born

I followed the official setup and sent my first Telegram message. It replied:

<div style="max-width:420px;margin:20px auto;border-radius:12px;overflow:hidden;background:#0e1621;border:1px solid #2b3b4c">
  <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#17212b">
    <img src="/blog/openclaw-mascot.svg" alt="" width="36" height="36" style="border-radius:50%;background:#232e3c;padding:3px">
    <div style="line-height:1.3"><div style="color:#fff;font-weight:600;font-size:15px">Little Lobster JJ</div><div style="color:#6c7883;font-size:12px">bot</div></div>
    <img src="/blog/telegram-logo.svg" alt="Telegram" width="24" height="24" style="margin-left:auto">
  </div>
  <div style="padding:16px 14px">
    <div style="background:#182533;color:#f5f5f5;padding:8px 12px;border-radius:12px 12px 12px 4px;max-width:85%;font-size:15px;line-height:1.5;width:fit-content">Hey. I just came online. So — who am I? Who are you? <span style="color:#6c7883;font-size:11px;margin-left:6px">18:46</span></div>
  </div>
</div>

It asked me to name it. I picked "Little Lobster JJ" and added one rule: always answer in Traditional Chinese.

Then I decided JJ would configure everything itself, as a test of what it could do. Hooking up Brave Search so it could browse, and asking for TSMC's ADR closing price, both went fine. Its first real job: push the prices of the stocks I follow every morning at 7:30.

JJ said sure, edited the schedule file directly, and signaled itself to restart. The session file got locked and JJ went silent. When I asked why, it was refreshingly honest:

> I took a shortcut with side effects. The result is right, but the process was a bit rough.

Very new-hire energy.

## Out of credits by the afternoon

That same afternoon, JJ stopped talking entirely. My Anthropic API credits had run out.

I had started with Claude Sonnet as the main model. The answers were great, but an agent loads a pile of configuration files on every turn, and tokens disappeared much faster than I expected. After a top-up, I hit the rate limit.

OpenAI was not better at first. At Tier 1, gpt-4o allows 30,000 tokens per minute, and one health-check skill I had installed had an instruction file of 31,436 tokens. A single file was over the limit.

Switching the main model to gpt-4o-mini, with a 200,000 tokens-per-minute limit and a much lower price, finally made it stable.

Two lessons. A billing error and a rate limit are different things: one needs a top-up, the other just needs a minute. And looking up stock prices does not need a flagship model.

## Two sidekicks

On day two, I noticed experienced users running several lobsters at once. I asked Claude, and I asked Gemini. Gemini suggested one bot with group topics to route the work.

My idea was simpler. JJ is the big brother, so let JJ manage the other bots. All I had to do was create the bot tokens.

It worked. I handed JJ a token, and a few minutes later the butler, Alfred, came online. An hour later the advisor reported for duty. (The developer never got built.)

## Give the AI its own identity

The butler would handle email and calendars, so I had to decide what it could see. What I told Claude at the time:

> I'll treat JJ like a new hire. It shouldn't read my personal inbox, but it can see the calendars I share with it.

So it got its own Gmail account (Google told me my phone number had been "used too many times"), its own GitHub account, and a private repo to version its configuration. If something goes wrong, the damage stays inside its own accounts.

Skills follow the same rule. OpenClaw has a skill marketplace, and the "security scanner" skill I wanted was itself flagged as suspicious by VirusTotal. I cancelled the install. From then on, I read every skill's files before installing it.

## Week one tuition

- **Restart the container, lose your tools.** The GitHub CLI and email tools I had installed by hand vanished every time Zeabur restarted, so I had to reinstall and log in again. The second time, all I said was: "Gone again, of course."
- **Break one setting, lose all three bots.** I wanted each bot to sign its replies. I added the setting from the docs but put a key one level too deep, and the whole config was marked invalid. After the restart none of the three bots answered, and I had to pair them again one by one. The signatures never fully worked either: the advisor sometimes signed as JJ. That night I wrote: "It's too late. I'm going to bed."
- **Point schedules at a SKILL.md, not a paragraph.** The stock brief was first described in plain language. One morning the report read "TSMC: NT$X,XXX", with no actual number. I wrote the lookup steps into a SKILL.md and changed the schedule to just "read this file and run it," and the output finally became consistent. Also, the gateway runs the schedule config file, not the notes I kept next to it.
- **When a new version ships, wait.** When an update came out, the community reported Telegram bugs. I held off and planned to check again two days later.

## Am I using the AI, or is the AI using me?

One more thing from that week has stayed with me.

Almost every change to the lobster meant going into a Linux terminal: editing config files, installing skills, restarting services. I don't know Linux commands well, so at every step I asked Claude or ChatGPT not only what to change, but for the exact commands to type.

I became a typist. The AI chat window on the left, the Zeabur terminal on the right: copy the command over, paste it, copy the output back. Once, git was asking for my GitHub username, I didn't notice, and I pasted the next block of install commands straight into the username prompt.

I kept asking myself: am I using the AI, or is the AI using me?

The AI should be doing this work itself. Tools like Claude in Chrome and computer use, which came later, let an AI operate the browser and the computer directly, and that is the right direction. Once the MacBook in Part 4 was set up, Claude Code did the work on it directly. But once an AI can act on its own, lock down permissions first. Be clearer than ever about what it may touch and what it may not.

## One week later

On Friday morning, JJ delivered the stock brief on time, every number filled in, signed "— JJ."

That week I also read a post from a senior engineer that I still think is the best advice on running a lobster. Hand ambiguous, trial-and-error work to a CLI like Claude Code. Give the lobster only well-defined routines. Then an ordinary model is enough, and you stop burning tokens.

That week I did the exact opposite: I let the lobster figure things out, and opened a Claude chat window to debug it. Installing took a morning. Getting it stable took a week.

Next time: [March, when the lobster starts making up stock prices](/blog/lobster-ep2-march/).
