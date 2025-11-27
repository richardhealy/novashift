import Image from "next/image"
import Link from "next/link"
import { TypographyH6 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { Post } from "@/types/blog"

interface InsightItemProps {
	post: Post
}

export default function InsightItem({ post }: InsightItemProps) {
	return (
		<Link href={`${ROUTES.POST}/${post.slug}`} className='group'>
			<article className='flex gap-10 w-full justify-between md:flex-col-reverse md:gap-6 md:justify-end md:h-full'>
				<div className='flex flex-col md:flex-1 '>
					<TypographyH6 className='group-hover:text-blue-500'>
						{post.title}
					</TypographyH6>
					<p className='line-clamp-3 my-2.5 text-sm tracking-[0.14px] md:text-base md:mb-6'>
						{post.excerpt}
					</p>

					<span className='flex items-center gap-0.5 font-bold py-2 text-xs text-neutral-black group-hover:text-blue-500 mt-auto md:text-sm'>
						Read More
						<svg
							className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>Link arrow icon</title>
							<path
								d='M5.33329 14.9998L4.16663 13.8332L12.1666 5.83317H4.99996V4.1665L15 4.1665V14.1665H13.3333V6.99984L5.33329 14.9998Z'
								fill='#000316'
								className='group-hover:fill-blue-500 transition-colors'
							/>
						</svg>
					</span>
				</div>
				<div className='w-40 h-[175px] rounded-2xl overflow-hidden md:w-full md:h-auto shrink-0'>
					<Image
						className='w-40 h-[175px] rounded-2xl object-cover md:w-full md:h-auto group-hover:scale-105 transition-transform duration-500'
						src={post.featuredImage.url}
						alt={post.featuredImage.alt}
						width={post.featuredImage.width}
						height={post.featuredImage.height}
					/>
				</div>
			</article>
		</Link>
	)
}
