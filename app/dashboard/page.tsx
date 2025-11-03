"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBookings, getServices, getBlogPosts } from "@/lib/api"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, BookOpen, ArrowRight } from "lucide-react"

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    upcomingBookings: 0,
    completedBookings: 0,
    availableServices: 0,
    articles: 0,
  })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const user = authService.getToken()

  useEffect(() => {
    const loadData = async () => {
      const [bookings, services, articles] = await Promise.all([getBookings(), getServices(), getBlogPosts()])

      const upcoming = bookings.filter((b) => b.status !== "completed").length
      const completed = bookings.filter((b) => b.status === "completed").length

      setStats({
        upcomingBookings: upcoming,
        completedBookings: completed,
        availableServices: services.length,
        articles: articles.length,
      })

      setRecentBookings(bookings.slice(0, 3))
      setLoading(false)
    }

    loadData()
  }, [])

  const statCards = [
    {
      label: "Upcoming Bookings",
      value: stats.upcomingBookings,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Completed Sessions",
      value: stats.completedBookings,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Available Services",
      value: stats.availableServices,
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Blog Articles",
      value: stats.articles,
      icon: BookOpen,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">Here's an overview of your coaching journey with us</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/bookings/new">
            <Button variant="outline" className="w-full justify-between bg-transparent">
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/dashboard/resources">
            <Button variant="outline" className="w-full justify-between bg-transparent">
              View Resources
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button variant="outline" className="w-full justify-between bg-transparent">
              Edit Profile
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Bookings</h2>
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {recentBookings.length > 0 ? (
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{booking.serviceName}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.bookingDate} at {booking.bookingTime}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No bookings yet. Schedule your first session!</p>
        )}
      </Card>
    </div>
  )
}

// Import missing icons
import { CheckCircle, Briefcase } from "lucide-react"
