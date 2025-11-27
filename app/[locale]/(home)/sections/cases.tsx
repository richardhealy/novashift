import { getTranslations } from "next-intl/server"
import { TypographyH2 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { CaseStudiesItem } from "@/types/case-studies.type"
import LargeCaseItem from "../_components/large-case-item"
import SmallCaseItem from "../_components/small-case-item"

export default async function CasesSection() {
	const t = await getTranslations("HomePage.cases")

	const largeCasePost: CaseStudiesItem = {
		id: "235623623626",
		href: ROUTES.CASE_POKER_BRAIN,
		title: t("pokerBrain.title"),
		description: t("pokerBrain.description"),
		imageUrl: "/images/home/large-case.png",
	}

	const smallCasePosts: CaseStudiesItem[] = [
		{
			id: "2356231246",
			href: ROUTES.CASE_AI_AUTOMATION,
			title: t("videoAutomation.title"),
			description: t("videoAutomation.description"),
			imageUrl: "/images/home/small-case-1.png",
		},
		{
			id: "235346246",
			href: ROUTES.CASE_DEVELOPMENT_AUTOMATION,
			title: t("devAutomation.title"),
			description: t("devAutomation.description"),
			imageUrl: "/images/home/small-case-2.png",
		},
		{
			id: "7681246",
			href: ROUTES.CASE_SOCIAL_MEDIA,
			title: t("socialMedia.title"),
			description: t("socialMedia.description"),
			imageUrl: "/images/home/small-case-3.png",
		},
	]

	return (
		<section className='py-20 md:py-[100px]'>
			<div className='container'>
				<div className='space-y-2.5 text-center'>
					<TypographyH2>{t("title")}</TypographyH2>
					<p className='text-xl font-bold text-blue-500'>{t("subtitle")}</p>
				</div>

				<div className='mt-[60px] grid gap-6 md:grid-cols-2'>
					<LargeCaseItem post={largeCasePost} />

					<div className='grid gap-4'>
						{smallCasePosts.map((post) => (
							<SmallCaseItem key={post.id} post={post} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
