import type { AppLocale } from '@/i18n/routing'
export function hasPrice(from: string) {
  return /\d/.test(from)
}
export function priceShort(from: string) {
  return from.replace(
    /\s+(?:per person|por persona|par personne|pro Person)$/i,
    '',
  )
}
export function nightsLabel(nights: number, locale: AppLocale = 'en') {
  if (!nights)
    return {
      en: 'Day trip',
      es: 'Excursión de un día',
      fr: 'Excursion à la journée',
      de: 'Tagesausflug',
    }[locale]
  const unit = {
    en: ['night', 'nights'],
    es: ['noche', 'noches'],
    fr: ['nuit', 'nuits'],
    de: ['Nacht', 'Nächte'],
  }[locale]
  return `${new Intl.NumberFormat(locale).format(nights)} ${unit[nights === 1 ? 0 : 1]}`
}
