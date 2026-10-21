import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph } from '@/lib/seo/schema'
import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { ContactDetails } from '@/features/contact/components/contact-details'
import { PlanningSteps } from '@/features/contact/components/planning-steps'
import { ContactPromises } from '@/features/contact/components/contact-promises'

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
      title: copy('Contact Us: Plan Your Ethiopia Tour'),
      description: copy(
        'Contact Extraordinary Ethiopia Tours in Lalibela to plan your private or group tour of Ethiopia. Call or WhatsApp +251 912 039405 or email info@extraordinaryethiopiatours.com. We are available 24/7.',
      ),
    },
    '/contact',
    locale,
  )
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Contact') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/contact',
          locale,
          type: 'ContactPage',
          name: copy('Let’s begin your extraordinary journey'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('Contact Us')}
        title={copy('Let’s begin your extraordinary journey')}
        lede={copy(
          'Questions, or ready to plan your Ethiopian adventure? Write to our team in Lalibela and we will reply personally, usually the same day.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-trek.jpg"
        imageAlt={copy(
          'The escarpment of the Simien Mountains in the Ethiopian highlands',
        )}
        crumbs={crumbs}
        meta={[
          { label: copy('Reply Time'), value: copy('Within 24 hrs') },
          { label: copy('Based In'), value: copy('Lalibela') },
          { label: copy('Support'), value: '24/7' },
          { label: copy('Tours'), value: copy('Private & Group') },
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
