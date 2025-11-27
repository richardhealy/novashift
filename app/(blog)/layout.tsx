import { Manrope } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import Footer from "@/components/footer"
import Header from "@/components/header/header"

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
})

export default async function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Blog pages always use English
	const messages = await getMessages({ locale: "en" })

	return (
		<html lang='en' dir='ltr' className='h-full'>
			<body
				id='body'
				className={`${manrope.variable} antialiased flex flex-col h-full`}
			>
				<NextIntlClientProvider messages={messages} locale='en'>
					<Header />
					<main className='flex-1'>{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
