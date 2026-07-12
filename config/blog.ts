export interface BlogConfig {
  subdomain: string
  title: string
  description: string
  postsPerPage: number
  enableComments: boolean
  enableRss: boolean
  enableSitemap: boolean
  enableSearch: boolean
  /** Short title used in the blog layout nav; defaults to `title`. */
  siteTitle?: string
  /** Fallback post author when frontmatter has none. */
  author?: string
  /** Canonical site origin for feed/sitemap URLs when no request origin exists. */
  url?: string
  nav?: { text: string, link: string }[]
  /** Which modes the blog theme toggle offers. */
  themes?: ('colored' | 'light' | 'dark')[]
  defaultTheme?: 'colored' | 'light' | 'dark'
  /** Raw HTML for the blog footer colophon line. */
  colophon?: string
  social: {
    twitter?: string
    github?: string
  }
  theme: {
    primaryColor: string
    logo?: string
  }
}

const config: BlogConfig = {
  subdomain: 'blog',
  title: 'Chris Breuer',
  description: 'Notes on developer tooling, TypeScript, Bun, and building Stacks.',
  postsPerPage: 10,
  enableComments: false,
  enableRss: true,
  enableSitemap: true,
  enableSearch: false,
  siteTitle: 'chrisbreuer.me',
  author: 'Chris Breuer',
  url: 'https://chrisbreuer.me',
  nav: [
    { text: 'Blog', link: '/blog' },
    { text: 'About', link: '/about' },
    { text: 'Projects', link: '/projects' },
    { text: 'Uses', link: '/uses' },
    { text: 'GitHub', link: 'https://github.com/chrisbbreuer' },
  ],
  themes: ['light', 'dark'],
  defaultTheme: 'light',
  colophon: 'Chris Breuer · Built with <a href="https://stacksjs.com">Stacks</a> · <a href="/blog/feed.xml">RSS</a>',
  social: {
    twitter: 'stacksjs',
    github: 'chrisbbreuer',
  },
  theme: {
    primaryColor: '#0a0a0a',
  },
}

export default config
