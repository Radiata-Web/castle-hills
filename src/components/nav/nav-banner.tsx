import Socials from "@/components/ui/socials";
import { MapPin, Phone } from "lucide-react";

export default function NavBanner() {
  return (
    <div className="bg-background border-b md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <Socials />

        <div className="flex flex-row text-sm">
          {/* Service area */}
          <div className="flex-row items-center gap-1 pr-5 border-r-2 border-r-accent-light hidden sm:flex">
            <MapPin size={15} />
            {/* Link to Google Maps page */}
            <a href="#">Based in Dallas, TX. Serving a specific area.</a>
          </div>

          {/* Contact phone number */}
          <div className="flex flex-row items-center gap-1 pl-5">
            <Phone size={15} />
            <a href="phone:4691111111">(469) 111-1111</a>
          </div>
        </div>
      </div>
    </div>
  );
}
