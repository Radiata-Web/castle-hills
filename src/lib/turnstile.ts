/**
 * Cloudflare Turnstile server-side verification.
 * Call before any mutating lead / ballpark handler work; drop failures.
 */

export type TurnstileVerifyResult =
  | { ok: true; hostname?: string }
  | { ok: false; errorCodes: string[] };

type SiteverifyResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

/**
 * Verify a Turnstile response token with Cloudflare siteverify.
 * Pass the request IP when available (CF-Connecting-IP / X-Forwarded-For).
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  options: {
    secret: string;
    remoteip?: string;
    fetchImpl?: typeof fetch;
  },
): Promise<TurnstileVerifyResult> {
  if (!token?.trim()) {
    return { ok: false, errorCodes: ["missing-input-response"] };
  }
  if (!options.secret) {
    return { ok: false, errorCodes: ["missing-input-secret"] };
  }

  const body = new URLSearchParams();
  body.set("secret", options.secret);
  body.set("response", token);
  if (options.remoteip) body.set("remoteip", options.remoteip);

  const fetchImpl = options.fetchImpl ?? fetch;
  const res = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    return { ok: false, errorCodes: [`siteverify-http-${res.status}`] };
  }

  const data = (await res.json()) as SiteverifyResponse;
  if (!data.success) {
    return { ok: false, errorCodes: data["error-codes"] ?? ["challenge_failed"] };
  }
  return { ok: true, hostname: data.hostname };
}
