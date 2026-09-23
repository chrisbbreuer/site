import type { ServerConfig } from '@stacksjs/types'

/**
 * **Views Server Configuration**
 *
 * Nothing this site renders depends on who is asking: every page is built from
 * markdown, `content/projects.json` and `content/gallery.json` on disk, and the
 * HTML is byte-identical for every visitor. So a page the browser already has
 * is still good a minute later, and asking the origin again is a wasted round
 * trip, which, from anywhere that is not next door to the box, is most of what
 * a navigation costs.
 *
 * `documents` replaces the default `no-store` on rendered pages. The framework
 * will not apply it to a response that carries a `Set-Cookie`, so a visitor's
 * very first request, the one that mints the `X-CSRF-Token` cookie, stays
 * uncacheable, and every navigation after that is cacheable. `max-age` is kept
 * short because the content genuinely changes under the pages (projects.json
 * resyncs daily); `stale-while-revalidate` is the useful half, letting the
 * browser paint from cache and refresh behind the scenes when the origin is
 * slow or restarting.
 *
 * That stale window is deliberately minutes rather than the day it used to be,
 * because a stale document is not only old, it is from an older BUILD. Every
 * page carries the id of the build that rendered it, and the SPA router
 * compares that id against the one the server returns with each fragment; when
 * they differ it hands the navigation to a full page load, on the grounds that
 * a runtime from one build cannot be trusted to hydrate markup from another.
 * So the stale window doubles as the window in which navigation silently stops
 * being an SPA and starts reloading the page. A restart this site serves
 * through takes about a second, which is what the stale window is actually
 * for; a day of it just bought a day of full page loads after every deploy.
 *
 * NOT enabled here: `cache.renders` (and therefore `cache.prewarm`, which
 * requires it). The render cache keys on the full request, including the
 * cookie header, and the store is an unbounded Map, so with a per-visitor
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
      staleWhileRevalidate: 300,
    },
  },
} satisfies ServerConfig
