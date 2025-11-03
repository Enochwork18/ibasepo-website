"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { getServices, getBlogPosts, getTestimonials } from "@/lib/api"
import { motion } from "framer-motion"

interface Service {
  id: string
  slug: string
  title: string
  excerpt: string
  featured: boolean
  category: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
}

interface Testimonial {
  id: string
  authorName: string
  content: string
  rating: number
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const [servicesData, blogData, testimonialsData] = await Promise.all([
        getServices(),
        getBlogPosts(),
        getTestimonials(),
      ])
      setServices(servicesData.filter((s: Service) => s.featured).slice(0, 6))
      setBlogPosts(blogData.slice(0, 3))
      setTestimonials(testimonialsData.slice(0, 4))
      setLoading(false)
    }
    loadData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
            >
              <span className="text-primary">Connected Hearts,</span>
              <br />
              <span>Healed Lives</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Guiding families toward peace, purpose, and legacy through faith-inspired coaching and consultancy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                  Book a Session
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </MotionSection>
        </div>

        <div className="mt-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/family%20reunion%20games%20%E2%80%93%2071toes-8bs7fWOKj3uqK8KUl0g9k0fCtJtw57.jpg"
            alt="Community gathering and family connection"
            width={800}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Services Preview with Images */}
      {!loading && (
        <MotionSection className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Our Core Services</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              From marriage coaching to personal development, we offer comprehensive support for families and
              individuals.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, idx) => {
                const serviceImages = [
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/What%20does%20the%20beginning%20or%20first%20few%20sessions%20of%E2%80%A6-iu4SKmMP47zfaQ9llHQpC0QjF7YTm0.jpg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/664c7934-147b-4b8e-88e8-d03cabb2e59d-fwQyCNwPSTKy1GzA2lMn6MZzyvsfD2.jpg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Discover%20a%20wide%20range%20of%20Team%20Building%20Activities%E2%80%A6-CG1mesas6URiOOxmTLwDYB5j2utG6F.jpg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%A6-xsaqDNc3v4ZP5n1326qhpJgflcEint.jpg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/664c7934-147b-4b8e-88e8-d03cabb2e59d-fwQyCNwPSTKy1GzA2lMn6MZzyvsfD2.jpg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c65d7ca1-1fe1-459e-ba3a-f500e9d43e1b-NQpD5EG5gBFvgvlEXCKBopZG7dlWKl.jpg",
                ]
                return (
                  <motion.div key={service.id} variants={itemVariants}>
                    <Link href={`/services/${service.slug}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
                        <div className="relative h-48 bg-accent">
                          <Image
                            src={serviceImages[idx % serviceImages.length] || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
                          <p className="text-muted-foreground mb-4 flex-grow">{service.excerpt}</p>
                          <span className="text-primary font-medium text-sm">Learn more →</span>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </MotionSection>
      )}

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <MotionSection className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Hear from Our Clients</h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} variants={itemVariants}>
                  <Card className="p-6 bg-background border-border">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-primary text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-foreground mb-4 leading-relaxed">{testimonial.content}</p>
                    <p className="font-semibold text-primary">{testimonial.authorName}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </MotionSection>
      )}

      {/* Blog Preview with Images */}
      {!loading && blogPosts.length > 0 && (
        <MotionSection className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Latest Insights</h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
                      <div className="relative h-48 bg-accent">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-foreground line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{post.excerpt}</p>
                        <span className="text-primary font-medium text-sm">Read more →</span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </MotionSection>
      )}

      {/* Newsletter */}
      <MotionSection className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg opacity-90 mb-8">
            Get weekly insights on family wellness and relationship building delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground"
            />
            <Button className="bg-secondary hover:bg-secondary/90 text-white">Subscribe</Button>
          </div>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
