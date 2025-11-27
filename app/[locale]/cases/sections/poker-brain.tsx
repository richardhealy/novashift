import { getTranslations } from "next-intl/server"
import { TypographyH4 } from "@/components/ui/typography"
import type { CaseAccordionProps } from "@/types/case-studies.type"
import CaseAccordion from "../_components/case-accordion"

export default async function PokerBrainSection() {
	const t = await getTranslations("CasesPage.pokerBrain")
	
	const data: CaseAccordionProps = {
		accordionData: [
			{
				id: "01",
				title: t("challenge.title"),
				text: t("challenge.text"),
			},
			{
				id: "02",
				title: t("solution.title"),
				text: t("solution.text"),
			},
			{
				id: "03",
				title: t("results.title"),
				text: t("results.text"),
			},
			{
				id: "04",
				title: t("whyWorks.title"),
				text: t("whyWorks.text"),
			},
		],
		imageUrl: "/images/cases/accordion-1.png",
		imageClass: "aspect-square",
	}
	
	return (
		<section className='py-12 md:py-20' id='poker-brain'>
			<div className='container'>
				<div className='flex flex-col gap-8 items-center text-center md:grid md:grid-cols-2 md:gap-4 md:text-left rtl:md:text-right md:items-start'>
					<TypographyH4 className='md:text-4xl md:leading-[1.4]'>
						{t("title")}
					</TypographyH4>
					<p className='text-neutral-900 text-xl tracking-[0.2px]'>
						{t("subtitle")}
					</p>
				</div>

				<div className='mt-12 md:mt-[60px]'>
					<CaseAccordion
						accordionData={data.accordionData}
						imageUrl={data.imageUrl}
						imageClass={data.imageClass}
					/>
				</div>
			</div>
		</section>
	)
}
