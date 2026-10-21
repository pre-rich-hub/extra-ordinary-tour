import { describe, expect, it } from 'vitest'
import cloudinaryLoader from '@/lib/media/cloudinary-loader'

const root = 'https://res.cloudinary.com/oyw9kdvp/image/upload/'

describe('Cloudinary image delivery', () => {
  it('replaces the default size for responsive images without stacking resizes', () => {
    expect(
      cloudinaryLoader({
        src: `${root}f_auto,q_auto,c_limit,w_1200/axum-zion.jpg`,
        width: 384,
      }),
    ).toBe(`${root}f_auto,q_auto,c_limit,w_384/axum-zion.jpg`)
  })

  it('preserves versioned public IDs and supports explicit quality', () => {
    expect(
      cloudinaryLoader({
        src: `${root}v1792565321/axum-zion.jpg`,
        width: 1920,
        quality: 85,
      }),
    ).toBe(`${root}f_auto,q_85,c_limit,w_1920/v1792565321/axum-zion.jpg`)
  })

  it('leaves local placeholders and other providers intact', () => {
    for (const src of [
      '/placeholder.svg',
      '/images/logo.png',
      'https://example.com/photo.jpg',
    ]) {
      expect(cloudinaryLoader({ src, width: 640 })).toBe(src)
    }
  })
})
