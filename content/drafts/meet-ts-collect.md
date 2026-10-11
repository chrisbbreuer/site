---
title: Meet ts-collect
description: A powerful, yet lightweight, Laravel-like collections library written for TypeScript.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

Laravel's collections are one of the best APIs in any framework: a fluent wrapper over arrays that lets you compose data transformations. `ts-collect` brings that API to TypeScript, with full type inference.

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

The chain retains the types of your data, so the editor can catch a renamed property where you use it.

## Why not just array methods

You can do all of this with `reduce` and friends, but `groupBy`, `sum`, `sortByDesc`, `chunk`, `pluck`, and a hundred other operations end up hand-rolled in every codebase, slightly differently each time. A collections library standardizes the vocabulary. If you know Laravel, you already know this API; if you do not, the method names say what they do.

ts-collect stays dependency-free and tree-shakeable, and it powers `@stacksjs/collections` inside the Stacks framework.

Grab it at [github.com/stacksjs/ts-collect](https://github.com/stacksjs/ts-collect).
