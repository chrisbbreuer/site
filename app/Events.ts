import type { Events } from '@stacksjs/types'

/**
 * **Events Configuration**
 *
 * This configuration defines all of your events. Because Stacks is fully-typed, you may
 * hover any of the options below and the definitions will be provided. In case you
 * have any questions, feel free to reach out via Discord or GitHub Discussions.
 */
export default {
  // eventName: ['Listener1', 'Listener2'] -> listeners default to ./app/actions/*
  'user:registered': ['SendWelcomeEmail'],
  // 'user:created' used to be mapped here and is gone: the framework's event
  // names now come from AppEvents/AuthEvents rather than an index signature,
  // and nothing emits it. A model emits `<model>:created` only with the
  // `observe` trait, this site defines no models of its own, and the built-in
  // User does not observe. It was scaffolding that type-checked while doing
  // nothing, which is the failure an event map is least able to report.
} satisfies Events
