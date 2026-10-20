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

export const metadata: Metadata = {
  title: 'About Us',
  description: `${slogan} Extraordinary Ethiopia Tours is a locally based Ethiopia tour operator founded in Lalibela, offering private and group tours across the historic north, the Omo Valley, the Danakil, the Simien and Bale Mountains and beyond.`,
}

export default function AboutPage() {
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
        eyebrow={slogan}
        title="Start with a conversation"
        text="Tell us how much time you have and what draws you to Ethiopia. Our team in Lalibela will reply within a day with honest advice and a first outline of your journey."
        primary={{ label: 'Plan your journey', href: '/contact' }}
        secondary={{ label: 'Browse tours', href: '/tours' }}
        image="/images/lalibela-landscape.jpg"
      />
    </>
  )
}
