import Footer from "@/components/nav/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Castle Hills Stain & Restoration | Services",
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
      <Footer />
    </>
  )
}
