"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { MenuItem } from "@/config/navigation"
import { ROUTES } from "@/config/routes"

/** Props for the mobile menu component */
interface MobileMenuProps {
	items: MenuItem[]
	isOpen: boolean
	onClose: () => void
}
export default function MobileMenu({
	items,
	isOpen,
	onClose,
}: MobileMenuProps) {
	// Track which submenu is currently expanded
	const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)

	/**
	 * Toggle submenu expansion state
	 * @param index - Index of the submenu to toggle
	 */
	const toggleSubmenu = (index: number) => {
		setActiveSubmenu(activeSubmenu === index ? null : index)
	}

	/**
	 * Handle link clicks - close menu if navigating away
	 * @param href - Link destination
	 */
	const handleLinkClick = (href: string) => {
		if (href && href !== "#") {
			onClose()
		}
	}

	return (
		<>
			{/* Mobile menu drawer */}
			<div
				id='mobile-menu'
				aria-hidden={!isOpen}
				className={`fixed top-0 left-0 z-10 h-full w-[80%] transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className='flex h-full w-full flex-col p-4'>
					<Link href={ROUTES.HOME}>
						<Image
							className='w-[120px] md:w-[194px]'
							loading='eager'
							src='/images/global/logo.png'
							alt='logo'
							width={194}
							height={60}
						/>
					</Link>

					<nav className='mt-10 w-full flex-1' aria-label='Mobile menu'>
						<ul className='divide-y divide-neutral-300'>
							{items.map((item, index) => (
								<li
									key={item.href}
									className={`${item.submenu ? "group relative" : ""} ${
										activeSubmenu === index ? "active" : ""
									}`}
								>
									{item.submenu ? (
										// Mobile menu item with submenu (accordion)
										<div className='flex w-full flex-col'>
											<button
												type='button'
												className='mobile-menu-link flex w-full items-center justify-between gap-2'
												aria-haspopup='true'
												aria-expanded={activeSubmenu === index}
												onClick={() => toggleSubmenu(index)}
											>
												<span>{item.label}</span>
												<svg
													aria-hidden='true'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													className={`transition-transform ${
														activeSubmenu === index ? "rotate-180" : ""
													}`}
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M7 10L12 15L17 10'
														stroke='#121826'
														strokeWidth='3'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
											</button>

											{/* Accordion submenu content */}
											<div
												className={`grid transition-all duration-500 ${
													activeSubmenu === index
														? "grid-rows-[1fr]"
														: "grid-rows-[0fr]"
												}`}
											>
												<div className='overflow-hidden'>
													<ul className='mb-2'>
														{item.submenu.map((subItem) => (
															<li key={subItem.href}>
																<Link
																	href={subItem.href}
																	className='mobile-submenu-link'
																	onClick={() => handleLinkClick(subItem.href)}
																>
																	{subItem.label}
																</Link>
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>
									) : (
										// Regular mobile menu item (no submenu)
										<Link
											href={item.href}
											className='mobile-menu-link'
											onClick={() => handleLinkClick(item.href)}
										>
											{item.label}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>

			{/* Overlay - darkens background when menu is open */}
			<div
				id='mobile-menu-overlay'
				aria-hidden={!isOpen}
				role='presentation'
				className={`fixed inset-0 z-0 bg-neutral-900/90 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
					isOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				onClick={onClose}
			/>
		</>
	)
}
