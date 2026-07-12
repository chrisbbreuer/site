/**
 * Regenerates content/projects.json from GitHub: every public, non-fork,
 * non-archived repo across my account and the orgs I'm a member of.
 * Requires an authenticated `gh` CLI. Run: bun scripts/fetch-projects.ts
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

function gh(path: string): any[] {
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
    if (r.fork || r.archived || r.private)
      continue
    if (!r.description) // a bare list needs a one-liner; undocumented repos are noise
      continue
    if (r.name === '.github' || r.name === owner) // org meta / profile readmes
      continue
    repos.push({
      name: r.name,
      org: owner,
      description: r.description,
      stars: r.stargazers_count,
      url: r.html_url,
    })
  }
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
