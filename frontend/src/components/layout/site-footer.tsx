import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { contact, slogan } from '@/config/site'
import { destinations } from '@/features/destinations/data/destinations'
import { tours } from '@/features/tours/data/tours'
import {
  InstagramIcon,
  YouTubeIcon,
  FacebookIcon,
  TikTokIcon,
  XIcon,
  TripadvisorMark,
  SafariBookingsMark,
  SafariGoMark,
  VisaMark,
  MastercardMark,
  PayPalMark,
} from '@/components/icons/brand-marks'
import { NewsletterForm } from '@/features/newsletter/components/newsletter-form'

// Social links, shown as brand marks on white discs.
const socials: { name: string; href: string; icon: React.ReactNode }[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/extraordinaryethiopiatours',
    icon: <InstagramIcon />,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@extraordinaryethiopiatours',
    icon: <YouTubeIcon />,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/extraordinaryethiopiatours',
    icon: <FacebookIcon />,
  },
  {
    name: 'TikTok',
    href: '#',
    icon: <TikTokIcon />,
  },
  {
    name: 'X',
    href: '#',
    icon: <XIcon />,
  },
]

const columns = [
  {
    title: 'Destinations',
    links: destinations
      .slice(0, 5)
      .map((d) => ({ label: d.name, href: `/destinations/${d.slug}` })),
    more: { label: 'All destinations', href: '/destinations' },
  },
  {
    title: 'Tours',
    links: [
      ...tours
        .slice(0, 4)
        .map((t) => ({ label: t.title, href: `/tours/${t.slug}` })),
      { label: 'Custom Itineraries', href: '/contact' },
    ],
    more: { label: 'All tours', href: '/tours' },
  },
  {
    title: 'Explore',
    links: [
      { label: 'Addis Layover Tours', href: '/layover' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Travel Journal', href: '/blog' },
      { label: 'Essential Travel Information', href: '/blog/essential-travel-information' },
      { label: 'Best Time to Visit', href: '/blog/best-time-to-visit-ethiopia' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

// Logo tiles: brand marks are set in type and simple shapes on light cards.
const logoTile =
  'flex h-[72px] items-center justify-center rounded-md bg-ivory px-3 shadow-[0_10px_24px_-16px_black] transition-transform duration-300 hover:-translate-y-0.5'

const platforms: { name: string; href: string; mark: React.ReactNode }[] = [
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

const payments: { name: string; mark: React.ReactNode }[] = [
  {
    name: 'Visa',
    mark: <VisaMark />,
  },
  {
    name: 'Mastercard',
    mark: <MastercardMark />,
  },
  {
    name: 'PayPal',
    mark: <PayPalMark />,
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-background">
      <div className="shell pb-10 pt-16 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-x-12 lg:gap-y-14">
          {/* Brand, contact and socials */}
          <div className="lg:row-span-2">
            <Link href="/" className="inline-flex items-center gap-4">
              <img
                src="/images/logo.png"
                alt="Extraordinary Ethiopia Tours logo"
                className="h-20 w-20 rounded-full border border-accent/25 object-cover shadow-[0_10px_30px_-12px_black]"
              />
              <span className="flex flex-col">
                <span className="font-serif text-[2.1rem] leading-none">Extraordinary</span>
                <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
                  Ethiopia Tours
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-pretty text-[15px] leading-relaxed text-background/65">
              A locally based tour operator from Lalibela, guiding private and
              small-group journeys across Ethiopia.
            </p>
            <p className="mt-3 font-serif text-xl italic text-accent">{slogan}</p>

            <ul className="mt-8 space-y-4 text-[15px] text-background/80">
              <li className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.6} />
                <span className="max-w-[30ch]">{contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3.5 transition-colors hover:text-accent"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.6} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3.5 transition-colors hover:text-accent"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.6} />
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-[0_8px_20px_-10px_black] transition-transform duration-300 hover:-translate-y-1"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-6 font-sans text-[12px] font-semibold uppercase tracking-[0.26em] text-accent">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-background/80 transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.more && (
                <Link
                  href={col.more.href}
                  className="group mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-sand"
                >
                  {col.more.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </nav>
          ))}

          {/* Newsletter, spanning the link columns */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-2 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p className="font-serif text-[1.9rem] leading-tight text-background">
                Continue exploring Ethiopia
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-background/65">
                Travel stories, festival dates and seasonal inspiration from
                our team in Lalibela. Four letters a year, never more.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Review platforms + accepted payments */}
        <div className="mt-16 grid gap-12 border-t border-background/15 pt-14 lg:grid-cols-[4fr_3fr] lg:gap-14">
          <div>
            <p className="font-serif text-[1.9rem] leading-tight text-background">
              Trusted travel platforms
            </p>
            <p className="mt-2 text-[15px] text-background/60">
              Find and review us where seasoned travellers plan.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {platforms.map((p) => (
                <li key={p.name}>
                  <a href={p.href} aria-label={p.name} className={logoTile}>
                    {p.mark}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif text-[1.9rem] leading-tight text-background">
              We accept
            </p>
            <p className="mt-2 text-[15px] text-background/60">
              Secure payments by card or PayPal.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-3">
              {payments.map((p) => (
                <li key={p.name} aria-label={p.name} className={logoTile}>
                  {p.mark}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-background/15 pt-8 text-[13px] text-background/50 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <p>
            &copy; {new Date().getFullYear()} Extraordinary Ethiopia Tours. All rights
            reserved.
          </p>
          <p className="text-[15px] text-background/70 md:text-center">
            Built by{' '}
            <a
              href="https://melba.et"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-background transition-colors hover:text-accent"
            >
              Melba Technology
            </a>
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
            <Link href="/contact" className="transition-colors hover:text-background/85">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-background/85">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
