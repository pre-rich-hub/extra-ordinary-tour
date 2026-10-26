import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

const values = [
  {
    title: 'Journeys shaped around you',
    text: 'From our base in Lalibela, we plan each journey around your interests, dates and budget, whether you travel privately, in a small group, as a family or on your own.',
  },
  {
    title: 'Guides who know their country',
    text: 'Licensed local guides and experienced drivers who share Ethiopia’s history, cultures and hidden places with knowledge, care and genuine warmth.',
  },
  {
    title: 'Travel that gives back',
    text: 'We work with local guides, families and communities, travel respectfully and help protect the natural and cultural heritage we are proud to share.',
  },
  {
    title: 'Experiences beyond sightseeing',
    text: 'A coffee ceremony in a family home, a market day in the south, a feast day among the pilgrims of Lalibela: moments that connect you with everyday Ethiopian life.',
  },
  {
    title: 'Trust earned by our guests',
    text: 'Our guests’ reviews on Tripadvisor, SafariBookings and Google speak of flexibility, reliability and personal service, and we work to earn that trust on every trip.',
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
            {copy('What we ')}
            <em className="italic text-primary">
              {copy('never compromise on')}
            </em>
          </h2>
          <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {copy(
              'Five principles guide every itinerary we create, every guide we work with and every experience we share with you in Ethiopia.',
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
