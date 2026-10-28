import type { Tour } from '@/features/tours/types'
import { byDuration } from '@/features/tours/lib/format'

// Canonical (English) itinerary place names that visit each destination, in
// addition to the destination's own name. Every alias is named in that
// destination's own guide text; there is no substring or first-word matching.
const placeAliases: Record<string, string[]> = {
  lalibela: ['Lalibela (Fasika)', 'Lalibela (Timkat)', 'Lalibela (Genna)'],
  gondar: ['Gondar (Timkat)'],
  'bahir-dar-lake-tana': ['Bahir Dar'],
  'gheralta-tigray-churches': [
    'Gheralta',
    'Hawzen',
    'Abuna Yemata Guh',
    'Abreha we Atsbeha',
  ],
  'danakil-depression': ['Dallol', 'Lake Assale'],
  'omo-valley': [
    'Jinka',
    'Turmi',
    'Arbore',
    'Mursi villages',
    'Karo villages',
    'Ari villages',
    'Banna villages',
    'Dassanech villages',
    'Nyangatom villages',
  ],
  'mursi-people': ['Mursi villages'],
  'hamar-people': ['Turmi'],
  'karo-people': ['Karo villages'],
  'banna-people': ['Banna villages'],
  'arbore-people': ['Arbore'],
  'ari-people': ['Ari villages'],
  'dassanech-people': ['Dassanech villages'],
  'nyangatom-people': ['Nyangatom villages'],
  'surma-people': ['Kibish (Surma)'],
  'rift-valley-lakes': [
    'Rift Valley lakes',
    'Ziway',
    'Lake Langano',
    'Hawassa',
  ],
  'abijatta-shalla': ['Abijatta-Shalla'],
  'nech-sar-national-park': ['Lake Chamo'],
  'awash-national-park': ['Awash Falls'],
  'bale-mountains': [
    'Sanetti Plateau',
    'Harenna Forest',
    'Dinsho',
    'Tulu Dimtu',
  ],
  'simien-mountains': ['Sankaber', 'Gich', 'Imet Gogo', 'Chenek'],
  'museums-and-monuments': ['National Museum', 'Holy Trinity Cathedral'],
  'debre-libanos': ['Portuguese Bridge', 'Blue Nile Gorge'],
  'tiya-and-adadi-mariam': ['Tiya', 'Adadi Mariam'],
  'yirgacheffe-and-sidama': ['Yirgacheffe', 'Aleta Wondo', 'Dilla'],
  'kaffa-and-bonga': ['Bonga (Kaffa)', 'Mankira forest'],
  timkat: ['Lalibela (Timkat)', 'Gondar (Timkat)'],
  genna: ['Lalibela (Genna)'],
  fasika: ['Lalibela (Fasika)'],
  meskel: ['Meskel'],
}

// Gateway on almost every itinerary; it does not make two tours similar.
const gateway = 'addis-ababa'

type Named = { slug: string; canonicalName?: string; name: string }
type Routed = Pick<Tour, 'slug' | 'places' | 'canonicalPlaces' | 'styleKeys'>

const placesOf = (tour: Routed) => tour.canonicalPlaces ?? tour.places
const visits = (destination: Named, place: string) =>
  place === (destination.canonicalName ?? destination.name) ||
  (placeAliases[destination.slug] ?? []).includes(place)

/** The destination slug each itinerary place visits, aligned with `places`. */
export function placeDestinations(tour: Routed, destinations: Named[]) {
  return placesOf(tour).map(
    (place) => destinations.find((d) => visits(d, place))?.slug,
  )
}

/** Tours that visit a destination, shortest first, then most focused. */
export function toursVisiting<T extends Routed & { nights: number }>(
  destination: Named,
  tours: T[],
) {
  return tours
    .filter((t) => placesOf(t).some((place) => visits(destination, place)))
    .sort(
      (a, b) =>
        byDuration(a, b) || placesOf(a).length - placesOf(b).length,
    )
}

/** Tours sharing destinations (beyond the gateway) and then travel style. */
export function relatedTours<T extends Routed>(
  tour: T,
  tours: T[],
  destinations: Named[],
  limit = 3,
) {
  const stops = (t: Routed) =>
    new Set(
      placeDestinations(t, destinations).filter(
        (slug): slug is string => !!slug && slug !== gateway,
      ),
    )
  const own = stops(tour)
  const styles = new Set(tour.styleKeys ?? [])
  return tours
    .filter((t) => t.slug !== tour.slug)
    .map((t) => ({
      t,
      score:
        2 * [...stops(t)].filter((s) => own.has(s)).length +
        (t.styleKeys ?? []).filter((s) => styles.has(s)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ t }) => t)
}
