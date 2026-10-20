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
import { buildPageMetadata } from '@/i18n/metadata'
import { SiteNav } from '@/components/layout/site-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { FloatingSupport } from '@/components/layout/floating-support'
import { getDestinations } from '@/features/destinations/data/localized'
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
  return buildPageMetadata(
    {
      title: {
        default: t('siteTitle'),
        template: '%s · Extraordinary Ethiopia Tours',
      },
      description: t('siteDescription'),
    },
    '/',
    locale,
  )
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
  const destinations = getDestinations(locale).map(
    ({ slug, name, region, tag, image, teaser }) => ({
      slug,
      name,
      region,
      tag,
      image,
      teaser,
    }),
  )
  const tours = getTours(locale).map(
    ({ slug, title, image, style, from, days, teaser }) => ({
      slug,
      title,
      image,
      style,
      from,
      days,
      teaser,
    }),
  )
  return (
    <html lang={locale} className={documentClass}>
      <body className="antialiased">
        <NextIntlClientProvider key={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
          >
            {t('skipToContent')}
          </a>
          <SiteNav destinations={destinations} tours={tours} />
          <main id="main">{children}</main>
          <SiteFooter />
          <FloatingSupport />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
