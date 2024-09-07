import Link from "next/link"
import Socials from "@/components/ui/socials"
import {
  OUTDOOR_LIVING_SERVICES,
  FENCING_SERVICES,
  PAINTING_SERVICES,
} from "@/lib/data"

export default function Footer() {
  return (
    <footer className="py-12 flex flex-col max-w-8xl mx-auto rounded-lg">
      <section className="w-full">
        {/* Two-column section */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 mb-8 gap-4 md:gap-48">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:w-1/4">
            {/* Logo */}
            <span className="flex flex-col items-start gap-4">
              <span className="flex flex-row items-center gap-4">
                <img src="/ch-logo.svg" width={84} />
                <p className="text-xl font-bold leading-none">
                  Castle Hills <br />
                  Stain & Restoration
                </p>
              </span>

              <span>
                <p className="text-sm">
                  Fence and gate contractor serving the Dallas-Fort Worth
                  Metroplex
                </p>
              </span>
              <Socials />
            </span>
          </div>

          {/* Right Column */}
          <div className="md:w-3/4">
            <nav className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
              {/* Company */}
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/#about"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Fencing */}
              <div>
                <h3 className="font-semibold mb-2">Fence & Gate</h3>
                <ul className="space-y-1">
                  {FENCING_SERVICES.map((service) => (
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

              {/* Outdoor Living */}
              <div>
                <h3 className="font-semibold mb-2">Outdoor Living</h3>
                <ul className="space-y-1">
                  {OUTDOOR_LIVING_SERVICES.map((service) => (
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

              {/* Painting */}
              <div>
                <h3 className="font-semibold mb-2">Painting</h3>
                <ul className="space-y-1">
                  {PAINTING_SERVICES.map((service) => (
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
            &copy; 2024 Castle Hills Stain and Restoration.{" "}
            <br className="sm:hidden" /> Website by{" "}
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
      </section>
    </footer>
  )
}
