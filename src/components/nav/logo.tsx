import { Link } from "@tanstack/react-router";
import Image from "@/components/ui/optimized-image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={`flex-shrink-0 flex items-center ${className}`}>
      <Image
        src="/logos/logo-wordmark.svg"
        width={200}
        height={100}
        alt="Castle Hills Stain & Restoration Logo"
        priority
      />
    </Link>
  );
}
