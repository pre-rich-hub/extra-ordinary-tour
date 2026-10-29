import { prisma } from "../../config/database.js";
import type { StorageProvider, SaveResult, UploadKind } from "./types.js";

const mediaPathPrefix = "/api/v1/media/";
let mediaTableReady: Promise<unknown> | null = null;

function ensureMediaTable(): Promise<unknown> {
  if (!mediaTableReady) {
    mediaTableReady = prisma
      .$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "media_assets" (
          "id" UUID NOT NULL PRIMARY KEY,
          "content" BYTEA NOT NULL,
          "mime_type" TEXT NOT NULL,
          "original_name" TEXT,
          "size" INTEGER NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)
      .catch((error) => {
        mediaTableReady = null;
        throw error;
      });
  }
  return mediaTableReady;
}

function mediaIdFromPath(value: string): string | null {
  const candidate = value.startsWith(mediaPathPrefix)
    ? value.slice(mediaPathPrefix.length)
    : value;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    candidate,
  )
    ? candidate
    : null;
}

export class DatabaseStorageProvider implements StorageProvider {
  async save(
    file: { buffer: Buffer; originalname: string; mimetype?: string },
    _kind: UploadKind,
  ): Promise<SaveResult> {
    await ensureMediaTable();
    const asset = await prisma.mediaAsset.create({
      data: {
        content: Uint8Array.from(file.buffer),
        mimeType: file.mimetype || "application/octet-stream",
        originalName: file.originalname,
        size: file.buffer.length,
      },
      select: { id: true },
    });

    return { storedPath: asset.id, url: this.getUrl(asset.id) };
  }

  async delete(storedPath: string): Promise<void> {
    const id = mediaIdFromPath(storedPath);
    if (!id) return;
    try {
      await prisma.mediaAsset.delete({ where: { id } });
    } catch {
      // Missing media should not prevent deleting its parent record.
    }
  }

  getUrl(storedPath: string): string {
    return `${mediaPathPrefix}${storedPath}`;
  }
}
