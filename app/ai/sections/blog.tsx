"use client"

import PostCard from "@/components/post-card"
import { TypographyH1, TypographyH5 } from "@/components/ui/typography"
import { categories } from "@/config/post-categories"
import { useBlogFilters } from "@/hooks/useBlogFilters"
import type { BlogPost } from "@/types/blog-post"
import FilterButtons from "../_components/filter-buttons"

interface BlogSectionProps {
	posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
	const { selectedCategory, filteredPosts, handleFilterChange } =
		useBlogFilters({
			initialPosts: posts,
		})
	return (
		<section>
			<div className='container'>
				<div className='pt-[86px] md:pt-12'>
					<TypographyH1 className='text-center leading-[1.4] md:leading-[1.2]!'>
						Featured AI Blog Posts
					</TypographyH1>
				</div>

				{/* Filter Buttons */}
				<div className='mt-8'>
					<FilterButtons
						categories={categories}
						selectedCategory={selectedCategory}
						onCategoryChange={handleFilterChange}
					/>
				</div>

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
							<p className='text-sm'>
								{selectedCategory === "All"
									? "There are no posts available at the moment. Check back soon!"
									: `No posts match the "${selectedCategory}" category. Try another filter.`}
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
