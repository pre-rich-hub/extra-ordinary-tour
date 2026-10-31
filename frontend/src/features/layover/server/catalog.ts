import 'server-only'
import type { LayoverPackage } from '../types'
import { getLayoverPackages as localizedPackages } from '../data/localized'
import type { AppLocale } from '@/i18n/routing'
import { getLayoverPackages, type ApiLayoverPackage } from '../api/client'
import { usableImage } from '@/lib/media/usable-image'

// The admin holds an English price line. Other languages keep their translated
// wording and take the amount from the row.
function localizedPrice(price: string, translated: LayoverPackage) {
  const amount = price.match(/\d[\d,.]*/)?.[0]
  const current = translated.price.match(/\d[\d,.]*/)?.[0]
  return amount && current
    ? translated.price.replace(current, amount)
    : translated.price
}

function toLayoverPackage(
  live: ApiLayoverPackage,
  fallbackImage = '/placeholder.svg',
): LayoverPackage {
  return {
    slug: live.slug,
    hours: live.hours,
    title: live.title,
    price: live.price,
    image: usableImage(live.image, fallbackImage),
    teaser: live.teaser,
    itinerary: live.itinerary,
    includes: live.includes,
    best: live.best,
  }
}

export async function getLayoverPackagesData(
  locale: AppLocale = 'en',
): Promise<LayoverPackage[]> {
  const staticPackages = localizedPackages(locale)
  let livePackages: ApiLayoverPackage[] = []
  try {
    // Admin edits must show on the next request, not after an ISR window.
    livePackages = await getLayoverPackages({ cache: 'no-store' })
  } catch {
    livePackages = []
  }

  if (livePackages.length === 0) return staticPackages

  const staticBySlug = new Map(staticPackages.map((p) => [p.slug, p]))

  const merged = [...livePackages]
    .sort((left, right) => left.sortOrder - right.sortOrder || left.id - right.id)
    .map((live) => {
      const staticPackage = staticBySlug.get(live.slug)

      // English uses the admin row as the source of truth. Other locales keep
      // the translated narrative and overlay the operational fields.
      if (locale === 'en') {
        return toLayoverPackage(live, staticPackage?.image)
      }

      if (!staticPackage) {
        return toLayoverPackage(live)
      }

      return {
        ...staticPackage,
        price: localizedPrice(live.price, staticPackage),
        image: usableImage(live.image, staticPackage.image),
      }
    })

  return merged
}
