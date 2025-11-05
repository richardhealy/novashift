import type { Metadata } from "next"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import OfferSection from "./sections/offer"
import PlanningSection from "./sections/planning"

export const metadata: Metadata = {
	title: "AI Strategy & Consulting — Transformative Intelligence | NovaShift",
	description:
		"Transform your business with strategic AI implementation that drives measurable results. Tailored AI consulting by NovaShift specialists for transformative intelligence.",
	openGraph: {
		title: "AI Strategy & Consulting — NovaShift",
		description:
			"Transformative Intelligence, Tailored to Your Business. Strategic AI implementation for measurable business results.",
		images: ["/og-ai-strategy.jpg"],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		images: ["/twitter-ai-strategy.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/service/ai-strategy",
	},
}

export default function AiStrategyPage() {
	return (
		<>
			<HeroSection />
			<OfferSection />
			<PlanningSection />
			<Cta
				title='Let’s turn your AI potential into practical outcomes'
				firstBtnText='Talk to an expert'
				secondBtnText='Start The Free Audit'
			/>
		</>
	)
}
