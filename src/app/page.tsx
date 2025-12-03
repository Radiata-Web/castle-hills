import About from "@/components/about-us";
import Hero from "@/components/hero";
import InteriorContact from "@/components/misc/interior-contact";
import ReviewGrid from "@/components/misc/reviewGrid";
import Footer from "@/components/nav/footer";
import ServicesCards from "@/components/services-cards";
import Expertise from "@/components/expertise";
import CertificationBanner from "@/components/misc/certification-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <About />
      <CertificationBanner />
      <ServicesCards
        heading="What can we do for you?"
        paragraph="Our comprehensive services cover all your needs—whether it's giving your fence a fresh, protective stain, expertly installing a stunning gazebo, or rejuvenating your home's interior and exterior with professional painting. We use only top-quality materials to ensure your property not only looks amazing but also stands the test of time."
      />
      {/* <Masonry /> */}
      <ReviewGrid />
      <InteriorContact />
      <Footer />
    </>
  );
}
