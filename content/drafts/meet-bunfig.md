---
title: Meet bunfig
description: A lightweight and smart configuration loader for Bun projects.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

Every tool needs configuration, and every tool author ends up writing the same loader: find the config file, support several file names and extensions, merge user values over defaults, and keep TypeScript types intact. `bunfig` is that loader, extracted once and done properly for Bun.

## How it works

```ts
import { loadConfig } from 'bunfig'

interface MyLibConfig {
  port: number
  verbose: boolean
}

const config = await loadConfig<MyLibConfig>({
  name: 'my-lib',
  defaults: { port: 3000, verbose: false },
})
```

bunfig resolves `my-lib.config.ts` (or `.js`, `.mjs`, `.json`, and dotfile variants), deep-merges what it finds over your defaults, and returns a fully typed object. Your users write configs in TypeScript with autocomplete; you write zero resolution logic.

## Small on purpose

There is no plugin system, no schema DSL, no validation framework. It loads config files fast and predictably, and that is the whole job. Nearly every `stacksjs` tool (rpx, tlsx, dtsx, and the framework itself) loads its config through bunfig, which keeps the config experience identical across the ecosystem.

Grab it at [github.com/stacksjs/bunfig](https://github.com/stacksjs/bunfig).
