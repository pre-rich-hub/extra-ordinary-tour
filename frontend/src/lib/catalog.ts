// Tour data with static overlay.
//
// Phase 1 strategy: the API is authoritative for the fields it can supply
// (prices, featured flags), while the static catalogue in src/content stays the
// source for display copy (days/nights, style, season, group, teaser,
// summary, includes/excludes, itinerary, places, images). Live tours are
// merged onto their static record by slug — when a tour is not live yet (API
// down, catalog beyond page limits) the static record is returned unchanged.
//
// The Tour type in src/types is the contract: no field additions. From the
// live payload we overlay `from` (price) and `featured`; rating exists in the
// API but has no surface on the static Tour type, so it stays unused until a
// rendering element needs it.

import type { LayoverPackage, Tour } from '@/types'
import { layoverPackages as staticLayoverPackages, tours as staticTours, getTour as getStaticTour } from '@/content'
import {
  getLayoverPackages,
  getTours,
  getTourBySlug,
  type ApiLayoverPackage,
  type ApiTour,
} from '@/lib/api-client'

function formatPrice(price: number | null): string | null {
  if (price === null || price === undefined) return null
  return `$${price.toLocaleString('en-US')} per person`
}

function overlayLive(staticTour: Tour, live: ApiTour): Tour {
  const price = formatPrice(live.adultPrice)
  return {
    ...staticTour,
    // Price/featured overlay only — everything else stays on the static
    // record so rendering is byte-identical with the frozen UI.
    ...(price ? { from: price } : {}),
    ...(typeof live.isFeatured === 'boolean' ? { featured: live.isFeatured } : {}),
  }
}

export async function getToursData(): Promise<Tour[]> {
  let liveTours: ApiTour[] = []
  try {
    const page = await getTours({ limit: 100 })
    liveTours = page.items ?? []
  } catch {
    liveTours = []
  }

  const bySlug = new Map(liveTours.map((t) => [t.canonical?.slug, t]))

  return staticTours.map((t) => {
    const live = bySlug.get(t.slug)
    return live ? overlayLive(t, live) : t
  })
}

export async function getTourData(slug: string): Promise<Tour | undefined> {
  const staticTour = getStaticTour(slug)
  if (!staticTour) return undefined

  try {
    const live = await getTourBySlug(slug)
    if (live && live.canonical?.slug === slug) {
      return overlayLive(staticTour, live)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}

export async function getLayoverPackagesData(): Promise<LayoverPackage[]> {
  let livePackages: ApiLayoverPackage[] = []
  try {
    livePackages = await getLayoverPackages()
  } catch {
    livePackages = []
  }

  if (livePackages.length === 0) return staticLayoverPackages

  const bySlug = new Map(livePackages.map((p) => [p.slug, p]))

  return staticLayoverPackages.map((p) => {
    const live = bySlug.get(p.slug)
    if (!live) return p
    return {
      ...live,
      // Overlay the live image only when the backend serves it (/api/v1/media).
      // Dev-local /assets paths are only served by the backend process, not
      // the frontend — documented limitation, keep the static image instead.
      image: live.image && live.image.startsWith('/api/v1/') ? live.image : p.image,
    }
  })
}