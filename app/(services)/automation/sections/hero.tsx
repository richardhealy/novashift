import Image from "next/image"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[102px] pb-[400px] md:flex-row md:pt-[237px] md:pb-[237px] xl:pt-[262px] xl:pb-[200px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left md:leading-[1.2]!'>
							Workflow Automations
						</TypographyH1>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left'>
							Scalable Solutions Built by AI Specialists
						</p>
					</div>

					<div className='absolute shrink-0 max-w-[452px] mx-auto -left-[30px] bottom-0 -right-[30px] md:left-[unset] mx:m-0 md:max-w-[400px] lg:max-w-[500px] md:-right-6 md:-bottom-10 lg:h-auto xl:-top-6 xl:-right-14 xl:max-w-[778px]'>
						<Image
							className='aspect-389/379'
							src={"/images/automation/hero-image.png"}
							alt='hero image'
							width={778}
							height={758}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
