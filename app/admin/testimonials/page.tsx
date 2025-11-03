"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getTestimonials } from "@/lib/api"
import { useAdminStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Trash2, Search } from "lucide-react"

export default function TestimonialsManager() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const { updateTestimonial, deleteTestimonial, addActivityLog } = useAdminStore()

  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await getTestimonials()
      setTestimonials(data)
      setFilteredTestimonials(data)
      setLoading(false)
    }
    loadTestimonials()
  }, [])

  useEffect(() => {
    let filtered = testimonials

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === filterStatus)
    }

    setFilteredTestimonials(filtered)
  }, [searchTerm, filterStatus, testimonials])

  const handleApprove = (id: string) => {
    updateTestimonial(id, { status: "approved" })
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, status: "approved" } : t)))
    addActivityLog({
      action: "Approve",
      entity: "Testimonial",
      entityId: id,
      userId: "current-user",
      timestamp: Date.now(),
    })
  }

  const handleReject = (id: string) => {
    updateTestimonial(id, { status: "rejected" })
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, status: "rejected" } : t)))
    addActivityLog({
      action: "Reject",
      entity: "Testimonial",
      entityId: id,
      userId: "current-user",
      timestamp: Date.now(),
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      deleteTestimonial(id)
      setTestimonials(testimonials.filter((t) => t.id !== id))
      addActivityLog({
        action: "Delete",
        entity: "Testimonial",
        entityId: id,
        userId: "current-user",
        timestamp: Date.now(),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Testimonials Manager</h1>
        <p className="text-muted-foreground mt-1">Approve and manage client testimonials</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      {/* Cards */}
      {!loading && (
        <div className="grid gap-4">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.email}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      testimonial.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : testimonial.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {testimonial.status}
                  </span>
                </div>

                <p className="text-foreground mb-4">{testimonial.content}</p>

                <div className="flex gap-2">
                  {testimonial.status === "pending" && (
                    <>
                      <Button size="sm" onClick={() => handleApprove(testimonial.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleReject(testimonial.id)}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No testimonials found</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
