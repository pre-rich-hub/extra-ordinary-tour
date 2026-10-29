import { Router } from "express";
import type { Router as RouterType } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { fail, ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { mapContact } from "../../utils/mappers.js";
import { sendEmail } from "../../services/email.service.js";

export const contactsRouter: RouterType = Router();

const idParam = z.coerce.number().int().positive();

contactsRouter.get(
  "/contacts",
  asyncHandler(async (_req, res) => {
    const contacts = await prisma.contact.findMany({ orderBy: { id: "desc" } });
    return ok(res, "Contacts fetched successfully", contacts.map(mapContact));
  }),
);

contactsRouter.get(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new HttpError(404, "Contact not found");
    return ok(res, "Contact fetched successfully", mapContact(contact));
  }),
);

contactsRouter.post(
  "/contacts/:id/reply",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = z
      .object({ subject: z.string().min(1), message: z.string().min(1) })
      .parse(req.body);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new HttpError(404, "Contact not found");

    if (!env.EMAIL_ENABLED) {
      return fail(
        res,
        "Email is not enabled",
        [
          {
            path: "email",
            message: "Set EMAIL_ENABLED=true and configure SMTP/Resend to send replies",
          },
        ],
        503,
      );
    }

    try {
      await sendEmail({
        to: contact.email,
        subject: body.subject,
        html: `
          <p>Dear ${contact.name},</p>
          <p>${body.message.replace(/\r?\n/g, "<br>")}</p>
          <p>Best regards,<br>Site Team</p>
        `,
      });
    } catch (err) {
      return fail(
        res,
        "Failed to send email. Check that EMAIL_ENABLED is set and SMTP/Resend is configured.",
        [
          {
            path: "email",
            message: err instanceof Error ? err.message : "Unknown email error",
          },
        ],
        503,
      );
    }

    return ok(res, "Reply sent successfully", null);
  }),
);

contactsRouter.delete(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.contact.delete({ where: { id } });
    return ok(res, "Contact deleted successfully", null);
  }),
);
