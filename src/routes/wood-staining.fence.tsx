import { createFileRoute } from "@tanstack/react-router";
import { servicePageHead } from "@/lib/service-seo";
import FenceStainingPage from "@/pages/wood-staining/fence";

export const Route = createFileRoute("/wood-staining/fence")({
  head: () =>
    servicePageHead({
      pathname: "/wood-staining/fence",
      title: "Fence Staining & Sealing | Castle Hills Stain & Restoration",
      description:
        "Fence cleaning, prep, and premium oil-based staining in the Dallas–Fort Worth area.",
      ogImage: "/photos/stain/stain-2.webp",
      serviceName: "Fence Staining",
      serviceType: "Fence staining",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Wood Staining", path: "/wood-staining" },
        { name: "Fence Staining", path: "/wood-staining/fence" },
      ],
    }),
  component: FenceStainingPage,
});
