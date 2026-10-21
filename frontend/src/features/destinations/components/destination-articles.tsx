import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { Reveal } from '@/components/ui/reveal'
import { PostCard } from '@/features/blog/components/post-card'
import { getPosts } from '@/features/blog/data/localized'
import { postsAbout } from '@/features/blog/data/relations'
import type { Destination } from '../types'

/** Journal articles substantially about this destination, if any. */
export function DestinationArticles({
  destination: d,
}: {
  destination: Destination
}) {
  const copy = useCopy()

  const posts = postsAbout(d.slug, getPosts(useLocale() as AppLocale)).slice(
    0,
    3,
  )
  if (!posts.length) return null
  return (
    <section className="border-t border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow mb-4 text-accent sm:mb-5">
            {copy('From The Journal')}
          </p>
          <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {copy('Read more about {v0}', { v0: d.name })}
          </h2>
        </Reveal>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
