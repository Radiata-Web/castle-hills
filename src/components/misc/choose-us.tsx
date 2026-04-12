import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../nav/logo";

export default function ChooseUs() {
  return (
    <article className="p-12 bg-zinc-100 rounded-lg border border-zinc-200 my-24">
      <Logo />
      <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4 mt-8">
        Why Homeowners Choose Us
      </h2>
      <p className="text-zinc-600 mb-4">
        Whether you’re looking to protect your fence, refresh your home with
        painting, or complete exterior upgrades, we focus on delivering clean,
        high-quality results that last.
      </p>
      <ul className="list-none space-y-3 p-0 m-0 text-zinc-600">
        <li className="flex gap-3">
          <Check
            className="shrink-0 text-accent mt-0.5"
            size={18}
            aria-hidden
          />
          <span>
            <span className="font-bold">
              Specialized in Exterior Finishes & Wood Protection
            </span>{" "}
            – We don’t try to do everything—we focus on what we do best: fence
            staining, painting, and exterior improvements built to withstand the
            Texas climate.
          </span>
        </li>
        <li className="flex gap-3">
          <Check
            className="shrink-0 text-accent mt-0.5"
            size={18}
            aria-hidden
          />
          <span>
            <span className="font-bold">Clean, Professional Crews</span> –
            Respect for your home is a priority. We maintain clean job sites,
            protect surrounding areas, and complete every project with attention
            to detail.
          </span>
        </li>
        <li className="flex gap-3">
          <Check
            className="shrink-0 text-accent mt-0.5"
            size={18}
            aria-hidden
          />
          <span>
            <span className="font-bold">
              Clear Communication From Start to Finish
            </span>{" "}
            – You’ll always know what to expect. We provide straightforward
            estimates, timelines, and updates throughout the project.
          </span>
        </li>
        <li className="flex gap-3">
          <Check
            className="shrink-0 text-accent mt-0.5"
            size={18}
            aria-hidden
          />
          <span>
            <span className="font-bold">Built for Long-Term Results</span> – We
            use proven materials and application methods designed to protect
            your home and maintain its appearance for years—not just months.
          </span>
        </li>
        <li className="flex gap-3">
          <Check
            className="shrink-0 text-accent mt-0.5"
            size={18}
            aria-hidden
          />
          <span>
            <span className="font-bold">Trusted by Homeowners Across DFW</span>{" "}
            – Our reputation is built on consistency, reliability, and
            delivering results our clients are proud of.
          </span>
        </li>
      </ul>

      <Button
        variant="outline"
        className="transition-all duration-200 ease-in-out sm:hover:scale-105 mt-8"
        asChild
      >
        <Link href="#contact">Get in contact</Link>
      </Button>
    </article>
  );
}
