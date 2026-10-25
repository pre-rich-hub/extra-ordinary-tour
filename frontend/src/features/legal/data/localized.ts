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

/**
 * Translated legal text, or the English original if a translation is missing
 * or incomplete; German has none yet.
 */
export function getLegalDocument(
  key: LegalDocumentKey,
  locale: AppLocale,
): { document: LegalDocument; translated: boolean } {
  const source = sources[key]
  const catalogues: Partial<Record<AppLocale, typeof es>> = { es, fr }
  const translated = catalogues[locale]?.[key]
  return translated && sameShape(source, translated)
    ? { document: translated as LegalDocument, translated: true }
    : { document: source, translated: false }
}
