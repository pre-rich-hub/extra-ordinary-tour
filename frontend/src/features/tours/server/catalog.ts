import 'server-only'
import type { Tour } from '../types'
import {
  getTours as getLocalizedTours,
  getTour as getStaticTour,
} from '../data/localized'
import type { AppLocale } from '@/i18n/routing'
import { getTours, getTourBySlug, type ApiTour } from '../api/client'
import { formatPrice } from '../lib/format'

// Live price and featured flags overlay static display content by slug.
function overlayLive(staticTour: Tour, live: ApiTour, locale: AppLocale): Tour {
  const price =
    live.adultPrice === null || live.adultPrice === undefined
      ? null
      : formatPrice(live.adultPrice, locale)
  return {
    ...staticTour,
    // Operational values remain independent of translated narrative copy.
    ...(price ? { from: price, priceAmount: live.adultPrice } : {}),
    ...(typeof live.isFeatured === 'boolean'
      ? { featured: live.isFeatured }
      : {}),
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

  return getLocalizedTours(locale).map((t) => {
    const live = bySlug.get(t.slug)
    return live ? overlayLive(t, live, locale) : t
  })
}

export async function getTourData(
  slug: string,
  locale: AppLocale = 'en',
): Promise<Tour | undefined> {
  const staticTour = getStaticTour(slug, locale)
  if (!staticTour) return undefined

  try {
    const live = await getTourBySlug(slug, {
      next: { revalidate: 3600, tags: ['tours', `tour:${slug}`] },
    })
    if (live && live.canonical?.slug === slug) {
      return overlayLive(staticTour, live, locale)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}
