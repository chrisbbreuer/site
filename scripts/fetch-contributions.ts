/**
 * Regenerates content/github-contributions.json: my GitHub contribution
 * calendar for the last year and for every calendar year I have contributed
 * in, for the graph on /wip. Requires an authenticated `gh` CLI, like
 * scripts/fetch-projects.ts. Run: bun scripts/fetch-contributions.ts
 *
 * Stored compactly (one `[date, count, level]` per day, grouped into GitHub's
 * Sunday-first weeks) because the page only ever renders one calendar at a
 * time, but the file holds all of them.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const LOGIN = 'chrisbbreuer'

type Day = [date: string, count: number, level: number]

interface Calendar {
  total: number
  weeks: Day[][]
}

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

// GitHub's GraphQL answers a slow query with a 502, and a busy year is slow.
// A few tries, a few seconds apart, before giving up on the run.
function graphql(query: string, tries = 4): any {
  for (let attempt = 1; ; attempt++) {
    try {
      const out = execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] })
      return JSON.parse(out).data
    }
    catch (error) {
      if (attempt >= tries)
        throw error
      console.warn(`GitHub did not answer (attempt ${attempt} of ${tries}), retrying.`)
      Bun.sleepSync(attempt * 5000)
    }
  }
}

function calendarFrom(collection: any): Calendar {
  const calendar = collection.contributionCalendar
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week: any) => week.contributionDays.map((day: any): Day => [day.date, day.contributionCount, LEVELS[day.contributionLevel] ?? 0])),
  }
}

const DAYS = 'weeks { contributionDays { date contributionCount contributionLevel } }'

const latest = graphql(`query { user(login: "${LOGIN}") { contributionsCollection { contributionYears contributionCalendar { totalContributions ${DAYS} } } } }`)
const years: number[] = latest.user.contributionsCollection.contributionYears
const calendars: Record<string, Calendar> = { last: calendarFrom(latest.user.contributionsCollection) }

// One request per year: all of them in one query takes GitHub past its own
// timeout.
for (const year of years) {
  const data = graphql(`query { user(login: "${LOGIN}") { contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") { contributionCalendar { totalContributions ${DAYS} } } } }`)
  calendars[String(year)] = calendarFrom(data.user.contributionsCollection)
}

const out = { login: LOGIN, fetchedAt: new Date().toISOString(), years, calendars }
writeFileSync(join(import.meta.dir, '..', 'content/github-contributions.json'), `${JSON.stringify(out)}\n`)
console.log(`Wrote ${years.length} years of contributions (${calendars.last!.total.toLocaleString()} in the last year).`)
