"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH3, TypographyH6 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

export default function OfferSection() {
	const [isExpandedFree, setIsExpandedFree] = useState(false)
	const [isExpandedPaid, setIsExpandedPaid] = useState(false)
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<div className='grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-20'>
					<div className='space-y-4'>
						<TypographyH3>What We Offer</TypographyH3>
						<p className='font-bold text-blue-500 text-xl tracking-[0.2px]'>
							Gain clarity before you commit
						</p>
					</div>
					<p className='font-medium text-xl tracking-[0.2px]'>
						Successful AI initiatives begin with strategic insight. Our AI
						Readiness Audit assesses your current operations and identifies
						where AI can deliver meaningful results—aligned with your
						priorities, not just what's trending. The outcome is a roadmap built
						for action and impact.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6 mt-[60px] items-start'>
					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6  overflow-hidden relative'>
						{/* Badge */}
						<div className='py-[11px] px-5 font-bold text-blue-800 leading-[1.6] tracking-[0.16px] bg-blue-100 rounded-full max-w-fit ml-auto'>
							Free
						</div>

						<div className='grid -mt-14 md:-mt-12 z-0'>
							<Image
								className='max-w-[230px] block mx-auto md:max-w-[477px] md:h-[509px] md:absolute md:right-[-230px] md:top-0 md:-z-10'
								src={"/images/ai-strategy/strategy-1.png"}
								alt='strategy image'
								width={464}
								height={488}
							/>

							<div className='md:max-w-[350px]'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										AI & Automation Opportunity Mapping
									</TypographyH6>
									<p className='text-sm text-blue-500 font-semibold tracking-[0.14px] mt-1'>
										Discover your readiness in minutes
									</p>
									<p className='mt-4'>
										Our complimentary AI & Automation Audit helps you assess
										where AI and automation can unlock value. —whether by
										streamlining internal workflows, enhancing customer
										experience, or improving decision-making. It's a practical
										first step toward smarter, leaner operations.
									</p>
								</div>

								<div
									className={cn(
										"grid grid-rows-[0fr] transition-all duration-500 ",
										isExpandedFree && "grid-rows-[1fr]",
									)}
								>
									<div className='overflow-hidden'>
										<ul className='mt-6 pl-2.5 pb-6'>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>Scope:</b> This
												assessment evaluates your organization's readiness for
												AI and automation by examining current processes, tools,
												and challenges.
											</li>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>Activities:</b> You will
												complete a structured set of role- and industry-specific
												questions designed to identify opportunities for
												intelligent solutions.
											</li>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>What you receive:</b> A
												readiness report accompanied by tailored recommendations
												highlighting both AI and automation opportunities
												relevant to your business.
											</li>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>Time & effort:</b> The
												assessment requires approximately 6–10 minutes and
												consists primarily of AI adapted multiple-choice
												questions.
											</li>
										</ul>
									</div>
								</div>

								<div className='flex items-center gap-4 mt-4 md:mt-6'>
									<Link
										href={ROUTES.CONTACT_US}
										className='btn btn-md btn-primary-dark with-icon icon-sm text-sm pl-6'
									>
										Start now
										<ButtonIcon iconColor='#1F2937' />
									</Link>
									<Button
										variant={"outline-dark"}
										className='text-sm px-6'
										onClick={() => setIsExpandedFree(!isExpandedFree)}
									>
										{isExpandedFree ? "Less" : "More"} Details
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6  overflow-hidden relative'>
						{/* Badge */}
						<div className='py-[11px] px-5 font-bold text-blue-800 leading-[1.6] tracking-[0.16px] bg-blue-100 rounded-full max-w-fit ml-auto'>
							Free
						</div>

						<div className='grid -mt-7 md:-mt-12 z-0'>
							<Image
								className='max-w-[212px] block mx-auto md:max-w-[464px] md:h-[488px] md:absolute md:right-[-206px] md:top-[100px] md:-z-10'
								src={"/images/ai-strategy/strategy-2.png"}
								alt='strategy image'
								width={464}
								height={488}
							/>

							<div className='md:max-w-[350px]'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										AI & Automation Opportunity Mapping
									</TypographyH6>
									<p className='text-sm text-blue-500 font-semibold tracking-[0.14px] mt-1'>
										Turn business potential into scalable solutions
									</p>
									<p className='mt-4'>
										Our complimentary AI & Automation Audit helps you assess
										where AI and automation can unlock value. —whether by
										streamlining internal workflows, enhancing customer
										experience, or improving decision-making. It's a practical
										first step toward smarter, leaner operations.
									</p>
								</div>

								<div
									className={cn(
										"grid grid-rows-[0fr] transition-all duration-500 ",
										isExpandedPaid && "grid-rows-[1fr]",
									)}
								>
									<div className='overflow-hidden'>
										<ul className='mt-6 pl-2.5 pb-6'>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>Scope:</b> This
												assessment evaluates your organization's readiness for
												AI and automation by examining current processes, tools,
												and challenges.
											</li>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>Activities:</b> You will
												complete a structured set of role- and industry-specific
												questions designed to identify opportunities for
												intelligent solutions.
											</li>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>What you receive:</b> A
												readiness report accompanied by tailored recommendations
												highlighting both AI and automation opportunities
												relevant to your business.
											</li>
											<li className='relative pl-[13px] not-last:mb-4 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>Time & effort:</b> The
												assessment requires approximately 6–10 minutes and
												consists primarily of AI adapted multiple-choice
												questions.
											</li>
										</ul>
									</div>
								</div>

								<div className='flex items-center gap-4 mt-4 md:mt-6'>
									<Link
										href={ROUTES.CONTACT_US}
										className='btn btn-md btn-primary-dark with-icon icon-sm text-sm pl-6'
									>
										Start now
										<ButtonIcon iconColor='#1F2937' />
									</Link>
									<Button
										variant={"outline-dark"}
										className='text-sm px-6'
										onClick={() => setIsExpandedPaid(!isExpandedPaid)}
									>
										{isExpandedPaid ? "Less" : "More"} Details
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
