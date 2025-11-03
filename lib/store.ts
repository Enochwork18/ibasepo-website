// Zustand store for global state management
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Blog, Service, Testimonial, Gallery, Booking, User } from "@/types"

interface AdminState {
  // Blog state
  blogs: Blog[]
  setBlog: (blogs: Blog[]) => void
  addBlog: (blog: Blog) => void
  updateBlog: (id: string, blog: Partial<Blog>) => void
  deleteBlog: (id: string) => void

  // Service state
  services: Service[]
  setServices: (services: Service[]) => void
  addService: (service: Service) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void

  // Testimonial state
  testimonials: Testimonial[]
  setTestimonials: (testimonials: Testimonial[]) => void
  addTestimonial: (testimonial: Testimonial) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void

  // Gallery state
  gallery: Gallery[]
  setGallery: (gallery: Gallery[]) => void
  addGalleryItem: (item: Gallery) => void
  updateGalleryItem: (id: string, item: Partial<Gallery>) => void
  deleteGalleryItem: (id: string) => void

  // Booking state
  bookings: Booking[]
  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  deleteBooking: (id: string) => void

  // Users state
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void

  // Activity logs
  activityLogs: Array<{
    id: string
    action: string
    entity: string
    entityId: string
    userId: string
    timestamp: number
  }>
  addActivityLog: (log: any) => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      blogs: [],
      setBlog: (blogs) => set({ blogs }),
      addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
      updateBlog: (id, updates) =>
        set((state) => ({
          blogs: state.blogs.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      deleteBlog: (id) =>
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== id),
        })),

      services: [],
      setServices: (services) => set({ services }),
      addService: (service) => set((state) => ({ services: [...state.services, service] })),
      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),

      testimonials: [],
      setTestimonials: (testimonials) => set({ testimonials }),
      addTestimonial: (testimonial) => set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
      updateTestimonial: (id, updates) =>
        set((state) => ({
          testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTestimonial: (id) =>
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        })),

      gallery: [],
      setGallery: (gallery) => set({ gallery }),
      addGalleryItem: (item) => set((state) => ({ gallery: [...state.gallery, item] })),
      updateGalleryItem: (id, updates) =>
        set((state) => ({
          gallery: state.gallery.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),
      deleteGalleryItem: (id) =>
        set((state) => ({
          gallery: state.gallery.filter((g) => g.id !== id),
        })),

      bookings: [],
      setBookings: (bookings) => set({ bookings }),
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),

      activityLogs: [],
      addActivityLog: (log) =>
        set((state) => ({
          activityLogs: [...state.activityLogs, { ...log, id: Date.now().toString() }],
        })),
    }),
    {
      name: "admin-store",
    },
  ),
)
