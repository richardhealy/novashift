import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "@/config/routes"

export default function NotFound() {
	return (
		<section>
			<div className='container'>
				<div className='mx-auto pt-32 pb-[200px] flex flex-col items-center justify-center gap-8 2xl:md:py-[262px]'>
					<Image
						src='/images/global/404.png'
						alt='page not found'
						width={534}
						height={251}
					/>

					<h5 className='text-center font-bold text-neutral-900'>
						This page couldn’t be found
					</h5>
					<Link className='btn btn-md btn-primary px-5' href={ROUTES.HOME}>
						Go Back
					</Link>
				</div>
			</div>
		</section>
	)
}
