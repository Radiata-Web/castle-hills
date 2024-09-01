import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "./forms/contact-form";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Castle Hills Stain & Restoration
            </h1>
            <p className="max-w-[600px] text-zinc-600 md:text-xl">
              Wood staining, fence installation, and property painting company
              serving the Dallas-Ft. Worth area!
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 min-[400px]:flex-row">
            <Button asChild>
              <Link href="/contact">Get a free estimate</Link>
            </Button>
            <Button variant="ghost" className="gap-1">
              See what we offer <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-center justify-center">
          <article className="bg-white border border-zinc-200 p-6 rounded-xl shadow-lg">
            <ContactForm />
          </article>
        </div>
      </div>
    </section>
  );
}
