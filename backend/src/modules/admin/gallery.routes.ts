import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { mapGalleryImage } from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";

export const galleryRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const galleryUpload = uploadFor("gallery");

galleryRouter.get(
  "/gallery",
  asyncHandler(async (_req, res) => {
    const images = await prisma.gallery.findMany({
      include: { tour: { select: { id: true, tourName: true } } },
      orderBy: { id: "desc" },
    });
    return ok(
      res,
      "Gallery images fetched successfully",
      images.map((img) => ({
        ...mapGalleryImage(img),
        tour: img.tour ? { id: img.tour.id, name: img.tour.tourName } : null,
      })),
    );
  }),
);

galleryRouter.post(
  "/gallery",
  galleryUpload.single("galleryImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    if (!imageUrl) throw new HttpError(422, "Gallery image is required");
    const tourId = req.body.tourId ? Number(req.body.tourId) : null;
    const image = await prisma.gallery.create({ data: { imageUrl, tourId } });
    return ok(
      res,
      "Gallery image created successfully",
      mapGalleryImage(image),
      201,
    );
  }),
);

galleryRouter.delete(
  "/gallery/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const image = await prisma.gallery.delete({ where: { id } });
    await removeStoredFile(image.imageUrl);
    return ok(res, "Gallery image deleted successfully", null);
  }),
);
