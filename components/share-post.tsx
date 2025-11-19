import Image from "next/image"
import Link from "next/link"

export default function SharePost() {
	return (
		<div className='p-4 rounded-2xl bg-neutral-100 flex justify-between items-center flex-wrap gap-4'>
			<p className='text-neutral-black font-medium'>Share this article</p>
			<ul className='flex items-center gap-2.5'>
				<li>
					<Link
						target='_blank'
						href={"https://facebook.com"}
						className='size-10 rounded-full flex items-center justify-center bg-neutral-300 hover:bg-neutral-500 transition-colors'
					>
						<Image
							src={"/images/icons/facebook.svg"}
							width={20}
							height={20}
							alt='social icon'
						/>
					</Link>
				</li>
				<li>
					<Link
						target='_blank'
						href={"https://x.com"}
						className='size-10 rounded-full flex items-center justify-center bg-neutral-300 hover:bg-neutral-500 transition-colors'
					>
						<Image
							src={"/images/icons/twitter.svg"}
							width={20}
							height={20}
							alt='social icon'
						/>
					</Link>
				</li>
				<li>
					<Link
						target='_blank'
						href={"https://linkedin.com"}
						className='size-10 rounded-full flex items-center justify-center bg-neutral-300 hover:bg-neutral-500 transition-colors'
					>
						<Image
							src={"/images/icons/linkedin.svg"}
							width={20}
							height={20}
							alt='social icon'
						/>
					</Link>
				</li>
				<li>
					<Link
						href={"mailto:hello@novashift.ai"}
						className='size-10 rounded-full flex items-center justify-center bg-neutral-300 hover:bg-neutral-500 transition-colors'
					>
						<Image
							src={"/images/icons/email.svg"}
							width={20}
							height={20}
							alt='social icon'
						/>
					</Link>
				</li>
			</ul>
		</div>
	)
}
