import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/images";
import { servicePageHead } from "@/lib/service-seo";
import PaintingHubPage from "@/pages/painting";

export const Route = createFileRoute("/painting/")({
  head: () =>
    servicePageHead({
      pathname: "/painting",
      title: "Interior & Exterior Painting | Castle Hills Stain & Restoration",
      description:
        "Professional interior and exterior painting in the Dallas–Fort Worth area. Drywall prep available with interior work.",
      ogImage: PHOTOS.paintExt2,
      serviceName: "Interior & Exterior Painting",
      serviceType: "Painting",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Painting", path: "/painting" },
      ],
    }),
  component: PaintingHubPage,
});
