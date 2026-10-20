import 'server-only'
import { tours as sourceRecords } from './tours'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'

export function getTours(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.slug, locale, { es, fr }, [
      'title',
      'days',
      'style',
      'season',
      'from',
      'group',
      'teaser',
      'summary',
      'includes',
      'excludes',
      'itinerary',
      'places',
    ]),
    canonicalTitle: source.title,
    canonicalPlaces: source.places,
    styleKeys: source.style.split('·').map((value) => value.trim()),
    priceAmount: null,
  }))
}
export function getTour(slug: string, locale: AppLocale = 'en') {
  return getTours(locale).find((record) => record.slug === slug)
}
