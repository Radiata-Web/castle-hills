/**
 * Cloudflare Pages Functions–shaped stub for POST /api/v1/estimate.
 *
 * Lives under `cloudflare/functions/` (not repo-root `functions/`) so Netlify
 * does not treat it as a Netlify Function while we still deploy there.
 *
 * Phase B: mount the shared handler from a Workers + Hono entry instead
 * (see docs/cloudflare-pages-migration-plan.md).
 *
 * This file intentionally inlines a minimal dispatch so it stays reviewable
 * without a CF bundler in the Netlify build.
 */

import { handleEstimateRequest, type EstimateRequestBody } from "../../../../src/server/estimate";

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesContext): Promise<Response> {
  let body: EstimateRequestBody;
  try {
    body = (await context.request.json()) as EstimateRequestBody;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const ip =
    context.request.headers.get("CF-Connecting-IP") ??
    context.request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    undefined;

  const result = await handleEstimateRequest(body, context.env, { remoteip: ip });
  return Response.json(result.body, { status: result.status });
}

/** Reject non-POST loudly for reviewers hitting the stub in a browser. */
export async function onRequest(context: PagesContext): Promise<Response> {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return Response.json(
    { error: "method_not_allowed", hint: "POST /api/v1/estimate with Turnstile token" },
    { status: 405 },
  );
}
