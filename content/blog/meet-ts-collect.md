---
title: Meet ts-collect
description: A powerful, yet lightweight, Laravel-like collections library written for TypeScript.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

Laravel's collections are one of the best APIs in any framework: a fluent, chainable wrapper over arrays that makes data transformation read like a sentence. `ts-collect` brings that API to TypeScript, with full type inference.

## The shape

```ts
import { collect } from 'ts-collect'

const topSpenders = collect(orders)
  .filter(order => order.status === 'paid')
  .groupBy('customerId')
  .map(group => ({
    customer: group.first()?.customerName,
    total: group.sum('amount'),
  }))
  .sortByDesc('total')
  .take(5)
  .toArray()
```

Every step is typed. Rename a property in your model and the chain lights up with errors exactly where it should.

## Why not just array methods

You can do all of this with `reduce` and friends, but `groupBy`, `sum`, `sortByDesc`, `chunk`, `pluck`, and a hundred other operations end up hand-rolled in every codebase, slightly differently each time. A collections library standardizes the vocabulary. If you know Laravel, you already know this API; if you do not, the method names say what they do.

ts-collect stays dependency-free and tree-shakeable, and it powers `@stacksjs/collections` inside the Stacks framework.

Grab it at [github.com/stacksjs/ts-collect](https://github.com/stacksjs/ts-collect).
