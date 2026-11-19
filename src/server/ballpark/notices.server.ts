import { formatUsd, type EstimateNotice, type ServiceId } from "@/lib/ballpark";
import { PHONE_DISPLAY } from "@/lib/site";
import type { PricingConfig } from "@/server/ballpark/pricing-config.server";

export const __CH_SERVER_ONLY__ = "ch-ballpark-server-only";

const UPSSELL_ORDER: ServiceId[] = ["fence", "deck", "shutters", "pergola"];

const UPSSELL_PHRASE: Partial<Record<ServiceId, string>> = {
  fence: "fence restained",
  deck: "deck restained",
  shutters: "shutters refinished",
  pergola: "pergola restained",
};

export function pickSuggestedService(selected: ServiceId[]): ServiceId | undefined {
  const set = new Set(selected);
  return UPSSELL_ORDER.find((id) => !set.has(id));
}

/**
 * Config may store a whole percent (10) or a fraction (0.1). Display as a
 * meaningful percent string without a trailing "%" (callers append it).
 */
export function formatBundleDiscountPercent(value: number): string {
  const pct = value > 0 && value < 1 ? value * 100 : value;
  return String(Number(pct.toFixed(2)));
}

export function buildBundleNotice(serviceCount: number, cfg: PricingConfig): EstimateNotice {
  const pct = formatBundleDiscountPercent(cfg.bundleDiscountPercent);
  if (serviceCount <= 1) {
    return {
      code: "bundle_discount",
      message: `Did you know we offer bundle discounts? Save ${pct}% when you bundle more than one service—call and mention it to qualify.`,
    };
  }
  return {
    code: "bundle_discount",
    message: `Did you know we offer bundle discounts? Call and mention our ${pct}% bundling discount to qualify.`,
  };
}

export function buildProjectMinimumNotice(
  cfg: PricingConfig,
  suggestedService: ServiceId | undefined,
): EstimateNotice {
  const min = formatUsd(cfg.projectMinimum);
  if (!suggestedService) {
    return {
      code: "project_minimum",
      message: `We have a ${min} project minimum. Call us and we'll help you round out the project.`,
    };
  }
  const phrase = UPSSELL_PHRASE[suggestedService] ?? "project expanded";
  return {
    code: "project_minimum",
    message: `We have a ${min} project minimum—have you thought about having your ${phrase}?`,
    suggestedService,
  };
}
