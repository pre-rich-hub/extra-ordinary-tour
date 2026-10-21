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
import { PostCard } from '@/features/blog/components/post-card'
import { PostsGrid } from '@/features/blog/components/posts-grid'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaBand } from '@/components/layout/cta-band'
import { posts } from '@/features/blog/data/posts'
import { getPosts } from '@/features/blog/data/localized'
import { NewsletterSection } from '@/features/newsletter/components/newsletter-section'

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
      title: copy('Ethiopia Travel Guides & Stories'),
      description: copy(
        'Ethiopia travel guides, destination articles and festival notes from Extraordinary Ethiopia Tours: when to go, what to pack and what to expect.',
      ),
    },
    '/blog',
    locale,
  )
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const posts = getPosts(locale)

  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Journal') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/blog',
          locale,
          type: 'CollectionPage',
          name: copy('Ethiopia travel guides & stories'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('The Journal')}
        title={copy('Ethiopia travel guides & stories')}
        lede={copy(
          'Written by the people who run these journeys: when to come, what to pack, where to go and the festivals worth planning around.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/coffee-ceremony.jpg"
        imageAlt={copy(
          'A jebena and cups prepared for an Ethiopian coffee ceremony',
        )}
        crumbs={crumbs}
      />

      {/* Featured */}
      <section className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-8">
          <h2 className="eyebrow font-sans text-accent">
            {copy('Latest Dispatch')}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <PostCard post={featured} wide />
        </Reveal>
      </section>

      {/* All posts */}
      <section className="border-t border-border">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={copy('Archive')}
            title={copy('Everything we have written down')}
            aside={copy(
              'Planning guides, destination features and festival notes, filed by what they are useful for.',
            )}
          />
          <PostsGrid posts={rest} />
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      <CtaBand
        title={copy('Read something that changed your mind?')}
        text={copy(
          'Most of these articles started as an answer to a guest question. Ask us yours and it may well become the next one.',
        )}
        secondary={{ label: copy('Browse Tours'), href: '/tours' }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-trek.jpg"
      />
    </>
  )
}
