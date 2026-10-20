import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { posts } from '../data/posts'
import type { Post } from '../types'

export function ArticleBody({ post }: { post: Post }) {
  const index = posts.findIndex((p) => p.slug === post.slug)
  const next = posts[(index + 1) % posts.length]
  return (
    <div className="shell py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-2xl">
        {post.body.map((para, i) => (
          <Reveal key={para.slice(0, 24)} delay={i * 50}>
            <p
              className={
                i === 0
                  ? 'text-pretty text-lg leading-[1.75] text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.82] first-letter:text-primary sm:text-xl'
                  : 'mt-7 text-pretty leading-[1.75] text-muted-foreground sm:text-lg'
              }
            >
              {para}
            </p>
          </Reveal>
        ))}

        <Reveal className="mt-14 border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Written by{' '}
            <span className="font-medium text-foreground">{post.author}</span>,{' '}
            {post.authorRole.toLowerCase()}. Questions about any of the above
            are always welcome,{' '}
            <Link
              href="/contact"
              className="border-b border-accent/50 pb-0.5 text-primary transition-colors hover:border-accent hover:text-accent"
            >
              write to us
            </Link>
            .
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <Link
            href={`/blog/${next.slug}`}
            className="group block border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Read Next
            </p>
            <p className="mt-3 text-balance font-serif text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {next.title}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {next.readTime}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
