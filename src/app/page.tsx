import About from "@/components/about-us";
import Hero from "@/components/hero";
import InteriorContact from "@/components/misc/interior-contact";
import ReviewGrid from "@/components/misc/reviewGrid";
import Footer from "@/components/nav/footer";
import ServicesCards from "@/components/services-cards";
import Masonry from "@/components/misc/masonry";
import Expertise from "@/components/expertise";
import CertificationBanner from "@/components/misc/certification-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <About />
      <CertificationBanner />
      <ServicesCards />
      <Masonry />
      <ReviewGrid />
      <InteriorContact />
      <Footer />
    </>
  );
}
