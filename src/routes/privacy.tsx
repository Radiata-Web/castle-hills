import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import PrivacyPage from "@/pages/privacy";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | Castle Hills Stain & Restoration",
      description:
        "How Castle Hills Stain and Restoration LLC collects, uses, and protects information when you use our website.",
    }),
  component: PrivacyPage,
});
