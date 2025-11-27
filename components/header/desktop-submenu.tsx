"use client"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import type { MenuItem } from "@/config/navigation"

interface DesktopSubmenuProps {
	submenu: MenuItem[]
}

export default function DesktopSubmenu({ submenu }: DesktopSubmenuProps) {
	const t = useTranslations("ServicesMenu")

	return (
		<ul className='submenu'>
			{submenu.map((subItem) => (
				<li key={subItem.href}>
					<Link className='submenu-link' href={subItem.href as any}>
						{t(subItem.labelKey as any)}
					</Link>
				</li>
			))}
		</ul>
	)
}
