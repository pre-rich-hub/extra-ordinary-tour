-- Allow admin to control which gallery image is the cover photo (hero) by ordering.
-- The image with the lowest sort_order becomes the tour's header image.
ALTER TABLE "gallery" ADD COLUMN "sort_order" INTEGER NOT NULL DEFAULT 0;

-- Allow admin to set a separate image for the footer CTA section per tour.
ALTER TABLE "tours" ADD COLUMN "cta_band_image_url" TEXT;
