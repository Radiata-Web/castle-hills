"use client";

import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SERVICE_NAV_GROUPS } from "@/lib/service-ia";
import { cn } from "@/lib/utils";

const linkClass =
  "flex min-h-11 w-full items-center rounded-lg px-4 py-3 text-base leading-snug text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900";

/**
 * Accessible two-group Services nav prototype for Phase 2 cutover.
 * Not wired into production Navbar yet — use for QA / future swap.
 */
export function ServiceNavPrototype({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)} data-service-nav-prototype="">
      {SERVICE_NAV_GROUPS.map((group) => (
        <ServiceNavGroupCollapsible
          key={group.id}
          title={group.title}
          hubHref={group.href}
          links={group.children}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function ServiceNavGroupCollapsible({
  title,
  hubHref,
  links,
  onNavigate,
}: {
  title: string;
  hubHref: string;
  links: { title: string; href: string }[];
  onNavigate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const triggerId = `service-nav-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger
        id={triggerId}
        aria-label={`${title} services`}
        render={
          <Button
            variant="ghost"
            className="min-h-12 w-full justify-between rounded-lg px-4 py-3 text-lg font-semibold leading-snug hover:bg-zinc-100"
          />
        }
      >
        {title}
        {isOpen ? (
          <ChevronUp className="size-5 shrink-0 opacity-70" aria-hidden />
        ) : (
          <ChevronDown className="size-5 shrink-0 opacity-70" aria-hidden />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent
        className="mt-2 space-y-1.5 border-l border-zinc-200 pl-3 ml-2"
        aria-labelledby={triggerId}
      >
        <Link
          to={hubHref}
          className={cn(linkClass, "font-semibold text-zinc-900")}
          onClick={onNavigate}
        >
          All {title}
        </Link>
        {links.map((link) => (
          <Link key={link.href} to={link.href} className={linkClass} onClick={onNavigate}>
            {link.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
