import React from "react";
import Image from "next/image";

export default function CertificationBanner() {
  return (
    <section className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
      <div className="mb-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none mb-4">
          Certified for Excellence
        </h2>
        <p className="text-zinc-600">
          Professional certifications and advanced training are actively being
          completed to elevate our craftsmanship and expertise. We are committed
          to providing the highest level of service and quality to our clients.
          We're PCA certified and have a proud BBB A+ rating.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:space-x-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 md:gap-8 w-full items-center">
          <div className="justify-self-center md:justify-self-start">
            <Image
              src="/logos/bbb-rating.jpg"
              alt="BBB A+ Rating"
              width={300}
              height={200}
              className="h-auto"
            />
          </div>
          <div className="justify-self-center md:justify-self-center">
            <Image
              src="/logos/pca-contractor.png"
              alt="Painting contractors association - accredited contractor"
              width={100}
              height={100}
              className="h-auto"
            />
          </div>
          <div className="justify-self-center md:justify-self-end">
            <Image
              src="/logos/afa.png"
              alt="ABC Accredited Company"
              width={300}
              height={100}
              className="h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
