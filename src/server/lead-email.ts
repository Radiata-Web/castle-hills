/**
 * Lean lead notification via Cloudflare Email Service:
 * Worker `send_email` binding → Verified Destination Address (free on Workers Free).
 *
 * No Resend / third-party SMTP. Preview without a binding or with a placeholder
 * `LEAD_TO_EMAIL` → log + skip (dry-run).
 */

export type LeadPayload = {
  source: "ballpark-estimate" | "contact";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** Opaque answers — pricing keys TBD; do not invent required fields. */
  answers?: Record<string, unknown>;
};

export type LeadEmailResult =
  | { ok: true; messageId?: string }
  | { ok: false; reason: string; dryRun?: boolean };

/** Minimal shape of the Cloudflare `send_email` binding (structured send API). */
export type SendEmailBinding = {
  send(message: {
    to: string;
    from: string;
    subject: string;
    text?: string;
    replyTo?: string;
  }): Promise<{ messageId: string }>;
};

export type LeadEmailEnv = {
  /** Wrangler `send_email` binding name LEAD_EMAIL */
  LEAD_EMAIL?: SendEmailBinding;
  /** Must be a Verified Destination Address in the CF account when sending. */
  LEAD_TO_EMAIL?: string;
  /** From address on the Email Routing / Email Service onboarded domain. */
  LEAD_FROM_EMAIL?: string;
};

/** Preview / unset destinations — never attempt a real send. */
function isDryRunDestination(to: string | undefined): boolean {
  if (!to?.trim()) return true;
  const normalized = to.trim().toLowerCase();
  if (normalized.endsWith(".invalid")) return true;
  if (normalized.startsWith("preview-leads-disabled@")) return true;
  if (normalized === "replace_me" || normalized.includes("<replace")) return true;
  return false;
}

/**
 * Deliver a lead to the company inbox via CF `send_email` → verified destination.
 */
export async function sendLeadEmail(
  lead: LeadPayload,
  env: LeadEmailEnv,
): Promise<LeadEmailResult> {
  const to = env.LEAD_TO_EMAIL?.trim();
  const binding = env.LEAD_EMAIL;

  if (!binding?.send) {
    console.info("[lead-email] dry-run skip — LEAD_EMAIL binding missing", {
      source: lead.source,
      name: lead.name,
      email: lead.email,
    });
    return { ok: false, reason: "send_email_binding_missing", dryRun: true };
  }

  if (isDryRunDestination(to)) {
    console.info("[lead-email] dry-run skip", {
      source: lead.source,
      name: lead.name,
      email: lead.email,
      reason: to ? "preview_placeholder_to" : "LEAD_TO_EMAIL unset",
    });
    return { ok: false, reason: "dry_run_skip", dryRun: true };
  }

  const from = env.LEAD_FROM_EMAIL?.trim() || "noreply@chstainandrestoration.com";
  const subject = `[${lead.source}] Lead — ${lead.name}`;
  const text = [
    `Source: ${lead.source}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    lead.answers ? `Answers JSON: ${JSON.stringify(lead.answers)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await binding.send({
      to: to!,
      from,
      subject,
      text,
      replyTo: lead.email,
    });
    return { ok: true, messageId: result.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "send_failed";
    console.error("[lead-email] send_email failed", message);
    return { ok: false, reason: message };
  }
}
