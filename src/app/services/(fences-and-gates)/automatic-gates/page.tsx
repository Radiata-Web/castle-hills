import ServiceDesc from "@/components/misc/serviceDesc"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automatic Gates | Castle Hills Stain & Restoration",
  description:
    "Automatic gate installation services in the Dallas-Fort Worth Metroplex.",
}

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
          image="gates/gate-1"
          imageAlt="Deep brown stained wooden automatic gate along a brown wooden fence on a driveway"
          header="Automatic Wooden Gates"
          content="Tired of manually opening your gate every time you come home? An automatic gate can provide both convenience and enhanced security for your property. Our automatic gate installation service offers seamless operation, durable materials, and customizable designs to fit your style. Imagine pulling up to your home, pressing a button, and watching your gate glide open effortlessly—adding both ease and sophistication to your daily routine."
        />
        <ServiceDesc
          imagePosition="right"
          image="gates/gate-2"
          imageAlt="Black wrought iron automatic gate with elegant design attached to stone walls"
          header="Automatic Metal Gates"
          content="An automatic metal gate can offer both convenience and peace of mind. Our installation service provides sturdy, stylish gates with the latest automation technology for seamless operation. Picture yourself driving up to a gate that opens effortlessly with a touch, offering both protection and a sleek modern look that enhances your property’s value."
        />
      </section>
    </>
  )
}
