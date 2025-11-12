import Image from "next/image"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/types/blog"
import SharePost from "./share-post"
import { TypographyH1, TypographyH5 } from "./ui/typography"

interface PostItemProps {
	post: Post
}
export default function PostItem({ post }: PostItemProps) {
	return (
		<section className='py-[60px] md:mt-6'>
			<div className='container max-w-[948px]'>
				<div>
					<div className='flex divide-x divide-neutral-600 space-x-4 flex-wrap'>
						<p className='text-neutral-black font-semibold leading-[1.6] tracking-[0.16] pr-4'>
							{formatDate(post.createdAt)}
						</p>
						<p className='text-neutral-black font-semibold leading-[1.6] tracking-[0.16] pr-4'>
							{post.categories.map((category) => category.name).join(", ")}
						</p>
					</div>

					<TypographyH1 className='mt-6 text-[28px] tracking-[0.28px] leading-[1.4] md:text-5xl md:leading-[1.4] md:tracking-[0.48px]'>
						{post.title}
					</TypographyH1>

					<Image
						className='max-w-full w-full h-auto object-cover aspect-video rounded-[20px] my-[52px]'
						src={post.featuredImage.url}
						width={900}
						height={566}
						alt={post.slug}
					/>

					<div className='space-y-8'>
						<p className='text-neutral-900'>
							In the fast-paced and ever-evolving domain of AI consulting,
							establishing your firm as a thought leader is not just
							beneficial—it’s crucial for standing out. One of the most
							effective ways to showcase your expertise, share insights, and
							engage with both current and prospective clients is through
							blogging. A well-executed blog serves as a dynamic platform for
							demonstrating your knowledge, driving traffic to your website, and
							ultimately, generating leads.
						</p>

						<div className='space-y-4'>
							<TypographyH5 className='text-2xl text-neutral-900'>
								Why Blogging is Essential for AI Consulting Firms
							</TypographyH5>
							<p className='text-neutral-900'>
								Blogging is more than just a way to share content; it’s a
								strategic tool that can:
							</p>

							<ul className='space-y-1 flex-1 pl-5 list-disc'>
								<li className='text-neutral-900'>
									<b>Establish Authority:</b> Regularly publishing insightful,
									informative posts on AI and its applications across various
									industries positions your firm as an authority in the field.
								</li>
								<li className='text-neutral-900'>
									<b>Enhance SEO:</b> Blogs enriched with keywords relevant to
									your services improve your website’s search engine ranking,
									making it easier for potential clients to find you.
								</li>
								<li className='text-neutral-900'>
									<b>Facilitate Engagement:</b> Blogs provide a platform for
									interaction with readers through comments, sharing, and
									discussions, fostering a community around your brand.
								</li>
								<li className='text-neutral-900'>
									<b>Drive Content Marketing:</b> Your blog posts can be
									repurposed for newsletters, social media content, and other
									marketing channels, amplifying your reach.
								</li>
							</ul>
						</div>

						<div className='space-y-4'>
							<TypographyH5 className='text-2xl text-neutral-900'>
								Crafting a Blogging Strategy
							</TypographyH5>
							<p className='text-neutral-900'>
								To leverage blogging effectively, it’s important to have a
								strategy in place. Here are key components to consider:
							</p>

							<ul className='space-y-1 flex-1 pl-5 list-decimal marker:font-bold'>
								<li className=' text-neutral-900'>
									<b>Establish Authority:</b> Regularly publishing insightful,
									informative posts on AI and its applications across various
									industries positions your firm as an authority in the field.
								</li>
								<li className='text-neutral-900'>
									<b>Enhance SEO:</b> Blogs enriched with keywords relevant to
									your services improve your website’s search engine ranking,
									making it easier for potential clients to find you.
								</li>
								<li className='text-neutral-900'>
									<b>Facilitate Engagement:</b> Blogs provide a platform for
									interaction with readers through comments, sharing, and
									discussions, fostering a community around your brand.
								</li>
								<li className='text-neutral-900'>
									<b>Drive Content Marketing:</b> Your blog posts can be
									repurposed for newsletters, social media content, and other
									marketing channels, amplifying your reach.
								</li>
							</ul>
						</div>

						<div className='space-y-4'>
							<TypographyH5 className='text-2xl text-neutral-900'>
								Examples of Successful Blogging in AI Consulting
							</TypographyH5>
							<p className='text-neutral-900'>
								Blogging is more than just a way to share content; it’s a
								strategic tool that can:
							</p>

							<ul className='space-y-1 flex-1 pl-5 list-disc'>
								<li className='text-neutral-900'>
									<b>AI for Healthcare Solutions Blog:</b> A consulting firm
									specializing in AI for healthcare might run a blog that
									features case studies on successful AI integration in patient
									care, posts explaining AI concepts in layman’s terms, and
									insights into the future of AI in healthcare. This approach
									not only highlights their expertise but also provides valuable
									content to healthcare professionals.
								</li>
								<li className='text-neutral-900'>
									<b>Ethical AI Practices Blog:</b> Another firm with a focus on
									ethical AI could use their blog to discuss the importance of
									ethics in AI development, share guidelines for ethical AI, and
									highlight how their consulting services help companies
									implement ethical AI solutions. This content reinforces their
									position as a leader in ethical AI consulting.
								</li>
								<li className='text-neutral-900'>
									<b>Emerging AI Technologies Blog:</b> An AI consulting firm at
									the forefront of technology might focus on emerging trends,
									such as quantum computing’s impact on AI, the future of
									natural language processing, or the latest advancements in
									machine learning algorithms. By covering cutting-edge topics,
									they not only inform their audience but also showcase their
									deep industry knowledge.
								</li>
							</ul>
						</div>

						<p className='text-neutral-900'>
							For AI consulting firms, blogging is not just an optional
							marketing tool—it’s a crucial component of a comprehensive thought
							leadership strategy. Through regular, insightful blog posts, you
							can establish authority, engage with your audience, and
							demonstrate the unique value your firm brings to the complex and
							rapidly changing AI landscape. Remember, the goal is not just to
							inform, but to inspire action and foster relationships that drive
							business growth.
						</p>
					</div>
				</div>

				<div className='mt-[52px]'>
					<SharePost links={post.shareLinks} />
				</div>
			</div>
		</section>
	)
}
