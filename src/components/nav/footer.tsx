import Link from "next/link";
import Socials from "@/components/ui/socials";
import { ALL_SERVICES } from "@/lib/data";

export default function Footer() {
  const SERVICES: { title: string; href: string }[] = [
    { title: "Fence Staining", href: "fence-staining" },
    { title: "Patio Cover Staining", href: "patio-cover-staining" },
    { title: "Pergola Staining", href: "pergola-staining" },
    { title: "Fence Installation", href: "fence-installation" },
    { title: "Patio Cover Installation", href: "patio-cover-installation" },
    { title: "Pergola Installation", href: "pergola-installation" },
    { title: "Interior Painting", href: "interior-painting" },
    { title: "Exterior Painting", href: "exterior-painting" },
  ];

  return (
    <footer className="bg-muted max-w-8xl mx-auto py-12">
      <div className="container mx-auto">
        {/* Two-column section */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 mb-8">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:w-1/2">
            {/* Logo */}
            <span className="flex flex-col items-start gap-3">
              <img src="/ch-logo.svg" width={100} />
              <p className="text-xl font-bold md:block md:text-lg lg:text-xl">
                Castle Hills Stain & Restoration
              </p>
              <Socials />
            </span>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2">
            <nav className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Services</h3>
                <ul className="space-y-2">
                  {ALL_SERVICES.map((service) => (
                    <li key={service.title}>
                      <Link
                        href={`/services/${service.href}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-muted-foreground/20 my-8" />

        {/* Copyright section */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Castle Hills Stain and Restoration. Website by{" "}
            <Link
              href="https://radiataweb.com"
              target="_blank"
              className="text-accent"
            >
              Radiata Web
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
