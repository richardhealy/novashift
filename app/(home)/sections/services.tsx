import Image from "next/image"
import Link from "next/link"
import { TypographyH3, TypographyH5 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

interface ServiceItem {
	imageUrl: string
	title: string
	list: string[]
	href: string
	imageClasses: string
}

const serviceItems: ServiceItem[] = [
	{
		imageUrl: "/images/home/service-1.png",
		title: "AI Strategy & Consulting",
		list: ["AI-readiness Audit", "AI Opportunity Mapping"],
		href: ROUTES.AI_STRATEGY,
		imageClasses:
			"-ml-10 -mt-4 w-[280px] lg:w-[220px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-20 lg:m-0 lg:h-[220px] block ",
	},
	{
		imageUrl: "/images/home/service-2.png",
		title: "Dedicated Development Team",
		list: ["Custom AI Development", "MVP Builds"],
		href: ROUTES.TEAM,
		imageClasses:
			"-ml-4 -mb-6 -mt-4 w-[290px] lg:w-[240px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[-102px] lg:m-0 lg:h-[240px] block z-10",
	},
	{
		imageUrl: "/images/home/service-3.png",
		title: "Workflow Automations",
		list: ["AI-powered automations", "SaaS stack integrations"],
		href: ROUTES.AUTOMATION,
		imageClasses:
			"-ml-4 w-[230px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[-80px] lg:m-0 lg:h-[223px] lg:w-[223px]  block",
	},
]

export default function ServicesSection() {
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container max-w-[1328px]'>
				<div className='mx-auto w-full max-w-[547px] space-y-6 text-center'>
					<TypographyH3>Explore Our AI Services</TypographyH3>
					<p>
						As AI continues to revolutionize industries, it's imperative for
						businesses to leverage its power.
					</p>
				</div>

				<div className='mt-[60px] grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{serviceItems.map((item) => (
						<div
							key={item.href}
							className='relative flex flex-col overflow-hidden rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) sm:last:col-span-2 lg:flex lg:flex-row lg:last:col-span-1'
						>
							<div className='md:min-h-[230px]'>
								<Image
									src={item.imageUrl}
									className={item.imageClasses}
									alt='image'
									width={283}
									height={283}
								/>
							</div>

							<div className='mt-auto flex h-full flex-col px-6 pt-6 pb-11 md:py-[60px] lg:pl-[150px]'>
								<TypographyH5 className='text-2xl text-balance md:text-2xl! md:tracking-[0.24px]'>
									{item.title}
								</TypographyH5>
								<ul className='mt-2.5 flex-1 pl-2.5'>
									{item.list.map((listItem) => (
										<li
											key={listItem}
											className='relative pl-[13px] not-last:mb-0.5 before:absolute before:top-1/2 before:left-0 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-800'
										>
											{listItem}
										</li>
									))}
								</ul>

								<div className='mt-auto pt-5'>
									<Link
										href={item.href}
										className='btn btn-outline btn-md md:px3 px-2.5 py-1.5 text-sm md:px-3 md:py-2'
									>
										Learn More
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
