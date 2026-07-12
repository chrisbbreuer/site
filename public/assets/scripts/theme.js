/*
 * Pre-paint theme resolution for the stx pages. Shares the `stacks-blog-theme`
 * localStorage key with the /blog pages so one choice follows the visitor
 * across the whole site. Falls back to prefers-color-scheme.
 * Loaded WITHOUT defer so the theme lands before first paint.
 */
(() => {
  const ok = theme => theme === 'light' || theme === 'dark'

  const preferred = () => {
    let saved = ''
    try {
      saved = localStorage.getItem('stacks-blog-theme') || ''
    }
    catch {}
    if (ok(saved))
      return saved
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  document.documentElement.setAttribute('data-theme', preferred())

  window.siteTheme = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem('stacks-blog-theme', next)
    }
    catch {}
    document.documentElement.setAttribute('data-theme', next)
  }
})()
