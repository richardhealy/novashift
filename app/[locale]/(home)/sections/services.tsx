import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { TypographyH3, TypographyH5 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

interface ServiceItem {
	imageUrl: string
	titleKey: string
	listKeys: string[]
	href: string
	imageClasses: string
}

export default async function ServicesSection() {
	const t = await getTranslations("HomePage.services")
	const tCommon = await getTranslations("Common")

	const serviceItems: ServiceItem[] = [
		{
			imageUrl: "/images/home/service-1.png",
			titleKey: "items.strategy.title",
			listKeys: ["items.strategy.list.0", "items.strategy.list.1"],
			href: ROUTES.AI_STRATEGY,
			imageClasses:
				"-ml-10 rtl:-mr-10 rtl:ml-0 -mt-4 w-[280px] lg:w-[220px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-20 rtl:lg:-right-20 rtl:lg:left-[unset] lg:m-0 lg:h-[220px] block rtl:scale-x-[-1]",
		},
		{
			imageUrl: "/images/home/service-2.png",
			titleKey: "items.team.title",
			listKeys: ["items.team.list.0", "items.team.list.1"],
			href: ROUTES.TEAM,
			imageClasses:
				"-ml-4 rtl:-mr-4 rtl:ml-0 -mb-6 -mt-4 w-[290px] lg:w-[240px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[-102px] rtl:lg:right-[-102px] rtl:lg:left-[unset] lg:m-0 lg:h-[240px] block z-10 rtl:scale-x-[-1]",
		},
		{
			imageUrl: "/images/home/service-3.png",
			titleKey: "items.automation.title",
			listKeys: ["items.automation.list.0", "items.automation.list.1"],
			href: ROUTES.AUTOMATION,
			imageClasses:
				"-ml-4 rtl:-mr-4 rtl:ml-0 w-[230px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[-80px] rtl:lg:right-[-80px] rtl:lg:left-[unset] lg:m-0 lg:h-[223px] lg:w-[223px] block rtl:scale-x-[-1]",
		},
	]

	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container max-w-[1328px]'>
				<div className='mx-auto w-full max-w-[547px] space-y-6 text-center'>
					<TypographyH3>{t("title")}</TypographyH3>
					<p>{t("description")}</p>
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

							<div className='mt-auto flex h-full flex-col px-6 pt-6 pb-11 md:py-[60px] lg:pl-[150px] rtl:lg:pr-[150px] rtl:lg:pl-6'>
								<TypographyH5 className='text-2xl text-balance md:text-2xl! md:tracking-[0.24px]'>
									{t(item.titleKey as any)}
								</TypographyH5>
								<ul className='mt-2.5 flex-1 pl-2.5 rtl:pr-2.5 rtl:pl-0'>
									{item.listKeys.map((listKey) => (
										<li
											key={listKey}
											className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-0.5 before:absolute before:top-1/2 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-neutral-800'
										>
											{t(listKey as any)}
										</li>
									))}
								</ul>

								<div className='mt-auto pt-5'>
									<Link
										href={item.href as any}
										className='btn btn-outline btn-md md:px3 px-2.5 py-1.5 text-sm md:px-3 md:py-2'
									>
										{tCommon("learnMore")}
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
