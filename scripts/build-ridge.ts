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

// Width and vertical bounds of the generated path, in viewBox units.
const W = 1200
const TOP = 2
const BOT = 30

const STATIONS = 260 // samples along the crest (~0.25 mi apart)
const TRANSECT_M = 1200 // half-width of each perpendicular transect, metres
const TRANSECT_N = 17 // samples across a transect
const SMOOTH_SIGMA = 1.3 // Gaussian width, in stations
const RDP_EPSILON = 0.16 // Douglas-Peucker tolerance, in viewBox units

/** Coarse guide along the range's high divide, west to east. */
const GUIDE: [number, number, string][] = [
  [34.3250, -118.4350, 'west end (Newhall Pass)'],
  [34.3450, -118.3450, 'Magic Mountain / western San Gabriels'],
  [34.3800, -118.2160, 'Mill Creek Summit'],
  [34.3766, -118.1776, 'Mount Gleason'],
  [34.3700, -118.1100, 'Mount Pacifico'],
  [34.3560, -118.0300, 'Mount Hillyer / Chilao'],
  [34.3443, -117.9317, 'Mount Waterman'],
  [34.3330, -117.9100, 'Twin Peaks / Kratka Ridge'],
  [34.3520, -117.8760, 'Mount Williamson'],
  [34.3490, -117.8500, 'Mount Islip / Windy Gap'],
  [34.3500, -117.8230, 'Throop Peak'],
  [34.3560, -117.8050, 'Mount Burnham'],
  [34.3583, -117.7625, 'Mount Baden-Powell'],
  [34.3739, -117.7519, 'Vincent Gap'],
  [34.3500, -117.7100, 'Blue Ridge / Wright Mountain'],
  [34.3300, -117.6750, 'Guffy / east Blue Ridge'],
  [34.3100, -117.6400, 'Pine Mountain / Dawson Peak'],
  [34.2889, -117.6464, 'Mount Baldy (San Antonio)'],
  [34.2720, -117.6240, 'Telegraph Peak'],
  [34.2519, -117.6086, 'Icehouse Saddle'],
  [34.2244, -117.5983, 'Cucamonga Peak'],
  [34.2080, -117.5450, 'Lytle Creek divide'],
  [34.1900, -117.4850, 'east end (Lytle Creek mouth)'],
]

const rad = (d: number) => (d * Math.PI) / 180
const metresPerDeg = (lat: number) => ({ lat: 111320, lon: 111320 * Math.cos(rad(lat)) })

function distM(a: [number, number], b: [number, number]): number {
  const m = metresPerDeg((a[0] + b[0]) / 2)
  return Math.hypot((b[1] - a[1]) * m.lon, (b[0] - a[0]) * m.lat)
}

const pts = GUIDE.map(g => [g[0], g[1]] as [number, number])
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
