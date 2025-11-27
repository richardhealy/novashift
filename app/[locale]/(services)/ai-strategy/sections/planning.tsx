import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH3 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

export default function PlanningSection() {
	const t = useTranslations("AIStrategyPage.planning")
	return (
		<section className='pt-10 pb-20 md:py-[100px] bg-[#0D63EC]'>
			<div className='container max-w-[1000px]'>
				<TypographyH3 className='text-white text-center'>
					{t("title")}
				</TypographyH3>
				<p className='text-blue-800 text-xl font-bold text-center tracking-[0.2px] mt-2.5'>
					{t("subtitle")}
				</p>
				<p className='text-white text-center text-xl font-medium tracking-[0.2px] mt-8'>
					{t("description")}
				</p>

				<ul className='mt-8 grid gap-4 md:grid-cols-2'>
					<li className='flex items-start gap-2.5 rtl:flex-row-reverse'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
							className='rtl:scale-x-[-1]'
						/>
						<p className='text-white'>
							<b>{t("scope")}</b>: {t("scopeText")}
						</p>
					</li>
					<li className='flex items-start gap-2.5 rtl:flex-row-reverse'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
							className='rtl:scale-x-[-1]'
						/>
						<p className='text-white'>
							<b>{t("activities")}</b>: {t("activitiesText")}
						</p>
					</li>
					<li className='flex items-start gap-2.5 rtl:flex-row-reverse'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
							className='rtl:scale-x-[-1]'
						/>
						<p className='text-white'>
							<b>{t("whatYouReceive")}</b>: {t("whatYouReceiveText")}
						</p>
					</li>
					<li className='flex items-start gap-2.5 rtl:flex-row-reverse'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
							className='rtl:scale-x-[-1]'
						/>
						<p className='text-white'>
							<b>{t("timeEffort")}</b>: {t("timeEffortText")}
						</p>
					</li>
				</ul>

				<Link
					href={ROUTES.CONTACT_US}
					className='btn btn-md btn-primary-dark with-icon mt-8 mx-auto'
				>
					{t("button")}
					<ButtonIcon iconColor='#1F2937' />
				</Link>
			</div>
		</section>
	)
}
