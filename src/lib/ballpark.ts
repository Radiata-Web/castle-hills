/** Shared ballpark-estimate types and schemas (client-safe — no rates). */

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const BALLPARK_DISCLAIMER =
  "This is a non-binding ballpark estimate for planning only. It is not a quote, bid, or contract. Final pricing requires a consultation with Castle Hills Stain & Restoration.";

export const SERVICE_IDS = [
  "fence",
  "deck",
  "pergola",
  "garage",
  "front_door",
  "shutters",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_LABELS: Record<ServiceId, string> = {
  fence: "Fence staining",
  deck: "Deck staining",
  pergola: "Patio cover or pergola",
  garage: "Garage doors",
  front_door: "Front door",
  shutters: "Shutters",
};

export const LIMITS = {
  fenceLinearFeet: { min: 10, max: 5000 },
  deckSqft: { min: 20, max: 5000 },
  pergolaSqft: { min: 20, max: 3000 },
  garageSingle: { min: 0, max: 3 },
  garageDouble: { min: 0, max: 2 },
  frontDoorCount: { min: 1, max: 10 },
  shutterPairs: { min: 0, max: 50 },
  name: { min: 2, max: 80 },
  email: { max: 254 },
  notes: { max: 1000 },
  turnstileToken: { min: 1, max: 2048 },
} as const;

const intInRange = (min: number, max: number) =>
  z
    .number({ error: "Enter a number between " + min + " and " + max + "." })
    .int({ error: "Enter a number between " + min + " and " + max + "." })
    .min(min, { error: `Enter a number between ${min} and ${max}.` })
    .max(max, { error: `Enter a number between ${min} and ${max}.` });

export const serviceIdSchema = z.enum(SERVICE_IDS);

export const contactSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(LIMITS.name.min, { error: "Enter your name." })
    .max(LIMITS.name.max, { error: "Enter your name." }),
  email: z
    .email({ error: "Enter a valid email." })
    .max(LIMITS.email.max, { error: "Enter a valid email." }),
  phone: z
    .string()
    .refine((val) => isValidPhoneNumber(val, { defaultCountry: "US" }), {
      error: "Enter a valid US phone number.",
    })
    .transform((val) => parsePhoneNumber(val, { defaultCountry: "US" }).number.toString()),
  zip: z.string().regex(/^\d{5}$/, { error: "Enter a 5-digit ZIP code." }),
  notes: z
    .string()
    .max(LIMITS.notes.max, { error: "Keep notes under 1000 characters." })
    .optional(),
});

export type ContactValues = z.input<typeof contactSchema>;
export type ContactNormalized = z.output<typeof contactSchema>;

const fenceBlockSchema = z.strictObject({
  linearFeet: intInRange(LIMITS.fenceLinearFeet.min, LIMITS.fenceLinearFeet.max),
  height: z.enum(["6", "8"], { error: "Choose an option." }),
});

const deckBlockSchema = z.strictObject({
  sqft: intInRange(LIMITS.deckSqft.min, LIMITS.deckSqft.max),
});

const pergolaBlockSchema = z.strictObject({
  sqft: intInRange(LIMITS.pergolaSqft.min, LIMITS.pergolaSqft.max),
});

const garageBlockSchema = z
  .strictObject({
    single: intInRange(LIMITS.garageSingle.min, LIMITS.garageSingle.max),
    double: intInRange(LIMITS.garageDouble.min, LIMITS.garageDouble.max),
  })
  .superRefine((val, ctx) => {
    if (val.single + val.double < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Choose at least one garage door.",
        path: ["single"],
      });
    }
  });

const frontDoorBlockSchema = z.strictObject({
  count: intInRange(LIMITS.frontDoorCount.min, LIMITS.frontDoorCount.max),
  sides: z.enum(["one", "both"], { error: "Choose an option." }),
});

const shuttersBlockSchema = z
  .strictObject({
    firstFloorPairs: intInRange(LIMITS.shutterPairs.min, LIMITS.shutterPairs.max),
    secondFloorPairs: intInRange(LIMITS.shutterPairs.min, LIMITS.shutterPairs.max),
  })
  .superRefine((val, ctx) => {
    if (val.firstFloorPairs + val.secondFloorPairs < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Add at least one pair of shutters.",
        path: ["firstFloorPairs"],
      });
    }
  });

export const projectSchema = z
  .strictObject({
    services: z
      .array(serviceIdSchema)
      .min(1, { error: "Choose at least one service." })
      .max(SERVICE_IDS.length)
      .refine((ids) => new Set(ids).size === ids.length, {
        error: "Choose at least one service.",
      }),
    fence: fenceBlockSchema.optional(),
    deck: deckBlockSchema.optional(),
    pergola: pergolaBlockSchema.optional(),
    garage: garageBlockSchema.optional(),
    frontDoor: frontDoorBlockSchema.optional(),
    shutters: shuttersBlockSchema.optional(),
  })
  .superRefine((project, ctx) => {
    const selected = new Set(project.services);
    const requireBlock = (service: ServiceId, key: keyof typeof project, label: string) => {
      if (selected.has(service) && project[key] == null) {
        ctx.addIssue({
          code: "custom",
          message: `${label} details are required.`,
          path: [key],
        });
      }
      if (!selected.has(service) && project[key] != null) {
        ctx.addIssue({
          code: "custom",
          message: `${label} was not selected.`,
          path: [key],
        });
      }
    };

    requireBlock("fence", "fence", "Fence");
    requireBlock("deck", "deck", "Deck");
    requireBlock("pergola", "pergola", "Pergola");
    requireBlock("garage", "garage", "Garage");
    requireBlock("front_door", "frontDoor", "Front door");
    requireBlock("shutters", "shutters", "Shutters");
  });

export type ProjectAnswers = z.infer<typeof projectSchema>;

export const estimateRequestSchema = z.strictObject({
  turnstileToken: z.string().min(LIMITS.turnstileToken.min).max(LIMITS.turnstileToken.max),
  leadId: z.uuid({ error: "Invalid lead id." }),
  website: z.literal("").optional(),
  contact: contactSchema,
  project: projectSchema,
});

export type EstimateRequest = z.input<typeof estimateRequestSchema>;
export type EstimateRequestNormalized = z.output<typeof estimateRequestSchema>;

export type EstimateNoticeCode = "bundle_discount" | "project_minimum";

export type EstimateNotice = {
  code: EstimateNoticeCode;
  message: string;
  suggestedService?: ServiceId;
};

export type EstimateSuccess = {
  status: "ok";
  estimateId: string;
  range: { low: number; high: number; currency: "USD" };
  notices: EstimateNotice[];
  disclaimer: string;
};

/** Per-step client schemas for questionnaire navigation (combined related fields). */
export const projectStepSchemas = {
  services: z
    .array(serviceIdSchema)
    .min(1, { error: "Choose at least one service." })
    .refine((ids) => new Set(ids).size === ids.length, {
      error: "Choose at least one service.",
    }),
  fence: z.strictObject({
    linearFeet: intInRange(LIMITS.fenceLinearFeet.min, LIMITS.fenceLinearFeet.max),
    height: z.enum(["6", "8"], { error: "Choose an option." }),
  }),
  deck_sqft: intInRange(LIMITS.deckSqft.min, LIMITS.deckSqft.max),
  pergola_sqft: intInRange(LIMITS.pergolaSqft.min, LIMITS.pergolaSqft.max),
  garage: z
    .strictObject({
      single: intInRange(LIMITS.garageSingle.min, LIMITS.garageSingle.max),
      double: intInRange(LIMITS.garageDouble.min, LIMITS.garageDouble.max),
    })
    .superRefine((val, ctx) => {
      if (val.single + val.double < 1) {
        ctx.addIssue({
          code: "custom",
          message: "Choose at least one garage door.",
          path: ["single"],
        });
      }
    }),
  front_door: z.strictObject({
    count: intInRange(LIMITS.frontDoorCount.min, LIMITS.frontDoorCount.max),
    sides: z.enum(["one", "both"], { error: "Choose an option." }),
  }),
  shutters: z
    .strictObject({
      firstFloorPairs: intInRange(LIMITS.shutterPairs.min, LIMITS.shutterPairs.max),
      secondFloorPairs: intInRange(LIMITS.shutterPairs.min, LIMITS.shutterPairs.max),
    })
    .superRefine((val, ctx) => {
      if (val.firstFloorPairs + val.secondFloorPairs < 1) {
        ctx.addIssue({
          code: "custom",
          message: "Add at least one pair of shutters.",
          path: ["firstFloorPairs"],
        });
      }
    }),
} as const;

export type ProjectStepName = keyof typeof projectStepSchemas;

/** Format a dollar range for display (client + server notices). */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRange(low: number, high: number): string {
  if (low === high) return formatUsd(low);
  return `${formatUsd(low)} – ${formatUsd(high)}`;
}
