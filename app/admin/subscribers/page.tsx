"use client"

import { useEffect, useState } from "react"
import { getSubscribers } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Download, Search, Mail } from "lucide-react"

export default function SubscribersManager() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSubscribers = async () => {
      const data = await getSubscribers()
      setSubscribers(data)
      setFilteredSubscribers(data)
      setLoading(false)
    }
    loadSubscribers()
  }, [])

  useEffect(() => {
    const filtered = subscribers.filter(
      (sub) =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredSubscribers(filtered)
  }, [searchTerm, subscribers])

  const handleDelete = (email: string) => {
    if (confirm("Remove this subscriber?")) {
      setSubscribers(subscribers.filter((s) => s.email !== email))
    }
  }

  const handleExportCSV = () => {
    const csv = [
      ["Email", "Name", "Subscribed Date", "Source"],
      ...filteredSubscribers.map((s) => [
        s.email,
        s.name || "N/A",
        new Date(s.subscribedAt).toLocaleDateString(),
        s.source || "Homepage",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "subscribers.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subscribers Manager</h1>
          <p className="text-muted-foreground mt-1">Manage newsletter subscribers ({subscribers.length} total)</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Table */}
      {!loading && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Subscribed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Source</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSubscribers.length > 0 ? (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.email} className="hover:bg-accent/50">
                      <td className="px-6 py-4 text-sm font-medium">{subscriber.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{subscriber.name || "-"}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{subscriber.source || "Homepage"}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(subscriber.email)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
