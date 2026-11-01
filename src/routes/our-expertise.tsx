import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import OurExpertisePage from "@/pages/our-expertise";

export const Route = createFileRoute("/our-expertise")({
  head: () =>
    pageHead({
      title: "Our Expertise | Castle Hills Stain & Restoration",
      description: "Get a free estimate for your next home improvement project.",
    }),
  component: OurExpertisePage,
});
