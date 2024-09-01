"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBanner from "@/components/nav/nav-banner";
import Logo from "@/components/nav/logo";
import { DropdownNavLink, NavLink } from "./nav-link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Automatically populates desktop menus, remember to manually populate mobile menu at the bottom
  const NAV_LINKS = [
    {
      name: "Home",
      path: "/",
      subpages: [],
    },
    {
      name: "About",
      path: "/#about",
      subpages: [],
    },
    {
      name: "Services",
      path: "/services",
      subpages: [
        {
          name: "Service 1",
          path: "/services/service-one",
        },
        {
          name: "Service 2",
          path: "/services/service-two",
        },
      ],
    },
  ];

  // Close mobile menu when a page is tapped
  const handleMenuState = (value: boolean) => {
    setIsMenuOpen(value);
  };

  return (
    <nav className="sticky top-0 z-10 bg-background shadow-md">
      {/* Optional top banner for socials, a service area blurb, and a phone number */}
      <NavBanner />

      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row">
            {/* Logo and text */}
            <Logo onStateChange={handleMenuState} />

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Render regular or dropdown links */}
                {NAV_LINKS.map((link) =>
                  link.subpages.length > 1 ? (
                    <DropdownNavLink
                      name={link.name}
                      subpages={link.subpages}
                      key={link.name}
                    />
                  ) : (
                    <NavLink
                      name={link.name}
                      path={link.path}
                      key={link.name}
                      onStateChange={handleMenuState}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Me button */}
          <div className="hidden md:block">
            <Button className="transition-all duration-200 ease-in-out sm:hover:scale-105">
              Contact Me
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500 transition-all duration-200 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X
                  className="block h-6 w-6 transition-transform duration-200 rotate-90"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="block h-6 w-6 transition-transform duration-200"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link) =>
            link.subpages.length === 0 ? (
              <NavLink
                key={link.name}
                name={link.name}
                path={link.path}
                onStateChange={handleMenuState}
              />
            ) : null
          )}
          <div>
            {/* Services */}
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out w-full text-left flex justify-between items-center"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isMobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMobileServicesOpen ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="pl-4 space-y-1">
                <Link
                  href="/services/service-one"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
                >
                  Service One
                </Link>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4 transition-all duration-200 ease-in-out hover:scale-105">
            Contact Me
          </Button>
        </div>
      </div>
    </nav>
  );
}
