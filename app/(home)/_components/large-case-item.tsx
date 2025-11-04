import Image from "next/image"
import Link from "next/link"
import { TypographyH4 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { CaseStudiesItem } from "@/types/case-studies.type"

export default function LargeCaseItem({ post }: { post: CaseStudiesItem }) {
	return (
		<Link href={`${ROUTES.POST}/${post.id}`} className='group'>
			<div className='aspect-9/16 h-[395px] w-full max-w-full rounded-2xl overflow-hidden'>
				<Image
					className='aspect-9/16 h-[395px] w-full max-w-full rounded-2xl object-cover transition-transform group-hover:scale-110 duration-500'
					src={post.imageUrl}
					alt={post.title}
					width={598}
					height={395}
				/>
			</div>

			<div className='mt-6 space-y-2.5'>
				<TypographyH4 className='transition-colors group-hover:text-blue-500'>
					{post.title}
				</TypographyH4>
				<p>{post.description}</p>
			</div>
		</Link>
	)
}
