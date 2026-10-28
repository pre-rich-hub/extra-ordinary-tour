import { Router } from "express";
import type { Router as RouterType } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { buildBookingTrends, TREND_DAYS } from "./dashboard.trends.js";

export const dashboardRouter: RouterType = Router();

const TOP_TOURS = 5;

dashboardRouter.get(
  "/dashboard/stats",
  asyncHandler(async (_req, res) => {
    const now = new Date();
    // Start at UTC midnight 29 days ago so today plus the previous 29 days
    // make exactly 30 calendar buckets.
    const trendStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - (TREND_DAYS - 1)),
    );

    const [
      totalTours,
      totalDestinations,
      totalBookings,
      totalContacts,
      totalTestimonials,
      totalSubscribers,
      totalGalleryImages,
      totalBlogPosts,
      trendRows,
      topTourRows,
    ] = await Promise.all([
      prisma.tour.count(),
      prisma.destination.count(),
      prisma.booking.count(),
      prisma.contact.count(),
      prisma.testimonial.count(),
      prisma.subscriber.count(),
      prisma.gallery.count(),
      prisma.blog.count(),
      prisma.booking.findMany({
        where: { createdAt: { gte: trendStart, lte: now } },
        select: { createdAt: true },
      }),
      prisma.booking.groupBy({
        by: ["tourId"],
        where: { tourId: { not: null } },
        _count: { _all: true },
      }),
    ]);

    const bookingTrends = buildBookingTrends(trendRows, now);

    const rankedTours = topTourRows
      .flatMap((row) =>
        row.tourId === null
          ? []
          : [{ id: row.tourId, bookingCount: row._count._all }],
      )
      .sort(
        (left, right) =>
          right.bookingCount - left.bookingCount || left.id - right.id,
      )
      .slice(0, TOP_TOURS);

    const tourNames = rankedTours.length
      ? await prisma.tour.findMany({
          where: { id: { in: rankedTours.map((tour) => tour.id) } },
          select: { id: true, tourName: true },
        })
      : [];
    const nameById = new Map(tourNames.map((tour) => [tour.id, tour.tourName]));

    const topTours = rankedTours.map((tour) => ({
      id: tour.id,
      name: nameById.get(tour.id) ?? "Deleted tour",
      bookingCount: tour.bookingCount,
    }));

    return ok(res, "Dashboard stats fetched successfully", {
      totals: {
        tours: totalTours,
        destinations: totalDestinations,
        bookings: totalBookings,
        contacts: totalContacts,
        testimonials: totalTestimonials,
        subscribers: totalSubscribers,
        galleryImages: totalGalleryImages,
        blogPosts: totalBlogPosts,
      },
      bookingTrends,
      topTours,
    });
  }),
);
