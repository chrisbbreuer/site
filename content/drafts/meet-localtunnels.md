---
title: Meet localtunnels
description: A simple and smart tunneling alternative. Expose your local server to the internet, with or without self-hosting.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

Sometimes your local server needs a public URL: webhook development, showing work to a client, testing on a real phone. `localtunnels` gets you there without an account, a paywall, or a closed-source binary.

## Usage

```bash
bunx localtunnels --port 5173
```

You get a public HTTPS URL that forwards to your local port. As a library:

```ts
import { startLocalTunnel } from 'localtunnels'

await startLocalTunnel({ port: 5173 })
```

## Self-hosting is the point

Hosted tunnel services are convenient until you care about where your traffic flows. localtunnels ships the server side too, so you can run the tunnel endpoint on your own box and domain. Your webhooks, your infrastructure, your logs.

It is TypeScript end to end, configured via [bunfig](/blog/meet-bunfig)-style config files, and small enough to read in an afternoon.

Grab it at [github.com/stacksjs/localtunnels](https://github.com/stacksjs/localtunnels).
