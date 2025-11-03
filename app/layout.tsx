import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Ìbáṣepọ̀ – Connected Hearts Coaching & Consultancy",
  description:
    "Guiding families toward peace, purpose, and legacy. Coaching and consultancy blending faith, cultural wisdom, and practical strategies.",
  generator: "v0.app",
  openGraph: {
    title: "Ìbáṣepọ̀ – Connected Hearts",
    description: "Guiding families toward peace, purpose, and legacy",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
