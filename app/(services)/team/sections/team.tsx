import Image from "next/image"
import { TypographyH3 } from "@/components/ui/typography"

export default function TeamSection() {
	return (
		<section>
			<div className='bg-blue-500 grid md:grid-cols-2 md:items-center'>
				<div className='md:relative z-0 w-full h-full'>
					<Image
						src={"/images/team/team-image.png"}
						alt='team image'
						width={720}
						height={740}
						className='min-h-[515px] md:min-h-auto object-cover w-full h-full md:absolute md:inset-0 z-10'
					/>
				</div>
				<div className='px-6 pt-11 pb-[52px] md:px-10 lg:px-20 lg:py-[100px] xl:py-[200px] xl:px-[90px]'>
					<div className='md:max-w-[518px]'>
						<TypographyH3 className='text-white leading-[1.4]'>
							Plug & Play Development Team
						</TypographyH3>
						<p className='text-white mt-8 text-xl tracking-[0.2px] font-medium leading-normal'>
							With decades of experience across over 30 companies, our team
							delivers AI-powered tools and systems that drive transformation.
							Whether you're validating a new idea or upgrading existing
							infrastructure, we design and build solutions with long-term
							growth in mind.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
