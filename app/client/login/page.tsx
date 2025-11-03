"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

export default function ClientLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock client login - in production, validate against backend
      if (email && password) {
        localStorage.setItem(
          "clientToken",
          JSON.stringify({
            email,
            id: Math.random().toString(),
            name: email.split("@")[0],
          }),
        )
        router.push("/client/dashboard")
      } else {
        toast({
          title: "Invalid Input",
          description: "Please enter email and password",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Client Login</h1>
          <p className="text-muted-foreground text-center mb-8">Access your bookings and resources</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/booking" className="text-primary hover:underline font-medium">
              Book a session
            </Link>
          </p>
        </Card>
      </div>
      <Footer />
    </>
  )
}
