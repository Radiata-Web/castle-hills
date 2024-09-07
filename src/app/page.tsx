import About from "@/components/about-us";
import Hero from "@/components/hero";
import ReviewGrid from "@/components/misc/reviewGrid";
import Footer from "@/components/nav/footer";
import ServicesCards from "@/components/services-cards";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesCards />
      <ReviewGrid />
      <Footer />
    </>
  );
}
