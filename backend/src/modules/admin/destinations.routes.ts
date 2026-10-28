import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { mapDestination } from "../../utils/mappers.js";
import { slugify } from "../../utils/slug.js";

export const destinationsRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const destinationUpload = uploadFor("destination");

destinationsRouter.get(
  "/destinations",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true, tourLinks: true } } },
      orderBy: { id: "desc" },
    });
    return ok(
      res,
      "Destinations fetched successfully",
      destinations.map(mapDestination),
    );
  }),
);

destinationsRouter.get(
  "/destinations/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: { _count: { select: { tours: true, tourLinks: true } } },
    });
    if (!destination) throw new HttpError(404, "Destination not found");
    return ok(res, "Destination fetched successfully", mapDestination(destination));
  }),
);

destinationsRouter.post(
  "/destinations",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    if (!imageUrl) throw new HttpError(422, "Destination image is required");
    const destinationName = String(req.body.destinationName ?? "");
    const slug = slugify(destinationName);
    const destination = await prisma.destination.create({
      data: {
        slug,
        destinationName,
        description: String(req.body.destinationDescription ?? ""),
        imageUrl,
      },
      include: { _count: { select: { tours: true, tourLinks: true } } },
    });
    return ok(
      res,
      "Destination created successfully",
      mapDestination(destination),
      201,
    );
  }),
);

destinationsRouter.put(
  "/destinations/:id",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const destinationName = String(req.body.destinationName ?? "");
    const slug = slugify(destinationName);
    const destination = await prisma.destination.update({
      where: { id },
      data: {
        slug,
        destinationName,
        description: String(req.body.destinationDescription ?? ""),
        ...(imageUrl ? { imageUrl } : {}),
      },
      include: { _count: { select: { tours: true, tourLinks: true } } },
    });
    return ok(res, "Destination updated successfully", mapDestination(destination));
  }),
);

destinationsRouter.delete(
  "/destinations/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.destination.delete({ where: { id } });
    return ok(res, "Destination deleted successfully", null);
  }),
);
