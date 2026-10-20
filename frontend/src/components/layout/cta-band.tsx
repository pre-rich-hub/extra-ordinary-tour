import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { LinkButton } from '@/components/ui/link-button'
import { contact, slogan } from '@/config/site'

interface CtaBandProps {
  eyebrow?: string
  title: string
  text: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  image?: string
}

export function CtaBand({
  eyebrow = slogan,
  title,
  text,
  primary = { label: 'Plan Your Journey', href: '/contact' },
  secondary,
  image = '/images/lalibela-landscape.jpg',
}: CtaBandProps) {
  const copy = useCopy()

  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 -z-10 opacity-25">
        <Image
          src={image || '/placeholder.svg'}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/70" />
      </div>

      <div className="shell py-20 sm:py-24 lg:py-32">
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 text-accent">{copy(eyebrow)}</p>
            <h2 className="text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
              {copy(title)}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-primary-foreground/80 sm:text-lg">
              {copy(text)}
            </p>
            <p className="mt-6 text-sm text-primary-foreground/70">
              {copy('Or call us directly on')}{' '}
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="border-b border-accent/50 pb-0.5 text-background transition-colors hover:border-accent hover:text-accent"
              >
                {copy(contact.phone)}
              </a>
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:shrink-0">
            <LinkButton href={primary.href} variant="gold">
              {copy(primary.label)}
            </LinkButton>
            {secondary && (
              <LinkButton
                href={secondary.href}
                variant="outlineLight"
                withArrow={false}
              >
                {copy(secondary.label)}
              </LinkButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
