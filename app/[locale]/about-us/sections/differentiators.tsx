import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { TypographyH3, TypographyH5 } from "@/components/ui/typography"

interface DifferentiatorsItem {
	id: string
	imageUrl: string
	titleKey: string
	descriptionKey: string
	imageClasses: string
}

const differentiatorItemsConfig: DifferentiatorsItem[] = [
	{
		id: "string1",
		imageUrl: "/images/about/diff-1.png",
		titleKey: "collaboration.title",
		descriptionKey: "collaboration.description",
		imageClasses:
			"absolute -right-10 rtl:-left-10 rtl:right-[unset] top-0 -z-10 w-[260px] h-auto md:right-0 rtl:md:left-0 rtl:md:right-[unset] rtl:scale-x-[-1]",
	},
	{
		id: "string2",
		imageUrl: "/images/about/diff-2.png",
		titleKey: "prototyping.title",
		descriptionKey: "prototyping.description",
		imageClasses:
			"absolute -right-10 rtl:-left-10 rtl:right-[unset] top-0 -z-10 w-[300px] h-auto md:right-0 rtl:md:left-0 rtl:md:right-[unset] rtl:scale-x-[-1]",
	},
	{
		id: "string3",
		imageUrl: "/images/about/diff-3.png",
		titleKey: "support.title",
		descriptionKey: "support.description",
		imageClasses:
			"absolute -right-10 rtl:-left-10 rtl:right-[unset] top-0 -z-10 w-[300px] h-auto md:right-0 rtl:md:left-0 rtl:md:right-[unset] rtl:scale-x-[-1]",
	},
]

export default async function DifferentiatorsSection() {
	const t = await getTranslations("AboutUsPage.differentiators")
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<TypographyH3 className='text-center'>
					{t("title")}
				</TypographyH3>

				<div className='mt-[60px] grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{differentiatorItemsConfig.map((item) => (
						<div
							key={item.id}
							className='relative flex flex-col overflow-hidden rounded-2xl border border-neutral-500 after:absolute after:bg-linear-(--differentiators-card-gradient) after:inset-0 after:-z-10 p-6 pt-[212px] z-0'
						>
							<Image
								src={item.imageUrl}
								alt={t(`items.${item.titleKey}`)}
								className={item.imageClasses}
								width={300}
								height={300}
							></Image>
							<TypographyH5 className='text-2xl text-balance md:text-2xl! md:tracking-[0.24px]'>
								{t(`items.${item.titleKey}`)}
							</TypographyH5>
							<p className='text-dark/60 tracking-[0.16px] mt-2.5 max-w-[280px]'>
								{t(`items.${item.descriptionKey}`)}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
