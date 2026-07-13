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
}

/** Org display order; anything not listed lands at the end alphabetically. */
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

const me = execSync('gh api user --jq .login', { encoding: 'utf8' }).trim()
const orgs: string[] = gh('user/orgs?per_page=100').map((o: any) => o.login)

const repos: Repo[] = []
for (const owner of [...orgs, me]) {
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
  })
}

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
console.log(`Wrote ${repos.length} repos from ${new Set(repos.map(r => r.org)).size} orgs to content/projects.json`)
