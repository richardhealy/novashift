import { getTranslations } from "next-intl/server"
import Link from "next/link"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH2 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { Post } from "@/types/blog"
import InsightItem from "../_components/insight-item"

interface LatestInsightsSectionProps {
	posts: Post[]
}

export default async function LatestInsightsSection({
	posts,
}: LatestInsightsSectionProps) {
	const t = await getTranslations("HomePage.insights")
	const tCommon = await getTranslations("Common")

	return (
		<section className='py-20 md:py-[100px]' dir='ltr'>
			<div className='container'>
				<div className='flex items-center gap-5 flex-col md:flex-row md:gap-10 md:justify-between'>
					<div className='text-center space-y-6 md:text-left rtl:md:text-right md:max-w-[484px] md:w-full'>
						<TypographyH2>{t("title")}</TypographyH2>
						<p className='text-xl font-medium tracking-[0.2px]'>
							{t("description")}
						</p>
					</div>
					<Link href={ROUTES.AI} className='btn btn-md btn-primary with-icon mt-8 md:mt-0 pl-6 rtl:pr-8 rtl:pl-0'>
						{tCommon("viewAll")}
						<ButtonIcon iconColor={"white"} />
					</Link>
				</div>

				<div className='grid gap-6 mt-[60px] md:grid-cols-2 lg:grid-cols-3'>
					{posts.slice(0, 3).map((post) => (
						<InsightItem key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	)
}
