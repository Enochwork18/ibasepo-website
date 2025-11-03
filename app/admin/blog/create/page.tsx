"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAdminStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function CreateBlogPost() {
  const router = useRouter()
  const { toast } = useToast()
  const { addBlog, addActivityLog } = useAdminStore()

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
    featuredImage: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newPost = {
      id: Date.now().toString(),
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
      publishedAt: new Date().toISOString(),
      author: "Aduké L.",
      featured: false,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addBlog(newPost as any)
    addActivityLog({
      action: "Create",
      entity: "Blog Post",
      entityId: newPost.id,
      userId: "current-user",
      timestamp: Date.now(),
    })

    toast({
      title: "Success",
      description: "Blog post created successfully",
    })

    router.push("/admin/blog")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Blog Post</h1>
        <p className="text-muted-foreground mt-1">Add a new blog post to your site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="Post title" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="Auto-generated" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary"
                className="w-full px-3 py-2 border border-border rounded-md"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Marriage & Relationships"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
              <Input name="tags" value={formData.tags} onChange={handleChange} placeholder="tag1, tag2, tag3" />
            </div>
          </div>
        </Card>

        {/* Content */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Content</h2>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content here (Markdown supported)"
            className="w-full px-3 py-2 border border-border rounded-md font-mono text-sm"
            rows={12}
            required
          />
        </Card>

        {/* SEO */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <Input
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                placeholder="SEO title (50-60 characters)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                placeholder="SEO description (150-160 characters)"
                className="w-full px-3 py-2 border border-border rounded-md"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Keywords</label>
              <Input
                name="seoKeywords"
                value={formData.seoKeywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </Card>

        {/* Status */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Publishing</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="px-6">
            Create Post
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
