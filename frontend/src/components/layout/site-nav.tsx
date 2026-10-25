'use client'

import Image from 'next/image'
import { useCopy } from '@/i18n/copy'

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import type { Destination } from '@/features/destinations/types'
import type { Tour } from '@/features/tours/types'
import {
  Menu,
  X,
  Globe,
  Check,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { hasPrice, priceShort } from '@/features/tours/lib/format'
import { tourCategories } from '@/features/tours/data/categories'
import { navLinks } from '@/config/navigation'
import { contact } from '@/config/site'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const

function Wordmark({
  tone,
  onClick,
}: {
  tone: 'light' | 'dark'
  onClick?: () => void
}) {
  const copy = useCopy()

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={copy('Extraordinary Ethiopia Tours, home')}
      className="flex shrink-0 items-center"
    >
      <img
        src="/images/logo-160.webp"
        width={160}
        height={160}
        decoding="async"
        alt={copy('Extraordinary Ethiopia Tours logo')}
        className="h-14 w-14 rounded-full object-cover border border-accent/25 shadow-md transition-transform duration-300 hover:scale-105"
      />
    </Link>
  )
}

export function SiteNav({
  destinations,
  tours,
}: {
  destinations: Pick<
    Destination,
    'slug' | 'name' | 'region' | 'tag' | 'image' | 'teaser'
  >[]
  tours: Pick<
    Tour,
    'slug' | 'title' | 'image' | 'style' | 'from' | 'days' | 'teaser'
  >[]
}) {
  const copy = useCopy()

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const lang = languages.find((language) => language.code === locale)!
  const setLang = (language: (typeof languages)[number]) => {
    router.replace(
      `${pathname}${window.location.search}${window.location.hash}`,
      { locale: language.code, scroll: false },
    )
    setOpen(false)
    setLangOpen(false)
  }
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const tone: 'light' | 'dark' = scrolled ? 'dark' : 'light'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-border bg-background/92 backdrop-blur-xl'
            : 'bg-gradient-to-b from-charcoal/55 to-transparent',
        )}
      >
        <nav
          className={cn(
            'shell flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-16 sm:h-[68px]' : 'h-[68px] sm:h-20',
          )}
        >
          <Wordmark tone={open ? 'dark' : tone} />

          <ul className="ml-auto mr-3 hidden items-center gap-5 lg:flex xl:mr-10 xl:gap-12">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const hasDropdown =
                link.label === 'Destinations' ||
                link.label === 'Tours' ||
                !!link.children
              return (
                <li
                  key={link.href}
                  className={cn('group py-5', link.children && 'relative')}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1 whitespace-nowrap py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 xl:tracking-[0.16em]',
                      tone === 'dark'
                        ? active
                          ? 'text-foreground'
                          : 'text-foreground/65 hover:text-foreground'
                        : active
                          ? 'text-background'
                          : 'text-background/75 hover:text-background',
                    )}
                  >
                    {copy(link.label)}
                    {hasDropdown && (
                      <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300',
                        active ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </Link>

                  {/* Dropdowns */}
                  {link.label === 'Destinations' && (
                    <div className="absolute left-0 top-full w-full bg-background/98 backdrop-blur-2xl border-t border-accent/25 border-b border-border/80 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-45 text-foreground">
                      <div className="shell grid grid-cols-[1fr_3.2fr] gap-12 py-10">
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2 block">
                              {copy('Ethiopia')}
                            </span>
                            <h3 className="font-serif text-2xl text-foreground mb-4">
                              {copy('Our Destinations')}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {copy(
                                'From churches carved from solid rock to volcanic landscapes below sea level. Explore Ethiopia, the Land of Origins.',
                              )}
                            </p>
                          </div>
                          <Link
                            href="/destinations"
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-accent/80 transition-colors mt-6"
                          >
                            {copy('View All Destinations ')}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                          {destinations.slice(0, 4).map((d) => (
                            <Link
                              key={d.slug}
                              href={`/destinations/${d.slug}`}
                              className="group/item flex flex-col gap-3.5 rounded-lg overflow-hidden p-2.5 transition-all duration-300 hover:bg-muted/50"
                            >
                              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[4px]">
                                <Image
                                  fill
                                  sizes="240px"
                                  src={d.image}
                                  alt={copy(d.name)}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                                />
                                <span className="absolute left-2.5 top-2.5 rounded-full bg-charcoal/80 backdrop-blur-md px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-background">
                                  {copy(d.tag)}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-serif text-[14px] text-foreground group-hover/item:text-accent transition-colors duration-300">
                                  {copy(d.name)}
                                </h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 block tracking-[0.06em] font-medium uppercase">
                                  {copy(d.region)}
                                </p>
                                <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                                  {copy(d.teaser)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {link.label === 'Tours' && (
                    <div className="absolute left-0 top-full w-full bg-background/98 backdrop-blur-2xl border-t border-accent/25 border-b border-border/80 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-45 text-foreground">
                      <div className="shell grid grid-cols-[1.5fr_2fr] gap-12 py-10">
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2 block">
                              {copy('Our Tours')}
                            </span>
                            <h3 className="font-serif text-2xl text-foreground mb-4">
                              {copy('Tour Categories')}
                            </h3>
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                              {tourCategories.map((c) => (
                                <li key={c.id}>
                                  <Link
                                    href={`/tours?category=${c.id}`}
                                    className="text-[13px] text-muted-foreground transition-colors hover:text-accent"
                                  >
                                    {copy(c.label)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/tours"
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-accent/80 transition-colors mt-6"
                          >
                            {copy('Explore All Tours ')}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          {tours.slice(0, 2).map((t) => (
                            <Link
                              key={t.slug}
                              href={`/tours/${t.slug}`}
                              className="group/item flex flex-col gap-3.5 rounded-lg overflow-hidden p-2.5 transition-all duration-300 hover:bg-muted/50"
                            >
                              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px]">
                                <Image
                                  fill
                                  sizes="240px"
                                  src={t.image}
                                  alt={copy(t.title)}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                                />
                                <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
                                  {copy(t.days)}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-serif text-[14px] text-foreground group-hover/item:text-accent transition-colors duration-300 line-clamp-1">
                                  {copy(t.title)}
                                </h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 block tracking-[0.06em] font-medium uppercase">
                                  {copy(t.style)}
                                </p>
                                <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                                  {copy(t.teaser)}
                                </p>
                                <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2">
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                    {hasPrice(t.from)
                                      ? copy('From')
                                      : copy('Price')}
                                  </span>
                                  <span className="text-xs font-bold text-accent">
                                    {hasPrice(t.from)
                                      ? priceShort(t.from)
                                      : copy('Tailor-Made Journey')}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {link.children && (
                    <ul className="invisible absolute left-1/2 top-full z-45 w-56 -translate-x-1/2 -translate-y-2 border-t border-accent/25 bg-background/98 py-2 text-foreground opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-300 pointer-events-none group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={
                              pathname === child.href ? 'page' : undefined
                            }
                            className={cn(
                              'block px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-muted/60 hover:text-accent',
                              pathname === child.href
                                ? 'text-accent'
                                : 'text-foreground/75',
                            )}
                          >
                            {copy(child.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={langRef} className="relative hidden sm:block">
              <button
                aria-label={copy('Change language')}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
                className={cn(
                  'flex h-10 items-center gap-1.5 rounded-full px-3 transition-colors duration-300',
                  tone === 'dark'
                    ? 'text-foreground/70 hover:bg-muted'
                    : 'text-background/80 hover:bg-background/10',
                )}
              >
                <Globe className="h-[17px] w-[17px]" />
                <span className="text-[11px] font-semibold tracking-[0.1em]">
                  {lang.code.toUpperCase()}
                </span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-300',
                    langOpen && 'rotate-180',
                  )}
                />
              </button>

              <ul
                role="listbox"
                aria-label={copy('Language')}
                className={cn(
                  'absolute right-0 top-12 w-44 overflow-hidden rounded-sm border border-border bg-popover shadow-xl transition-all duration-200',
                  langOpen
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-1 opacity-0',
                )}
              >
                {languages.map((l) => (
                  <li key={l.code.toUpperCase()}>
                    <button
                      role="option"
                      aria-selected={l.code === lang.code}
                      onClick={() => {
                        setLang(l)
                        setLangOpen(false)
                      }}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-popover-foreground/80 transition-colors duration-200 hover:bg-muted"
                    >
                      <span>{l.label}</span>
                      {l.code === lang.code && (
                        <Check className="h-4 w-4 text-accent" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="hidden items-center whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground shadow-[0_8px_22px_-12px_oklch(0.705_0.098_76/0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand lg:inline-flex"
            >
              {copy('Request Your Journey')}
            </Link>

            <button
              aria-label={open ? copy('Close menu') : copy('Open menu')}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                open
                  ? 'border-border text-foreground'
                  : tone === 'dark'
                    ? 'border-border text-foreground hover:bg-muted'
                    : 'border-background/30 text-background hover:bg-background/10',
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-24 sm:px-6">
          <ul className="border-t border-border">
            {navLinks.map((link, i) => {
              const active = isActive(link.href)
              return (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      transitionDelay: open ? `${120 + i * 55}ms` : '0ms',
                    }}
                    className={cn(
                      'flex items-center justify-between gap-4 py-5 transition-all duration-500',
                      open
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-3 opacity-0',
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'font-serif text-3xl sm:text-4xl',
                          active ? 'text-primary' : 'text-foreground',
                        )}
                      >
                        {copy(link.label)}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        'h-5 w-5 shrink-0',
                        active ? 'text-accent' : 'text-muted-foreground',
                      )}
                    />
                  </Link>
                  {link.children && (
                    <ul className="-mt-2 flex flex-wrap gap-x-6 gap-y-2 pb-5 pl-8">
                      {link.children
                        .filter((child) => child.href !== link.href)
                        .map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                'inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]',
                                pathname === child.href
                                  ? 'text-accent'
                                  : 'text-muted-foreground',
                              )}
                            >
                              {copy(child.label)}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-8">
            <span className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              {copy('Language')}
            </span>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <button
                  key={l.code.toUpperCase()}
                  onClick={() => setLang(l)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                    l.code === lang.code
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
              className="flex items-center gap-3"
            >
              <Phone className="h-4 w-4 text-accent" />
              {copy(contact.phone)}
            </a>
            <a
              href={`tel:${contact.ukPhone.replace(/[^\d+]/g, '')}`}
              className="flex items-center gap-3"
            >
              <Phone className="h-4 w-4 text-accent" />
              {copy(contact.ukPhone)}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3"
            >
              <Mail className="h-4 w-4 text-accent" />
              {copy(contact.email)}
            </a>
          </div>
        </div>

        <div className="border-t border-border bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-12px_oklch(0.705_0.098_76/0.7)] transition-all duration-300 hover:bg-sand"
          >
            {copy('Request Your Journey')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  )
}
