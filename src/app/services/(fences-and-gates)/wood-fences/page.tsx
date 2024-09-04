import React from "react"
import Image from "next/image"
export default function Page() {
  return (
    <>
      <header className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl/none">
          Wood Fence Services
        </h1>
      </header>
      <section className="grid gap-5 md:grid-cols-2 ">
        <figure>
          <Image
            src="/fence.jpg"
            alt="Wood Fence"
            width={300}
            height={500}
            className="rounded-lg w-full md:max-w-[400px]"
          />
        </figure>
        <article className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
              Wood Fence Installation
            </h2>
            <p>
              We offer a wide range of wood fence installation services to meet
              your needs. We can install a new fence, replace an existing fence,
              or repair a damaged fence.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
              Wood Fence Staining
            </h2>
            <p>
              We offer a wide range of wood fence installation services to meet
              your needs. We can install a new fence, replace an existing fence,
              or repair a damaged fence.
            </p>
          </section>
        </article>
      </section>
    </>
  )
}
