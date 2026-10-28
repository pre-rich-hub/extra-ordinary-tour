import { getStorageProvider } from "./storage/index.js";

// Callers pass either a stored path (e.g. "assets/images/custom/gallery/TOUR-x.png",
// the database driver's bare media id) or a URL form (e.g. "/assets/images/…"
// or "/api/v1/media/<uuid>") back from stored rows. Normalize to the stored
// path before handing it to the provider; a leading slash would resolve
// outside the upload root (local driver) and a media URL prefix would never
// match a media id (database driver), leaking files on replace/remove/delete.
// Full HTTP(S) URLs are external content and are skipped entirely.
export async function removeStoredFile(storedPath: string | null | undefined) {
  if (!storedPath) return;
  if (/^https?:\/\//i.test(storedPath)) return;
  const normalized = storedPath
    .replace(/^\/+/, "")
    .replace(/^api\/v1\/media\//, "");
  const provider = await getStorageProvider();
  await provider.delete(normalized);
}
