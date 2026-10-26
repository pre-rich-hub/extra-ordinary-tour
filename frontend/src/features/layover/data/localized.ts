import 'server-only'
import { layoverPackages as sourceRecords } from './layover-packages'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import { formatPrice } from '@/features/tours/lib/format'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export function getLayoverPackages(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.slug, locale, { es, fr, de }, [
      'hours',
      'title',
      'price',
      'teaser',
      'itinerary',
      'includes',
      'best',
    ]),
    ...(source.priceAmount
      ? { price: formatPrice(source.priceAmount, locale) }
      : {}),
  }))
}
export function getLayoverPackage(slug: string, locale: AppLocale = 'en') {
  return getLayoverPackages(locale).find((record) => record.slug === slug)
}
