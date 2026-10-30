// Third-party brand marks (social networks, review platforms, payment
// providers), drawn inline in each brand's own colours.
import { Landmark } from 'lucide-react'
import { useCopy } from '@/i18n/copy'

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6">
      <defs>
        <radialGradient id="ig-grad" cx="0.3" cy="1.05" r="1.2">
          <stop offset="0" stopColor="#FFD776" />
          <stop offset="0.25" stopColor="#F3A554" />
          <stop offset="0.5" stopColor="#E1306C" />
          <stop offset="0.8" stopColor="#B32D9A" />
          <stop offset="1" stopColor="#5B4FE9" />
        </radialGradient>
      </defs>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        fill="none"
        stroke="url(#ig-grad)"
        strokeWidth="2.2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.3"
        fill="none"
        stroke="url(#ig-grad)"
        strokeWidth="2.2"
      />
      <circle cx="17.4" cy="6.6" r="1.3" fill="url(#ig-grad)" />
    </svg>
  )
}

export function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6">
      <rect x="1.5" y="5" width="21" height="14.5" rx="4" fill="#FF0000" />
      <path d="M10 9.1v6.3l5.4-3.15L10 9.1Z" fill="#fff" />
    </svg>
  )
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[26px] w-[26px]">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        d="M13.3 23v-7.9h2.6l.4-3.1h-3v-2c0-.9.3-1.5 1.5-1.5h1.6V5.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.6v3.1h2.6V23h3.1Z"
        fill="#fff"
      />
    </svg>
  )
}

export function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6">
      <path
        d="M15.6 2.5h-3v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.4a5.8 5.8 0 1 0 4.9 5.7V8.7a7.3 7.3 0 0 0 4.2 1.3V7a4.3 4.3 0 0 1-4.2-4.5Z"
        fill="#25F4EE"
        transform="translate(-0.9 -0.7)"
      />
      <path
        d="M15.6 2.5h-3v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.4a5.8 5.8 0 1 0 4.9 5.7V8.7a7.3 7.3 0 0 0 4.2 1.3V7a4.3 4.3 0 0 1-4.2-4.5Z"
        fill="#FE2C55"
        transform="translate(0.9 0.7)"
      />
      <path
        d="M15.6 2.5h-3v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.4a5.8 5.8 0 1 0 4.9 5.7V8.7a7.3 7.3 0 0 0 4.2 1.3V7a4.3 4.3 0 0 1-4.2-4.5Z"
        fill="#000"
      />
    </svg>
  )
}

export function TripadvisorMark() {
  return (
    <span className="flex items-center gap-1.5">
      <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7 shrink-0">
        <circle cx="16" cy="16" r="16" fill="#34E0A1" />
        <circle
          cx="10.5"
          cy="17"
          r="4.6"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.6"
        />
        <circle
          cx="21.5"
          cy="17"
          r="4.6"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.6"
        />
        <circle cx="10.5" cy="17" r="1.9" fill="#000" />
        <circle cx="21.5" cy="17" r="1.9" fill="#000" />
        <path
          d="M6 11.6c5.8-3.4 14.2-3.4 20 0"
          fill="none"
          stroke="#000"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-sans text-[15px] font-bold tracking-[-0.01em] text-black sm:text-base">
        Tripadvisor
      </span>
    </span>
  )
}

export function SafariBookingsMark() {
  return (
    <span className="font-serif text-[13px] font-medium uppercase tracking-[0.12em] text-[#5a4632] sm:text-[14px]">
      SafariBookings
    </span>
  )
}

export function GetYourGuideMark() {
  return (
    <span className="flex flex-col font-sans text-[13px] font-black uppercase leading-[0.95] text-[#ff5533]">
      <span>Get</span>
      <span>Your</span>
      <span>Guide</span>
    </span>
  )
}

export function BankDepositMark() {
  const copy = useCopy()
  return (
    <span className="flex items-center gap-2 font-sans text-[1.05rem] font-bold tracking-[-0.01em] text-charcoal">
      <Landmark aria-hidden className="h-6 w-6 shrink-0" strokeWidth={1.8} />
      {copy('Bank Deposit')}
    </span>
  )
}

export function PayPalMark() {
  return (
    <span className="flex items-center gap-1 font-sans text-[1.35rem] font-extrabold italic tracking-[-0.02em]">
      <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6">
        <path
          d="M7.5 21H4.2L6.9 3h7c3.6 0 5.4 1.9 4.9 4.9-.6 3.7-3.2 5.3-6.6 5.3H9.6L8.5 21Z"
          fill="#003087"
        />
        <path
          d="M9.8 22.5H7.1l.4-2.6.9-5.9h2.4c3.3 0 5.6-1.5 6.2-4.9.1-.4.1-.8.1-1.2 1.4.9 2 2.4 1.6 4.4-.6 3.5-3 5-6.2 5h-1.7l-.8 5.2Z"
          fill="#009CDE"
        />
      </svg>
      <span className="text-[#003087]">Pay</span>
      <span className="-ml-1 text-[#009CDE]">Pal</span>
    </span>
  )
}

/** Tripadvisor owl eyes, used on the reviews strip. */
export function TripadvisorOwl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle
        cx="10.5"
        cy="17"
        r="5.4"
        fill="#fff"
        stroke="#000"
        strokeWidth="1.8"
      />
      <circle
        cx="21.5"
        cy="17"
        r="5.4"
        fill="#fff"
        stroke="#000"
        strokeWidth="1.8"
      />
      <circle cx="10.5" cy="17" r="2.2" fill="#000" />
      <circle cx="21.5" cy="17" r="2.2" fill="#000" />
      <path
        d="M4.5 11.2c6.4-3.8 16.6-3.8 23 0"
        fill="none"
        stroke="#000"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** SafariBookings emblem — sun over an acacia — for review badges. */
export function SafariBookingsEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle cx="20.5" cy="11" r="5" fill="#e48901" />
      <path
        d="M4 16.5c2.6-1.9 6.4-2.6 9.6-2.1 1.6-1.4 4.4-1.9 6.6-1.2 2.1-.6 5 .1 7.8 1.9-2.6.6-5 .6-7.2.2-1.6 1-3.5 1.2-5.3.8-3.6 1.2-7.6 1.3-11.5.4Z"
        fill="#fff"
      />
      <path d="M15.4 15.6h1.6l.6 10.9h-2.8Z" fill="#fff" />
      <path
        d="M3 26.5h26"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Google "G", for review badges. */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}
