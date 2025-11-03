import Image from "next/image"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[101px] pb-[350px] md:flex-row md:pt-[200px] md:pb-40 xl:pt-[262px] xl:pb-[200px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left md:leading-[1.2]!'>
							Dedicated Development Team
						</TypographyH1>
						<p className='mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left'>
							Scalable Solutions Built by AI Specialists
						</p>
					</div>

					<div className='absolute bottom-[-90px] shrink-0 max-w-[471px] mx-auto -left-20 -right-20 md:left-[unset] mx:m-0 md:max-w-[400px] lg:max-w-[600px] md:-right-6 md:-bottom-10 lg:h-auto xl:-top-10 xl:-right-[124px] xl:bottom-[unset] xl:max-w-[847px] 2xl:max-w-[846px]'>
						<Image
							className='aspect-471/424'
							src={"/team/hero-image.png"}
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
