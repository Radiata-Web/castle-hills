import ServiceDesc from "@/components/misc/serviceDesc"

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Automatic Gates
        </h1>
        <p className="text-zinc-600">
          Automatic gate installation services in the Dallas-Fort Worth
          Metroplex.
        </p>
      </header>
      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="/fence.jpg"
          imageAlt="Wood Fence Installation"
          header="Transform Your Outdoor Space"
          content="Automatic gate copy"
        />
        <ServiceDesc
          imagePosition="right"
          image="/fence.jpg"
          imageAlt="Wood Fence Staining"
          header="Enhance Your Outdoor Living"
          content="Automatic gate copy"
        />
      </section>
    </>
  )
}
