import { Router } from "express";
import type { Router as RouterType } from "express";
import { requireAdminAuth } from "../../middleware/auth.middleware.js";
import { dashboardRouter } from "./dashboard.routes.js";
import { toursRouter } from "./tours.routes.js";
import { destinationsRouter } from "./destinations.routes.js";
import { categoriesRouter } from "./categories.routes.js";
import { galleryRouter } from "./gallery.routes.js";
import { blogRouter } from "./blog.routes.js";
import { testimonialsRouter } from "./testimonials.routes.js";
import { bookingsRouter } from "./bookings.routes.js";
import { contactsRouter } from "./contacts.routes.js";
import { subscribersRouter } from "./subscribers.routes.js";
import { layoverPackagesRouter } from "./layover-packages.routes.js";

export const adminRouter: RouterType = Router();

adminRouter.use(requireAdminAuth);

adminRouter.use(dashboardRouter);
adminRouter.use(toursRouter);
adminRouter.use(destinationsRouter);
adminRouter.use(categoriesRouter);
adminRouter.use(galleryRouter);
adminRouter.use(blogRouter);
adminRouter.use(testimonialsRouter);
adminRouter.use(bookingsRouter);
adminRouter.use(contactsRouter);
adminRouter.use(subscribersRouter);
adminRouter.use(layoverPackagesRouter);
