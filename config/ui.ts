import type { StxOptions } from '@stacksjs/stx'
import type { UiConfig } from '@stacksjs/types'

/**
 * This file configures things that are typed in three different packages: the
 * template directories belong to stx, `defaultViews` is read off `config.ui`
 * by the views server, and `imageWarmup` is a `ServeOptions` field that
 * bun-plugin-stx reads. No one type has the others' properties, so the
 * constraint is the intersection rather than any one of them.
 */
type UiOptions = StxOptions & Pick<UiConfig, 'defaultViews'> & {
  /**
   * Declared here rather than picked off `ServeOptions`, which is where
   * bun-plugin-stx actually types it: that file declares `ServeOptions` twice
   * and the exported one is the declaration without this field, so
   * `Pick<ServeOptions, 'imageWarmup'>` does not compile.
   */
  imageWarmup?: boolean
}

/**
 * STX Configuration for Stacks
 * Note: Dashboard mode overrides these settings via serve() options
 */

export default {
  /**
   * Serve only this project's own views.
   *
   * The framework ships a set of default views, a storefront cart, the
   * three checkout steps, an orders page, a dashboard, a coming-soon screen,
   * an error tester, and with this unset they are all mounted alongside the
   * real site. They were answering 200 on chrisbreuer.me: a personal site has
   * no cart to show and no dashboard to hand out, and every one of them is a
   * page that can break, leak a detail, or get indexed.
   *
   * Layouts and partials are resolved separately, so the framework's 404/500
   * pages are unaffected.
   */
  defaultViews: false,


  /**
   * Skip the startup image pass.
   *
   * It derives placeholders and builds the responsive delivery catalog, and
   * `<StxImage>` and `@image` are the only things that read either. This site
   * renders neither: the gallery is built ahead of time by
   * scripts/build-gallery.ts and the pages reference those files directly, so
   * every variant the pass produces goes unrequested.
   *
   * Measured on this project, with the 120 files in public/images/gallery:
   * 1.1s to bind with this set, 35s without it, at 918 MB peak. The server
   * waits for the pass before binding, so without this a deploy cannot clear
   * its health gate at all. It is load-bearing.
   *
   * bun-plugin-stx is the package that reads it, and it is absent from both
   * StxOptions and UiConfig, so a grep of `node_modules/@stacksjs` finds
   * nothing and it looks like dead config. It is not. Removing it on that
   * basis is what took the site down.
   */
  imageWarmup: false,

  // Components directory - for user-defined components
  componentsDir: 'resources/components',

  // Layouts directory - for layout templates
  layoutsDir: 'resources/layouts',

  // Partials directory - for partial templates
  partialsDir: 'resources/partials',
} satisfies UiOptions
