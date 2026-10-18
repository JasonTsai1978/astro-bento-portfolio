---
title: "AI for Engineers: From Web Chat to Agents"
description: "Most engineers still use AI by pasting code into a chat window. This post lays out four levels (personal web chat, enterprise chat, in-IDE assistants and agents) with an everyday C# or T-SQL example for each, then covers the shift from asking questions to handing off work."
pubDate: 2026-10-25
category: "AI Engineering & Governance"
---

[中文版](/blog/ai-for-engineers-chat-to-agent-zh/)

Bottom line first: how well AI works for you depends less on how clever your questions are and more on how much context you give it, and whether you let it check its own work. Moving from web chat to agents is a matter of handing over those two things, one step at a time.

My last two posts ([four questions before adopting AI coding tools](/blog/enterprise-ai-coding-tools/) and [from personal experiments to team standards](/blog/personal-experiments-to-team-standards/)) were for managers: how to choose and how to govern. This one is for engineers: how to use it.

## How most people use it today

Open ChatGPT or claude.ai in the browser, paste some code, ask "why does this fail?" or "how do I write this?" That's genuinely useful. I do it every day.

But it has three limits. You supply the context by copy and paste, so the AI never sees the whole project. Its answers haven't been run, so you test them yourself. And whatever it fixes, you carry back into the editor by hand. The bigger the problem, the more time those three steps take.

## Four levels

| | What it looks like | Good for | Watch out for |
|---|---|---|---|
| 1. Personal web chat | ChatGPT or claude.ai on a personal account | Syntax questions, explaining errors, learning something new | Don't paste company code here |
| 2. Enterprise chat | A company-approved enterprise plan | The same Q&A, plus project context and uploaded specs | Stricter data policy than personal plans, but company rules still apply |
| 3. In the IDE | Completions and chat in the editor, e.g. GitHub Copilot | Finishing what you're typing, local rewrites, explaining the code in front of you | Limited view, so larger changes can miss things elsewhere |
| 4. Agents | Tools like Claude Code or Codex | Reading the whole repo, editing multiple files, running builds and tests, fixing its own mistakes | It runs commands, so set permissions carefully and always review the result |

Each level down gives the AI more context and more room to act on its own, and gives you more to oversee. Lower isn't automatically better. Pick the level that fits the job.

## One everyday example per level

**1. Personal chat: making sense of an error.** You hit a .NET exception you don't understand, or you want to know how T-SQL's `MERGE` differs from an `UPDATE` followed by an `INSERT`. No company data involved, so the web is fastest.

**2. Enterprise chat: reading an execution plan.** A query suddenly slows down. Give the execution plan and table structures to your company-approved enterprise tool and ask where the bottleneck is and whether an index would help. Keep your usual schema notes in a Project so you don't paste them every time.

**3. In the IDE: adding unit tests.** Put the cursor on a C# method and ask for a few edge-case tests in the style of the existing ones. The scope is the file in front of you, which is exactly right.

**4. Agents: understand the whole project before touching it.** This is the level I use most at home, and the one that differs most from the other three ([my last post](/blog/personal-experiments-to-team-standards/) describes the setup).

When a new requirement comes in, I don't tell it to start writing. I go in three steps:

1. Have the agent read the whole repo and explain the architecture: how data flows, how the modules are split, where it touches the database.
2. While it's there, have it do a code review, so I know where the existing code is fragile or already broken.
3. Only then give it the new requirement and ask what it would change and what that would affect. Once I've read the plan and agreed, it makes the changes, then runs the build and tests itself.

That way a new feature or a new piece of logic doesn't quietly break something I can't see. In a web chat, the AI only sees the snippets I paste, so working out the blast radius is on me. And copying the relevant files over one by one eats up most of the time anyway.

## What else an agent did for me these past few weeks

Beyond writing code, what I've handed to agents lately has been more varied than I expected. The most complete example: turning a 2016 MacBook at home into an always-on agent ([the full story is here](/blog/macbook-claude-code-agent/)).

That project was basically this post's workflow, start to finish. I laid out the goal and the constraints first: it stays on, I can reach it from my phone when I'm out, and it exposes no services to the outside. Claude Code on my desktop planned the install steps and wrote the setup script. I followed along and sent back photos of the MacBook's screen. It took four installs. Each time one failed, the agent read the installer logs and system messages, and it traced the real cause to the SSD controller dropping out, not the write errors that showed up on the surface.

One of those failures was caused by a boot option the agent itself had suggested a step earlier, and it only corrected that after reading the log. I've kept that in mind since: it's very good at chasing down problems, and its suggestions still need checking.

That MacBook now sends me a news digest every morning, and it's an agent in its own right. One agent setting up another is the result from these past few weeks that stuck with me most.

The rest are smaller, but they apply just as well to everyday engineering work:

- **Measuring after the fix, then fixing again.** During a performance check of this site, it ran the audit tool, found issues, fixed them and ran the audit again. One fix actually made things worse the first time, and only the rerun caught it. In a web chat, I'd probably have assumed it was done.
- **Problems that aren't code.** My PC at home shut off without warning. It read the system event log, ruled out a few possibilities, then wrote a small script that records hardware status on a timer, so there's data to compare if it happens again.
- **Small tools, tested at the edges.** For a few scripts I use myself (saving videos, pulling subtitles), it ran each one against a normal URL, a missing one and a duplicate after writing it. I just read the results.

What these have in common: it can run things, look at the results and fix what's wrong. A web chat can't take that step, and it's what I meant at the top by letting AI check its own work.

## The mindset shift: from asking to handing off

At levels 3 and 4, the biggest change isn't the tool. It's how you ask.

Asking is "how do I write this?" Handing off is briefing a new teammate: here's the background, here's the goal, here's what done looks like. For example: "This service needs a new field. The table is here and the related API is here. When you're done, the build has to pass, the existing tests have to pass, and don't touch other modules."

Once you hand it off, your job becomes reviewer. You need to understand what the AI changed and be able to say why it's safe to merge. If you can't, don't merge it.

## Four common mistakes

- **Trusting it blindly.** Confidence isn't correctness. If it hasn't been run, treat it as unverified.
- **Pasting company material into a personal account.** Convenient, and the one thing that should never happen.
- **Giving no context.** Paste a single error line and ask why, and it can only guess. A little more context changes the answer a lot.
- **Handing off too much at once.** "Refactor the whole module" is hard to review. Break it down, one thing at a time, so each step can be checked.

## How to start in week one

You don't have to switch everything at once. I'd suggest:

- Find out which tools your company has approved; use personal accounts only for questions unrelated to work
- Pick one small task that comes up every week, like reading errors or adding tests, and give it to AI every time
- Every time you hand something off, spell out what done looks like
- Keep a few notes on what works and where it goes wrong, so you have something to share with the team later

## Last thought

AI doesn't mean you no longer need to understand code. It lets people who do understand code spend their time on judgment instead of typing. Going from asking to handing off comes down to one skill: say clearly what you need, and look closely at what you get back.
