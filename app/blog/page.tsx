"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getBlogPosts } from "@/lib/api"
import { useSearchFilter } from "@/hooks/useSearchFilter"
import { Search } from "lucide-react"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  tags: string[]
  publishedAt: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getBlogPosts()
      setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [])

  const allTags = [...new Set(posts.flatMap((p) => p.tags))]

  const filtered = useSearchFilter(
    posts,
    {
      query: searchQuery,
      tags: selectedTag ? [selectedTag] : [],
      sortBy: "newest",
    },
    ["title", "excerpt", "content"],
  )

  const postsPerPage = 6
  const totalPages = Math.ceil(filtered.length / postsPerPage)
  const startIdx = (currentPage - 1) * postsPerPage
  const paginatedPosts = filtered.slice(startIdx, startIdx + postsPerPage)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionSection>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog & Insights</h1>
            <p className="text-lg text-muted-foreground">Wisdom for families, relationships, and personal growth</p>
          </MotionSection>
        </div>
      </section>

      {/* Filters */}
      <MotionSection className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-12"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setSelectedTag(null)
                  setCurrentPage(1)
                }}
                variant={selectedTag === null ? "default" : "outline"}
                className={selectedTag === null ? "bg-primary hover:bg-primary/90" : ""}
              >
                All Topics
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag)
                    setCurrentPage(1)
                  }}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={selectedTag === tag ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Blog Posts Grid */}
      {!loading && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {paginatedPosts.map((post, idx) => (
                    <MotionSection key={post.id} delay={idx * 0.05}>
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                          <div className="relative h-48 bg-accent">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs text-primary font-semibold mb-2">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                            <h3 className="text-xl font-semibold mb-2 text-foreground line-clamp-2">{post.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-xs bg-accent text-foreground px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </MotionSection>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pb-12">
                    <Button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        className={currentPage === i + 1 ? "bg-primary hover:bg-primary/90" : ""}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No articles found. Try a different search.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
