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
import { getDestinationsData } from '@/features/destinations/server/catalog'

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
        'Discover Ethiopia, the Land of Origins: its 3,000-year history, landscapes from the Simien Mountains to the Danakil, more than 80 ethnic groups, ancient faiths, coffee culture and major travel destinations.',
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
  const destinations = await getDestinationsData(locale)
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
          'Discover ancient kingdoms and remarkable rock-hewn churches, mountain peaks rising above the clouds and volcanic deserts below sea level. Explore the traditions of Ethiopia’s many cultural communities and the birthplace of coffee. This is your introduction to the country, its people and the experiences that await you.',
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
