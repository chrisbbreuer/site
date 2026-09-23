// Word count and reading time for a markdown post, shared by /blog and the
// post page so the two can never disagree.
//
// Counts the words a reader reads: frontmatter, fenced code, link and image
// URLs, HTML tags and markdown punctuation are left out. 230 words a minute is
// a common average for prose read on a screen.

const WORDS_PER_MINUTE = 230

export interface ReadingStats {
  words: number
  minutes: number
  /** e.g. "1,130 words · 5 min read" */
  label: string
}

export function readingStats(markdown: string): ReadingStats {
  const text = markdown
    .replace(/^---\n[\s\S]*?\n---\n?/, '') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images: keep alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links: keep link text
    .replace(/<[^>]+>/g, ' ') // html tags

  const words = (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,-]*/gu) || []).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return {
    words,
    minutes,
    label: `${words.toLocaleString('en-US')} words · ${minutes} min read`,
  }
}
