import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Post } from '../types'

export function PostCard({ post, wide }: { post: Post; wide?: boolean }) {
  const copy = useCopy()

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* The featured (wide) card is text-only; grid cards keep their photo */}
        {!wide && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={post.image || '/placeholder.svg'}
              alt={copy(post.title)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        )}
        <div className="mt-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-primary">{copy(post.category)}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            {copy(post.date)}
            <span className="h-3 w-px bg-border" aria-hidden />
            {copy(post.readTime)}
          </p>
          <h3
            className={`mt-3 text-balance font-serif leading-[1.15] text-foreground transition-colors duration-300 group-hover:text-primary ${
              wide ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {copy(post.title)}
          </h3>
          <p
            className={`mt-3 text-pretty leading-relaxed text-muted-foreground ${
              wide ? 'max-w-[64ch] sm:text-lg' : 'max-w-[52ch] text-sm'
            }`}
          >
            {copy(post.excerpt)}
          </p>
          {wide && (
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors group-hover:text-accent sm:text-xs">
              {copy('Read the article')}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
