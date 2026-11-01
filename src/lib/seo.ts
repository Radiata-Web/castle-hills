export type PageMeta = {
  title: string;
  description: string;
  keywords?: string[];
  applicationName?: string;
  referrer?: string;
};

export function pageHead(meta: PageMeta) {
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

  return { meta: tags };
}

export const rootMeta: PageMeta = {
  title: "Castle Hills Stain & Restoration | DFW",
  applicationName: "Home · Castle Hills Stain & Restoration",
  description:
    "Wood installation, wood restoration, wood stain, and property painting services in the Dallas-Fort Worth area. Get your free estimate today!",
  keywords: [
    "Wood fence installation",
    "Metal fence installation",
    "Wood fence repair",
    "Fencing contractor",
    "Fence company near me",
    "Residential fence",
    "Fence company carrollton",
  ],
  referrer: "origin-when-cross-origin",
};
