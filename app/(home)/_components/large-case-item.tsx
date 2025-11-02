import Image from "next/image"
import Link from "next/link"
import { TypographyH4 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { CaseStudies } from "@/types/case-studies.type"

export default function LargeCaseItem({ data }: { data: CaseStudies }) {
	return (
		<Link href={`${ROUTES.ARTICLE}/${data.id}`} className='group'>
			<div className='aspect-9/16 h-[395px] w-full max-w-full rounded-2xl overflow-hidden'>
				<Image
					className='aspect-9/16 h-[395px] w-full max-w-full rounded-2xl object-cover transition-transform group-hover:scale-110 duration-500'
					src={data.imageUrl}
					alt={data.title}
					width={598}
					height={395}
				/>
			</div>

			<div className='mt-6 space-y-2.5'>
				<TypographyH4 className='transition-colors group-hover:text-blue-500'>
					{data.title}
				</TypographyH4>
				<p>{data.description}</p>
			</div>
		</Link>
	)
}
