"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBlogPosts } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ClientResources() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      const data = await getBlogPosts()
      setArticles(data.filter((a) => a.status === "published"))
      setLoading(false)
    }
    loadArticles()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Resources</h1>
        <p className="text-muted-foreground mt-1">Articles, guides, and tools to support your journey</p>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
                <div className="relative h-40 bg-accent">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex flex-col h-[calc(100%-160px)]">
                  <div className="flex-1">
                    <p className="text-xs text-primary font-medium mb-2">{article.category}</p>
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
