import 'server-only'
import { getGalleryImages } from '../api/client'
import { usableImage } from '@/lib/media/usable-image'

/** General gallery uploads from the admin; empty when the API is unavailable. */
export async function getGalleryData(): Promise<string[]> {
  try {
    const images = await getGalleryImages({
      next: { revalidate: 3600, tags: ['gallery'] },
    })
    return images
      .map((image) => usableImage(image.imageUrl, ''))
      .filter(Boolean)
  } catch {
    return []
  }
}
