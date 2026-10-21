// Destinations each article is substantially about, most central first.
// Chosen from the article text; passing mentions are not links.
export const postDestinations: Record<string, string[]> = {
  'best-time-to-visit-ethiopia': [
    'lalibela',
    'simien-mountains',
    'danakil-depression',
    'timkat',
  ],
  'ethiopian-meskel-celebration': ['meskel'],
  'omo-valley-tribes-explained': ['omo-valley'],
  'travel-in-ethiopia': ['lalibela', 'omo-valley', 'bale-mountains', 'harar'],
  'complete-guide-to-lalibela': [
    'lalibela',
    'yemrehanna-kristos',
    'asheton-maryam',
  ],
  'danakil-depression-travel-guide': ['danakil-depression', 'erta-ale'],
  'ethiopia-a-journey-through-the-cradle-of-humanity': [
    'axum',
    'museums-and-monuments',
    'lalibela',
  ],
  'lalibela-named-among-the-worlds-top-5-unesco-sites': ['lalibela'],
  'simien-mountains-trekking-guide': ['simien-mountains', 'gondar'],
  'lalibela-churches-guide': ['lalibela'],
  'about-ethiopia': ['lalibela', 'simien-mountains', 'gondar'],
  'what-to-know-before-visiting-ethiopia': ['addis-ababa'],
  'essential-travel-information': [],
}

/** Articles about a destination: most central, then most focused, first. */
export function postsAbout<T extends { slug: string }>(
  destinationSlug: string,
  posts: T[],
) {
  const places = (p: T) => postDestinations[p.slug] ?? []
  const rank = (p: T) => places(p).indexOf(destinationSlug)
  return posts
    .filter((p) => rank(p) >= 0)
    .sort((a, b) => rank(a) - rank(b) || places(a).length - places(b).length)
}
