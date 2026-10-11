---
title: Meet dtsx
description: An extremely fast and configurable TypeScript declaration file emitter, built for isolated declarations.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

When generating `.d.ts` files becomes the slow part of a library build, `dtsx` can replace that step. It is a declaration emitter built around TypeScript's isolated declarations.

## The isolated declarations bet

TypeScript's `isolatedDeclarations` mode requires you to annotate your public API explicitly, so declarations can be emitted from each file independently, without whole-program type checking. Those annotations let the emitter work without cross-file inference or waiting on the type checker.

That is the trade dtsx makes: you annotate the exports, and it focuses on emitting their declarations.

## Usage

```bash
bunx dtsx
```

Or as a library, and as `bun-plugin-dtsx` inside Bun's bundler, so your `bun build` produces bundles and declarations in one pass:

```ts
import dts from 'bun-plugin-dtsx'

await Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: 'dist',
  plugins: [dts()],
})
```

Every package in the stacksjs ecosystem ships its types through dtsx, which is a good stress test: hundreds of entry points, complex generics, and re-exports across workspaces.

Grab it at [github.com/stacksjs/dtsx](https://github.com/stacksjs/dtsx).
