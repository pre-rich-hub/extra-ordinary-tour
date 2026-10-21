export type Tour = {
  canonicalTitle?: string
  canonicalPlaces?: string[]
  styleKeys?: string[]
  priceAmount?: number | null
  slug: string
  title: string
  image: string
  days: string
  nights: number
  style: string
  season: string
  from: string
  group: string
  teaser: string
  summary: string
  includes: string[]
  excludes: string[]
  itinerary: { day: string; title: string; text: string }[]
  places: string[]
  featured?: boolean
}

/** What a tour card shows; client lists receive only these fields. */
export type TourCardData = Pick<
  Tour,
  | 'slug'
  | 'title'
  | 'image'
  | 'days'
  | 'nights'
  | 'style'
  | 'styleKeys'
  | 'season'
  | 'from'
  | 'group'
  | 'teaser'
  | 'places'
>

export function toCardData(t: Tour): TourCardData {
  const { slug, title, image, days, nights, style, styleKeys } = t
  const { season, from, group, teaser, places } = t
  return {
    slug,
    title,
    image,
    days,
    nights,
    style,
    styleKeys,
    season,
    from,
    group,
    teaser,
    places,
  }
}
