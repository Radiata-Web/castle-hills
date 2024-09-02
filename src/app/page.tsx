import About from "@/components/about-us";
import Hero from "@/components/hero";
import ServicesCards from "@/components/services-cards";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex h-64 bg-hero bg-contain bg-right rounded-xl mb-10"></div>
      <Hero />

      <About />
      <ServicesCards />
    </>
  );
}
