import type { RequestInstance } from '@stacksjs/types'
import { Action } from '@stacksjs/actions'

/**
 * `GET /api/hq/...` - HQ.training's chart embeds on /wip, through this site.
 *
 * The page points each chart's `api` at /api/hq, so the components' code
 * (`/assets/scripts/*.js`, and the `/assets/elements/*.js` modules a script
 * imports relative to itself) and their SVGs
 * (`/api/embed/{activity|weight}/{token}.svg`) all come through here.
 *
 * A chart is kept for a day: HQ.training sends no-store, and a day-old chart
 * is fresh enough for a page that draws one square a day. Code is kept for
 * an hour, as HQ.training itself says: a loader, its element and the runtime
 * they share are cached separately, and a day apart they could disagree.
 *
 * Only this site's own tokens get through, so it never proxies anyone else's
 * chart, and only plain script names from those two folders. When
 * HQ.training is down, the last good answer is served past its time rather
 * than an error.
 */
const DAY = 24 * 60 * 60
const HOUR = 60 * 60
const MAX_ENTRIES = 200

const origin = String(process.env.HQ_ACTIVITY_API || 'https://hq.training').replace(/\/$/, '')
const tokens: Record<string, string> = {
  activity: String(process.env.HQ_ACTIVITY_TOKEN || ''),
  weight: String(process.env.HQ_WEIGHT_TOKEN || ''),
}
const codeFolders = new Set(['scripts', 'elements'])

interface Entry { body: ArrayBuffer, type: string, fetchedAt: number }
const cache = new Map<string, Entry>()

// Never kept anywhere: Cloudflare gives an answer with no Cache-Control four
// hours in the browser, and a 404 kept that long outlives the reason for it.
function fail(message: string, status: number): Response {
  return new Response(message, { status, headers: { 'Cache-Control': 'no-store' } })
}

function reply(entry: Entry, ttl: number): Response {
  const age = Math.floor((Date.now() - entry.fetchedAt) / 1000)
  return new Response(entry.body, {
    headers: {
      'Content-Type': entry.type,
      'Cache-Control': `public, max-age=${Math.max(0, ttl - age)}`,
    },
  })
}

/** The HQ.training path a request maps to and how long to keep it, or null when it is not ours to proxy. */
function upstream(request: RequestInstance): { path: string, ttl: number } | null {
  const file = String(request.getParam('file') || '')
  const folder = request.getParam('folder')
  if (folder)
    return codeFolders.has(String(folder)) && /^[a-z0-9-]+\.js$/.test(file) ? { path: `/assets/${folder}/${file}`, ttl: HOUR } : null

  const kind = String(request.getParam('kind') || '')
  const token = tokens[kind]
  return token && file === `${token}.svg` ? { path: `/api/embed/${kind}/${file}`, ttl: DAY } : null
}

export default new Action({
  name: 'HQ.training Embed',
  description: 'Proxy and cache the HQ.training charts on /wip',
  method: 'GET',

  async handle(request: RequestInstance) {
    const target = upstream(request)
    if (!target)
      return fail('Not found', 404)

    const { path, ttl } = target
    const url = `${origin}${path}${new URL(request.url).search}`
    const cached = cache.get(url)
    if (cached && Date.now() - cached.fetchedAt < ttl * 1000)
      return reply(cached, ttl)

    try {
      const res = await fetch(url)
      if (!res.ok)
        throw new Error(`HQ.training answered ${res.status}`)

      const entry = {
        body: await res.arrayBuffer(),
        type: res.headers.get('content-type') || 'application/octet-stream',
        fetchedAt: Date.now(),
      }
      // The weight chart asks for its own width, so every viewport is a new
      // URL: keep the newest few hundred, dropping the oldest first.
      cache.delete(url)
      cache.set(url, entry)
      if (cache.size > MAX_ENTRIES)
        cache.delete(cache.keys().next().value!)
      return reply(entry, ttl)
    }
    catch {
      return cached ? reply(cached, ttl) : fail('HQ.training is unavailable', 502)
    }
  },
})
