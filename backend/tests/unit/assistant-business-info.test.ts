import { describe, it, expect } from "vitest";
import { BUSINESS_INFO, NO_INVENTED_FACTS } from "../../src/modules/assistant/business-info.js";
import { CatalogContextBuilder } from "../../src/modules/assistant/context-builder.js";

// The catalog only ever held catalog rows, so operating questions visitors ask
// were unanswerable by construction and every reply collapsed into the same
// contact-form deflection. These pin the two things that fix that: an operating
// information block next to the catalog, and rules that still decline rather
// than invent.
describe("business info grounding", () => {
  it("carries an editable operating-information block", () => {
    // Left as a placeholder so a new project is forced to fill in real terms
    // rather than ship invented ones.
    expect(BUSINESS_INFO).toMatch(/How to book/);
    expect(BUSINESS_INFO).toMatch(/Cancellations/);
    expect(BUSINESS_INFO).toMatch(/Reaching us/);
    expect(BUSINESS_INFO).toContain("<replace");
  });

  it("still forbids inventing products, prices and policies", () => {
    expect(NO_INVENTED_FACTS).toMatch(/Never invent a product, a price, a policy/);
  });

  it("tells the model when it may use general knowledge", () => {
    expect(NO_INVENTED_FACTS).toMatch(/general guidance/);
    expect(NO_INVENTED_FACTS).toMatch(/general advice rather than catalog detail/);
  });

  it("keeps a decline path for questions nothing covers", () => {
    expect(NO_INVENTED_FACTS).toMatch(
      /Only when neither the catalog nor the business information/,
    );
  });

  it("does not let the model confirm a booking on its own", () => {
    expect(NO_INVENTED_FACTS).toMatch(/Never confirm bookings/);
  });
});

describe("catalog context with nothing seeded", () => {
  it("reports empty rather than throwing, so an empty database still serves", async () => {
    // A storefront with no seeded data is the normal state on day one, so the
    // builder has to produce a usable prompt rather than fall over.
    const empty = {
      tour: { findMany: async () => [] },
      destination: { findMany: async () => [] },
      blog: { findMany: async () => [] },
    };
    const context = await new CatalogContextBuilder(empty as never).build();
    const text = context.sections.join("\n");

    expect(text).toContain("## Tour packages");
    expect(text).toContain("## Destinations");
    expect(text).toContain("## Travel journal");
    expect(context.truncated).toBe(false);
    expect(context.tokenEstimate).toBeGreaterThan(0);
  });

  it("renders a tour's array fields as labelled lines rather than raw JSON", async () => {
    // Raw JSON burns context on punctuation and reads badly in the prompt.
    const one = {
      tour: {
        findMany: async () => [
          {
            tourName: "Sample Trek",
            overview: "Five days on the rim.",
            included: JSON.stringify(["Guide", "Lunch"]),
            excluded: "[]",
            itinerary: "[]",
          },
        ],
      },
      destination: { findMany: async () => [] },
      blog: { findMany: async () => [] },
    };
    const context = await new CatalogContextBuilder(one as never).build();
    const text = context.sections.join("\n");

    expect(text).toContain("tourName: Sample Trek");
    expect(text).toContain("- Guide");
    expect(text).toContain("- Lunch");
    expect(text).not.toContain('"Guide"');
  });
});
