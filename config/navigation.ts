import { ROUTES } from "./routes"

export type MenuItem = {
	labelKey: string
	href: string
	submenu?: SubmenuItem[]
}
export type SubmenuItem = {
	labelKey: string
	href: string
}

export const SERVICES_SUBMENU_ITEMS: SubmenuItem[] = [
	{
		labelKey: "aiStrategy",
		href: ROUTES.AI_STRATEGY,
	},
	{
		labelKey: "developmentTeam",
		href: ROUTES.TEAM,
	},
	{
		labelKey: "automation",
		href: ROUTES.AUTOMATION,
	},
] as const

export const MENU_LINKS: MenuItem[] = [
	{
		labelKey: "home",
		href: ROUTES.HOME,
	},
	{
		labelKey: "services",
		href: "#",
		submenu: SERVICES_SUBMENU_ITEMS,
	},
	{
		labelKey: "caseStudies",
		href: ROUTES.CASES,
	},
	{
		labelKey: "ai",
		href: ROUTES.AI,
	},
	{
		labelKey: "aboutUs",
		href: ROUTES.ABOUT_US,
	},
	{
		labelKey: "contactUs",
		href: ROUTES.CONTACT_US,
	},
] as const

export const FOOTER_COMPANY_MENU_LINKS: MenuItem[] = [
	{
		labelKey: "aboutUs",
		href: ROUTES.ABOUT_US,
	},
	{
		labelKey: "caseStudies",
		href: ROUTES.CASES,
	},
	{
		labelKey: "contactUs",
		href: ROUTES.CONTACT_US,
	},
] as const
