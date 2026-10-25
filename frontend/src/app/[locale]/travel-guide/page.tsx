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
import { getTravelGuide } from '@/features/travel-guide/data/localized'

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
      title: copy('Ethiopia Travel Guide: Visas, Climate, Money and Tips'),
      description: copy(
        'Plan your trip to Ethiopia: when to go, what to pack, visas and the e-Visa, getting around, money, health, local etiquette, food and the public holiday calendar.',
      ),
    },
    '/travel-guide',
    locale,
  )
}

export default async function TravelGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  const sections = getTravelGuide(locale)
  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Travel Guide') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/travel-guide',
          locale,
          name: copy('What you need to know before visiting Ethiopia'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('Travel Guide')}
        title={copy('What you need to know before visiting Ethiopia')}
        lede={copy(
          'Whether you are planning the historic north, the Danakil Depression or a festival journey, this guide covers the essentials: seasons, visas, money, health, local customs and public holidays.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/addis-skyline.jpg"
        imageAlt={copy(
          'The Addis Ababa skyline seen from the green hills of the city',
        )}
        crumbs={crumbs}
      />
      <SectionNav items={sections.map(({ id, label }) => ({ id, label }))} />
      <GuideSections sections={sections} />
      <CtaBand
        title={copy('Still have questions?')}
        text={copy(
          'Our team in Lalibela answers every enquiry within 24 hours, and once you book we send a full pre-departure briefing for your route.',
        )}
        primary={{ label: copy('Ask our team'), href: '/contact' }}
        secondary={{
          label: copy('Pre-departure information'),
          href: '/blog/essential-travel-information',
        }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-landscape.jpg"
      />
    </>
  )
}
