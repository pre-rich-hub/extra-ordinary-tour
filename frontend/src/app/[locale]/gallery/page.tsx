import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { SectionHeading } from '@/components/ui/section-heading'
import { GalleryGrid } from '@/features/gallery/components/gallery-grid'
import {
  galleryCategories,
  galleryPhotos,
} from '@/features/gallery/data/gallery'
import { getGalleryPhotos } from '@/features/gallery/data/localized'

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
      title: copy('Gallery'),
      description: copy(
        'Rock-hewn churches, highland wildlife, salt flats, festivals and the peoples of the Omo Valley: a gallery of Ethiopia from the routes we travel.',
      ),
    },
    '/gallery',
    locale,
  )
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const galleryPhotos = getGalleryPhotos(locale)

  const places = new Set(galleryPhotos.map((p) => p.location)).size

  return (
    <>
      <PageHero
        eyebrow={copy('The Gallery')}
        title={copy('Ethiopia, seen slowly')}
        lede={copy(
          'Salt and fire in the Danakil, stone churches in the north, wildlife on the high plateaus and the people who make each place what it is.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-landscape.jpg"
        imageAlt={copy(
          'Basalt pinnacles of the Simien Mountains rising above the clouds',
        )}
        crumbs={[
          { label: copy('Home'), href: '/' },
          { label: copy('Gallery') },
        ]}
        meta={[
          { label: copy('Photographs'), value: String(galleryPhotos.length) },
          { label: copy('Places'), value: String(places) },
          {
            label: copy('Collections'),
            value: String(galleryCategories.length),
          },
          { label: copy('Best Light'), value: copy('Oct to Mar') },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy('The Collection')}
          title={copy('Moments from the road')}
          aside={copy(
            'Tap any photograph to see it in full. Every scene here sits on a route we run. Ask us how to stand where the camera stood.',
          )}
        />
        <GalleryGrid photos={galleryPhotos} categories={galleryCategories} />
      </section>

      <CtaBand
        title={copy('See it for yourself')}
        text={copy(
          'Tell us which of these places pulls at you, and our team will shape a journey around the season and the pace you prefer.',
        )}
        primary={{ label: copy('Plan Your Journey'), href: '/contact' }}
        secondary={{ label: copy('Browse Tours'), href: '/tours' }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/danakil-assale.jpg"
      />
    </>
  )
}
