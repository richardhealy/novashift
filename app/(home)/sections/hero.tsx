import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section className='relative z-0 bg-[#F9F9FB] -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[130px] pb-[406px] md:flex-row md:pt-[230px] md:pb-[189px]'>
					<div className='md:max-w-[575px]'>
						<TypographyH1 className='text-center md:text-left'>
							AI Automation That Transforms How Business Works
						</TypographyH1>
						<p className='mt-4 text-center font-medium md:text-left md:text-xl'>
							Build Smarter. Move Faster.
						</p>

						<div className='mt-8 flex flex-col items-center justify-center gap-3 min-[374px]:flex-row md:justify-start'>
							<Button variant='outline'>Book a call</Button>
							<Button variant='primary' withIcon>
								AI Readiness Audit
							</Button>
						</div>
					</div>
					<div className='absolute shrink-0 max-w-[522px] mx-auto bottom-0 -left-16 -right-16 md:left-[unset] md:-right-20 md:max-w-[450px] mx:m-0 lg:max-w-[700px] lg:-right-20 lg:h-auto xl:-right-36 xl:max-w-[902px]'>
						<Image
							className='aspect-902/745'
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
