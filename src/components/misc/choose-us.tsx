import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChooseUs() {
  return (
    <article className="p-12 bg-zinc-100 rounded-lg border border-zinc-200 my-24">
      <div className="flex-shrink-0 flex items-center">
        <Image
          src="/logos/ch-logo.svg"
          width={50}
          height={50}
          alt="Castle Hills Stain & Restoration Logo"
          loading="lazy"
        />
        <span className="ml-2 text-sm font-bold leading-none">
          Castle Hills <br /> Stain & Restoration
        </span>
      </div>
      <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4 mt-8">
        Why Homeowners Choose Us
      </h2>
      <p className="text-zinc-600 mb-4">
        Whether you need a small repair or a complete home transformation, we’d
        love to help bring your vision to life.
      </p>
      <ul className="list-disc ml-6 text-zinc-600">
        <li>
          <span className="font-bold">One Contractor for the Entire Job</span> –
          No juggling 5 trades. We manage everything—roofing, painting,
          flooring, cabinets, electrical, plumbing, and more.
        </li>
        <li>
          <span className="font-bold">
            Quality, Communication, and Cleanliness
          </span>{" "}
          – We treat your home like ours. Respectful crews, daily updates, and a
          spotless workspace.
        </li>
        <li>
          <span className="font-bold">Custom, Not Cookie Cutter</span> – Every
          home is different. We match existing finishes, blend new with old, and
          design around your style and budget.
        </li>
        <li>
          <span className="font-bold">Five-Star Reputation</span> – Trusted by
          homeowners for delivering premium results with honesty and
          professionalism.
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
