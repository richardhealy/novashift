import ArticleCard from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { TypographyH2 } from "@/components/ui/typography"
import type { BlogPost } from "@/types/blog-post"

const posts: BlogPost[] = [
	{
		id: "34b57h453h",
		imageUrl: "/home/article-1.png",
		title: "The Future of AI in Business",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
		category: "AI Consulting",
	},
	{
		id: "6464h36",
		imageUrl: "/home/article-2.png",
		title: "Building Your First AI Strategy",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
		category: "Automation",
	},
	{
		id: "reshsg45",
		imageUrl: "/home/article-3.png",
		title: "5 Ways AI Can Streamline Your",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
		category: "Machine Learning",
	},
]

export default function LatestInsightsSection() {
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
					{posts.map((post) => (
						<ArticleCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	)
}
