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
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-1.5 text-pretty leading-relaxed text-foreground">
          {children}
        </dd>
      </div>
    </div>
  )
}

export function ContactDetails() {
  return (
    <Reveal>
      <p className="eyebrow mb-5 text-accent">
        Get In Touch
      </p>
      <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
        Tell us about the journey in your head
      </h2>
      <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        However rough the idea, it is enough. We will come back with
        questions, a route worth considering and a clear answer on cost.
      </p>

      <dl className="mt-12 space-y-7">
        <Detail icon={Phone} label="Telephone">
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
            className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {contact.phone}
          </a>
        </Detail>
        <Detail icon={MessageCircle} label="WhatsApp">
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {contact.whatsapp}
          </a>
        </Detail>
        <Detail icon={Mail} label="Email">
          <a
            href={`mailto:${contact.email}`}
            className="break-all border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
          >
            {contact.email}
          </a>
        </Detail>
        <Detail icon={MapPin} label="Office">
          {contact.address}
        </Detail>
        <Detail icon={Clock} label="Hours">
          {contact.hours}
        </Detail>
      </dl>
    </Reveal>
  )
}
