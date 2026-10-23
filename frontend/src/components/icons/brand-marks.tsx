// Third-party brand marks (social networks, review platforms, payment
// providers), drawn inline in each brand's own colours.

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

export function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[22px] w-[22px]">
      <path
        d="M17.8 2.5h3.2l-7 8 8.2 11h-6.4l-5-6.6-5.8 6.6H1.8l7.5-8.6L1.4 2.5H8l4.6 6.1 5.2-6.1Zm-1.1 17.1h1.8L7.4 4.3H5.5l11.2 15.3Z"
        fill="#000"
      />
    </svg>
  )
}

export function ViatorMark() {
  return (
    <span className="font-sans text-[1.6rem] font-bold tracking-[-0.03em] text-[#186b6d]">
      {'viator'}
    </span>
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

export function SafariGoMark() {
  return (
    <span className="font-sans text-[1.35rem] font-extrabold tracking-[-0.02em] text-[#2e7d32]">
      Safari
      <span className="text-[#f39200]">Go</span>
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

export function VisaMark() {
  return (
    <span className="font-sans text-[1.9rem] font-black italic tracking-[-0.02em] text-[#1a1f71]">
      VISA
    </span>
  )
}

export function MastercardMark() {
  return (
    <svg viewBox="0 0 52 32" aria-hidden className="h-9 w-auto">
      <circle cx="18" cy="16" r="14" fill="#EB001B" />
      <circle cx="34" cy="16" r="14" fill="#F79E1B" />
      <path d="M26 4.5a14 14 0 0 1 0 23 14 14 0 0 1 0-23Z" fill="#FF5F00" />
    </svg>
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
