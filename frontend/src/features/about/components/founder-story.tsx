import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const credentials = [
  'Born in Lalibela',
  'Licensed tour guide',
  'Professional tourism qualification',
  'Personally leads many groups',
]

export function FounderStory() {
  const copy = useCopy()

  return (
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
              src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/founder-maereg-tefere.jpg"
              alt={copy(
                'Maereg Tefere, founder of Extraordinary Ethiopia Tours',
              )}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                {copy('Where it began')}
              </p>
              <p className="mt-1.5 font-serif text-2xl text-background">
                {copy('Born and raised in Lalibela')}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="eyebrow mb-6 text-accent">{copy('Meet our founder')}</p>
          <Quote className="h-10 w-10 text-accent/70" strokeWidth={1.2} />
          <blockquote className="mt-4 text-balance font-serif text-3xl italic leading-[1.15] text-background sm:text-4xl lg:text-[2.9rem]">
            {copy(
              'Every journey is created with passion, knowledge and a deep connection to Ethiopia.',
            )}
          </blockquote>

          <div className="mt-10 space-y-5 text-pretty leading-relaxed text-background/70 sm:text-lg">
            <p>
              {copy(
                'Maereg Tefere was born in the historic town of Lalibela and began his career as a local guide at its world-famous rock-hewn churches. With a professional tourism qualification, an official guiding licence and more than ten years in Ethiopian tourism, he has since led cultural tours, trekking adventures and community-based journeys across the country.',
              )}
            </p>
            <p>
              {copy(
                'He still accompanies many groups personally, making sure every guest is comfortable, safe and well looked after, an attention to detail that has earned excellent feedback from travellers around the world.',
              )}
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {credentials.map((c) => (
              <li
                key={c}
                className="rounded-full border border-background/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/80 sm:text-[11px]"
              >
                {copy(c)}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex items-center gap-5 border-t border-background/15 pt-8">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-accent/40 bg-background">
              <Image
                src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/founder-maereg-tefere.jpg"
                alt=""
                aria-hidden
                fill
                sizes="56px"
                className="origin-[50%_10%] scale-[2.6] object-cover object-top"
              />
            </span>
            <span>
              <span className="block font-serif text-2xl text-background">
                {copy('Maereg Tefere')}
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                {copy('Founder & Tour Specialist')}
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
