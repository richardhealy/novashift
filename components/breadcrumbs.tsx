"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { BreadcrumbItem } from "@/types/breadcrumbs"

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav aria-label='Breadcrumb' className='flex items-center gap-2.5'>
			<ul>
				<li className='flex items-center gap-2.5'>
					{items.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className={cn(
								"inline-flex items-center gap-2.5 text-neutral-700 tracking-[0.16px] leading-[1.6] hover:text-neutral-900 first:[&_svg]:hidden",
								item.isCurrent && "font-bold text-neutral-900",
							)}
						>
							<svg
								width='6'
								height='14'
								viewBox='0 0 6 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<title>Breadcrumbs Separator</title>
								<path
									className={cn(
										"fill-neutral-700",
										item.isCurrent && "fill-neutral-900",
									)}
									d='M5.26722 -2.86102e-06L1.51722 13.9318H0.000177562L3.75018 -2.86102e-06H5.26722Z'
								/>
							</svg>
							<span>{item.label}</span>
						</Link>
					))}
				</li>
			</ul>
		</nav>
	)
}
