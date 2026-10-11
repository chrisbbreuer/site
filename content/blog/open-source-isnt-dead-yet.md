---
title: Open Source Isn't Dead Yet
description: AI makes trusted, efficient open-source abstractions more valuable. The harder question is who reviews, funds, and maintains them.
excerpt: The more code agents use, the more I want shared solutions that humans have reviewed and can keep maintaining.
date: 2026-10-10
author: Chris Breuer
authorBio: Software engineer, founder of Stacks, ultra runner. Los Angeles based.
---

I agree with much of James Ross's [Open Source as We Know It Is Dead](https://jross.me/open-source-as-we-know-it-is-dead/). Generating a contribution has become cheap. Deciding whether to trust it still asks for somebody's time. A maintainer dealing with a pile of plausible-looking changes has every reason to put a limit on that work.

I disagree with where that leaves open source. As more of the software we use gets selected and assembled by agents, I think good open-source solutions become more important. The harder question is who gets to maintain them, and whether they can afford to keep doing it.

## Stop solving the same problem

Imagine AI gets good enough to answer a programming question perfectly in one shot. The implementation is correct, handles the edge cases, and does exactly what you asked.

Why spend the energy generating that answer again for the next person? And again for the next agent, building a different app that needs the same behavior?

A good open-source library lets us keep the solution. The implementation, its tests, and the decisions behind it can be inspected and reused. When somebody finds an edge case, the fix can help the next application too.

That is the caching layer I care about: shared engineering work. Package managers can cache the files and build systems can cache artifacts, but the more valuable thing is the work those files represent. We have already thought through the problem, reviewed the implementation, and given it a contract other code can depend on.

The software still takes energy to run. Integrating it still takes work. The opportunity is to avoid repeatedly generating and validating interchangeable solutions, while improving the shared one.

## Humans decide what belongs in the cache

A repository full of generated code does not meet that bar by existing. A green test suite is useful, but somebody has to decide whether the tests cover the right behavior in the first place.

I want people involved in those decisions, a lot. People who understand the implementation, can explain why an API behaves the way it does, and take responsibility when it turns out to be wrong. AI can help them write and review code. That help does not settle who is accountable for what gets released.

This is where I agree most strongly with Ross. Making it easy to produce a diff does not make it reasonable to demand a stranger's time to evaluate it.

If an agent generates a change for me, I am still responsible for understanding it before asking a maintainer to merge it. The agent does not get to spend somebody else's evening on my behalf.

A trusted shared solution needs that human judgment behind it. Flooding maintainers with output makes the layer harder to trust and harder to maintain, even when a few useful changes are buried in the pile.

## The next user may be a machine

I expect agents to become the majority of the users selecting and installing dependencies. That is a prediction, not a count of today's installs. But it changes what I want from the tools I build.

An agent should be able to find a package, understand its contract, install it reproducibly, and use it without relying on a trick somebody remembers from an issue thread. Clear documentation and errors become part of the interface. Stable abstractions let the agent reuse work rather than reconstruct the same behavior from scratch.

And the implementation underneath matters. If a shared abstraction wastes memory or does unnecessary work, repeated use spreads that cost. If we improve it once, applications using the improved version can benefit together.

The goal should be the most performant and energy-efficient solution we can build, with measurements on the workloads it actually serves. Reuse alone does not guarantee efficiency. Pulling in an oversized dependency for one small function can cost more than it saves.

That is why I care about good abstractions so much. I want the efficient implementation to be the easy one for an engineer or an agent to reach for.

## Acquisitions can end the work

The Deno announcement this week is a much more concrete threat to a project's future than the existence of code generation.

On October 9, [Deno announced that its team is joining Cloudflare](https://deno.com/blog/cloudflare). The plan is another year of monthly runtime releases with bug fixes and security updates, followed by an end to the team's runtime development. Deno Deploy is due to shut down after six months. The runtime remains open source, and others are welcome to continue developing it.

That distinction matters. The code can survive while the people and funding advancing it move elsewhere. A license gives a community permission to continue; it does not pay for the work of continuing.

[Cloudflare describes the move](https://blog.cloudflare.com/deno-joins-cloudflare/) as a way to make self-hosting Workers and Durable Objects easier. That may be valuable work. It still leaves people who built around the independent Deno runtime with a different future from the one they chose.

This is what worries me about acquisitions. A project can be valuable to its community while its continued development no longer fits its new owner's priorities. Keeping the repository available is an important protection, but replacing its stewardship is a real job.

## Independence needs a business model

For an independent maintainer, monetizing open-source work can feel close to impossible. A useful package can attract users without giving its author a reliable way to pay for maintenance. That leaves too much work dependent on spare time, a sponsor, or a company willing to fund it.

I think too many projects stop at publishing the code. They never build the surrounding ecosystem that gives somebody a reason to pay for something useful: hosting, support, or services that make the software easier to operate. The result can be a widely used project with very little independence behind it.

Laravel shows another path. Its [framework is MIT licensed](https://laravel.com/docs/13.x/license), while products such as [Forge](https://laravel.com/forge) and [Nova](https://nova.laravel.com/) build a commercial ecosystem around it. An open-source foundation can support a business without the foundation itself becoming a paid product.

I also think Laravel pushes monetization too far around that ecosystem. The framework remains free, and I am glad the people building it can earn a living. My concern is the pressure to turn every surrounding need into another product to buy. I think that can eventually work against the trust and willingness to participate that made the ecosystem useful.

I want maintainers to get paid for solving real problems around the software. I also want a clear boundary between those paid services and the shared foundation people are contributing to. Funding should make that foundation more dependable, and give its maintainers more freedom to keep working on it.

## More reuse, with somebody responsible for it

This is part of why I build [Stacks](/stacks) and the tools around it. I want people and their agents to start with dependable abstractions, improve them together, and spend their effort on the application they actually came to build.

The model might eventually answer your question perfectly. I would still rather use a shared implementation that people understand, review, measure, and keep maintaining than pay to rediscover the same answer every time.

Open source has plenty of problems to solve. Its usefulness is not the one I am worried about. As AI scales, the work is to make the solutions worth reusing, and make sure the people responsible for them can stick around.
