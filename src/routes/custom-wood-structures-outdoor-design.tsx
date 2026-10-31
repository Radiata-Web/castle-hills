import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import CustomWoodStructuresPage from "@/pages/custom-wood-structures-outdoor-design";

export const Route = createFileRoute("/custom-wood-structures-outdoor-design")({
  head: () =>
    pageHead({
      pathname: "/custom-wood-structures-outdoor-design",
      title: "Outdoor Structures | Castle Hills Stain & Restoration",
      description:
        "Custom outdoor structure installation and pergola and patio cover staining in the Dallas–Fort Worth area.",
      ogImage: "/photos/gates/gate-1.webp",
    }),
  component: CustomWoodStructuresPage,
});
