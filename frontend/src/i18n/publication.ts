import type { AppLocale } from './routing'
export const publication: Record<AppLocale, 'published' | 'draft'> = {
  en: 'published',
  es: 'draft',
  fr: 'draft',
}
export const isPublished = (locale: AppLocale) =>
  publication[locale] === 'published'
