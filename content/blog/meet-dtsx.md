---
title: Meet dtsx
description: An extremely fast and configurable TypeScript declaration file emitter, built for isolated declarations.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

If you publish TypeScript libraries, you know the pain: generating `.d.ts` files with `tsc` is the slowest part of the build. `dtsx` replaces that step with a fast, focused declaration emitter.

## The isolated declarations bet

TypeScript's `isolatedDeclarations` mode requires you to annotate your public API explicitly, so declarations can be emitted from each file independently, without whole-program type checking. That trade unlocks enormous speed: no cross-file inference, no waiting on the type checker.

dtsx leans into this. Annotate your exports, and it emits declarations in a fraction of the time a full `tsc --emitDeclarationOnly` run takes.

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
