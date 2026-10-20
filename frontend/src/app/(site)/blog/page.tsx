import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { PostCard } from '@/features/blog/components/post-card'
import { PostsGrid } from '@/features/blog/components/posts-grid'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaBand } from '@/components/layout/cta-band'
import { posts } from '@/features/blog/data/posts'
import { NewsletterSection } from '@/features/newsletter/components/newsletter-section'

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Ethiopia travel guides, destination articles and festival notes from Extraordinary Ethiopia Tours: when to go, what to pack and what to expect.',
}

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Ethiopia travel guides & stories"
        lede="Written by the people who run these journeys: when to come, what to pack, where to go and the festivals worth planning around."
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
      <NewsletterSection />

      <CtaBand
        title="Read something that changed your mind?"
        text="Most of these articles started as an answer to a guest question. Ask us yours and it may well become the next one."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/simien-trek.jpg"
      />
    </>
  )
}
