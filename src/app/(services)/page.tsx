import ServicesCards from "@/components/services-cards";

export default function Page() {
  return (
    <>
      <section className="my-16">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Our Services
        </h1>
        <ServicesCards />
      </section>
    </>
  );
}
