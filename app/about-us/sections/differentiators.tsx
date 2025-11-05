import Image from "next/image"
import { TypographyH3, TypographyH5 } from "@/components/ui/typography"

interface DifferentiatorsItem {
	id: string
	imageUrl: string
	title: string
	text: string
	imageClasses: string
}

const differentiatorItems: DifferentiatorsItem[] = [
	{
		id: "string1",
		imageUrl: "/images/about/diff-1.png",
		title: "Deep collaboration",
		text: "We work as an extension of your team, understanding your unique challenges and goals.",
		imageClasses: "absolute -right-10 top-0 -z-10 w-[260px] h-auto md:right-0",
	},
	{
		id: "string2",
		imageUrl: "/images/about/diff-2.png",
		title: "Fast prototyping",
		text: "Rapid iteration and testing to validate concepts before full-scale implementation.",
		imageClasses: "absolute -right-10 top-0 -z-10 w-[300px] h-auto md:right-0",
	},
	{
		id: "string3",
		imageUrl: "/images/about/diff-3.png",
		title: "End-to-end support",
		text: "From strategy and development to deployment and ongoing optimization.",
		imageClasses: "absolute -right-10 top-0 -z-10 w-[300px] h-auto md:right-0",
	},
]

export default function DifferentiatorsSection() {
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<TypographyH3 className='text-center'>
					Core Differentiators
				</TypographyH3>

				<div className='mt-[60px] grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{differentiatorItems.map((item) => (
						<div
							key={item.id}
							className='relative flex flex-col overflow-hidden rounded-2xl border border-neutral-500 after:absolute after:bg-linear-(--differentiators-card-gradient) after:inset-0 after:-z-10 p-6 pt-[212px] z-0'
						>
							<Image
								src={item.imageUrl}
								alt={item.title}
								className={item.imageClasses}
								width={300}
								height={300}
							></Image>
							<TypographyH5 className='text-2xl text-balance md:text-2xl! md:tracking-[0.24px]'>
								{item.title}
							</TypographyH5>
							<p className='text-dark/60 tracking-[0.16px] mt-2.5 max-w-[280px]'>
								{item.text}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
