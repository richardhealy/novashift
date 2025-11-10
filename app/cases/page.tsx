import type { Metadata } from "next"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import MarketingVideoSection from "./sections/marketing-video"
import PokerBrainSection from "./sections/poker-brain"

export const metadata: Metadata = {
	title: "Case Studies — AI Automation Success Stories | NovaShift",
	description:
		"Real results from AI strategy implementations, workflow automations, and dedicated teams. See how NovaShift transforms businesses.",
	openGraph: {
		title: "NovaShift Case Studies: Proven AI Transformations",
		description:
			"Scalable AI solutions driving measurable results for clients.",
		images: ["/og-cases.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/case-studies",
	},
}
export default function CasesPage() {
	return (
		<>
			<HeroSection />
			<PokerBrainSection />
			<MarketingVideoSection />
			<Cta title='Interested in a chat?' firstBtnText='Book A Call' />
		</>
	)
}
