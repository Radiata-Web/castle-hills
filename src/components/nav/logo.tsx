import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex-shrink-0 flex items-center">
      <img src="/ch-logo.svg" width={50} />
      <span className="ml-2 text-xl font-bold hidden md:block md:text-sm lg:text-lg">
        Castle Hills Stain & Restoration
      </span>
    </Link>
  );
}
