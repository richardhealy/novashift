import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "@/config/routes"
import type { Post } from "@/types/blog"
import { TypographyH4 } from "./ui/typography"

interface LargePostCardProps {
	post: Post
}

export default function LargePostCard({ post }: LargePostCardProps) {
	return (
		<Link href={`${ROUTES.POST}/${post.id}`} className='group'>
			<article className='grid gap-6 md:grid-cols-2 md:items-center md:gap-8'>
				<div className='aspect-square rounded-2xl overflow-hidden md:w-full md:h-auto shrink-0 md:aspect-auto'>
					<Image
						className='aspect-square rounded-2xl object-cover md:w-full md:h-auto group-hover:scale-105 transition-transform duration-500 md:aspect-auto'
						src={post.featuredImage.url}
						alt={post.featuredImage.alt}
						width={post.featuredImage.width}
						height={post.featuredImage.height}
					/>
				</div>
				<div className='flex flex-col md:flex-1 '>
					{post.categories?.length && (
						<p className='text-blue-500 uppercase font-medium tracking-[1.12px]'>
							{post.categories.map((category) => category.name).join(", ")}
						</p>
					)}
					<TypographyH4 className='mt-2.5 group-hover:text-blue-500 lg:text-[48px] lg:tracking-[0.48px] lg:leading-[1.4]'>
						{post.title}
					</TypographyH4>
					<p className='line-clamp-3 mt-2.5 mb-6 tracking-[0.14px] md:text-base md:mb-6'>
						{post.excerpt}
					</p>

					<button
						type='button'
						className='flex items-center gap-1 font-bold py-2 text-sm text-blue-800 group-hover:text-blue-500 mt-auto md:text-sm'
					>
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
								fill='#084099'
								className='group-hover:fill-blue-500 transition-colors'
							/>
						</svg>
					</button>
				</div>
			</article>
		</Link>
	)
}
