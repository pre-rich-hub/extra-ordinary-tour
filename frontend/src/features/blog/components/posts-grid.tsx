'use client'

import { useCopy } from '@/i18n/copy'

import { useMemo, useState } from 'react'
import { Reveal } from '@/components/ui/reveal'
import { PostCard } from './post-card'
import type { Post } from '../types'

export function PostsGrid({ posts }: { posts: Post[] }) {
  const copy = useCopy()

  const categories = useMemo(
    () => [
      '__all__',
      ...Array.from(new Set(posts.map((p) => p.categoryKey ?? p.category))),
    ],
    [posts],
  )
  const [active, setActive] = useState('__all__')

  const visible =
    active === '__all__'
      ? posts
      : posts.filter((p) => (p.categoryKey ?? p.category) === active)

  return (
    <div>
      <div
        role="group"
        aria-label={copy('Filter articles by category')}
        className="mb-12 flex flex-wrap gap-2 sm:mb-16"
      >
        {categories.map((c) => {
          const on = c === active
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 sm:text-[11px] ${
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {c === '__all__'
                ? copy('All Writing')
                : (posts.find((p) => (p.categoryKey ?? p.category) === c)
                    ?.category ?? c)}
            </button>
          )
        })}
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 90}>
            <PostCard post={p} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          {copy('Nothing filed under this yet.')}
        </p>
      )}
    </div>
  )
}
