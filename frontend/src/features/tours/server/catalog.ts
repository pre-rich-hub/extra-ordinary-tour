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
    ...(price ? { from: price, priceAmount: live.adultPrice } : {}),
    ...(typeof live.isFeatured === 'boolean'
      ? { featured: live.isFeatured }
      : {}),
  }
}

// A tour created in the admin. Facts the admin does not hold (season, group)
// stay blank and the UI leaves them out.
function fromAdmin(live: ApiTour, slug: string, locale: AppLocale): Tour {
  const days = live.durationDays
  const summary = live.overview?.trim() ?? ''
  const categories = live.categories.map((c) => c.name)
  const places = live.destinations.map((d) => d.name)
  return {
    slug,
    title: live.name,
    canonicalTitle: live.name,
    image: usableImage(live.mainImage, '/placeholder.svg'),
    days: days
      ? new Intl.NumberFormat(locale, {
          style: 'unit',
          unit: 'day',
          unitDisplay: 'long',
        }).format(days)
      : '',
    nights: Math.max(days - 1, 0),
    style: categories.join(' · ') || 'Private Journey',
    styleKeys: categories,
    season: '',
    from:
      live.adultPrice === null || live.adultPrice === undefined
        ? ''
        : formatPrice(live.adultPrice, locale),
    priceAmount: live.adultPrice,
    group: '',
    teaser: firstSentence(summary),
    summary,
    includes: live.included ?? [],
    excludes: live.excluded ?? [],
    itinerary: (live.itinerary ?? []).map((step) => ({
      day: String(step.day),
      title: step.title,
      text: step.activities,
    })),
    places,
    canonicalPlaces: places,
    featured: live.isFeatured,
  }
}

export async function getToursData(locale: AppLocale = 'en'): Promise<Tour[]> {
  let liveTours: ApiTour[] = []
  try {
    // Revalidate the overlay with the page, and tag it so an admin write can
    // invalidate the data cache on demand instead of waiting for the window.
    const page = await getTours(
      { limit: 100 },
      { next: { revalidate: 3600, tags: ['tours'] } },
    )
    liveTours = page.items ?? []
  } catch {
    liveTours = []
  }

  const bySlug = new Map(liveTours.map((t) => [t.canonical?.slug, t]))
  const staticTours = getLocalizedTours(locale)
  const known = new Set(staticTours.map((t) => t.slug))

  return [
    ...staticTours.map((t) => {
      const live = bySlug.get(t.slug)
      return live ? overlayLive(t, live, locale) : t
    }),
    ...liveTours.flatMap((t) => {
      const slug = t.canonical?.slug
      return slug && !known.has(slug) ? [fromAdmin(t, slug, locale)] : []
    }),
  ]
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
      return staticTour
        ? overlayLive(staticTour, live, locale)
        : fromAdmin(live, slug, locale)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}
