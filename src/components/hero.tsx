import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Check, MoveRight } from "lucide-react"
import { ContactForm } from "./forms/contact-form"

export default function Hero() {
  return (
    <section id="hero" className="py-12 md:py-24 lg:py-32 xl:py-38">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left column */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Revitalize Your Home & Outdoor Spaces
            </h1>
            <p className="max-w-[600px] text-zinc-600 md:text-xl">
              From fence staining to interior painting, we bring your vision to
              life with expert craftsmanship. Get a free estimate today and
              let’s start transforming your home.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 min-[400px]:flex-row items-center">
            <Button asChild>
              <Link href="/contact">
                See what we do <MoveRight className="ml-2" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          {/* Provlems to solve */}
          <div>
            <ul className="space-y-2 text-sm">
              <li className="flex flex-row items-center gap-2 text-zinc-700">
                <Check className="text-accent" />
                Protect your investment from fading and wear
              </li>
              <li className="flex flex-row items-center gap-2 text-zinc-700">
                <Check className="text-accent" />
                Bring your home together with stunning colors
              </li>
              <li className="flex flex-row items-center gap-2 text-zinc-700">
                <Check className="text-accent" />
                Provide a beautiful centerpiece for your home
              </li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="flex justify-center lg:justify-end">
          <article className="w-full bg-white border border-zinc-200 p-6 rounded-xl shadow-lg lg:max-w-[600px]">
            <ContactForm showHeader={true} />
          </article>
        </div>
      </div>
    </section>
  )
}
