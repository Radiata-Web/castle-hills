import { Outlet, createFileRoute } from "@tanstack/react-router";

/** Path layout for `/painting/*` — hub content lives on `painting.index`. */
export const Route = createFileRoute("/painting")({
  component: PaintingLayout,
});

function PaintingLayout() {
  return <Outlet />;
}
