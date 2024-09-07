import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import Navbar from "@/components/nav/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Castle Hills Stain & Restoration | DFW",
  description:
    "Wood installation, wood restoration, wood stain, and property painting services in the Dallas-Ft. Worth area.",
  robots: {
    index: false,
    nocache: true,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Navbar />
        <main className="max-w-8xl mx-auto px-4 pt-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
      <GoogleAnalytics gaId="G-N53ZFX5V5H" />
    </html>
  )
}
