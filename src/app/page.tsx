import About from "@/components/about-us";
import Hero from "@/components/hero";
import Footer from "@/components/nav/footer";
import ServicesCards from "@/components/services-cards";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
        What can we do for you?
      </h2>
      <ServicesCards />
      <Footer />
    </>
  );
}
