import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { toursVisiting } from '@/features/destinations/data/relations'
import { postDestinations } from '../data/relations'
import type { Destination } from '@/features/destinations/types'
import type { Tour } from '@/features/tours/types'
import type { Post } from '../types'

export function ArticleBody({
  post,
  posts,
  destinations,
  tours,
}: {
  post: Post
  posts: Post[]
  destinations: Destination[]
  tours: Tour[]
}) {
  const copy = useCopy()

  const index = posts.findIndex((p) => p.slug === post.slug)
  const next = posts[(index + 1) % posts.length]
  const covered = (postDestinations[post.slug] ?? [])
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter((d) => d !== undefined)
  const journeys = covered.length
    ? toursVisiting(covered[0], tours).slice(0, 3)
    : []
  return (
    <div className="shell py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-2xl">
        {post.body.map((block, i) => (
          // Capped so the last blocks of a long article don't lag on scroll.
          <Reveal key={i} delay={Math.min(i, 8) * 50}>
            {typeof block === 'string' ? (
              <p
                className={
                  i === 0
                    ? 'text-pretty text-lg leading-[1.75] text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.82] first-letter:text-primary sm:text-xl'
                    : 'mt-7 text-pretty leading-[1.75] text-muted-foreground sm:text-lg'
                }
              >
                {copy(block)}
              </p>
            ) : 'heading' in block ? (
              <h2 className="mt-12 text-balance font-serif text-2xl leading-tight text-foreground sm:text-[1.75rem]">
                {block.heading}
              </h2>
            ) : (
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-[1.75] text-muted-foreground marker:text-accent sm:text-lg">
                {block.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        <Reveal className="mt-14 border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {copy('Written by')}{' '}
            <span className="font-medium text-foreground">
              {copy(post.author)}
            </span>
            , {post.authorRole.toLowerCase()}
            {copy(
              '. Questions about any of the above are always welcome,',
            )}{' '}
            <Link
              href="/contact"
              className="border-b border-accent/50 pb-0.5 text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {copy('write to us')}
            </Link>
            .
          </p>
        </Reveal>

        {covered.length > 0 && (
          <Reveal className="mt-12">
            <h2 className="eyebrow font-sans text-accent">
              {copy('In This Article')}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {covered.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary sm:text-[11px]"
                  >
                    <MapPin className="h-3 w-3 text-accent" />
                    {copy('{v0} travel guide', { v0: d.name })}
                  </Link>
                </li>
              ))}
            </ul>
            {journeys.length > 0 && (
              <>
                <p className="mt-8 text-sm text-muted-foreground">
                  {copy('Tours that visit {v0}', { v0: covered[0].name })}
                </p>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {journeys.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tours/${t.slug}`}
                        className="group flex items-center justify-between gap-4 py-4 text-foreground transition-colors hover:text-primary"
                      >
                        <span className="font-serif text-lg">
                          {copy(t.title)}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        )}

        <Reveal className="mt-12">
          <Link
            href={`/blog/${next.slug}`}
            className="group block border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              {copy('Read Next')}
            </p>
            <p className="mt-3 text-balance font-serif text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {copy(next.title)}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {copy(next.readTime)}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
