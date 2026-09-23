import type { PickierOptions } from 'pickier'

const config: PickierOptions = {
  format: {
    extensions: ['ts', 'js', 'stx', 'json', 'yaml', 'md'],
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  rules: {
    // TypeScript rules
    noDebugger: 'off',
    noConsole: 'off',
  },

  pluginRules: {
    // Disable regexp rules that cause false positives on route definitions
    'regexp/no-unused-capturing-group': 'off',
    'regexp/no-super-linear-backtracking': 'off',
    'regexp/optimal-quantifier-concatenation': 'off',
    // Disable style rules that conflict with common patterns or generated code
    'style/brace-style': 'off',
    'style/max-statements-per-line': 'off',
    'style/quotes': 'off',
    'indent': 'off',
    'quotes': 'off',
    // TypeScript rules
    'ts/no-top-level-await': 'off',
    // Console is intentional in this codebase
    'no-console': 'off',
    // Markdown rules, docs are authored prose, not code
    'markdown/heading-increment': 'off',
    'markdown/no-empty-links': 'off',
    'markdown/link-image-style': 'off',
    'markdown/single-title': 'off',
    'markdown/no-multiple-blanks': 'off',
    'markdown/no-reversed-links': 'off',
    'markdown/no-emphasis-as-heading': 'off',
    'markdown/fenced-code-language': 'off',
    'markdown/descriptive-link-text': 'off',
    'markdown/table-column-count': 'off',
    'markdown/no-duplicate-heading': 'off',
    'markdown/heading-style': 'off',
    'markdown/blanks-around-headings': 'off',
    'markdown/no-bare-urls': 'off',
    'markdown/reference-links-images': 'off',
    'markdown/link-image-reference-definitions': 'off',
    'markdown/code-fence-style': 'off',
    'markdown/blanks-around-fences': 'off',
    'markdown/blanks-around-lists': 'off',
    'markdown/blanks-around-tables': 'off',
    'markdown/ul-style': 'off',
    'markdown/ul-indent': 'off',
    'markdown/ol-prefix': 'off',
    'markdown/list-indent': 'off',
    // publint rules, workspace packages build dist/ on demand, so these
    // checks generate noise on a fresh checkout. Re-enable when shipping.
    'publint/file-does-not-exist': 'off',
    'publint/exports-types-should-be-first': 'off',
    'publint/use-type': 'off',
    'publint/has-module-but-no-exports': 'off',
    'publint/exports-missing-root-entrypoint': 'off',
    'publint/file-invalid-format': 'off',
    'publint/bin-file-not-executable': 'off',
    'publint/module-should-be-esm': 'off',
    // We use string concat readably in some places, preserve dev intent.
    'general/prefer-template': 'off',
    'pickier/prefer-template': 'off',
    // The buddy plugin shell deliberately uses `eval "$cmd"` to pass arbitrary
    // user-typed sub-commands through to bun. Block it project-wide rather
    // than scattering per-file disables.
    'shell/no-eval': 'off',
  },

  ignores: [
    '**/fixtures/**',
    '**/coverage/**',
    '**/temp/**',
    // Build caches and vendored deps, never user-editable source
    '**/cache/**',
    // The whole of storage/framework belongs to the framework: it is vendored
    // from the `stacks` package and rewritten by `buddy generate`, so a fix
    // made here is gone at the next sync. This used to list four subdirectories
    // and lint the rest, which meant an upgrade could hand this project lint
    // ERRORS in files it does not own: 0.74.56 arrived with an unused import in
    // server/build.ts and three in types/auto-imports.d.ts, and `pickier .`
    // went from clean to failing without a line of app code changing. 36 of the
    // 38 files it flagged were framework files. Report those upstream; do not
    // gate this repo on them.
    '**/storage/framework/**',
    '**/.bunpress/**',
    '**/docs/deps/**',
    // Generated scaffolds copied into pantry, out of project control
    '**/pantry/**',
    // Hand-written browser scripts served verbatim from public/ (incl. the
    // vendored SplatHash decoder), not part of the TS build graph, and
    // pickier lints but won't --fix them.
    '**/public/assets/scripts/**',
  ],
}

export default config
