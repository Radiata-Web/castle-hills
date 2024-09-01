import Link from "next/link"
import Socials from "@/components/ui/socials"

export default function Footer() {
  return (
    <footer className="bg-muted max-w-7xl mx-auto py-12">
      <div className="container mx-auto">
        {/* Two-column section */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 mb-8">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:w-1/2">
            <div className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-xl font-bold">Company Name</span>
            </div>
            <address className="text-sm text-muted-foreground not-italic">
              <p>123 Business Street</p>
              <p>Cityville, State 12345</p>
            </address>
            <Socials />
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
                      Careers
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
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Support
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
            &copy; 2023 Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
