import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import FenceServicesPage from "@/pages/fence-services";

export const Route = createFileRoute("/fence-services")({
  head: () =>
    pageHead({
      pathname: "/fence-services",
      title: "Fence Services | Castle Hills Stain & Restoration",
      description:
        "Fence installation, staining, repair, custom gates, and wood cleaning in the Dallas–Fort Worth area.",
      ogImage: "/photos/stain/stain-2.webp",
    }),
  component: FenceServicesPage,
});
