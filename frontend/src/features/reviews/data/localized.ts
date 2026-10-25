import 'server-only'
import { testimonials as sourceRecords } from './testimonials'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export function getTestimonials(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.id, locale, { es, fr, de }, [
      'quote',
      'detail',
      'title',
      'date',
    ]),
  }))
}
export { reviewSummaries, reviewSummary } from './testimonials'
