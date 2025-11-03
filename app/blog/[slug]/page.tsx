"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api"
import { Share2, Copy, MessageCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
}

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return
      const [postData, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()])
      setPost(postData as BlogPost)

      // Get related posts with same tags
      if (postData) {
        const related = allPosts
          .filter((p) => p.id !== postData.id && p.tags.some((t) => postData.tags.includes(t)))
          .slice(0, 3)
        setRelatedPosts(related)
      }
      setLoading(false)
    }
    loadData()
  }, [slug])

  if (loading) return null
  if (!post) return null

  const shareURL = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = (platform: string) => {
    const text = `Check out: ${post.title}`
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + shareURL)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareURL)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`,
    }
    if (platform === "copy") {
      navigator.clipboard.writeText(shareURL)
      return
    }
    window.open(urls[platform], "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-96 bg-accent">
        {post.image && <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />}
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-white text-sm">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <MotionSection className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-foreground mb-12">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 text-primary mt-6" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3 text-primary mt-6" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Share Section */}
              <div className="border-t border-border pt-8">
                <div className="flex items-center gap-4">
                  <span className="text-foreground font-semibold">Share this article:</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("whatsapp")}
                      title="Share on WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleShare("twitter")} title="Share on X">
                      <Share2 size={18} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleShare("copy")} title="Copy link">
                      <Copy size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tags */}
              <Card className="p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <span className="bg-accent text-foreground text-xs px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.id} href={`/blog/${related.slug}`}>
                        <div className="hover:text-primary transition-colors cursor-pointer">
                          <p className="font-medium text-sm text-foreground hover:text-primary">{related.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(related.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
