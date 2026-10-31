/**
 * Launch service IA for Painting + Wood Staining (production nav source of truth).
 * Cabinets + deck child URLs are intentionally omitted until the photo pack lands.
 */

export type ServiceNavLink = {
  title: string;
  href: string;
  description: string;
};

export type ServiceNavGroup = {
  id: "painting" | "wood-staining";
  title: string;
  href: string;
  description: string;
  children: ServiceNavLink[];
};

/** Two-tab services model — launch children only. */
export const SERVICE_NAV_GROUPS: ServiceNavGroup[] = [
  {
    id: "painting",
    title: "Painting",
    href: "/painting",
    description: "Interior and exterior painting with durable coatings for North Texas homes.",
    children: [
      {
        title: "Interior Painting",
        href: "/painting/interior",
        description: "Clean lines, careful prep, and finishes that hold up to daily use.",
      },
      {
        title: "Exterior Painting",
        href: "/painting/exterior",
        description: "Prep and coatings that protect siding and trim from heat and weather.",
      },
    ],
  },
  {
    id: "wood-staining",
    title: "Wood Staining",
    href: "/wood-staining",
    description: "Fence, patio, pergola, and exterior wood staining built for Texas sun.",
    children: [
      {
        title: "Fence Staining",
        href: "/wood-staining/fence",
        description: "Cleaning, prep, and premium oil-based stain for lasting fence color.",
      },
      {
        title: "Patio Cover & Pergola Staining",
        href: "/wood-staining/patio-pergola",
        description: "Even color and protection for beams, covers, and outdoor wood structures.",
      },
      {
        title: "Exterior Wood Staining",
        href: "/wood-staining/exterior-wood",
        description: "Stain and seal exposed exterior wood so it stays rich and protected.",
      },
    ],
  },
];

/** Flat list of every launch service URL (hubs + children). */
export const LAUNCH_SERVICE_PATHS = SERVICE_NAV_GROUPS.flatMap((group) => [
  group.href,
  ...group.children.map((child) => child.href),
]);

export const DEFERRED_SERVICE_NOTES = {
  cabinets:
    "Cabinet painting & refinishing — ask us for details; dedicated page coming with new photos.",
  deck: "Deck staining & sealing — available by estimate; dedicated page coming with new photos.",
} as const;
