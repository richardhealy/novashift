import type { Metadata } from "next"
import ScrollableMenu from "@/app/terms/_components/scrollable-menu"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"

export const metadata: Metadata = {
	title: "Terms of Service | NovaShift",
	description:
		"NovaShift Terms of Service for AI consulting and automation solutions.",
	robots: { index: false, follow: false }, // Не индексировать
	openGraph: {
		title: "Terms of Service — NovaShift",
		images: ["/og-default.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/terms",
	},
}

export default function TermsPage() {
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta
				title='Prefer to skip the form and book time directly?'
				firstBtnText='Get Free Consultation'
			/>
		</>
	)
}
