import { getLocale } from 'next-intl/server'
import type { AppLocale } from '@/i18n/routing'
import { getWhyUs } from '@/features/about/data/localized'
import { WhyTravelClient } from './why-travel-client'
export async function WhyTravel() {
  const locale = (await getLocale()) as AppLocale
  return <WhyTravelClient whyUs={getWhyUs(locale)} />
}
