import ServiceDesc from "@/components/misc/serviceDesc"
import Suppliers from "@/components/misc/suppliers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pergolas & Patio Covers | Castle Hills Stain & Restoration",
  description:
    "Pergola and patio installation and staining services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Pergolas & Patio Covers
        </h1>
        <p className="text-zinc-600">
          Arbor, pergola, and patio installation and staining services in the
          Dallas-Fort Worth Metroplex.
        </p>
      </header>
      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="pergolas/pergola-6"
          imageAlt="Dark brown stained wooden pergola in a home's backyard alcove, with lights strung across it and greenery beneath it"
          header="Pergola Installation & Staining"
          content="Dreaming of a stylish, shaded retreat in your backyard? A custom pergola can transform your outdoor space into the perfect spot for relaxation and entertaining. Our expert pergola installation and staining services deliver both beauty and durability, with high-quality craftsmanship and a rich stain that protects and enhances the wood’s natural charm."
        />
        <ServiceDesc
          imagePosition="right"
          image="patio-cover"
          imageAlt="Bright acacia-colored patio cover attached to the back of a brick house"
          header="Patio Cover Installation"
          content="A custom patio cover can provide the perfect shelter, allowing you to enjoy your outdoor space year-round. Our patio cover installation service offers stylish, durable designs that not only provide shade and weather protection but also enhance your home's curb appeal. Imagine relaxing under your patio cover, shielded from the elements while still enjoying the fresh air."
        />

        <Suppliers />
      </section>
    </>
  )
}
