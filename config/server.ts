import type { ServerConfig } from '@stacksjs/types'

/**
 * **Views Server Configuration**
 *
 * Deliberately empty. Both of the knobs that used to be set here are off, and
 * the reasons are worth keeping because both looked like free wins.
 *
 * NOT enabled: `cache.documents`. Rendered pages were served
 * `public, max-age=60, stale-while-revalidate=86400` on the reasoning that
 * nothing here depends on who is asking, so a page the browser already has is
 * still good a minute later. That is true of the page. It is not true of the
 * SPA router's fragments, and the views server applies this policy to those
 * too, overwriting the `private, no-store` that stx asks for by name.
 *
 * A cacheable fragment breaks navigation outright. Every response carries the
 * id of the build that rendered it, and the router compares the id on the
 * document it is running inside against the id on each fragment it fetches; a
 * mismatch means a runtime from one build is about to hydrate markup from
 * another, so it hands the navigation to a full page load instead. A fragment
 * cached before a deploy keeps its old id, so after every deploy the router
 * fetched a stale fragment, disagreed with its own fresh document, and
 * reloaded the page - for as long as that entry lived, which the day-long
 * stale window made a day. Clicking through the nav did a full page load every
 * time, which is exactly what an SPA router exists to avoid.
 *
 * Little is lost by dropping it. In-site navigation does not fetch documents
 * at all: the router fetches fragments, and it already prefetches them on
 * hover and keeps its own in-memory cache, which is what makes a navigation
 * here cost about 20ms. The HTTP cache only ever helped a hard reload. The
 * other half of its job, cushioning a restart so a deploy could not answer a
 * navigation with ERR_EMPTY_RESPONSE, is now done properly upstream: the
 * release binds in under a second and the health gate holds the cutover until
 * it answers, measured at 0 failures across 410 requests.
 *
 * NOT enabled: `cache.renders` (and therefore `cache.prewarm`, which requires
 * it). The render cache keys on the full request, including the cookie header,
 * and the store is an unbounded Map, so with a per-visitor CSRF cookie it
 * keeps one copy of every page per visitor. Measured on this site: 400
 * distinct visitors on a single page took the process from 96 MB to 201 MB. On
 * a shared box that ends in an OOM, a restart, and the empty responses the
 * cache was meant to prevent. Revisit if stx grows a bounded store or a vary
 * mode that ignores cookies without also collapsing dynamic routes
 * (`renderVary: 'source'` keys on the template path alone, which would serve
 * one blog post for every slug).
 */
export default {
} satisfies ServerConfig
