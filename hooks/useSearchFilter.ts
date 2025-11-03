"use client"

import { useMemo } from "react"

export interface SearchFilterOptions {
  query: string
  category?: string
  tags?: string[]
  sortBy?: "newest" | "featured" | "alphabetical"
}

export function useSearchFilter<T extends Record<string, any>>(
  items: T[],
  options: SearchFilterOptions,
  searchFields: (keyof T)[] = [],
): T[] {
  return useMemo(() => {
    let filtered = [...items]

    // Text search
    if (options.query && searchFields.length > 0) {
      const query = options.query.toLowerCase()
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          return value && String(value).toLowerCase().includes(query)
        }),
      )
    }

    // Category filter
    if (options.category && options.category !== "all") {
      filtered = filtered.filter((item) => item.category === options.category)
    }

    // Tags filter
    if (options.tags && options.tags.length > 0) {
      filtered = filtered.filter((item) => item.tags?.some((tag: string) => options.tags?.includes(tag)))
    }

    // Sorting
    if (options.sortBy) {
      filtered.sort((a, b) => {
        switch (options.sortBy) {
          case "newest":
            return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
          case "featured":
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          case "alphabetical":
            return String(a.title).localeCompare(String(b.title))
          default:
            return 0
        }
      })
    }

    return filtered
  }, [items, options, searchFields])
}
