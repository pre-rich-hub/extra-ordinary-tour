import type { AppLocale } from './routing'
export function sameShape(source: unknown, translated: unknown): boolean {
  if (typeof source === 'string')
    return typeof translated === 'string' && translated.trim().length > 0
  if (Array.isArray(source))
    return (
      Array.isArray(translated) &&
      source.length === translated.length &&
      source.every((item, index) => sameShape(item, translated[index]))
    )
  if (source && typeof source === 'object')
    return (
      !!translated &&
      typeof translated === 'object' &&
      Object.entries(source).every(([key, value]) =>
        sameShape(value, (translated as Record<string, unknown>)[key]),
      )
    )
  return source === translated
}
export function localizeRecord<T extends object>(
  source: T,
  key: string,
  locale: AppLocale,
  overlays: Record<'es' | 'fr', unknown>,
  fields: readonly string[],
): T {
  if (locale === 'en') return { ...source }
  const translated = (
    overlays[locale] as Record<string, Record<string, unknown>>
  )[key]
  const selected = Object.fromEntries(
    fields
      .filter((field) => field in source)
      .map((field) => [field, (source as Record<string, unknown>)[field]]),
  )
  // Fall back as a whole entity; never present partial translated itineraries.
  if (!sameShape(selected, translated)) return { ...source }
  return {
    ...source,
    ...Object.fromEntries(
      Object.keys(selected).map((field) => [field, translated[field]]),
    ),
  }
}
