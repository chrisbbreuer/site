---
title: Both Halves
description: Fifteen years of building developer and agentic tooling, two years of planning to run 2,650 miles, and why those turn out to be the same problem.
date: 2026-09-22
author: Chris Breuer
authorBio: Software engineer, founder of Stacks, skyrunner. Los Angeles based.
---

This is the post that should have existed first, so it is the one I have been putting off.

## It started with AdSense

I was twelve when I shipped my first SaaS app. I did not call it that. Nobody called it that yet, and I did not know what I was doing. It made a few hundred dollars a month through Google AdSense. The money was not the interesting part. The interesting part was that I had written something down and strangers were using it.

That is still the thing. Everything since has been a longer version of it.

## Fifteen years of the same problem

I spent the next decade and a half on other people's problems and my own: small apps, then larger private ones, then enterprise services where the failure modes are measured in hours of downtime rather than a broken page. Somewhere in there I got interested in the unglamorous layer: how data is stored and moved, how work is spread across machines that do not trust each other, what happens at the boundaries.

That interest is where [Stacks](https://stacksjs.com) comes from. A full-stack TypeScript framework on Bun, plus the ecosystem that turned out to be necessary to make it real: a templating engine, a query builder, a deploy tool, a CSS engine, image and video codecs. None of that was the plan. Each piece exists because I needed it and the thing that should have existed did not, or existed and was slow.

Increasingly it is agentic tooling too. The tools engineers reach for are quickly becoming the tools their agents reach for, and that changes what a good one looks like. Machine-readable output stops being a nicety. A confusing error message costs more than it used to. "It works if you already know the trick" stops working at all. [buddy](https://github.com/stacksjs/buddy) is the clearest example: AI code review and dependency updates as one teammate rather than two bolted-on integrations.

That is around two hundred published packages now, and roughly eight million installs a month. My goal is a billion a month. I keep a [public list of goals](/goals) so the unreasonable ones have somewhere to sit where other people can see them.

On top of the framework there are the apps. [HQ.training](https://hq.training) for gyms, coaches and athletes. [Wildloop](https://wildloop.org) for trail discovery and GPS, with a territory game underneath. [OpenFarm](https://openfarm.ing) for drone scouting on farms. Both of the first two are athlete software written by someone who needed them to exist, which brings me to the other half.

## The other half

The only thing I loved more than computers as a kid was being outside. Almost twenty years later that has not changed; it just got steeper.

These days it is skyrunning: long days in the mountains, on trails that go up considerably more than they go along, usually with my dog somewhere ahead of me. Weekends are California or Colorado. It is the one reliable thing that gets me away from a keyboard.

The next big one is the Pacific Crest Trail, northbound, 2,650 miles, at a 60-mile-a-day average. Two years of building toward it at twenty to forty hours a week. After that I want to stop training for its own sake and race. Pin on a number, stand on a real start list, find out where I land.

That plan is [public](https://hq.training/share/chris), on the app I build for everyone else, pointed at my own weeks. It seemed dishonest to sell coaches software for tracking athletes and keep my own training in a spreadsheet.

## Why they are the same problem

People tend to treat these as two separate biographies, the desk half and the mountain half. I understand why. It has never felt that way from the inside.

A long day in the mountains is mostly pacing. It is small decisions compounding, for better or worse, over hours. It is being honest about what is working, rather than what you expected to work when you planned it at a table. Go out too hard because the first climb feels easy, and you pay for it in the last three hours.

That is also a fair description of shipping software.

Both punish optimism that is not backed by evidence. Both reward the boring middle: the fourth easy week, the test you did not want to write. Neither cares what you intended.

The clearest version of this: a training plan says twenty-eight hours this week, but what you actually get is decided by what your body absorbs, not by what the schedule asks for. Every fourth week comes down on purpose. Skip those recovery weeks because you feel good and you will find out why they were there. I have watched engineers do the identical thing with a codebase, and I have been that engineer: a pace that looks impressive for six weeks and is unrecoverable by month four.

## What this is for

This is where I write about both. Developer and agentic tooling, TypeScript, Bun, and what I learn building a framework in the open. And the training: the mountains, the PCT, the days it goes well and the days it does not.

If you only came for one half, that is fine. The [RSS feed](/blog/feed.xml) is here either way.

Be brave. Nothing on my goals page was a safe bet the day I wrote it down, and that is the whole point.
