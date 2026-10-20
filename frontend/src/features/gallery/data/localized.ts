import 'server-only'
import { galleryPhotos as sourceRecords } from './gallery'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'

export function getGalleryPhotos(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.id, locale, { es, fr }, [
      'alt',
      'title',
      'location',
      'caption',
    ]),
  }))
}
export { galleryCategories } from './gallery'
