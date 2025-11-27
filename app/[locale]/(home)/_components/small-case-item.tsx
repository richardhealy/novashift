import Image from "next/image"
import { Link } from "@/i18n/routing"
import { TypographyH4 } from "@/components/ui/typography"
import type { CaseStudiesItem } from "@/types/case-studies.type"

export default function SmallCaseItem({ post }: { post: CaseStudiesItem }) {
	return (
		<Link
			href={post.href as any}
			className='group md:flex md:items-center md:gap-6'
		>
			<div className='aspect-square w-full max-w-full rounded-2xl md:size-40 overflow-hidden md:shrink-0'>
				<Image
					className='aspect-square w-full max-w-full rounded-2xl object-cover transition-transform group-hover:scale-110 duration-500 md:size-40'
					src={post.imageUrl}
					alt={post.title}
					width={345}
					height={345}
				/>
			</div>

			<div className='mt-6 space-y-2.5 md:mt-0'>
				<TypographyH4 className='transition-colors group-hover:text-blue-500'>
					{post.title}
				</TypographyH4>
				<p className='line-clamp-3'>{post.description}</p>
			</div>
		</Link>
	)
}
