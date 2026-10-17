---
title: "Bringing AI Coding Tools into a Fab: Four Questions I Ask First"
description: "When I evaluate AI coding tools, model quality is the last thing I compare. First: where does the code go, who approves it, who owns the mistakes, and how do you get from one person to a team?"
pubDate: 2026-10-17
category: "AI Engineering & Governance"
---

[中文版](/blog/enterprise-ai-coding-tools-zh/)

Bottom line first: when I evaluate AI coding tools for semiconductor manufacturing, model quality is the last thing I compare. I ask four questions first: where does the code go, who approves the tool, who owns the mistakes, and how do you get from one person to a team?

This is my current framework, not a success story.

## 1. It's not just the model

Models turn over every few months. Today's best may not be the best in six months. What stays with a tool for years is this:

- **Data handling**: Is the code used for training? How long is it kept, and in which region?
- **Central management**: Can IT see accounts, permissions and usage logs?
- **Workflow fit**: Does it plug into the IDE, version control and CI, or does everyone copy and paste into another window?
- **Predictable cost**: Per seat or per usage? Is there a cap when usage spikes?

Only after a tool passes these four do I compare whose code is better.

## 2. No approval, no company code

Factory code contains process parameters, product specs and system architecture. Once it's pasted into a free AI tool on a personal account, you can't take it back.

So the first line is simple: unapproved tools don't touch company code. Personal accounts and free tiers are out.

Approval isn't one-and-done, either. When a tool changes its terms of service or data retention policy, it gets reviewed again.

## 3. AI review doesn't replace formal review

AI makes a good first filter. It catches obvious bugs, missing exception handling and inconsistent naming, the things human reviewers start to miss after an hour. AI doesn't get tired.

But formal code review is still done by people, and people own the result. When something breaks, "the AI said it was fine" isn't an answer. Accountability can't be outsourced.

The flow I recommend: AI simplifies the code, then AI looks for bugs, then the engineer reads the diff before committing. AI clears the noise for the engineer. The judgment stays with the engineer or their lead.

## 4. From personal POC to team pilot

I wouldn't roll it out to the whole team on day one. My order:

1. **Use it myself first.** Hit the problems on my own projects. Learn what it's good at and where it fails.
2. **Ask two or three volunteers to try it.** Pick non-critical projects, so a mistake never reaches the production line.
3. **Decide up front what to watch.** Not "how much time we saved," but which kinds of work fit, which don't, and what went wrong.
4. **Write a checklist before scaling.** If it can be written down as a rule, it goes to the team. If it can't, we haven't figured it out yet.

## Last thought

Whether AI coding tools make it into a fab rarely comes down to how smart the model is. It comes down to whether the boundaries were drawn first. Once they are, the tool has room to work.

Next post covers the second half of point 4: turning personal experiments into team standards.
