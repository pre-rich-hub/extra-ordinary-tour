import { parseJsonArray } from "./parsers.js";

function decimalToNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (
    typeof value === "object" &&
    "toNumber" in value &&
    typeof value.toNumber === "function"
  ) {
    return value.toNumber();
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function mapCategory(category: any) {
  return {
    id: category.id,
    name: category.categoryName,
    slug: category.slug ?? null,
    createdAt: category.createdAt ?? null,
    tourCount: category._count?.tours ?? undefined,
  };
}

export function mapDestination(destination: any) {
  return {
    id: destination.id,
    name: destination.destinationName,
    description: destination.description,
    imageUrl: destination.imageUrl,
    region: destination.region ?? null,
    tag: destination.tag ?? null,
    teaser: destination.teaser ?? null,
    intro: destination.intro ?? null,
    bestTime: destination.bestTime ?? null,
    duration: destination.duration ?? null,
    altitude: destination.altitude ?? null,
    highlights: parseJsonArray(destination.highlights),
    tourCount:
      destination._count?.tourLinks ?? destination._count?.tours ?? undefined,
    canonical: {
      type: "slug",
      id: destination.id,
      suggestedPath: `/destinations/${destination.slug ?? destination.id}`,
      slug: destination.slug ?? null,
    },
  };
}

export function mapGalleryImage(image: any) {
  return {
    id: image.id,
    imageUrl: image.imageUrl,
    tourId: image.tourId ?? null,
    location: image.location ?? null,
    caption: image.caption ?? null,
  };
}

export function mapTour(tour: any, detail = false) {
  const gallery = Array.isArray(tour.gallery) ? tour.gallery.map(mapGalleryImage) : [];
  const itinerary = parseJsonArray(tour.itinerary);
  const categories = Array.isArray(tour.categories)
    ? tour.categories.map((item: any) => mapCategory(item.category))
    : [];
  const destinationRecords = [
    ...(tour.destination ? [tour.destination] : []),
    ...(Array.isArray(tour.destinations)
      ? tour.destinations.map((item: any) => item.destination).filter(Boolean)
      : []),
  ];
  const destinations = destinationRecords
    .filter(
      (destination, index, all) =>
        all.findIndex((item) => item.id === destination.id) === index,
    )
    .map(mapDestination);

  return {
    id: tour.id,
    name: tour.tourName,
    description: tour.overview,
    overview: tour.overview,
    adultPrice: decimalToNumber(tour.adultPrice),
    childPrice: decimalToNumber(tour.childPrice),
    discount: tour.discount,
    rating: decimalToNumber(tour.rating),
    noOfRates: tour.noOfRates,
    isFeatured: Boolean(tour.isFeatured),
    mainImage: gallery[0]?.imageUrl ?? null,
    destination: destinations[0] ?? null,
    destinations,
    categories,
    gallery,
    durationDays: itinerary.length,
    days: tour.days ?? null,
    nights: tour.nights ?? null,
    style: tour.style ?? null,
    season: tour.season ?? null,
    group: tour.groupSize ?? null,
    teaser: tour.teaser ?? null,
    highlights: parseJsonArray(tour.highlights),
    places: parseJsonArray(tour.places),
    included: detail ? parseJsonArray(tour.included) : undefined,
    excluded: detail ? parseJsonArray(tour.excluded) : undefined,
    itinerary: detail ? itinerary : undefined,
    journeyMap: detail ? tour.journeyMap : undefined,
    createdAt: tour.createdAt ?? null,
    updatedAt: tour.updatedAt ?? null,
    canonical: {
      type: "slug",
      id: tour.id,
      suggestedPath: `/tours/${tour.slug ?? tour.id}`,
      slug: tour.slug ?? null,
    },
  };
}

export function mapBlog(post: any) {
  const category = post.category
    ? { id: post.category.id, name: post.category.name, slug: post.category.slug }
    : null;

  return {
    id: post.id,
    slug: post.slug ?? null,
    title: post.blogTitle,
    description: post.description,
    content: post.content ?? null,
    imageUrl: post.imageUrl,
    author: post.author ?? null,
    authorRole: post.authorRole ?? null,
    authorImage: post.authorImage ?? null,
    readTime: post.readTime ?? null,
    isFeatured: Boolean(post.isFeatured),
    category,
    createdAt: post.createdAt ?? null,
    updatedOn: post.updatedOn ?? null,
    canonical: {
      type: "slug",
      id: post.id,
      suggestedPath: `/blog/${post.slug ?? post.id}`,
      slug: post.slug ?? null,
    },
  };
}

export function mapTestimonial(testimonial: any) {
  return {
    id: testimonial.id,
    message: testimonial.message,
    reviewerName: testimonial.reviewerName,
    profession: testimonial.profession,
    slug: testimonial.slug ?? null,
    imageUrl: testimonial.imageUrl ?? null,
    platform: testimonial.platform ?? null,
    rating: testimonial.rating ?? null,
    title: testimonial.title ?? null,
    reviewDate: testimonial.reviewDate ?? null,
  };
}

export function mapLayoverPackage(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    hours: row.hours,
    title: row.title,
    price: row.price,
    image: row.imageUrl ?? null,
    teaser: row.teaser,
    itinerary: parseJsonArray(row.itinerary),
    includes: parseJsonArray(row.includes),
    best: row.bestFor,
    sortOrder: row.sortOrder,
  };
}

export function mapBooking(booking: any) {
  return {
    id: booking.id,
    tourId: booking.tourId,
    tour: booking.tour ? { id: booking.tour.id, name: booking.tour.tourName } : null,
    fullName: booking.fullName,
    email: booking.email,
    phone: booking.phone,
    country: booking.country,
    chosenDate: booking.chosenDate,
    adults: booking.adults,
    children: booking.children,
    status: booking.status ?? "Pending",
    createdAt: booking.createdAt ?? null,
  };
}

export function mapContact(contact: any) {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    createdAt: contact.createdAt ?? null,
  };
}
