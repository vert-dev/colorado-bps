"use client"
import Link from "next/link"
import { Phone } from "lucide-react"

export default function Header() {
  const scrollToMasterclass = () => {
    document.getElementById("masterclass")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Simple text instead of logo */}
        <div className="flex items-center">
          <Link href="/" className="text-lg font-bold text-slate-900 hover:text-slate-700 transition-colors">
            Colorado BPS Help
          </Link>
        </div>

        <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-6 text-sm">
          <Link href="/about" className="hover:text-primary transition-colors font-medium">
            About
          </Link>
          <Link href="/pricing" className="hover:text-primary transition-colors font-medium">
            Compliance Packages
          </Link>
        </nav>

        <div className="flex items-center">
          <a
            href="tel:+12063093936"
            className="flex items-center space-x-2 text-lg font-bold text-colorado-blue-600 hover:text-colorado-blue-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>(206) 309-3936 </span>
          </a>
        </div>
      </div>
    </header>
  )
}

export { Header }
