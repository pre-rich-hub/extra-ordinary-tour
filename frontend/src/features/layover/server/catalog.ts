import 'server-only'
import type { LayoverPackage } from '../types'
import { getLayoverPackages as localizedPackages } from '../data/localized'
import type { AppLocale } from '@/i18n/routing'
import { getLayoverPackages, type ApiLayoverPackage } from '../api/client'
import { usableImage } from '@/lib/media/usable-image'

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
  const seen = new Set<string>()

  const merged = [...livePackages]
    .sort((left, right) => left.sortOrder - right.sortOrder || left.id - right.id)
    .map((live) => {
      seen.add(live.slug)
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
        price: live.price,
        image: usableImage(live.image, staticPackage.image),
      }
    })

  // If the database is only partially seeded, keep showing the static
  // packages that have no live row yet.
  for (const staticPackage of staticPackages) {
    if (!seen.has(staticPackage.slug)) merged.push(staticPackage)
  }

  return merged
}
