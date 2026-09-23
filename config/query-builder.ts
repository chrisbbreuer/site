import type { SupportedDialect } from 'bun-query-builder'
import { env } from '@stacksjs/env'
// `defineConfig` rather than `satisfies QueryBuilderConfig`. That type is the
// RESOLVED shape with every field required, so annotating a config file with it
// demands `migrationDir`, `snapshotDir` and a dozen sections this project has
// no opinion about, and every field added upstream afterwards became a build
// break here. 0.74.56 added two. `defineConfig` takes the options shape, where
// nothing is required, and returns its argument unchanged.
import { defineConfig } from 'bun-query-builder'

const dialect = (env.DB_CONNECTION as SupportedDialect) || 'sqlite'

// For SQLite, use file path; for other databases, use connection params
const databaseConfig = dialect === 'sqlite'
  ? { database: env.DB_DATABASE_PATH || 'database/stacks.sqlite' }
  : {
      database: env.DB_DATABASE || 'stacks',
      username: env.DB_USERNAME || '',
      password: env.DB_PASSWORD || '',
      host: env.DB_HOST || 'localhost',
      port: env.DB_PORT || 5432,
    }

export default defineConfig({
  verbose: true,
  dialect,
  database: databaseConfig,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultOrderColumn: 'created_at',
  },
  pagination: {
    defaultPerPage: 25,
    cursorColumn: 'id',
  },
  aliasing: {
    relationColumnAliasFormat: 'table_column',
  },
  relations: {
    foreignKeyFormat: 'singularParent_id',
    maxDepth: 10,
    maxEagerLoad: 50,
    detectCycles: true,
  },
  transactionDefaults: {
    retries: 2,
    isolation: 'read committed',
    sqlStates: ['40001', '40P01'],
    backoff: {
      baseMs: 50,
      factor: 2,
      maxMs: 2000,
      jitter: true,
    },
  },
  sql: {
    randomFunction: 'RANDOM()',
    sharedLockSyntax: 'FOR SHARE',
    jsonContainsMode: 'operator',
  },
  features: {
    distinctOn: true,
  },
  debug: {
    captureText: true,
  },
  hooks: {},
  softDeletes: {
    // Enabled so the ORM read path (find/where/all) excludes `deleted_at`
    // rows by default, matching what the auto-CRUD REST routes already do
    // manually. With this off, a soft-deleted (banned/GDPR-erased) row stayed
    // fully visible and authenticatable through every hand-written ORM query.
    // Per-model behavior is still gated by the `useSoftDeletes` trait; models
    // without a `deleted_at` column are unaffected. Use `withTrashed()` to
    // opt back in to deleted rows for a given query.
    enabled: true,
    column: 'deleted_at',
    defaultFilter: true,
  },
})
