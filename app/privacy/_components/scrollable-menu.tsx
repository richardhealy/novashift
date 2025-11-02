"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { TypographyH5 } from "@/components/ui/typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { cn } from "@/lib/utils"

const SECTIONS = [
	{ id: "information", title: "Information We Collect" },
	{ id: "use", title: "How We Use Information" },
	{ id: "security", title: "Data Storage and Security" },
	{ id: "sharing", title: "Sharing of Information" },
	{ id: "cookies", title: "Cookies and Tracking" },
	{ id: "retention", title: "Data Retention" },
]

export default function ScrollableMenu() {
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const isClickScrolling = useRef(false)

	useEffect(() => {
		const offset = 100 // 100px offset from top for better highlighting
		const handleScroll = () => {
			// Skip processing if the scroll was triggered by a click to avoid false active index changes
			if (isClickScrolling.current) return
			const scrollPosition = window.scrollY + offset
			for (let i = SECTIONS.length - 1; i >= 0; i--) {
				const element = document.getElementById(SECTIONS[i].id)
				if (!element) continue
				const elementTop = element.offsetTop
				if (scrollPosition >= elementTop) {
					setActiveIndex(i)
					break
				}
			}
		}
		// Initial check to set the active index on component mount
		handleScroll()
		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

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
						<div className='space-y-4' id='information'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								1. Information We Collect
							</TypographyH5>
							<p className='text-neutral-900'>
								We collect the following types of information:
							</p>

							<div className='space-y-2.5'>
								<p className='text-xl font-bold text-neutral-900 tracking-[0.2px]'>
									A. Personal Information
								</p>
								<ul className='flex-1 pl-2.5'>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										Full name
									</li>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										Email address
									</li>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										Company name (if applicable)
									</li>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										Billing information (for paid subscriptions)
									</li>
								</ul>
							</div>

							<div className='space-y-2.5'>
								<p className='text-xl font-bold text-neutral-900 tracking-[0.2px]'>
									B. Usage Data
								</p>
								<p className='text-neutral-900'>
									We automatically collect certain data when you access
									NovaShift, such as:
								</p>
								<ul className='flex-1 pl-2.5'>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										Device type and browser information
									</li>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										IP address and location
									</li>
									<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
										Log data including time, duration, and features used
									</li>
								</ul>
							</div>
						</div>

						<div className='space-y-4' id='use'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								2. How We Use Information
							</TypographyH5>
							<p className='text-neutral-900'>We use collected data to:</p>
							<ul className='flex-1 pl-2.5'>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Provide and maintain the NovaShift platform
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Personalize your experience and improve performance
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Process payments and manage subscriptions
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									Prevent fraud, abuse, or misuse of our platform
								</li>
							</ul>
						</div>

						<div className='space-y-4' id='security'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								3. Data Storage and Security
							</TypographyH5>
							<p className='text-neutral-900'>
								Your data is stored securely using encryption and
								industry-standard protection measures. We use cloud service
								providers that comply with global security standards (e.g., ISO
								27001, GDPR-ready). While we take reasonable precautions, no
								system is 100% secure — users share data at their own risk.
							</p>
						</div>

						<div className='space-y-4' id='sharing'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								4. Sharing of Information
							</TypographyH5>
							<p className='text-neutral-900'>
								NovaShift does not sell, trade, or rent your personal data. We
								may share limited data only with:
							</p>
							<ul className='flex-1 pl-2.5'>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									<b>Service providers </b> (e.g., payment gateways, analytics
									tools) strictly for operational purposes.
								</li>
								<li className='relative pl-[13px] not-last:mb-1 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-900 text-neutral-900'>
									<b>Legal authorities</b>, if required by law or in response to
									valid legal requests.
								</li>
							</ul>
						</div>

						<div className='space-y-4' id='cookies'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								5. Cookies and Tracking
							</TypographyH5>
							<p className='text-neutral-900'>
								We use cookies and similar tracking technologies to enhance your
								experience. Cookies help us remember preferences, analyze usage,
								and improve the platform. You can disable cookies through your
								browser settings, but some features may not function properly.
							</p>
						</div>

						<div className='space-y-4' id='retention'>
							<TypographyH5 className='text-[28px] tracking-[0.28px] leading-[1.4]'>
								6. Data Retention
							</TypographyH5>
							<p className='text-neutral-900'>
								We retain your personal information as long as your account is
								active or as necessary to comply with legal obligations. You may
								request deletion of your data at any time by closing your
								account.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
