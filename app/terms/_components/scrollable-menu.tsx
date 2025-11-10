"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { TypographyH5 } from "@/components/ui/typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { cn } from "@/lib/utils"

const SECTIONS = [
	{ id: "acceptance", title: "Acceptance of Terms" },
	{ id: "services", title: "Services Provided" },
	{ id: "account", title: "Account Registration" },
	{ id: "payment", title: "Subscription and Payments" },
	{ id: "use", title: "Acceptable Use" },
	{ id: "property", title: "Intellectual Property" },
]

export default function ScrollableMenu() {
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const isClickScrolling = useRef(false)

	const handleLinkClick = (idx: number) => {
		// Set flag to indicate scroll is happening due to a click
		isClickScrolling.current = true
		setActiveIndex(idx)
		// Reset the flag after 1 second (after scroll animation completes)
		setTimeout(() => {
			isClickScrolling.current = false
		}, 1000)
	}

	return (
		<section className='py-10 md:py-20'>
			<div className='container'>
				<div className='flex gap-10 lg:gap-[68px]'>
					{isDesktop && (
						<aside className='max-w-[336px] w-full shrink-0 '>
							<nav className='sticky left-0 top-5'>
								<ul>
									{SECTIONS.map((section, idx) => (
										<li key={section.id} className='group'>
											<Link
												href={`#${section.id}`}
												type='button'
												className={cn(
													"px-2.5 py-3 rounded-[10px] flex items-center gap-3 w-full hover:bg-blue-50",
													activeIndex === idx &&
														"bg-blue-500 text-white hover:bg-blue-500",
												)}
												onClick={() => handleLinkClick(idx)}
											>
												<span
													className={cn(
														"flex items-center justify-center size-8 rounded-full text-xl font-medium",
														activeIndex === idx &&
															"bg-white text-blue-500 hover:bg-blue-500",
													)}
												>
													{idx + 1}
												</span>{" "}
												{section.title}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</aside>
					)}

					<div className='space-y-8'>
						<div className='space-y-4' id='acceptance'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								1. Acceptance of Terms
							</TypographyH5>
							<p className='text-neutral-900'>
								By registering for or using NovaShift, you agree to these Terms
								and our Privacy Policy. If you do not agree, you must not use
								the platform. NovaShift reserves the right to modify or update
								these Terms at any time, and continued use of the platform
								signifies acceptance of any changes.
							</p>
						</div>

						<div className='space-y-4' id='services'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								2. Services Provided
							</TypographyH5>
							<p className='text-neutral-900'>
								NovaShift provides tools and APIs for automating workflows using
								artificial intelligence models. Features may include task
								automation, AI content generation, API integration, and data
								management. We reserve the right to update, enhance, or
								discontinue certain features without prior notice.
							</p>
						</div>

						<div className='space-y-4' id='account'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								3. Account Registration
							</TypographyH5>
							<p className='text-neutral-900'>
								To access most features, users must create an account and
								provide accurate information. You are responsible for
								maintaining the confidentiality of your login credentials and
								for all activities under your account.
							</p>
						</div>

						<div className='space-y-4' id='payment'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								4. Subscription and Payments
							</TypographyH5>
							<p className='text-neutral-900'>
								Some features of NovaShift may require a paid subscription
							</p>
							<ul className='flex-1 pl-2.5'>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Fees are billed in advance on a monthly or annual basis.
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									All payments are non-refundable unless required by law.
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Failure to pay may result in suspension or termination of your
									account.
								</li>
							</ul>
						</div>

						<div className='space-y-4' id='use'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								5. Acceptable Use
							</TypographyH5>
							<p className='text-neutral-900'>Users agree not to:</p>
							<ul className='flex-1 pl-2.5'>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Use NovaShift for illegal or unethical purposes.
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Upload, transmit, or generate content that violates
									intellectual property rights or privacy laws.
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Attempt to interfere with the platform’s security or
									functionality.
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Use AI models in a manner that promotes harm, discrimination,
									or misinformation.
								</li>
							</ul>
							<p className='text-neutral-900'>
								NovaShift reserves the right to suspend accounts that violate
								these terms.
							</p>
						</div>

						<div className='space-y-4' id='property'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								6. Intellectual Property
							</TypographyH5>
							<p className='text-neutral-900'>
								All content, software, designs, and trademarks on the platform
								are the property of NovaShift or its licensors. You may not
								reproduce, distribute, or create derivative works without
								written consent from NovaShift.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
