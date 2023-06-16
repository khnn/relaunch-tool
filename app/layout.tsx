import "./globals.css"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Relaunch Tool",
  description: "Tool to plan and observe a relaunch of a website.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="hidden font-bold sm:inline-block">
                  khnn/relaunch-tool
                </span>
              </a>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="/path-checker"
                >
                  Path checker
                </Link>
                <Link
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="/wp-mdx"
                >
                  Convert WP to MDX
                </Link>
                {/* <Link
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="/techstack-finder"
                >
                  Techstack finder
                </Link> */}
              </nav>
            </div>
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
