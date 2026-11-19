import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import BallparkEstimatePage from "@/pages/ballpark-estimate";

export const Route = createFileRoute("/ballpark-estimate")({
  head: () =>
    pageHead({
      pathname: "/ballpark-estimate",
      title: "Ballpark Estimate | Castle Hills Stain & Restoration",
      description:
        "Get a free ballpark estimate for fence, deck, pergola, door and shutter staining in Dallas–Fort Worth in about two minutes. Not a quote—final pricing follows a free in-person visit.",
    }),
  component: BallparkEstimatePage,
});
