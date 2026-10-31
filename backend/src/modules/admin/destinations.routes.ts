import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { storedPathForFile, uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { mapDestination } from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";
import { parseLineList } from "../../utils/parsers.js";
import { slugify } from "../../utils/slug.js";

export const destinationsRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const destinationUpload = uploadFor("destination");

const shortText = z.string().trim().min(1).max(255);

// Every field the public destination page shows, so a destination made here
// is as complete as the ones already on the site.
const destinationFieldsSchema = z.object({
  destinationName: shortText,
  region: shortText,
  tag: shortText,
  teaser: z.string().trim().min(1),
  intro: z.string().trim().min(1),
  bestTime: shortText,
  duration: shortText,
  altitude: shortText,
  destinationDescription: z.string().trim().min(1),
  highlights: z.string().trim().min(1),
});

function destinationData(body: unknown) {
  const { destinationName, destinationDescription, highlights, ...fields } =
    destinationFieldsSchema.parse(body);
  return {
    ...fields,
    destinationName,
    description: destinationDescription,
    highlights: JSON.stringify(parseLineList(highlights)),
  };
}

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
    try {
      const data = destinationData(req.body);
      const destination = await prisma.destination.create({
        data: { ...data, slug: slugify(data.destinationName), imageUrl },
        include: { _count: { select: { tours: true, tourLinks: true } } },
      });
      return ok(
        res,
        "Destination created successfully",
        mapDestination(destination),
        201,
      );
    } catch (error) {
      await removeStoredFile(storedPathForFile(req.file));
      throw error;
    }
  }),
);

destinationsRouter.put(
  "/destinations/:id",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    try {
      // The slug stays put on edit: it is the public URL and the key that
      // ties this row to its translated copy.
      const previous = await prisma.destination.findUnique({
        where: { id },
        select: { imageUrl: true },
      });
      const destination = await prisma.destination.update({
        where: { id },
        data: { ...destinationData(req.body), ...(imageUrl ? { imageUrl } : {}) },
        include: { _count: { select: { tours: true, tourLinks: true } } },
      });
      if (imageUrl) await removeStoredFile(previous?.imageUrl);
      return ok(res, "Destination updated successfully", mapDestination(destination));
    } catch (error) {
      await removeStoredFile(storedPathForFile(req.file));
      throw error;
    }
  }),
);

destinationsRouter.delete(
  "/destinations/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const destination = await prisma.destination.delete({ where: { id } });
    await removeStoredFile(destination.imageUrl);
    return ok(res, "Destination deleted successfully", null);
  }),
);
