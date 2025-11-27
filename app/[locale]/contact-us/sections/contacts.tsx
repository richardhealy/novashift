"use client"
import { useTranslations } from "next-intl"
import { TypographyH1 } from "@/components/ui/typography"
import ContactForm from "../_components/contact-form"

export default function ContactsSection() {
	const t = useTranslations("ContactPage.hero")

	return (
		<section className='pb-11 pt-[105px] md:pb-20 md:pt-[65px]'>
			<div className='container'>
				<div className='flex flex-col gap-14 md:flex-row md:justify-between'>
					<div className='flex flex-col gap-8 items-center text-center md:max-w-[300px] md:text-left rtl:md:text-right md:items-start rtl:md:items-end lg:max-w-[610px]'>
						<TypographyH1 className='leading-[1.4] md:text-left rtl:md:text-right'>{t("title")}</TypographyH1>
						<p className='text-xl font-medium leading-normal tracking-[0.2px] md:text-left rtl:md:text-right'>
							{t("subtitle")}
						</p>
						<p className='text-xl font-medium leading-normal tracking-[0.2px] md:text-left rtl:md:text-right'>
							{t("description")}
						</p>
					</div>
					<div className='md:max-w-[500px] md:w-full'>
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	)
}
