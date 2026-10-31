import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { env } from "../src/config/env.js";
import { destinations } from "../../frontend/src/features/destinations/data/destinations.js";
import { placeDestinations } from "../../frontend/src/features/destinations/data/relations.js";
import { tours } from "../../frontend/src/features/tours/data/tours.js";
import { posts } from "../../frontend/src/features/blog/data/posts.js";
import type { PostBlock } from "../../frontend/src/features/blog/types.js";
import { testimonials } from "../../frontend/src/features/reviews/data/testimonials.js";
import { gallerySlides } from "../../frontend/src/features/home/data/gallery.js";

// Copies the catalogue that shipped in the frontend into the database so it
// can be edited from the admin. Rows that already exist are left untouched, so
// re-running this never overwrites an admin edit, and the slugs are kept
// because the frontend keys its translated copy by them.
//
//   pnpm seed:catalog --dry-run   report what would be created
//   pnpm seed:catalog             write it
const dryRun = process.argv.includes("--dry-run");

const prisma = new PrismaClient({
  ...(env.DIRECT_URL ? { datasourceUrl: env.DIRECT_URL } : {}),
});

const count = { destinations: 0, tours: 0, posts: 0, categories: 0, testimonials: 0, gallery: 0 };

function slugOf(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// The text format the admin's article box uses: blank lines between
// paragraphs, "## " for a heading and "- " for each list item.
function articleText(body: PostBlock[]) {
  return body
    .map((block) => {
      if (typeof block === "string") return block;
      if ("heading" in block) return `## ${block.heading}`;
      return block.list.map((item) => `- ${item}`).join("\n");
    })
    .join("\n\n");
}

async function seedDestinations() {
  for (const d of destinations) {
    if (await prisma.destination.findUnique({ where: { slug: d.slug } })) continue;
    count.destinations += 1;
    if (dryRun) continue;
    await prisma.destination.create({
      data: {
        slug: d.slug,
        destinationName: d.name,
        description: d.paragraphs.join("\n\n"),
        imageUrl: d.image,
        region: d.region,
        tag: d.tag,
        teaser: d.teaser,
        intro: d.intro,
        bestTime: d.bestTime,
        duration: d.duration,
        altitude: d.altitude,
        highlights: JSON.stringify(d.highlights),
      },
    });
  }
}

async function seedTours() {
  const rows = await prisma.destination.findMany({ select: { id: true, slug: true } });
  const idBySlug = new Map(rows.map((row) => [row.slug, row.id]));

  for (const t of tours) {
    if (await prisma.tour.findUnique({ where: { slug: t.slug } })) continue;
    count.tours += 1;
    if (dryRun) continue;

    const destinationIds = [
      ...new Set(
        placeDestinations(t, destinations)
          .map((slug) => (slug ? idBySlug.get(slug) : undefined))
          .filter((id): id is number => id !== undefined),
      ),
    ];
    await prisma.tour.create({
      data: {
        slug: t.slug,
        tourName: t.title,
        destinationId: destinationIds[0] ?? null,
        adultPrice: t.priceAmount ?? null,
        isFeatured: Boolean(t.featured),
        overview: t.summary,
        included: JSON.stringify(t.includes),
        excluded: JSON.stringify(t.excludes),
        itinerary: JSON.stringify(
          t.itinerary.map((step, index) => ({
            day: index + 1,
            // Not every step is one day: "Days 8 to 11", "Full Day".
            dayLabel: step.day,
            title: step.title,
            activities: step.text,
            overnight: "",
            meals: "",
          })),
        ),
        days: t.days,
        nights: t.nights,
        style: t.style,
        season: t.season,
        groupSize: t.group,
        teaser: t.teaser,
        highlights: JSON.stringify(t.highlights ?? []),
        places: JSON.stringify(t.places),
        gallery: { create: { imageUrl: t.image } },
        destinations: {
          createMany: { data: destinationIds.map((destinationId) => ({ destinationId })) },
        },
      },
    });
  }
}

async function seedPosts() {
  // Reversed because the journal lists newest rows first, which keeps the
  // editorial order and puts new posts at the top.
  for (const p of [...posts].reverse()) {
    if (await prisma.blog.findUnique({ where: { slug: p.slug } })) continue;
    count.posts += 1;
    if (dryRun) continue;

    const categorySlug = slugOf(p.category);
    const existing = await prisma.blogCategory.findUnique({ where: { name: p.category } });
    if (!existing) count.categories += 1;
    const category =
      existing ?? (await prisma.blogCategory.create({ data: { name: p.category, slug: categorySlug } }));

    await prisma.blog.create({
      data: {
        slug: p.slug,
        blogTitle: p.title,
        description: p.excerpt,
        content: articleText(p.body),
        imageUrl: p.image,
        author: p.author,
        authorRole: p.authorRole,
        authorImage: p.authorImage ?? null,
        readTime: p.readTime,
        isFeatured: Boolean(p.featured),
        categoryId: category.id,
        createdAt: new Date(`${p.datePublished}T00:00:00Z`),
        updatedOn: p.dateModified ? new Date(`${p.dateModified}T00:00:00Z`) : null,
      },
    });
  }
}

async function seedTestimonials() {
  for (const t of testimonials) {
    if (await prisma.testimonial.findUnique({ where: { slug: t.id } })) continue;
    count.testimonials += 1;
    if (dryRun) continue;
    await prisma.testimonial.create({
      data: {
        slug: t.id,
        message: t.quote,
        reviewerName: t.name,
        profession: t.detail,
        imageUrl: t.image,
        platform: t.platform ?? null,
        rating: t.rating ?? null,
        title: t.title ?? null,
        reviewDate: t.date ?? null,
      },
    });
  }
}

async function seedGallery() {
  // Reversed because the slideshow runs newest first, which keeps the original
  // order and puts later uploads at the front.
  for (const slide of [...gallerySlides].reverse()) {
    const existing = await prisma.gallery.findFirst({
      where: { imageUrl: slide.src, tourId: null },
    });
    if (existing) continue;
    count.gallery += 1;
    if (dryRun) continue;
    await prisma.gallery.create({
      data: { imageUrl: slide.src, location: slide.location, caption: slide.description },
    });
  }
}

async function main() {
  await seedDestinations();
  await seedTours();
  await seedPosts();
  await seedTestimonials();
  await seedGallery();
  console.log(dryRun ? "Would create:" : "Created:", count);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
