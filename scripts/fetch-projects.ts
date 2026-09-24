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
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Repo {
  name: string
  org: string
  description: string
  stars: number
  url: string
  tags: string[]
  /**
   * npm downloads in the last 30 days of the repo's main package: the one
   * named after the repo, or the top-level one (see mainPackage). This is the
   * figure on the repo's row. Absent when the repo publishes nothing.
   */
  downloads?: number
  /** The package `downloads` belongs to. */
  pkg?: string
  /**
   * Every package the repo publishes, summed: the main one and all of its
   * subpackages. Only the site-wide totals use this, and they say so.
   */
  allDownloads?: number
  /** How many published packages `allDownloads` covers. */
  pkgCount?: number
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
 * This doubles as the owner list when `user/orgs` is unreachable, which is
 * the case in CI under GITHUB_TOKEN, so an org missing from here is an org
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

/**
 * Normalise dashes a repo description arrived with.
 *
 * These are written on GitHub and rendered here, so they are site copy the
 * moment they land on /projects, and the site sets its own dashes aside. Done
 * at fetch time rather than in the JSON because the JSON is rewritten from the
 * API every day, and an edit to it would last exactly until the next sync.
 *
 * Which mark replaces it depends on the job the dash was doing, because one
 * substitution does not fit all three:
 *
 *   "libraries{em}faster"             joins two words      -> comma
 *   "repairs CI {em} and keeps ..."   joins two clauses    -> comma (a colon
 *                                                            cannot precede "and")
 *   "error tracking {em} PHP SDK"     introduces the rest  -> colon
 *
 * ({em} stands for an em or en dash.) The last is the common shape for a repo
 * description, and a comma there would read as the first item of a list:
 * "SDKs, core, Vue, Nuxt" is four things.
 *
 * Only em (U+2014) and en (U+2013) dashes. A plain hyphen joins a compound
 * ("high-performance", "type-safe") and must survive. The dashes are written
 * as escapes on purpose: a sweep that replaced literal em dashes across the
 * repo once turned this class into a plain hyphen, and every hyphenated word
 * on /projects came out as "high, performance".
 */
function normalizeDashes(text: string): string {
  return text
    // Spaced, followed by a conjunction: the dash was standing in for a comma.
    .replace(/\s+[\u2014\u2013]\s+(?=(?:and|or|but|so|yet|nor)\b)/gi, ', ')
    // Spaced otherwise: the dash was introducing what follows.
    .replace(/\s+[\u2014\u2013]\s+/g, ': ')
    // Unspaced: it was gluing two words together.
    .replace(/\s*[\u2014\u2013]\s*/g, ', ')
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
// answers 403 to both, so fall back to the owners we already list by name
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
      description: normalizeDashes(stripEmoji(r.description)),
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
    description: normalizeDashes(stripEmoji(pin.description || r.description || '')),
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
/** Packages npm still had not answered for after the slow retry pass. */
let unanswered = 0
/** A lookup that gave up: npm never answered, so the package's fate is unknown. */
const GAVE_UP = Symbol('gave up')
type Lookup<T> = T | null | typeof GAVE_UP

async function registryJson(url: string): Promise<Lookup<any>> {
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok)
        return await res.json()
      // A real "no such package" answer, not congestion, do not retry it.
      if (res.status === 404)
        return null
    }
    catch {
      // Network error; treated the same as congestion.
    }
    await new Promise(resolve => setTimeout(resolve, 400 * 2 ** attempt))
  }
  lookupFailures++
  return GAVE_UP
}

/** Downloads in the last 30 days, or null if npm has never heard of it. */
async function monthlyDownloads(pkg: string): Promise<Lookup<number>> {
  const body = await registryJson(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg)}`)
  if (body === GAVE_UP)
    return GAVE_UP
  return typeof body?.downloads === 'number' ? body.downloads : null
}

/**
 * What the registry says about a package's latest version: the repo it is
 * published from, as `owner/name`, and every package it pulls in on install.
 */
async function registryInfo(pkg: string): Promise<Lookup<{ owner: string, deps: string[] }>> {
  const body = await registryJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`)
  if (body === GAVE_UP)
    return GAVE_UP
  const repository = body?.repository
  const url = typeof repository === 'string' ? repository : repository?.url
  const match = url?.match(/github\.com[/:]([^/]+)\/([^/.]+)/i)
  if (!match)
    return null
  const deps = Object.keys({ ...body.dependencies, ...body.peerDependencies, ...body.optionalDependencies })
  return { owner: `${match[1]}/${match[2]}`, deps }
}

/**
 * The package a repo's row is about.
 *
 * A monorepo's subpackages are not the project: stacksjs/stacks publishes
 * `stacks` plus eighty-odd `@stacksjs/*` pieces that installing `stacks`
 * pulls in, and summing them put 3.6M a month on a row whose package does a
 * few thousand a week. So the row takes one package, in this order:
 *
 *   1. the one named after the repo: `stacks`, then `@<org>/<repo>`, then any
 *      scope's `@<scope>/<repo>` (`@stacksjs/stx` for stacksjs/stx);
 *   2. otherwise the most downloaded package that nothing else in the same
 *      repo depends on, the thing people install rather than a piece of it;
 *   3. otherwise the most downloaded package, when everything is a piece of
 *      something (a dependency cycle, say).
 */
function mainPackage(repo: Repo, packages: { name: string, downloads: number, deps: string[] }[]): { name: string, downloads: number } {
  const byName = new Map(packages.map(p => [p.name.toLowerCase(), p]))
  const repoName = repo.name.toLowerCase()
  const named = byName.get(repoName)
    ?? byName.get(`@${repo.org.toLowerCase()}/${repoName}`)
    ?? packages.find(p => p.name.toLowerCase().endsWith(`/${repoName}`))
  if (named)
    return named

  const pulledIn = new Set(packages.flatMap(p => p.deps.filter(d => d !== p.name)))
  const mostDownloaded = (list: typeof packages) => [...list].sort((a, b) => b.downloads - a.downloads || a.name.localeCompare(b.name))[0]
  return mostDownloaded(packages.filter(p => !pulledIn.has(p.name))) ?? mostDownloaded(packages)
}

/**
 * Every npm package name a repo might publish: its root manifest, plus every
 * workspace manifest one level down.
 *
 * Reading only the root was wrong by an order of magnitude. Almost everything
 * here is a monorepo whose root is private and whose real packages live in
 * `packages/<name>` or `storage/framework/core/<name>`, stacks alone ships
 * over eighty. Counting one package per repo reported 3.1M downloads a month
 * when the true figure is several times that.
 *
 * Globs resolve one level deep, which is the shape every one of these repos
 * uses. Negations are skipped and anything more exotic resolves to nothing
 * rather than being guessed at.
 */
function workspacePackages(fullName: string): string[] {
  const names: string[] = []

  const readManifest = (filePath: string): any => {
    const res = gh(`repos/${fullName}/contents/${filePath}`)
    if (!res || !res.content)
      return null
    try {
      return JSON.parse(Buffer.from(res.content, 'base64').toString('utf8'))
    }
    catch {
      return null
    }
  }

  const collect = (manifest: any): void => {
    if (manifest && manifest.private !== true && typeof manifest.name === 'string' && !names.includes(manifest.name))
      names.push(manifest.name)
  }

  const root = readManifest('package.json')
  if (!root)
    return names
  collect(root)

  const globs: string[] = Array.isArray(root.workspaces)
    ? root.workspaces
    : Array.isArray(root.workspaces?.packages) ? root.workspaces.packages : []

  for (const glob of globs) {
    if (glob.startsWith('!'))
      continue

    const dir = glob.replace(/\/\*{1,2}$/, '')
    if (dir === glob)
      continue

    const entries = gh(`repos/${fullName}/contents/${dir}`)
    if (!Array.isArray(entries))
      continue

    for (const entry of entries) {
      if (entry.type !== 'dir')
        continue
      collect(readManifest(`${dir}/${entry.name}/package.json`))
    }
  }

  return names
}

/**
 * Attribute every published package to the repo the registry says it comes
 * from, and sum per repo.
 *
 * The registry decides ownership, not the checkout that happens to contain the
 * file. Several of these repos vendor the whole @stacksjs/* set, and crediting
 * each of them for it counted millions of downloads twice, which is how an
 * earlier version of this produced a number larger than reality while a later
 * one produced a number far smaller.
 */
async function attachDownloads(list: Repo[]): Promise<void> {
  const known = new Map(list.map(repo => [`${repo.org}/${repo.name}`.toLowerCase(), repo]))

  // Which repos list each package, so a throttled "who publishes this?"
  // lookup can still be charged to someone.
  const sources = new Map<string, Repo[]>()
  for (const repo of list) {
    // The repo's own name too, not only what its manifests list: stacks
    // publishes `stacks` from a directory its root workspaces do not cover,
    // so a manifest scan alone never found the package the repo is named for.
    // The registry still decides ownership below, so a same-named package
    // someone else publishes is never credited here.
    const guesses = [repo.name, `@${repo.org}/${repo.name}`].map(name => name.toLowerCase())
    for (const name of new Set([...workspacePackages(`${repo.org}/${repo.name}`), ...guesses]))
      sources.set(name, [...(sources.get(name) ?? []), repo])
  }
  const candidates = new Set(sources.keys())
  console.log(`resolved ${candidates.size} candidate package name(s) across ${list.length} repos`)

  const totals = new Map<Repo, { name: string, downloads: number, deps: string[] }[]>()
  /** Repos with at least one package npm never answered for. */
  const incomplete = new Set<Repo>()
  /**
   * Look one package up and file it under its repo. Answers what became of it:
   * counted or deliberately skipped (`done`), or npm never answered (a repo to
   * blame, or the repos that list it when not even the owner came back).
   */
  async function lookup(pkg: string): Promise<'done' | Repo[]> {
    const info = await registryInfo(pkg)
    if (info === GAVE_UP)
      return sources.get(pkg) ?? []
    if (!info)
      return 'done'

    const repo = known.get(info.owner.toLowerCase())
    if (!repo)
      return 'done'

    const downloads = await monthlyDownloads(pkg)
    if (downloads === GAVE_UP)
      return [repo]
    if (downloads === null)
      return 'done'

    totals.set(repo, [...(totals.get(repo) ?? []), { name: pkg, downloads, deps: info.deps }])
    return 'done'
  }

  const queue = [...candidates]
  const throttled: string[] = []
  // Two at a time. npm throttles a run that asks faster, and a throttled
  // lookup is indistinguishable from "no such package", which silently
  // subtracts a whole repo's downloads from the total.
  const workers = Array.from({ length: 2 }, async () => {
    for (let pkg = queue.shift(); pkg; pkg = queue.shift()) {
      if (await lookup(pkg) !== 'done')
        throttled.push(pkg)
    }
  })
  await Promise.all(workers)

  // Then once more, one at a time with a pause, for whatever npm turned away.
  // A throttled lookup is not a small one: it was `stacks` itself on the run
  // that wrote this, which left the stacks row showing `@stacksjs/stacks` at
  // 113 a month instead of the package the repo is named for.
  if (throttled.length > 0)
    console.log(`retrying ${throttled.length} throttled package(s) one at a time`)
  for (const pkg of throttled) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const result = await lookup(pkg)
    if (result !== 'done') {
      unanswered++
      for (const repo of result)
        incomplete.add(repo)
    }
  }

  for (const [repo, packages] of totals) {
    const main = mainPackage(repo, packages)
    repo.downloads = main.downloads
    repo.pkg = main.name
    repo.allDownloads = packages.reduce((sum, p) => sum + p.downloads, 0)
    repo.pkgCount = packages.length
  }

  const kept = keepCountsLostToThrottling(incomplete, previousCounts())
  if (kept.length > 0)
    console.warn(`kept the last known count for ${kept.length} repo(s) npm throttled: ${kept.join(', ')}`)
}

type Counts = Pick<Repo, 'downloads' | 'pkg' | 'allDownloads' | 'pkgCount'>

/** Yesterday's counts, keyed "org/name", from the file this run replaces. */
function previousCounts(): Map<string, Counts> {
  const file = join(import.meta.dir, '../content/projects.json')
  if (!existsSync(file))
    return new Map()
  try {
    const { repos } = JSON.parse(readFileSync(file, 'utf8')) as { repos: Repo[] }
    return new Map(repos.map(r => [`${r.org}/${r.name}`, { downloads: r.downloads, pkg: r.pkg, allDownloads: r.allDownloads, pkgCount: r.pkgCount }]))
  }
  catch {
    return new Map()
  }
}

/**
 * A throttled lookup is missing data, not a smaller number: summing the
 * packages that did answer under-counts the repo, and that used to publish as
 * a real drop (gitlint went from 124,343 a month to 0 on one run). A repo that
 * npm left incomplete and that came out lower than last time keeps last time's
 * figures until a run gets through. A complete answer always wins, so a real
 * decline still shows the next time npm answers every package.
 *
 * Returns the repos it kept, as "org/name".
 */
function keepCountsLostToThrottling(incomplete: Iterable<Repo>, previous: Map<string, Counts>): string[] {
  const kept: string[] = []
  for (const repo of incomplete) {
    const key = `${repo.org}/${repo.name}`
    const last = previous.get(key)
    // Compared on everything the repo publishes: that is the number a missing
    // package shrinks. A file from before `allDownloads` existed has no such
    // figure, and keeps nothing rather than comparing against the wrong one.
    if (last?.allDownloads === undefined || (repo.allDownloads ?? 0) >= last.allDownloads)
      continue
    repo.downloads = last.downloads
    repo.pkg = last.pkg
    repo.allDownloads = last.allDownloads
    repo.pkgCount = last.pkgCount
    kept.push(key)
  }
  return kept
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
const published = repos.filter(r => r.allDownloads !== undefined)
console.log(`Wrote ${repos.length} repos from ${new Set(repos.map(r => r.org)).size} orgs to content/projects.json`)
const packageTotal = published.reduce((n, r) => n + (r.pkgCount || 1), 0)
console.log(`${published.length} repos publish ${packageTotal} package(s), ${published.reduce((n, r) => n + (r.allDownloads || 0), 0).toLocaleString()} downloads in the last 30 days`)
if (unanswered > 0)
  console.warn(`${unanswered} package(s) npm never answered for, after ${lookupFailures} throttled request(s); a repo they left short keeps its last known count`)
