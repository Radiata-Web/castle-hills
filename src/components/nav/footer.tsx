import Link from "next/link";
import Socials from "@/components/ui/socials";
import { HOMEPAGE_FEATURED_SERVICES } from "@/lib/data";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 flex flex-col max-w-8xl mx-auto rounded-lg px-4 md:px-8 lg:px-8">
      <section className="w-full">
        {/* Two-column section */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 mb-8 gap-4 md:gap-48">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:w-1/4">
            {/* Logo */}
            <span className="flex flex-col items-start gap-4">
              <Image
                src="/logos/logo-wordmark.svg"
                width={300}
                height={84}
                alt="Castle Hills Stain & Restoration Logo"
                loading="lazy"
                className="mb-2"
              />

              <span className="min-w-full">
                <p className="text-sm">
                  Proudly serving Castle Hills, Flower Mound, Southlake, Frisco,
                  and surrounding areas.
                </p>
              </span>
              <Socials />
            </span>
          </div>

          {/* Right Column */}
          <div className="md:w-3/4">
            <nav className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-3">
              {/* Company */}
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/#about"
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#services"
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Services</h3>
                <ul className="space-y-1">
                  {HOMEPAGE_FEATURED_SERVICES.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="text-sm text-muted-foreground hover:text-primary hover:underline"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Trusted Vendors</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-1">
                    <Link href="https://www.zebrajunkremoval.net/" target="_blank" className="text-sm text-muted-foreground hover:text-primary hover:underline flex items-center gap-1">Zebra Junk Removal <ExternalLink size={12} /></Link>
                  </li>
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
            &copy; {new Date().getFullYear()} Castle Hills Stain and Restoration
            LLC. <br className="sm:hidden" /> Website by{" "}
            <Link
              href="https://radiataweb.com"
              target="_blank"
              className="text-accent"
            >
              Radiata Web
            </Link>
            .
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Sherwin-Williams Emerald&reg; and Sherwin-Williams Duration&reg; are
            registered trademarks of The Sherwin-Williams Company. Romabio
            Classico Limewash&reg; is a registered trademark of Romabio Paints,
            LLC.
          </p>
        </div>
      </section>
    </footer>
  );
}
