"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { getServices, createBooking } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock } from "lucide-react"
import { useForm } from "react-hook-form"

interface Service {
  id: string
  slug: string
  title: string
  category: string
}

interface BookingForm {
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  bookingDate: string
  bookingTime: string
  notes: string
}

export default function Booking() {
  const [services, setServices] = useState<Service[]>([])
  const [step, setStep] = useState<"service" | "form" | "confirmation">("service")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>()

  useEffect(() => {
    const loadServices = async () => {
      const data = await getServices()
      setServices(data)
      setLoading(false)
    }
    loadServices()
  }, [])

  const onSubmit = async (data: BookingForm) => {
    try {
      if (!selectedService) return
      await createBooking({
        ...data,
        serviceId: selectedService.id,
        serviceName: selectedService.title,
      })
      setStep("confirmation")
      reset()
      toast({
        title: "Booking Created!",
        description: "We will confirm your booking within 24 hours.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionSection>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Book Your Session</h1>
            <p className="text-lg text-muted-foreground">
              Take the first step toward transformation. Select a service and schedule your session.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Booking Steps */}
      <MotionSection className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Select Service */}
          {step === "service" && !loading && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Step 1: Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service)
                      setStep("form")
                    }}
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow hover:border-primary border-2"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.category}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Select</Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Booking Form */}
          {step === "form" && selectedService && (
            <div className="space-y-8">
              <div>
                <Button onClick={() => setStep("service")} variant="outline" className="mb-6">
                  ← Back
                </Button>
                <h2 className="text-2xl font-bold text-foreground mb-2">Step 2: Your Details</h2>
                <p className="text-muted-foreground">Selected: {selectedService.title}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                    <Input
                      {...register("clientName", { required: true })}
                      placeholder="Your name"
                      className={errors.clientName ? "border-red-500" : ""}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      {...register("clientEmail", { required: true })}
                      type="email"
                      placeholder="your@email.com"
                      className={errors.clientEmail ? "border-red-500" : ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                  <Input
                    {...register("clientPhone", { required: true })}
                    placeholder="+44 123 456 789"
                    className={errors.clientPhone ? "border-red-500" : ""}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                      <Calendar size={16} /> Preferred Date
                    </label>
                    <Input
                      {...register("bookingDate", { required: true })}
                      type="date"
                      className={errors.bookingDate ? "border-red-500" : ""}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                      <Clock size={16} /> Preferred Time
                    </label>
                    <Input
                      {...register("bookingTime", { required: true })}
                      type="time"
                      className={errors.bookingTime ? "border-red-500" : ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Additional Notes</label>
                  <textarea
                    {...register("notes")}
                    placeholder="Tell us about your situation or what you'd like to focus on..."
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => setStep("service")} type="button" variant="outline">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === "confirmation" && (
            <MotionSection className="text-center space-y-8">
              <div className="bg-accent rounded-2xl p-12">
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-primary mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Thank you for booking with Ìbáṣepọ̀. We will send you a confirmation email with details within 24
                  hours.
                </p>

                <Card className="p-8 bg-background mb-8 text-left">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">1.</span>
                      <span>Check your email for booking confirmation</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">2.</span>
                      <span>Review any preparation materials provided</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">3.</span>
                      <span>Join your session at the scheduled time</span>
                    </li>
                  </ul>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline">Return Home</Button>
                  </Link>
                  <Link href="/blog">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Read Our Blog</Button>
                  </Link>
                </div>
              </div>
            </MotionSection>
          )}
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
