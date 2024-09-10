import ServiceDesc from "@/components/misc/serviceDesc"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wooden Fences | Castle Hills Stain & Restoration",
  description:
    "Wooden fence staining and sealing services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Wood Fence Services
        </h1>
        <p className="text-zinc-600">
          Professional wood fence installation and staining services in the
          Dallas-Fort Worth Metroplex.
        </p>
      </header>
      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="fences/wood/fence-3"
          imageAlt="Unstained wooden fence in a residential backyard from the sidewalk"
          header="Wood Fence Installation"
          content="Looking to enhance your property’s curb appeal and privacy? A beautifully installed wood fence can do just that, adding both charm and security to your home. Our wood fence installation service uses top-quality materials and skilled craftsmanship to create a durable, aesthetically pleasing barrier that stands up to the elements. Imagine your yard framed by a stunning wood fence that complements your landscape and boosts your home’s value."
        />
        <ServiceDesc
          imagePosition="right"
          image="fences/wood/fence-4"
          imageAlt="Brown stained wooden fence in a residential alleyway"
          header="Wood Fence Staining"
          content="Is your current fence looking weathered or worn? Our professional fence staining services are the perfect solution to breathe new life into your existing structure. Using top-quality stains and sealants, we can restore your fence’s original beauty while offering enhanced protection against the elements. We will carefully prepare and apply the stain, ensuring an even, long-lasting finish that revitalizes your fence's appearance and extends its lifespan."
        />
      </section>
    </>
  )
}
