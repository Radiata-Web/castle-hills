import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, MoveRight } from "lucide-react";
import { ContactForm } from "./forms/contact-form";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-cover bg-center bg-no-repeat bg-opacity-80 bg-black"
      style={{
        backgroundImage:
          "url('https://raw.githubusercontent.com/Radiata-Web/castle-hills/refs/heads/main/public/photos/gates/gate-1.webp')",
      }}
    >
      <div className="bg-gradient-to-r from-black/80 to-black/20">
        <div className="max-w-8xl mx-auto grid gap-12 px-4 md:px-8 lg:px-8 py-12 md:py-24 lg:py-32 xl:py-38 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Revitalize Your Home & Outdoor Spaces
              </h1>
              <p className="max-w-[600px] text-zinc-100 md:text-lg">
                From fence staining to interior painting, we bring your vision
                to life with expert craftsmanship. Get a free estimate today and
                let’s start transforming your home.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-2 min-[400px]:flex-row items-center">
              <Button
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/#services">
                  See what we do{" "}
                  <MoveRight className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>

            {/* Provlems to solve */}
            <div>
              <ul className="space-y-2 text-sm">
                <li className="flex flex-row items-center gap-2 text-zinc-100">
                  <Check className="text-blue-400" />
                  Protect your investment from fading and wear
                </li>
                <li className="flex flex-row items-center gap-2 text-zinc-100">
                  <Check className="text-blue-400" />
                  Bring your home together with stunning colors
                </li>
                <li className="flex flex-row items-center gap-2 text-zinc-100">
                  <Check className="text-blue-400" />
                  Provide a beautiful centerpiece for your home
                </li>
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="flex justify-center lg:justify-end">
            <article className="w-full bg-white border border-zinc-200 p-6 rounded-xl shadow-xl lg:max-w-[600px]">
              <ContactForm showHeader={true} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
