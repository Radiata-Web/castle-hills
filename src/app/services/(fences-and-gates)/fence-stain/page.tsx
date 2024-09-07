import ServiceDesc from "@/components/misc/serviceDesc"
import React from "react"

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Fence Staining Services
        </h1>
        <p className="text-zinc-600">
          Professional wood fence staining services in the Dallas-Fort Worth
          Metroplex.
        </p>
      </header>

      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="/fence.jpg"
          imageAlt="Wrought Iron Fence Installation"
          header="Fence Staining"
          content="Is your current fence looking weathered or worn? Our professional fence staining services are the perfect solution to breathe new life into your existing structure. Using top-quality stains and sealants, we can restore your fence’s original beauty while offering enhanced protection against the elements. Our skilled team will carefully prepare and apply the stain, ensuring an even, long-lasting finish that revitalizes your fence's appearance and extends its lifespan. Don’t let your fence lose its charm—contact us today to schedule your staining service and give your fence a fresh, vibrant look that will make your property shine."
        />
      </section>
    </>
  )
}
