import 'server-only'
import type { ReviewPlatform, Testimonial } from '../types'
import { getTestimonials as getLocalizedTestimonials } from '../data/localized'
import { getTestimonials, type ApiTestimonial } from '../api/client'
import type { AppLocale } from '@/i18n/routing'
import { usableImage } from '@/lib/media/usable-image'

function fromDatabase(live: ApiTestimonial, fallback?: Testimonial): Testimonial {
  return {
    id: live.slug ?? `guest-${live.id}`,
    quote: live.message,
    name: live.reviewerName,
    detail: live.profession ?? '',
    image: usableImage(live.imageUrl, fallback?.image ?? '/placeholder.svg'),
    ...(live.platform ? { platform: live.platform as ReviewPlatform } : {}),
    ...(live.rating ? { rating: live.rating } : {}),
    ...(live.title ? { title: live.title } : {}),
    ...(live.reviewDate ? { date: live.reviewDate } : {}),
  }
}

// The database is the source of truth once it holds rows; see the note in
// the destinations catalogue for how the bundled records are used.
export async function getTestimonialsData(
  locale: AppLocale = 'en',
): Promise<Testimonial[]> {
  const staticTestimonials: Testimonial[] = getLocalizedTestimonials(locale)
  let live: ApiTestimonial[] = []
  try {
    live = await getTestimonials({
      next: { revalidate: 3600, tags: ['testimonials'] },
    })
  } catch {
    live = []
  }
  if (live.length === 0) return staticTestimonials

  const bySlug = new Map(staticTestimonials.map((t) => [t.id, t]))
  return live.map((row) => {
    const translated = row.slug ? bySlug.get(row.slug) : undefined
    return translated && locale !== 'en'
      ? translated
      : fromDatabase(row, translated)
  })
}
