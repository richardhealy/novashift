"use client"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { useState, useTransition } from "react"

export default function LanguageSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)

	const languages = [
		{ code: "en", name: "EN" },
		{ code: "ar", name: "عربي" },
	]

	const currentLanguage =
		languages.find((lang) => lang.code === locale) || languages[0]

	const switchLanguage = (newLocale: string) => {
		startTransition(() => {
			router.replace(pathname, { locale: newLocale })
			setIsOpen(false)
		})
	}

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-800 hover:text-blue-500 transition-colors'
				aria-label='Switch language'
				disabled={isPending}
			>
				<span>{currentLanguage.name}</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M4.42998 4.99998L7.99998 8.70848L11.57 4.99998L12.6666 6.14168L7.99998 11L3.33331 6.14168L4.42998 4.99998Z'
						fill='currentColor'
					/>
				</svg>
			</button>

			{isOpen && (
				<>
					<div
						className='fixed inset-0 z-10'
						onClick={() => setIsOpen(false)}
					/>
					<div className='absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-20'>
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => switchLanguage(lang.code)}
								className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors ${
									locale === lang.code
										? "bg-blue-50 text-blue-600 font-medium"
										: "text-neutral-700 hover:bg-neutral-50"
								}`}
								disabled={isPending}
							>
								<span>{lang.name}</span>
								{locale === lang.code && (
									<svg
										className='ml-auto'
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
									>
										<path
											d='M13.3334 4L6.00002 11.3333L2.66669 8'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}

