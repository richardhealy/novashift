import { Manrope } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import Footer from "@/components/footer"
import Header from "@/components/header/header"

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
})

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html
			lang={locale}
			dir={locale === "ar" ? "rtl" : "ltr"}
			className='h-full'
		>
			<body
				id='body'
				className={`${manrope.variable} antialiased flex flex-col h-full`}
			>
				<NextIntlClientProvider messages={messages}>
					<Header />
					<main className='flex-1'>{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
