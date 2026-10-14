import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronRight, Quote } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { CtaBand } from '@/components/layout/cta-band'
import {
  SafariBookingsMark,
  SafariGoMark,
  TripadvisorMark,
} from '@/components/icons/brand-marks'
import { contact, destinations, slogan, testimonials, tours } from '@/content'

export const metadata: Metadata = {
  title: 'About Us',
  description: `${slogan} Extraordinary Ethiopia Tours is a locally based Ethiopia tour operator founded in Lalibela, offering private and group tours across the historic north, the Omo Valley, the Danakil, the Simien and Bale Mountains and beyond.`,
}

const stats = [
  { value: '10+', label: 'Years guiding in Ethiopia' },
  { value: String(tours.length), label: 'Tours & journeys' },
  { value: String(destinations.length), label: 'Places, peoples & festivals' },
  { value: '24/7', label: 'Support on every trip' },
]

const credentials = [
  'Born in Lalibela',
  'Licensed tour guide',
  'Professional tourism qualification',
  'Personally leads many groups',
]

const offerings = [
  {
    title: 'The Historic Route',
    text: 'Axum, Lalibela, Gondar, Lake Tana and the cliff churches of Tigray.',
    image: '/images/gondar-fasil.jpg',
    href: '/tours/10-day-historic-route',
    span: 'sm:col-span-2 sm:row-span-2 lg:col-span-7',
  },
  {
    title: 'Omo Valley Cultures',
    text: 'Markets, villages and ceremonies with the peoples of the south.',
    image: '/images/karo.jpg',
    href: '/tours/6-day-omo-valley-tribal-and-cultural',
    span: 'lg:col-span-5',
  },
  {
    title: 'Danakil Depression',
    text: 'Erta Ale’s lava lake, Dallol and the salt caravans.',
    image: '/images/danakil-dallol.jpg',
    href: '/tours/3-day-afar-danakil-from-addis',
    span: 'lg:col-span-5',
  },
  {
    title: 'Trekking & Wildlife',
    text: 'The Simien and Bale Mountains, gelada, walia ibex and the Ethiopian wolf.',
    image: '/images/simien-gelada.jpg',
    href: '/tours/5-day-simien-mountains-trek',
    span: 'lg:col-span-4',
  },
  {
    title: 'Festivals & Coffee',
    text: 'Timkat, Genna and Meskel, and the coffee lands of the south.',
    image: '/images/timkat.jpg',
    href: '/tours/8-day-north-with-timkat-festival',
    span: 'lg:col-span-4',
  },
  {
    title: 'Addis Ababa & Day Trips',
    text: 'City tours, layovers and excursions from the capital.',
    image: '/images/addis-trinity.jpg',
    href: '/tours/addis-ababa-full-day-city-tour',
    span: 'sm:col-span-2 lg:col-span-4',
  },
]

const values = [
  {
    title: 'Personalised tours',
    text: 'Based in Lalibela, we design every journey around your interests, schedule and budget — private tours, small groups, families and solo travellers alike.',
  },
  {
    title: 'Expert, friendly guides',
    text: 'Knowledgeable, licensed guides and professional drivers who share Ethiopia’s history, culture and hidden corners safely and with genuine warmth.',
  },
  {
    title: 'Responsible travel',
    text: 'Eco-conscious tourism that supports local communities and helps preserve Ethiopia’s natural and cultural heritage for the next generation.',
  },
  {
    title: 'Authentic experiences',
    text: 'We go beyond sightseeing: a coffee ceremony in a village home, a market day in the south, a feast day among the pilgrims of Lalibela.',
  },
  {
    title: 'Trusted worldwide',
    text: 'Five-star reviews on SafariBookings and warm feedback on Tripadvisor — travellers know us for flexibility, reliability and personal service.',
  },
]

const places = [
  'Lalibela',
  'Gondar',
  'Axum',
  'Simien Mountains',
  'Lake Tana',
  'Harar',
  'Danakil Depression',
  'Omo Valley',
  'Bale Mountains',
  'Gheralta',
  'Addis Ababa',
  'Konso',
]

const platforms = [
  {
    name: 'Tripadvisor',
    href: 'https://www.tripadvisor.com/Attraction_Review-g480193-d19444662-Reviews-Extraordinary_Ethiopia_Tours-Lalibela_Amhara_Region.html',
    mark: <TripadvisorMark />,
  },
  {
    name: 'SafariBookings',
    href: 'https://www.safaribookings.com/p6779',
    mark: <SafariBookingsMark />,
  },
  {
    name: 'SafariGo',
    href: 'https://www.safarigo.com/operator/extraordinary-ethiopia-tours-3022',
    mark: <SafariGoMark />,
  },
]

export default function AboutPage() {
  const featured = testimonials.find((t) => t.name === 'Tamryn') ?? testimonials[0]

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
        <Image
          src="/images/lalibela-giyorgis.jpg"
          alt="The cross-shaped Church of St George carved into the rock at Lalibela"
          fill
          priority
          sizes="100vw"
          className="-z-10 animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/70 via-charcoal/25 to-charcoal" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

        <div className="shell pt-36">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-background/60"
          >
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-background/90">About Us</span>
          </nav>

          <p className="eyebrow mb-6 text-accent [animation:fade-up_1s_ease_0.1s_both]">
            <span className="h-px w-10 bg-accent" />
            About Extraordinary Ethiopia Tours
          </p>
          <h1 className="max-w-[15ch] text-balance font-serif text-[2.9rem] font-medium leading-[0.98] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:text-7xl lg:text-[6.25rem]">
            Discover Ethiopia.{' '}
            <em className="italic text-accent">Experience the Extraordinary!</em>
          </h1>
          <p className="mt-8 max-w-[50ch] text-pretty leading-relaxed text-background/80 [animation:fade-up_1s_ease_0.35s_both] sm:text-lg">
            A locally based tour operator from Lalibela, creating private and
            group journeys through the history, cultures and landscapes of the
            Land of Origins — for the real Ethiopian experience.
          </p>
        </div>

        {/* Stats band */}
        <div className="shell mt-16 pb-10 sm:mt-20 sm:pb-14">
          <dl className="grid grid-cols-2 border-t border-background/20 [animation:fade-up_1s_ease_0.5s_both] lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`pt-6 sm:pt-8 ${i % 2 === 1 ? 'pl-6 sm:pl-10' : ''} ${i > 0 ? 'lg:border-l lg:border-background/20 lg:pl-10' : ''} ${i > 1 ? 'mt-6 lg:mt-0' : ''}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-4xl leading-none text-background sm:text-5xl lg:text-6xl">
                  {s.value}
                </dd>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-background/60 sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── Introduction ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,black_5%,transparent_65%)]"
        />
        <div className="shell relative grid gap-16 py-24 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-36">
          <Reveal>
            <p className="eyebrow mb-6 text-accent">
              <span className="h-px w-10 bg-accent" />
              Who we are
            </p>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.6rem]">
              Travel is more than sightseeing —{' '}
              <em className="italic text-primary">
                it is a connection to a place and its people.
              </em>
            </h2>
            <div className="mt-10 space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Extraordinary Ethiopia Tours is a trusted Ethiopia travel
                specialist and locally based tour operator. We create journeys
                that showcase the country&apos;s ancient history, diverse cultures
                and spectacular landscapes — with the professional, personal and
                flexible service that only a local team can give.
              </p>
              <p>
                We specialise in custom-designed private tours and carefully
                organised group tours for solo travellers, couples, families and
                friends. Whether it is your first visit or your fifth, every
                itinerary is shaped around your interests, travel style and
                budget — and our tours can be combined into one complete journey.
              </p>
            </div>
            <p className="mt-10 border-l-2 border-accent pl-5 font-serif text-2xl italic text-foreground sm:text-[1.7rem]">
              {slogan}
            </p>
          </Reveal>

          {/* Staggered collage */}
          <Reveal delay={150} className="relative">
            <div className="grid aspect-[5/6] grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] gap-4 sm:gap-5 lg:aspect-auto lg:h-full lg:min-h-[620px]">
              <div className="relative col-span-4 row-span-5 overflow-hidden rounded-sm shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
                <Image
                  src="/images/lalibela-pilgrims.jpg"
                  alt="Priests holding processional crosses during a celebration in Lalibela"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 col-start-5 row-span-3 row-start-2 overflow-hidden rounded-sm">
                <Image
                  src="/images/coffee-ceremony.jpg"
                  alt="A jebena and cups prepared for an Ethiopian coffee ceremony"
                  fill
                  sizes="(max-width: 1024px) 30vw, 15vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-4 col-start-3 row-span-3 row-start-6 overflow-hidden rounded-sm shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
                <Image
                  src="/images/simien-landscape.jpg"
                  alt="Basalt pinnacles of the Simien Mountains rising above the clouds"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 col-start-1 row-span-3 row-start-6 flex flex-col justify-end border border-border bg-card p-4 sm:p-6">
                <span className="font-serif text-4xl leading-none text-accent sm:text-5xl">
                  80+
                </span>
                <span className="mt-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-muted-foreground">
                  Peoples &amp; languages to discover
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Founder ──────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-charcoal text-background">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,oklch(0.42_0.06_48/0.45),transparent_60%)]" />
        <div className="shell grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:py-36">
          <Reveal className="relative mx-auto w-full max-w-[520px] lg:mx-0">
            <div
              aria-hidden
              className="absolute -right-4 -top-4 bottom-8 left-8 border border-accent/50 sm:-right-6 sm:-top-6"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_50px_90px_-40px_black]">
              <Image
                src="/images/lalibela-medhane-alem.jpg"
                alt="Bete Medhane Alem, the largest of Lalibela’s rock-hewn churches"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Where it began
                </p>
                <p className="mt-1.5 font-serif text-2xl text-background">
                  The rock-hewn churches of Lalibela
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="eyebrow mb-6 text-accent">
              <span className="h-px w-10 bg-accent" />
              Meet our founder
            </p>
            <Quote className="h-10 w-10 text-accent/70" strokeWidth={1.2} />
            <blockquote className="mt-4 text-balance font-serif text-3xl italic leading-[1.15] text-background sm:text-4xl lg:text-[2.9rem]">
              Every journey is created with passion, knowledge and a deep
              connection to Ethiopia.
            </blockquote>

            <div className="mt-10 space-y-5 text-pretty leading-relaxed text-background/70 sm:text-lg">
              <p>
                Maereg Tefere was born in the historic town of Lalibela and began
                his career as a local guide at its world-famous rock-hewn
                churches. With a professional tourism qualification, an official
                guiding licence and more than ten years in Ethiopian tourism, he
                has since led cultural tours, trekking adventures and
                community-based journeys across the country.
              </p>
              <p>
                He still accompanies many groups personally, making sure every
                guest is comfortable, safe and well looked after — an attention
                to detail that has earned excellent feedback from travellers
                around the world.
              </p>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2.5">
              {credentials.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-background/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/80 sm:text-[11px]"
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex items-center gap-5 border-t border-background/15 pt-8">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-accent/40 bg-background">
                <Image src="/images/logo.png" alt="" aria-hidden fill sizes="56px" className="object-cover" />
              </span>
              <span>
                <span className="block font-serif text-2xl text-background">Maereg Tefere</span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Founder &amp; Tour Specialist
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Places marquee ───────────────────────────────────────────── */}
      <section aria-label="Places we travel" className="overflow-hidden border-b border-border bg-linen py-8 sm:py-10">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
              {places.map((p) => (
                <li key={p} className="flex items-center">
                  <span className="whitespace-nowrap px-8 font-serif text-3xl italic text-espresso/80 sm:px-12 sm:text-5xl">
                    {p}
                  </span>
                  <span aria-hidden className="h-2 w-2 rotate-45 bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ─── What we do ───────────────────────────────────────────────── */}
      <section className="shell py-24 sm:py-28 lg:py-36">
        <Reveal className="mb-14 grid gap-6 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6 text-accent">
              <span className="h-px w-10 bg-accent" />
              What we do
            </p>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              One country, <em className="italic text-primary">many journeys</em>
            </h2>
          </div>
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent sm:text-xs"
          >
            Explore all {tours.length} tours
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid auto-rows-[260px] gap-4 sm:auto-rows-[300px] sm:grid-cols-2 sm:gap-5 lg:auto-rows-[280px] lg:grid-cols-12">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 3) * 90} className={`h-full ${o.span}`}>
              <Link
                href={o.href}
                className="group relative block h-full overflow-hidden rounded-sm bg-charcoal"
              >
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  sizes={i === 0 ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-background/30 text-background backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className={`mt-2 font-serif leading-[1.05] text-background ${i === 0 ? 'text-4xl sm:text-5xl' : 'text-[1.7rem]'}`}>
                    {o.title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-pretty text-sm leading-relaxed text-background/75">
                    {o.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-parchment">
        <div className="shell grid gap-14 py-24 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-36">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-6 text-accent">
              <span className="h-px w-10 bg-accent" />
              Why travel with us
            </p>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl">
              The things we will <em className="italic text-primary">never compromise</em>
            </h2>
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              Five principles that shape every itinerary, every guide and every
              day you spend with us in Ethiopia.
            </p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm lg:block">
              <Image
                src="/images/dorze.jpg"
                alt="Traditional beehive-shaped Dorze houses in the Guge highlands"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ol>
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                as="li"
                delay={i * 70}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-9 last:border-b sm:gap-10 sm:py-11"
              >
                <span className="font-serif text-5xl leading-none text-accent/80 transition-colors duration-300 group-hover:text-accent sm:text-6xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-foreground sm:text-3xl">{v.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Trust ────────────────────────────────────────────────────── */}
      <section className="shell grid gap-14 py-24 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-6 text-accent">
            <span className="h-px w-10 bg-accent" />
            In our guests’ words
          </p>
          <blockquote className="text-balance font-serif text-3xl italic leading-[1.2] text-foreground sm:text-4xl">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {featured.name} <span className="text-accent">·</span> {featured.detail}
            {featured.platform && (
              <>
                {' '}
                <span className="text-accent">·</span> Review on {featured.platform}
              </>
            )}
          </p>
        </Reveal>

        <Reveal delay={150} className="border border-border bg-card p-8 sm:p-10">
          <p className="font-serif text-2xl text-foreground">Find us where travellers plan</p>
          <p className="mt-2 text-pretty text-muted-foreground">
            Read reviews from our guests, or reach us directly at{' '}
            <a
              href={`mailto:${contact.email}`}
              className="break-all text-primary underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
            >
              {contact.email}
            </a>
            .
          </p>
          <ul className="mt-8 grid gap-3">
            {platforms.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} reviews`}
                  className="group flex h-[72px] items-center justify-between rounded-md bg-ivory px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_oklch(0.185_0.012_58/0.6)]"
                >
                  {p.mark}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ─── Plan ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow={slogan}
        title="Start with a conversation"
        text="Tell us how much time you have and what draws you to Ethiopia. Our team in Lalibela will reply within a day with honest advice and a first outline of your journey."
        primary={{ label: 'Plan your journey', href: '/contact' }}
        secondary={{ label: 'Browse tours', href: '/tours' }}
        image="/images/lalibela-landscape.jpg"
      />
    </>
  )
}
