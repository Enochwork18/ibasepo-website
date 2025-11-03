"use client"

import { useEffect, useState } from "react"
import { getGallery } from "@/lib/api"
import { useAdminStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, Trash2, Search } from "lucide-react"
import Image from "next/image"

export default function GalleryManager() {
  const [gallery, setGallery] = useState<any[]>([])
  const [filteredGallery, setFilteredGallery] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const { deleteGalleryItem, addActivityLog } = useAdminStore()

  useEffect(() => {
    const loadGallery = async () => {
      const data = await getGallery()
      setGallery(data)
      setFilteredGallery(data)
      setLoading(false)
    }
    loadGallery()
  }, [])

  useEffect(() => {
    let filtered = gallery

    if (searchTerm) {
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory)
    }

    setFilteredGallery(filtered)
  }, [searchTerm, filterCategory, gallery])

  const categories = ["Community", "Workshops", "Coaching", "Resources"]

  const handleDelete = (id: string) => {
    if (confirm("Delete this image?")) {
      deleteGalleryItem(id)
      setGallery(gallery.filter((g) => g.id !== id))
      addActivityLog({
        action: "Delete",
        entity: "Gallery Image",
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
          <h1 className="text-3xl font-bold text-foreground">Gallery Manager</h1>
          <p className="text-muted-foreground mt-1">Manage gallery images</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Images
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-md"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.length > 0 ? (
            filteredGallery.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-accent">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                  <p className="text-sm text-muted-foreground mb-4">{item.caption}</p>
                  <div className="flex gap-2">
                    {item.featured && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Featured</span>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="ml-auto">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-8 text-center">
              <p className="text-muted-foreground">No images found</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
