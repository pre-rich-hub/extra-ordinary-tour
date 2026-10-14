'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useMemo, useRef, useState } from 'react'
import { ArrowRight, MapPin, Route, Search } from 'lucide-react'
import { destinations, tours } from '@/content'
import { cn } from '@/lib/utils'

type Result = {
  kind: 'Destination' | 'Journey'
  href: string
  title: string
  meta: string
  image: string
  haystack: string
}

const index: Result[] = [
  ...destinations.map((d) => ({
    kind: 'Destination' as const,
    href: `/destinations/${d.slug}`,
    title: d.name,
    meta: d.region,
    image: d.image,
    haystack: [d.name, d.region, d.tag].join(' ').toLowerCase(),
  })),
  ...tours.map((t) => ({
    kind: 'Journey' as const,
    href: `/tours/${t.slug}`,
    title: t.title,
    meta: `${t.days} · ${t.style}`,
    image: t.image,
    haystack: [t.title, t.style, ...t.places].join(' ').toLowerCase(),
  })),
]

const popular = index.filter((r) => r.kind === 'Destination').slice(0, 4)

export function HeroActions() {
  return (
    <div className="relative mx-auto grid w-full max-w-[1080px] gap-10 [animation:fade-up_1s_ease_0.4s_both] md:grid-cols-2 md:gap-0">
      {/* Gold hairline running from the CTAs down to the bottom of the hero */}
      <span
        aria-hidden
        className="absolute left-1/2 top-2 -bottom-24 hidden w-px bg-gradient-to-b from-accent/90 via-accent/70 to-accent/0 md:block"
      />

      <div className="flex flex-col items-center md:px-10 lg:px-16">
        <p className="mb-5 font-serif text-[1.7rem] leading-none text-background sm:text-[2rem]">
          Take me to
        </p>
        <HeroSearch />
      </div>

      <span aria-hidden className="mx-auto h-px w-16 bg-accent/80 md:hidden" />

      <div className="flex flex-col items-center md:px-10 lg:px-16">
        <p className="mb-5 font-serif text-[1.7rem] leading-none text-background sm:text-[2rem]">
          Not sure where?
        </p>
        <Link
          href="#plan"
          className="group inline-flex h-[60px] w-full max-w-[440px] items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-12px_oklch(0.705_0.098_76/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand"
        >
          Plan My Journey
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function HeroSearch() {
  const router = useRouter()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)

  const q = query.trim().toLowerCase()
  const results = useMemo(
    () => (q ? index.filter((r) => r.haystack.includes(q)).slice(0, 6) : popular),
    [q],
  )

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const submit = () => {
    const pick = results[highlight] ?? results[0]
    if (q && pick) go(pick.href)
    else go('/tours')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const showPanel = open && (results.length > 0 || q.length > 0)

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className="relative w-full max-w-[440px]"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <div
        className={cn(
          'flex h-[60px] items-center rounded-full border border-background/85 bg-charcoal/25 pl-6 pr-2 backdrop-blur-md transition-all duration-300 focus-within:border-accent focus-within:bg-charcoal/45 hover:bg-charcoal/35',
          showPanel && 'border-accent',
        )}
      >
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search destinations and journeys
        </label>
        <input
          ref={inputRef}
          id={`${listId}-input`}
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel ? `${listId}-${highlight}` : undefined}
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setHighlight(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search destinations and journeys"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-background placeholder:text-background/75 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-sand"
        >
          <Search className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      </div>

      {showPanel && (
        <div className="absolute inset-x-0 bottom-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-border bg-background/97 text-left text-foreground shadow-[0_30px_60px_-20px_oklch(0.185_0.012_58/0.55)] backdrop-blur-xl [animation:fade-up_0.35s_ease_both]">
          <p className="px-5 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {q ? (results.length ? 'Suggestions' : 'No matches') : 'Popular destinations'}
          </p>
          {results.length > 0 ? (
            <ul id={listId} role="listbox" className="max-h-[300px] overflow-y-auto pb-2">
              {results.map((r, i) => {
                const Icon = r.kind === 'Destination' ? MapPin : Route
                return (
                  <li
                    key={r.href}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === highlight}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => go(r.href)}
                    className={cn(
                      'mx-2 flex cursor-pointer items-center gap-4 rounded-xl px-3 py-2.5 transition-colors',
                      i === highlight && 'bg-muted',
                    )}
                  >
                    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-serif text-lg leading-tight">
                        {r.title}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon className="h-3 w-3 text-accent" />
                        {r.kind} · {r.meta}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        'h-4 w-4 shrink-0 text-accent transition-all duration-300',
                        i === highlight ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0',
                      )}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
              Nothing matches &ldquo;{query.trim()}&rdquo; yet. Press enter to
              browse every journey, or let us plan one around it.
            </p>
          )}
        </div>
      )}
    </form>
  )
}
