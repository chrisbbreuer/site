/**
 * Rebuilds public/images/gallery + content/gallery.json from a folder of
 * source photos (HEIC/JPEG/PNG). Everything is homegrown: optimization is
 * imgx (ts-images). HEIC decoding currently shims through macOS `sips`
 * until @stacksjs/ts-heic lands its HEVC decoder, at which point the shim
 * drops out and this runs anywhere.
 *
 * Run: bun scripts/build-gallery.ts <source-dir>
 */
import { execSync } from 'node:child_process'
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { processImage } from 'ts-images'

const sourceDir = process.argv[2]
if (!sourceDir) {
  console.error('Usage: bun scripts/build-gallery.ts <source-dir>')
  process.exit(1)
}

const outDir = join(import.meta.dir, '../public/images/gallery')
const manifestPath = join(import.meta.dir, '../content/gallery.json')
const workDir = join(tmpdir(), `gallery-work-${process.pid}`)
mkdirSync(outDir, { recursive: true })
mkdirSync(workDir, { recursive: true })

/** TEMPORARY: decode HEIC via the OS until ts-heic can. */
function decodeHeicToJpeg(input: string, output: string): void {
  execSync(`sips -s format jpeg "${input}" --out "${output}"`, { stdio: 'pipe' })
}

function imageSize(file: string): { width: number, height: number } {
  const out = execSync(`sips -g pixelWidth -g pixelHeight "${file}"`, { encoding: 'utf8' })
  const width = Number(out.match(/pixelWidth: (\d+)/)?.[1])
  const height = Number(out.match(/pixelHeight: (\d+)/)?.[1])
  return { width, height }
}

const sources = readdirSync(sourceDir)
  .filter(f => /\.(heic|jpe?g|png|dat)$/i.test(f))
  .sort((a, b) => {
    const na = Number(a.match(/\d+/)?.[0] ?? 0)
    const nb = Number(b.match(/\d+/)?.[0] ?? 0)
    return na - nb || a.localeCompare(b)
  })

const manifest: { src: string, width: number, height: number }[] = []
let i = 0
for (const file of sources) {
  i++
  const n = String(i).padStart(2, '0')
  const sourcePath = join(sourceDir, file)
  const kind = execSync(`file -b --mime-type "${sourcePath}"`, { encoding: 'utf8' }).trim()

  // Normalize everything to a full-size JPEG first (HEIC via the shim).
  let fullJpeg = sourcePath
  if (kind === 'image/heic' || kind === 'image/heif') {
    fullJpeg = join(workDir, `${n}.jpg`)
    decodeHeicToJpeg(sourcePath, fullJpeg)
  }

  const output = join(outDir, `note-${n}.jpg`)
  const result = await processImage({
    input: fullJpeg,
    output,
    quality: 78,
    resize: { width: 700 },
  })

  const { width, height } = imageSize(output)
  manifest.push({ src: `/images/gallery/note-${n}.jpg`, width, height })
  console.log(`note-${n}.jpg ${width}x${height} (${Math.round(result.outputSize / 1024)}KB, saved ${result.savedPercentage.toFixed(0)}%)`)
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
rmSync(workDir, { recursive: true, force: true })
console.log(`Wrote ${manifest.length} photos + content/gallery.json`)
