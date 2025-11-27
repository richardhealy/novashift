import Image from "next/image"
import { useTranslations } from "next-intl"
import { TypographyH5 } from "@/components/ui/typography"

interface ServiceItem {
	id: string
	imageUrl: string
	titleKey: string
	descriptionKey: string
	imageClasses: string
}

const serviceItemsConfig: ServiceItem[] = [
	{
		id: "string1",
		imageUrl: "/images/team/service-1.png",
		titleKey: "service1.title",
		descriptionKey: "service1.description",
		imageClasses:
			"absolute -left-1.5 rtl:-right-1.5 rtl:left-[unset] -top-5 -z-10 w-[387px] h-[397px] rtl:scale-x-[-1]",
	},
	{
		id: "string2",
		imageUrl: "/images/team/service-2.png",
		titleKey: "service2.title",
		descriptionKey: "service2.description",
		imageClasses:
			"absolute -right-[60px] rtl:-left-[60px] rtl:right-[unset] md:-right-[100px] rtl:md:-left-[100px] -top-5 -z-10 w-[387px] h-[397px] rtl:scale-x-[-1]",
	},
	{
		id: "string3",
		imageUrl: "/images/team/service-3.png",
		titleKey: "service3.title",
		descriptionKey: "service3.description",
		imageClasses:
			"absolute -right-[60px] rtl:-left-[60px] rtl:right-[unset] md:-right-[100px] rtl:md:-left-[100px] -top-5 -z-10 w-[387px] h-[397px] rtl:scale-x-[-1]",
	},
	{
		id: "string4",
		imageUrl: "/images/team/service-4.png",
		titleKey: "service4.title",
		descriptionKey: "service4.description",
		imageClasses:
			"absolute -right-3.5 rtl:-left-3.5 rtl:right-[unset] md:-right-12 rtl:md:-left-12 top-1.5 -z-10 w-[326px] h-[335px] rtl:scale-x-[-1]",
	},
]

export default function ServicesSection() {
	const t = useTranslations("TeamPage.services")
	return (
		<section className='py-10 md:py-[100px]'>
			<div className='container max-w-[1368px]'>
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{serviceItemsConfig.map((item) => (
						<div
							key={item.id}
							className='relative flex flex-col overflow-hidden rounded-2xl border border-neutral-500 p-6 pt-[280px] pb-12 z-0'
						>
							<div className={item.imageClasses}>
								<Image
									src={item.imageUrl}
									alt={t(item.titleKey)}
									width={387}
									height={397}
								></Image>
							</div>

							<TypographyH5 className='text-xl! text-balance md:tracking-[0.24px] text-black'>
								{t(item.titleKey)}
							</TypographyH5>
							<p className='text-neutral-800 tracking-[0.16px] mt-2.5'>
								{t(item.descriptionKey)}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
