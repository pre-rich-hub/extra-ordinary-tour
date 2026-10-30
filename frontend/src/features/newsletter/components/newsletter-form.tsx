'use client'

import { useCopy } from '@/i18n/copy'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { subscribe } from '../api/client'

export function NewsletterForm() {
  const copy = useCopy()

  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (done) {
    return (
      <p
        role="status"
        className="flex w-full max-w-sm items-center gap-3 border border-accent/40 px-5 py-4 text-sm text-background/80"
      >
        <Check className="h-4 w-4 shrink-0 text-accent" />
        {copy('Thank you. You are now subscribed.')}
      </p>
    )
  }

  return (
    <form
      onInvalid={(e) => {
        const input = e.target as HTMLInputElement
        input.setCustomValidity(
          copy(
            input.validity.typeMismatch
              ? 'Please enter a valid email address.'
              : 'Please fill in this field.',
          ),
        )
      }}
      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
      onSubmit={async (e) => {
        e.preventDefault()
        if (sending) return
        setError(null)
        const email = String(
          new FormData(e.currentTarget).get('email') ?? '',
        ).trim()
        setSending(true)
        try {
          await subscribe(email)
          setDone(true)
        } catch {
          setError(copy('Something went wrong. Please try again.'))
        } finally {
          setSending(false)
        }
      }}
      className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {copy('Email address')}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder={copy('Your email')}
        className="w-full rounded-full border border-background/25 bg-transparent px-5 py-3.5 text-sm text-background placeholder:text-background/45 focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={sending}
        className="whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-foreground transition-colors duration-300 hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? copy('Sending…') : copy('Join')}
      </button>
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {copy(error)}
        </p>
      ) : null}
    </form>
  )
}
