import React from "react"
import Image from "next/image"
import ServiceDesc from "@/components/misc/serviceDesc"
export default function Page() {
  return (
    <>
      <header className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl/none">
          Expert Metal Fence Services
        </h1>
      </header>
      <section>
        <ServiceDesc
          imagePosition="right"
          image="/fence.jpg"
          imageAlt="Wrought Iron Fence Installation"
          header="Wrought Iron Fence Installation"
          content="Looking to add security, style, and value to your property? Our expert wrought iron fence installation service combines strength, elegance, and durability to create a lasting statement for your home or business. From classic designs to modern styles, we tailor each fence to your vision, ensuring a perfect fit and flawless finish. Imagine your property framed by a beautiful, sturdy fence that enhances your curb appeal while providing peace of mind. Ready to elevate your space? Contact us today for a free consultation and get the fence your property deserves!"
        />
      </section>
    </>
  )
}
