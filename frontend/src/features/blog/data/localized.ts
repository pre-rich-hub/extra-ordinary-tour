import 'server-only'
import { posts as sourceRecords } from './posts'
import { localizeRecord } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import es from './locales/es.json'
import fr from './locales/fr.json'

export function getPosts(locale: AppLocale = 'en') {
  return sourceRecords.map((source) => ({
    ...localizeRecord(source, source.slug, locale, { es, fr }, [
      'title',
      'category',
      'date',
      'readTime',
      'authorRole',
      'excerpt',
      'body',
    ]),
    categoryKey: source.category,
  }))
}
export function getPost(slug: string, locale: AppLocale = 'en') {
  return getPosts(locale).find((record) => record.slug === slug)
}
