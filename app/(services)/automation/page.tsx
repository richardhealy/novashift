import type { Metadata } from "next"
import Cta from "@/components/cta"
import AutomateSection from "./sections/automate"
import BenefitsSection from "./sections/benefits"
import HeroSection from "./sections/hero"
import SupportSection from "./sections/support"

export const metadata: Metadata = {
	title: "AI Workflow Automations — Scalable Solutions | NovaShift",
	description:
		"Build scalable workflow automations with AI specialists at NovaShift. Streamline operations, reduce costs, and scale your business efficiently.",
	openGraph: {
		title: "Workflow Automations — NovaShift AI Services",
		description:
			"Scalable Solutions Built by AI Specialists. Automate your workflows for faster business transformation.",
		images: ["/og-workflow-automation.jpg"],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		images: ["/twitter-workflow-automation.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/service/ai-automation",
	},
}

export default function AutomationPage() {
	return (
		<>
			<HeroSection />
			<BenefitsSection />
			<AutomateSection />
			<SupportSection />
			<Cta
				title='Ready to Automate Your Workflows?'
				firstBtnText='Get Free Consultation'
			/>
		</>
	)
}
