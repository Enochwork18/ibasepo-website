// API abstraction layer for mock data
// This structure allows easy swap to real API endpoints later

import servicesData from "@/data/services.json"
import blogData from "@/data/blog.json"
import testimonialsData from "@/data/testimonials.json"
import galleryData from "@/data/gallery.json"
import usersData from "@/data/users.json"
import subscribersData from "@/data/subscribers.json"
import bookingsData from "@/data/bookings.json"
import settingsData from "@/data/settings.json"
import faqsData from "@/data/faqs.json"

// Services API
export const getServices = async () => {
  return servicesData
}

export const getServiceBySlug = async (slug: string) => {
  return servicesData.find((s) => s.slug === slug)
}

export const getServiceById = async (id: string) => {
  return servicesData.find((s) => s.id === id)
}

// Blog API
export const getBlogPosts = async () => {
  return blogData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getBlogPostBySlug = async (slug: string) => {
  return blogData.find((p) => p.slug === slug)
}

export const getFeaturedBlogPosts = async (limit = 3) => {
  return getBlogPosts().then((posts) => posts.filter((p) => p.featured).slice(0, limit))
}

// Testimonials API
export const getTestimonials = async () => {
  return testimonialsData.filter((t) => t.approved)
}

export const getTestimonialsByService = async (serviceId: string) => {
  return getTestimonials().then((testimonials) => testimonials.filter((t) => t.serviceId === serviceId))
}

// Gallery API
export const getGalleryImages = async () => {
  return galleryData
}

export const getGallery = async () => {
  return galleryData
}

export const getFeaturedGalleryImages = async () => {
  return galleryData.filter((g) => g.featured)
}

// Settings API
export const getSettings = async () => {
  return settingsData
}

// FAQs API
export const getFAQs = async () => {
  return faqsData
}

export const getFAQsByCategory = async (category: string) => {
  return faqsData.filter((f) => f.category === category)
}

// Bookings API
export const getBookings = async () => {
  return bookingsData
}

export const createBooking = async (booking: any) => {
  const newBooking = {
    id: String(Math.max(...bookingsData.map((b) => Number.parseInt(b.id)), 0) + 1),
    ...booking,
    status: "pending",
    createdAt: new Date().toISOString().split("T")[0],
  }
  bookingsData.push(newBooking)
  return newBooking
}

// Users API (for mock auth)
export const getUserByEmail = async (email: string) => {
  return usersData.find((u) => u.email === email)
}

export const getUsers = async () => {
  return usersData
}

export const verifyUserCredentials = async (email: string, password: string) => {
  const user = await getUserByEmail(email)
  if (user && user.password === password) {
    return { id: user.id, email: user.email, name: user.name, role: user.role }
  }
  return null
}

// Subscribers API
export const addSubscriber = async (email: string, source = "website") => {
  const subscriber = {
    id: String(subscribersData.length + 1),
    email,
    source,
    subscribedAt: new Date().toISOString().split("T")[0],
  }
  subscribersData.push(subscriber)
  return subscriber
}

export const getSubscribers = async () => {
  return subscribersData
}
