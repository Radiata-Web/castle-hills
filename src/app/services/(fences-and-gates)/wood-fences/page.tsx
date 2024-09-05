import React from "react"
import Image from "next/image"
export default function Page() {
  return (
    <>
      <header className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl/none">
          Professional Wood Fence Services
        </h1>
      </header>
      <section className="grid gap-5 lg:grid-cols-2 ">
        {/* <figure>
          <Image
            src="/fence.jpg"
            alt="Wood Fence"
            width={150}
            height={500}
            className="rounded-lg w-full md:max-w-[300px]"
          />
        </figure> */}
        <article className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
              Wood Fence Installation
            </h2>
            <section className="space-y-4">
              <p>
                Are you ready to transform your outdoor space into a
                masterpiece? Our expert wood fence installation and staining
                services are designed to deliver unparalleled beauty and
                durability to your property. Imagine a stunning wood fence that
                not only enhances your home’s curb appeal but also stands strong
                and resilient against the elements.
              </p>
              <p>
                Our comprehensive service includes professional fence
                installation with high-quality materials, ensuring a robust and
                visually appealing result. But we don’t stop there—our premium
                staining service enhances the natural beauty of your wood,
                protecting it from weathering and UV damage while adding a rich,
                long-lasting finish. This two-step process ensures your fence
                looks beautiful and maintains its integrity for years to come.
              </p>
              <p>
                Picture your property with a newly installed and stained wood
                fence: a refined and secure space that adds character and
                elegance to your home. It’s not just a fence; it’s a lasting
                investment in your property’s aesthetic and value.
              </p>
            </section>
          </section>
          <section>
            <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
              Wood Fence Staining
            </h2>
            <section className="space-y-4">
              <p>
                Is your current fence looking weathered or worn? Our
                professional fence staining services are the perfect solution to
                breathe new life into your existing structure. Using top-quality
                stains and sealants, we can restore your fence’s original beauty
                while offering enhanced protection against the elements.
              </p>
              <p>
                Our skilled team will carefully prepare and apply the stain,
                ensuring an even, long-lasting finish that revitalizes your
                fence's appearance and extends its lifespan. Don’t let your
                fence lose its charm—contact us today to schedule your staining
                service and give your fence a fresh, vibrant look that will make
                your property shine.
              </p>
            </section>
          </section>
        </article>
      </section>
    </>
  )
}
