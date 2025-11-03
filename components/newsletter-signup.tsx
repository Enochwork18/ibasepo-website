"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addSubscriber } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addSubscriber(email, "website")
      setEmail("")
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={loading} className="bg-primary-foreground hover:bg-gray-200 text-foreground">
        {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  )
}
