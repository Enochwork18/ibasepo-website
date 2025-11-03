"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getBookings } from "@/lib/api"
import { LogOut, Bookmark, User, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Booking {
  id: string
  clientName: string
  serviceName: string
  bookingDate: string
  bookingTime: string
  status: string
}

export default function ClientDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [clientName, setClientName] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("clientToken")
    if (!token) {
      redirect("/client/login")
    }
    const client = JSON.parse(token)
    setClientName(client.name)
    setIsAuthenticated(true)

    const loadBookings = async () => {
      const data = await getBookings()
      setBookings(data)
      setLoading(false)
    }
    loadBookings()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("clientToken")
    redirect("/client/login")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Welcome, {clientName}!</h1>
              <p className="text-muted-foreground mt-2">Manage your bookings and access resources</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut size={18} />
              Logout
            </Button>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/booking">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-primary/10 border-primary/20">
                <Bookmark className="text-primary mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-2">Book New Session</h3>
                <p className="text-sm text-muted-foreground">Schedule another coaching session</p>
              </Card>
            </Link>
            <Link href="/blog">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-primary/10 border-primary/20">
                <FileText className="text-primary mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-2">Read Articles</h3>
                <p className="text-sm text-muted-foreground">Access our blog and resources</p>
              </Card>
            </Link>
            <Card className="p-6 bg-accent">
              <User className="text-primary mb-3" size={32} />
              <h3 className="font-semibold text-foreground mb-2">My Profile</h3>
              <p className="text-sm text-muted-foreground">Update your information</p>
            </Card>
          </div>

          {/* Bookings Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Bookings</h2>
            {!loading && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{booking.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.bookingDate} at {booking.bookingTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Link href="/booking">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book Your First Session
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
