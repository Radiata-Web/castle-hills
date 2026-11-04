import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/images";
import { servicePageHead } from "@/lib/service-seo";
import ExteriorPaintingPage from "@/pages/painting/exterior";

export const Route = createFileRoute("/painting/exterior")({
  head: () =>
    servicePageHead({
      pathname: "/painting/exterior",
      title: "Exterior Painting in DFW | Castle Hills Stain & Restoration",
      description:
        "Exterior painting and coatings that protect siding and trim in the Dallas–Fort Worth area.",
      ogImage: PHOTOS.paintExt2,
      serviceName: "Exterior Painting",
      serviceType: "Exterior painting",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Painting", path: "/painting" },
        { name: "Exterior Painting", path: "/painting/exterior" },
      ],
    }),
  component: ExteriorPaintingPage,
});
