import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { TypographyH1 } from "@/components/ui/typography"

export default async function HeroSection() {
	const t = await getTranslations("AIStrategyPage.hero")
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[130px] pb-[338px] md:flex-row md:pt-[200px] md:pb-40 xl:pt-[262px] xl:pb-[200px] min-h-[600px] md:min-h-[500px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left rtl:md:text-right md:leading-[1.2]!'>
							{t("title")}
						</TypographyH1>
						<p className='mt-4 text-center text-xl text-blue-500 font-bold tracking-[0.2px] md:text-left rtl:md:text-right'>
							{t("subtitle")}
						</p>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left rtl:md:text-right'>
							{t("description")}
						</p>
					</div>

					<div className='absolute shrink-0 max-w-[484px] mx-auto bottom-[-50px] left-[-50px] right-[-50px] md:left-[unset] rtl:md:right-[unset] rtl:md:-left-[200px] md:-right-[200px] md:max-w-[450px] mx:m-0 lg:max-w-[864px] lg:-right-20 rtl:lg:-left-20 rtl:lg:right-[unset] lg:bottom-[-180px] lg:h-auto xl:-right-40 rtl:xl:-left-40 rtl:xl:right-[unset]'>
						<Image
							className='aspect-square rtl:scale-x-[-1]'
							src={"/images/ai-strategy/hero-image.png"}
							alt='hero image'
							width={864}
							height={864}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
