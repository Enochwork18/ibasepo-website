"use client"

import { useEffect, useState } from "react"
import { getBookings } from "@/lib/api"
import { useAdminStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, Search } from "lucide-react"

export default function BookingsManager() {
  const [bookings, setBookings] = useState<any[]>([])
  const [filteredBookings, setFilteredBookings] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const { updateBooking, addActivityLog } = useAdminStore()

  useEffect(() => {
    const loadBookings = async () => {
      const data = await getBookings()
      setBookings(data)
      setFilteredBookings(data)
      setLoading(false)
    }
    loadBookings()
  }, [])

  useEffect(() => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((b) => b.status === filterStatus)
    }

    setFilteredBookings(filtered)
  }, [searchTerm, filterStatus, bookings])

  const handleStatusChange = (id: string, newStatus: string) => {
    updateBooking(id, { status: newStatus })
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
    addActivityLog({
      action: "Update",
      entity: "Booking",
      entityId: id,
      userId: "current-user",
      timestamp: Date.now(),
    })
  }

  const handleExportCSV = () => {
    const csv = [
      ["Client Name", "Email", "Phone", "Service", "Date", "Time", "Status", "Payment Status"],
      ...filteredBookings.map((b) => [
        b.clientName,
        b.clientEmail,
        b.clientPhone || "",
        b.serviceName,
        b.bookingDate,
        b.bookingTime,
        b.status,
        b.paymentStatus || "pending",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bookings.csv"
    a.click()
  }

  const statusOptions = ["pending", "confirmed", "completed", "cancelled"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings Manager</h1>
          <p className="text-muted-foreground mt-1">View and manage client bookings</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </Card>
      </div>

      {/* Table */}
      {!loading && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date & Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Payment</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-accent/50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{booking.clientName}</p>
                          <p className="text-xs text-muted-foreground">{booking.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{booking.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {booking.bookingDate} {booking.bookingTime}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded border ${
                            booking.status === "confirmed"
                              ? "bg-green-50 text-green-700 border-green-300"
                              : booking.status === "pending"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                                : "bg-gray-50 text-gray-700 border-gray-300"
                          }`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            booking.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.paymentStatus || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
