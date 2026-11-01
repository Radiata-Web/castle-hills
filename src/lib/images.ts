/**
 * Photo delivery for Castle Hills.
 *
 * Production: Cloudflare R2 custom domain + Image Transformations
 *   https://img.chstainandrestoration.com/cdn-cgi/image/<opts>/<objectKey>
 *
 * Object keys (current bucket layout):
 *   painting/paint-ext-1a.jpg  — before (a) / after (b) when paired
 *   painting/paint-ext-2.jpg   — single shot (no a/b)
 *   staining/stain-1.jpg
 *
 * Local `vp dev` (no CDN): maps to leftover files under `public/photos/` via
 * LOCAL_FALLBACKS so WAF-blocked localhost still renders.
 */

export type ImageVariant = "hero" | "card" | "gallery" | "thumb" | "og" | "raw";

type VariantConfig = {
  width: number;
  srcSetWidths?: number[];
  quality: number;
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
};

const VARIANTS: Record<ImageVariant, VariantConfig> = {
  hero: { width: 1920, srcSetWidths: [960, 1440, 1920], quality: 75, fit: "cover" },
  card: { width: 900, srcSetWidths: [450, 900], quality: 75, fit: "cover" },
  gallery: { width: 1200, srcSetWidths: [600, 1200], quality: 75, fit: "cover" },
  thumb: { width: 480, srcSetWidths: [240, 480], quality: 70, fit: "cover" },
  og: { width: 1200, quality: 80, fit: "cover" },
  raw: { width: 0, quality: 85 },
};

/**
 * Canonical photo IDs used by the app (no extension).
 * Prefer these over legacy `/photos/...` paths.
 */
export const PHOTOS = {
  /** Exterior paint — hero / cards */
  paintExt2: "painting/paint-ext-2",
  paintExt4: "painting/paint-ext-4",
  paintExt7: "painting/paint-ext-7",
  /** Exterior before/after pair */
  paintExt1Before: "painting/paint-ext-1a",
  paintExt1After: "painting/paint-ext-1b",
  paintExt3Before: "painting/paint-ext-3a",
  paintExt3After: "painting/paint-ext-3b",
  paintExt5Before: "painting/paint-ext-5a",
  paintExt5After: "painting/paint-ext-5b",
  paintExt6Before: "painting/paint-ext-6a",
  paintExt6After: "painting/paint-ext-6b",
  paintExt8Before: "painting/paint-ext-8a",
  paintExt8After: "painting/paint-ext-8b",
  paintExt9Before: "painting/paint-ext-9a",
  paintExt9After: "painting/paint-ext-9b",
  /** Interior before/after */
  paintInt1Before: "painting/paint-int-1a",
  paintInt1After: "painting/paint-int-1b",
  /** Stain set */
  stain1: "staining/stain-1",
  stain2: "staining/stain-2",
  stain3: "staining/stain-3",
  stain4: "staining/stain-4",
  stain5: "staining/stain-5",
  stain6: "staining/stain-6",
} as const;

export type PhotoId = (typeof PHOTOS)[keyof typeof PHOTOS];

export type BeforeAfterPair = {
  before: PhotoId;
  after: PhotoId;
  beforeAlt: string;
  afterAlt: string;
};

/** Curated paint before/after sets for service galleries. */
export const PAINT_GALLERY = {
  interior: [
    {
      before: PHOTOS.paintInt1Before,
      after: PHOTOS.paintInt1After,
      beforeAlt: "Interior room before painting refresh",
      afterAlt: "Same interior after fresh paint",
    },
  ] satisfies BeforeAfterPair[],
  /** Hub: two strong exterior pairs without overwhelming the page. */
  exteriorHub: [
    {
      before: PHOTOS.paintExt1Before,
      after: PHOTOS.paintExt1After,
      beforeAlt: "Home exterior before professional repaint",
      afterAlt: "Same home exterior after professional repaint",
    },
    {
      before: PHOTOS.paintExt3Before,
      after: PHOTOS.paintExt3After,
      beforeAlt: "House exterior with faded paint before refresh",
      afterAlt: "Same house after fresh exterior paint",
    },
  ] satisfies BeforeAfterPair[],
  /** Exterior child page: deeper set from the CDN pack. */
  exteriorFull: [
    {
      before: PHOTOS.paintExt1Before,
      after: PHOTOS.paintExt1After,
      beforeAlt: "Home exterior before professional repaint",
      afterAlt: "Same home exterior after professional repaint",
    },
    {
      before: PHOTOS.paintExt3Before,
      after: PHOTOS.paintExt3After,
      beforeAlt: "House exterior with faded paint before refresh",
      afterAlt: "Same house after fresh exterior paint",
    },
    {
      before: PHOTOS.paintExt5Before,
      after: PHOTOS.paintExt5After,
      beforeAlt: "Residential exterior before paint project",
      afterAlt: "Residential exterior after completed paint project",
    },
    {
      before: PHOTOS.paintExt8Before,
      after: PHOTOS.paintExt8After,
      beforeAlt: "Curb view before exterior painting",
      afterAlt: "Curb view after exterior painting",
    },
  ] satisfies BeforeAfterPair[],
} as const;

export type StainGalleryShot = {
  src: PhotoId;
  alt: string;
  label: string;
};

/** Stain set is singles (no a/b) — project grid for wood-staining pages. */
export const STAIN_GALLERY: StainGalleryShot[] = [
  { src: PHOTOS.stain1, alt: "Freshly stained wooden fence boards", label: "Fence" },
  { src: PHOTOS.stain2, alt: "Dark brown stained fence in a residential backyard", label: "Fence" },
  {
    src: PHOTOS.stain3,
    alt: "Stained wooden pergola in a backyard alcove",
    label: "Pergola",
  },
  {
    src: PHOTOS.stain4,
    alt: "Home exterior wood with a rich stain finish",
    label: "Exterior wood",
  },
  {
    src: PHOTOS.stain5,
    alt: "Stained outdoor wood structure with even color",
    label: "Outdoor wood",
  },
  {
    src: PHOTOS.stain6,
    alt: "Patio cover with a warm stained finish",
    label: "Patio cover",
  },
];

/**
 * Legacy local files under `public/photos` used when CDN is off.
 * Keys = canonical CDN logical ids.
 */
const LOCAL_FALLBACKS: Record<string, string> = {
  "painting/paint-ext-1a": "photos/paint/ex-paint-1-before.webp",
  "painting/paint-ext-1b": "photos/paint/ex-paint-1-after.webp",
  "painting/paint-ext-2": "photos/paint/ex-paint-2.webp",
  "painting/paint-ext-3a": "photos/paint/ex-paint-3.webp",
  "painting/paint-ext-3b": "photos/paint/ex-paint-3.webp",
  "painting/paint-ext-4": "photos/paint/ex-paint-4.webp",
  "painting/paint-ext-5a": "photos/paint/ex-paint-5.webp",
  "painting/paint-ext-5b": "photos/paint/ex-paint-5.webp",
  "painting/paint-ext-6a": "photos/paint/ex-paint-2.webp",
  "painting/paint-ext-6b": "photos/paint/ex-paint-4.webp",
  "painting/paint-ext-7": "photos/paint/ex-paint-5.webp",
  "painting/paint-ext-8a": "photos/paint/ex-paint-1-before.webp",
  "painting/paint-ext-8b": "photos/paint/ex-paint-1-after.webp",
  "painting/paint-ext-9a": "photos/paint/ex-paint-3.webp",
  "painting/paint-ext-9b": "photos/paint/ex-paint-4.webp",
  "painting/paint-int-1a": "photos/paint/in-paint-2.webp",
  "painting/paint-int-1b": "photos/paint/in-paint-1.webp",
  "staining/stain-1": "photos/stain/stain-1.webp",
  "staining/stain-2": "photos/stain/stain-2.webp",
  "staining/stain-3": "photos/stain/stain-3.webp",
  "staining/stain-4": "photos/stain/stain-4.webp",
  "staining/stain-5": "photos/pergolas/pergola-6.webp",
  "staining/stain-6": "photos/patio-cover.webp",
};

/**
 * Map leftover legacy logical ids (old `/photos/...` layout) → canonical CDN ids.
 */
const LEGACY_TO_CANONICAL: Record<string, string> = {
  "paint/ex-paint-1-before": PHOTOS.paintExt1Before,
  "paint/ex-paint-1-after": PHOTOS.paintExt1After,
  "paint/ex-paint-2": PHOTOS.paintExt2,
  "paint/ex-paint-3": PHOTOS.paintExt3After,
  "paint/ex-paint-4": PHOTOS.paintExt4,
  "paint/ex-paint-5": PHOTOS.paintExt7,
  "paint/in-paint-1": PHOTOS.paintInt1After,
  "paint/in-paint-2": PHOTOS.paintInt1Before,
  "stain/stain-1": PHOTOS.stain1,
  "stain/stain-2": PHOTOS.stain2,
  "stain/stain-3": PHOTOS.stain3,
  "stain/stain-4": PHOTOS.stain4,
  "pergolas/pergola-1": PHOTOS.stain3,
  "pergolas/pergola-6": PHOTOS.stain5,
  "patio-cover": PHOTOS.stain6,
  "gates/gate-1": PHOTOS.stain1,
  "garages/garage-1": PHOTOS.paintExt7,
};

const CDN_BASE = (import.meta.env.VITE_IMAGE_CDN_BASE as string | undefined)?.replace(/\/$/, "") ?? "";
const FORCE_CDN = import.meta.env.VITE_IMAGE_CDN_FORCE === "true";

export function useImageCdn(): boolean {
  if (!CDN_BASE) return false;
  if (FORCE_CDN) return true;
  return import.meta.env.PROD;
}

export function imageCdnBase(): string {
  return CDN_BASE;
}

/** Strip URL /photos / extension → logical id. */
export function toLogicalPhotoId(input: string): string {
  let id = input.trim();
  if (id.startsWith("http://") || id.startsWith("https://")) {
    try {
      const url = new URL(id);
      id = url.pathname;
    } catch {
      return id;
    }
  }
  id = id.replace(/^\/+/, "");
  id = id.replace(/^photos\//, "");
  id = id.replace(/\.(webp|jpe?g|png|gif|avif)$/i, "");
  return id;
}

/** Resolve any input to the canonical logical id (`painting/...` or `staining/...`). */
export function toCanonicalPhotoId(input: string): string {
  const logical = toLogicalPhotoId(input);
  if (logical.startsWith("painting/") || logical.startsWith("staining/")) {
    return logical;
  }
  return LEGACY_TO_CANONICAL[logical] ?? logical;
}

/** R2 object key (with extension) for CDN requests. */
export function toObjectKey(input: string): string {
  const canonical = toCanonicalPhotoId(input);
  if (canonical.startsWith("painting/") || canonical.startsWith("staining/")) {
    return `${canonical}.jpg`;
  }
  // Unknown — assume jpg under the given path
  return `${canonical}.jpg`;
}

function transformOptions(variant: ImageVariant, widthOverride?: number): string {
  const cfg = VARIANTS[variant];
  if (variant === "raw") {
    return `quality=${cfg.quality},format=auto`;
  }
  const width = widthOverride ?? cfg.width;
  const parts = [`width=${width}`, `quality=${cfg.quality}`, "format=auto"];
  if (cfg.fit) parts.push(`fit=${cfg.fit}`);
  return parts.join(",");
}

export function photoSrc(
  input: string,
  options: { variant?: ImageVariant; width?: number } = {},
): string {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    if (!useImageCdn() || !CDN_BASE) return input;
    if (input.startsWith(CDN_BASE) && !input.includes("/cdn-cgi/image/")) {
      const key = input.slice(CDN_BASE.length).replace(/^\/+/, "");
      const variant = options.variant ?? "gallery";
      return `${CDN_BASE}/cdn-cgi/image/${transformOptions(variant, options.width)}/${key}`;
    }
    return input;
  }

  // Logos and other static public assets — never send through photo CDN.
  if (input.startsWith("/logos/") || input.startsWith("/favicon") || input.endsWith(".svg")) {
    return input.startsWith("/") ? input : `/${input}`;
  }

  const canonical = toCanonicalPhotoId(input);
  const variant = options.variant ?? "gallery";

  if (!useImageCdn()) {
    const local = LOCAL_FALLBACKS[canonical] ?? `photos/${toLogicalPhotoId(input)}.webp`;
    return `/${local}`;
  }

  const key = toObjectKey(canonical);
  if (variant === "raw") {
    return `${CDN_BASE}/${key}`;
  }
  return `${CDN_BASE}/cdn-cgi/image/${transformOptions(variant, options.width)}/${key}`;
}

export function photoSrcSet(input: string, variant: ImageVariant = "gallery"): string | undefined {
  if (!useImageCdn()) return undefined;
  const cfg = VARIANTS[variant];
  const widths = cfg.srcSetWidths;
  if (!widths?.length) return undefined;
  return widths.map((w) => `${photoSrc(input, { variant, width: w })} ${w}w`).join(", ");
}

export function photoCssUrl(input: string, variant: ImageVariant = "hero"): string {
  return `url(${photoSrc(input, { variant })})`;
}

export function photoAbsoluteSrc(
  input: string,
  options: { variant?: ImageVariant; siteUrl: string },
): string {
  const src = photoSrc(input, { variant: options.variant ?? "og" });
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${options.siteUrl.replace(/\/$/, "")}${src.startsWith("/") ? src : `/${src}`}`;
}

/** All known-live CDN keys discovered by probe (no extension). */
export const REFERENCED_PHOTO_IDS = Object.values(PHOTOS);
