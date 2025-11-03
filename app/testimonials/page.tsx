"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTestimonials } from "@/lib/api"

interface Testimonial {
  id: string
  authorName: string
  authorTitle: string
  content: string
  rating: number
  serviceName: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState("all")

  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await getTestimonials()
      setTestimonials(data)
      setLoading(false)
    }
    loadTestimonials()
  }, [])

  const services = ["all", ...new Set(testimonials.map((t) => t.serviceName))]
  const filtered =
    selectedService === "all" ? testimonials : testimonials.filter((t) => t.serviceName === selectedService)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionSection>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Testimonials</h1>
            <p className="text-lg text-muted-foreground">
              Real stories from families and individuals who've transformed their lives
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Filters */}
      {!loading && (
        <MotionSection className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {services.map((service) => (
                <Button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  variant={selectedService === service ? "default" : "outline"}
                  className={selectedService === service ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {service === "all" ? "All Services" : service}
                </Button>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* Testimonials Grid */}
      {!loading && (
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((testimonial, idx) => (
                  <MotionSection key={testimonial.id} delay={idx * 0.05}>
                    <Card className="p-6 bg-accent hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-primary text-xl">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-foreground mb-6 flex-grow leading-relaxed">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-primary">{testimonial.authorName}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.authorTitle}</p>
                        <p className="text-xs text-muted-foreground mt-2">{testimonial.serviceName}</p>
                      </div>
                    </Card>
                  </MotionSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No testimonials for this service yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <MotionSection className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
          <p className="text-lg opacity-90 mb-8">
            Your transformation could inspire others. Share your testimonial with us.
          </p>
          <Link href="/contact">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">Submit Your Testimonial</Button>
          </Link>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
