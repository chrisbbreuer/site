/**
 * Regenerates the ridgeline in resources/views/partials/footer.stx.
 *
 * The footer rule is a real elevation profile of the San Gabriel Mountains
 * crest, west to east — Newhall Pass to the Lytle Creek end, with Mount Baldy
 * as the high point. It is built here rather than drawn by hand:
 *
 *   1. GUIDE is a coarse polyline following the range's high divide. It only
 *      has to be near the crest.
 *   2. Every quarter mile along it, sample a transect run perpendicular to the
 *      crest and keep the highest point. That finds the ridge wherever it
 *      actually runs, which hand-typed summit coordinates do not: the front
 *      range packs Lowe, Markham, San Gabriel and Disappointment within a
 *      kilometre of each other, and a naive local-max search collapses them.
 *   3. Generalise for a line drawn 32 units tall — a narrow Gaussian to drop
 *      DEM speckle that would read as noise, then Douglas-Peucker to keep the
 *      byte count sane for something inlined on every page.
 *
 * Elevations come from the USGS 3DEP 1/3 arc-second (10 m) DEM, via
 * api.opentopodata.org — a public endpoint, 100 points per request and one
 * request a second, which is why a full run takes about a minute.
 *
 * Usage: bun scripts/build-ridge.ts [--write]
 *   Without --write it prints the path and leaves the partial alone.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'

const FT_PER_M = 3.28084
const PARTIAL = 'resources/views/partials/footer.stx'
const PEAKS = 'content/ridge-peaks.json'

// Width and vertical bounds of the generated path, in viewBox units.
const W = 1200
const TOP = 2
const BOT = 30

const STATIONS = 260 // samples along the crest (~0.25 mi apart)
const TRANSECT_M = 1200 // half-width of each perpendicular transect, metres
const TRANSECT_N = 17 // samples across a transect
const SMOOTH_SIGMA = 1.3 // Gaussian width, in stations
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
}

const GUIDE: GuidePoint[] = [
  { lat: 34.3250, lon: -118.4350, note: 'west end', name: 'Newhall Pass', ft: 1500, label: true },
  { lat: 34.3450, lon: -118.3450, note: 'Magic Mountain / western San Gabriels' },
  { lat: 34.3800, lon: -118.2160, note: 'Mill Creek Summit' },
  { lat: 34.3766, lon: -118.1776, note: 'Mount Gleason', name: 'Mount Gleason', ft: 6502, label: true },
  { lat: 34.3700, lon: -118.1100, note: 'Mount Pacifico', name: 'Mount Pacifico', ft: 7124, label: true },
  { lat: 34.3560, lon: -118.0300, note: 'Mount Hillyer / Chilao' },
  { lat: 34.3443, lon: -117.9317, note: 'Mount Waterman', name: 'Mount Waterman', ft: 8038, label: true },
  { lat: 34.3330, lon: -117.9100, note: 'Twin Peaks / Kratka Ridge', name: 'Twin Peaks', ft: 7761, label: true },
  { lat: 34.3520, lon: -117.8760, note: 'Mount Williamson', name: 'Mount Williamson', ft: 8214, label: true },
  { lat: 34.3490, lon: -117.8500, note: 'Mount Islip / Windy Gap', name: 'Mount Islip', ft: 8250, label: true },
  { lat: 34.3500, lon: -117.8230, note: 'Throop Peak', name: 'Throop Peak', ft: 9138, label: true },
  { lat: 34.3560, lon: -117.8050, note: 'Mount Burnham', name: 'Mount Burnham', ft: 8997, label: true },
  { lat: 34.3583, lon: -117.7625, note: 'Mount Baden-Powell', name: 'Mount Baden-Powell', ft: 9399, label: true },
  { lat: 34.3739, lon: -117.7519, note: 'Vincent Gap', name: 'Vincent Gap', ft: 6565, label: true },
  { lat: 34.3500, lon: -117.7100, note: 'Blue Ridge / Wright Mountain', name: 'Wright Mountain', ft: 8505, label: true },
  { lat: 34.3300, lon: -117.6750, note: 'Guffy / east Blue Ridge' },
  { lat: 34.3100, lon: -117.6400, note: 'Pine Mountain / Dawson Peak', name: 'Pine Mountain', ft: 9648, label: true },
  { lat: 34.2889, lon: -117.6464, note: 'Mount Baldy (San Antonio)', name: 'Mount Baldy', ft: 10064, label: true },
  { lat: 34.2720, lon: -117.6240, note: 'Telegraph Peak', name: 'Telegraph Peak', ft: 8985, label: true },
  { lat: 34.2519, lon: -117.6086, note: 'Icehouse Saddle', name: 'Icehouse Saddle', ft: 7580, label: true },
  { lat: 34.2244, lon: -117.5983, note: 'Cucamonga Peak', name: 'Cucamonga Peak', ft: 8859, label: true },
  { lat: 34.2080, lon: -117.5450, note: 'Lytle Creek divide' },
  { lat: 34.1900, lon: -117.4850, note: 'east end', name: 'Lytle Creek', ft: 2700, label: true },
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

  const peaks = labelled.map((entry, index) => {
    const previous = labelled[index - 1]
    const next = labelled[index + 1]
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
  process.stderr.write(`wrote content/ridge-peaks.json - ${peaks.length} hover targets\n`)
}

writePeaks()

if (process.argv.includes('--peaks-only')) {
  process.stderr.write('--peaks-only: leaving the ridge path alone\n')
  process.exit(0)
}

console.error(`Sampling ${samples.length} DEM points over ${(totalM / 1609.34).toFixed(0)} mi of crest…`)
const elevations: number[] = []
for (let i = 0; i < samples.length; i += 100) {
  elevations.push(...await lookup(samples.slice(i, i + 100)))
  console.error(`  ${Math.min(i + 100, samples.length)}/${samples.length}`)
}

// Crest = the highest point on each transect.
const crestFt: number[] = []
for (let s = 0; s < STATIONS; s++) {
  let best = Number.NEGATIVE_INFINITY
  for (let k = 0; k < TRANSECT_N; k++) best = Math.max(best, elevations[s * TRANSECT_N + k])
  crestFt.push(best)
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
console.error(`profile ${Math.round(lo)}–${Math.round(hi)} ft over ${miMax.toFixed(0)} mi`)
console.error(`summit ${Math.round(crestFt[summit])} ft at mi ${stationMi[summit].toFixed(1)} (Mount Baldy is 10,064 ft)`)

if (process.argv.includes('--write')) {
  if (!existsSync(PARTIAL)) throw new Error(`${PARTIAL} not found — run from the project root`)
  const before = readFileSync(PARTIAL, 'utf-8')
  const after = before.replace(/(<path d=")[^"]*(")/, `$1${d}$2`)
  if (after === before) throw new Error(`No <path d="…"> found in ${PARTIAL}`)
  writeFileSync(PARTIAL, after)
  console.error(`\nwrote ${PARTIAL}`)
}
else {
  console.log(d)
}
