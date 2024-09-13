import { ContactForm } from "@/components/forms/contact-form"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Get an Estimate | Castle Hills Stain & Restoration",
  description: "Get a free estimate for your next home improvement project.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12 mt-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Contact Us
        </h1>
        <p className="text-zinc-600">
          Looking to get an estimate for a home improvement project? Look no
          further! Reach out to us now and we'll get back to you as soon as
          possible!
        </p>
      </header>

      <article className="flex flex-col rounded-lg md:flex-row items-center gap-4 shadow-lg border border-zinc-100 md:gap-10 lg:gap-14">
        <section className="w-full md:w-1/2 p-6 md:p-8">
          <ContactForm showHeader={false} />
        </section>
        {/* Service Image */}
        <figure className="max-h-[475px] w-full md:w-1/2 overflow-hidden items-center rounded-r-lg">
          <Image
            src={`/photos/stain/stain-2.webp`}
            alt="Dark brown stained wooden fence in a residential backyard"
            width={1000}
            height={1000}
            className="min-w-full md:max-w-[250px]"
          />
        </figure>
      </article>
    </>
  )
}
