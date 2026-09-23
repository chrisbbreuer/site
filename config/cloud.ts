import type { CloudConfig } from '@stacksjs/types'
import type { CloudConfig as TsCloudConfig } from '@stacksjs/ts-cloud'
import { env } from '@stacksjs/env'

/**
 * chrisbreuer.me cloud configuration.
 *
 * This project does NOT own a server. It attaches to the shared Hetzner box
 * owned by the `stacks` project (`cloud.attachTo`): the deploy targets the
 * `stacks-production-app` server, ships only these sites, and adds an
 * additive rpx `sites.d/chrisbreuer.json` gateway fragment. The owner keeps
 * managing the box, firewall, TLS, and its own sites.
 *
 * Site keys map 1:1 to `/var/www/<key>` on the shared box, so every key is
 * prefixed with `chrisbreuer` to never collide with the owner's `main`,
 * `api`, `blog`, and `docs` directories. Ports 3040/3048 are equally chosen
 * to stay clear of the owner's 3000/3008 and other tenants' 30xx ports; both services bind loopback and
 * are only reachable through the rpx gateway.
 */
export const tsCloud: TsCloudConfig = {
  project: {
    name: 'chrisbreuer',
    slug: 'chrisbreuer',
    region: 'us-east-1',
  },

  cloud: {
    provider: 'hetzner',
    attachTo: 'stacks',
  },

  mode: 'server',

  infrastructure: {
    compute: {
      mode: 'server',
      size: 'small',
      runtime: 'bun',
      webServer: 'rpx',
      proxy: {
        engine: 'rpx',
        onDemandTls: true,
        onDemandTlsEmail: 'hello@stacksjs.com',
        onDemandTlsStaging: false,
      },
    },
  },

  environments: {
    production: {
      type: 'production',
      deployBranch: 'main',
      region: 'us-east-1',
      variables: {
        NODE_ENV: 'production',
        LOG_LEVEL: 'info',
      },
    },
  },

  sites: {
    // The stx app server (`buddy serve`): renders the views and proxies /api
    // to the loopback API service below (PORT_API). The systemd unit gets
    // PORT=3010 from `port`; everything else comes from the shared site .env
    // that ts-cloud writes from `env`. The sqlite database lives OUTSIDE the
    // atomic release dirs (/var/lib/chrisbreuer) so subscribers survive
    // deploys; preStart migrates it in place.
    chrisbreuerMain: {
      root: '.',
      path: '/',
      domain: 'chrisbreuer.me',
      // The published package ships this entry prebuilt, so nothing is
      // compiled here. The previous command built app/ProductionServer.ts,
      // which imported `../storage/framework/core/buddy/src/commands/serve` —
      // a path that stopped existing when this project moved off the
      // vendored core, and took the deploy down with it.
      start: 'bun node_modules/@stacksjs/buddy/dist/serve-entry.js',
      port: 3040,
      // What the zero-downtime cutover waits for before retiring the old
      // release.
      //
      // ts-cloud already overlaps releases: the new one binds the same port
      // via SO_REUSEPORT while the old keeps serving, and only then is the old
      // stopped. But without this the gate is `systemctl is-active` for five
      // seconds — which asks whether the process is alive, not whether it can
      // answer. A Bun server binds its port almost immediately and then does
      // its startup work, so "active" was true long before the first byte
      // could be served. The old release was retired into that window, and
      // every request that arrived in it got nothing back.
      //
      // `/` rather than a static file on purpose: it exercises the render
      // path, which is what the stall actually blocked.
      healthCheck: { path: '/' },
      // stx generates responsive image derivatives (7 widths x 2 formats) on
      // first boot, and it does that work on the event loop — the server binds
      // :3040 immediately but answers nothing until the pass finishes. For this
      // site that is ~1,000 files and ~280MB, mostly the About gallery, which
      // takes far longer than the liveness probe's three 5s checks. The probe
      // restarts the unit, the release dir is fresh, the pass starts over, and
      // the site never serves a byte. Keeping the output out of the atomic
      // release dir breaks that loop: ts-cloud seeds shared/ from the live
      // release on the first deploy that declares this, then symlinks it into
      // every release after, so the derivatives are generated once rather than
      // once per deploy. `.env` stays shared — ts-cloud always merges it in.
      //
      // image-placeholders.json is the other half of that boot work: stx calls
      // warmImagePlaceholders() with it as an explicit cachePath, and requests
      // wait on that pass, so an un-cached copy costs the same stall on every
      // release. Both entries are caches keyed by source image — a new photo
      // derives just its own entry, it does not invalidate the rest.
      sharedPaths: [
        'storage/framework/stx/image-delivery',
        'storage/framework/stx/image-placeholders.json',
      ],
      preStart: [
        'bun install',
        'mkdir -p /var/lib/chrisbreuer',
        // Same reason: the CLI comes from the installed package now.
        'bun node_modules/@stacksjs/buddy/dist/cli.js migrate || true',
        // sitemap.xml is derived from the views and posts in the release, so
        // it is built here rather than committed — the shipped file then
        // always matches the pages that actually shipped. `|| true` because a
        // stale sitemap is not worth failing a deploy over.
        'bun scripts/build-sitemap.ts || true',
        // Hashed copies of the stylesheet, fonts and scripts, plus the
        // manifest the layout resolves them through. stx serves a hashed
        // filename `immutable` for a year instead of the unvalidated one-hour
        // Cache-Control everything else gets. `|| true` for the same reason:
        // without the manifest the layout just serves the plain paths.
        'bun scripts/build-assets.ts || true',
      ],
      env: {
        HOST: '127.0.0.1',
        APP_ENV: 'production',
        NODE_ENV: 'production',
        APP_NAME: 'chrisbreuer',
        APP_URL: 'chrisbreuer.me',
        APP_KEY: env.APP_KEY || '',
        PORT_API: '3048',
        DB_CONNECTION: 'sqlite',
        DB_DATABASE_PATH: '/var/lib/chrisbreuer/stacks.sqlite',
      },
    },

    // API (bun-router). Intentionally NO `domain`/`path`: the rpx gateway
    // skips domain-less sites, so this stays loopback-only and is reached
    // exclusively through the :3040 app's /api proxy.
    chrisbreuerApi: {
      root: '.',
      // As above: @stacksjs/actions ships the API entry built.
      start: 'bun node_modules/@stacksjs/actions/dist/serve/api.js',
      port: 3048,
      preStart: [
        'bun install',
      ],
      env: {
        HOST: '127.0.0.1',
        APP_ENV: 'production',
        NODE_ENV: 'production',
        APP_NAME: 'chrisbreuer',
        APP_URL: 'chrisbreuer.me',
        APP_KEY: env.APP_KEY || '',
        DB_CONNECTION: 'sqlite',
        DB_DATABASE_PATH: '/var/lib/chrisbreuer/stacks.sqlite',
      },
    },

    // The blog is stx-native now (resources/views/blog.stx + blog/[slug].stx,
    // markdown from content/blog rendered by @stacksjs/ts-md). It is served by
    // the main app at /blog — no separate static BunPress build, no rpx /blog
    // route — so the blog shares the app's layout, theme and SPA routing.

    // www → apex redirect (gateway answers with a 301; nothing is shipped).
    chrisbreuerWww: { domain: 'www.chrisbreuer.me', redirect: 'https://chrisbreuer.me' },
  },
}

// Stacks cloud configuration (for existing Stacks cloud features)
const config: CloudConfig = {
  // Add Stacks-specific cloud config here if needed
}

export default config
