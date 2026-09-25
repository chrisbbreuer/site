// Generates text-first Open Graph cards (1200x630) for each page, matching the
// site brand: Lilex monospace, strict grayscale, a terminal `~/path` motif, and
// the avatar used minimally (small, top-left) so the focus stays on the words.
//
// This writes self-contained HTML into public/_og/, which is rendered through
// the in-app browser at 2x and downscaled to public/images/og/<slug>.jpg.
// The _og/ scratch dir is removed once the JPGs are captured.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Card {
  slug: string
  path: string // terminal-style path shown top-right
  title: string // large display title
  desc: string // one/two line supporting copy
}

const cards: Card[] = [
  {
    slug: 'home',
    path: '~',
    title: 'Chris Breuer',
    desc: 'Software engineer, founder of Stacks, ultra\u00A0skyrunner, dog person. Notes on developer tooling and long days in the mountains.',
  },
  {
    slug: 'about',
    path: '~/about',
    title: 'About',
    desc: 'Obsessed with developer and agentic tooling, and steep trails. Los Angeles based, usually on a trail with the dogs.',
  },
  {
    slug: 'apps',
    path: '~/apps',
    title: 'Apps',
    desc: 'The products, as opposed to the packages. HQ.training, Wildloop, OpenFarm, and the HQ suite.',
  },
  {
    slug: 'goals',
    path: '~/goals',
    title: 'Goals',
    desc: 'A billion npm downloads a month, an open unicorn, Stacks v1.0, the Pacific Crest Trail, and every US national park.',
  },
  {
    slug: 'projects',
    path: '~/projects',
    title: 'Projects',
    desc: 'Every public repo I authored or maintain, across stacksjs, zig-utils, meemalabs, and more.',
  },
  {
    slug: 'uses',
    path: '~/uses',
    title: 'Uses',
    desc: 'The software I use, the gadgets I love, and other things I recommend.',
  },
  {
    slug: 'blog',
    path: '~/blog',
    title: 'Blog',
    desc: 'Both halves: developer and agentic tooling, and long days in the mountains. Mostly where those turn out to be the same problem.',
  },
]

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Longer titles get a smaller size so they never wrap past one line.
function titleSize(t: string): number {
  if (t.length <= 6)
    return 132
  if (t.length <= 9)
    return 120
  return 96
}

function html(c: Card): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Lilex';
    src: url('/fonts/lilex/Lilex-var.woff2') format('woff2');
    font-weight: 300 700;
    font-display: block;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: 'Lilex', ui-monospace, monospace;
    background: #0a0a0a;
    color: #ededed;
    /* faint dotted grid + a soft top-left glow for depth */
    background-image:
      radial-gradient(circle at 18% 22%, rgba(255,255,255,0.05), transparent 46%),
      radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 100% 100%, 28px 28px;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    width: 1200px; height: 630px;
    padding: 72px 80px;
    display: flex; flex-direction: column;
    position: relative;
  }
  /* inset hairline frame */
  .card::before {
    content: '';
    position: absolute; inset: 40px;
    border: 1px solid #242424;
    border-radius: 14px;
    pointer-events: none;
  }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img {
    width: 46px; height: 46px; border-radius: 50%;
    border: 1px solid #2c2c2c;
    object-fit: cover;
  }
  .brand span { font-size: 23px; color: #a8a8a8; letter-spacing: 0.02em; }
  .path { font-size: 21px; color: #5f5f5f; letter-spacing: 0.04em; }
  .body { margin-top: auto; margin-bottom: auto; }
  .title {
    font-size: ${titleSize(c.title)}px;
    font-weight: 600;
    line-height: 1.02;
    letter-spacing: -0.02em;
    display: flex; align-items: baseline;
  }
  .cursor {
    display: inline-block;
    width: 0.5em; height: 0.9em;
    margin-left: 0.14em;
    background: #ededed;
    transform: translateY(0.06em);
  }
  .desc {
    margin-top: 34px;
    font-size: 30px;
    line-height: 1.5;
    color: #9a9a9a;
    max-width: 900px;
    font-weight: 300;
  }
  .foot {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 21px; color: #5f5f5f; letter-spacing: 0.02em;
  }
  /* The hairline between the two footer labels is an elevation profile, the
     same ridge motif the site uses above its footer, at card scale. */
  .foot .rule {
    flex: 1; margin: 0 24px; height: 22px;
    fill: none; stroke: #242424; stroke-width: 1;
    stroke-linecap: square; stroke-linejoin: miter;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="top">
      <div class="brand">
        <img src="/images/avatar.png" alt="">
        <span>chris breuer</span>
      </div>
      <div class="path">${esc(c.path)}</div>
    </div>
    <div class="body">
      <div class="title">${esc(c.title)}<i class="cursor"></i></div>
      <div class="desc">${esc(c.desc)}</div>
    </div>
    <div class="foot">
      <span>chrisbreuer.me</span>
      <svg class="rule" viewBox="0 0 600 22" preserveAspectRatio="none" aria-hidden="true"><path d="${ridgePath}" vector-effect="non-scaling-stroke" /></svg>
      <span>@chrisbbreuer</span>
    </div>
  </div>
</body>
</html>`
}

// A card per post, read out of the markdown, so writing one is all it takes
// to get a share image with its own title on it. Without this every post
// shared as the generic "Blog" card, which tells a reader nothing about what
// they are being handed.
const blogDir = join(import.meta.dir, '..', 'content', 'blog')
if (existsSync(blogDir)) {
  for (const file of readdirSync(blogDir).filter(name => name.endsWith('.md')).sort()) {
    const slug = file.replace(/\.md$/, '')
    const raw = readFileSync(join(blogDir, file), 'utf-8')
    const front = raw.match(/^---\n([\s\S]*?)\n---/)
    if (!front) continue
    const field = (name: string): string => {
      const line = front[1].split('\n').find(entry => entry.trim().startsWith(`${name}:`))
      if (!line) return ''
      return line.slice(line.indexOf(':') + 1).trim().replace(/^['"]|['"]$/g, '')
    }
    const title = field('title')
    if (!title) continue
    cards.push({
      slug: `blog-${slug}`,
      path: `~/blog/${slug}`,
      title,
      desc: field('description') || field('excerpt') || 'Writing by Chris Breuer.',
    })
  }
}

// The rule along the bottom of every card is the same San Gabriel crest the
// site's footer draws, rescaled from its 1200x32 viewBox into the card's
// 600x22 one. Read from the partial so the two can never drift into being
// two different mountain ranges.
function cardRidgePath(): string {
  const partial = join(import.meta.dir, '..', 'resources', 'views', 'partials', 'footer.stx')
  const match = readFileSync(partial, 'utf-8').match(/<path d="([^"]+)"/)
  if (!match) return ''
  return match[1]
    .split(/(?=[ML])/)
    .map((step) => {
      const command = step[0]
      const [x, y] = step.slice(1).trim().split(/\s+/).map(Number)
      if (!Number.isFinite(x) || !Number.isFinite(y)) return ''
      return `${command}${((x / 1200) * 600).toFixed(1)} ${((y / 32) * 22).toFixed(1)}`
    })
    .filter(Boolean)
    .join(' ')
}

const ridgePath = cardRidgePath()

const outDir = join(import.meta.dir, '..', 'public', '_og')
mkdirSync(outDir, { recursive: true })
for (const c of cards) {
  writeFileSync(join(outDir, `${c.slug}.html`), html(c))
  // eslint-disable-next-line no-console
  console.log(`wrote _og/${c.slug}.html`)
}
console.log(`\n${cards.length} cards → render at http://localhost:3000/_og/<slug>.html`)
