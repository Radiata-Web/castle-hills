import { verifyTurnstileToken } from "@/lib/turnstile";

/**
 * Enforce Turnstile when TURNSTILE_SECRET_KEY is set.
 * Preview/dev without a secret: log and allow (so lead-email can be tested).
 */
export async function gateTurnstile(
  token: string | undefined | null,
  secret: string | undefined,
  options: { remoteip?: string; fetchImpl?: typeof fetch } = {},
): Promise<{ ok: true } | { ok: false; status: 403; body: Record<string, unknown> }> {
  const trimmed = secret?.trim() ?? "";
  if (!trimmed) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY unset — skipping challenge (preview/dev)");
    return { ok: true };
  }

  const challenge = await verifyTurnstileToken(token, {
    secret: trimmed,
    remoteip: options.remoteip,
    fetchImpl: options.fetchImpl,
  });

  if (!challenge.ok) {
    console.info("[turnstile] challenge_failed", challenge.errorCodes);
    return {
      ok: false,
      status: 403,
      body: { error: "challenge_failed", codes: challenge.errorCodes },
    };
  }
  return { ok: true };
}
