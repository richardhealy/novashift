// components/BlogFilters.tsx
"use client" // Since we're using hooks, mark as client component

import type React from "react"
import { useState } from "react"

interface BlogPost {
	id: number
	title: string
	excerpt: string
	category:
		| "Strategy"
		| "NLP solutions"
		| "Computer Vision"
		| "AI Consulting"
		| "Machine Learning"
		| "Automation"
	imageUrl: string
	featured?: boolean
}

const categories = [
	"All",
	"Strategy",
	"NLP solutions",
	"Computer Vision",
	"AI Consulting",
	"Machine Learning",
	"Automation",
] as const

type Category = (typeof categories)[number]

const mockPosts: BlogPost[] = [
	// Featured post
	{
		id: 1,
		title: "The Rise of Artificial Intelligence: Transforming the Future",
		excerpt:
			"Rapidly evolving technologies are reshaping industries, redefining work, and a revolutionizing the world. From voice assistants to self-driving cars, AI is growing stronger.",
		category: "Automation",
		imageUrl: "/path/to/featured-image.jpg",
		featured: true,
	},
	// Other posts
	{
		id: 2,
		title: "The Future of AI in Business",
		excerpt:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		category: "Strategy",
		imageUrl: "/path/to/image1.jpg",
	},
	{
		id: 3,
		title: "Building Your First AI Strategy",
		excerpt:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		category: "AI Consulting",
		imageUrl: "/path/to/image2.jpg",
	},
	{
		id: 4,
		title: "5 Ways AI Can Streamline Your",
		excerpt:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		category: "Machine Learning",
		imageUrl: "/path/to/image3.jpg",
	},
	// Add more mock posts as needed for testing
	{
		id: 5,
		title: "NLP Innovations in 2025",
		excerpt: "Exploring the latest in natural language processing.",
		category: "NLP solutions",
		imageUrl: "/path/to/image4.jpg",
	},
	{
		id: 6,
		title: "Computer Vision for Retail",
		excerpt: "How CV is changing retail experiences.",
		category: "Computer Vision",
		imageUrl: "/path/to/image5.jpg",
	},
]

const BlogFilters: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<Category>("All")
	const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockPosts)

	const handleFilterChange = (category: Category) => {
		setSelectedCategory(category)
		if (category === "All") {
			setFilteredPosts(mockPosts)
		} else {
			setFilteredPosts(mockPosts.filter((post) => post.category === category))
		}
	}

	const featuredPost = filteredPosts.find((post) => post.featured)
	const otherPosts = filteredPosts.filter((post) => !post.featured).slice(0, 9) // Show first 3 for the grid

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-6'>
					Featured AI Blog Posts
				</h1>

				{/* Filter Buttons */}
				<div className='flex flex-wrap gap-4 mb-8'>
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => handleFilterChange(category)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								selectedCategory === category
									? "bg-blue-600 text-white"
									: "bg-white text-gray-500 hover:bg-gray-100"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				{/* Featured Post */}
				{featuredPost && (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
						<article className='lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-md'>
							<img
								src={featuredPost.imageUrl}
								alt={featuredPost.title}
								className='w-full h-64 object-cover'
							/>
							<div className='p-6'>
								<span className='inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-2'>
									{featuredPost.category}
								</span>
								<h2 className='text-2xl font-bold text-gray-900 mb-2'>
									{featuredPost.title}
								</h2>
								<p className='text-gray-600 mb-4'>{featuredPost.excerpt}</p>
								<a
									href='#'
									className='text-blue-600 hover:text-blue-800 font-medium'
								>
									Read More →
								</a>
							</div>
						</article>
					</div>
				)}

				{/* Grid of Other Posts */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{otherPosts.map((post) => (
						<article
							key={post.id}
							className='bg-white rounded-lg overflow-hidden shadow-md'
						>
							<img
								src={post.imageUrl}
								alt={post.title}
								className='w-full h-48 object-cover'
							/>
							<div className='p-4'>
								<span className='inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2'>
									{post.category}
								</span>
								<h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
									{post.title}
								</h3>
								<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
									{post.excerpt}
								</p>
								<a
									href='#'
									className='text-blue-600 hover:text-blue-800 font-medium text-sm'
								>
									Read More →
								</a>
							</div>
						</article>
					))}
				</div>

				{/* Pagination or Load More - Optional */}
				{filteredPosts.length > 3 && (
					<div className='text-center mt-8'>
						<button className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors'>
							Load More
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default BlogFilters
