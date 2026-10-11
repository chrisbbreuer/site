---
title: Meet tlsx
description: A TLS library with automation. HTTPS by default, for local development and beyond.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

`tlsx` answers a simple question: why is HTTPS still an afterthought in local development?

## Zero-config local certificates

tlsx creates a local certificate authority, trusts it in your system keychain, and mints leaf certificates for any domain you develop against:

```bash
bunx @stacksjs/tlsx install
bunx @stacksjs/tlsx secure my-app.localhost
```

Once the local CA is installed in the system trust store, browsers can verify the certificates it issues. tlsx provides the trust-store integration as well as certificate generation.

## Why it matters

Modern web APIs increasingly require secure contexts: service workers, WebAuthn passkeys, clipboard access, secure cookies. If your local environment is plain HTTP, you are not testing what you ship. tlsx makes `https://` the default posture for every project, which is exactly how [rpx](/blog/meet-rpx) and the Stacks dev server use it.

It is a library and a CLI, so you can automate certificates in your own tooling too.

Grab it at [github.com/stacksjs/tlsx](https://github.com/stacksjs/tlsx).
