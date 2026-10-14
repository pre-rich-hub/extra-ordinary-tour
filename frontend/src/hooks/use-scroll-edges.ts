'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type ScrollEdges = { start: boolean; end: boolean }

/**
 * Tracks whether a horizontally scrolling container is at its start or end,
 * so carousel arrows can hide or disable themselves.
 *
 * @param initial   edges assumed before the first measurement (server render)
 * @param tolerance px from either edge that still counts as "at the edge"
 */
export function useScrollEdges<T extends HTMLElement = HTMLDivElement>(
  initial: ScrollEdges,
  tolerance = 8,
) {
  const ref = useRef<T>(null)
  const [edges, setEdges] = useState<ScrollEdges>(initial)

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdges({
      start: el.scrollLeft < tolerance,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - tolerance,
    })
  }, [tolerance])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return { ref, edges }
}
