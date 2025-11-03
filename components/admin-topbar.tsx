// Admin dashboard top navigation bar
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User } from "lucide-react"
import { authService } from "@/lib/auth"

export function AdminTopbar() {
  const token = authService.getToken()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="w-5 h-5" />
          </Button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-background border rounded-lg shadow-lg p-4">
              <p className="text-sm text-muted-foreground">No new notifications</p>
            </div>
          )}
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <User className="w-5 h-5" />
        </Button>

        {token && (
          <div className="text-sm">
            <p className="font-medium">{token.name}</p>
            <p className="text-xs text-muted-foreground">{token.role}</p>
          </div>
        )}
      </div>
    </div>
  )
}
