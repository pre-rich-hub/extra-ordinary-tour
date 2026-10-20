import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { ContactDetails } from '@/features/contact/components/contact-details'
import { PlanningSteps } from '@/features/contact/components/planning-steps'
import { ContactPromises } from '@/features/contact/components/contact-promises'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Extraordinary Ethiopia Tours in Lalibela to plan your private or group tour of Ethiopia. Call or WhatsApp +251 912 039405 or email info@extraordinaryethiopiatours.com. We are available 24/7.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s begin your extraordinary journey"
        lede="Questions, or ready to plan your Ethiopian adventure? Write to our team in Lalibela and we will reply personally, usually the same day."
        image="/images/simien-trek.jpg"
        imageAlt="The escarpment of the Simien Mountains in the Ethiopian highlands"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        meta={[
          { label: 'Reply Time', value: 'Within 24 hrs' },
          { label: 'Based In', value: 'Lalibela' },
          { label: 'Support', value: '24/7' },
          { label: 'Tours', value: 'Private & Group' },
        ]}
      />

      {/* Form + details */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <ContactDetails />

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </section>

      {/* Process */}
      <PlanningSteps />

      {/* Promises */}
      <ContactPromises />
    </>
  )
}
