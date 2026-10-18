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

`CLAUDE.md` is the rules file Claude Code reads at the start of every session. Almost every rule in mine exists because something went wrong first. For example, AI is quick to turn "should pass" into "passed," so I added a rule: if you didn't actually run it, don't say it passed.

This is what I meant last time by "if it can be written down as a rule, it goes to the team." The rules file lives with the code and goes through version control with it. When a new teammate picks up the project, the AI follows the same rules for them.

## 3. Turn your go-to prompts into skills

The rules file covers how a given project works. A second kind of rule covers how a given kind of task works, and those come up in every project. I turn these into skills: in effect, a go-to prompt saved as a fixed way of doing the job. Both claude.ai and Claude Code can use them.

The one I use most is for English business email. At work I write a lot of English email almost every day. Some readers are native English speakers, others are Taiwanese colleagues. Writing the same email the same way for both means it's either too stiff for native speakers or too hard to read for my Taiwanese colleagues. So I had AI help me build a skill that always produces two versions: a natural one for native speakers, and one with simpler tone and vocabulary for Taiwanese colleagues.

Others cover Chinese business email, flowcharts, note formatting, and the cross-model review described below. Even "is this worth making into a skill?" is itself a skill.

My test: the same task keeps coming up, I keep re-explaining the background, or the quality swings from run to run. Only then is it worth it. Not every prompt needs to be a skill.

For a team, a skill is a prompt you can share. What works no longer lives only in one person's chat history.

## 4. Tier your reviews, and let multiple agents check the complex ones

Not every change deserves the same review cost. My approach follows the official code review guidance, along with advice from experts I've read online. For regular changes, AI simplifies the code, then looks for bugs, and I read it before committing. For complex projects or code, like anything touching SQL or transactions, several agents review it separately and I cross-check what they find. Text edits on this blog skip all that.

The criteria need to be checkable. "Important changes get more review" can't be applied consistently. "Touches a SQL transaction" can.

As for which models to use, I didn't want to pick on gut feel either, so I ran a small test: I planted bugs in code and counted what each model caught. Two larger models worked best together, each catching things the other missed. The smaller model missed a bug and confidently said the code was fine, which is the last thing you want in a reviewer. The sample is small, so treat it as a reference point. But it beats "model A feels smarter," and it can be rerun.

Teams can do the same. Instead of arguing over which tool is better, build a set of problems with known answers and let everyone run them with their own tools.

## 5. A checklist before scaling to the team

Going from one person to a team, I'd confirm at least these:

- [ ] The tool is approved and its data policy has been reviewed (point 2 of the last post)
- [ ] There's one shared rules file in the repo, not everyone's own prompts
- [ ] Go-to prompts are packaged as shared skills, not kept in personal chat histories
- [ ] Review tiers are written down and can be checked directly
- [ ] The rules have an owner, and there's a clear way to propose changes
- [ ] There's a regular review, and rules that don't help get removed

The last one is easy to skip. If rules only ever get added, eventually nobody reads them. I only decided which models to drop from my review setup after testing, and when the models change, I'll rerun the tests.

## Last thought

What separates a personal experiment from a team standard is writing it down. Write it as a rules file the AI can read, put it under version control, and test that it actually helps. Then what you hand the team isn't just "this works for me." It's a way of working others can follow, and also question.

None of this is finished, either. When the official docs publish something new, I read it, ask AI to explain the parts I don't follow, and decide whether the setup I'm using should change.

Next post takes the engineer's side: from web chat to agents, and how AI fits into everyday development.

## Appendix: official docs

If you're interested, start here:

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
