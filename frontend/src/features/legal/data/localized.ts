import 'server-only'
import { sameShape } from '@/i18n/content'
import type { AppLocale } from '@/i18n/routing'
import type { LegalDocument } from '../types'
import { privacyPolicy } from './privacy-policy'
import { termsAndConditions } from './terms-and-conditions'
import es from './locales/es.json'
import fr from './locales/fr.json'

const sources = { privacyPolicy, termsAndConditions }
export type LegalDocumentKey = keyof typeof sources

/** Translated legal text, or the English original if a translation is incomplete. */
export function getLegalDocument(
  key: LegalDocumentKey,
  locale: AppLocale,
): LegalDocument {
  const source = sources[key]
  if (locale === 'en') return source
  const translated = { es, fr }[locale][key]
  return sameShape(source, translated) ? (translated as LegalDocument) : source
}
