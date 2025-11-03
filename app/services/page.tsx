"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getServices } from "@/lib/api"
import { useSearchFilter } from "@/hooks/useSearchFilter"
import { Search } from "lucide-react"

interface Service {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  featured: boolean
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"featured" | "alphabetical" | "newest">("featured")

  useEffect(() => {
    const loadServices = async () => {
      const data = await getServices()
      setServices(data)
      setLoading(false)
    }
    loadServices()
  }, [])

  const categories = ["all", ...new Set(services.map((s) => s.category))]

  const filtered = useSearchFilter(
    services,
    {
      query: searchQuery,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      sortBy,
    },
    ["title", "excerpt", "category"],
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionSection>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive coaching and consultancy for individuals, couples, and families
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Filters */}
      <MotionSection className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground py-2">Sort by:</span>
              {["featured", "alphabetical"].map((option) => (
                <Button
                  key={option}
                  onClick={() => setSortBy(option as any)}
                  size="sm"
                  variant={sortBy === option ? "default" : "outline"}
                  className={sortBy === option ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Services Grid */}
      {!loading && (
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((service, idx) => (
                  <MotionSection key={service.id} delay={idx * 0.05}>
                    <Link href={`/services/${service.slug}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full p-6 bg-card hover:bg-accent/50 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-accent text-foreground px-3 py-1 rounded-full">
                            {service.category}
                          </span>
                          <span className="text-primary font-medium text-sm">Learn more →</span>
                        </div>
                      </Card>
                    </Link>
                  </MotionSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No services found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
