import { createElement, type ComponentProps } from 'react'
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

const navigation = createNavigation(routing)

export const { redirect, usePathname, useRouter, getPathname } = navigation

/**
 * Locale-aware Link with viewport prefetching off by default. On Vercel each
 * prefetched link is ISR usage, and a page can show dozens of links. Pass
 * `prefetch` to opt back in.
 */
export function Link({
  prefetch = false,
  ...props
}: ComponentProps<typeof navigation.Link>) {
  return createElement(navigation.Link, { prefetch, ...props })
}
