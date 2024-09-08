import ServiceDesc from "@/components/misc/serviceDesc"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Metal Fences | Castle Hills Stain & Restoration",
  description:
    "Metal fence installation and painting services in the Dallas-Fort Worth Metroplex.",
}

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Metal Fence Services
        </h1>
        <p className="text-zinc-600">
          Professional wrought iron fence installation and painting services in
          the Dallas-Fort Worth Metroplex.
        </p>
      </header>
      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="/fence.jpg"
          imageAlt="Wrought Iron Fence Installation"
          header="Wrought Iron Fence Installation"
          content="Looking to add security, style, and value to your property? Our expert wrought iron fence installation service combines strength, elegance, and durability to create a lasting statement for your home or business. From classic designs to modern styles, we tailor each fence to your vision, ensuring a perfect fit and flawless finish. Imagine your property framed by a beautiful, sturdy fence that enhances your curb appeal while providing peace of mind."
        />
        <ServiceDesc
          imagePosition="right"
          image="/fence.jpg"
          imageAlt="Fence"
          header="Wrought Iron Fence Painting"
          content="Is your wrought iron fence looking rusty or faded? Don’t let it ruin your property’s curb appeal! Our specialized painting service can make your fence look brand new while protecting it from the elements. We use top-grade rust-resistant paints and meticulous techniques to ensure a flawless, long-lasting finish, whether you prefer classic black or bold new colors. Imagine your fence gleaming in the sunlight, enhancing your home’s exterior with no more worries about rust or peeling paint."
        />
      </section>
    </>
  )
}
