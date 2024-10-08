import Footer from "@/components/nav/footer"
import { Metadata } from "next"
import InteriorContact from "@/components/misc/interior-contact"
export const metadata: Metadata = {
  title: "Services | Castle Hills Stain & Restoration",
  description:
    "Wood installation, wood restoration, wood stain, and property painting services in the Dallas-Ft. Worth area.",
}

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <section className="mt-12">{children}</section>
      <InteriorContact />
      <Footer />
    </>
  )
}
