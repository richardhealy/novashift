"use client"
import Image from "next/image"
import { useRef, useState } from "react"
import { TypographyH4 } from "@/components/ui/typography"
import { useAccordionSlider } from "@/hooks/useSliderAnimation"
import { cn } from "@/lib/utils"
import type { CaseAccordionProps } from "@/types/case-studies.type"

export default function CaseAccordion({
	accordionData,
	imageUrl,
	reverse,
	imageClass,
}: CaseAccordionProps) {
	const [expandedItemId, setExpandedItemId] = useState<string | null>(
		accordionData[0]?.id ?? null,
	)

	const toggleItem = (id: string) => {
		setExpandedItemId((prev) => (prev === id ? null : id))
	}

	const accordionRef = useRef<HTMLDivElement>(null)
	const { sliderHeight, buttonRefs, contentRefs } = useAccordionSlider({
		accordionData,
		expandedItemId,
		accordionRef,
	})

	return (
		<div
			className={cn(
				"flex flex-col gap-[60px] md:flex-row",
				reverse && "md:flex-row-reverse",
			)}
		>
			<div className='md:max-w-[350px] md:w-full md:shrink-0 lg:max-w-[500px] xl:max-w-[598px]'>
				<Image
					className={cn("max-w-full w-full h-auto rounded-[50px]", imageClass)}
					src={imageUrl}
					alt='case accordion image'
					width={598}
					height={598}
				/>
			</div>
			<div ref={accordionRef} className='pl-[34px] space-y-6 relative'>
				{/* Indicator */}
				<div className='absolute left-0 top-0 w-2.5 rounded-full h-full bg-[#FAFAFA] overflow-hidden'>
					<div
						className='scroll-slider absolute left-0 top-0 right-0 h-[10%] bg-blue-500 rounded-full transition-all duration-500'
						style={{ height: `${sliderHeight}px` }}
					></div>
				</div>
				{accordionData.map((item, idx) => {
					const isItemExpanded = expandedItemId === item.id
					return (
						<div key={item.id}>
							<button
								ref={(el) => {
									buttonRefs.current[item.id] = el
								}}
								onClick={() => toggleItem(item.id)}
								type='button'
								className='trigger-button flex items-start gap-4 text-left'
							>
								<TypographyH4 className='text-blue-500 md:text-[28px] md:tracking-[0.28px]'>
									0{idx + 1}
								</TypographyH4>
								<TypographyH4 className='md:text-[28px] md:tracking-[0.28px]'>
									{item.title}
								</TypographyH4>
							</button>

							<div
								ref={(el) => {
									contentRefs.current[item.id] = el
								}}
								className={cn(
									"grid grid-rows-[0fr] transition-all duration-500 ",
									isItemExpanded && "grid-rows-[1fr]",
								)}
							>
								<div className='overflow-hidden'>
									<div className='pt-2.5 pl-[46px]'>
										{Array.isArray(item.text) ? (
											<div className='space-y-4'>
												{item.text.map((paragraph, index) => (
													<p key={paragraph.key} className='leading-relaxed'>
														{paragraph.content}
													</p>
												))}
											</div>
										) : (
											<p className='leading-relaxed'>{item.text}</p>
										)}
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
