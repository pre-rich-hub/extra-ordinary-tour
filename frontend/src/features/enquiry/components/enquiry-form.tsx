'use client'

import { useCopy } from '@/i18n/copy'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { Check, ArrowRight, ChevronDown } from 'lucide-react'
import { journeyStyles } from '@/features/tours/data/journey-styles'
import { dialCodes } from '../data/dial-codes'
import { submitContact } from '../api/client'

export function EnquiryForm({
  defaultStyles = [],
  subject,
  canonicalSubject,
  packages,
  selectedPackage = '',
  onPackageChange,
}: {
  defaultStyles?: string[]
  subject?: string
  canonicalSubject?: string
  // Optional package picker, controlled by the parent so a link elsewhere on
  // the page can preselect one.
  packages?: { value: string; label: string }[]
  selectedPackage?: string
  onPackageChange?: (value: string) => void
}) {
  const copy = useCopy()

  const [selected, setSelected] = useState<string[]>(defaultStyles)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const confirmation = useRef<HTMLDivElement>(null)

  // The form is much taller than the confirmation that replaces it, so bring
  // the confirmation into view and move focus for screen readers.
  useEffect(() => {
    if (!submitted) return
    confirmation.current?.focus({ preventScroll: true })
    confirmation.current?.scrollIntoView({ block: 'center' })
  }, [submitted])

  const toggle = (style: string) =>
    setSelected((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    )

  if (submitted) {
    return (
      <div
        ref={confirmation}
        tabIndex={-1}
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center border border-border bg-card px-6 py-16 text-center outline-none"
      >
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-serif text-3xl text-foreground">
          {copy('Your message has been sent')}
        </h3>
        <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          {copy(
            'Thank you for contacting us. Our team will reply to your email within 24 hours.',
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="border border-border bg-card p-6 shadow-[0_28px_70px_-40px_oklch(0.185_0.012_58/0.4)] sm:p-8 lg:p-10">
      <div className="mb-8">
        <h3 className="text-balance font-serif text-[1.75rem] leading-tight text-foreground sm:text-3xl">
          {copy('Let’s Plan Your Ethiopian Adventure')}
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {copy(
            'Tell us a little about your travel plans. We’ll help you create a journey that suits your interests.',
          )}
        </p>
      </div>

      <form
        onInvalid={(e) => {
          const input = e.target as HTMLInputElement | HTMLSelectElement
          input.setCustomValidity(
            copy(
              input.validity.typeMismatch
                ? 'Please enter a valid email address.'
                : input instanceof HTMLSelectElement
                  ? 'Please select an option.'
                  : 'Please fill in this field.',
            ),
          )
        }}
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        onSubmit={async (e) => {
          e.preventDefault()
          if (sending) return
          setError(null)
          const data = new FormData(e.currentTarget)
          const name = String(data.get('name') ?? '').trim()
          const email = String(data.get('email') ?? '').trim()
          const region = String(data.get('dialCode') ?? '')
          const phone = String(data.get('phone') ?? '').trim()
          const when = String(data.get('when') ?? '').trim()
          const travellers = String(data.get('travellers') ?? '').trim()
          const dream = String(data.get('dream') ?? '').trim()

          const lines: string[] = []
          if (subject) lines.push(`Journey: ${canonicalSubject ?? subject}`)
          const pkg = packages?.find((p) => p.value === selectedPackage)
          if (pkg) lines.push(`Package: ${pkg.label} [${pkg.value}]`)
          if (phone)
            lines.push(
              `Mobile / WhatsApp: ${dialCodes[region] ? `+${dialCodes[region]} ` : ''}${phone}`,
            )
          if (when) lines.push(`Preferred dates: ${when}`)
          if (travellers) lines.push(`Travellers: ${travellers}`)
          if (selected.length)
            lines.push(
              `Interests: ${selected
                .map((key) => styleLabels.get(key) ?? key)
                .join(', ')}`,
            )
          if (dream) lines.push('')
          lines.push(dream)

          setSending(true)
          try {
            await submitContact({ name, email, message: lines.join('\n') })
            setSubmitted(true)
          } catch {
            setError(copy('Something went wrong. Please try again.'))
          } finally {
            setSending(false)
          }
        }}
        className="space-y-6"
      >
        {subject ? (
          <p className="border-l-2 border-accent bg-muted/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {copy('Enquiry about')}{' '}
            <span className="font-medium text-foreground">{copy(subject)}</span>
          </p>
        ) : null}

        {packages && packages.length > 0 ? (
          <Field label={copy('Package')} id="package">
            <div className="relative">
              <select
                id="package"
                name="package"
                value={selectedPackage}
                onChange={(e) => onPackageChange?.(e.target.value)}
                className="input appearance-none pr-10"
              >
                <option value="">{copy('Not sure yet, help me choose')}</option>
                {packages.map((p) => (
                  <option key={p.value} value={p.value}>
                    {copy(p.label)}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </Field>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy('Full Name')} id="name" required>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="input"
              placeholder={copy('Your full name')}
            />
          </Field>
          <Field label={copy('Email Address')} id="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="input"
              placeholder={copy('Your email address')}
            />
          </Field>
        </div>

        <Field
          label={copy('Mobile / WhatsApp Number')}
          id="phone"
          hint={copy('Optional')}
        >
          <PhoneInput />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy('Preferred Travel Dates')} id="when">
            <input
              id="when"
              name="when"
              className="input"
              placeholder={copy('When would you like to travel?')}
            />
          </Field>
          <Field label={copy('Number of Travellers')} id="travellers" required>
            <div className="relative">
              <select
                id="travellers"
                name="travellers"
                required
                defaultValue=""
                className="input appearance-none pr-10 invalid:text-muted-foreground"
              >
                <option value="" disabled>
                  {copy('Select group size')}
                </option>
                {groupSizes.map((size) => (
                  <option key={size} value={size}>
                    {copy(size)}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </Field>
        </div>

        <div>
          <span className="block text-sm font-medium text-foreground">
            {copy('What kind of journey interests you?')}
          </span>
          <span className="mb-3 mt-1 block text-xs text-muted-foreground">
            {copy('Choose as many as you like.')}
          </span>
          <div className="flex flex-wrap gap-2">
            {journeyStyles.map(({ key, label }) => {
              const active = selected.includes(key)
              return (
                <button
                  type="button"
                  key={key}
                  aria-pressed={active}
                  onClick={() => toggle(key)}
                  className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {copy(label)}
                </button>
              )
            })}
          </div>
        </div>

        <Field label={copy('Tell Us About Your Travel Plans')} id="dream">
          <textarea
            id="dream"
            name="dream"
            rows={4}
            className="input resize-none"
            placeholder={copy(
              'Share your preferred destinations, activities, accommodation, budget, or any special requests.',
            )}
          />
        </Field>

        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {copy(error)}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="group inline-flex w-full items-center justify-center gap-2.5 bg-primary px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors duration-300 hover:bg-charcoal disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {sending ? copy('Sending…') : copy('Start Planning My Journey')}
          {sending ? null : (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {copy(
            'We respond personally within 24 hours. Your personal information will be kept confidential and used to respond to your enquiry.',
          )}
        </p>
      </form>
    </div>
  )
}

// Sent to the team in English whatever the page language.
const groupSizes = [
  '1 traveller',
  '2 travellers',
  '3–4 travellers',
  '5–8 travellers',
  '9 or more travellers',
]

const styleLabels = new Map(journeyStyles.map((s) => [s.key, s.label]))

const flag = (region: string) =>
  String.fromCodePoint(
    ...[...region].map((c) => 0x1f1a5 + c.charCodeAt(0)),
  )

// A native select (best on phones) laid invisibly over a compact
// "flag +code" label; the full country names show only in the open list.
function PhoneInput() {
  const copy = useCopy()
  const locale = useLocale()
  const [region, setRegion] = useState('')
  const [countries, setCountries] = useState<{ code: string; name: string }[]>(
    [],
  )

  // Built after mount: Node and the browser ship different ICU country
  // names, so rendering them on the server breaks hydration.
  useEffect(() => {
    const names = new Intl.DisplayNames([locale], { type: 'region' })
    setCountries(
      Object.keys(dialCodes)
        .map((code) => ({ code, name: names.of(code) ?? code }))
        .sort((a, b) => a.name.localeCompare(b.name, locale)),
    )
  }, [locale])

  // Guess the visitor's country from the browser language (en-GB → GB).
  useEffect(() => {
    const guess = navigator.languages
      .map((l) => new Intl.Locale(l).maximize().region)
      .find((r) => r && dialCodes[r])
    if (guess) setRegion(guess)
  }, [])

  return (
    <div className="flex gap-2">
      <div className="input relative flex w-[7.5rem] shrink-0 items-center gap-2 focus-within:border-primary focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_14%,transparent)]">
        <span aria-hidden className="truncate">
          {region ? `${flag(region)} +${dialCodes[region]}` : copy('Code')}
        </span>
        <ChevronDown
          aria-hidden
          className="ml-auto h-4 w-4 shrink-0 text-muted-foreground"
        />
        <select
          name="dialCode"
          aria-label={copy('Country code')}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          <option value="">{copy('Country code')}</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {`${c.name} (+${dialCodes[c.code]})`}
            </option>
          ))}
        </select>
      </div>
      <input
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className="input min-w-0 flex-1"
        placeholder={copy('Mobile number')}
      />
    </div>
  )
}

function Field({
  label,
  id,
  required,
  hint,
  children,
}: {
  label: string
  id: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  const copy = useCopy()

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        {copy(label)}
        {required && (
          <span aria-hidden className="text-accent">
            {' *'}
          </span>
        )}
        {hint && (
          <span className="ml-2 font-normal normal-case tracking-normal">
            ({hint})
          </span>
        )}
      </label>
      {children}
    </div>
  )
}
