---
title: Meet rpx
description: A modern, fast reverse proxy. For a better local development environment, and small production gateways too.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

`rpx` is a reverse proxy written in TypeScript, built for one thing first: making local development URLs pleasant.

## The problem

Every local project ends up on a different port. `localhost:3000`, `localhost:5173`, `localhost:8080`. Cookies collide, HTTPS is missing, and OAuth callbacks break. The classic fix is hand-rolling an nginx or Caddy config, which nobody enjoys for a throwaway dev setup.

## What rpx does

Point rpx at your dev server and give it a domain:

```ts
// rpx.config.ts
export default {
  from: 'localhost:5173',
  to: 'my-app.localhost',
  https: true,
}
```

That gets you `https://my-app.localhost` with a locally-trusted certificate, automatically. Under the hood, rpx pairs with [tlsx](/blog/meet-tlsx) to mint and trust the local CA, and `*.localhost` names resolve on macOS without touching `/etc/hosts`.

## Not just for dev

rpx is small and fast enough to run as a production gateway. The stacksjs.com box serves multiple sites through a single rpx gateway with ACME certificates and atomic releases behind it. One TypeScript config file describes every site.

Grab it at [github.com/stacksjs/rpx](https://github.com/stacksjs/rpx).
