// Generates text-first Open Graph cards (1200x630) for each page, matching the
// site brand: Lilex monospace, strict grayscale, a terminal `~/path` motif, and
// the avatar used minimally (small, top-left) so the focus stays on the words.
//
// This writes self-contained HTML into public/_og/, which is rendered through
// the in-app browser at 2x and downscaled to public/images/og/<slug>.jpg.
// The _og/ scratch dir is removed once the JPGs are captured.
import { mkdirSync, writeFileSync } from 'node:fs'
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
    desc: 'Software engineer and founder of Stacks. Notes on developer tooling, TypeScript, and Bun.',
  },
  {
    slug: 'about',
    path: '~/about',
    title: 'About',
    desc: 'Software engineer passionately obsessed over developer tooling. Los Angeles based.',
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
    desc: 'Notes on developer tooling, TypeScript, Bun, and building Stacks.',
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
  .foot .rule {
    height: 1px; background: #242424; flex: 1; margin: 0 24px;
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
      <span class="rule"></span>
      <span>@chrisbbreuer</span>
    </div>
  </div>
</body>
</html>`
}

const outDir = join(import.meta.dir, '..', 'public', '_og')
mkdirSync(outDir, { recursive: true })
for (const c of cards) {
  writeFileSync(join(outDir, `${c.slug}.html`), html(c))
  // eslint-disable-next-line no-console
  console.log(`wrote _og/${c.slug}.html`)
}
console.log(`\n${cards.length} cards → render at http://localhost:3000/_og/<slug>.html`)
