import { getAllCategories, getAllPosts } from "@/actions/blog"
import BlogSection from "../sections/blog"

export default async function PostsGrid() {
	const posts = await getAllPosts()
	const categories = await getAllCategories()
	return <BlogSection posts={posts} categories={categories} />
}
