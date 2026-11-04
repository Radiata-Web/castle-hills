import { Link } from "@tanstack/react-router";
import { MoveRight } from "lucide-react";
import type { ServiceNavLink } from "@/lib/service-ia";

type ServiceChildLinksProps = {
  heading: string;
  intro?: string;
  links: ServiceNavLink[];
};

/** Hub cross-links to launch child pages (and siblings). */
export function ServiceChildLinks({ heading, intro, links }: ServiceChildLinksProps) {
  return (
    <nav aria-labelledby="service-child-links-heading" className="mb-16">
      <h2
        id="service-child-links-heading"
        className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl"
      >
        {heading}
      </h2>
      {intro ? <p className="mt-3 max-w-2xl text-zinc-600">{intro}</p> : null}
      <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="group flex h-full flex-col rounded-xl border border-zinc-200/90 bg-zinc-50/50 p-5 transition-colors hover:border-accent/40 hover:bg-white"
            >
              <span className="inline-flex items-center gap-2 text-lg font-bold text-zinc-900">
                {link.title}
                <MoveRight
                  className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
              <span className="mt-2 text-sm leading-relaxed text-zinc-600">{link.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
