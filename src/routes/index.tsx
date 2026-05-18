import { createFileRoute } from "@tanstack/react-router";
import { pageHead, rootMeta } from "@/lib/seo";
import HomePage from "@/pages/home";

export const Route = createFileRoute("/")({
  head: () => pageHead(rootMeta),
  component: HomePage,
});
