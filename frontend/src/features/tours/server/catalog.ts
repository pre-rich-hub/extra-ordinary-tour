import 'server-only'
import type { Tour } from '../types'
import {
  getTours as getLocalizedTours,
  getTour as getStaticTour,
} from '../data/localized'
import type { AppLocale } from '@/i18n/routing'
import { getTours, getTourBySlug, type ApiTour } from '../api/client'
import { formatPrice } from '../lib/format'
import { usableImage } from '@/lib/media/usable-image'
import { firstSentence } from '@/lib/utils'

// Live price, featured flag and image overlay static display content by slug.
function overlayLive(staticTour: Tour, live: ApiTour, locale: AppLocale): Tour {
  const price =
    live.adultPrice === null || live.adultPrice === undefined
      ? null
      : formatPrice(live.adultPrice, locale)
  return {
    ...staticTour,
    // Operational values remain independent of translated narrative copy.
    image: usableImage(live.mainImage, staticTour.image),
    ...(price && live.adultPrice ? { from: price, priceAmount: live.adultPrice } : {}),
    ...(typeof live.isFeatured === 'boolean'
      ? { featured: live.isFeatured }
      : {}),
  }
}

function fromDatabase(
  live: ApiTour,
  slug: string,
  locale: AppLocale,
  fallback?: Tour,
): Tour {
  const days = live.durationDays
  const summary = live.overview?.trim() || fallback?.summary || ''
  const categories = live.categories.map((c) => c.name)
  const style =
    live.style || fallback?.style || categories.join(' · ') || 'Private Journey'
  const places = live.places?.length
    ? live.places
    : (fallback?.places ?? live.destinations.map((d) => d.name))
  const itinerary = (live.itinerary ?? []).map((step) => ({
    day: step.dayLabel || `Day ${step.day}`,
    title: step.title,
    text: step.activities,
  }))
  const price =
    typeof live.adultPrice === 'number' && live.adultPrice > 0
      ? live.adultPrice
      : null
  return {
    slug,
    title: live.name,
    canonicalTitle: live.name,
    image: usableImage(live.mainImage, fallback?.image ?? '/placeholder.svg'),
    days:
      live.days ||
      (days
        ? new Intl.NumberFormat(locale, {
            style: 'unit',
            unit: 'day',
            unitDisplay: 'long',
          }).format(days)
        : ''),
    nights: live.nights ?? Math.max(days - 1, 0),
    style,
    styleKeys: style.split('·').map((value) => value.trim()),
    season: live.season || fallback?.season || '',
    from: price ? formatPrice(price, locale) : (fallback?.from ?? ''),
    priceAmount: price,
    group: live.group || fallback?.group || '',
    teaser: live.teaser || fallback?.teaser || firstSentence(summary),
    summary,
    highlights: live.highlights?.length ? live.highlights : fallback?.highlights,
    includes: live.included ?? fallback?.includes ?? [],
    excludes: live.excluded ?? fallback?.excludes ?? [],
    itinerary: itinerary.length ? itinerary : (fallback?.itinerary ?? []),
    places,
    canonicalPlaces: places,
    featured: live.isFeatured,
  }
}

// English shows the row itself. Other languages keep the translated narrative
// and overlay the operational values, because the admin edits English only.
function resolve(
  live: ApiTour,
  slug: string,
  locale: AppLocale,
  staticTour?: Tour,
) {
  return staticTour && locale !== 'en'
    ? overlayLive(staticTour, live, locale)
    : fromDatabase(live, slug, locale, staticTour)
}

// The database is the source of truth once it holds rows, so a tour deleted in
// the admin stays deleted. The bundled catalogue only serves when the API is
// down or not yet seeded.
export async function getToursData(locale: AppLocale = 'en'): Promise<Tour[]> {
  let liveTours: ApiTour[] = []
  try {
    // Revalidate the overlay with the page, and tag it so an admin write can
    // invalidate the data cache on demand instead of waiting for the window.
    const page = await getTours(
      { limit: 500 },
      { next: { revalidate: 3600, tags: ['tours'] } },
    )
    liveTours = page.items ?? []
  } catch {
    liveTours = []
  }

  const staticTours = getLocalizedTours(locale)
  if (liveTours.length === 0) return staticTours

  const bySlug = new Map(staticTours.map((t) => [t.slug, t]))
  return liveTours.flatMap((live) => {
    const slug = live.canonical?.slug
    return slug ? [resolve(live, slug, locale, bySlug.get(slug))] : []
  })
}

export async function getTourData(
  slug: string,
  locale: AppLocale = 'en',
): Promise<Tour | undefined> {
  const staticTour = getStaticTour(slug, locale)

  try {
    const live = await getTourBySlug(slug, {
      next: { revalidate: 3600, tags: ['tours', `tour:${slug}`] },
    })
    if (live && live.canonical?.slug === slug) {
      return resolve(live, slug, locale, staticTour)
    }
  } catch {
    // Fall through to the list, which knows whether the database is seeded.
  }

  const tours = await getToursData(locale)
  return tours.find((t) => t.slug === slug)
}
