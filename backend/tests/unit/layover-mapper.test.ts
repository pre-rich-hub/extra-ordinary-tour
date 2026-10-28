import { describe, expect, it } from "vitest";
import { mapLayoverPackage } from "../../src/utils/mappers.js";

describe("mapLayoverPackage", () => {
  it("maps the database row to the public layover contract", () => {
    const mapped = mapLayoverPackage({
      id: 4,
      slug: "6-hour",
      hours: "6 Hours",
      title: "Addis Ababa Highlights Tour",
      price: "$60 per person",
      imageUrl: "/api/v1/media/abc",
      teaser: "Entoto, a cathedral and coffee.",
      itinerary: JSON.stringify(["Meet at arrivals", "Drive to Entoto"]),
      includes: JSON.stringify(["Vehicle", "Guide"]),
      bestFor: "Connections of 8 hours or more",
      sortOrder: 2,
    });

    expect(mapped).toEqual({
      id: 4,
      slug: "6-hour",
      hours: "6 Hours",
      title: "Addis Ababa Highlights Tour",
      price: "$60 per person",
      image: "/api/v1/media/abc",
      teaser: "Entoto, a cathedral and coffee.",
      itinerary: ["Meet at arrivals", "Drive to Entoto"],
      includes: ["Vehicle", "Guide"],
      best: "Connections of 8 hours or more",
      sortOrder: 2,
    });
  });

  it("uses image (not imageUrl) and null for a missing image", () => {
    const mapped = mapLayoverPackage({
      id: 1,
      slug: "12-hour",
      hours: "12 Hours",
      title: "Full day",
      price: "$100",
      imageUrl: null,
      teaser: "Teaser",
      itinerary: null,
      includes: null,
      bestFor: "Long connections",
      sortOrder: 0,
    });

    expect(mapped.image).toBeNull();
    expect(mapped).not.toHaveProperty("imageUrl");
    expect(mapped.itinerary).toEqual([]);
    expect(mapped.includes).toEqual([]);
  });

  it("returns empty arrays for malformed JSON", () => {
    const mapped = mapLayoverPackage({
      id: 1,
      slug: "24-hour",
      hours: "24 Hours",
      title: "Overnight",
      price: "$350",
      imageUrl: null,
      teaser: "Teaser",
      itinerary: "not json",
      includes: "{}",
      bestFor: "Overnight",
      sortOrder: 1,
    });

    expect(mapped.itinerary).toEqual([]);
    expect(mapped.includes).toEqual([]);
  });
});
