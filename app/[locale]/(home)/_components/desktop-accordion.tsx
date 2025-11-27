"use client"
import Image from "next/image"
import { useState } from "react"
import { useLocale } from "next-intl"
import { TypographyH2 } from "@/components/ui/typography"
import { cn, toArabicNumerals } from "@/lib/utils"
import type { StatisticItem } from "@/types/statistic"

interface DesktopAccordionProps {
	items: StatisticItem[]
}

export default function DesktopAccordion({ items }: DesktopAccordionProps) {
	const [activeIndex, setActiveIndex] = useState<number>(0)
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const locale = useLocale()
	return (
		<div className='border-y-[0.5px] border-y-black/16 flex'>
			{items.map((item, index) => {
				const isActive = activeIndex === index
				const isHovered = hoveredIndex === index
				const isExpanded = isActive || isHovered
				return (
					<button
						key={item.imageURL}
						type='button'
						className={cn(
							"relative flex items-center h-[408px] w-[300px] px-[34px] pt-[226px] pb-7 transition-all duration-500 border-[0.5px] border-black/16 overflow-hidden outline-none! rtl:justify-end",
							isExpanded && "grow",
						)}
						onClick={() => {
							if (activeIndex !== index) {
								setActiveIndex(index)
							}
						}}
						onMouseEnter={() => {
							setHoveredIndex(index)
							setActiveIndex(index)
						}}
						onMouseLeave={() => {
							if (hoveredIndex === index && !isActive) {
								setHoveredIndex(null)
							}
						}}
					>
						<Image
							src={item.imageURL}
							className={cn(
								"scale-0 transition-all duration-500 origin-right opacity-0",
								item.imageClasses,
								isExpanded && "scale-100 opacity-100",
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
								{locale === 'ar' ? toArabicNumerals(item.title) : item.title}
							</TypographyH2>
							<p
								className={cn(
									"h-[76px] text-2xl text-neutral-800 tracking-[0.24px] leading-normal max-w-[200px] transition-all duration-300 capitalize",
								)}
							>
								{item.text}
							</p>
						</div>
					</button>
				)
			})}
		</div>
	)
}
