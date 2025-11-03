"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, BookOpen, User, LogOut, Menu, X } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const token = authService.getToken()
    if (!token || token.role !== "Client") {
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    authService.logout()
    router.push("/auth/login")
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings" },
    { icon: BookOpen, label: "Resources", href: "/dashboard/resources" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed md:static w-64 h-screen bg-background border-r transform transition-transform md:translate-x-0 z-40 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">Ìbáṣepọ̀</h1>
          <p className="text-xs text-muted-foreground">Client Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setIsMobileOpen(false)}>
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6">
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2">
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="ml-auto text-right text-sm">
            <p className="font-medium">Welcome back</p>
            <p className="text-xs text-muted-foreground">Client Account</p>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsMobileOpen(false)} />
      )}
    </div>
  )
}
