"use client"

import { useMemo } from "react"
import LargePost from "@/components/large-post"
import LargePostCard from "@/components/large-post"
import PostCard from "@/components/post-card"
import { TypographyH5 } from "@/components/ui/typography"
import { useBlogFilters } from "@/hooks/useBlogFilters"
import type { Category, Post } from "@/types/blog"
import FilterButtons from "../_components/filter-buttons"

interface BlogSectionProps {
	posts: Post[]
	categories: Category[]
}

export default function BlogSection({ posts, categories }: BlogSectionProps) {
	const { selectedCategory, filteredPosts, handleFilterChange } =
		useBlogFilters({
			initialPosts: posts,
			categories,
		})

	const randomFeaturedPost = useMemo(() => {
		if (filteredPosts.length === 0) return null

		const randomIndex = 0
		return filteredPosts[randomIndex]
	}, [filteredPosts])

	return (
		<section>
			<div className='container'>
				{/* Filter Buttons */}
				<div className='mt-8'>
					<FilterButtons
						categories={categories}
						selectedCategory={selectedCategory}
						onCategoryChange={handleFilterChange}
					/>
				</div>

				{/* Large Post: Random featured post */}
				{randomFeaturedPost && (
					<div className='mt-8 md:mt-[60px]'>
						<LargePostCard
							key={randomFeaturedPost.id}
							post={randomFeaturedPost}
						/>
					</div>
				)}

				{/* Grid of Other Posts */}
				<div className='pb-[100px] pt-5 md:pt-[100px] grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
					) : (
						<div className='col-span-full flex flex-col items-center justify-center py-12 text-center text-gray-500'>
							<svg
								className='mx-auto h-12 w-12 text-neutral-800 mb-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
								/>
							</svg>
							<TypographyH5 className='text-lg font-semibold text-gray-900 mb-2'>
								No posts found
							</TypographyH5>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
