-- CreateTable
CREATE TABLE "layover_packages" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "hours" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image_url" TEXT,
    "teaser" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "includes" TEXT NOT NULL,
    "best_for" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "layover_packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "layover_packages_slug_key" ON "layover_packages"("slug");
