import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/images";
import { servicePageHead } from "@/lib/service-seo";
import ExteriorWoodStainingPage from "@/pages/wood-staining/exterior-wood";

export const Route = createFileRoute("/wood-staining/exterior-wood")({
  head: () =>
    servicePageHead({
      pathname: "/wood-staining/exterior-wood",
      title: "Exterior Wood Staining | Castle Hills Stain & Restoration",
      description:
        "Exterior wood staining and sealing for exposed wood in the Dallas–Fort Worth area.",
      ogImage: PHOTOS.stain4,
      serviceName: "Exterior Wood Staining",
      serviceType: "Exterior wood staining",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Wood Staining", path: "/wood-staining" },
        { name: "Exterior Wood Staining", path: "/wood-staining/exterior-wood" },
      ],
    }),
  component: ExteriorWoodStainingPage,
});
