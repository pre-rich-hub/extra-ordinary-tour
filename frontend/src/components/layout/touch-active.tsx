'use client'

import { useEffect } from 'react'

// iOS Safari only applies :active styles while a touch listener is attached,
// so this empty one is what makes tap feedback show on iPhones.
export function TouchActive() {
  useEffect(() => {
    const noop = () => {}
    document.addEventListener('touchstart', noop, { passive: true })
    return () => document.removeEventListener('touchstart', noop)
  }, [])
  return null
}
