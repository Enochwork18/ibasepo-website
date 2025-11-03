"use client"

import type React from "react"

import { useState } from "react"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function ClientProfile() {
  const { toast } = useToast()
  const user = authService.getToken()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    coachingGoals: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    toast({
      title: "Success",
      description: "Profile updated successfully",
    })
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Password changed successfully",
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information</p>
      </div>

      {/* Profile Info */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input name="name" value={formData.name} onChange={handleProfileChange} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleProfileChange}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleProfileChange}
              placeholder="+44 (0) 7xxx xxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleProfileChange}
              placeholder="Tell us about yourself"
              className="w-full px-3 py-2 border border-border rounded-md"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Coaching Goals</label>
            <textarea
              name="coachingGoals"
              value={formData.coachingGoals}
              onChange={handleProfileChange}
              placeholder="What do you hope to achieve through coaching?"
              className="w-full px-3 py-2 border border-border rounded-md"
              rows={4}
            />
          </div>

          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <Input
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <Input
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <Input
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button onClick={handleChangePassword}>Change Password</Button>
        </div>
      </Card>
    </div>
  )
}
