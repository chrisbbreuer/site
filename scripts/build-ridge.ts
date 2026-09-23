/**
 * Regenerates the ridgeline in resources/views/partials/footer.stx.
 *
 * The footer rule is a real elevation profile of the San Gabriel Mountains
 * crest, west to east, Newhall Pass to the Lytle Creek end, with Mount Baldy
 * as the high point. It is built here rather than drawn by hand:
 *
 *   1. GUIDE is a coarse polyline following the range's high divide. It only
 *      has to be near the crest.
 *   2. Every quarter mile along it, sample a transect run perpendicular to the
 *      crest and keep the highest point. That finds the ridge wherever it
 *      actually runs, which hand-typed summit coordinates do not: the front
 *      range packs Lowe, Markham, San Gabriel and Disappointment within a
 *      kilometre of each other, and a naive local-max search collapses them.
 *   3. Generalise for a line drawn 32 units tall, a narrow Gaussian to drop
 *      DEM speckle that would read as noise, then Douglas-Peucker to keep the
 *      byte count sane for something inlined on every page.
 *
 * Elevations come from the USGS 3DEP 1/3 arc-second (10 m) DEM, via
 * api.opentopodata.org, a public endpoint, 100 points per request and one
 * request a second, which is why a full run takes about a minute.
 *
 * Usage: bun scripts/build-ridge.ts [--write]
 *   Without --write it prints the path and leaves the partial alone.
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'

const FT_PER_M = 3.28084
const PARTIAL = 'resources/views/partials/footer.stx'
const PEAKS = 'content/ridge-peaks.json'
const PROFILE = 'content/ridge-profile.json'

// Width and vertical bounds of the generated path, in viewBox units.
const W = 1200
const TOP = 2
const BOT = 30

const STATIONS = 420 // samples along the crest (~0.15 mi apart)
const TRANSECT_M = 1200 // half-width of each perpendicular transect, metres
const TRANSECT_N = 17 // samples across a transect
const SMOOTH_SIGMA = 0.8 // Gaussian width, in stations
const RDP_EPSILON = 0.16 // Douglas-Peucker tolerance, in viewBox units

/**
 * Coarse guide along the range's high divide, west to east.
 *
 * `ft` is the published summit elevation, not a sampled one: the DEM is what
 * draws the line, but a tooltip should say what the USGS quad says. `label`
 * marks the features worth naming on hover - enough to tell you where on the
 * range you are, few enough that each one still has room to be hovered.
 */
interface GuidePoint {
  lat: number
  lon: number
  /** What this point is, for the reader of this file. */
  note: string
  /** Display name, when this point is labelled. */
  name?: string
  /** Published elevation in feet. */
  ft?: number
  label?: boolean
  /** A pass or saddle: snap it to a dip in the line rather than a summit. */
  low?: boolean
}

const GUIDE: GuidePoint[] = [
  { lat: 34.3250, lon: -118.4350, note: 'west end', name: 'Newhall Pass', ft: 1500, low: true, label: true },
  { lat: 34.3450, lon: -118.3450, note: 'Magic Mountain / western San Gabriels' },
  { lat: 34.3800, lon: -118.2160, note: 'Mill Creek Summit' },
  { lat: 34.3764, lon: -118.1774, note: 'Mount Gleason', name: 'Mount Gleason', ft: 6502, label: true },
  { lat: 34.3718, lon: -118.0733, note: 'Mount Pacifico' },
  { lat: 34.3560, lon: -118.0300, note: 'Mount Hillyer / Chilao' },
  { lat: 34.3367, lon: -117.9369, note: 'Mount Waterman', name: 'Mount Waterman', ft: 8038, label: true },
  { lat: 34.3379, lon: -117.9288, note: 'Twin Peaks / Kratka Ridge', name: 'Twin Peaks', ft: 7761, label: true },
  { lat: 34.3712, lon: -117.8584, note: 'Mount Williamson', name: 'Mount Williamson', ft: 8214, label: true },
  // Mount Islip is deliberately absent. It is a named 8,250 ft summit people
  // know, but it sits on a southern spur above Windy Gap, 2.1 km off the
  // Williamson-to-Throop divide this profile traces (the transect half-width
  // is 1.2 km). Routing the guide through it would drag the line down a side
  // ridge and misdraw the skyline to win one label. The best summit inside
  // its own search box reads 8,100 ft, 150 ft under the published figure,
  // which is the same thing said a second way: that ground is not the crest.
  { lat: 34.3504, lon: -117.7992, note: 'Throop Peak', name: 'Throop Peak', ft: 9138, label: true },
  { lat: 34.3611, lon: -117.7724, note: 'Mount Burnham', name: 'Mount Burnham', ft: 8997, label: true },
  { lat: 34.3583, lon: -117.7647, note: 'Mount Baden-Powell', name: 'Mount Baden-Powell', ft: 9399, label: true },
  { lat: 34.3739, lon: -117.7519, note: 'Vincent Gap', name: 'Vincent Gap', ft: 6565, low: true, label: true },
  { lat: 34.3569, lon: -117.6828, note: 'Blue Ridge / Wright Mountain' },
  { lat: 34.3300, lon: -117.6750, note: 'Guffy / east Blue Ridge' },
  { lat: 34.3030, lon: -117.6360, note: 'Pine Mountain / Dawson Peak', name: 'Pine Mountain', ft: 9648, label: true },
  { lat: 34.2891, lon: -117.6462, note: 'Mount Baldy (San Antonio)', name: 'Mount Baldy', ft: 10064, label: true },
  { lat: 34.2833, lon: -117.6276, note: 'Telegraph Peak', name: 'Telegraph Peak', ft: 8985, label: true },
  { lat: 34.2519, lon: -117.6086, note: 'Icehouse Saddle', name: 'Icehouse Saddle', ft: 7580, low: true, label: true },
  { lat: 34.2228, lon: -117.5853, note: 'Cucamonga Peak', name: 'Cucamonga Peak', ft: 8859, label: true },
  { lat: 34.2080, lon: -117.5450, note: 'Lytle Creek divide' },
  { lat: 34.1900, lon: -117.4850, note: 'east end', name: 'Lytle Creek', ft: 2700, low: true, label: true },
]

const rad = (d: number) => (d * Math.PI) / 180
const metresPerDeg = (lat: number) => ({ lat: 111320, lon: 111320 * Math.cos(rad(lat)) })

function distM(a: [number, number], b: [number, number]): number {
  const m = metresPerDeg((a[0] + b[0]) / 2)
  return Math.hypot((b[1] - a[1]) * m.lon, (b[0] - a[0]) * m.lat)
}

const pts = GUIDE.map(g => [g.lat, g.lon] as [number, number])
const cumulative = [0]
for (let i = 1; i < pts.length; i++) cumulative.push(cumulative[i - 1] + distM(pts[i - 1], pts[i]))
const totalM = cumulative[cumulative.length - 1]

/** Point and unit direction of travel at a given distance along the guide. */
function atDistance(d: number): { p: [number, number], dir: [number, number] } {
  let i = 1
  while (i < cumulative.length - 1 && cumulative[i] < d) i++
  const t = (d - cumulative[i - 1]) / (cumulative[i] - cumulative[i - 1] || 1)
  const a = pts[i - 1]
  const b = pts[i]
  const p: [number, number] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  const m = metresPerDeg(p[0])
  const dx = (b[1] - a[1]) * m.lon
  const dy = (b[0] - a[0]) * m.lat
  const len = Math.hypot(dx, dy) || 1
  return { p, dir: [dx / len, dy / len] }
}

interface Sample { station: number, lat: number, lon: number }

const samples: Sample[] = []
const stationMi: number[] = []
for (let s = 0; s < STATIONS; s++) {
  const d = (totalM * s) / (STATIONS - 1)
  stationMi.push(d / 1609.34)
  const { p, dir } = atDistance(d)
  const m = metresPerDeg(p[0])
  const nx = -dir[1]
  const ny = dir[0]
  for (let k = 0; k < TRANSECT_N; k++) {
    const off = -TRANSECT_M + (2 * TRANSECT_M * k) / (TRANSECT_N - 1)
    samples.push({ station: s, lat: p[0] + (ny * off) / m.lat, lon: p[1] + (nx * off) / m.lon })
  }
}

let lastCall = 0
async function lookup(chunk: Sample[]): Promise<number[]> {
  const locations = chunk.map(s => `${s.lat.toFixed(6)},${s.lon.toFixed(6)}`).join('|')
  for (let attempt = 0; attempt < 6; attempt++) {
    const wait = Math.max(0, 1100 - (Date.now() - lastCall))
    if (wait) await new Promise(r => setTimeout(r, wait))
    lastCall = Date.now()
    try {
      const res = await fetch('https://api.opentopodata.org/v1/ned10m', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locations }),
      })
      if (res.ok) {
        const json = await res.json() as { status: string, results: { elevation: number | null }[] }
        if (json.status === 'OK')
          return json.results.map(r => (r.elevation == null ? Number.NEGATIVE_INFINITY : r.elevation * FT_PER_M))
      }
    }
    catch {}
    await new Promise(r => setTimeout(r, 1500 * (attempt + 1)))
  }
  throw new Error('DEM lookup failed after 6 attempts')
}

function smooth(values: number[], sigma: number): number[] {
  const r = Math.ceil(sigma * 3)
  const kernel: number[] = []
  for (let i = -r; i <= r; i++) kernel.push(Math.exp(-(i * i) / (2 * sigma * sigma)))
  return values.map((_, i) => {
    let sum = 0
    let weight = 0
    for (let j = -r; j <= r; j++) {
      const idx = i + j
      if (idx < 0 || idx >= values.length) continue
      sum += values[idx] * kernel[j + r]
      weight += kernel[j + r]
    }
    return sum / weight
  })
}

function rdp(points: [number, number][], eps: number): [number, number][] {
  if (points.length < 3) return points
  const a = points[0]
  const b = points[points.length - 1]
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  let idx = 0
  let max = 0
  for (let i = 1; i < points.length - 1; i++) {
    const d = Math.abs(dy * points[i][0] - dx * points[i][1] + b[0] * a[1] - b[1] * a[0]) / len
    if (d > max) {
      max = d
      idx = i
    }
  }
  if (max <= eps) return [a, b]
  return [...rdp(points.slice(0, idx + 1), eps).slice(0, -1), ...rdp(points.slice(idx), eps)]
}

/**
 * Write the hover targets for the footer ridge.
 *
 * Each labelled guide point gets its x on the 0-1200 viewBox, and a zone
 * reaching halfway to its neighbours on either side, so the whole line is
 * covered and a pointer anywhere on it names the nearest feature. `at` is
 * where the label sits inside its own zone, which is not the middle: the
 * peaks are not evenly spaced.
 *
 * Pure geometry, so this runs without touching the network.
 */
function writePeaks(): void {
  const labelled = GUIDE
    .map((point, index) => ({ point, x: (cumulative[index] / totalM) * W }))
    .filter((entry): entry is { point: GuidePoint & { name: string, ft: number }, x: number } =>
      Boolean(entry.point.label && entry.point.name && entry.point.ft))

  // Snap each label onto a feature the line actually draws.
  //
  // A guide point sits on the divide, but the profile at that distance is
  // whatever the transect found highest anywhere across the crest, and the two
  // do not have to coincide. Where they did not, a label pointed at a dip:
  // "Wright Mountain 8,505 ft" with its tick planted in a saddle, which is
  // worse than no label at all because it is confidently wrong.
  //
  // The drawn path is the honest source for this, and it is already committed,
  // so the search needs nothing from the network.
  const vertices = readPathVertices()
  const extrema = findExtrema(vertices)
  const heightOf = new Map(vertices.map(vertex => [vertex.x, vertex.y]))

  const used = new Set<number>()
  let floor = -1
  const snapped = labelled.map((entry, index) => {
    const previous = labelled[index - 1]
    const next = labelled[index + 1]
    // Never search past halfway to a neighbour.
    //
    // Reaching the whole way looks more generous and is a trap: each label
    // then finds its neighbour's bump slightly closer than its own, takes it,
    // and pushes the next one along. Everything still lands on a turning point
    // and the whole range is off by one, which is worse than an honest gap. It
    // put Wright Mountain at 8,505 ft on the highest point of the line and
    // Baden-Powell below Burnham.
    const reach = Math.min(
      previous ? (entry.x - previous.x) / 2 : W,
      next ? (next.x - entry.x) / 2 : W,
    )
    const wanted = entry.point.low ? extrema.minima : extrema.maxima
    let best: number | null = null
    for (const candidate of wanted) {
      if (used.has(candidate) || candidate < floor) continue
      if (Math.abs(candidate - entry.x) > reach) continue
      if (best === null || Math.abs(candidate - entry.x) < Math.abs(best - entry.x)) best = candidate
    }
    if (best !== null) {
      used.add(best)
      floor = best
    }
    return { point: entry.point, x: best, guideX: entry.x }
  })

  // A feature the generalised line does not draw gets no label. Blue Ridge is
  // the case that forced this: a long even climb with no turning point in it,
  // so the only places to put "Wright Mountain 8,505 ft" were a slope or a
  // dip, and both tell the reader something untrue. The neighbouring zones
  // simply widen to cover the ground.
  const missing = snapped.filter(entry => entry.x === null).map(entry => entry.point.name)
  const kept = snapped.filter((entry): entry is typeof entry & { x: number } => entry.x !== null)
  if (missing.length > 0)
    process.stderr.write(`no feature drawn for: ${missing.join(', ')}\n`)

  // The line and the elevations have to tell the same story.
  //
  // A label can sit on a genuine turning point and still be wrong: if it
  // claims more feet than its neighbour it has to sit higher on the line too,
  // and when it does not, one of the two is on the other's bump. That is the
  // failure worth guarding against, because every label still looks right.
  //
  // The guide's coordinates are good enough to trace a ridge and not good
  // enough to be survey marks, so a disagreement is settled by dropping the
  // label whose snap travelled furthest from where the guide put it, then
  // rechecking. Saying less is the price of not saying something false.
  const agreed = [...kept]
  for (;;) {
    // Every pair, not just neighbours. A label can agree with the two labels
    // either side of it and still contradict one further along the line, which
    // is how Telegraph Peak (8,985 ft) once drew higher than Baden-Powell,
    // Throop and Pine Mountain at the same time: it had snapped onto Baldy's
    // shoulder, where the crest really is that high, and its own neighbours
    // were Baldy above and a saddle below, so an adjacent-only check saw
    // nothing wrong. The ordering is a claim about the whole ridge.
    let conflict: { drop: number } | null = null
    for (let i = 0; i < agreed.length && !conflict; i++) {
      for (let k = i + 1; k < agreed.length && !conflict; k++) {
        const a = agreed[i]
        const b = agreed[k]
        const ya = heightOf.get(a.x)
        const yb = heightOf.get(b.x)
        if (ya === undefined || yb === undefined || a.point.ft === b.point.ft) continue
        const aIsHigher = a.point.ft > b.point.ft
        const disagrees = aIsHigher ? ya > yb : yb > ya
        if (!disagrees) continue
        const travelA = Math.abs(a.x - a.guideX)
        const travelB = Math.abs(b.x - b.guideX)
        conflict = { drop: travelA >= travelB ? i : k }
      }
    }
    if (!conflict) break
    process.stderr.write(`dropped ${agreed[conflict.drop].point.name}: the line does not agree it belongs where it landed\n`)
    agreed.splice(conflict.drop, 1)
  }

  const peaks = agreed.map((entry, index) => {
    const previous = agreed[index - 1]
    const next = agreed[index + 1]
    const left = previous ? (previous.x + entry.x) / 2 : 0
    const right = next ? (entry.x + next.x) / 2 : W
    const width = right - left
    return {
      name: entry.point.name,
      ft: entry.point.ft,
      // Formatted here so the template stays a loop and nothing else.
      ftLabel: entry.point.ft.toLocaleString('en-US'),
      // Percentages so the zones scale with the shell, exactly as the line does.
      left: Number(((left / W) * 100).toFixed(3)),
      width: Number(((width / W) * 100).toFixed(3)),
      at: Number((((entry.x - left) / width) * 100).toFixed(3)),
      // Labels near an edge are anchored to it rather than centred, or they
      // would hang off the side of the page.
      anchor: entry.x / W < 0.12 ? 'start' : entry.x / W > 0.88 ? 'end' : 'center',
    }
  })

  writeFileSync(PEAKS, `${JSON.stringify(peaks, null, 2)}\n`)
  process.stderr.write(`wrote content/ridge-peaks.json, ${peaks.length} labels, each on a turning point the line draws\n`)
}

/** The vertices of the ridge path currently committed in the partial. */
function readPathVertices(): { x: number, y: number }[] {
  const match = readFileSync(PARTIAL, 'utf-8').match(/<path d="([^"]+)"/)
  if (!match) throw new Error(`no <path d="..."> in ${PARTIAL}`)
  return match[1]
    .split(/[ML]/)
    .map(part => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [x, y] = part.split(/\s+/).map(Number)
      return { x, y }
    })
}

/**
 * Turning points in the drawn line.
 *
 * y grows downward, so a summit is a local minimum in y. Endpoints count: the
 * line starts and ends at the range's low ground, which is what the first and
 * last labels name.
 */
function findExtrema(vertices: { x: number, y: number }[]): { maxima: number[], minima: number[] } {
  const maxima: number[] = []
  const minima: number[] = []
  for (let i = 1; i < vertices.length - 1; i++) {
    const { y } = vertices[i]
    const before = vertices[i - 1].y
    const after = vertices[i + 1].y
    if (y <= before && y <= after && (y < before || y < after)) maxima.push(vertices[i].x)
    if (y >= before && y >= after && (y > before || y > after)) minima.push(vertices[i].x)
  }
  minima.push(vertices[0].x, vertices[vertices.length - 1].x)
  return { maxima, minima }
}

writePeaks()

if (process.argv.includes('--peaks-only')) {
  process.stderr.write('--peaks-only: leaving the ridge path alone\n')
  process.exit(0)
}

/**
 * The sampled crest, cached.
 *
 * The DEM costs about a minute and a half of politely rate-limited requests
 * to a public endpoint, and the terrain does not change. Caching what came
 * back means the drawing decisions below, how much to smooth and how hard to
 * simplify, can be tuned without asking for it again, and means anyone can
 * redraw the line from a clean checkout with no network at all. `--resample`
 * goes back to the DEM.
 */
interface CachedProfile { stations: number, guide: string, miMax: number, crestFt: number[] }

// The cache is only valid for the guide it was sampled along. Keying on the
// station count alone meant moving a waypoint silently reused elevations from
// the old route, which is the kind of stale that looks like a working script.
const guideFingerprint = createHash('sha256')
  .update(GUIDE.map(g => `${g.lat},${g.lon}`).join(';'))
  .digest('hex')
  .slice(0, 12)

let crestFt: number[]
const cached: CachedProfile | null = existsSync(PROFILE) && !process.argv.includes('--resample')
  ? JSON.parse(readFileSync(PROFILE, 'utf-8'))
  : null

if (cached && cached.stations === STATIONS && cached.guide === guideFingerprint) {
  crestFt = cached.crestFt
  process.stderr.write(`using the cached profile: ${crestFt.length} stations (--resample to refetch)\n`)
}
else {
  if (cached) process.stderr.write(`cached profile is for a different guide or station count: resampling\n`)
  process.stderr.write(`Sampling ${samples.length} DEM points over ${(totalM / 1609.34).toFixed(0)} mi of crest…\n`)
  const elevations: number[] = []
  for (let i = 0; i < samples.length; i += 100) {
    elevations.push(...await lookup(samples.slice(i, i + 100)))
    process.stderr.write(`  ${Math.min(i + 100, samples.length)}/${samples.length}\n`)
  }
  // Crest = the highest point on each transect.
  crestFt = []
  for (let s = 0; s < STATIONS; s++) {
    let best = Number.NEGATIVE_INFINITY
    for (let k = 0; k < TRANSECT_N; k++) best = Math.max(best, elevations[s * TRANSECT_N + k])
    crestFt.push(best)
  }
  writeFileSync(PROFILE, `${JSON.stringify({ stations: STATIONS, guide: guideFingerprint, miMax: stationMi[stationMi.length - 1], crestFt: crestFt.map(ft => Math.round(ft)) }, null, 0)}\n`)
  process.stderr.write(`cached the profile to ${PROFILE}\n`)
}

const generalised = smooth(crestFt, SMOOTH_SIGMA)
const lo = Math.min(...generalised)
const hi = Math.max(...generalised)
const miMax = stationMi[stationMi.length - 1]
const raw = generalised.map((ft, i) => [
  (stationMi[i] / miMax) * W,
  BOT - ((ft - lo) / (hi - lo)) * (BOT - TOP),
] as [number, number])

const simplified = rdp(raw, RDP_EPSILON)
const d = simplified.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')

const summit = crestFt.indexOf(Math.max(...crestFt))
console.error(`\n${simplified.length} points, ${d.length} bytes`)
console.error(`profile ${Math.round(lo)}-${Math.round(hi)} ft over ${miMax.toFixed(0)} mi`)
console.error(`summit ${Math.round(crestFt[summit])} ft at mi ${stationMi[summit].toFixed(1)} (Mount Baldy is 10,064 ft)`)

if (process.argv.includes('--write')) {
  if (!existsSync(PARTIAL)) throw new Error(`${PARTIAL} not found, run from the project root`)
  const before = readFileSync(PARTIAL, 'utf-8')
  const after = before.replace(/(<path d=")[^"]*(")/, `$1${d}$2`)
  if (after === before) throw new Error(`No <path d="…"> found in ${PARTIAL}`)
  writeFileSync(PARTIAL, after)
  console.error(`\nwrote ${PARTIAL}`)
}
else {
  console.log(d)
}
