import { BALLPARK_DISCLAIMER, type EstimateSuccess } from "@/lib/ballpark";
import type { BallparkComputation } from "@/server/ballpark/compute.server";

/**
 * Whitelist the customer-facing response. Never leak rates, line items,
 * subtotals, or whether the minimum clamp was applied (beyond the notice).
 */
export function toPublicResult(
  estimateId: string,
  computation: BallparkComputation,
): EstimateSuccess {
  return {
    status: "ok",
    estimateId,
    range: {
      low: computation.range.low,
      high: computation.range.high,
      currency: "USD",
    },
    notices: computation.notices.map((notice) => ({
      code: notice.code,
      message: notice.message,
      ...(notice.suggestedService ? { suggestedService: notice.suggestedService } : {}),
    })),
    disclaimer: BALLPARK_DISCLAIMER,
  };
}
