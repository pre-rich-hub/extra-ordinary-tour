import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { PostCard } from '@/features/blog/components/post-card'
import { PostsGrid } from '@/features/blog/components/posts-grid'
import { SectionHeading } from '@/components/ui/section-heading'
import { NewsletterForm } from '@/features/enquiry/components/newsletter-form'
import { CtaBand } from '@/components/layout/cta-band'
import { posts } from '@/content'

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Ethiopia travel guides, destination articles and festival notes from Extraordinary Ethiopia Tours — when to go, what to pack and what to expect.',
}

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Ethiopia travel guides & stories"
        lede="Written by the people who run these journeys — when to come, what to pack, where to go and the festivals worth planning around."
        image="/images/coffee-ceremony.jpg"
        imageAlt="A jebena and cups prepared for an Ethiopian coffee ceremony"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />

      {/* Featured */}
      <section className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-8">
          <p className="eyebrow text-accent">
            Latest Dispatch
          </p>
        </Reveal>
        <Reveal delay={80}>
          <PostCard post={featured} wide />
        </Reveal>
      </section>

      {/* All posts */}
      <section className="border-t border-border">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="Archive"
            title="Everything we have written down"
            aside="Planning guides, destination features and festival notes, filed by what they are useful for."
          />
          <PostsGrid posts={rest} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal>
            <p className="eyebrow mb-5 text-accent">
              The Letter
            </p>
            <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-background sm:text-4xl">
              One letter a season, no more than that
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-background/70">
              Festival dates worth planning around, new itineraries and the
              occasional honest word about where to go this season.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:justify-self-end">
            <NewsletterForm />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Read something that changed your mind?"
        text="Most of these articles started as an answer to a guest question. Ask us yours and it may well become the next one."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/simien-trek.jpg"
      />
    </>
  )
}
