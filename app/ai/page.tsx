import type { BlogPost } from "@/types/blog-post"
import BlogSection from "./sections/blog"

const blogPosts: BlogPost[] = [
	{
		id: "article-1",
		imageUrl: "/ai/article-image-1.png",
		title: "The Future of AI in Business",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "Computer Vision",
	},
	{
		id: "article-2",
		imageUrl: "/ai/article-image-2.png",
		title: "Building Your First AI Strategy",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "AI Consulting",
	},
	{
		id: "article-3",
		imageUrl: "/ai/article-image-3.png",
		title: "5 Ways AI Can Streamline Your",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "All",
	},
	{
		id: "article-4",
		imageUrl: "/ai/article-image-4.png",
		title: "The Future of AI in Business",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "Computer Vision",
	},
	{
		id: "article-5",
		imageUrl: "/ai/article-image-5.png",
		title: "Building Your First AI Strategy",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "Computer Vision",
	},
	{
		id: "article-6",
		imageUrl: "/ai/article-image-6.png",
		title: "5 Ways AI Can Streamline Your",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "Machine Learning",
	},
	{
		id: "article-7",
		imageUrl: "/ai/article-image-7.png",
		title: "The Future of AI in Business",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "NLP solutions",
	},
	{
		id: "article-8",
		imageUrl: "/ai/article-image-8.png",
		title: "Building Your First AI Strategy",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "Strategy",
	},
	{
		id: "article-9",
		imageUrl: "/ai/article-image-9.png",
		title: "5 Ways AI Can Streamline Your",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		category: "All",
	},
]

export default function AiPage() {
	return <BlogSection posts={blogPosts} />
}
