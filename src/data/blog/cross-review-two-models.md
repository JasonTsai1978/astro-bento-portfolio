---
title: "Two AIs, Two Independent Reviews: My Cross-Review Workflow"
description: "One AI reviewing code will miss things, and sometimes says it's fine with full confidence. Inspired by others' experiments, I built a workflow: two models review the same change independently, I verify, then sort the findings into four buckets. Includes a 30-second video."
pubDate: 2026-10-25
category: "AI Engineering & Governance"
---

[中文版](/blog/cross-review-two-models-zh/)

Bottom line first: when I have AI review code, I no longer ask just one model. I send the same change to two models, let each review it independently, verify every finding myself, and sort the results into four buckets. I call this workflow cross-review.

[My last post](/blog/personal-experiments-to-team-standards/) mentioned having several agents cross-check complex changes, in a single paragraph. This post lays out the whole workflow. If you want a quick look first, there's a 30-second video below.

<video controls preload="metadata" playsinline poster="/blog/cross-review-poster.jpg" style="width:100%;border-radius:0.75rem">
  <source src="/blog/cross-review.mp4" type="video/mp4" />
</video>

The on-screen text is in Chinese, and the code and file names in it are made-up sample data, not from a real project.

## Why not just ask one model

I used to ask one AI to look the code over and call it done. Then I came across experiments others had shared: plant bugs in code on purpose, and see how many each model catches. I ran two rounds of my own, with test cases I wrote myself.

Two things changed how I work:

1. No model is guaranteed to catch everything. Some bugs one model finds and another misses, so the models really do complement each other.
2. When the smallest model missed a bug, it still said "looks fine" with full confidence. Missing a bug isn't the scary part. Not knowing it missed one is.

The sample is small and I planted the bugs myself, so treat it as a reference only. I wasn't after a verdict. I wanted a practice with some evidence behind it.

## The five steps

**1. Decide whether it's worth running.** A review isn't free. It costs time and money. I use conditions I can judge on the spot: if the change touches business logic, state, SQL transactions, concurrency or retries, or runs past roughly 100 lines, I run it. Text, styling, docs and small config tweaks don't need it. For the gray area I ask one question: could this fail quietly, in a way a preview or a real run wouldn't show? If yes, run it.

**2. Write the intent in three sentences.** Tell the reviewer what the change is trying to do. Without intent, a review can only nitpick style.

**3. Send it to two models, independently.** Both models run at the same time, and each gets only the intent and the scope, then reads the change itself. The key point is that they never see each other's conclusions, and they don't get my opinion either, so they can't influence each other. The instructions have three rules: read only, don't edit; every finding must include the file, line number, the actual code and a concrete failure scenario; if there's nothing wrong, say so instead of padding the list.

**4. I verify.** This is the most important step. When a model says something is wrong, I open that file at that line and check that the code really looks like that and the scenario really holds. Anything that doesn't match gets rejected. A finding from both models is more credible; one from a single model gets a second look.

**5. Sort into four buckets, and I decide.**

| Bucket | Meaning |
|---|---|
| Must fix | A verified bug, or both models agree and the evidence holds |
| Your call | A design trade-off with reasonable arguments on both sides |
| Note for later | Real, but outside this change |
| Rejected | The evidence doesn't match, or it's a false alarm |

The whole workflow only reports. It never edits code. Whether to accept a finding is always a human decision.

## The thinking behind it

My principle is simple: AI finds, people judge.

Two models make the "finding" broader. Verifying and sorting keep the "judging" in human hands. If I just got two raw reports, I'd only have one more thing to read. Verifying, merging duplicates and sorting is where the effort actually gets saved.

It's also why I didn't pile on more models. Each extra model adds noise and cost, and in my tests two larger models already complemented each other well. When new model generations arrive, I'll rerun the same test cases and decide whether to adjust.

## Turning it into a video

I wanted to show this workflow to my team, but a written explanation is hard to absorb, so I made a 30-second video with Remotion. The layout takes its style from other people's explainer shorts. The content is my own workflow, and the music is original, synthesized myself.

It's the same principle as above: learn from how others do it, then redo it with your own working process, and it becomes yours.

## Last thing

If you want to try it, you don't need to build a skill on day one. Pick one complex change, have two different models each review it once, and compare the results yourself. You'll quickly see what each of them missed.
