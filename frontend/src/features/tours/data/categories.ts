import type { Tour } from '../types'

type Categorized = Pick<Tour, 'slug' | 'nights' | 'style'> &
  Partial<Pick<Tour, 'styleKeys' | 'canonicalPlaces' | 'places'>>

const OMO_PLACES = [
  'Omo Valley',
  'Omo River',
  'Jinka',
  'Turmi',
  'Mursi villages',
]

const CUSTOMIZED = ['5-day-ethiopian-culinary-journey']

const styles = (t: Categorized) =>
  t.styleKeys ?? t.style.split('·').map((s) => s.trim())

// The Tours categories, in the client's chosen order. A tour
// can sit in several; `id` is the stable ?category= value.
export const tourCategories: {
  id: string
  label: string
  test: (t: Categorized) => boolean
}[] = [
  {
    id: 'day-trips',
    label: 'Day Trips & Excursions',
    test: (t) => !t.nights || styles(t).includes('Day Trip'),
  },
  {
    id: 'historical',
    label: 'Historical Tours',
    test: (t) => styles(t).includes('Historical'),
  },
  {
    id: 'omo-valley',
    label: 'Omo Valley Tours',
    test: (t) =>
      (t.canonicalPlaces ?? t.places ?? []).some((p) => OMO_PLACES.includes(p)),
  },
  {
    id: 'cultural',
    label: 'Cultural Tours',
    test: (t) => styles(t).includes('Cultural'),
  },
  {
    id: 'festival',
    label: 'Festival Tours',
    test: (t) => styles(t).includes('Festival'),
  },
  {
    id: 'coffee',
    label: 'Coffee Tours',
    test: (t) => styles(t).includes('Coffee'),
  },
  {
    id: 'danakil',
    label: 'Danakil Depression Tours',
    test: (t) => styles(t).includes('Danakil'),
  },
  {
    id: 'trekking',
    label: 'Trekking & Hiking',
    test: (t) => styles(t).includes('Trekking'),
  },
  {
    id: 'wildlife',
    label: 'Wildlife & Birdwatching',
    test: (t) => styles(t).some((s) => s === 'Wildlife' || s === 'Birding'),
  },
  {
    id: 'multi-day',
    label: 'Multi-Day & Customized Tours',
    // Eight days or more, usually combining several regions, plus shorter
    // themed journeys built around each group.
    test: (t) => t.nights >= 7 || CUSTOMIZED.includes(t.slug),
  },
]

export const categoriesOf = (t: Categorized) =>
  tourCategories.filter((c) => c.test(t)).map((c) => c.id)
