import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Acme Corporation
            </h1>
            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
              We're a cutting-edge technology company dedicated to innovating
              solutions that make your life easier. Our team of experts is
              passionate about creating products that transform industries.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 min-[400px]:flex-row">
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button variant={"ghost"} className="gap-1">
              See our services <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-center justify-center">
          <Image
            alt="Placeholder image"
            className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
            height="400"
            src="/next.svg"
            width="600"
            priority
          />
        </div>
      </div>
    </section>
  );
}
