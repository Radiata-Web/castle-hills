/**
 * Photo delivery for Castle Hills.
 *
 * Production: Cloudflare R2 custom domain + Image Transformations
 *   https://img.chstainandrestoration.com/cdn-cgi/image/<opts>/<objectKey>
 *
 * Local / unset CDN: `/photos/<id>.webp` from `public/photos`.
 *
 * Logical IDs stay path-like without leading slash or extension, e.g. `paint/ex-paint-2`.
 * If R2 object keys differ after renames, add entries to `PHOTO_KEY_ALIASES`.
 */

export type ImageVariant = "hero" | "card" | "gallery" | "thumb" | "og" | "raw";

type VariantConfig = {
  /** Primary width used for `src`. */
  width: number;
  /** Extra widths for `srcset` (omit for raw). */
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
 * Map logical photo id → R2 object key when names diverge after upload/rename.
 * Keys are normalized logical ids (`paint/ex-paint-2`).
 * Values are full object keys in the bucket (e.g. `photos/paint/exterior-2.webp`).
 */
export const PHOTO_KEY_ALIASES: Record<string, string> = {
  // Example after Ryan shares R2 keys:
  // "paint/ex-paint-2": "photos/paint/exterior-home-2.webp",
};

const CDN_BASE =
  (import.meta.env.VITE_IMAGE_CDN_BASE as string | undefined)?.replace(/\/$/, "") ?? "";
const FORCE_CDN = import.meta.env.VITE_IMAGE_CDN_FORCE === "true";

/** True when we should emit img.chstainandrestoration.com URLs. */
export function useImageCdn(): boolean {
  if (!CDN_BASE) return false;
  if (FORCE_CDN) return true;
  return import.meta.env.PROD;
}

export function imageCdnBase(): string {
  return CDN_BASE;
}

/** Strip `/photos/`, leading slash, and `.webp`/`.jpg`/… → logical id. */
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

/** Resolve logical id (or path) to the R2 object key / local public path segment. */
export function toObjectKey(input: string): string {
  const logical = toLogicalPhotoId(input);
  if (PHOTO_KEY_ALIASES[logical]) {
    return PHOTO_KEY_ALIASES[logical].replace(/^\/+/, "");
  }
  return `photos/${logical}.webp`;
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

/**
 * Public URL for a photo.
 * Absolute http(s) inputs pass through unchanged.
 */
export function photoSrc(
  input: string,
  options: { variant?: ImageVariant; width?: number } = {},
): string {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    if (!useImageCdn() || !CDN_BASE) return input;
    // Already on our CDN without transforms — optionally wrap.
    if (input.startsWith(CDN_BASE) && !input.includes("/cdn-cgi/image/")) {
      const key = input.slice(CDN_BASE.length).replace(/^\/+/, "");
      const variant = options.variant ?? "gallery";
      return `${CDN_BASE}/cdn-cgi/image/${transformOptions(variant, options.width)}/${key}`;
    }
    return input;
  }

  const key = toObjectKey(input);
  const variant = options.variant ?? "gallery";

  if (!useImageCdn()) {
    return `/${key}`;
  }

  if (variant === "raw") {
    return `${CDN_BASE}/${key}`;
  }

  return `${CDN_BASE}/cdn-cgi/image/${transformOptions(variant, options.width)}/${key}`;
}

/** `srcset` string for responsive delivery (CDN only; empty when local). */
export function photoSrcSet(input: string, variant: ImageVariant = "gallery"): string | undefined {
  if (!useImageCdn()) return undefined;
  const cfg = VARIANTS[variant];
  const widths = cfg.srcSetWidths;
  if (!widths?.length) return undefined;

  return widths.map((w) => `${photoSrc(input, { variant, width: w })} ${w}w`).join(", ");
}

/** CSS `url(...)` value for background-image heroes/cards. */
export function photoCssUrl(input: string, variant: ImageVariant = "hero"): string {
  return `url(${photoSrc(input, { variant })})`;
}

/** Absolute URL for Open Graph / JSON-LD (always absolute). */
export function photoAbsoluteSrc(
  input: string,
  options: { variant?: ImageVariant; siteUrl: string },
): string {
  const src = photoSrc(input, { variant: options.variant ?? "og" });
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${options.siteUrl.replace(/\/$/, "")}${src.startsWith("/") ? src : `/${src}`}`;
}

/** Logical ids currently referenced by the app (for R2 audit / probe script). */
export const REFERENCED_PHOTO_IDS = [
  "paint/ex-paint-1-after",
  "paint/ex-paint-1-before",
  "paint/ex-paint-2",
  "paint/ex-paint-4",
  "paint/in-paint-1",
  "paint/in-paint-2",
  "stain/stain-2",
  "stain/stain-4",
  "pergolas/pergola-1",
  "pergolas/pergola-6",
  "patio-cover",
  "gates/gate-1",
  "garages/garage-1",
] as const;
