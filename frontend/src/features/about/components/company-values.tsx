import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

const values = [
  {
    title: 'Personalised tours',
    text: 'Based in Lalibela, we design every journey around your interests, schedule and budget: private tours, small groups, families and solo travellers alike.',
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
    text: 'Five-star reviews on SafariBookings and warm feedback on Tripadvisor. Travellers know us for flexibility, reliability and personal service.',
  },
]

export function CompanyValues() {
  const copy = useCopy()

  return (
    <section className="border-y border-border bg-parchment">
      <div className="shell grid gap-14 py-24 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-36">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-6 text-accent">
            {copy('Why travel with us')}
          </p>
          <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl">
            {copy('The things we will ')}
            <em className="italic text-primary">{copy('never compromise')}</em>
          </h2>
          <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {copy(
              'Five principles that shape every itinerary, every guide and every day you spend with us in Ethiopia.',
            )}
          </p>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm lg:block">
            <Image
              src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/dorze.jpg"
              alt={copy(
                'Traditional beehive-shaped Dorze houses in the Guge highlands',
              )}
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
                <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                  {copy(v.title)}
                </h3>
                <p className="mt-3 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                  {copy(v.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
