import Footer from "@/components/nav/footer";
import { Metadata } from "next";
import InteriorContact from "@/components/misc/interior-contact";
export const metadata: Metadata = {
  title: "Services | Castle Hills Stain & Restoration",
  description:
    "Fence staining, gates, outdoor structures, and professional painting services in the Dallas–Fort Worth area.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mt-12">
        {children}
      </section>
      <InteriorContact />
      <Footer />
    </>
  );
}
