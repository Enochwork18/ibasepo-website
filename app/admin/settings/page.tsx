"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function SettingsManager() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    businessName: "Ìbáṣepọ̀ - Connected Hearts",
    businessEmail: "eo.bismark@ibasepo.org.uk",
    businessPhone: "+44 (0) 7xxx xxxxxx",
    businessAddress: "London, UK",
    instagramUrl: "https://instagram.com/ibasepo",
    facebookUrl: "https://facebook.com/ibasepo",
    calendlyUrl: "https://calendly.com/ibasepo",
    stripeKey: "••••••••••••••••",
    mailchimpKey: "••••••••••••••••",
    newsletterTemplate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings))
    toast({
      title: "Success",
      description: "Settings saved successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage business information and integrations</p>
      </div>

      {/* Business Info */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Business Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business Name</label>
            <Input
              name="businessName"
              value={settings.businessName}
              onChange={handleChange}
              placeholder="Business name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="businessEmail" type="email" value={settings.businessEmail} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input name="businessPhone" value={settings.businessPhone} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <Input
              name="businessAddress"
              value={settings.businessAddress}
              onChange={handleChange}
              placeholder="Business address"
            />
          </div>
        </div>
      </Card>

      {/* Social & Integrations */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Social & Integrations</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Instagram URL</label>
            <Input
              name="instagramUrl"
              value={settings.instagramUrl}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Facebook URL</label>
            <Input
              name="facebookUrl"
              value={settings.facebookUrl}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Calendly URL</label>
            <Input
              name="calendlyUrl"
              value={settings.calendlyUrl}
              onChange={handleChange}
              placeholder="https://calendly.com/..."
            />
          </div>
        </div>
      </Card>

      {/* API Keys */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">API Keys (Backend Only)</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
          <p className="text-sm text-yellow-800">
            API keys should never be visible in frontend. These are placeholders for production setup.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stripe Key</label>
            <Input
              name="stripeKey"
              value={settings.stripeKey}
              onChange={handleChange}
              disabled
              placeholder="Hidden for security"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mailchimp Key</label>
            <Input
              name="mailchimpKey"
              value={settings.mailchimpKey}
              onChange={handleChange}
              disabled
              placeholder="Hidden for security"
            />
          </div>
        </div>
      </Card>

      {/* Newsletter Template */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Newsletter Template</h2>
        <textarea
          name="newsletterTemplate"
          value={settings.newsletterTemplate}
          onChange={handleChange}
          placeholder="Enter HTML for newsletter template"
          className="w-full px-3 py-2 border border-border rounded-md font-mono text-sm"
          rows={10}
        />
      </Card>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="px-6">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
