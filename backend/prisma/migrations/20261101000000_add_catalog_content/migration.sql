-- Every column is nullable or defaulted, so existing rows stay valid and the
-- previous deployment keeps working while this applies.
ALTER TABLE "tours"
  ADD COLUMN "days" TEXT,
  ADD COLUMN "nights" INTEGER,
  ADD COLUMN "style" TEXT,
  ADD COLUMN "season" TEXT,
  ADD COLUMN "group_size" TEXT,
  ADD COLUMN "teaser" TEXT,
  ADD COLUMN "highlights" TEXT,
  ADD COLUMN "places" TEXT;

ALTER TABLE "destinations"
  ADD COLUMN "region" TEXT,
  ADD COLUMN "tag" TEXT,
  ADD COLUMN "teaser" TEXT,
  ADD COLUMN "intro" TEXT,
  ADD COLUMN "best_time" TEXT,
  ADD COLUMN "duration" TEXT,
  ADD COLUMN "altitude" TEXT,
  ADD COLUMN "highlights" TEXT;

ALTER TABLE "gallery"
  ADD COLUMN "location" TEXT,
  ADD COLUMN "caption" TEXT;

ALTER TABLE "blog"
  ADD COLUMN "author" TEXT,
  ADD COLUMN "author_role" TEXT,
  ADD COLUMN "author_image" TEXT,
  ADD COLUMN "read_time" TEXT,
  ADD COLUMN "is_featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "updated_on" TIMESTAMP(3);

ALTER TABLE "testimonials"
  ADD COLUMN "slug" VARCHAR(255),
  ADD COLUMN "image_url" TEXT,
  ADD COLUMN "platform" TEXT,
  ADD COLUMN "rating" INTEGER,
  ADD COLUMN "title" TEXT,
  ADD COLUMN "review_date" TEXT;

CREATE UNIQUE INDEX "testimonials_slug_key" ON "testimonials"("slug");
