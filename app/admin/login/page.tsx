"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { verifyUserCredentials } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function AdminLogin() {
  const [email, setEmail] = useState("eo.bismark@ibasepo.org.uk")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = await verifyUserCredentials(email, password)
      if (user) {
        localStorage.setItem("adminToken", JSON.stringify(user))
        router.push("/admin")
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Admin Login</h1>
        <p className="text-muted-foreground text-center mb-8">Sign in to access the Ìbáṣepọ̀ admin dashboard</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
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

        <p className="text-xs text-muted-foreground text-center mt-6">
          Demo credentials:
          <br />
          Email: eo.bismark@ibasepo.org.uk
          <br />
          Password: admin123
        </p>
      </Card>
    </div>
  )
}
