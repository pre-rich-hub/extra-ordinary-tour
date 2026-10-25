import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph } from '@/lib/seo/schema'
import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { GuideSections } from '@/components/layout/guide-sections'
import { SectionNav } from '@/components/ui/section-nav'
import { getAboutEthiopia } from '@/features/about-ethiopia/data/localized'
import {
  MajorDestinations,
  majorDestinationSlugs,
} from '@/features/about-ethiopia/components/major-destinations'
import { getDestinations } from '@/features/destinations/data/localized'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  return buildPageMetadata(
    {
      title: copy('About Ethiopia: History, Culture, Geography and Traditions'),
      description: copy(
        'Discover Ethiopia, the Land of Origins: its 3,000-year history, landscapes from the Simien Mountains to the Danakil, more than eighty peoples, ancient faiths, coffee culture and major travel destinations.',
      ),
    },
    '/about-ethiopia',
    locale,
  )
}

export default async function AboutEthiopiaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  const sections = getAboutEthiopia(locale)
  const destinations = getDestinations(locale)
  const featured = majorDestinationSlugs.flatMap(
    (slug) => destinations.find((d) => d.slug === slug) ?? [],
  )
  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('About Ethiopia') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/about-ethiopia',
          locale,
          name: copy('Welcome to Ethiopia, the Land of Origins'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('About Ethiopia')}
        title={copy('Welcome to Ethiopia, the Land of Origins')}
        lede={copy(
          'Ancient kingdoms and rock-hewn churches, mountains above the clouds and deserts below sea level, more than eighty peoples and the world’s first coffee. An introduction to the country before you travel.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-giyorgis.jpg"
        imageAlt={copy(
          'The cross-shaped Church of St George carved into the rock at Lalibela',
        )}
        crumbs={crumbs}
      />
      <SectionNav
        items={[
          ...sections.map(({ id, label }) => ({ id, label })),
          { id: 'destinations', label: copy('Destinations') },
        ]}
      />
      <GuideSections sections={sections} />
      <MajorDestinations destinations={featured} />
      <CtaBand
        title={copy('Ready to see it for yourself?')}
        text={copy(
          'Tell us what draws you to Ethiopia and how much time you have. Our team in Lalibela will design a private journey around your interests, pace and preferences.',
        )}
        primary={{ label: copy('Plan your journey'), href: '/contact' }}
        secondary={{
          label: copy('Read the travel guide'),
          href: '/travel-guide',
        }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-landscape.jpg"
      />
    </>
  )
}
