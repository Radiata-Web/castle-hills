import { beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { handleEstimateRequest } from "@/server/estimate";
import { __resetPricingConfigCacheForTests } from "@/server/ballpark/pricing-config.server";

const leadId = "550e8400-e29b-41d4-a716-446655440000";

const fakePricing = {
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

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    turnstileToken: "ok-token",
    leadId,
    contact: {
      name: "Jordan Example",
      email: "jordan@example.com",
      phone: "(214) 555-0123",
      zip: "75001",
    },
    project: {
      services: ["fence"],
      fence: { linearFeet: 200, height: "6" },
    },
    ...overrides,
  };
}

function fakeFetchOk(): typeof fetch {
  return (async () =>
    new Response(
      JSON.stringify({
        success: true,
        action: "ballpark-estimate",
        hostname: "localhost",
      }),
      { status: 200 },
    )) as typeof fetch;
}

function baseEnv(overrides: Record<string, unknown> = {}) {
  return {
    TURNSTILE_SECRET: "test-secret",
    TURNSTILE_HOSTNAMES: "localhost",
    BALLPARK_PRICING_JSON: JSON.stringify(fakePricing),
    LEAD_EMAIL: {
      send: vi.fn(async () => ({ messageId: "msg-1" })),
    },
    LEAD_TO_EMAIL: "leads@example.com",
    LEAD_FROM_EMAIL: "noreply@example.com",
    ...overrides,
  };
}

beforeEach(() => {
  __resetPricingConfigCacheForTests();
});

describe("handleEstimateRequest", () => {
  it("returns 403 when Turnstile fails and never prices", async () => {
    const fetchImpl = (async () =>
      new Response(JSON.stringify({ success: false, "error-codes": ["invalid"] }), {
        status: 200,
      })) as typeof fetch;

    const env = baseEnv();
    const result = await handleEstimateRequest(validBody(), env, {
      remoteip: "1.1.1.1",
      fetchImpl,
      skipRateLimit: true,
    });

    expect(result.status).toBe(403);
    expect(env.LEAD_EMAIL.send).not.toHaveBeenCalled();
  });

  it("returns 429 when the rate limiter rejects", async () => {
    const env = baseEnv({
      ESTIMATE_LIMITER: {
        limit: vi.fn(async () => ({ success: false })),
      },
    });
    const result = await handleEstimateRequest(validBody(), env, {
      remoteip: "1.1.1.1",
      fetchImpl: fakeFetchOk(),
    });
    expect(result.status).toBe(429);
    expect(result.body).toEqual({ error: "rate_limited" });
    expect(result.headers?.["Retry-After"]).toBe("60");
  });

  it("returns 400 for a filled honeypot without field detail", async () => {
    const env = baseEnv();
    const result = await handleEstimateRequest(
      validBody({ website: "https://spam.example" }),
      env,
      { fetchImpl: fakeFetchOk(), skipRateLimit: true },
    );
    expect(result.status).toBe(400);
    expect(result.body).toEqual({ error: "invalid_request" });
    expect(env.LEAD_EMAIL.send).not.toHaveBeenCalled();
  });

  it("returns 400 fieldErrors for invalid project input", async () => {
    const result = await handleEstimateRequest(
      validBody({
        project: { services: ["fence"], fence: { linearFeet: 1, height: "6" } },
      }),
      baseEnv(),
      { fetchImpl: fakeFetchOk(), skipRateLimit: true },
    );
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("invalid_request");
    expect(
      (result.body.fieldErrors as Record<string, string>)["project.fence.linearFeet"],
    ).toBeTruthy();
  });

  it("returns 503 when pricing config is missing", async () => {
    const result = await handleEstimateRequest(
      validBody(),
      baseEnv({ BALLPARK_PRICING_JSON: undefined }),
      { fetchImpl: fakeFetchOk(), skipRateLimit: true },
    );
    expect(result.status).toBe(503);
    expect(result.body).toEqual({ error: "pricing_unavailable" });
  });

  it("returns 503 when range factors do not bracket 1.0", async () => {
    const result = await handleEstimateRequest(
      validBody(),
      baseEnv({
        BALLPARK_PRICING_JSON: JSON.stringify({
          ...fakePricing,
          rangeLowFactor: 0.1,
          rangeHighFactor: 0.15,
        }),
      }),
      { fetchImpl: fakeFetchOk(), skipRateLimit: true },
    );
    expect(result.status).toBe(503);
    expect(result.body).toEqual({ error: "pricing_unavailable" });
  });

  it("returns 200 with only the public result shape", async () => {
    const env = baseEnv();
    const result = await handleEstimateRequest(validBody(), env, {
      fetchImpl: fakeFetchOk(),
      skipRateLimit: true,
    });

    expect(result.status).toBe(200);
    expect(Object.keys(result.body).sort()).toEqual(
      ["disclaimer", "estimateId", "notices", "range", "status"].sort(),
    );
    expect(result.body.status).toBe("ok");
    expect(result.body.estimateId).toBe(leadId);
    expect(result.body.range).toEqual(
      expect.objectContaining({
        currency: "USD",
        low: expect.any(Number),
        high: expect.any(Number),
      }),
    );

    const walkNumbers = (value: unknown, path: string[] = []): string[] => {
      if (typeof value === "number") return [path.join(".") || "(root)"];
      if (Array.isArray(value)) {
        return value.flatMap((item, i) => walkNumbers(item, [...path, String(i)]));
      }
      if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([k, v]) => walkNumbers(v, [...path, k]));
      }
      return [];
    };
    expect(walkNumbers(result.body).sort()).toEqual(["range.high", "range.low"].sort());

    expect(env.LEAD_EMAIL.send).toHaveBeenCalled();
    const sendMock = env.LEAD_EMAIL.send as ReturnType<typeof vi.fn>;
    const sent = sendMock.mock.calls[0]?.[0] as { text: string };
    expect(sent.text).toContain("Subtotal (internal)");
  });

  it("still returns 200 when lead email fails", async () => {
    const env = baseEnv({
      LEAD_EMAIL: {
        send: vi.fn(async () => {
          throw new Error("smtp_down");
        }),
      },
    });
    const result = await handleEstimateRequest(validBody(), env, {
      fetchImpl: fakeFetchOk(),
      skipRateLimit: true,
    });
    expect(result.status).toBe(200);
    expect(result.body.status).toBe("ok");
  });
});
