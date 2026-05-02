import dynamic from "next/dynamic";
import About from "@/components/about-us";
import Hero from "@/components/hero";
import ServicesCards from "@/components/services-cards";
import Expertise from "@/components/expertise";
import CertificationBanner from "@/components/misc/certification-banner";

const ReviewGrid = dynamic(() => import("@/components/misc/reviewGrid"));
const InteriorContact = dynamic(
  () => import("@/components/misc/interior-contact")
);
const Footer = dynamic(() => import("@/components/nav/footer"));

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <About />
      <CertificationBanner />
      <ServicesCards
        heading="What can we do for you?"
        paragraph="Outdoor structures, fence installation and staining, interior and exterior painting, and full restoration—we use quality materials and careful prep so results hold up in North Texas."
      />
      {/* <Masonry /> */}
      <ReviewGrid />
      <InteriorContact />
      <Footer />
    </>
  );
}
