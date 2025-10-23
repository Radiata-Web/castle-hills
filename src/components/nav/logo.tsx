import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex-shrink-0 flex items-center">
      <Image
        src="/logos/ch-logo.svg"
        width={50}
        height={50}
        alt="Castle Hills Stain & Restoration Logo"
        priority
      />
      <span className="ml-2 text-sm font-bold leading-none">
        Castle Hills <br /> Stain & Restoration
      </span>
    </Link>
  );
}
