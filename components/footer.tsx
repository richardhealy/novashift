"use client"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import {
	FOOTER_COMPANY_MENU_LINKS,
	SERVICES_SUBMENU_ITEMS,
} from "@/config/navigation"
import { ROUTES } from "@/config/routes"

export default function Footer() {
	const t = useTranslations("Footer")
	const tNav = useTranslations("Navigation")
	const tServices = useTranslations("ServicesMenu")

	return (
		<footer className='border-t border-t-black/10 bg-blue-800 pt-16'>
			<div className='container'>
				<div className='flex flex-col gap-8 pb-16 md:w-full md:flex-row md:justify-between'>
					<div className='flex flex-col items-center md:w-full md:max-w-[403px] md:items-start'>
						<Link href={ROUTES.HOME}>
							<Image
								src='/images/global/logo-white.png'
								alt='footer logo'
								width={170}
								height={54}
							/>
						</Link>

						<p className='mt-6 text-center leading-[1.6] tracking-[0.16px] text-white md:text-left rtl:text-right'>
							{t("description")}
						</p>

						<a
							href='mailto:hello@novashift.ai'
							className='mt-6 flex items-center gap-2 font-medium text-white underline-offset-4 hover:underline'
						>
							<div className='flex size-7 items-center justify-center rounded-full bg-blue-700'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 16 16'
									fill='none'
								>
									<title>Mail Icon</title>
									<path
										d='M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM12.7144 4L8 8.32187L3.28562 4H12.7144ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z'
										fill='white'
									/>
								</svg>
							</div>
							{t("email")}
						</a>
					</div>
					<div className='flex flex-col gap-8 md:w-full lg:max-w-[549px] lg:flex-row'>
						<nav className='md:w-full md:max-w-[260px]'>
							<p className='text-xl font-bold text-white'>{t("services")}</p>
							<ul className='mt-4 w-full space-y-4'>
								{SERVICES_SUBMENU_ITEMS.map((link) => (
									<li key={link.href}>
										<Link
											className='leading-[1.4] tracking-[0.16px] text-blue-100 hover:text-white'
											href={link.href as any}
										>
											{tServices(link.labelKey as any)}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						<nav className='md:w-full md:max-w-[260px]'>
							<p className='text-xl font-bold text-white'>{t("company")}</p>
							<ul className='mt-4 w-full space-y-4'>
								{FOOTER_COMPANY_MENU_LINKS.map((link) => (
									<li key={link.href}>
										<Link
											className='leading-[1.4] tracking-[0.16px] text-blue-100 hover:text-white'
											href={link.href as any}
										>
											{tNav(link.labelKey as any)}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>

			<div className='border-t border-t-white/20 py-6'>
				<div className='container'>
					<div className='flex flex-col items-center gap-6 md:flex-row md:justify-between'>
						<p className='text-center text-sm tracking-[0.2px] text-blue-100/70 md:text-left'>
							{t("copyright")}
						</p>

						<nav>
							<ul className='flex items-center gap-9'>
								<li>
									<Link
										className='text-sm leading-[1.6] text-blue-100/70 hover:text-white'
										href={ROUTES.TERMS}
									>
										{t("termsOfService")}
									</Link>
								</li>
								<li>
									<Link
										className='text-sm leading-[1.6] text-blue-100/70 hover:text-white'
										href={ROUTES.PRIVACY}
									>
										{t("privacyPolicy")}
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	)
}
