import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/images";
import { servicePageHead } from "@/lib/service-seo";
import PatioPergolaStainingPage from "@/pages/wood-staining/patio-pergola";

export const Route = createFileRoute("/wood-staining/patio-pergola")({
  head: () =>
    servicePageHead({
      pathname: "/wood-staining/patio-pergola",
      title: "Pergola & Patio Cover Staining | Castle Hills Stain & Restoration",
      description:
        "Professional staining for pergolas and patio covers in the Dallas–Fort Worth area.",
      ogImage: PHOTOS.stain3,
      serviceName: "Patio Cover & Pergola Staining",
      serviceType: "Pergola and patio cover staining",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Wood Staining", path: "/wood-staining" },
        { name: "Patio Cover & Pergola Staining", path: "/wood-staining/patio-pergola" },
      ],
    }),
  component: PatioPergolaStainingPage,
});
