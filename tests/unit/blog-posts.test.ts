import { describe, expect, it } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { adjacentPosts, blogPosts } from '../../resources/utils/blog-posts'

describe('published blog navigation', () => {
  it('shares parsed frontmatter, excludes drafts, and orders article neighbours', () => {
    const root = mkdtempSync(join(tmpdir(), 'site-blog-'))
    try {
      const directory = join(root, 'content/blog')
      mkdirSync(directory, { recursive: true })
      mkdirSync(join(root, 'content/drafts'))
      writeFileSync(join(directory, 'older.md'), '---\ntitle: "An earlier post: with a colon"\ndate: 2026-09-22\ndescription: Earlier summary\n---\n\nA short post.\n')
      writeFileSync(join(directory, 'newer.md'), '---\ntitle: A newer post\ndate: 2026-10-05\nexcerpt: A reader preview\n---\n\nAnother post.\n')
      writeFileSync(join(root, 'content/drafts/draft.md'), '---\ntitle: A draft\ndate: 2026-10-06\n---\n')
      writeFileSync(join(directory, 'incomplete.md'), 'A file without frontmatter')
      const posts = blogPosts(root)
      expect(posts.map(post => post.slug)).toEqual(['newer', 'older'])
      expect(posts[1]?.title).toBe('An earlier post: with a colon')
      expect(posts[0]?.excerpt).toBe('A reader preview')
      expect(adjacentPosts(posts, 'newer').older?.slug).toBe('older')
      expect(adjacentPosts(posts, 'older').newer?.slug).toBe('newer')
      expect(adjacentPosts(posts, 'missing')).toEqual({ newer: null, older: null })
    }
    finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
