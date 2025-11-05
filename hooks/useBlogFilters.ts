"use client"

import { useMemo, useState } from "react"
import type { Category, Post } from "@/types/blog"

interface UseBlogFiltersProps {
	initialPosts: Post[]
	categories: Category[] // Add categories prop for filtering options
}

export const useBlogFilters = ({
	initialPosts,
	categories,
}: UseBlogFiltersProps) => {
	// Find "All" category or default to first
	const allCategory =
		categories.find((cat) => cat.slug === "all") || categories[0]
	const [selectedCategory, setSelectedCategory] =
		useState<Category>(allCategory)

	const filteredPosts = useMemo(() => {
		if (selectedCategory.slug === "all") {
			// Return all published posts for "All" category
			return initialPosts
				.filter(
					(post) => post.status === "published" && post.publishedAt !== null,
				)
				.sort(
					(a, b) =>
						new Date(b.publishedAt || b.updatedAt).getTime() -
						new Date(a.publishedAt || a.updatedAt).getTime(),
				)
		}

		// Filter posts that match the selected category slug (supports multiple categories per post)
		return initialPosts
			.filter(
				(post) =>
					post.status === "published" &&
					post.publishedAt !== null &&
					post.categories.some((cat) => cat.slug === selectedCategory.slug),
			)
			.sort(
				(a, b) =>
					new Date(b.publishedAt || b.updatedAt).getTime() -
					new Date(a.publishedAt || a.updatedAt).getTime(),
			)
	}, [selectedCategory, initialPosts])

	const handleFilterChange = (category: Category) => {
		setSelectedCategory(category)
	}

	return {
		selectedCategory,
		filteredPosts,
		handleFilterChange,
	}
}
