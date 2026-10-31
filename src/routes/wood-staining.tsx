import { Outlet, createFileRoute } from "@tanstack/react-router";

/** Path layout for `/wood-staining/*` — hub content lives on `wood-staining.index`. */
export const Route = createFileRoute("/wood-staining")({
  component: WoodStainingLayout,
});

function WoodStainingLayout() {
  return <Outlet />;
}
