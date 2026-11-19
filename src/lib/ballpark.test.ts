import { describe, expect, it } from "vite-plus/test";
import { contactSchema, estimateRequestSchema, projectSchema } from "@/lib/ballpark";

const baseContact = {
  name: "Jordan Example",
  email: "jordan@example.com",
  phone: "(214) 555-0123",
  zip: "75001",
};

const leadId = "550e8400-e29b-41d4-a716-446655440000";

describe("projectSchema", () => {
  it("accepts fence at min and max linear feet", () => {
    expect(
      projectSchema.safeParse({
        services: ["fence"],
        fence: { linearFeet: 10, height: "6" },
      }).success,
    ).toBe(true);
    expect(
      projectSchema.safeParse({
        services: ["fence"],
        fence: { linearFeet: 5000, height: "8" },
      }).success,
    ).toBe(true);
  });

  it("rejects fence linear feet outside limits", () => {
    expect(
      projectSchema.safeParse({
        services: ["fence"],
        fence: { linearFeet: 9, height: "6" },
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        services: ["fence"],
        fence: { linearFeet: 5001, height: "6" },
      }).success,
    ).toBe(false);
  });

  it("rejects non-integers", () => {
    expect(
      projectSchema.safeParse({
        services: ["deck"],
        deck: { sqft: 20.5 },
      }).success,
    ).toBe(false);
  });

  it("requires a block for each selected service", () => {
    const result = projectSchema.safeParse({ services: ["fence"] });
    expect(result.success).toBe(false);
  });

  it("rejects blocks for unselected services", () => {
    const result = projectSchema.safeParse({
      services: ["deck"],
      deck: { sqft: 100 },
      fence: { linearFeet: 100, height: "6" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown keys", () => {
    const result = projectSchema.safeParse({
      services: ["deck"],
      deck: { sqft: 100 },
      surprise: true,
    });
    expect(result.success).toBe(false);
  });

  it("requires at least one garage door", () => {
    const result = projectSchema.safeParse({
      services: ["garage"],
      garage: { single: 0, double: 0 },
    });
    expect(result.success).toBe(false);
  });

  it("requires at least one shutter pair", () => {
    const result = projectSchema.safeParse({
      services: ["shutters"],
      shutters: { firstFloorPairs: 0, secondFloorPairs: 0 },
    });
    expect(result.success).toBe(false);
  });

  it("accepts more than two entry doors", () => {
    const result = projectSchema.safeParse({
      services: ["front_door"],
      frontDoor: { count: 4, sides: "one" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects entry door counts outside limits", () => {
    expect(
      projectSchema.safeParse({
        services: ["front_door"],
        frontDoor: { count: 0, sides: "both" },
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        services: ["front_door"],
        frontDoor: { count: 11, sides: "both" },
      }).success,
    ).toBe(false);
  });
});

describe("contactSchema", () => {
  it("normalises US phones to E.164", () => {
    const result = contactSchema.safeParse(baseContact);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("+12145550123");
    }
  });

  it("rejects invalid ZIP codes", () => {
    expect(contactSchema.safeParse({ ...baseContact, zip: "7500" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...baseContact, zip: "7500a" }).success).toBe(false);
  });
});

describe("estimateRequestSchema", () => {
  it("accepts a full valid request", () => {
    const result = estimateRequestSchema.safeParse({
      turnstileToken: "token",
      leadId,
      contact: baseContact,
      project: {
        services: ["fence"],
        fence: { linearFeet: 120, height: "6" },
      },
    });
    expect(result.success).toBe(true);
  });
});
