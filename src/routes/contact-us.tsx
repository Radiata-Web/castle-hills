import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import ContactUsPage from "@/pages/contact-us";

export const Route = createFileRoute("/contact-us")({
  head: () =>
    pageHead({
      title: "Request a Free Estimate | Castle Hills Stain & Restoration",
      description: "Get a free estimate for your next home improvement project.",
    }),
  component: ContactUsPage,
});
