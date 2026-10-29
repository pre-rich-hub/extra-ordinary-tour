import 'server-only'
import { tours as sourceRecords } from './tours'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import { formatPrice } from '../lib/format'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export function getTours(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.slug, locale, { es, fr, de }, [
      'title',
      'days',
      'style',
      'season',
      'from',
      'group',
      'teaser',
      'summary',
      'highlights',
      'includes',
      'excludes',
      'itinerary',
      'places',
    ]),
    canonicalTitle: source.title,
    canonicalPlaces: source.places,
    styleKeys: source.style.split('·').map((value) => value.trim()),
    // Static starting prices are formatted per locale, not translated.
    ...(source.priceAmount
      ? { from: formatPrice(source.priceAmount, locale) }
      : {}),
    priceAmount: source.priceAmount ?? null,
  }))
}
export function getTour(slug: string, locale: AppLocale = 'en') {
  return getTours(locale).find((record) => record.slug === slug)
}
