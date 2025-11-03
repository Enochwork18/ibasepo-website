"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"

interface ContactForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>()
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSubmitted(true)
      reset()
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6 bg-accent">
                <div className="flex gap-4 items-start">
                  <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <a href="mailto:enquiries@ibasepo.org.uk" className="text-primary hover:underline">
                      enquiries@ibasepo.org.uk
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Response time: 24-48 hours</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-accent">
                <div className="flex gap-4 items-start">
                  <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone & WhatsApp</h3>
                    <a href="tel:+447958709238" className="text-primary hover:underline">
                      +44 7958 709238
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon - Fri: 9am - 6pm GMT</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-accent">
                <div className="flex gap-4 items-start">
                  <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                      <Input
                        {...register("firstName", { required: "First name is required" })}
                        placeholder="John"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                      <Input
                        {...register("lastName", { required: "Last name is required" })}
                        placeholder="Doe"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="john@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                    <Input {...register("phone")} placeholder="+44 123 456 789" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <Input
                      {...register("subject", { required: "Subject is required" })}
                      placeholder="How can we help?"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      placeholder="Your message here..."
                      rows={6}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground ${
                        errors.message ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Send Message
                  </Button>
                </form>
              ) : (
                <MotionSection className="text-center py-12">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                </MotionSection>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
