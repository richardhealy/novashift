"use client"
import Image from "next/image"
import { useState } from "react"
import { TypographyH2 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import type { StatisticItem } from "@/types/statistic"

interface MobileAccordionProps {
	items: StatisticItem[]
}

export default function MobileAccordion({ items }: MobileAccordionProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(0)
	return (
		<div className='border-y border-y-black/16'>
			{items.map((item, index) => {
				const isActive = activeIndex === index
				const ptClass = isActive
					? index === 0 || index === items.length - 1
						? "pt-[115px]"
						: "pt-[155px]"
					: ""
				const hClass = isActive
					? index === 0 || index === items.length - 1
						? "h-[72px] opacity-100"
						: "h-9 opacity-100"
					: ""
				return (
					<button
						key={item.imageURL}
						type='button'
						className={cn(
							"relative w-full flex items-center px-[34px] py-[13px] transition-all duration-500 border border-black/16 overflow-hidden",
							ptClass,
						)}
						onClick={() => setActiveIndex(activeIndex === index ? null : index)}
					>
						<Image
							src={item.imageURL}
							className={cn(
								"scale-0 transition-all duration-500 origin-right opacity-0",
								item.imageClasses,
								activeIndex === index && "scale-100 opacity-100",
							)}
							alt={item.title}
							width={543}
							height={543}
						/>
						<div
							className={cn(
								"text-left transition-all duration-300 space-y-2.5",
							)}
						>
							<TypographyH2 className='text-[60px] leading-[1.2]'>
								{item.title}
							</TypographyH2>
							<p
								className={cn(
									"h-0 text-2xl text-neutral-800 tracking-[0.24px] leading-normal max-w-[200px] opacity-0 transition-all duration-300 capitalize",
									hClass,
								)}
							>
								{item.text}
							</p>
						</div>
						<div
							className={cn(
								"absolute right-6 bottom-9 size-7 flex items-center justify-center rounded-full overflow-hidden",
								activeIndex === index && "bg-white bottom-6",
							)}
						>
							<span className='bg-neutral-900 absolute left-1/2 top-1/2 -translate-1/2 h-0.5 w-3.5 transition-transform'></span>
							<span
								className={cn(
									"bg-neutral-900 absolute left-1/2 top-1/2 -translate-1/2 h-0.5 w-3.5 rotate-90 transition-transform",
									activeIndex === index && "rotate-0 ",
								)}
							></span>
						</div>
					</button>
				)
			})}
		</div>
	)
}
