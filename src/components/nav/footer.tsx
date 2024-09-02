import Link from "next/link";
import Socials from "@/components/ui/socials";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-muted max-w-7xl mx-auto py-12">
      <div className="container mx-auto">
        {/* Two-column section */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 mb-8">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:w-1/2">
            {/* Logo */}
            <span className="flex flex-col items-center gap-3 md:items-start">
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
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Fence Staining
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Fence Installation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Exterior Painting
                    </Link>
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
            &copy; 2024 Castle Hills Stain and Restoration. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
