import 'server-only'
import { getTranslations } from 'next-intl/server'
import { createCopy } from './copy'
export async function getCopy() {
  return createCopy(await getTranslations('Copy'))
}
