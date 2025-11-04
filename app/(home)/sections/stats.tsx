"use client"
import useMediaQuery from "@/hooks/useMediaQuery"
import type { StatisticItem } from "@/types/statistic"
import DesktopAccordion from "../_components/desktop-accordion"
import MobileAccordion from "../_components/mobile-accordion"

const statsItems: StatisticItem[] = [
	{
		title: "50+",
		text: "AI Projects Delivered",
		imageURL: "/home/stats-1.png",
		imageClasses:
			"w-[371px] h-[371px] absolute top-[-69px] right-[-114px] lg:w-[422px] lg:h-[422px] lg:-top-1 lg:right-[-87px]",
	},
	{
		title: "12",
		text: "Countries Served",
		imageURL: "/home/stats-2.png",
		imageClasses:
			"w-[464px] h-[696px] absolute top-[-183px] right-[-229px] lg:-top-16 lg:right-[-122px]",
	},
	{
		title: "11+",
		text: "industries served",
		imageURL: "/home/stats-3.png",
		imageClasses:
			"w-[532px] h-[534px] absolute top-[-120px] right-[-242px] lg:top-0 lg:right-[-175px]",
	},
	{
		title: "100+",
		text: "Custom Integrations Built",
		imageURL: "/home/stats-4.png",
		imageClasses:
			"w-[404px] h-[606px] absolute top-[-148px] right-[-187px] lg:-top-[18px] lg:-right-22",
	},
]

export default function StatisticSection() {
	const isDesktop = useMediaQuery("(min-width: 1024px)")

	return (
		<section className='p-0'>
			{isDesktop ? (
				<DesktopAccordion items={statsItems} />
			) : (
				<MobileAccordion items={statsItems} />
			)}
		</section>
	)
}
