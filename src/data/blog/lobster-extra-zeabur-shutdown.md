---
title: "Raising a Lobster, Extra: A Month After I Let the Lobster Go, the Platform Shut Down"
description: "On October 17, 2026, Zeabur announced it is shutting down after two security incidents. My lobster wasn't shut down until September, so the August breach likely reached it too. Cancelling a service doesn't make you safe."
pubDate: 2026-10-17
category: "Personal Lab"
---

[中文版](/blog/lobster-extra-zeabur-shutdown-zh/)

*An extra episode of the "Raising a Lobster" series. [Part 3](/blog/lobster-ep3-letting-go/) covered shutting the lobster down in September. This is what happened next.*

Bottom line first: on the morning of October 17, I got an email from Zeabur's founder. The platform is shutting down. Services start going offline on December 1, and everything closes by December 31.

I had shut down the lobster a month earlier, so I assumed this had nothing to do with me. Then I checked the dates. When the August breach happened, the lobster was still running.

## What happened

Official sources only:

- **August 27, first breach.** A user on the shared cluster had deployed a vulnerable NextChat instance. The attacker got in through it and worked their way to the platform database. Names and values of some project environment variables were read, including AI API keys, cloud credentials and database passwords. Zeabur says its monitoring missed it. The team found out on August 28, when a user reported a stolen key. ([official post-incident report](https://zeabur.com/zh-TW/blogs/august-2026-security-incident))
- **October 14, second breach.** Zeabur first said only the shared cluster was affected. A few hours later it corrected that: some dedicated servers on Google Cloud were also accessed, and the attacker could read the platform database. ([status page](https://status.zeabur.com/incident/1091243))
- **October 17, shutdown announced.** The email says the two incidents made the team face gaps in security and operations. It also notes that AI is making deployment itself easier and easier.

One line in the email stopped me: "From n8n and OpenClaw to vibe coding, AI brought unprecedented demand for cloud deployment."

I was part of that demand. My n8n news bot and my OpenClaw lobster both ran on Zeabur.

## Why it matters to me

The lobster's settings lived in environment variables: model API keys and login credentials for a few services. When the August breach happened, I hadn't shut it down yet.

I never got an incident notification. That doesn't mean I'm in the clear. Zeabur admitted its first notification email got the scope wrong.

Its advice is blunt: rotate every credential that was ever stored in a Zeabur environment variable and is still valid, including ones the notice didn't list.

## What I did

- **Revoked the OpenAI key.** I checked billing. No charges in the past few months.
- **The GitHub token and the search API key** were already deleted in early October, while I was writing this series.
- I'm working through the rest, one credential at a time.

## Lesson: cancelling isn't the same as safe

Cancelling a service just means you stop paying. Any key you left on the platform is still a working key until you revoke it.

Next time I shut something down, I'll go in this order:

1. List every credential stored on the platform.
2. Revoke them the same day I cancel, not after something goes wrong.
3. Put spending caps on any key an agent uses, so a leak has a ceiling.
4. Ask the platform to delete the account and data, not just stop the service.

At the end of Part 3, I said maybe I just got to the lobster a little early. Now the pond it lived in is closing too.
