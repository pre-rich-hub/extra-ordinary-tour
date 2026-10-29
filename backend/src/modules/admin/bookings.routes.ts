import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { logger } from "../../config/pino.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { mapBooking } from "../../utils/mappers.js";
import { sendBookingStatusEmail } from "../../services/email.service.js";

export const bookingsRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

export const bookingStatusSchema = z.object({
  // Future public bookings module should import from here.
  status: z.enum(["Pending", "Confirmed", "Cancelled", "Completed"]),
});

export async function updateBookingStatus(
  id: number,
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed",
) {
  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
    include: { tour: true },
  });

  sendBookingStatusEmail({
    email: booking.email,
    fullName: booking.fullName,
    tourName: booking.tour?.tourName ?? "Tour",
    bookingId: booking.id,
    chosenDate: booking.chosenDate.toISOString().slice(0, 10),
    status,
  }).catch((err) => logger.error({ err }, "Booking status email failed"));

  return booking;
}

bookingsRouter.get(
  "/bookings",
  asyncHandler(async (_req, res) => {
    const bookings = await prisma.booking.findMany({
      include: { tour: true },
      orderBy: { createdAt: "desc" },
    });
    return ok(res, "Bookings fetched successfully", bookings.map(mapBooking));
  }),
);

bookingsRouter.get(
  "/bookings/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { tour: true },
    });
    if (!booking) throw new HttpError(404, "Booking not found");
    return ok(res, "Booking fetched successfully", mapBooking(booking));
  }),
);

bookingsRouter.put(
  "/bookings/:id/status",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const { status } = bookingStatusSchema.parse(req.body);
    const booking = await updateBookingStatus(id, status);
    return ok(res, "Booking status updated successfully", mapBooking(booking));
  }),
);

bookingsRouter.delete(
  "/bookings/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.booking.delete({ where: { id } });
    return ok(res, "Booking deleted successfully", null);
  }),
);
