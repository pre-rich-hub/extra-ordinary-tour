import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** The opening sentence of admin text, for teasers and excerpts. */
export function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text
}
