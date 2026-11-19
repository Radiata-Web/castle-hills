import { formatRange, formatUsd, type EstimateRequestNormalized } from "@/lib/ballpark";
import type { BallparkComputation } from "@/server/ballpark/compute.server";

export const __CH_SERVER_ONLY__ = "ch-ballpark-server-only";

/**
 * Build internal email detail lines (includes line subtotals — never send to the client).
 */
export function buildLeadDetails(
  request: EstimateRequestNormalized,
  computation: BallparkComputation,
): string[] {
  const lines: string[] = [`Lead ID: ${request.leadId}`, `ZIP: ${request.contact.zip}`];

  if (request.contact.notes?.trim()) {
    lines.push(`Notes: ${request.contact.notes.trim()}`);
  }

  lines.push("Services:");
  for (const item of computation.lineItems) {
    lines.push(`  - ${item.label}: ${item.detail} → ${formatUsd(item.amount)}`);
  }

  lines.push(`Subtotal (internal): ${formatUsd(computation.subtotal)}`);
  lines.push(`Customer range: ${formatRange(computation.range.low, computation.range.high)}`);

  if (computation.minimumApplied) {
    lines.push("Note: project minimum applied to range.");
  }

  if (computation.notices.length > 0) {
    lines.push(`Notices: ${computation.notices.map((n) => n.code).join(", ")}`);
  }

  return lines;
}

export function buildLeadSubjectSuffix(computation: BallparkComputation): string {
  return formatRange(computation.range.low, computation.range.high);
}
