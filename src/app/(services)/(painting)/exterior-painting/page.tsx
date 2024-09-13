import ServiceDesc from "@/components/misc/serviceDesc"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Exterior Painting | Castle Hills Stain & Restoration",
  description: "Exterior painting services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Exterior Painting Services
        </h1>
        <p className="text-zinc-600">
          Expert exterior painting services in the Dallas-Fort Worth Metroplex.
        </p>
      </header>

      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="paint/ex-paint-2"
          imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
          header="Exterior Painting"
          content="A professional exterior paint job can completely transform your home's appearance, boosting curb appeal and protecting it from the elements. Our exterior painting services use top-quality paints and expert techniques to ensure a long-lasting, beautiful finish that enhances your home’s character. Imagine pulling up to a house that looks vibrant and refreshed, with a paint job that stands up to the harshest weather."
        />
      </section>
    </>
  )
}
