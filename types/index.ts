// Type definitions for the application
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "SuperAdmin" | "Editor" | "Client" | "Guest"
  password: string
  lastLogin: string
  avatar?: string
  createdAt: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string[]
  status: "draft" | "scheduled" | "published"
  publishDate: string
  scheduledDate?: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  views: number
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  price: number
  duration: string
  images: string[]
  whatsIncluded: string[]
  featured: boolean
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  content: string
  author: string
  email: string
  rating: number
  serviceId?: string
  image?: string
  status: "pending" | "approved" | "rejected"
  displayOrder: number
  createdAt: string
}

export interface Gallery {
  id: string
  title: string
  image: string
  caption: string
  category: string
  featured: boolean
  order: number
  createdAt: string
}

export interface Booking {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  date: string
  time: string
  notes: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  internalNotes: string
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: string
}
