import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import InteriorExteriorRestorationPage from "@/pages/interior-exterior-restoration-renovation";

export const Route = createFileRoute(
  "/interior-exterior-restoration-renovation",
)({
  head: () =>
    pageHead({
      title: "Interior & Exterior Restoration | Castle Hills Stain & Restoration",
      description:
        "Restoration and rebuild services combining craftsmanship, design, and structural care.",
    }),
  component: InteriorExteriorRestorationPage,
});
