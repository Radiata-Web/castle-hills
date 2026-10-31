import { SITE_URL } from "@/lib/site";

export type PageMeta = {
  title: string;
  description: string;
  /** Site path for canonical + og:url, e.g. `/about-us` or `/`. */
  pathname: string;
  keywords?: string[];
  applicationName?: string;
  referrer?: string;
  /** Absolute or site-root path for og:image. Defaults to a brand hero photo. */
  ogImage?: string;
};

const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/stain/stain-2.webp`;

function absoluteUrl(pathname: string): string {
  if (pathname === "/" || pathname === "") {
    return SITE_URL;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

function absoluteAsset(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export function pageHead(meta: PageMeta) {
  const canonical = absoluteUrl(meta.pathname);
  const ogImage = absoluteAsset(meta.ogImage ?? DEFAULT_OG_IMAGE);

  const tags: Array<
    | { title: string }
    | { name: string; content: string }
    | { property: string; content: string }
    | { charSet: string }
    | { name: "viewport"; content: string }
  > = [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: meta.title },
    { name: "description", content: meta.description },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
  ];

  if (meta.keywords?.length) {
    tags.push({ name: "keywords", content: meta.keywords.join(", ") });
  }

  if (meta.applicationName) {
    tags.push({ name: "application-name", content: meta.applicationName });
  }

  if (meta.referrer) {
    tags.push({ name: "referrer", content: meta.referrer });
  }

  return {
    meta: tags,
    links: [{ rel: "canonical", href: canonical }],
  };
}

/** JSON-LD script entries for TanStack Router `head`. */
export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export const rootMeta: PageMeta = {
  title: "Castle Hills Stain & Restoration | DFW",
  pathname: "/",
  applicationName: "Home · Castle Hills Stain & Restoration",
  description:
    "Interior and exterior painting, wood staining, and exterior wood care in the Dallas–Fort Worth area. Get your free estimate today!",
  keywords: [
    "Interior painting DFW",
    "Exterior painting Dallas",
    "Fence staining",
    "Deck and wood staining",
    "Pergola patio cover staining",
    "Castle Hills painters",
    "Wood stain Carrollton",
  ],
  referrer: "origin-when-cross-origin",
};
