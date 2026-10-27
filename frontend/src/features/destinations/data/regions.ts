// Destination regions in the order of the client's previous website. `label`
// is the canonical (English) region name on each destination; `id` is the
// stable anchor on the Destinations page. `members`, when set, lists the
// region's destinations in display order, including ones whose own region is
// elsewhere, so a page can appear in two groups without being duplicated.
export const destinationRegions: {
  id: string
  label: string
  members?: string[]
}[] = [
  { id: 'historic-north', label: 'Historic Northern Ethiopia' },
  { id: 'eastern-ethiopia', label: 'Eastern Ethiopia' },
  { id: 'southern-ethiopia', label: 'Southern Ethiopia & Omo Valley' },
  {
    id: 'western-ethiopia',
    label: 'Western Ethiopia',
    members: [
      'gambela',
      'gambella-national-park',
      'kaffa-and-bonga',
      'jimma',
      'mizan-teferi',
      'chebera-churchura-national-park',
    ],
  },
  { id: 'nature-and-wildlife', label: 'Nature & Wildlife' },
  { id: 'festivals-and-events', label: 'Festivals & Events' },
  { id: 'addis-ababa', label: 'Addis Ababa & Surroundings' },
  { id: 'other-destinations', label: 'Other Destinations & Experiences' },
]

/** A region's destinations: its listed members in order, else its own. */
export function regionMembers<T extends { slug: string; regionKey?: string }>(
  label: string,
  destinations: T[],
) {
  const members = destinationRegions.find((r) => r.label === label)?.members
  return members
    ? members
        .map((slug) => destinations.find((d) => d.slug === slug))
        .filter((d): d is T => d !== undefined)
    : destinations.filter((d) => d.regionKey === label)
}
