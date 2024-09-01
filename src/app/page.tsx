import About from "@/components/about-us";
import { ContactForm } from "@/components/forms/contact-form";
import Hero from "@/components/hero";
import ServicesCards from "@/components/services-cards";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesCards />
      <ContactForm />
    </>
  );
}
