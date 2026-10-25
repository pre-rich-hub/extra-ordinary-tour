import 'server-only'
import { destinations as sourceRecords } from './destinations'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export function getDestinations(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.slug, locale, { es, fr, de }, [
      'name',
      'region',
      'tag',
      'teaser',
      'intro',
      'bestTime',
      'duration',
      'altitude',
      'highlights',
      'paragraphs',
    ]),
    canonicalName: source.name,
    regionKey: source.region,
  }))
}
export function getDestination(slug: string, locale: AppLocale = 'en') {
  return getDestinations(locale).find((record) => record.slug === slug)
}
