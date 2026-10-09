---
title: "Turning a 2016 MacBook into an Always-On Claude Code Agent"
description: "How a retired 12-inch MacBook became a 24/7 Claude Code agent I control from my phone: four Ubuntu installs, one flaky SSD controller, and a morning chip-industry brief."
pubDate: 2026-10-10
---

My 2016 MacBook had been sitting unused. This week it became the most useful computer in my house: a small, silent Linux box that runs Claude Code around the clock, takes instructions from my phone, and sends me a semiconductor industry brief every weekday morning.

Here is how it went, including the parts that didn't work.

## Why bother

I wanted an AI agent that is always there. Not a chat window I open, but a machine that keeps running, can do work while I'm away, and is reachable from my phone anywhere.

My desktop PC was the obvious candidate, but it isn't on all the time, Windows updates restart it, and its fans are loud. A cloud server was another option, but I preferred something at home that I fully control.

The old MacBook turned out to be a good fit:

- **Intel Core m3, 8 GB RAM, 256 GB SSD.** Weak by today's standards, but Claude Code doesn't need local compute. The model runs in the cloud; the machine only has to run a terminal.
- **Fanless and low power.** It can sit on a shelf 24/7 without anyone noticing.
- **Free.** It was already mine and doing nothing.

## Four installs to get one working

I wiped macOS and installed Ubuntu Server 24.04 LTS. It took four attempts.

**The console was unreadable.** On a 12-inch Retina screen, the installer's text is microscopic. Changing the console font to a large Terminus size made it usable.

**A boot parameter broke the bootloader.** One attempt added a kernel option meant to avoid EFI issues on Macs. Instead, it stopped the installer from writing boot entries at all, so the install failed at the last step. Lesson: don't add "safety" parameters you haven't verified on your own hardware.

**The SSD disappeared mid-install.** On the third try, the Apple NVMe controller dropped offline a few minutes in, and the filesystem started throwing I/O errors. This is a known problem with aggressive power-saving states on some NVMe drives. The fix was two kernel parameters that keep the drive and the PCIe link out of deep sleep:

```
nvme_core.default_ps_max_latency_us=0 pcie_aspm=off
```

With those in place, the fourth install finished cleanly, and the parameters are now permanent in the boot configuration.

One quirk remains: after installation, the built-in keyboard only registers the Enter key. It doesn't matter for this use case, because everything after setup happens over SSH or from my phone.

## Making it an agent

The setup itself is simple:

- **Claude Code runs as a systemd user service** inside a tmux session, using Claude Code's remote-control mode. If it crashes, it restarts after 10 seconds. If the machine reboots, it comes back on its own.
- **My phone talks to it through the Claude app.** I open the Code tab, pick the MacBook, and give it work. I tested this over 4G with Wi-Fi off, and it works from anywhere.
- **SSH is local-network only.** No port forwarding and nothing exposed to the internet. Remote access goes through my Claude account, not an open port.

The built-in Broadcom Wi-Fi works with the driver Ubuntu already ships, once the wireless tools are installed. It connects on 2.4 GHz; 5 GHz keeps getting rejected by the router, which I've parked for now. A USB Ethernet adapter stays plugged in as a fallback.

Resource use is tiny. With two Claude Code sessions open, the machine uses about 750 MB of its 8 GB of RAM and sits at around 33°C.

## What it does every day

**A morning chip-industry brief.** A small Python script pulls RSS feeds from semiconductor news sites, filters them by keyword, and removes duplicates. No AI is involved in that step. Then Claude summarizes the results into a brief, and the key points are pushed to my phone via Telegram. It runs on weekdays at 7:30 a.m. Taipei time; a full run takes about 30 seconds.

The summarization step runs Claude with **all tools disabled**. News articles are untrusted text from the internet, and a summarizer that can only output text can't be tricked into running commands.

**A health check every five minutes.** A plain shell script, no AI, checks whether the machine is on AC power, whether the SSD controller has dropped again, disk space, temperature, and whether the agent service is running. If something is wrong, I get a Telegram message. Alerts are debounced so a brief blip doesn't spam me. Given this is a ten-year-old laptop with its original battery, I wanted to know about power problems before they became a swollen battery.

**Read-only access to my notes.** A one-way sync copies part of my Obsidian vault to the MacBook as a read-only snapshot, so the agent can answer questions from my notes. Private folders are excluded, and a guard script stops the sync if anything personal slips into the wrong place.

## Keeping it on a short leash

An agent that runs unattended deserves some care. A few rules I followed:

- **Telegram is outbound only.** The bot can send me messages but doesn't accept commands. If its token ever leaked, the worst case is spam, not control of the machine. Real instructions go through the Claude app, which requires my account.
- **Secrets are off-limits to the agent.** Claude Code's permission settings deny reading the SSH keys, the Telegram credentials, and its own login token. I verified this with a harmless test file before trusting it.
- **No extra connectors.** This agent doesn't get my email, calendar, or documents.
- **Everything is backed up.** The scripts, configuration, and setup notes live in a private Git repository, so I can rebuild the machine from scratch.

## What I learned

**Old hardware is fine for agents.** The heavy lifting happens in the cloud. What matters locally is that the machine stays on, stays connected, and stays cool.

**Most of the work was debugging, not building.** Installing an OS and a service is routine. The failed installs, the vanishing SSD, and the Wi-Fi quirks are where the time went. Writing down each failure and its cause is what made attempt four succeed.

**I didn't do this alone.** Claude Code on my desktop planned the install, wrote the setup scripts, and walked me through each step while I reported back with photos of the MacBook's screen. It's a good example of the approach I'm taking with AI more broadly: try it on my own work first, keep what holds up, and only then bring it to my team.

## What's next

- Watch the SSD over the next few days to confirm the fix holds.
- Give the MacBook a fixed address on my network.
- Turn the daily briefs into a weekly summary once a week's worth has piled up.

Not bad for a laptop that was doing nothing a week ago.
