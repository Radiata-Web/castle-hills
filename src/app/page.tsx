import { ContactForm } from "@/components/forms/contact-form";
import Hero from "@/components/hero";
import Packages from "@/components/packages";
import ServicesCards from "@/components/services-cards";
import Services from "@/components/services-simple";

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <ServicesCards />
      <ContactForm />
    </>
  );
}
