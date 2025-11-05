"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MENU_LINKS } from "@/config/navigation"
import { ROUTES } from "@/config/routes"
import BurgerButton from "./burger-button"
import DesktopMenu from "./desktop-menu"
import MobileMenu from "./mobile-menu"

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false)
	}

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}

		return () => {
			document.body.classList.remove("overflow-hidden")
		}
	}, [isMobileMenuOpen])

	return (
		<header className='py-4 relative z-10'>
			<div className='container'>
				<div className='flex items-center justify-between'>
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

					<DesktopMenu items={MENU_LINKS} />

					<MobileMenu
						items={MENU_LINKS}
						isOpen={isMobileMenuOpen}
						onClose={closeMobileMenu}
					/>

					<BurgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
				</div>
			</div>
		</header>
	)
}
