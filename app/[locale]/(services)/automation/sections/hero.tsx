import Image from "next/image"
import { useTranslations } from "next-intl"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	const t = useTranslations("AutomationPage.hero")
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[102px] pb-[400px] md:flex-row md:pt-[237px] md:pb-[237px] xl:pt-[262px] xl:pb-[200px] min-h-[650px] md:min-h-[550px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left rtl:md:text-right md:leading-[1.2]!'>
							{t("title")}
						</TypographyH1>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left rtl:md:text-right'>
							{t("description")}
						</p>
					</div>

					<div className='absolute shrink-0 max-w-[352px] mx-auto -left-[30px] bottom-0 -right-[30px] md:left-[unset] rtl:md:right-[unset] rtl:md:-left-34 mx:m-0 md:max-w-[500px] lg:max-w-[500px] md:-right-34 md:-bottom-10 lg:h-auto xl:top-16 xl:right-0 rtl:xl:left-0 rtl:xl:right-[unset] xl:max-w-[638px]'>
						<Image
							className='aspect-389/379 rtl:scale-x-[-1]'
							src={"/images/automation/hero-image-new.png"}
							alt='hero image'
							width={638}
							height={758}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
