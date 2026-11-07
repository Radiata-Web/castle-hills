import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import BallparkEstimatePage from "@/pages/ballpark-estimate";

export const Route = createFileRoute("/ballpark-estimate")({
  head: () =>
    pageHead({
      pathname: "/ballpark-estimate",
      title: "Ballpark Estimate | Castle Hills Stain & Restoration",
      description:
        "Request a non-binding ballpark estimate for painting and wood staining in the Dallas–Fort Worth area. Not a quote—final pricing requires a consultation.",
    }),
  component: BallparkEstimatePage,
});
