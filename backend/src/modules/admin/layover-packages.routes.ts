import { Prisma } from "@prisma/client";
import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import {
  storedPathForFile,
  uploadFor,
  urlForFile,
} from "../../middleware/upload.middleware.js";
import { mapLayoverPackage } from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";
import { parseLineList } from "../../utils/parsers.js";
import { slugify } from "../../utils/slug.js";

export const layoverPackagesRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const requiredText = z.string().trim().min(1).max(255);
const requiredLongText = z.string().trim().min(1);
const optionalText = z.string().trim().min(1).max(255).optional();
const optionalLongText = z.string().trim().min(1).optional();
const optionalSortOrder = z.coerce.number().int().min(0).optional();

const layoverUpload = uploadFor("layover");

const orderBy = [{ sortOrder: "asc" as const }, { id: "asc" as const }];

type LayoverData = {
  title: string;
  hours: string;
  price: string;
  teaser: string;
  bestFor: string;
  sortOrder: number;
  imageUrl: string | null;
  itinerary: string;
  includes: string;
};

async function uniqueLayoverSlug(title: string): Promise<string> {
  const base = slugify(title) || "layover-package";
  let candidate = base;
  let suffix = 2;
  while (true) {
    const existing = await prisma.layoverPackage.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

async function createWithUniqueSlug(
  title: string,
  data: LayoverData,
) {
  // The slug lookup and insert are separate statements, so two requests with
  // the same title can both pass the lookup. Retry the loser instead of
  // surfacing a generic 409.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const slug = await uniqueLayoverSlug(title);
    try {
      return await prisma.layoverPackage.create({
        data: { ...data, slug },
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) continue;
      throw error;
    }
  }

  throw new HttpError(409, "Could not generate a unique layover package slug");
}

function parseRequiredList(value: unknown, field: string): string[] {
  const items = parseLineList(value);
  if (items.length === 0) {
    throw new HttpError(422, `${field} must contain at least one line`);
  }
  return items;
}

layoverPackagesRouter.get(
  "/layover-packages",
  asyncHandler(async (_req, res) => {
    const packages = await prisma.layoverPackage.findMany({ orderBy });
    return ok(
      res,
      "Layover packages fetched successfully",
      packages.map(mapLayoverPackage),
    );
  }),
);

layoverPackagesRouter.get(
  "/layover-packages/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const packageRow = await prisma.layoverPackage.findUnique({ where: { id } });
    if (!packageRow) throw new HttpError(404, "Layover package not found");
    return ok(
      res,
      "Layover package fetched successfully",
      mapLayoverPackage(packageRow),
    );
  }),
);

layoverPackagesRouter.post(
  "/layover-packages",
  layoverUpload.single("layoverImage"),
  asyncHandler(async (req, res) => {
    const uploadedPath = storedPathForFile(req.file);

    try {
      const data: LayoverData = {
        title: requiredText.parse(req.body.title),
        hours: requiredText.parse(req.body.hours),
        price: requiredText.parse(req.body.price),
        teaser: requiredLongText.parse(req.body.teaser),
        bestFor: requiredText.parse(req.body.bestFor),
        sortOrder: optionalSortOrder.parse(req.body.sortOrder) ?? 0,
        imageUrl: urlForFile(req.file) ?? null,
        itinerary: JSON.stringify(
          parseRequiredList(req.body.itinerary, "Itinerary"),
        ),
        includes: JSON.stringify(
          parseRequiredList(req.body.includes, "Includes"),
        ),
      };

      const created = await createWithUniqueSlug(data.title, data);
      return ok(
        res,
        "Layover package created successfully",
        mapLayoverPackage(created),
        201,
      );
    } catch (error) {
      // The upload middleware writes before this handler runs. Any failure
      // below (validation, slug generation, insert) must remove the file or it
      // stays orphaned on disk/database storage.
      await removeStoredFile(uploadedPath);
      throw error;
    }
  }),
);

layoverPackagesRouter.put(
  "/layover-packages/:id",
  layoverUpload.single("layoverImage"),
  asyncHandler(async (req, res) => {
    const uploadedPath = storedPathForFile(req.file);

    try {
      const id = idParam.parse(req.params.id);
      const existing = await prisma.layoverPackage.findUnique({ where: { id } });
      if (!existing) throw new HttpError(404, "Layover package not found");

      const uploadedUrl = urlForFile(req.file);
      const removeImage = req.body.removeImage === "true";
      const imageUrl = uploadedUrl ?? (removeImage ? null : existing.imageUrl);

      const data = {
        title: optionalText.parse(req.body.title) ?? existing.title,
        hours: optionalText.parse(req.body.hours) ?? existing.hours,
        price: optionalText.parse(req.body.price) ?? existing.price,
        teaser: optionalLongText.parse(req.body.teaser) ?? existing.teaser,
        bestFor: optionalText.parse(req.body.bestFor) ?? existing.bestFor,
        sortOrder:
          optionalSortOrder.parse(req.body.sortOrder) ?? existing.sortOrder,
        itinerary:
          req.body.itinerary === undefined
            ? existing.itinerary
            : JSON.stringify(
                parseRequiredList(req.body.itinerary, "Itinerary"),
              ),
        includes:
          req.body.includes === undefined
            ? existing.includes
            : JSON.stringify(parseRequiredList(req.body.includes, "Includes")),
        imageUrl,
      };

      const updated = await prisma.layoverPackage.update({ where: { id }, data });

      if (existing.imageUrl && (uploadedUrl || removeImage)) {
        await removeStoredFile(existing.imageUrl);
      }

      return ok(
        res,
        "Layover package updated successfully",
        mapLayoverPackage(updated),
      );
    } catch (error) {
      await removeStoredFile(uploadedPath);
      throw error;
    }
  }),
);

layoverPackagesRouter.delete(
  "/layover-packages/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const existing = await prisma.layoverPackage.findUnique({ where: { id } });
    if (!existing) throw new HttpError(404, "Layover package not found");

    await prisma.layoverPackage.delete({ where: { id } });
    if (existing.imageUrl) await removeStoredFile(existing.imageUrl);
    return ok(res, "Layover package deleted successfully", null);
  }),
);
