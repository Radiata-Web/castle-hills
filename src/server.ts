/**
 * Cloudflare Workers entry for `cf-preview`.
 * Hono handles `/api/v1/*`; everything else falls through to TanStack Start SSR.
 */
import handler from "@tanstack/react-start/server-entry";
import { Hono } from "hono";
import { handleEstimateRequest, type EstimateRequestBody } from "@/server/estimate";

type WorkerEnv = {
  TURNSTILE_SECRET_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
};

const api = new Hono<{ Bindings: WorkerEnv }>();

api.post("/api/v1/estimate", async (c) => {
  let body: EstimateRequestBody;
  try {
    body = (await c.req.json()) as EstimateRequestBody;
  } catch {
    return c.json({ error: "invalid_json" }, 400);
  }

  const ip =
    c.req.header("CF-Connecting-IP") ??
    c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ??
    undefined;

  const result = await handleEstimateRequest(body, c.env, { remoteip: ip });
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
});

api.all("/api/v1/estimate", (c) =>
  c.json(
    { error: "method_not_allowed", hint: "POST /api/v1/estimate with Turnstile token" },
    405,
  ),
);

api.notFound((c) => c.json({ error: "not_found" }, 404));

export default {
  async fetch(
    request: Request,
    env: WorkerEnv,
    ctx: { waitUntil(promise: Promise<unknown>): void; passThroughOnException(): void },
  ): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return api.fetch(request, env, ctx);
    }
    return handler.fetch(request, env, ctx);
  },
};
