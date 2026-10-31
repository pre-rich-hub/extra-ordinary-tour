import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PostCard } from './post-card'
import { postDestinations } from '../data/relations'
import type { Post } from '../types'

export function RelatedPosts({ post, posts }: { post: Post; posts: Post[] }) {
  const copy = useCopy()

  // Articles about the same places first, then the same category.
  const places = new Set(postDestinations[post.slug] ?? [])
  const score = (p: Post) =>
    2 * (postDestinations[p.slug] ?? []).filter((d) => places.has(d)).length +
    (p.category === post.category ? 1 : 0)
  const more = posts
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, i, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, 3)
    .map(({ p }) => p)
  return (
    <section className="border-t border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-accent sm:mb-5">
              {copy('More From The Travel Journal')}
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
              {copy('Also worth your time')}
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
          >
            {copy('All writing')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
