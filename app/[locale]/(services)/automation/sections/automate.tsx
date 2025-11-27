import { getTranslations } from "next-intl/server"
import { TypographyH3 } from "@/components/ui/typography"

export default async function AutomateSection() {
	const t = await getTranslations("AutomationPage.automate")
	return (
		<section className='bg-blue-500 py-20 md:py-[100px]'>
			<div className='container'>
				<TypographyH3 className='leading-[1.4] font-normal tracking-[0.36px] md:tracking-[0.68px] text-white md:text-left rtl:md:text-right'>
					<b>{t("textBold")}</b> {t("textAfter")}
				</TypographyH3>
			</div>
		</section>
	)
}
