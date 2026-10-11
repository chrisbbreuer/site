import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { parseMarkdownWithFrontmatter } from '@stacksjs/ts-md'
import { longPostDate } from './post-date'
import { readingStats } from './reading-stats'

export interface BlogSummary {
  slug: string
  title: string
  date: string
  longDate: string
  excerpt: string
  stats: string
}

/** Only published files belong in previews and article navigation. */
export function blogPosts(root = process.cwd()): BlogSummary[] {
  const directory = join(root, 'content/blog')
  if (!existsSync(directory)) return []

  return readdirSync(directory)
    .filter(file => /^[a-z0-9-]+\.md$/.test(file))
    .flatMap((file) => {
      const markdown = readFileSync(join(directory, file), 'utf8')
      const { data } = parseMarkdownWithFrontmatter(markdown)
      if (typeof data.title !== 'string' || typeof data.date !== 'string'
        || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return []

      return [{
        slug: file.slice(0, -3),
        title: data.title,
        date: data.date,
        longDate: longPostDate(data.date),
        excerpt: typeof data.excerpt === 'string' ? data.excerpt : typeof data.description === 'string' ? data.description : '',
        stats: readingStats(markdown).label,
      }]
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

export function adjacentPosts(posts: BlogSummary[], slug: string): { newer: BlogSummary | null, older: BlogSummary | null } {
  const index = posts.findIndex(post => post.slug === slug)
  return {
    newer: index > 0 ? posts[index - 1] ?? null : null,
    older: index >= 0 ? posts[index + 1] ?? null : null,
  }
}
