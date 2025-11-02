import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "@/config/routes"
import ButtonIcon from "./ui/button-icon"
import { TypographyH3 } from "./ui/typography"

type CtaProps = {
	title: string
	firstBtnText: string
	secondBtnText?: string
}
export default function Cta({ title, firstBtnText, secondBtnText }: CtaProps) {
	return (
		<section className='py-11 md:py-8 relative after:absolute after:w-full after:h-1/2 after:bg-blue-800 after:left-0 after:bottom-0 after:-z-10 '>
			<div className='container'>
				<div className='rounded-[40px] bg-neutral-black px-6 pb-11 pt-24 relative overflow-hidden lg:py-[60px] lg:px-[110px] lg:h-[435px] lg:flex lg:items-center'>
					<Image
						className='absolute right-[-100px] -top-42 w-[267px] h-auto lg:w-[350px] lg:top-[unset] lg:right-[unset] lg:-left-20 lg:-bottom-20 xl:-left-14 xl:bottom-[-130px] xl:w-[490px]'
						src={"/cta/cta-image.png"}
						alt='cta image'
						width={600}
						height={600}
					/>
					<div className='md:max-w-[574px] lg:ml-auto'>
						<p className='text-white font-medium uppercase tracking-[1.6px]'>
							GET IN TOUCH
						</p>

						<TypographyH3 className='text-white mt-2.5 tracking-[0.36px] md:tracking-[0.48px] leading-[1.4]'>
							{title}
						</TypographyH3>

						<div className='flex flex-col gap-6 mt-8 md:gap-8 sm:flex-row sm:w-full '>
							<Link
								href={ROUTES.CONTACT_US}
								className='btn btn-md btn-outline-lightblue with-icon text-center flex justify-center max-w-full [&_svg]:absolute [&_svg]:right-3 [&_svg]:top-3  sm:pr-13'
							>
								{firstBtnText}
								<ButtonIcon iconColor='white' />
							</Link>
							{secondBtnText && (
								<Link
									href={ROUTES.CONTACT_US}
									className='btn btn-md btn-outline-white with-icon text-center flex justify-center max-w-full [&_svg]:absolute [&_svg]:right-3 [&_svg]:top-3 sm:pr-13'
								>
									{secondBtnText}
									<ButtonIcon iconColor='white' />
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
