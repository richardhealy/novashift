import { useTranslations } from "next-intl"
import { TypographyH3 } from "@/components/ui/typography"

export default function SpecializeSection() {
	const t = useTranslations("AboutUsPage.specialize")
	return (
		<section className='bg-blue-500 py-20 md:py-[100px]'>
			<div className='container'>
				<TypographyH3 className='mt-6 text-center leading-[1.4] font-normal tracking-[0.28px] text-white md:text-left rtl:md:text-right'>
					{t("text")} <b>{t("textBold")}</b> {t("textAfter")}
				</TypographyH3>
			</div>
		</section>
	)
}
