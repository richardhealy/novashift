import PostCard from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { TypographyH2 } from "@/components/ui/typography"
import type { Post } from "@/types/blog"

interface LatestInsightsSectionProps {
	posts: Post[]
}

export default function LatestInsightsSection({
	posts,
}: LatestInsightsSectionProps) {
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<div className='flex items-center gap-5 flex-col md:flex-row md:gap-10 md:justify-between'>
					<div className='text-center space-y-6 md:text-left md:max-w-[484px] md:w-full'>
						<TypographyH2>Latest AI Insights</TypographyH2>
						<p className='text-xl font-medium tracking-[0.2px]'>
							Stay updated with the latest trends, strategies, and insights in
							artificial intelligence
						</p>
					</div>
					<Button withIcon>View All</Button>
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
