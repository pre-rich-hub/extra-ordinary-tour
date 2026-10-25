import 'server-only'
import { travelGuide as sourceRecords } from './travel-guide'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'

export function getTravelGuide(locale: AppLocale = 'en') {
  return sourceRecords.map((source) =>
    localizeRecord(source, source.id, locale, { es, fr }, [
      'label',
      'eyebrow',
      'title',
      'imageAlt',
      'paragraphs',
      'facts',
      'links',
    ]),
  )
}
