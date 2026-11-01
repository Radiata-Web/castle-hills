import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import AboutUsPage from "@/pages/about-us";

export const Route = createFileRoute("/about-us")({
  head: () =>
    pageHead({
      title: "About Us | Castle Hills Stain & Restoration",
      description: "Get a free estimate for your next home improvement project.",
    }),
  component: AboutUsPage,
});
