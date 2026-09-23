// A post's date written out ("September 22, 2026"), shared by the post page,
// /blog and the home page so all three read the same.
//
// Takes the frontmatter's YYYY-MM-DD. Noon UTC, formatted in UTC, so no server
// or reader timezone can move it to the day before.
export function longPostDate(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate))
    return isoDate
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
