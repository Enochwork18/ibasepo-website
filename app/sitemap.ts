import { getServices, getBlogPosts } from "@/lib/api"

export default async function sitemap() {
  const baseUrl = "https://ibasepo.org.uk"

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/testimonials",
    "/gallery",
    "/booking",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Dynamic service routes
  const services = await getServices()
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Dynamic blog routes
  const blogPosts = await getBlogPosts()
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
