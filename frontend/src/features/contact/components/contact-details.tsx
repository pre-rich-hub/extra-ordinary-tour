import { useCopy } from '@/i18n/copy'
import { Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { contact } from '@/config/site'

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  const copy = useCopy()

  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {copy(label)}
        </dt>
        <dd className="mt-1.5 text-pretty leading-relaxed text-foreground">
          {copy(children)}
        </dd>
      </div>
    </div>
  )
}

export function ContactDetails() {
  const copy = useCopy()

  return (
    <Reveal>
      <p className="eyebrow mb-5 text-accent">{copy('Get In Touch')}</p>
      <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
        {copy('Tell us about the journey in your head')}
      </h2>
      <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        {copy(
          'However rough the idea, it is enough. We will come back with questions, a route worth considering and a clear answer on cost.',
        )}
      </p>

      <dl className="mt-12 space-y-7">
        <Detail icon={Phone} label={copy('Telephone')}>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
            className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {copy(contact.phone)}
          </a>
          <br />
          <a
            href={`tel:${contact.ukPhone.replace(/[^\d+]/g, '')}`}
            className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {copy(contact.ukPhone)}
          </a>
        </Detail>
        <Detail icon={MessageCircle} label={copy('WhatsApp')}>
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {copy(contact.whatsapp)}
          </a>
        </Detail>
        <Detail icon={Mail} label={copy('Email')}>
          <a
            href={`mailto:${contact.email}`}
            className="break-all border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {copy(contact.email)}
          </a>
        </Detail>
        <Detail icon={MapPin} label={copy('Office')}>
          {copy(contact.address)}
        </Detail>
        <Detail icon={Clock} label={copy('Hours')}>
          {copy(contact.hours)}
        </Detail>
      </dl>
    </Reveal>
  )
}
