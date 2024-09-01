import Link from "next/link"

export interface LogoProps {
  onStateChange: Function
}

export default function Logo(props: LogoProps) {
  return (
    <Link
      href="/"
      className="flex-shrink-0 flex items-center"
      onClick={() => props.onStateChange(false)}
    >
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
      <span className="ml-2 text-xl font-bold">Logo Text</span>
    </Link>
  )
}
