import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { Post } from '../types'

export function ArticleHeader({ post }: { post: Post }) {
  return (
    <header className="border-b border-border">
      <div className="shell pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
        <Reveal className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary sm:text-[11px]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              The Journal
            </Link>
          </nav>

          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-accent">{post.category}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            {post.date}
            <span className="h-3 w-px bg-border" aria-hidden />
            {post.readTime}
          </p>

          <h1 className="mt-5 text-balance text-[2rem] font-medium leading-[1.1] text-foreground sm:text-4xl lg:text-[3.25rem]">
            {post.title}
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {post.excerpt}
          </p>

          <div className="mt-9 flex items-center gap-4 border-t border-border pt-7">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/traveler-portrait.png"
                alt=""
                aria-hidden
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block text-sm font-medium text-foreground">
                {post.author}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {post.authorRole}
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
