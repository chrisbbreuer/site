/**
 * Rebuilds public/images/gallery + content/gallery.json from a folder of
 * source photos. Everything is homegrown: decoding, resizing, format choice,
 * and the SplatHash placeholder all come from ts-images.
 *
 * For each source it emits two variants — `sm` (masonry thumbnail) and `lg`
 * (lightbox source) — each in the smallest of AVIF / WebP that clears a
 * quality gate (falling back to JPEG), plus a 16-byte SplatHash placeholder
 * that the browser paints before any image byte arrives.
 *
 * Run: bun scripts/build-gallery.ts [source-dir]
 * With no source-dir it re-optimizes the existing note-*.jpg in the gallery
 * folder in place (handy when the originals aren't on this machine).
 */
import { execSync } from 'node:child_process'
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { generatePictureSet } from 'ts-images'

const outDir = join(import.meta.dir, '../public/images/gallery')
const manifestPath = join(import.meta.dir, '../content/gallery.json')
mkdirSync(outDir, { recursive: true })

const sourceDir = process.argv[2] ?? outDir
const workDir = join(tmpdir(), `gallery-work-${process.pid}`)
mkdirSync(workDir, { recursive: true })

/** TEMPORARY: decode HEIC via the OS until ts-heic lands its HEVC decoder. */
function decodeHeicToJpeg(input: string, output: string): void {
  execSync(`sips -s format jpeg "${input}" --out "${output}"`, { stdio: 'pipe' })
}

// Accept any source images (heic/jpeg/png, plus Apple Notes `.dat` exports
// which are jpeg internally — ts-images detects format by magic bytes, not
// extension). Skip our own -sm/-lg outputs so re-running in place is safe.
// Sorted by the first number in the filename so ordering is stable.
const sources = readdirSync(sourceDir)
  .filter(f => /\.(?:heic|jpe?g|png|dat)$/i.test(f) && !/-(?:sm|lg)\./i.test(f))
  .sort((a, b) => {
    const na = Number(a.match(/\d+/)?.[0] ?? 0)
    const nb = Number(b.match(/\d+/)?.[0] ?? 0)
    return na - nb || a.localeCompare(b)
  })

interface Entry {
  sm: string
  lg: string
  width: number
  height: number
  smWidth: number
  smHeight: number
  hash: string
}

const manifest: Entry[] = []
let i = 0
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

  const set = await generatePictureSet({
    input,
    outDir,
    name,
    widths: [
      { label: 'sm', width: 460 },
      { label: 'lg', width: 1600 },
    ],
    formats: ['avif', 'webp'],
    quality: 72,
    minPsnr: 34,
  })

  const sm = set.variants.find(v => v.label === 'sm')!
  const lg = set.variants.find(v => v.label === 'lg')!
  manifest.push({
    sm: `/images/gallery/${sm.path.split('/').pop()}`,
    lg: `/images/gallery/${lg.path.split('/').pop()}`,
    width: lg.width,
    height: lg.height,
    smWidth: sm.width,
    smHeight: sm.height,
    hash: set.splatHash,
  })
  console.log(`${name}: sm ${sm.format} ${(sm.size / 1024).toFixed(1)}KB (${sm.psnr.toFixed(0)}dB) · lg ${lg.format} ${(lg.size / 1024).toFixed(1)}KB`)
}

// Drop the old single-size note-NN.jpg files now that variants exist.
for (const file of readdirSync(outDir)) {
  if (/^note-\d+\.j(?:pe?)g$/i.test(file)) rmSync(join(outDir, file))
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
rmSync(workDir, { recursive: true, force: true })
console.log(`Wrote ${manifest.length} photos + content/gallery.json`)
