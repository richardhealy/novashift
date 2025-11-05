import Image from "next/image"
import Link from "next/link"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH3 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

export default function TransformSection() {
	return (
		<section className='relative z-0 overflow-hidden bg-blue-500 py-[60px] md:py-[100px]'>
			<Image
				src='/images/home/transform.png'
				alt='image'
				width={650}
				height={650}
				className='absolute top-[-120px] right-[-130px] -z-10 w-[300px] lg:-top-20 lg:-right-20 lg:w-[400px] xl:top-[unset] xl:right-[unset] xl:-bottom-40 xl:left-[5%] xl:w-[520px] 2xl:w-[580px]'
			/>
			<div className='container'>
				<div className='max-w-[574px] xl:ml-auto'>
					<TypographyH3 className='w-1/2 text-balance text-white md:w-full'>
						Transform Your Business with AI
					</TypographyH3>
					<p className='mt-4 text-xl text-blue-100'>
						Ready to unlock the potential of artificial intelligence for your
						organization? Let's discuss how our AI solutions can drive growth,
						efficiency, and innovation in your business.
					</p>

					<Link
						href={ROUTES.CONTACT_US}
						className='btn btn-md btn-outline-lightblue with-icon mt-8'
					>
						Get Free Consultation
						<ButtonIcon iconColor={"white"} />
					</Link>
				</div>
			</div>
		</section>
	)
}
