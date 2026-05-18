import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import LuxuryFinishesPage from "@/pages/luxury-finishes-coatings";

export const Route = createFileRoute("/luxury-finishes-coatings")({
  head: () =>
    pageHead({
      title: "Interior & Exterior Painting | Castle Hills Stain & Restoration",
      description:
        "Professional interior and exterior painting in the Dallas–Fort Worth area.",
    }),
  component: LuxuryFinishesPage,
});
