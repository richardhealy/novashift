"use client"

import Image from "next/image"
import { useState } from "react"
import { TypographyH6 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export default function BenefitsSection() {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<section className='py-11 md:py-[100px]'>
			<div className='container'>
				<div className='grid md:grid-cols-2 gap-6 items-start'>
					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6 lg:pb-[68px] pt-[262px] overflow-hidden relative lg:pt-6'>
						<div className='grid z-0'>
							<div className='size-[450px] absolute -top-28 right-[-153px] after:absolute after:bg-linear-(--automation-service-card-gradient) after:w-full after:h-full after:inset-0 after:z-0 lg:after:hidden lg:top-[50px] lg:right-[-103px]'>
								<Image
									className='w-full h-full -z-10'
									src={"/images/automation/benefit-1.png"}
									alt='strategy image'
									width={450}
									height={450}
								/>
							</div>

							<div className='md:max-w-[320px] z-0'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										AI Automations That Remove Busywork
									</TypographyH6>

									<p className='mt-4'>
										We design AI-powered workflows that eliminate busywork and
										reduce manual error—boosting efficiency across every
										department. From lead routing to document processing, our
										automations keep your operations running smoothly, 24/7.{" "}
										{!isExpanded && (
											<button
												className='text-blue-500 font-semibold hover:text-blue-800'
												type='button'
												onClick={() => setIsExpanded(!isExpanded)}
											>
												Read More
											</button>
										)}
									</p>
								</div>

								<div
									className={cn(
										"grid grid-rows-[0fr] transition-all duration-500 ",
										isExpanded && "grid-rows-[1fr]",
									)}
								>
									<div className='overflow-hidden'>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Sequi, voluptatem. Excepturi alias repellat repudiandae.
											Pariatur eaque nobis doloremque praesentium minima ex illo
											soluta sapiente, quo esse voluptas, nemo vero explicabo ad
											aliquid quod ipsam suscipit animi natus nisi, est
											accusantium. Commodi aut ullam ex omnis odit culpa.
											Aspernatur, quidem voluptatem!
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6 lg:pb-11 pt-[334px] overflow-hidden relative lg:pt-6'>
						<div className='grid z-0'>
							<div className='w-[477px] h-[509px] absolute -top-16 -right-40 after:absolute after:bg-linear-(--automation-service-card-gradient) after:w-full after:h-full after:inset-0 after:z-0 lg:after:hidden lg:right-[-230px] lg:top-3'>
								<Image
									className='w-full h-full -z-10'
									src={"/images/automation/benefit-2.png"}
									alt='strategy image'
									width={477}
									height={509}
								/>
							</div>

							<div className='md:max-w-[320px] z-0'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										Seamless SaaS Stack Integrations
									</TypographyH6>

									<p className='mt-4'>
										We architect intelligent, future-ready integrations across
										your SaaS ecosystem—eliminating data silos, reducing manual
										work, and enabling secure, reliable information flow between
										systems. The result is a unified, efficient tech stack that
										evolves with your business and continues to deliver value
										over time.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
