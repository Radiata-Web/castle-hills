import Link from "next/link";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex-shrink-0 flex items-center ${className}`}>
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
