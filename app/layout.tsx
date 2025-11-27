import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	metadataBase: new URL("https://novashift.vercel.app"),
	title: {
		template: "%s | NovaShift",
		default: "NovaShift — AI Automation That Transforms How Business Works",
	},
	description:
		"AI Automation That Transforms How Business Works. Build Smarter. Move Faster.",
	authors: [{ name: "NovaShift Team" }],
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "NovaShift",
		images: [
			{
				url: "/og-default.jpg",
				width: 1200,
				height: 630,
				alt: "NovaShift — AI Automation for Business",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@novashift",
		images: ["/twitter-default.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "/",
	},
	verification: {
		google: "your-google-site-verification-code",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}
