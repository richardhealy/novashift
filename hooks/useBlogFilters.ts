"use client"

import { useMemo, useState } from "react"
import type { Category } from "@/config/post-categories"
import type { BlogPost } from "@/types/blog-post"

interface UseBlogFiltersProps {
	initialPosts: BlogPost[]
}

export const useBlogFilters = ({ initialPosts }: UseBlogFiltersProps) => {
	const [selectedCategory, setSelectedCategory] = useState<Category>("All")

	const filteredPosts = useMemo(() => {
		if (selectedCategory === "All") {
			return initialPosts
		}
		return initialPosts.filter((post) => post.category === selectedCategory)
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
