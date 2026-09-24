// Upcoming and recent events for the home page, from content/events.json.
//
// An event has a `start` date (YYYY-MM-DD) and optionally an `end`, or just a
// `year` when nothing more is decided. It is upcoming until its last day has
// passed, so the list moves on by itself: nothing needs editing the day after.
// `when` overrides the written-out date for anything that reads better said
// another way ("Weekend of September 26, 2026").

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface SiteEvent {
  start?: string
  end?: string
  year?: number
  when?: string
  title: string
  place?: string
  detail?: string
  url?: string
}

export interface ShownEvent extends SiteEvent {
  whenLabel: string
}

/** Today in Los Angeles, as YYYY-MM-DD: an event is over when the day is, here. */
function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' })
}

function parts(iso: string): { year: number, month: string, day: number } {
  const date = new Date(`${iso}T12:00:00Z`)
  return {
    year: date.getUTCFullYear(),
    month: date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' }),
    day: date.getUTCDate(),
  }
}

/** "September 15, 2026", "October 1 to 4, 2026", "September 30 to October 2, 2026". */
export function eventDateLabel(event: SiteEvent): string {
  if (event.when)
    return event.when
  if (!event.start)
    return event.year ? String(event.year) : ''
  const a = parts(event.start)
  if (!event.end || event.end === event.start)
    return `${a.month} ${a.day}, ${a.year}`
  const b = parts(event.end)
  if (a.year !== b.year)
    return `${a.month} ${a.day}, ${a.year} to ${b.month} ${b.day}, ${b.year}`
  if (a.month !== b.month)
    return `${a.month} ${a.day} to ${b.month} ${b.day}, ${a.year}`
  return `${a.month} ${a.day} to ${b.day}, ${a.year}`
}

/** When an event ends, for sorting; a bare year counts as its last day. */
function lastDay(event: SiteEvent): string {
  return event.end || event.start || `${event.year ?? 9999}-12-31`
}

export function homeEvents(recentLimit = 3): { upcoming: ShownEvent[], recent: ShownEvent[] } {
  let events: SiteEvent[] = []
  try {
    events = JSON.parse(readFileSync(join(process.cwd(), 'content/events.json'), 'utf-8'))
  }
  catch {}

  const now = today()
  const shown = events
    .filter(event => event && event.title)
    .map(event => ({ ...event, whenLabel: eventDateLabel(event) }))

  const upcoming = shown
    .filter(event => lastDay(event) >= now)
    .sort((a, b) => (a.start || lastDay(a)).localeCompare(b.start || lastDay(b)))
  const recent = shown
    .filter(event => lastDay(event) < now)
    .sort((a, b) => lastDay(b).localeCompare(lastDay(a)))
    .slice(0, recentLimit)

  return { upcoming, recent }
}
