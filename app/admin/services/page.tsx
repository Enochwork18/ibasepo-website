"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getServices } from "@/lib/api"
import { useAdminStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search } from "lucide-react"

export default function ServicesManager() {
  const router = useRouter()
  const [services, setServices] = useState<any[]>([])
  const [filteredServices, setFilteredServices] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { deleteService, addActivityLog } = useAdminStore()

  useEffect(() => {
    const loadServices = async () => {
      const data = await getServices()
      setServices(data)
      setFilteredServices(data)
      setLoading(false)
    }
    loadServices()
  }, [])

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredServices(filtered)
  }, [searchTerm, services])

  const handleDelete = (id: string, title: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id)
      setServices(services.filter((s) => s.id !== id))
      addActivityLog({
        action: "Delete",
        entity: "Service",
        entityId: id,
        userId: "current-user",
        timestamp: Date.now(),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your coaching and consultancy services</p>
        </div>
        <Link href="/admin/services/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Service
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Table */}
      {!loading && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Featured</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Published</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-accent/50">
                      <td className="px-6 py-4">
                        <p className="font-medium">{service.title}</p>
                        <p className="text-xs text-muted-foreground">{service.excerpt?.substring(0, 40)}...</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{service.category}</td>
                      <td className="px-6 py-4 text-sm font-medium">{service.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            service.featured ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {service.featured ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            service.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {service.published ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Link href={`/admin/services/${service.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(service.id, service.title)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No services found
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
