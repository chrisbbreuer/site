/**
 * Fingerprints the site's own static assets so they can be cached forever.
 *
 * stx decides a static file's Cache-Control from its *name*: a filename
 * carrying an 8+ hex-digit hash before the extension is served
 * `max-age=31536000, immutable`, and everything else gets `max-age=3600` with
 * no ETag and no Last-Modified. No validator means an expired asset is not
 * revalidated, it is re-downloaded in full, so today every returning visitor
 * pulls the stylesheet, the fonts and five scripts again every hour, about
 * 130 KB, for bytes they already have.
 *
 * So each asset is copied to `<name>.<hash>.<ext>` and a manifest is written to
 * `content/assets.json`. The layout looks each path up and falls back to the
 * original when the manifest is missing, which is what keeps `buddy dev`
 * working without running this first.
 *
 * Order matters: fonts are hashed before the stylesheet, because the stylesheet
 * has to point at the hashed fonts before its own hash is taken.
 *
 * Run: bun scripts/build-assets.ts
 * Also runs on every deploy (see `preStart` in config/cloud.ts).
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import process from 'node:process'

const root = join(import.meta.dir, '..')
const pub = join(root, 'public')

/** 12 hex digits, comfortably past the 8 stx needs, still short in a URL. */
const hash = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex').slice(0, 12)

const manifest: Record<string, string> = {}

/** Drop earlier fingerprinted copies so public/ does not accumulate them. */
function clearOld(urlPath: string): void {
  const dir = join(pub, dirname(urlPath))
  if (!existsSync(dir)) return
  const ext = extname(urlPath)
  const base = urlPath.split('/').pop()!.slice(0, -ext.length)
  const re = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.[0-9a-f]{8,}${ext.replace('.', '\\.')}$`)
  for (const f of readdirSync(dir)) {
    if (re.test(f)) rmSync(join(dir, f))
  }
}

/** Write `<name>.<hash><ext>` next to the original and record it. */
function fingerprint(urlPath: string, contents?: Buffer | string): string | null {
  const source = join(pub, urlPath)
  if (contents === undefined && !existsSync(source)) {
    process.stderr.write(`  skip (missing): ${urlPath}\n`)
    return null
  }
  const bytes = contents ?? readFileSync(source)
  clearOld(urlPath)
  const ext = extname(urlPath)
  const hashed = `${urlPath.slice(0, -ext.length)}.${hash(bytes)}${ext}`
  const target = join(pub, hashed)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, bytes)
  // Keep the original too: it is the fallback the layout uses when this has
  // not run, and it is what the next run reads to compute the hash.
  if (contents !== undefined) writeFileSync(source, bytes)
  manifest[`/${urlPath}`] = `/${hashed}`
  return `/${hashed}`
}

// 1. Fonts first, the stylesheet points at them.
const fonts = ['fonts/lilex/Lilex-var.woff2', 'fonts/lilex/Lilex-Italic-var.woff2']
const fontMap = new Map<string, string>()
for (const f of fonts) {
  const hashed = fingerprint(f)
  if (hashed) fontMap.set(`/${f}`, hashed)
}

// 2. Stylesheet, with its font URLs rewritten to the hashed ones.
if (existsSync(join(pub, 'site.css'))) {
  let css = readFileSync(join(pub, 'site.css'), 'utf-8')
  for (const [from, to] of fontMap) css = css.split(from).join(to)
  // Hash the rewritten bytes, but leave public/site.css itself untouched.
  clearOld('site.css')
  const hashed = `site.${hash(css)}.css`
  writeFileSync(join(pub, hashed), css)
  manifest['/site.css'] = `/${hashed}`
}

// 3. Scripts.
const scriptsDir = join(pub, 'assets/scripts')
if (existsSync(scriptsDir)) {
  for (const f of readdirSync(scriptsDir)) {
    // Never fingerprint a fingerprint.
    if (!f.endsWith('.js') || /\.[0-9a-f]{8,}\.js$/.test(f)) continue
    fingerprint(`assets/scripts/${f}`)
  }
}

const out = join(root, 'content/assets.json')
writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`)
process.stdout.write(`wrote content/assets.json, ${Object.keys(manifest).length} assets\n`)
for (const [from, to] of Object.entries(manifest)) process.stdout.write(`  ${from}  ->  ${to}\n`)
