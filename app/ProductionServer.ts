import process from 'node:process'
import { cli } from '../storage/framework/core/cli/src/cli'
import { serve } from '../storage/framework/core/buddy/src/commands/serve'

process.env.APP_ENV ||= 'production'
process.env.NODE_ENV ||= 'production'

const buddy = cli('buddy')
serve(buddy)
process.argv.splice(2, 0, 'serve')
await buddy.parse()
