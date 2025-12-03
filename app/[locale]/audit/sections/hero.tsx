import { getTranslations } from "next-intl/server"

export default async function AuditHero() {
	const t = await getTranslations("AuditPage.hero")
	return (
		<section className='container py-16 md:py-24'>
			<div className='max-w-3xl mx-auto text-center'>
				<h1 className='text-4xl md:text-5xl font-bold text-neutral-900 mb-6'>
					{t("title")}
				</h1>
				<p className='text-lg text-neutral-700 mb-8'>{t("description")}</p>
			</div>
		</section>
	)
}

