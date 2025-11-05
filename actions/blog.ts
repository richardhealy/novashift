"use server"

import { cache } from "react"
import { getBlogData } from "@/lib/data"
import type { Author, BlogData, Category, Post, Tag } from "@/types/blog"

const getCachedBlogData = cache(getBlogData)

// Helper function to simulate 1-second delay
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500))

// 1. Get all posts (filtered to published only by default)
export async function getAllPosts(
	publishedOnly: boolean = true,
): Promise<Post[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.posts
		.filter((post) =>
			publishedOnly
				? post.status === "published" && post.publishedAt !== null
				: true,
		)
		.sort(
			(a, b) =>
				new Date(b.publishedAt || b.updatedAt).getTime() -
				new Date(a.publishedAt || a.updatedAt).getTime(),
		)
}

// 2. Get a single post by ID or slug
export async function getPostById(id: string): Promise<Post | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.posts.find((post) => post.id === id) || null
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return (
		data.posts.find(
			(post) => post.slug === slug && post.status === "published",
		) || null
	)
}

// 3. Get posts by author ID
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.posts.filter(
		(post) => post.author.id === authorId && post.status === "published",
	)
}

// 4. Get all authors
export async function getAllAuthors(): Promise<Author[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.authors
}

// 5. Get author by ID
export async function getAuthorById(authorId: string): Promise<Author | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.authors.find((author) => author.id === authorId) || null
}

// 6. Get all categories
export async function getAllCategories(): Promise<Category[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.categories
}

// 7. Get category by ID or slug
export async function getCategoryById(
	categoryId: string,
): Promise<Category | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.categories.find((cat) => cat.id === categoryId) || null
}

export async function getCategoryBySlug(
	slug: string,
): Promise<Category | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.categories.find((cat) => cat.slug === slug) || null
}

// 8. Get posts by category slug
export async function getPostsByCategory(slug: string): Promise<Post[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	const category = data.categories.find((cat) => cat.slug === slug)
	if (!category) return []
	return data.posts.filter(
		(post) =>
			post.categories.some((cat) => cat.slug === slug) &&
			post.status === "published",
	)
}

// 9. Get all tags
export async function getAllTags(): Promise<Tag[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.tags
}

// 10. Get tag by ID or slug
export async function getTagById(tagId: string): Promise<Tag | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.tags.find((tag) => tag.id === tagId) || null
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.tags.find((tag) => tag.slug === slug) || null
}

// 11. Get posts by tag slug
export async function getPostsByTag(slug: string): Promise<Post[]> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data.posts.filter(
		(post) =>
			post.tags.some((tag) => tag.slug === slug) && post.status === "published",
	)
}

// 12. Get full blog data (for admin or overview pages)
export async function getFullBlogData(): Promise<BlogData> {
	const data = await getCachedBlogData()
	await simulateDelay()
	return data
}
