'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Sticky in-page navigation that highlights the section currently in view.
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-b border-border bg-background/92 backdrop-blur-xl sm:top-[68px]"
    >
      <ul className="shell flex gap-7 overflow-x-auto [scrollbar-width:none] sm:gap-10 [&::-webkit-scrollbar]:hidden">
        {items.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={cn(
                'relative block py-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
                active === id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-500',
                  active === id ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
