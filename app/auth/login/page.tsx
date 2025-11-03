"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { authService } from "@/lib/auth"

export default function ClientLogin() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock authentication for client
    if (email && password) {
      const token = {
        id: "client-1",
        name: "John Doe",
        email: email,
        role: "Client" as const,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      }

      authService.setToken(token)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      router.push("/dashboard")
    } else {
      toast({
        title: "Error",
        description: "Please enter valid credentials",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Ìbáṣepọ̀</h1>
            <p className="text-muted-foreground mt-2">Client Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>For demo purposes, enter any email and password</p>
          </div>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Are you an admin?{" "}
              <Link href="/admin/login" className="text-primary hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
