import 'server-only'
import { whyUs as sourceRecords } from './company'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'

export function getWhyUs(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.icon, locale, { es, fr }, [
      'label',
      'place',
      'title',
      'text',
      'body',
    ]),
  }))
}
export function getPromises(locale: AppLocale = 'en') {
  return getWhyUs(locale)
    .slice(0, 4)
    .map(({ title, text }) => ({ title, text }))
}
