import { getRequestConfig } from 'next-intl/server'
import { routing, isLocale } from './routing'
import { mergeMessages } from './messages'
import en from '../messages/en.json'
const loaders = {
  es: () => import('../messages/es.json'),
  fr: () => import('../messages/fr.json'),
}
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = isLocale(requested) ? requested : routing.defaultLocale
  const overlay = locale === 'en' ? {} : (await loaders[locale]()).default
  return { locale, messages: mergeMessages(en, overlay) as typeof en }
})
