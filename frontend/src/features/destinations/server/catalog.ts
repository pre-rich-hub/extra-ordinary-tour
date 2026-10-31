import 'server-only'
import type { Destination } from '../types'
import { getDestinations as getLocalizedDestinations } from '../data/localized'
import { getDestinations, type ApiDestination } from '../api/client'
import type { AppLocale } from '@/i18n/routing'
import { usableImage } from '@/lib/media/usable-image'
import { firstSentence } from '@/lib/utils'

const fallbackRegion = 'Other Destinations & Experiences'

function fromDatabase(
  live: ApiDestination,
  slug: string,
  regionLabel: (key: string) => string,
  fallback?: Destination,
): Destination {
  const description = live.description?.trim() ?? ''
  const paragraphs = description.split(/\n\s*\n/).filter((p) => p.trim())
  const regionKey = live.region || fallback?.regionKey || fallbackRegion
  return {
    slug,
    name: live.name,
    canonicalName: live.name,
    region: regionLabel(regionKey),
    regionKey,
    tag: live.tag || fallback?.tag || 'Destination',
    image: usableImage(live.imageUrl, fallback?.image ?? '/placeholder.svg'),
    teaser: live.teaser || fallback?.teaser || firstSentence(description),
    intro: live.intro || fallback?.intro || firstSentence(description),
    bestTime: live.bestTime || fallback?.bestTime || '',
    duration: live.duration || fallback?.duration || '',
    altitude: live.altitude || fallback?.altitude || '',
    highlights: live.highlights?.length
      ? live.highlights
      : (fallback?.highlights ?? []),
    paragraphs: paragraphs.length ? paragraphs : (fallback?.paragraphs ?? []),
  }
}

// The database is the source of truth once it holds rows, so a destination
// deleted in the admin stays deleted. The bundled catalogue only serves when
// the API is down or not yet seeded, and supplies the translated narrative:
// other languages keep it and overlay the image, the same split the layover
// packages use, because the admin edits English only.
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
  if (liveDestinations.length === 0) return staticDestinations

  const bySlug = new Map(staticDestinations.map((d) => [d.slug, d]))
  const regionLabel = (key: string) =>
    staticDestinations.find((d) => d.regionKey === key)?.region ?? key

  return liveDestinations.flatMap((live) => {
    const slug = live.canonical.slug
    if (!slug) return []
    const translated = bySlug.get(slug)
    if (translated && locale !== 'en') {
      return [
        { ...translated, image: usableImage(live.imageUrl, translated.image) },
      ]
    }
    return [fromDatabase(live, slug, regionLabel, translated)]
  })
}

export async function getDestinationData(
  slug: string,
  locale: AppLocale = 'en',
): Promise<Destination | undefined> {
  const destinations = await getDestinationsData(locale)
  return destinations.find((d) => d.slug === slug)
}
