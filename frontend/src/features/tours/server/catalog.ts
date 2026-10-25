import 'server-only'
import type { Tour } from '../types'
import {
  getTours as getLocalizedTours,
  getTour as getStaticTour,
} from '../data/localized'
import type { AppLocale } from '@/i18n/routing'
import { getTours, getTourBySlug, type ApiTour } from '../api/client'

// Live price and featured flags overlay static display content by slug.
function formatPrice(price: number | null, locale: AppLocale): string | null {
  if (price === null || price === undefined) return null
  return `${new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price)} ${{ en: 'per person', es: 'por persona', fr: 'par personne', de: 'pro Person' }[locale]}`
}

function overlayLive(staticTour: Tour, live: ApiTour, locale: AppLocale): Tour {
  const price = formatPrice(live.adultPrice, locale)
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
    const page = await getTours({ limit: 100 }, { cache: 'force-cache' })
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
    const live = await getTourBySlug(slug, { cache: 'force-cache' })
    if (live && live.canonical?.slug === slug) {
      return overlayLive(staticTour, live, locale)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}
