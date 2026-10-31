import 'server-only'
import { getGalleryImages } from '../api/client'
import { gallerySlides } from '../data/gallery'
import { usableImage } from '@/lib/media/usable-image'

export type GallerySlide = {
  src: string
  location: string
  description: string
}

/** The admin's general gallery, or the bundled slides until it holds images. */
export async function getGalleryData(): Promise<GallerySlide[]> {
  try {
    const images = await getGalleryImages({
      next: { revalidate: 3600, tags: ['gallery'] },
    })
    const slides = images.flatMap((image) => {
      const src = usableImage(image.imageUrl, '')
      return src
        ? [
            {
              src,
              location: image.location || 'Ethiopia',
              description: image.caption ?? '',
            },
          ]
        : []
    })
    return slides.length ? slides : gallerySlides
  } catch {
    return gallerySlides
  }
}
