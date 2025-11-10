import type { Metadata } from "next"
import Cta from "@/components/cta"
import ScrollableMenu from "./_components/scrollable-menu"
import HeroSection from "./sections/hero"

export const metadata: Metadata = {
	title: "Privacy Policy | NovaShift",
	description:
		"NovaShift Privacy Policy: How we handle your data in AI automation services.",
	robots: { index: false, follow: false },
	openGraph: {
		title: "Privacy Policy — NovaShift",
		images: ["/og-default.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/privacy",
	},
}
export default function PrivacyPage() {
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta title='Interested in a chat?' firstBtnText='Book A Call' />
		</>
	)
}
