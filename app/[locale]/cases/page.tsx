import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Cta from "@/components/cta"
import DevelopmentAutomationSection from "./sections/development-automation"
import HeroSection from "./sections/hero"
import MarketingVideoSection from "./sections/marketing-video"
import PokerBrainSection from "./sections/poker-brain"
import SocialMediaSection from "./sections/social-media"

export const metadata: Metadata = {
	title: "AI Success Stories — Real Results, Real Growth",
	description:
		"See how NovaShift helps businesses transform with AI. Explore our case studies in automation, strategy, and custom development.",
	openGraph: {
		title: "AI Success Stories: Real Results, Real Growth",
		description:
			"See how NovaShift helps businesses transform with AI. Explore our case studies in automation, strategy, and custom development.",
		images: ["/og-cases.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/cases",
	},
}

export default async function CasesPage() {
	const t = await getTranslations("CasesPage.cta")
	return (
		<>
			<HeroSection />
			<PokerBrainSection />
			<DevelopmentAutomationSection />
			<MarketingVideoSection />
			<SocialMediaSection />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
