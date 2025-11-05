import Image from "next/image"
import { TypographyH3 } from "@/components/ui/typography"

export default function SupportSection() {
	return (
		<section>
			<div className='grid md:grid-cols-2 md:items-center'>
				<div className='md:relative z-0 w-full h-full'>
					<Image
						src={"/images/automation/support.png"}
						alt='team image'
						width={720}
						height={740}
						className='min-h-[515px] md:min-h-auto object-cover w-full h-full md:absolute md:inset-0 z-10'
					/>
				</div>
				<div className='px-6 pt-11 pb-[52px] md:px-10 lg:px-20 lg:py-[100px] xl:py-[200px] xl:px-[90px]'>
					<div className='md:max-w-[518px]'>
						<TypographyH3 className='leading-[1.4]'>
							Strategic Support for Long-Term Success
						</TypographyH3>
						<p className='mt-8 text-xl tracking-[0.2px] font-medium leading-normal'>
							We provide ongoing support through proactive monitoring,
							performance optimization, and tailored training—ensuring your
							systems continue to evolve in alignment with your business
							objectives. While you focus on strategic growth, we safeguard and
							strengthen the technological infrastructure that supports it.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
