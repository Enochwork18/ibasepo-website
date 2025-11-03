"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Button } from "@/components/ui/button"
import { getGalleryImages } from "@/lib/api"
import { X } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  description: string
  image: string
  category: string
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const loadImages = async () => {
      const data = await getGalleryImages()
      setImages(data)
      setLoading(false)
    }
    loadImages()
  }, [])

  const categories = ["all", ...new Set(images.map((i) => i.category))]
  const filtered = selectedCategory === "all" ? images : images.filter((i) => i.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionSection>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Gallery</h1>
            <p className="text-lg text-muted-foreground">
              Moments from workshops, speaking engagements, and coaching sessions
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Filters */}
      {!loading && (
        <MotionSection className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* Gallery Grid */}
      {!loading && (
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((image) => (
                <MotionSection key={image.id}>
                  <div
                    onClick={() => setSelectedImage(image)}
                    className="relative h-80 bg-accent rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold">{image.title}</h3>
                        <p className="text-sm opacity-90">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </MotionSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <X size={24} className="text-black" />
            </button>
            <div className="relative h-96 md:h-96">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-card p-6 mt-4 rounded-lg">
              <h2 className="text-2xl font-bold text-foreground mb-2">{selectedImage.title}</h2>
              <p className="text-muted-foreground mb-2">{selectedImage.description}</p>
              <span className="text-sm text-primary font-semibold">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
