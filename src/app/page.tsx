import About from "@/components/about-us";
import Hero from "@/components/hero";
import Footer from "@/components/nav/footer";
import ServicesCards from "@/components/services-cards";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <ServicesCards />
      <Footer />
    </>
  );
}
