import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH1 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

export default async function HeroSection() {
	const t = await getTranslations("HomePage.hero")

	return (
		<section className='relative z-0 bg-[#F9F9FB] -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col min-h-[536px] pt-[130px] pb-[406px] md:flex-row md:min-h-[750px] md:pt-[230px] md:pb-[189px] xl:min-h-[680px]'>
					<div className='md:max-w-[575px] rtl:md:max-w-[475px]'>
						<TypographyH1 className='text-center md:text-left rtl:md:text-right'>
							{t("title")}
						</TypographyH1>
						<p className='mt-4 text-center font-medium md:text-left rtl:md:text-right md:text-xl'>
							{t("subtitle")}
						</p>

						<div className='mt-8 flex flex-col items-center justify-center gap-3 min-[374px]:flex-row md:justify-start'>
							<Link href={ROUTES.CONTACT_US} className='btn btn-md btn-outline'>
								{t("bookCall")}
							</Link>

							<Link
								href={`${ROUTES.AI_STRATEGY}#offer-section` as any}
								className='btn btn-md btn-primary with-icon'
							>
								{t("aiAudit")}
								<ButtonIcon iconColor={"white"} />
							</Link>
						</div>
					</div>
					<div className='absolute shrink-0 max-w-[522px] mx-auto bottom-0 -left-16 -right-16 md:left-auto md:right-auto md:-end-20 lg:max-w-[700px] lg:-end-20 lg:h-auto xl:-end-36 xl:max-w-[902px]'>
						<Image
							className='aspect-902/745 rtl:scale-x-[-1]'
							src={"/images/home/hero-image.png"}
							alt='hero image'
							width={902}
							height={745}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
