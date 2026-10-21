'use client'

import type { ImageLoaderProps } from 'next/image'

const uploadRoot = 'https://res.cloudinary.com/oyw9kdvp/image/upload/'

/** Resize this client's Cloudinary images to the browser's requested width. */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  // Local placeholders and images from other providers retain their own URLs.
  if (!src.startsWith(uploadRoot)) return src

  // Replace our default delivery transformation rather than stacking resizes.
  // Preserve a version segment, if supplied, and the original public ID.
  const asset = src
    .slice(uploadRoot.length)
    .replace(/^f_auto,q_auto,c_limit,w_\d+\//, '')
  const transformation = `f_auto,q_${quality ?? 'auto'},c_limit,w_${width}`
  return `${uploadRoot}${transformation}/${asset}`
}
