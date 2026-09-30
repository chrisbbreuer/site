import type { RequestInstance } from '@stacksjs/types'
import { Action } from '@stacksjs/actions'

/**
 * `GET /api/hq/...` - HQ.training's chart embeds on /wip, through this site.
 *
 * The page points each chart's `api` at /api/hq, so the component's script
 * (`/assets/scripts/hq-*-chart.js`) and its SVG
 * (`/api/embed/{activity|weight}/{token}.svg`) both come through here, and
 * each answer is kept for a day: HQ.training sends no-store, and a day-old
 * chart is fresh enough for a page that draws one square a day.
 *
 * Only this site's own tokens and HQ.training's two chart scripts get
 * through, so it never proxies anyone else's chart. When HQ.training is
 * down, the last good answer is served past its day rather than an error.
 */
const DAY = 24 * 60 * 60
const MAX_ENTRIES = 200

const origin = String(process.env.HQ_ACTIVITY_API || 'https://hq.training').replace(/\/$/, '')
const tokens: Record<string, string> = {
  activity: String(process.env.HQ_ACTIVITY_TOKEN || ''),
  weight: String(process.env.HQ_WEIGHT_TOKEN || ''),
}
const scripts = new Set(['hq-activity-chart.js', 'hq-weight-chart.js'])

interface Entry { body: ArrayBuffer, type: string, fetchedAt: number }
const cache = new Map<string, Entry>()

function reply(entry: Entry): Response {
  const age = Math.floor((Date.now() - entry.fetchedAt) / 1000)
  return new Response(entry.body, {
    headers: {
      'Content-Type': entry.type,
      'Cache-Control': `public, max-age=${Math.max(0, DAY - age)}`,
    },
  })
}

/** The HQ.training path a request maps to, or null when it is not ours to proxy. */
function upstreamPath(request: RequestInstance): string | null {
  const file = String(request.getParam('file') || '')
  const kind = request.getParam('kind')
  if (!kind)
    return scripts.has(file) ? `/assets/scripts/${file}` : null

  const token = tokens[String(kind)]
  return token && file === `${token}.svg` ? `/api/embed/${kind}/${file}` : null
}

export default new Action({
  name: 'HQ.training Embed',
  description: 'Proxy and cache the HQ.training charts on /wip for a day',
  method: 'GET',

  async handle(request: RequestInstance) {
    const path = upstreamPath(request)
    if (!path)
      return new Response('Not found', { status: 404 })

    const url = `${origin}${path}${new URL(request.url).search}`
    const cached = cache.get(url)
    if (cached && Date.now() - cached.fetchedAt < DAY * 1000)
      return reply(cached)

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
      return reply(entry)
    }
    catch {
      return cached ? reply(cached) : new Response('HQ.training is unavailable', { status: 502 })
    }
  },
})
