import Image from "next/image"
import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section className='bg-neutral-50 -mt-[58px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[130px] pb-[364px] md:flex-row md:pt-[200px] md:pb-40 xl:pt-[262px] xl:pb-[200px]'>
					<div className='md:max-w-[570px]'>
						<TypographyH1 className='text-center leading-[1.4] md:text-left md:leading-[1.2]!'>
							Dedicated Development Team
						</TypographyH1>
					</div>

					<div className='absolute bottom-0 shrink-0 max-w-[546px] mx-auto left-[-100px] right-[-100px] md:left-[unset] mx:m-0 lg:max-w-[600px] lg:-right-28 lg:h-auto xl:-right-[200px] xl:max-w-[800px] 2xl:max-w-[861px] 2xl:-right-[360px]'>
						<Image
							className='aspect-3/2 '
							src={"/about/hero-image.png"}
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
