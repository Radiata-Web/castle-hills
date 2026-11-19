import { Link } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const PREP_ITEMS = ["Power washing", "Cleaning", "Removing old stain or paint"] as const;

export function EstimatorAside() {
  return (
    <aside className="space-y-5 text-sm text-zinc-600 lg:sticky lg:top-28">
      <div className="space-y-2.5">
        <h2 className="text-sm font-semibold text-zinc-900">Every price includes prep</h2>
        <ul className="space-y-1.5">
          {PREP_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-sm font-semibold text-zinc-900">House trim</h2>
        <p className="text-pretty">
          Trim staining needs a free in-person consult—call us and we&apos;ll walk the project with
          you.
        </p>
      </div>

      <div className="space-y-2.5 pt-1">
        <h2 className="text-sm font-semibold text-zinc-900">Rather talk it through?</h2>
        <Button
          nativeButton={false}
          render={<a href={PHONE_TEL} />}
          variant="outline"
          className="min-h-11 w-full justify-center sm:w-auto"
        >
          <Phone className="size-4" aria-hidden />
          {PHONE_DISPLAY}
        </Button>
        <p>
          Prefer to write it out?{" "}
          <Link to="/contact-us" className="font-medium text-primary underline underline-offset-4">
            Send us a message
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
