import ServiceDesc from "@/components/misc/serviceDesc"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interior Painting | Castle Hills Stain & Restoration",
  description: "Interior painting services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Interior Painting Services
        </h1>
        <p className="text-zinc-600">
          Expert interior painting services in the Dallas-Fort Worth Metroplex.
        </p>
      </header>

      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="paint/in-paint-2"
          imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
          header="Interior Painting"
          content="A professionally done interior paint job can instantly transform any room, adding color, warmth, and personality. Our expert interior painting services offer precision, high-quality paints, and a flawless finish, giving your home the makeover it deserves. Imagine walking into a space that feels brighter, fresher, and more inviting—reflecting your style perfectly."
        />
      </section>
    </>
  )
}
