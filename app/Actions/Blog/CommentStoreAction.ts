import type { RequestInstance } from '@stacksjs/types'
import { Action } from '@stacksjs/actions'
import { rateLimit, response } from '@stacksjs/router'
import blog from '../../../config/blog'
import { cleanSlug, commentProblem, ensurePostRow, publishedPost } from '../../../resources/utils/blog-comments'

/**
 * `POST /api/blog/{slug}/comments` - a reader's comment on a blog post.
 *
 * The form on the post page works without JavaScript, so a browser submission
 * gets a 303 back to the post: to the new comment when it went up, or to the
 * form with a reason when it did not. A client that asks for JSON gets JSON.
 *
 * Comments publish immediately. What stands between the form and spam is a
 * honeypot field, a per-visitor rate limit, a cap on links, and
 * `buddy comments:delete` on the box for whatever gets through.
 */
export default new Action({
  name: 'Blog Comment Store',
  description: 'Post a reader comment on a blog post',
  method: 'POST',

  async handle(request: RequestInstance) {
    const slug = cleanSlug(request.getParam('slug'))
    const wantsJson = String(request.headers.get('accept') || '').includes('application/json')

    const back = (query: string, anchor: string) => wantsJson
      ? null
      : response.redirect(`/blog/${slug}?comment=${query}#${anchor}`, 303)

    const fail = (reason: string, status: number) =>
      back(reason, 'respond') ?? response.json({ message: reason }, status)

    const post = blog.enableComments ? publishedPost(slug) : null
    if (!post)
      return response.json({ message: 'No such post.' }, 404)

    // A human never sees this field. Anything that fills it in is a bot, and
    // it gets the same answer a person would, so it has nothing to learn from.
    if (String(request.get('website') || '').trim() !== '')
      return back('posted', 'comments') ?? response.json({ message: 'ok' }, 201)

    try {
      await rateLimit('blog-comment', 6).per('hour')
    }
    catch (error) {
      if ((error as { status?: number })?.status === 429)
        return fail('slow', 429)
      throw error
    }

    const name = String(request.get('name') || '').trim()
    const email = String(request.get('email') || '').trim().toLowerCase()
    // Normalised line endings and no runs of blank lines, the page keeps the
    // line breaks the reader typed and nothing more.
    const body = String(request.get('body') || '')
      .replace(/\r\n?/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    const problem = commentProblem({ name, email, body })
    if (problem)
      return fail(problem, 422)

    const row = await ensurePostRow(slug, post)
    const comment = await row.addComment(
      { body, author_name: name, author_email: email || null },
      { status: 'approved' },
    )

    return back('posted', `comment-${comment.id}`)
      ?? response.json({ comment: { id: comment.id, name, body, created_at: comment.created_at } }, 201)
  },
})
