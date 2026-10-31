import { getLocale } from 'next-intl/server'
import type { AppLocale } from '@/i18n/routing'
import { getTestimonialsData } from '@/features/reviews/server/catalog'
import { ReviewsClient } from './reviews-client'
export async function Reviews() {
  const locale = (await getLocale()) as AppLocale
  return <ReviewsClient testimonials={await getTestimonialsData(locale)} />
}
