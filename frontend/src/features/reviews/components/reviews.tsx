import { getLocale } from 'next-intl/server'
import type { AppLocale } from '@/i18n/routing'
import { getTestimonials } from '@/features/reviews/data/localized'
import { ReviewsClient } from './reviews-client'
export async function Reviews() {
  const locale = (await getLocale()) as AppLocale
  return <ReviewsClient testimonials={getTestimonials(locale)} />
}
