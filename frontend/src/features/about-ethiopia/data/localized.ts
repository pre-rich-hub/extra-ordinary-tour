import 'server-only'
import { aboutEthiopia as sourceRecords } from './about-ethiopia'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export function getAboutEthiopia(locale: AppLocale = 'en') {
  return sourceRecords.map((source) =>
    localizeRecord(source, source.id, locale, { es, fr, de }, [
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
