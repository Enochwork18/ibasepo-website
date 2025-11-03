// Admin dashboard sidebar navigation
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { authService } from "@/lib/auth"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  Images,
  Calendar,
  Mail,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Blog", href: "/admin/blog" },
  { icon: Briefcase, label: "Services", href: "/admin/services" },
  { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Images, label: "Gallery", href: "/admin/gallery" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: Mail, label: "Subscribers", href: "/admin/subscribers" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    router.push("/admin/login")
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">Ìbáṣepọ̀</h1>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3 border-t">
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
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileOpen(false)} />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-background border-r transform transition-transform md:translate-x-0 z-40 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  )
}
