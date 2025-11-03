// Client-side route protection component
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string[]
  fallbackRoute?: string
}

export function AuthGuard({
  children,
  requiredRole = ["SuperAdmin", "Editor"],
  fallbackRoute = "/admin/login",
}: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = authService.getToken()

    if (!token) {
      router.push(fallbackRoute)
      return
    }

    if (requiredRole && !requiredRole.includes(token.role)) {
      router.push("/unauthorized")
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router, requiredRole, fallbackRoute])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
