// Local dev uploads live under /assets and are served by the backend process,
// not the frontend. Production uses /api/v1/media or an absolute URL.
export function usableImage(
  image: string | null | undefined,
  fallback: string,
): string {
  if (!image) return fallback
  if (image.startsWith('/api/v1/') || /^https?:\/\//i.test(image)) return image
  return fallback
}
