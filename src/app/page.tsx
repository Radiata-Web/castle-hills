import About from "@/components/about-us";
import Hero from "@/components/hero";
import ServicesCards from "@/components/services-cards";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesCards />
    </>
  );
}
