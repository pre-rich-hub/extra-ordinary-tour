import 'server-only'
import type { Destination } from '../types'
import { getDestinations as getLocalizedDestinations } from '../data/localized'
import { getDestinations, type ApiDestination } from '../api/client'
import type { AppLocale } from '@/i18n/routing'
import { usableImage } from '@/lib/media/usable-image'
import { firstSentence } from '@/lib/utils'

// Destinations created in the admin have no region of their own.
const adminRegion = 'Other Destinations & Experiences'

// The admin only holds a name, description and image, so the facts the
// catalogue records carry stay blank and the UI leaves them out.
function fromAdmin(
  live: ApiDestination,
  slug: string,
  region: string,
): Destination {
  const description = live.description?.trim() ?? ''
  return {
    slug,
    name: live.name,
    canonicalName: live.name,
    region,
    regionKey: adminRegion,
    tag: 'Destination',
    image: usableImage(live.imageUrl, '/placeholder.svg'),
    teaser: firstSentence(description),
    intro: firstSentence(description),
    bestTime: '',
    duration: '',
    altitude: '',
    highlights: [],
    paragraphs: description.split(/\n\s*\n/).filter((p) => p.trim()),
  }
}

export async function getDestinationsData(
  locale: AppLocale = 'en',
): Promise<Destination[]> {
  const staticDestinations = getLocalizedDestinations(locale)
  let liveDestinations: ApiDestination[] = []
  try {
    liveDestinations = await getDestinations({
      next: { revalidate: 3600, tags: ['destinations'] },
    })
  } catch {
    liveDestinations = []
  }

  const bySlug = new Map(liveDestinations.map((d) => [d.canonical.slug, d]))
  const merged: Destination[] = staticDestinations.map((d) => ({
    ...d,
    image: usableImage(bySlug.get(d.slug)?.imageUrl, d.image),
  }))

  const known = new Set(staticDestinations.map((d) => d.slug))
  const region =
    staticDestinations.find((d) => d.regionKey === adminRegion)?.region ??
    adminRegion
  for (const live of liveDestinations) {
    const slug = live.canonical.slug
    if (slug && !known.has(slug)) merged.push(fromAdmin(live, slug, region))
  }

  return merged
}

export async function getDestinationData(
  slug: string,
  locale: AppLocale = 'en',
): Promise<Destination | undefined> {
  const destinations = await getDestinationsData(locale)
  return destinations.find((d) => d.slug === slug)
}
