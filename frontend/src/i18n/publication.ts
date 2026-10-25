import type { AppLocale } from './routing'
export const publication: Record<AppLocale, 'published' | 'draft'> = {
  en: 'published',
  es: 'published',
  fr: 'published',
  de: 'published',
}
export const isPublished = (locale: AppLocale) =>
  publication[locale] === 'published'
