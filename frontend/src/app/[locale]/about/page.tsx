import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { slogan } from '@/config/site'
import { CtaBand } from '@/components/layout/cta-band'
import { AboutHero } from '@/features/about/components/about-hero'
import { AboutIntroduction } from '@/features/about/components/about-introduction'
import { FounderStory } from '@/features/about/components/founder-story'
import { PlacesMarquee } from '@/features/about/components/places-marquee'
import { TravelOfferings } from '@/features/about/components/travel-offerings'
import { CompanyValues } from '@/features/about/components/company-values'
import { GuestReviews } from '@/features/about/components/guest-reviews'

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
      title: copy('About Us: A Local Ethiopia Tour Operator from Lalibela'),
      description: copy(
        'Extraordinary Ethiopia Tours is a locally based Ethiopia tour operator founded in Lalibela, offering private and group tours across the historic north, the Omo Valley, the Danakil, the Simien and Bale Mountains and beyond.',
      ),
    },
    '/about',
    locale,
  )
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  return (
    <>
      <AboutHero />
      <AboutIntroduction />
      <FounderStory />
      <PlacesMarquee />
      <TravelOfferings />
      <CompanyValues />
      <GuestReviews />
      <CtaBand
        eyebrow={copy(slogan)}
        title={copy('Start with a conversation')}
        text={copy(
          'Tell us how much time you have and what draws you to Ethiopia. Our team in Lalibela will reply within a day with honest advice and a first outline of your journey.',
        )}
        primary={{ label: copy('Plan your journey'), href: '/contact' }}
        secondary={{ label: copy('Browse tours'), href: '/tours' }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-landscape.jpg"
      />
    </>
  )
}
