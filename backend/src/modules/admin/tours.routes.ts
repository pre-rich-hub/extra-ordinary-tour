import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { parseCategoryIds, parseOptionalJsonArrayString, toBoolean, toNumber } from "../../utils/parsers.js";
import { parseValidDate } from "../../utils/dates.js";
import { mapTour } from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";
import { slugify } from "../../utils/slug.js";

export const toursRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

function parseItinerary(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "[]";
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? JSON.stringify(parsed) : "[]";
  } catch {
    return "[]";
  }
}

const tourTitleSchema = z.string().trim().min(1, "Tour name is required").max(255);
const tourDestinationSchema = z.coerce.number().int().positive("A destination is required");

function parseTourDestinationIds(body: Record<string, unknown>): number[] {
  const destinationIds = [...new Set(parseCategoryIds(body.tourDestinations).filter((id) => id > 0))];
  if (destinationIds.length > 0) return destinationIds;
  return [tourDestinationSchema.parse(body.tourDestination)];
}

async function uniqueTourSlug(title: string, excludeId?: number): Promise<string> {
  const base = slugify(title) || "tour";
  let candidate = base;
  let suffix = 2;
  while (true) {
    const existing = await prisma.tour.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

const tourUpload = uploadFor("tour");

const tourIncludes = {
  destination: true,
  destinations: { include: { destination: true } },
  gallery: { orderBy: { id: "asc" } },
  categories: { include: { category: true } },
} as const;

toursRouter.get(
  "/tours",
  asyncHandler(async (_req, res) => {
    const tours = await prisma.tour.findMany({ include: tourIncludes, orderBy: { id: "desc" } });
    return ok(res, "Tours fetched successfully", tours.map((t) => mapTour(t)));
  }),
);

toursRouter.get(
  "/tours/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const tour = await prisma.tour.findUnique({ where: { id }, include: tourIncludes });
    if (!tour) throw new HttpError(404, "Tour not found");
    return ok(res, "Tour fetched successfully", mapTour(tour, true));
  }),
);

toursRouter.post(
  "/tours",
  tourUpload.array("tourImages", 20),
  asyncHandler(async (req, res) => {
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const imagePaths = files.map((f) => urlForFile(f)).filter((p): p is string => Boolean(p));
    if (imagePaths.length === 0) throw new HttpError(422, "At least one tour image is required");
    const storedPaths = files.map((f) => (f as any).storedPath).filter((p): p is string => Boolean(p));

    try {
      const categoryIds = parseCategoryIds(req.body.tourCategories).filter((id) => id > 0);
      const tourTitle = tourTitleSchema.parse(req.body.tourTitle);
      const destinationIds = parseTourDestinationIds(req.body);
      const destinationId = destinationIds[0];
      const slug = await uniqueTourSlug(tourTitle);
      const created = await prisma.tour.create({
        data: {
          destinationId,
          slug,
          tourName: tourTitle,
          adultPrice: toNumber(req.body.adultPrice) ?? 0,
          childPrice: toNumber(req.body.childPrice) ?? 0,
          discount: req.body.tourDiscount ? String(req.body.tourDiscount) : null,
          rating: toNumber(req.body.tourRating) ?? 0,
          noOfRates: Number(req.body.tourReviews ?? 0),
          isFeatured: toBoolean(req.body.isFeatured),
          overview: String(req.body.tourOverview ?? ""),
          included: parseOptionalJsonArrayString(req.body.tourIncluded),
          excluded: parseOptionalJsonArrayString(req.body.tourExcluded),
          itinerary: parseItinerary(req.body.tourItinerary),
          journeyMap: req.body.tourMap ? String(req.body.tourMap) : null,
          destinations: {
            createMany: {
              data: destinationIds.map((selectedDestinationId) => ({ destinationId: selectedDestinationId })),
              skipDuplicates: true,
            },
          },
          gallery: { createMany: { data: imagePaths.map((imageUrl) => ({ imageUrl })) } },
          ...(categoryIds.length
            ? {
                categories: {
                  createMany: {
                    data: categoryIds.map((categoryId) => ({ categoryId })),
                    skipDuplicates: true,
                  },
                },
              }
            : {}),
        },
        include: tourIncludes,
      });

      return ok(res, "Tour created successfully", mapTour(created, true), 201);
    } catch (error) {
      await Promise.all(storedPaths.map((storedPath) => removeStoredFile(storedPath)));
      throw error;
    }
  }),
);

toursRouter.put(
  "/tours/:id",
  tourUpload.array("tourImages", 20),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const categoryIds = parseCategoryIds(req.body.tourCategories).filter((categoryId) => categoryId > 0);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const imagePaths = files.map((f) => urlForFile(f)).filter((p): p is string => Boolean(p));
    const tourTitle = tourTitleSchema.parse(req.body.tourTitle);
    const destinationIds = parseTourDestinationIds(req.body);
    const destinationId = destinationIds[0];
    const slug = await uniqueTourSlug(tourTitle, id);

    let imagesToRemove: string[] = [];
    const updated = await prisma.$transaction(async (tx) => {
      await tx.tour.update({
        where: { id },
        data: {
          destinationId,
          slug,
          tourName: tourTitle,
          adultPrice: toNumber(req.body.adultPrice) ?? 0,
          childPrice: toNumber(req.body.childPrice) ?? 0,
          discount: req.body.tourDiscount ? String(req.body.tourDiscount) : null,
          rating: toNumber(req.body.tourRating) ?? 0,
          noOfRates: Number(req.body.tourReviews ?? 0),
          isFeatured: toBoolean(req.body.isFeatured),
          overview: String(req.body.tourOverview ?? ""),
          included: parseOptionalJsonArrayString(req.body.tourIncluded),
          excluded: parseOptionalJsonArrayString(req.body.tourExcluded),
          itinerary: parseItinerary(req.body.tourItinerary),
          journeyMap: req.body.tourMap ? String(req.body.tourMap) : null,
          destinations: {
            deleteMany: {},
            createMany: {
              data: destinationIds.map((selectedDestinationId) => ({ destinationId: selectedDestinationId })),
              skipDuplicates: true,
            },
          },
        },
      });

      const deleteImageIds = parseCategoryIds(req.body.deleteImages);
      if (deleteImageIds.length) {
        const deleting = await tx.gallery.findMany({ where: { id: { in: deleteImageIds }, tourId: id } });
        await tx.gallery.deleteMany({ where: { id: { in: deleteImageIds }, tourId: id } });
        imagesToRemove = deleting.map((image) => image.imageUrl);
      }

      if (imagePaths.length) {
        await tx.gallery.createMany({ data: imagePaths.map((imageUrl) => ({ imageUrl, tourId: id })) });
      }

      await tx.tourCategoryJunction.deleteMany({ where: { tourId: id } });
      if (categoryIds.length) {
        await tx.tourCategoryJunction.createMany({
          data: categoryIds.map((categoryId) => ({ tourId: id, categoryId })),
          skipDuplicates: true,
        });
      }

      return tx.tour.findUnique({ where: { id }, include: tourIncludes });
    }, { maxWait: 10000, timeout: 30000 });

    await Promise.all(imagesToRemove.map((imageUrl) => removeStoredFile(imageUrl)));

    return ok(res, "Tour updated successfully", mapTour(updated, true));
  }),
);

toursRouter.delete(
  "/tours/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const gallery = await prisma.gallery.findMany({ where: { tourId: id } });
    await prisma.$transaction([
      prisma.booking.updateMany({ where: { tourId: id }, data: { tourId: null } }),
      prisma.tourBlockedDate.deleteMany({ where: { tourId: id } }),
      prisma.tourCategoryJunction.deleteMany({ where: { tourId: id } }),
      prisma.tourDestinationJunction.deleteMany({ where: { tourId: id } }),
      prisma.gallery.deleteMany({ where: { tourId: id } }),
      prisma.tour.delete({ where: { id } }),
    ]);
    await Promise.all(gallery.map((image) => removeStoredFile(image.imageUrl)));
    return ok(res, "Tour deleted successfully", null);
  }),
);

// ---------------------- Blocked dates ----------------------

const blockedDateSchema = z.object({
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).min(1),
  reason: z.string().optional(),
});

toursRouter.get(
  "/tours/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    const blockedDates = await prisma.tourBlockedDate.findMany({
      where: { tourId: id },
      orderBy: { date: "asc" },
    });

    return ok(res, "Blocked dates fetched successfully", blockedDates.map((bd) => ({
      id: bd.id,
      date: bd.date.toISOString().slice(0, 10),
      reason: bd.reason,
    })));
  }),
);

toursRouter.post(
  "/tours/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = blockedDateSchema.parse(req.body);

    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    // Validate dates parse to real calendar dates only (rejects "2026-02-31",
    // "2026-13-01", "2026-00-10" and treats them as unprocessable input)
    const parsedDates = body.dates.map((date: string) => {
      const parsed = parseValidDate(date);
      if (!parsed) throw new HttpError(422, `Invalid date: ${date}`);
      return parsed;
    });

    const created = await prisma.tourBlockedDate.createMany({
      data: parsedDates.map((d: Date) => ({
        tourId: id,
        date: d,
        reason: body.reason,
      })),
      skipDuplicates: true,
    });

    return ok(res, `${created.count} blocked dates created successfully`, { count: created.count }, 201);
  }),
);

toursRouter.delete(
  "/tours/:id/blocked-dates/:blockedDateId",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const blockedDateId = idParam.parse(req.params.blockedDateId);

    const blockedDate = await prisma.tourBlockedDate.findFirst({
      where: { id: blockedDateId, tourId: id },
    });
    if (!blockedDate) throw new HttpError(404, "Blocked date not found");

    await prisma.tourBlockedDate.delete({ where: { id: blockedDateId } });
    return ok(res, "Blocked date deleted successfully", null);
  }),
);
