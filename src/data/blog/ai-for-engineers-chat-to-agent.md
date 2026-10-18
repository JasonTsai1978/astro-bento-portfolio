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

**4. Agents: understanding legacy code, then refactoring in small steps.** You inherit an old service nobody remembers. First have the agent read the whole project and explain how data flows and where it hits the database. Once you're sure you understand it, have it pull out a piece of duplicated logic, then run the build and tests itself. This is the level I use most at home; my last post describes the setup.

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
