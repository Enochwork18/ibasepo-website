"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/lib/store"
import { getBookings, getBlogPosts, getServices, getSubscribers } from "@/lib/api"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, FileText, Briefcase, Mail, Users } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    blogs: 0,
    services: 0,
    subscribers: 0,
  })
  const [chartData, setChartData] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const activityLogs = useAdminStore((state) => state.activityLogs)

  useEffect(() => {
    const loadData = async () => {
      const [bookingsData, blogsData, servicesData, subscribersData] = await Promise.all([
        getBookings(),
        getBlogPosts(),
        getServices(),
        getSubscribers(),
      ])

      setStats({
        bookings: bookingsData.length,
        blogs: blogsData.length,
        services: servicesData.length,
        subscribers: subscribersData.length,
      })

      // Mock chart data for bookings over time
      setChartData([
        { name: "Week 1", bookings: 4, confirmed: 3 },
        { name: "Week 2", bookings: 3, confirmed: 2 },
        { name: "Week 3", bookings: 7, confirmed: 6 },
        { name: "Week 4", bookings: 5, confirmed: 4 },
      ])

      // Recent activity
      setRecentActivity(activityLogs.slice(-5).reverse())
    }

    loadData()
  }, [activityLogs])

  const statCards = [
    {
      label: "Total Bookings",
      value: stats.bookings,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
      href: "/admin/bookings",
    },
    {
      label: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      color: "bg-green-100 text-green-600",
      href: "/admin/blog",
    },
    {
      label: "Services",
      value: stats.services,
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
      href: "/admin/services",
    },
    {
      label: "Subscribers",
      value: stats.subscribers,
      icon: Mail,
      color: "bg-orange-100 text-orange-600",
      href: "/admin/subscribers",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back to Ìbáṣepọ̀ Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Bookings Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#3b82f6" />
              <Bar dataKey="confirmed" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Booking Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Pending", value: 2, fill: "#f59e0b" },
                  { name: "Confirmed", value: 15, fill: "#10b981" },
                  { name: "Completed", value: 8, fill: "#3b82f6" },
                  { name: "Cancelled", value: 1, fill: "#ef4444" },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#f59e0b" />
                <Cell fill="#10b981" />
                <Cell fill="#3b82f6" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((log) => (
                <div key={log.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {log.action} {log.entity}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{log.action}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/blog/create">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Create New Blog Post
              </Button>
            </Link>
            <Link href="/admin/services/create">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Briefcase className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                View All Bookings
              </Button>
            </Link>
            <Link href="/admin/subscribers">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Manage Subscribers
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
