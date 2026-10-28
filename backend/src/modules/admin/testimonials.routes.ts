import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapTestimonial } from "../../utils/mappers.js";

export const testimonialsRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

const testimonialSchema = z.object({
  message: z.string().trim().min(1).max(5000),
  reviewerName: z.string().trim().min(1).max(160),
  profession: z.string().trim().max(160).optional(),
});

testimonialsRouter.get(
  "/testimonials",
  asyncHandler(async (_req, res) => {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { id: "desc" } });
    return ok(
      res,
      "Testimonials fetched successfully",
      testimonials.map(mapTestimonial),
    );
  }),
);

testimonialsRouter.post(
  "/testimonials",
  asyncHandler(async (req, res) => {
    const body = testimonialSchema.parse(req.body);
    const testimonial = await prisma.testimonial.create({ data: body });
    return ok(
      res,
      "Testimonial created successfully",
      mapTestimonial(testimonial),
      201,
    );
  }),
);

testimonialsRouter.put(
  "/testimonials/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = testimonialSchema.parse(req.body);
    const testimonial = await prisma.testimonial.update({ where: { id }, data: body });
    return ok(res, "Testimonial updated successfully", mapTestimonial(testimonial));
  }),
);

testimonialsRouter.delete(
  "/testimonials/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.testimonial.delete({ where: { id } });
    return ok(res, "Testimonial deleted successfully", null);
  }),
);
