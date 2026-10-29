import { z } from "zod";

// Query contract for GET /api/v1/tours. The frontend sends every one of
// these; unknown keys are stripped rather than rejected so a new filter
// on the client never breaks the deployed API.
export const toursQuerySchema = z.object({
  featured: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  categorySlug: z.string().min(1).optional(),
  destinationSlug: z.string().min(1).optional(),
  q: z.string().min(1).optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  ratingMin: z.coerce.number().min(0).optional(),
});

export const tourSlugParamsSchema = z.object({
  slug: z.string().min(1),
});

export const contactSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(155),
    email: z.string().trim().email().max(255),
    message: z.string().trim().min(1).max(5000),
  }),
});

export const subscribeSchema = z.object({
  body: z.object({
    email: z.string().trim().email().max(255),
  }),
});

export type ToursQuery = z.infer<typeof toursQuerySchema>;
