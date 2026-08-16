import { Link } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ctaPrimaryClassName } from "@/lib/cta";

export function RouteError({ reset }: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-background text-foreground px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Castle Hills Stain & Restoration
      </h1>
      <p className="text-xl mb-2 max-w-xl text-zinc-600">
        Wood staining, fence installation, and painting across the Dallas–Fort
        Worth area.
      </p>
      <p className="mb-8 text-zinc-500">
        This page didn&apos;t finish loading. Try again, or head home.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className={ctaPrimaryClassName} onClick={reset}>
          Try again
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={ctaPrimaryClassName}
          render={<Link to="/" />}
          nativeButton={false}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}
