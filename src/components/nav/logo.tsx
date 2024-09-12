import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex-shrink-0 flex items-center">
      <img src="/logos/ch-logo.svg" width={50} />
      <span className="ml-2 text-sm font-bold leading-none">
        Castle Hills <br /> Stain & Restoration
      </span>
    </Link>
  )
}
