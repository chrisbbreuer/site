import type { StxOptions } from '@stacksjs/stx'
import type { UiConfig } from '@stacksjs/types'

/**
 * This file configures two things that are typed in two places: the template
 * directories, which belong to stx, and `defaultViews`, which the views server
 * reads off `config.ui`. Neither type has the other's properties, so the
 * constraint is the intersection rather than one of them.
 */
type UiOptions = StxOptions & Pick<UiConfig, 'defaultViews'>

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

  /*
   * `imageWarmup: false` used to sit here, to skip a startup pass that derived
   * placeholders and built the responsive image catalog. It was worth about 27
   * seconds of boot on this site, which renders no <StxImage> and no @image and
   * so wanted none of it.
   *
   * Removed because nothing reads the option any more: it is absent from both
   * StxOptions and UiConfig as of stacks 0.74.56, so it stopped type-checking,
   * and `grep imageWarmup node_modules/@stacksjs` finds nothing. Keeping it
   * would have been a setting that looked load-bearing and did nothing. Boot
   * was measured after removing it and is still under a second, so the pass is
   * no longer running at startup on its own account.
   */

  // Components directory - for user-defined components
  componentsDir: 'resources/components',

  // Layouts directory - for layout templates
  layoutsDir: 'resources/layouts',

  // Partials directory - for partial templates
  partialsDir: 'resources/partials',
} satisfies UiOptions
