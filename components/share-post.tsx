import Image from "next/image"
import type { ShareLink } from "@/types/blog"

interface SharePostProps {
	links: ShareLink[]
}

export default function SharePost({ links }: SharePostProps) {
	return (
		<div className='p-4 rounded-2xl bg-neutral-100 flex justify-between items-center flex-wrap gap-4'>
			<p className='text-neutral-black font-medium'>Share this article</p>
			<ul className='flex items-center gap-2.5'>
				{links.map((link) => (
					<li key={link.link}>
						<button
							type='button'
							className='size-10 rounded-full flex items-center justify-center bg-neutral-300 hover:bg-neutral-500 transition-colors'
						>
							<Image
								src={link.iconUrl}
								width={20}
								height={20}
								alt='social icon'
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
