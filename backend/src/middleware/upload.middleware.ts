import path from "node:path";
import multer from "multer";
import { env } from "../config/env.js";
import { getStorageProvider } from "../services/storage/index.js";
import type { UploadKind } from "../services/storage/types.js";
import { HttpError } from "./error.middleware.js";

export { UploadKind };

const allowedExtensions = ["jpg", "jpeg", "png", "webp", "avif"];

function storageFailureMessage(plural: boolean): string {
  if (process.env.VERCEL && env.STORAGE_DRIVER === "local") {
    return "Image uploads on Vercel require database media storage configuration";
  }
  return plural
    ? "Images could not be stored. Check the persistent media storage configuration"
    : "The image could not be stored. Check the persistent media storage configuration";
}

function createMulterUpload() {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: env.MAX_UPLOAD_MB * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
      if (allowedExtensions.includes(ext) && file.mimetype.startsWith("image/")) {
        cb(null, true);
        return;
      }

      cb(new HttpError(422, "Images must use JPG, PNG, WebP, or AVIF format"));
    },
  });
}

export function storedPathForFile(
  file?: Express.Multer.File,
): string | undefined {
  return (file as (Express.Multer.File & { storedPath?: string }) | undefined)
    ?.storedPath;
}

export function urlForFile(file?: Express.Multer.File): string | undefined {
  return (file as (Express.Multer.File & { url?: string }) | undefined)?.url;
}

export function uploadFor(kind: UploadKind) {
  const upload = createMulterUpload();

  async function saveToStorage(file: Express.Multer.File) {
    const provider = await getStorageProvider();
    const result = await provider.save(file, kind);
    (file as any).storedPath = result.storedPath;
    (file as any).url = result.url;
  }

  return {
    array(field: string, maxCount: number) {
      const multerMw = upload.array(field, maxCount);
      return (req: any, res: any, next: any) => {
        multerMw(req, res, (err?: any) => {
          if (err) return next(err);
          const files = (req.files as Express.Multer.File[]) ?? [];
          Promise.all(files.map(saveToStorage))
            .then(() => next())
            .catch(async () => {
              // Delete already-saved siblings so a partial failure does not
              // leak files that no DB row will ever reference.
              const provider = await getStorageProvider().catch(() => null);
              if (provider) {
                await Promise.all(
                  files.map((file: any) =>
                    file?.storedPath
                      ? provider.delete(file.storedPath).catch(() => undefined)
                      : undefined,
                  ),
                );
              }
              next(new HttpError(503, storageFailureMessage(true)));
            });
        });
      };
    },

    single(field: string) {
      const multerMw = upload.single(field);
      return (req: any, res: any, next: any) => {
        multerMw(req, res, async (err?: any) => {
          if (err) return next(err);
          if (!req.file) return next();
          try {
            await saveToStorage(req.file);
            next();
          } catch {
            next(new HttpError(503, storageFailureMessage(false)));
          }
        });
      };
    },
  };
}
