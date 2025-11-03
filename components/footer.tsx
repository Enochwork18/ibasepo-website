import Link from "next/link"
import { Mail, Phone, Instagram, Facebook } from "lucide-react"
import { getSettings } from "@/lib/api"
import Image from "next/image"

export async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-UvGELUmfYC6xhEalSWSKQ00v5L5tdL.jpg"
                alt="Ìbáṣepọ̀ Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <h3 className="font-bold text-lg">Ìbáṣepọ̀</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">{settings.businessTagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-75 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:opacity-75 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:opacity-75 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-75 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gallery" className="hover:opacity-75 transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:opacity-75 transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-75 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-75 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${settings.businessEmail}`} className="hover:opacity-75 transition">
                  {settings.businessEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${settings.businessPhone}`} className="hover:opacity-75 transition">
                  {settings.businessPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-75">© 2025 Ìbáṣepọ̀. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {settings.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition"
              >
                <Instagram size={20} />
              </a>
            )}
            {settings.socialLinks?.facebook && (
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition"
              >
                <Facebook size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
