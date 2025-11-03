"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBookings } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Calendar, Clock, MapPin, Trash2 } from "lucide-react"

export default function ClientBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBookings = async () => {
      const data = await getBookings()
      setBookings(data)
      setLoading(false)
    }
    loadBookings()
  }, [])

  const handleCancel = (id: string) => {
    if (confirm("Cancel this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage your coaching sessions</p>
        </div>
        <Link href="/dashboard/bookings/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </Link>
      </div>

      {!loading && (
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{booking.serviceName}</h3>
                    <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex gap-2 items-start">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{booking.bookingDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{booking.bookingTime}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Virtual Session</p>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mb-4 p-3 bg-accent rounded">
                    <p className="text-sm text-muted-foreground">Notes: {booking.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {booking.status !== "completed" && (
                    <>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCancel(booking.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                    Details
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No bookings yet</p>
              <Link href="/dashboard/bookings/new">
                <Button>Schedule Your First Session</Button>
              </Link>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
