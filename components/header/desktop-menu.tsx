"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { MenuItem } from "@/config/navigation"
import { cn } from "@/lib/utils"
import DesktopSubmenu from "./desktop-submenu"

interface DesktopMenuProps {
	items: MenuItem[]
}

export default function DesktopMenu({ items }: DesktopMenuProps) {
	const pathname = usePathname()

	return (
		<nav aria-label='Main menu' className='menu z-10 hidden md:flex'>
			<ul className='flex items-center gap-8'>
				{items.map((item) => (
					<li
						key={item.href}
						className={cn(
							"menu-item",
							item.submenu && "group/submenu relative",
						)}
					>
						{item.submenu ? (
							<div>
								<button
									type='button'
									className='menu-link'
									aria-haspopup='true'
									aria-expanded='false'
								>
									<span>{item.label}</span>

									<svg
										aria-hidden='true'
										className='transition-transform group-hover/submenu:rotate-180'
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
									>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M4.42998 4.99998L7.99998 8.70848L11.57 4.99998L12.6666 6.14168L7.99998 11L3.33331 6.14168L4.42998 4.99998Z'
											fill='#4B5563'
											className='stroke-current'
										/>
									</svg>
								</button>
								<DesktopSubmenu submenu={item.submenu} />
							</div>
						) : (
							<Link
								href={item.href}
								className={cn("menu-link", pathname === item.href && "current")}
							>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}
