import PostCard from "@/components/post-card"
import { TypographyH2 } from "@/components/ui/typography"
import type { Post } from "@/types/blog"

interface MorePostsSectionProps {
	posts: Post[]
}

export default function MorePostsSection({ posts }: MorePostsSectionProps) {
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<div className='flex items-center gap-5 flex-col md:flex-row md:gap-10 md:justify-between'>
					<div className='text-center space-y-6 md:text-left md:max-w-[484px] md:w-full'>
						<TypographyH2>More Article</TypographyH2>
					</div>
				</div>

				<div className='grid gap-6 mt-[60px] md:grid-cols-2 lg:grid-cols-3'>
					{posts.slice(0, 3).map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	)
}
