export const PAGES: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
];

export const FENCING_SERVICES: {
  title: string;
  href: string;
  image: string;
}[] = [
  {
    title: "Wood Fences",
    href: "wood-fences",
    image: "/fence.jpg",
  },
  {
    title: "Metal Fences",
    href: "metal-fences",
    image: "/fence.jpg",
  },
  {
    title: "Fence Stain",
    href: "fence-stain",
    image: "/fence.jpg",
  },
];

export const OUTDOOR_LIVING_SERVICES: {
  title: string;
  href: string;
  image: string;
}[] = [
  {
    title: "Arbors & Pergolas",
    href: "arbors-and-pergolas",
    image: "/fence.jpg",
  },
  {
    title: "Patio Covers",
    href: "patio-covers",
    image: "/fence.jpg",
  },
];

export const PAINTING_SERVICES: {
  title: string;
  href: string;
  image: string;
}[] = [
  {
    title: "Interior Painting",
    href: "interior-painting",
    image: "/fence.jpg",
  },
  {
    title: "Exterior Painting",
    href: "exterior-painting",
    image: "/fence.jpg",
  },
];

export const ALL_SERVICES = FENCING_SERVICES.concat(
  OUTDOOR_LIVING_SERVICES,
  PAINTING_SERVICES
);
