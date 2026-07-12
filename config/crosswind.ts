/**
 * Crosswind (utility CSS) — content globs for STX views.
 * @see https://github.com/cwcss/crosswind
 */
export default {
  content: [
    './resources/views/**/*.{stx,html}',
    './resources/**/*.{stx,html}',
    './storage/framework/defaults/resources/views/**/*.{stx,html}',
    './storage/framework/defaults/resources/components/**/*.{stx,html}',
    './storage/framework/core/error-handling/src/views/**/*.{stx,html}',
  ],
  preflight: true,
  minify: false,

  // Lilex (self-hosted in public/fonts/lilex, @font-face in public/site.css)
  // is the site's one typeface: font-sans and font-mono utilities both resolve
  // to it, so utility-styled markup matches the hand-written CSS.
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lilex', 'ui-monospace', 'SF Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        mono: ['Lilex', 'ui-monospace', 'SF Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
}
