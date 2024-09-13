import ServiceDesc from "@/components/misc/serviceDesc"
import Suppliers from "@/components/misc/suppliers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Arbors & Pergolas | Castle Hills Stain & Restoration",
  description:
    "Arbor & pergola installation and staining services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Arbors & Pergolas
        </h1>
        <p className="text-zinc-600">
          Arbor & pergola installation and staining services in the Dallas-Fort
          Worth Metroplex.
        </p>
      </header>
      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="arbors/arbor-1"
          imageAlt="Orange-brown arbor attached to house with green plants at its base, against a blue sky"
          header="Arbor Installation & Staining"
          content="Looking to add a beautiful focal point to your backyard? An expertly crafted arbors can instantly elevate your outdoor space, creating a charming, shaded area for relaxation or entertaining. Our arbor installation and staining services provide not only sturdy, elegant structures but also premium staining to enhance and protect the wood’s natural beauty."
        />
        <ServiceDesc
          imagePosition="right"
          image="pergolas/pergola-6"
          imageAlt="Dark brown stained wooden pergola in a home's backyard alcove, with lights strung across it and greenery beneath it"
          header="Pergola Installation & Staining"
          content="Dreaming of a stylish, shaded retreat in your backyard? A custom pergola can transform your outdoor space into the perfect spot for relaxation and entertaining. Our expert pergola installation and staining services deliver both beauty and durability, with high-quality craftsmanship and a rich stain that protects and enhances the wood’s natural charm."
        />

        <Suppliers />
      </section>
    </>
  )
}
