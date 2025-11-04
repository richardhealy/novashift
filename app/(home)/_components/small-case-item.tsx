import Image from "next/image"
import Link from "next/link"
import { TypographyH4 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { CaseStudies } from "@/types/case-studies.type"

export default function SmallCaseItem({ data }: { data: CaseStudies }) {
	return (
		<Link
			href={`${ROUTES.ARTICLE}/${data.id}`}
			className='group md:flex md:items-center md:gap-6'
		>
			<div className='aspect-square w-full max-w-full rounded-2xl md:size-40 overflow-hidden md:shrink-0'>
				<Image
					className='aspect-square w-full max-w-full rounded-2xl object-cover transition-transform group-hover:scale-110 duration-500 md:size-40'
					src={data.imageUrl}
					alt={data.title}
					width={345}
					height={345}
				/>
			</div>

			<div className='mt-6 space-y-2.5 md:mt-0'>
				<TypographyH4 className='transition-colors group-hover:text-blue-500'>
					{data.title}
				</TypographyH4>
				<p className='line-clamp-3'>{data.description}</p>
			</div>
		</Link>
	)
}
