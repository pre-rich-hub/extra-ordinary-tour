import 'server-only'
import type { LayoverPackage } from '../types'
import { layoverPackages as staticLayoverPackages } from '../data/layover-packages'
import { getLayoverPackages, type ApiLayoverPackage } from '../api/client'

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
