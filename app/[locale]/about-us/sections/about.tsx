import { getTranslations } from "next-intl/server"

export default async function AboutSection() {
	const t = await getTranslations("AboutUsPage.about")
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
