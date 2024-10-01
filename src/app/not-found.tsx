import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">
        Oops! The page you're looking for doesn't exist.
      </h1>
      <p className="text-xl mb-8">Error 404</p>
      <Link href="/" passHref>
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
