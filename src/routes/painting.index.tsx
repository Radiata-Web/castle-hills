import { createFileRoute } from "@tanstack/react-router";
import { servicePageHead } from "@/lib/service-seo";
import PaintingHubPage from "@/pages/painting";

export const Route = createFileRoute("/painting/")({
  head: () =>
    servicePageHead({
      pathname: "/painting",
      title: "Interior & Exterior Painting | Castle Hills Stain & Restoration",
      description:
        "Professional interior and exterior painting in the Dallas–Fort Worth area. Drywall prep available with interior work.",
      ogImage: "/photos/paint/ex-paint-2.webp",
      serviceName: "Interior & Exterior Painting",
      serviceType: "Painting",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Painting", path: "/painting" },
      ],
    }),
  component: PaintingHubPage,
});
