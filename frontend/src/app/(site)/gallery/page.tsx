import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { SectionHeading } from '@/components/ui/section-heading'
import { GalleryGrid } from '@/features/gallery/components/gallery-grid'
import { galleryCategories, galleryPhotos } from '@/features/gallery/data/gallery'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Rock-hewn churches, highland wildlife, salt flats, festivals and the peoples of the Omo Valley: a gallery of Ethiopia from the routes we travel.',
}

export default function GalleryPage() {
  const places = new Set(galleryPhotos.map((p) => p.location)).size

  return (
    <>
      <PageHero
        eyebrow="The Gallery"
        title="Ethiopia, seen slowly"
        lede="Salt and fire in the Danakil, stone churches in the north, wildlife on the high plateaus and the people who make each place what it is."
        image="/images/simien-landscape.jpg"
        imageAlt="Basalt pinnacles of the Simien Mountains rising above the clouds"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        meta={[
          { label: 'Photographs', value: String(galleryPhotos.length) },
          { label: 'Places', value: String(places) },
          { label: 'Collections', value: String(galleryCategories.length) },
          { label: 'Best Light', value: 'Oct to Mar' },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Moments from the road"
          aside="Tap any photograph to see it in full. Every scene here sits on a route we run. Ask us how to stand where the camera stood."
        />
        <GalleryGrid photos={galleryPhotos} categories={galleryCategories} />
      </section>

      <CtaBand
        title="See it for yourself"
        text="Tell us which of these places pulls at you, and our team will shape a journey around the season and the pace you prefer."
        primary={{ label: 'Plan Your Journey', href: '/contact' }}
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/danakil-assale.jpg"
      />
    </>
  )
}
