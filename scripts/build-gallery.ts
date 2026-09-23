/**
 * Rebuilds public/images/gallery + content/gallery.json from a folder of
 * source photos. Everything is homegrown: decoding, resizing, format choice,
 * and the SplatHash placeholder all come from ts-images.
 *
 * For each source it emits three variants: `sm` (masonry thumbnail), `lg`
 * (an intermediate) and `xl` (what the lightbox actually shows), each in the
 * smallest of AVIF / WebP that clears a quality gate (falling back to JPEG),
 * plus a 16-byte SplatHash placeholder that the browser paints before any
 * image byte arrives.
 *
 * `xl` exists because `lg` is 1600px, which is about 800 CSS px on a 2x
 * display: opened full screen those looked soft, which is the whole point of
 * opening one.
 *
 * Variants are sized by a width AND a height cap, because the AVIF encoder
 * gives up past roughly 2,300 rows and the library answers that by silently
 * writing a JPEG instead. Sizing on width alone hid this: a 4:3 landscape at
 * 2600px is 1950 rows and encodes, while the same rule on a portrait asks for
 * 3467 rows, fails, and lands a 3.3MB JPEG where a 900KB AVIF was intended.
 * Measured on these photos, AVIF succeeded at 1700x2267 and fell back at
 * 1750x2333. The cap is 2200 rows, just under that, which also happens to be
 * about what a full-screen portrait needs on a 2x display.
 *
 * Alt text comes from content/gallery-captions.json, keyed by source
 * filename, and is written into the manifest so a photo and its description
 * cannot drift apart.
 *
 * Run: bun scripts/build-gallery.ts <source-dir> [--append]
 *
 * `--append` keeps the photos already in the manifest and adds these after
 * them, which is the only safe mode when the originals behind the existing
 * entries are not on this machine. Without it the manifest is rebuilt from
 * the source directory alone, and anything not in there is dropped.
 */
import { execSync } from 'node:child_process'
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { generatePictureSet } from 'ts-images'

const outDir = join(import.meta.dir, '../public/images/gallery')
const manifestPath = join(import.meta.dir, '../content/gallery.json')
const captionsPath = join(import.meta.dir, '../content/gallery-captions.json')
mkdirSync(outDir, { recursive: true })

const append = process.argv.includes('--append')
const positional = process.argv.slice(2).filter(arg => !arg.startsWith('--'))
const sourceDir = positional[0] ?? outDir

/** Alt text by source filename, without its extension. Missing is allowed. */
let captions: Record<string, string> = {}
try {
  captions = JSON.parse(readFileSync(captionsPath, 'utf-8'))
}
catch {
  // A gallery with no captions file still builds, just without alt text.
}
const workDir = join(tmpdir(), `gallery-work-${process.pid}`)
mkdirSync(workDir, { recursive: true })

/** Rows past which the AVIF encoder fails and the library falls back to JPEG. */
const MAX_ROWS = 2200

/**
 * The aspect ratio an image actually displays at, by encoding a tiny copy and
 * measuring that.
 *
 * Asked directly, `sips -g pixelWidth/pixelHeight` reports what is STORED:
 * every one of these photos is 4032x3024 on disk, and the portrait ones are
 * portrait only because of an EXIF orientation flag, which `sips -g
 * orientation` then reports as nil. Deciding the cap on those numbers left
 * portraits uncapped, which is the bug this is here to avoid. ts-images
 * applies the orientation, so ts-images is asked.
 */
async function displayAspect(input: string): Promise<number> {
  const probe = await generatePictureSet({
    input,
    outDir: workDir,
    name: 'probe',
    widths: [{ label: 'probe', width: 64 }],
    formats: ['webp'],
    quality: 40,
    minPsnr: 0,
  })
  const v = probe.variants[0]
  return v.height > 0 ? v.width / v.height : 1
}

/** TEMPORARY: decode HEIC via the OS until ts-heic lands its HEVC decoder. */
function decodeHeicToJpeg(input: string, output: string): void {
  execSync(`sips -s format jpeg "${input}" --out "${output}"`, { stdio: 'pipe' })
}

// Accept any source images (heic/jpeg/png, plus Apple Notes `.dat` exports
// which are jpeg internally, ts-images detects format by magic bytes, not
// extension). Skip our own -sm/-lg outputs so re-running in place is safe.
// Sorted by the first number in the filename so ordering is stable.
const sources = readdirSync(sourceDir)
  .filter(f => /\.(?:heic|jpe?g|png|dat)$/i.test(f) && !/-(?:sm|lg|xl)\./i.test(f))
  .sort((a, b) => {
    const na = Number(a.match(/\d+/)?.[0] ?? 0)
    const nb = Number(b.match(/\d+/)?.[0] ?? 0)
    return na - nb || a.localeCompare(b)
  })

interface Entry {
  sm: string
  lg: string
  xl: string
  alt: string
  width: number
  height: number
  smWidth: number
  smHeight: number
  hash: string
}

// Appending starts numbering after the photos already in the manifest, so the
// existing files on disk keep the names the manifest already points at.
const existing: Entry[] = (() => {
  if (!append) return []
  try {
    return JSON.parse(readFileSync(manifestPath, 'utf-8'))
  }
  catch {
    return []
  }
})()

const manifest: Entry[] = []
let i = existing.length
for (const file of sources) {
  i++
  const n = String(i).padStart(2, '0')
  const name = `note-${n}`
  let input = join(sourceDir, file)

  // Detect format by content, not extension (Apple Notes exports are `.dat`
  // and may be jpeg OR heic). HEIC still decodes via the OS `sips` shim until
  // @stacksjs/ts-heic lands its HEVC decoder; everything else decodes natively.
  const kind = execSync(`file -b --mime-type "${input}"`, { encoding: 'utf8' }).trim()
  if (kind === 'image/heic' || kind === 'image/heif') {
    const jpg = join(workDir, `${n}.jpg`)
    decodeHeicToJpeg(input, jpg)
    input = jpg
  }

  // Ask for the narrower of the variant's width and whatever width keeps the
  // result under MAX_ROWS, so a portrait is bounded by its height the way a
  // landscape is bounded by its width.
  const aspect = await displayAspect(input)
  const widthForRows = Math.floor(MAX_ROWS * aspect)
  const capped = (width: number): number => Math.max(1, Math.min(width, widthForRows))

  const set = await generatePictureSet({
    input,
    outDir,
    name,
    widths: [
      { label: 'sm', width: capped(460) },
      { label: 'lg', width: capped(1600) },
      { label: 'xl', width: capped(2600) },
    ],
    formats: ['avif', 'webp'],
    quality: 72,
    minPsnr: 34,
  })

  const sm = set.variants.find(v => v.label === 'sm')!
  const lg = set.variants.find(v => v.label === 'lg')!
  const xl = set.variants.find(v => v.label === 'xl') ?? lg
  const key = file.replace(/\.[^.]+$/, '')
  const alt = captions[key] ?? ''
  if (!alt)
    console.warn(`  no caption for ${key}: add one to content/gallery-captions.json`)
  manifest.push({
    sm: `/images/gallery/${sm.path.split('/').pop()}`,
    lg: `/images/gallery/${lg.path.split('/').pop()}`,
    xl: `/images/gallery/${xl.path.split('/').pop()}`,
    alt,
    width: lg.width,
    height: lg.height,
    smWidth: sm.width,
    smHeight: sm.height,
    hash: set.splatHash,
  })
  console.log(`${name}: sm ${sm.format} ${(sm.size / 1024).toFixed(1)}KB (${sm.psnr.toFixed(0)}dB) · lg ${lg.format} ${(lg.size / 1024).toFixed(1)}KB · xl ${xl.format} ${(xl.size / 1024).toFixed(1)}KB`)
}

// Drop the old single-size note-NN.jpg files now that variants exist. Only on
// a full rebuild: appending must not touch files the existing entries point at.
if (!append) {
  for (const file of readdirSync(outDir)) {
    if (/^note-\d+\.j(?:pe?)g$/i.test(file)) rmSync(join(outDir, file))
  }
}

const combined = [...existing, ...manifest]
writeFileSync(manifestPath, `${JSON.stringify(combined, null, 2)}\n`)
rmSync(workDir, { recursive: true, force: true })
console.log(`Wrote ${manifest.length} new photo(s), ${combined.length} total, to content/gallery.json`)
