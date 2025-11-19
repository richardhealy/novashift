import Image from "next/image"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[102px] pb-[416px] md:flex-row md:pt-[237px] md:pb-[237px] xl:pt-[244px] xl:pb-[252px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left md:leading-[1.2]!'>
							Case Studies
						</TypographyH1>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left'>
							Explore how we help startups and businesses transform ideas into
							scalable, AI-powered solutions. Each case study showcases our
							process—from discovery to delivery.
						</p>
					</div>

					<div className='absolute shrink-0 max-w-[530px] mx-auto -left-[68px] bottom-0 -right-[68px] md:left-[unset] mx:m-0 md:max-w-[400px] lg:max-w-[500px] md:-right-20 md:-bottom-10 lg:h-auto xl:top-0 xl:-right-[110px] xl:max-w-[808px]'>
						<Image
							className='aspect-530/453'
							src={"/images/cases/hero-image-new.png"}
							alt='hero image'
							width={808}
							height={690}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
