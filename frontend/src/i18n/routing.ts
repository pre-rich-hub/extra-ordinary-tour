import { defineRouting } from 'next-intl/routing'
export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,
  localeCookie: false,
})
export type AppLocale = (typeof routing.locales)[number]
export function isLocale(value: unknown): value is AppLocale {
  return (
    typeof value === 'string' && routing.locales.includes(value as AppLocale)
  )
}
