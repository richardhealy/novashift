"use client"
import { useTranslations } from "next-intl"
import { TypographyH3 } from "@/components/ui/typography"

export default function WhoWeAreSection() {
	const t = useTranslations("HomePage.whoWeAre")

	return (
		<section className='bg-blue-500 py-20 md:py-[100px]'>
			<div className='container'>
				<p className='text-center text-xl leading-normal font-bold tracking-[2px] text-white uppercase md:text-left rtl:md:text-right'>
					{t("label")}
				</p>
				<TypographyH3 className='mt-6 text-center leading-[1.4] font-normal tracking-[0.28px] text-white md:text-left rtl:md:text-right wrap-break-word'>
					{t("title")}
					<b>{t("titleBold")}</b>
				</TypographyH3>
			</div>
		</section>
	)
}
