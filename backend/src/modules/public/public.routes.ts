import { Router } from "express";
import type { Router as RouterType } from "express";
import { waitUntil } from "@vercel/functions";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  mapBlog,
  mapDestination,
  mapGalleryImage,
  mapLayoverPackage,
  mapTestimonial,
  mapTour,
} from "../../utils/mappers.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { sendContactAdminEmail } from "../../services/email.service.js";
import {
  contactSchema,
  subscribeSchema,
  tourSlugParamsSchema,
  toursQuerySchema,
} from "./public.validation.js";
import { findTourBySlug, listTours } from "./public.service.js";

export const publicRouter: RouterType = Router();

// ---------------------------------------------------------------------------
// Tours
// ---------------------------------------------------------------------------

publicRouter.get(
  "/tours",
  asyncHandler(async (req, res) => {
    const query = toursQuerySchema.parse(req.query);
    return ok(res, "Tours fetched successfully", await listTours(query));
  }),
);

// /tours/slug/:slug rather than /tours/:slug so the literal segment cannot
// be swallowed by a future /tours/:id style route.
publicRouter.get(
  "/tours/slug/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = tourSlugParamsSchema.parse(req.params);
    const tour = await findTourBySlug(slug);
    if (!tour) throw new HttpError(404, "Tour not found");
    return ok(res, "Tour fetched successfully", mapTour(tour, true));
  }),
);

// ---------------------------------------------------------------------------
// Layover packages
// ---------------------------------------------------------------------------

publicRouter.get(
  "/layover-packages",
  asyncHandler(async (_req, res) => {
    const packages = await prisma.layoverPackage.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });
    return ok(
      res,
      "Layover packages fetched successfully",
      packages.map(mapLayoverPackage),
    );
  }),
);

// ---------------------------------------------------------------------------
// Destinations, gallery and journal
// ---------------------------------------------------------------------------

publicRouter.get(
  "/destinations",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      orderBy: { id: "asc" },
    });
    return ok(
      res,
      "Destinations fetched successfully",
      destinations.map(mapDestination),
    );
  }),
);

// Only the general gallery: images tied to a tour already show on that tour.
publicRouter.get(
  "/gallery",
  asyncHandler(async (_req, res) => {
    const images = await prisma.gallery.findMany({
      where: { tourId: null },
      orderBy: { id: "desc" },
    });
    return ok(
      res,
      "Gallery images fetched successfully",
      images.map(mapGalleryImage),
    );
  }),
);

publicRouter.get(
  "/blog",
  asyncHandler(async (_req, res) => {
    const posts = await prisma.blog.findMany({
      include: { category: true },
      orderBy: { id: "desc" },
    });
    return ok(res, "Blog posts fetched successfully", posts.map(mapBlog));
  }),
);

publicRouter.get(
  "/testimonials",
  asyncHandler(async (_req, res) => {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { id: "asc" },
    });
    return ok(
      res,
      "Testimonials fetched successfully",
      testimonials.map(mapTestimonial),
    );
  }),
);

// ---------------------------------------------------------------------------
// Enquiry and newsletter
//
// Neither is a booking. Both are advisory leads: a written record plus an
// email to the studio, never a confirmed reservation.
// ---------------------------------------------------------------------------

publicRouter.post(
  "/contact",
  publicFormLimiter,
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    const contact = await prisma.contact.create({
      data: { name, email, message },
      select: { id: true },
    });

    // Fire and forget, kept alive by waitUntil so Vercel does not freeze the
    // function before the SMTP conversation finishes. A mail outage must not
    // fail a submission that is already safely written; the error is logged,
    // not swallowed.
    waitUntil(
      sendContactAdminEmail({ name, email, message }).catch((error) => {
        console.error("Contact notification email failed", {
          contactId: contact.id,
          error: error instanceof Error ? error.message : String(error),
        });
      }),
    );

    return ok(res, "Enquiry submitted successfully", { id: contact.id }, 201);
  }),
);

publicRouter.post(
  "/subscribe",
  publicFormLimiter,
  validate(subscribeSchema),
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existing = await prisma.subscriber.findUnique({
      where: { email },
      select: { id: true },
    });

    // Re-subscribing is a no-op rather than an error: a person who clicks
    // twice should not see a failure, and a 409 would only be noise.
    if (existing) {
      return ok(res, "Already subscribed", { id: existing.id });
    }

    const subscriber = await prisma.subscriber.create({
      data: { email },
      select: { id: true },
    });

    return ok(res, "Subscription added", { id: subscriber.id }, 201);
  }),
);
