"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getServiceBySlug, getFAQs, getTestimonialsByService } from "@/lib/api"
import { CheckCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Service {
  id: string
  slug: string
  title: string
  excerpt: string
  description: string
  whatsIncluded: string[]
  price: string
  images: string[]
}

export default function ServiceDetail() {
  const params = useParams()
  const slug = params?.slug as string
  const [service, setService] = useState<Service | null>(null)
  const [faqs, setFaqs] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return
      const [serviceData, faqsData, testimonialsData] = await Promise.all([
        getServiceBySlug(slug),
        getFAQs(),
        getTestimonialsByService(""),
      ])
      setService(serviceData as Service)
      setFaqs(faqsData)
      setTestimonials(testimonialsData)
      setLoading(false)
    }
    loadData()
  }, [slug])

  if (loading) return null
  if (!service) return null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{service.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{service.excerpt}</p>
                <div className="flex gap-3">
                  <Link href="/booking">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Book Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Get More Info
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-96">
                <Image
                  src={service.images[0] || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Content */}
      <MotionSection className="py-12 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 text-primary" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3 mt-6 text-primary" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
              }}
            >
              {service.description}
            </ReactMarkdown>
          </div>
        </div>
      </MotionSection>

      {/* What's Included */}
      <MotionSection className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">What's Included</h2>
              <div className="space-y-4">
                {service.whatsIncluded.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                    <span className="text-lg text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card */}
            <div>
              <Card className="p-8 bg-accent sticky top-24 h-fit">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Service Price</p>
                  <p className="text-3xl font-bold text-primary">{service.price}</p>
                </div>
                <Link href="/booking" className="w-full">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book Session
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Special rates available for schools and community groups
                </p>
              </Card>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <MotionSection className="py-12 bg-accent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Client Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 bg-background">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-primary">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground mb-4">{testimonial.content}</p>
                  <p className="font-semibold text-primary">{testimonial.authorName}</p>
                </Card>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <MotionSection className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </MotionSection>
      )}

      {/* CTA */}
      <MotionSection className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg opacity-90 mb-8">Take the first step toward healing and growth with {service.title}.</p>
          <Link href="/booking">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              Book Your Session Today
            </Button>
          </Link>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
