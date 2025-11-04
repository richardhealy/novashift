import Link from "next/link"
import type { MenuItem } from "@/config/navigation"

interface DesktopSubmenuProps {
	submenu: MenuItem[]
}

export default function DesktopSubmenu({ submenu }: DesktopSubmenuProps) {
	return (
		<ul className='submenu'>
			{submenu.map((subItem) => (
				<li key={subItem.href}>
					<Link className='submenu-link' href={subItem.href}>
						{subItem.label}
					</Link>
				</li>
			))}
		</ul>
	)
}
