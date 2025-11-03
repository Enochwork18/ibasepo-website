"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
    { href: "/gallery", label: "Gallery" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-UvGELUmfYC6xhEalSWSKQ00v5L5tdL.jpg"
              alt="Ìbáṣepọ̀ Logo"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="font-bold text-primary hidden sm:inline text-lg">Ìbáṣepọ̀</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <Link href="/booking">
              <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                Book Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition-all ${
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking" className="block px-4 py-2 pt-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Book Now</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
