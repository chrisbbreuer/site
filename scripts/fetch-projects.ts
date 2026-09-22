/**
 * Regenerates content/projects.json from GitHub: every public, non-fork,
 * non-archived repo across my account and the orgs I'm a member of.
 * Requires an authenticated `gh` CLI. Run: bun scripts/fetch-projects.ts
 *
 * Curation happens HERE, not in the JSON: hand-edits to projects.json get
 * overwritten on the next run, so removals go in EXCLUDE and forks or other
 * repos the filters would drop go in PINNED.
 */
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Repo {
  name: string
  org: string
  description: string
  stars: number
  url: string
  tags: string[]
  /** npm downloads in the last 30 days. Absent when the repo publishes nothing. */
  downloads?: number
  /** The npm package the downloads belong to, for the tooltip on the page. */
  pkg?: string
}

/**
 * Canonical display labels for the GitHub languages + topics worth filtering
 * by. Only mapped values become tags, so noise topics (repo names, "awesome",
 * one-offs) are dropped and the chip vocabulary stays curated and consistent.
 * The primary language is fed through the same map as a topic.
 */
const TAG_LABELS: Record<string, string> = {
  // languages
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  vue: 'Vue',
  react: 'React',
  zig: 'Zig',
  rust: 'Rust',
  go: 'Go',
  python: 'Python',
  php: 'PHP',
  swift: 'Swift',
  ruby: 'Ruby',
  shell: 'Shell',
  // runtimes
  bun: 'Bun',
  node: 'Node',
  nodejs: 'Node',
  deno: 'Deno',
  // categories
  cli: 'CLI',
  library: 'Library',
  framework: 'Framework',
  orm: 'ORM',
  api: 'API',
  database: 'Database',
  config: 'Config',
  configuration: 'Config',
  fonts: 'Fonts',
  font: 'Fonts',
  ai: 'AI',
  llm: 'AI',
  laravel: 'Laravel',
  'templating-engine': 'Templating',
  templating: 'Templating',
  components: 'Components',
  css: 'CSS',
  desktop: 'Desktop',
  mobile: 'Mobile',
  macos: 'macOS',
  cloud: 'Cloud',
  proxy: 'Proxy',
  'reverse-proxy': 'Proxy',
  tunnel: 'Tunneling',
  tunneling: 'Tunneling',
  testing: 'Testing',
  linter: 'Linting',
  linting: 'Linting',
  eslint: 'Linting',
  payments: 'Payments',
  auth: 'Auth',
  authentication: 'Auth',
  queue: 'Queue',
  cache: 'Cache',
  security: 'Security',
}

/** Curated tags for a repo, language first, then topics; deduped by label. */
function tagsFor(language: string | null | undefined, topics: string[] = []): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const raw of [language, ...topics]) {
    if (!raw)
      continue
    const label = TAG_LABELS[raw.toLowerCase()]
    if (label && !seen.has(label)) {
      seen.add(label)
      out.push(label)
    }
  }
  return out
}

/**
 * Org display order; anything not listed lands at the end alphabetically.
 *
 * This doubles as the owner list when `user/orgs` is unreachable — which is
 * the case in CI under GITHUB_TOKEN — so an org missing from here is an org
 * whose repos silently vanish from the page. The sanity check in
 * .github/workflows/projects-sync.yml refuses a result that drops orgs, so a
 * new org shows up as a failed sync rather than a quietly shorter list.
 */
const ORG_ORDER = [
  'stacksjs',
  'chrisbbreuer',
  'zig-utils',
  'meemalabs',
  'ow3org',
  'home-lang',
  'pickier',
  'cwcss',
  'pantry-pm',
  'den-shell',
  'mail-os',
  'clappsh',
  'bughq',
  'national-park-service',
  'ci-on',
  'craft-native',
  'loghqorg',
  'ReportsHQ',
  'ReviewOS',
  'theopenfarm',
]

/**
 * Repos that must NOT come back on regeneration (hand-removed 2026-07-12).
 * Delete a line to let the repo sync back in.
 */
const EXCLUDE = new Set([
  'ci-on/eslint-example',
  'ci-on/laravel-cloudflare',
  'ci-on/laravel-inspirational-quotes',
  'ci-on/laravel-log-reader',
  'home-lang/generals',
  'meemalabs/flysystem-meema',
  'meemalabs/laravel-meema',
  'meemalabs/meema-client-php',
  'meemalabs/meema-elements',
  'meemalabs/react-meema',
  'meemalabs/renovate-config',
  'meemalabs/statamic-plugin',
  'meemalabs/vue-meema',
  'meemalabs/wordpress-plugin',
  'ow3org/cardano-stake-pool-aws',
  'ow3org/vue-starter',
  'stacksjs/bun-vue',
  'stacksjs/post',
])

/**
 * Repos to include even when the automatic filters would drop them
 * (forks, missing descriptions). Optional description override.
 */
const PINNED: { fullName: string, description?: string }[] = [
  { fullName: 'chrisbbreuer/dotfiles', description: 'My dotfiles. Get started with your own.' },
]

/** Strip emoji and pictographs; the page is intentionally plain text. */
function stripEmoji(text: string): string {
  return text
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\u{FE0F}\u{200D}\u{20E3}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function gh(path: string): any {
  try {
    return JSON.parse(execSync(`gh api "${path}" 2>/dev/null`, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }))
  }
  catch {
    return []
  }
}

// `gh api user` and `user/orgs` need a token that represents a person. The
// daily sync in CI may only have GITHUB_TOKEN, which represents the repo and
// answers 403 to both — so fall back to the owners we already list by name
// rather than silently regenerating an empty file.
let me = 'chrisbbreuer'
try {
  me = execSync('gh api user --jq .login 2>/dev/null', { encoding: 'utf8' }).trim() || me
}
catch {}
const orgs: string[] = gh('user/orgs?per_page=100').map((o: any) => o.login)
const owners = orgs.length > 0 ? [...orgs, me] : ORG_ORDER

const repos: Repo[] = []
for (const owner of owners) {
  const isUser = owner === me
  const list = gh(`${isUser ? 'users' : 'orgs'}/${owner}/repos?per_page=100&type=${isUser ? 'owner' : 'public'}`)
  for (const r of list) {
    if (EXCLUDE.has(r.full_name))
      continue
    if (r.fork || r.archived || r.private)
      continue
    if (!r.description) // a bare list needs a one-liner; undocumented repos are noise
      continue
    if (r.name === '.github' || r.name === owner) // org meta / profile readmes
      continue
    repos.push({
      name: r.name,
      org: owner,
      description: stripEmoji(r.description),
      stars: r.stargazers_count,
      url: r.html_url,
      tags: tagsFor(r.language, r.topics),
    })
  }
}

for (const pin of PINNED) {
  if (repos.some(r => `${r.org}/${r.name}` === pin.fullName))
    continue
  const r = gh(`repos/${pin.fullName}`)
  if (!r || !r.full_name)
    continue
  repos.push({
    name: r.name,
    org: r.owner.login,
    description: stripEmoji(pin.description || r.description || ''),
    stars: r.stargazers_count,
    url: r.html_url,
    tags: tagsFor(r.language, r.topics),
  })
}

/**
 * One registry request, retried through the throttling npm does under load.
 *
 * Without this the failures are invisible: a 429 turns into "this package does
 * not exist", the repo silently loses its download count, and the number of
 * rows carrying one changes run to run. Every give-up is counted so the run can
 * say so at the end rather than quietly publishing a shorter list.
 */
let lookupFailures = 0
async function registryJson(url: string): Promise<any | null> {
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok)
        return await res.json()
      // A real "no such package" answer, not congestion — do not retry it.
      if (res.status === 404)
        return null
    }
    catch {
      // Network error; treated the same as congestion.
    }
    await new Promise(resolve => setTimeout(resolve, 400 * 2 ** attempt))
  }
  lookupFailures++
  return null
}

/** Downloads in the last 30 days, or null if npm has never heard of it. */
async function monthlyDownloads(pkg: string): Promise<number | null> {
  const body = await registryJson(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg)}`)
  return typeof body?.downloads === 'number' ? body.downloads : null
}

/** The repo npm itself says a package is published from, as `owner/name`. */
async function registryRepo(pkg: string): Promise<string | null> {
  const body = await registryJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`)
  const repository = body?.repository
  const url = typeof repository === 'string' ? repository : repository?.url
  if (!url)
    return null
  const match = url.match(/github\.com[/:]([^/]+)\/([^/.]+)/i)
  return match ? `${match[1]}/${match[2]}` : null
}

/**
 * Downloads of the package a repo is named for — `bunfig` for stacksjs/bunfig,
 * `@stacksjs/stx` for stacksjs/stx — confirmed against the registry's own
 * record of where that package is published from.
 *
 * Two earlier shapes of this were worse. Reading the root package.json missed
 * every monorepo, because their roots are private and the real package lives in
 * `packages/<name>`. Crawling workspaces through the GitHub contents API fixed
 * that and introduced two new problems: it needed ~700 API calls, which
 * exhausted the hourly limit mid-run and produced a silently empty file, and it
 * credited the same @stacksjs/* packages to both `stacks` and `projects`, which
 * vendor the whole set — ~3.2M downloads counted twice.
 *
 * So: one package per repo, the eponymous one, verified. It is the number a
 * reader expects to see next to a repo name, it costs two registry calls and no
 * GitHub quota, and it cannot double-count. A monorepo's other packages are not
 * summed in — that would answer a different question than the one the row asks.
 */
async function attachDownloads(list: Repo[]): Promise<void> {
  const queue = [...list]
  const workers = Array.from({ length: 2 }, async () => {
    for (let repo = queue.shift(); repo; repo = queue.shift()) {
      const full = `${repo.org}/${repo.name}`.toLowerCase()
      for (const candidate of [repo.name, `@${repo.org}/${repo.name}`, `@stacksjs/${repo.name}`]) {
        const owner = await registryRepo(candidate)
        if (!owner || owner.toLowerCase() !== full)
          continue
        const downloads = await monthlyDownloads(candidate)
        if (downloads === null)
          continue
        repo.pkg = candidate
        repo.downloads = downloads
        break
      }
    }
  })
  await Promise.all(workers)
}

await attachDownloads(repos)

// Group per org, stars-descending inside each group; orgs by ORG_ORDER.
repos.sort((a, b) => {
  const ai = ORG_ORDER.indexOf(a.org)
  const bi = ORG_ORDER.indexOf(b.org)
  const ar = ai === -1 ? ORG_ORDER.length : ai
  const br = bi === -1 ? ORG_ORDER.length : bi
  if (ar !== br)
    return ar - br
  if (a.org !== b.org)
    return a.org.localeCompare(b.org)
  return b.stars - a.stars || a.name.localeCompare(b.name)
})

const out = join(import.meta.dir, '../content/projects.json')
writeFileSync(out, `${JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), repos }, null, 2)}\n`)
const published = repos.filter(r => r.downloads !== undefined)
console.log(`Wrote ${repos.length} repos from ${new Set(repos.map(r => r.org)).size} orgs to content/projects.json`)
console.log(`${published.length} publish to npm, ${published.reduce((n, r) => n + (r.downloads || 0), 0).toLocaleString()} downloads in the last 30 days`)
if (lookupFailures > 0)
  console.warn(`${lookupFailures} registry lookup(s) gave up after retrying — some counts may be missing`)
