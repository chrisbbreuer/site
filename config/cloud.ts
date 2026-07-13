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
      start: 'bun --conditions development storage/framework/core/buddy/src/cli.ts serve',
      port: 3040,
      preStart: [
        'bun install',
        'mkdir -p /var/lib/chrisbreuer',
        'bun --conditions development storage/framework/core/buddy/src/cli.ts migrate || true',
      ],
      env: {
        HOST: '127.0.0.1',
        APP_ENV: 'production',
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
      start: 'bun --conditions development storage/framework/core/actions/src/serve/api.ts',
      port: 3048,
      preStart: ['bun install'],
      env: {
        HOST: '127.0.0.1',
        APP_ENV: 'production',
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
