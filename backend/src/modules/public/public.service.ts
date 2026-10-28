import { Prisma } from "@prisma/client";
import { prisma } from "../../config/database.js";
import { meta } from "../../utils/pagination.js";
import { mapTour } from "../../utils/mappers.js";
import type { ToursQuery } from "./public.validation.js";

// Same include the admin tour routes use, so both surfaces emit an identical
// ApiTour shape from one mapper.
export const tourIncludes = {
  destination: true,
  destinations: { include: { destination: true } },
  gallery: { orderBy: { id: "asc" } },
  categories: { include: { category: true } },
} as const;

/**
 * Build the Prisma filter from the public query string.
 *
 * A tour can reach a destination two ways: the legacy destinationId column
 * and the tour_destination_junction table. Both are matched, otherwise a
 * destination filter would silently miss tours linked only one way.
 */
export function buildTourWhere(query: ToursQuery): Prisma.TourWhereInput {
  const where: Prisma.TourWhereInput = {};

  if (query.featured !== undefined) {
    where.isFeatured = query.featured === "true";
  }

  if (query.categorySlug) {
    where.categories = { some: { category: { slug: query.categorySlug } } };
  }

  if (query.destinationSlug) {
    where.OR = [
      { destination: { slug: query.destinationSlug } },
      { destinations: { some: { destination: { slug: query.destinationSlug } } } },
    ];
  }

  if (query.q) {
    where.AND = [
      {
        OR: [
          { tourName: { contains: query.q, mode: "insensitive" } },
          { overview: { contains: query.q, mode: "insensitive" } },
        ],
      },
    ];
  }

  if (query.priceMin !== undefined || query.priceMax !== undefined) {
    where.adultPrice = {
      ...(query.priceMin !== undefined ? { gte: query.priceMin } : {}),
      ...(query.priceMax !== undefined ? { lte: query.priceMax } : {}),
    };
  }

  if (query.ratingMin !== undefined) {
    where.rating = { gte: query.ratingMin };
  }

  return where;
}

export async function listTours(query: ToursQuery) {
  const where = buildTourWhere(query);
  const skip = (query.page - 1) * query.limit;

  // Count and page run concurrently: the count is a second round trip, and
  // serializing it would double the latency of every list request.
  const [total, tours] = await Promise.all([
    prisma.tour.count({ where }),
    prisma.tour.findMany({
      where,
      include: tourIncludes,
      orderBy: { id: "desc" },
      skip,
      take: query.limit,
    }),
  ]);

  return {
    items: tours.map((tour) => mapTour(tour)),
    meta: meta(total, query.page, query.limit),
  };
}

export async function findTourBySlug(slug: string) {
  return prisma.tour.findUnique({
    where: { slug },
    include: tourIncludes,
  });
}
