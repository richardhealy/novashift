import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { TypographyH1 } from "@/components/ui/typography"

export default async function HeroSection() {
	const t = await getTranslations("TeamPage.hero")
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[101px] pb-[350px] md:flex-row md:pt-[200px] md:pb-40 xl:pt-[262px] xl:pb-[200px] min-h-[600px] md:min-h-[500px] rtl:md:min-h-[670px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left rtl:md:text-right md:leading-[1.2]!'>
							{t("title")}
						</TypographyH1>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left rtl:md:text-right'>
							{t("description")}
						</p>
					</div>

					<div className='absolute bottom-0 shrink-0 max-w-[471px] mx-auto -left-20 -right-20 md:left-[unset] rtl:md:right-[unset] rtl:md:-left-6 mx:m-0 md:max-w-[400px] lg:max-w-[600px] md:-right-6 md:-bottom-10 lg:h-auto xl:-top-10 xl:-right-[124px] rtl:xl:-left-[124px] rtl:xl:right-[unset] xl:bottom-[unset] xl:max-w-[947px] 2xl:max-w-[846px]'>
						<Image
							className='aspect-auto rtl:scale-x-[-1]'
							src={"/images/team/hero-image.png"}
							alt='hero image'
							width={847}
							height={762}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
