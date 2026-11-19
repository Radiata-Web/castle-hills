import type { EstimateNotice, ProjectAnswers, ServiceId } from "@/lib/ballpark";
import {
  buildBundleNotice,
  buildProjectMinimumNotice,
  pickSuggestedService,
} from "@/server/ballpark/notices.server";
import type { PricingConfig } from "@/server/ballpark/pricing-config.server";

export const __CH_SERVER_ONLY__ = "ch-ballpark-server-only";

export type BallparkLineItem = {
  service: ServiceId;
  label: string;
  amount: number;
  /** Extra context for the lead email (inputs, placeholder flag). */
  detail: string;
};

export type BallparkComputation = {
  lineItems: BallparkLineItem[];
  subtotal: number;
  range: { low: number; high: number; currency: "USD" };
  notices: EstimateNotice[];
  /** True when the range was raised to the project minimum. */
  minimumApplied: boolean;
};

function roundRange(subtotal: number, cfg: PricingConfig): { low: number; high: number } {
  const step = cfg.roundTo;
  const low = Math.floor((subtotal * cfg.rangeLowFactor) / step) * step;
  const high = Math.ceil((subtotal * cfg.rangeHighFactor) / step) * step;
  return { low, high };
}

/**
 * Pure ballpark pricing. Never import from client code.
 */
export function computeBallpark(project: ProjectAnswers, cfg: PricingConfig): BallparkComputation {
  const lineItems: BallparkLineItem[] = [];
  const selected = project.services;

  if (selected.includes("fence") && project.fence) {
    const { linearFeet, height } = project.fence;
    const area = linearFeet * Number(height);
    const amount = area * cfg.fencePerSqft;
    lineItems.push({
      service: "fence",
      label: "Fence staining",
      amount,
      detail: `${linearFeet} ft × ${height} ft = ${area} sq ft`,
    });
  }

  if (selected.includes("deck") && project.deck) {
    const { sqft } = project.deck;
    lineItems.push({
      service: "deck",
      label: "Deck staining",
      amount: sqft * cfg.deckPerSqft,
      detail: `${sqft} sq ft`,
    });
  }

  if (selected.includes("pergola") && project.pergola) {
    const { sqft } = project.pergola;
    lineItems.push({
      service: "pergola",
      label: "Patio cover or pergola",
      amount: sqft * cfg.pergolaPerSqft,
      detail: `${sqft} sq ft`,
    });
  }

  if (selected.includes("garage") && project.garage) {
    const { single, double } = project.garage;
    const amount = single * cfg.garageSingleEach + double * cfg.garageDoubleEach;
    lineItems.push({
      service: "garage",
      label: "Garage doors",
      amount,
      detail: `${single} single, ${double} double`,
    });
  }

  if (selected.includes("front_door") && project.frontDoor) {
    const { count, sides } = project.frontDoor;
    const unit = sides === "both" ? cfg.frontDoorBothSidesEach : cfg.frontDoorOneSideEach;
    lineItems.push({
      service: "front_door",
      label: "Front door",
      amount: count * unit,
      detail: `${count} door(s), ${sides === "both" ? "both sides" : "outside only"}`,
    });
  }

  if (selected.includes("shutters") && project.shutters) {
    const { firstFloorPairs, secondFloorPairs } = project.shutters;
    const amount =
      firstFloorPairs * cfg.shutterFirstFloorPair + secondFloorPairs * cfg.shutterSecondFloorPair;
    lineItems.push({
      service: "shutters",
      label: "Shutters",
      amount,
      detail: `${firstFloorPairs} first-floor pairs, ${secondFloorPairs} second-floor pairs`,
    });
  }

  const subtotal = lineItems.reduce((sum, line) => sum + line.amount, 0);
  let { low, high } = roundRange(subtotal, cfg);
  let minimumApplied = false;

  const notices: EstimateNotice[] = [];
  notices.push(buildBundleNotice(selected.length, cfg));

  if (subtotal < cfg.projectMinimum) {
    low = Math.max(low, cfg.projectMinimum);
    high = Math.max(high, cfg.projectMinimum);
    minimumApplied = true;
    const suggested = pickSuggestedService(selected);
    notices.push(buildProjectMinimumNotice(cfg, suggested));
  }

  return {
    lineItems,
    subtotal,
    range: { low, high, currency: "USD" },
    notices,
    minimumApplied,
  };
}
