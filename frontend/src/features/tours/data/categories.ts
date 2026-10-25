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
// Tours that fit no single theme: photography and community-based stays.
const OTHER_EXPERIENCES = [
  '13-day-omo-valley-photography-expedition',
  '4-day-lalibela-trek',
  '6-day-lalibela-trek-and-churches',
]

const styles = (t: Categorized) =>
  t.styleKeys ?? t.style.split('·').map((s) => s.trim())

// The Tours categories, in the order of the client's previous website. A tour
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
    id: 'coffee',
    label: 'Coffee Tours',
    test: (t) => styles(t).includes('Coffee'),
  },
  {
    id: 'cultural',
    label: 'Cultural Tours',
    test: (t) => styles(t).includes('Cultural'),
  },
  {
    id: 'historical',
    label: 'Historical Tours',
    test: (t) => styles(t).includes('Historical'),
  },
  {
    id: 'festival',
    label: 'Festival Tours',
    test: (t) => styles(t).includes('Festival'),
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
    id: 'danakil',
    label: 'Danakil Depression Tours',
    test: (t) => styles(t).includes('Danakil'),
  },
  {
    id: 'omo-valley',
    label: 'Omo Valley Tours',
    test: (t) =>
      (t.canonicalPlaces ?? t.places ?? []).some((p) => OMO_PLACES.includes(p)),
  },
  {
    id: 'multi-day',
    label: 'Multi-Day & Customized Tours',
    // Eight days or more, usually combining several regions.
    test: (t) => t.nights >= 7,
  },
  {
    id: 'other',
    label: 'Other Experiences',
    test: (t) => OTHER_EXPERIENCES.includes(t.slug),
  },
]

export const categoriesOf = (t: Categorized) =>
  tourCategories.filter((c) => c.test(t)).map((c) => c.id)
