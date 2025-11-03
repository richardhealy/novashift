import Image from "next/image"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[130px] pb-[338px] md:flex-row md:pt-[200px] md:pb-40 xl:pt-[262px] xl:pb-[200px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left md:leading-[1.2]!'>
							AI Strategy & Consulting
						</TypographyH1>
						<p className='mt-4 text-center text-xl text-blue-500 font-medium tracking-[0.2px] md:text-left'>
							Transformative Intelligence, Tailored to Your Business
						</p>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px] md:text-left'>
							Transform your business with strategic AI implementation that
							drives measurable results
						</p>
					</div>

					<div className='absolute shrink-0 max-w-[484px] mx-auto bottom-[-50px] left-[-50px] right-[-50px] md:left-[unset] md:-right-[200px] md:max-w-[450px] mx:m-0 lg:max-w-[700px] lg:-right-20 lg:bottom-[-200px] lg:h-auto xl:-right-40 xl:max-w-[864px]'>
						<Image
							className='aspect-square'
							src={"/ai-strategy/hero-image.png"}
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
