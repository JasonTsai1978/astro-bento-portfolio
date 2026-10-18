---
title: "From Personal Experiments to Team Standards: How I Turn AI Lessons into Rules"
description: "To turn personal AI experiments into team standards, write the lessons down as version-controlled rules the AI reads every time, then test whether each rule earns its place. Examples from my own Claude Code setup."
pubDate: 2026-10-22
category: "AI Engineering & Governance"
---

[中文版](/blog/personal-experiments-to-team-standards-zh/)

Bottom line first: turning personal experiments into team standards isn't about a polished rollout deck. It's about writing the lessons down as rules the AI reads every time it starts work. The rules themselves should be tested, and the ones that don't help should go.

Point 4 of [my last post](/blog/enterprise-ai-coding-tools/) ended with "decide up front what to watch" and "write a checklist before scaling." This post covers that second half, using my own Claude Code setup at home as the example. Same as before: these are recommendations, not a success story.

## Why I use Claude Code more at home

I use both. For personal projects at home, I now mostly open Claude Code and keep claude.ai for talking through ideas and writing. Here's the difference:

| | claude.ai (web) | Claude Code (terminal agent) |
|---|---|---|
| Where the code comes from | I copy, paste or upload it | It reads the whole project folder and git history |
| How changes land | I paste them back into the editor | It edits files, runs the build and commits |
| When something fails | I run it and paste the error back | It runs it, reads the error and fixes it |
| How rules are carried | Project instructions, or repeated each time | A `CLAUDE.md` file in the repo, read at the start of every session |
| Picking up where you left off | Chat history, project knowledge | A progress file, git log, memory files |
| Best for | Discussion, writing, quick questions on the phone | Real changes to a project, multi-file edits, anything that needs commands to verify |
| Watch out for | Pasting what you shouldn't | It can run commands, so permissions matter |

The row that matters most here is how rules are carried. On the web, rules are scattered across conversations. In Claude Code, rules are a file. It can be version-controlled, reviewed and handed to the next person. That step is what lets a personal experiment become a team standard.

## 1. Leave a handoff note at the end of every session

Every project of mine has a `claude-progress.txt`. At the end of each session, the AI appends an entry: the date, what changed, which branch, whether it's merged, and what's left.

This blog gets edited from three places: my PC at home, Claude Code in the cloud, and the GitHub web editor. They don't share memory. The progress file is the only handoff.

Teams are no different. The AI doesn't remember who did what last week, and people don't always either. If you want to learn which kinds of work fit and where things go wrong, you need a record to look back on.

## 2. Hit a problem, add a rule

`CLAUDE.md` is the rules file Claude Code reads at the start of every session. Almost every rule in mine exists because something went wrong first. For example:

- **Without Node installed, never claim "the build passed."** Use the cloud preview build instead. AI is quick to turn "should pass" into "passed."
- **Never push straight to master.** Always open a branch, show me the preview, and merge only after I confirm.
- **One feature per session.** Nothing half-finished at the end.
- **A list of things never to publish:** IPs, accounts, keys, company and customer names, family names. The repo is public, so this one is non-negotiable.

Some rules need the tool to enforce them, not just a line in a file. For "update the progress file after every commit," I use a hook that reminds me after each commit. It doesn't rely on the AI's memory or mine.

This is what I meant last time by "if it can be written down as a rule, it goes to the team." The rules live in the repo and go through version control with the code. Git shows who changed what and why. A new teammate clones the repo, and the AI follows the same rules for them.

## 3. Turn your go-to prompts into skills

`CLAUDE.md` covers how a given project works. A second kind of rule covers how a given kind of task works, like writing a business email in English or drawing a flowchart. These come up in every project, so I turn them into skills: a folder with a `SKILL.md` that says when to use it, how to do the task, and what the output should look like. Both claude.ai and Claude Code can use them.

The ones I use most:

| Skill | What it solves |
|---|---|
| English business email | Always produces two versions, one native-sounding and one in plainer English, so I can match the reader |
| Chinese business email | Separate internal and external versions, with the tone adjusted for each |
| Flowcharts and timelines | Always outputs a single HTML file I can open directly or screenshot into slides |
| Note format | Every note written into Obsidian gets the same frontmatter and link format |
| Cross-model review | The review flow from points 4 and 5 |
| Should this be a skill? | Yes, even deciding whether to make a skill is a skill |

I followed the official guidance (links in the appendix). Three points helped most:

- **Make the description say what it does and when to use it.** Claude reads it to decide whether to load the skill. Vague descriptions don't get picked.
- **Only write what Claude doesn't already know.** No need to explain what a business email is. Write down your format and the mistakes you've already hit.
- **Try first, then write.** Do the task a few times without a skill. Note where it falls short and what you keep re-explaining, then write just enough instruction to cover that.

That last point is also how I decide whether a skill is worth making: the same task keeps coming up, I keep re-explaining the background, or the quality swings from run to run. Not every prompt needs to be a skill.

For a team, a skill is a prompt you can share. What works no longer lives only in one person's chat history.

## 4. Tier your reviews, with criteria anyone can apply

Not every change deserves the same review cost. My tiers:

| Change type | Before commit |
|---|---|
| Regular changes | `/simplify` (clean up the code) → `/code-review` (find bugs) → I read the diff |
| Complex changes: business logic, state machines, SQL/transactions, concurrency, retries, or more than ~100 lines or many files | All of the above, plus a cross-model review |
| Personal site, blog, styling, copy, small config edits | No cross-model review |

The point is that the second row can be checked directly. "Important changes get more review" can't be applied consistently. "Touches a SQL transaction" can. Vague rules mean everyone reads them differently.

## 5. Test the rules

The cross-model review sends the same diff to two different models, each reviewing on its own, then combines the results. But why those two models? I didn't want to pick on gut feel, so I ran two rounds of tests: I planted bugs in code (8 in the first round, 6 in the second) and counted what each model caught.

| Observation | Result |
|---|---|
| Larger models (Opus, Sonnet, Fable) | Caught every bug in both rounds |
| Smaller model (Haiku) | In round two, missed a state-transition bug that only shows up when you compare two methods, and confidently said the code was fine |
| Integer multiplication overflow | Only Opus and Haiku caught it |

So my pair is Opus plus Sonnet. The two larger models still cover for each other. Haiku was confident when it was wrong, which is the last thing you want in a reviewer. Fable overlapped too much with the other two to add much.

To be clear, the sample is small, I designed the bugs myself, and each test was a single file. Treat the results as a reference point, not a verdict. But it beats "model A feels smarter," and it can be rerun.

Teams can do the same. Instead of arguing over which tool is better, build a set of problems with known answers and let everyone run them with their own tools.

## 6. A checklist before scaling to the team

Going from one person to a team, I'd confirm at least these:

- [ ] The tool is approved and its data policy has been reviewed (point 2 of the last post)
- [ ] There's one shared rules file in the repo, not everyone's own prompts
- [ ] Go-to prompts are packaged as shared skills, not kept in personal chat histories
- [ ] Review tiers are written down and can be checked directly
- [ ] The rules have an owner, and there's a clear way to propose changes
- [ ] There's a regular review, and rules that don't help get removed

The last one is easy to skip. If rules only ever get added, eventually nobody reads them. My review pair only dropped Haiku and Fable after testing, and when the models change, I'll rerun the tests.

## Last thought

What separates a personal experiment from a team standard is writing it down. Write it as a rules file the AI can read, put it under version control, and test that it actually helps. Then what you hand the team isn't just "this works for me." It's a way of working others can follow, and also question.

None of this is finished, either. For more advanced use, I'm still working things through with the AI and keep reading the official docs and what well-known AI practitioners share. When something looks good, I try it. Only what works gets written into the rules.

Next post takes the engineer's side: from web chat to agents, and how AI fits into everyday development.

## Appendix: official docs

If you want to try this yourself, start here:

**Claude Code**

- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [CLAUDE.md and project memory](https://code.claude.com/docs/en/memory)
- [Skills](https://code.claude.com/docs/en/skills)
- [Hooks](https://code.claude.com/docs/en/hooks-guide)
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)

**Skills and prompting**

- [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Anthropic Engineering: Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
