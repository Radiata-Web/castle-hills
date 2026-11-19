import { describe, expect, it } from "vite-plus/test";
import type { ProjectAnswers } from "@/lib/ballpark";
import { computeBallpark } from "@/server/ballpark/compute.server";
import type { PricingConfig } from "@/server/ballpark/pricing-config.server";

/** Fake rates only — never real customer pricing. */
const fakeConfig: PricingConfig = {
  version: 1,
  fencePerSqft: 1,
  deckPerSqft: 2,
  pergolaPerSqft: 3,
  garageSingleEach: 100,
  garageDoubleEach: 200,
  frontDoorOneSideEach: 50,
  frontDoorBothSidesEach: 80,
  shutterFirstFloorPair: 10,
  shutterSecondFloorPair: 20,
  projectMinimum: 1000,
  bundleDiscountPercent: 10,
  rangeLowFactor: 0.9,
  rangeHighFactor: 1.1,
  roundTo: 100,
};

function project(partial: ProjectAnswers): ProjectAnswers {
  return partial;
}

describe("computeBallpark", () => {
  it("prices fence as length × height × rate", () => {
    const result = computeBallpark(
      project({
        services: ["fence"],
        fence: { linearFeet: 100, height: "6" },
      }),
      fakeConfig,
    );
    expect(result.subtotal).toBe(600);
    expect(result.lineItems[0]?.detail).toContain("100 ft × 6 ft");
  });

  it("uses 8 ft fence height", () => {
    const result = computeBallpark(
      project({
        services: ["fence"],
        fence: { linearFeet: 50, height: "8" },
      }),
      fakeConfig,
    );
    expect(result.subtotal).toBe(400);
  });

  it("prices each service formula", () => {
    const result = computeBallpark(
      project({
        services: ["deck", "pergola", "garage", "front_door", "shutters"],
        deck: { sqft: 100 },
        pergola: { sqft: 40 },
        garage: { single: 1, double: 1 },
        frontDoor: { count: 2, sides: "both" },
        shutters: { firstFloorPairs: 2, secondFloorPairs: 1 },
      }),
      fakeConfig,
    );
    // deck 200 + pergola 120 + garage 300 + doors 160 + shutters 40 = 820
    expect(result.subtotal).toBe(820);
  });

  it("rounds low down and high up", () => {
    const result = computeBallpark(
      project({
        services: ["deck"],
        deck: { sqft: 550 }, // subtotal 1100
      }),
      fakeConfig,
    );
    // 1100 * 0.9 = 990 → floor to 900; 1100 * 1.1 = 1210 → ceil to 1300
    expect(result.range.low).toBe(900);
    expect(result.range.high).toBe(1300);
  });

  it("clamps to project minimum and suggests an unselected service", () => {
    const result = computeBallpark(
      project({
        services: ["shutters"],
        shutters: { firstFloorPairs: 1, secondFloorPairs: 0 },
      }),
      fakeConfig,
    );
    expect(result.subtotal).toBe(10);
    expect(result.range.low).toBe(1000);
    expect(result.range.high).toBe(1000);
    expect(result.minimumApplied).toBe(true);
    const minNotice = result.notices.find((n) => n.code === "project_minimum");
    expect(minNotice?.suggestedService).toBe("fence");
  });

  it("always includes bundle_discount with single-service wording", () => {
    const result = computeBallpark(
      project({
        services: ["deck"],
        deck: { sqft: 1000 },
      }),
      fakeConfig,
    );
    expect(result.notices[0]?.code).toBe("bundle_discount");
    expect(result.notices[0]?.message).toContain("Did you know we offer bundle discounts?");
    expect(result.notices[0]?.message).toContain("Save 10%");
    expect(result.notices[0]?.message).toContain("call and mention it to qualify");
  });

  it("uses multi-service bundle wording when two or more services are selected", () => {
    const result = computeBallpark(
      project({
        services: ["deck", "fence"],
        deck: { sqft: 100 },
        fence: { linearFeet: 50, height: "6" },
      }),
      fakeConfig,
    );
    expect(result.notices[0]?.message).toContain("Did you know we offer bundle discounts?");
    expect(result.notices[0]?.message).toContain("10% bundling discount");
    expect(result.notices[0]?.message).toContain("Call and mention");
    expect(result.notices[0]?.message).toContain("to qualify");
  });

  it("displays fractional bundleDiscountPercent as a whole percent", () => {
    const result = computeBallpark(
      project({
        services: ["deck"],
        deck: { sqft: 1000 },
      }),
      { ...fakeConfig, bundleDiscountPercent: 0.1 },
    );
    expect(result.notices[0]?.message).toContain("Save 10%");
    expect(result.notices[0]?.message).not.toContain("0.1%");
  });
});
