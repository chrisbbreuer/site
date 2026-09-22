import type { ServerConfig } from '@stacksjs/types'

/**
 * **Views Server Configuration**
 *
 * Nothing this site renders depends on who is asking: every page is built from
 * markdown, `content/projects.json` and `content/gallery.json` on disk, and the
 * HTML is byte-identical for every visitor. So a page the browser already has
 * is still good a minute later, and asking the origin again is a wasted round
 * trip — which, from anywhere that is not next door to the box, is most of what
 * a navigation costs.
 *
 * `documents` replaces the default `no-store` on rendered pages. The framework
 * will not apply it to a response that carries a `Set-Cookie`, so a visitor's
 * very first request — the one that mints the `X-CSRF-Token` cookie — stays
 * uncacheable, and every navigation after that is cacheable. `max-age` is kept
 * short because the content genuinely changes under the pages (projects.json
 * resyncs daily); the long `stale-while-revalidate` is the useful half, letting
 * the browser paint from cache and refresh behind the scenes when the origin is
 * slow or restarting.
 *
 * NOT enabled here: `cache.renders` (and therefore `cache.prewarm`, which
 * requires it). The render cache keys on the full request — including the
 * cookie header — and the store is an unbounded Map, so with a per-visitor
 * CSRF cookie it keeps one copy of every page per visitor. Measured on this
 * site: 400 distinct visitors on a single page took the process from 96 MB to
 * 201 MB. On a shared box that ends in an OOM, a restart, and the empty
 * responses the cache was meant to prevent. Revisit if stx grows a bounded
 * store or a vary mode that ignores cookies without also collapsing dynamic
 * routes (`renderVary: 'source'` keys on the template path alone, which would
 * serve one blog post for every slug).
 */
export default {
  cache: {
    documents: {
      maxAge: 60,
      staleWhileRevalidate: 86400,
    },
  },
} satisfies ServerConfig
