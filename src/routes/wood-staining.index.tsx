import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/images";
import { servicePageHead } from "@/lib/service-seo";
import WoodStainingHubPage from "@/pages/wood-staining";

export const Route = createFileRoute("/wood-staining/")({
  head: () =>
    servicePageHead({
      pathname: "/wood-staining",
      title: "Wood Staining & Sealing | Castle Hills Stain & Restoration",
      description:
        "Fence, patio, pergola, and exterior wood staining in the Dallas–Fort Worth area.",
      ogImage: PHOTOS.stain2,
      serviceName: "Wood Staining",
      serviceType: "Wood staining",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Wood Staining", path: "/wood-staining" },
      ],
    }),
  component: WoodStainingHubPage,
});
