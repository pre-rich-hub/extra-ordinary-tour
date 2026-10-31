import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { notFound } from 'next/navigation'
import { documentClass, viewport } from '@/config/fonts'
import { routing, isLocale } from '@/i18n/routing'
import { siteOrigin } from '@/lib/seo/urls'
import { siteGraph } from '@/lib/seo/schema'
import { JsonLd } from '@/components/seo/json-ld'
import { SiteNav } from '@/components/layout/site-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { FloatingSupport } from '@/components/layout/floating-support'
import { TouchActive } from '@/components/layout/touch-active'
import { getDestinations } from '@/features/destinations/data/localized'
import { destinationRegions } from '@/features/destinations/data/regions'
import { getTours } from '@/features/tours/data/localized'
import '../globals.css'
export { viewport }
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'Common' })
  // Route pages own canonicals, language alternatives and indexing policy.
  // A missing route must not inherit the homepage's canonical or index rule.
  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: t('siteTitle'),
      template: '%s · Extraordinary Ethiopia Tours',
    },
    description: t('siteDescription'),
    // Google Search Console ownership check; keep after verification.
    verification: { google: '9k8GqM_2hxvfa3MFHhK_NW685EsQcbSF9M-LjM2Tw-E' },
  }
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations('Common')
  // The menu previews four destinations and three tours; send only those.
  const allDestinations = getDestinations(locale)
  const regions = destinationRegions.map(({ id, label }) => ({
    id,
    label:
      allDestinations.find((d) => d.regionKey === label)?.region ?? label,
  }))
  const destinations = allDestinations
    .slice(0, 4)
    .map(({ slug, name, region, tag, image, teaser }) => ({
      slug,
      name,
      region,
      tag,
      image,
      teaser,
    }))
  const tours = getTours(locale)
    .slice(0, 3)
    .map(({ slug, title, image, style, from, days, teaser }) => ({
      slug,
      title,
      image,
      style,
      from,
      days,
      teaser,
    }))
  return (
    <html lang={locale} className={documentClass}>
      <body className="antialiased">
        <JsonLd data={siteGraph()} />
        <NextIntlClientProvider key={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
          >
            {t('skipToContent')}
          </a>
          <SiteNav
            destinations={destinations}
            regions={regions}
            tours={tours}
          />
          <main id="main">{children}</main>
          <SiteFooter />
          <FloatingSupport />
          <TouchActive />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
