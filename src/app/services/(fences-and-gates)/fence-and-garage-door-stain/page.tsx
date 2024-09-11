import ServiceDesc from "@/components/misc/serviceDesc"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wood Staining | Castle Hills Stain & Restoration",
  description:
    "Fence and garage door staining services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Wood Staining Services
        </h1>
        <p className="text-zinc-600">
          Professional wood fence and garage door staining services in the
          Dallas-Fort Worth Metroplex.
        </p>
      </header>

      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="stain/stain-2"
          imageAlt="Dark brown stained wooden fence in a residential backyard"
          header="Fence Staining"
          content="Is your current fence looking weathered or worn? Our professional fence staining services are the perfect solution to breathe new life into your existing structure. Using top-quality stains and sealants, we can restore your fence’s original beauty while offering enhanced protection against the elements. Our skilled team will carefully prepare and apply the stain, ensuring an even, long-lasting finish that revitalizes your fence's appearance and extends its lifespan."
        />
        <ServiceDesc
          imagePosition="right"
          image="garages/garage-1"
          imageAlt="Dark gray stained wooden garage door on brick house"
          header="Garage Door Stain & Seal"
          content="Is your garage door looking dull or weathered? A fresh stain and seal can restore its beauty and protect it from harsh elements. Our garage door stain & seal service enhances the natural grain of your wood, adding richness and depth while creating a protective barrier against moisture, UV rays, and wear. Imagine pulling up to your home and seeing a garage door that looks brand new, adding curb appeal and lasting durability."
        />
      </section>
    </>
  )
}
