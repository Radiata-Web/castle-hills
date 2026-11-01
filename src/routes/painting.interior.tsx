import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/images";
import { servicePageHead } from "@/lib/service-seo";
import InteriorPaintingPage from "@/pages/painting/interior";

export const Route = createFileRoute("/painting/interior")({
  head: () =>
    servicePageHead({
      pathname: "/painting/interior",
      title: "Interior Painting in DFW | Castle Hills Stain & Restoration",
      description:
        "Interior painting with careful prep, drywall repair when needed, and durable finishes in Dallas–Fort Worth.",
      ogImage: PHOTOS.paintInt1Before,
      serviceName: "Interior Painting",
      serviceType: "Interior painting",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Painting", path: "/painting" },
        { name: "Interior Painting", path: "/painting/interior" },
      ],
    }),
  component: InteriorPaintingPage,
});
