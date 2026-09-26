import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdownWithFrontmatter } from '@stacksjs/ts-md'
import { Post } from '@stacksjs/orm'
import { longPostDate } from './post-date'

/**
 * Comments on the markdown blog, stored the Stacks way.
 *
 * Posts are files (content/blog/<slug>.md), but comments go through the `Post`
 * model's `commentable` trait, which keys them to a `posts` row. So each post
 * that has ever been commented on gets a row in `posts`, found by slug and
 * created on the first comment. The markdown stays the source of truth for
 * the post itself: the row only carries the title and date so the comments
 * have something to hang off, and so they read sensibly in the dashboard.
 *
 * Shared by the post page (reads) and Actions/Blog/CommentStoreAction (writes).
 */

export const COMMENT_LIMITS = {
  name: { min: 2, max: 60 },
  email: { max: 254 },
  body: { min: 2, max: 3000 },
  /** More links than this reads as spam, and nobody needs them to reply. */
  links: 2,
} as const

export interface PublicComment {
  id: number
  name: string
  body: string
  date: string
  longDate: string
}

/** A slug safe to put in a path: the same rule the post page applies. */
export function cleanSlug(raw: unknown): string {
  return String(raw ?? '').replace(/[^a-z0-9-]/gi, '')
}

/**
 * The published post's title and date, or null when there is no such post.
 * Only content/blog counts: drafts live in content/drafts and take no comments.
 */
export function publishedPost(slug: string): { title: string, date: string } | null {
  if (!slug)
    return null

  const file = path.join(process.cwd(), 'content/blog', `${slug}.md`)
  if (!fs.existsSync(file))
    return null

  const { data } = parseMarkdownWithFrontmatter(fs.readFileSync(file, 'utf-8'))
  return {
    title: String(data.title || slug),
    date: typeof data.date === 'string' ? data.date : '',
  }
}

/** The `posts` row carrying this slug's comments, if it has one yet. */
export async function postRow(slug: string): Promise<any | null> {
  return (await Post.where('slug', slug).first()) ?? null
}

/** The row for a published post, created on its first comment. */
export async function ensurePostRow(slug: string, post: { title: string, date: string }): Promise<any> {
  const existing = await postRow(slug)
  if (existing)
    return existing

  return await Post.create({
    title: post.title,
    slug,
    status: 'published',
    publishedAt: post.date || undefined,
    content: `Published from content/blog/${slug}.md`,
  })
}

/** Approved comments for a post, oldest first, with only what the page shows. */
export async function approvedComments(slug: string): Promise<PublicComment[]> {
  const row = await postRow(slug)
  if (!row)
    return []

  const rows = await row.approvedComments()
  return rows.map((comment: any) => {
    // created_at is UTC without a zone ("2026-09-26T06:00:52"); the date part
    // is all the page shows, and post-date.ts formats that without a clock.
    const date = String(comment.created_at || '').slice(0, 10)
    return {
      id: Number(comment.id),
      name: String(comment.author_name || 'Someone'),
      body: String(comment.body || ''),
      date,
      longDate: date ? longPostDate(date) : '',
    }
  })
}

export type CommentProblem = 'name' | 'body' | 'email' | 'links'

/** What is wrong with a submission, or null when it can be posted. */
export function commentProblem(input: { name: string, email: string, body: string }): CommentProblem | null {
  const { name, email, body } = input
  if (name.length < COMMENT_LIMITS.name.min || name.length > COMMENT_LIMITS.name.max)
    return 'name'
  if (body.length < COMMENT_LIMITS.body.min || body.length > COMMENT_LIMITS.body.max)
    return 'body'
  if (email && (email.length > COMMENT_LIMITS.email.max || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
    return 'email'
  if ((body.match(/https?:\/\/|www\./gi) || []).length > COMMENT_LIMITS.links)
    return 'links'
  return null
}
