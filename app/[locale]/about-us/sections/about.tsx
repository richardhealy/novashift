import { useTranslations } from "next-intl"

export default function AboutSection() {
	const t = useTranslations("AboutUsPage.about")
	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<div className='space-y-6 text-center md:text-left rtl:md:text-right'>
					<p className='text-xl font-bold tracking-[2px] uppercase text-blue-500'>
						{t("title")}
					</p>

					<p className='text-xl tracking-[0.2px]'>
						{t("paragraph1")}
					</p>
					<p className='text-xl tracking-[0.2px]'>
						{t("paragraph2")}
					</p>
					<p className='text-xl tracking-[0.2px]'>
						{t("paragraph3")}
					</p>
				</div>
			</div>
		</section>
	)
}
