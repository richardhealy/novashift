import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { TypographyH1 } from "@/components/ui/typography"

export default async function HeroSection() {
	const t = await getTranslations("AboutPage.hero")

	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[130px] pb-[364px] md:flex-row md:pt-[200px] md:pb-40 xl:pt-[262px] xl:pb-[200px] min-h-[600px] md:min-h-[500px]'>
					<div className='md:max-w-[570px] rtl:md:max-w-[470px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left rtl:md:text-right md:leading-[1.2]!'>
							{t("title")}
						</TypographyH1>
					</div>

					<div className='absolute bottom-0 shrink-0 max-w-[546px] mx-auto left-[-100px] right-[-100px] md:left-[unset] rtl:md:right-[unset] rtl:md:left-0 mx:m-0 lg:max-w-[600px] lg:-right-28 rtl:lg:-left-28 rtl:lg:right-[unset] lg:h-auto xl:-right-[200px] rtl:xl:-left-[200px] rtl:xl:right-[unset] xl:max-w-[800px] 2xl:max-w-[861px] 2xl:-right-[360px] rtl:2xl:-left-[360px] rtl:2xl:right-[unset]'>
						<Image
							className='aspect-3/2 rtl:scale-x-[-1]'
							src={"/images/about/hero-image-new.png"}
							alt='hero image'
							width={861}
							height={573}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
