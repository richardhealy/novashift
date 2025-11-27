import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import OfferSection from "./sections/offer"
import PlanningSection from "./sections/planning"

export const metadata: Metadata = {
	title: "AI Strategy Consulting — Build a Roadmap for ROI",
	description:
		"Don’t just adopt AI. Execute it with purpose. Our AI strategy consulting helps you identify high-impact opportunities and build a scalable roadmap.",
	openGraph: {
		title: "AI Strategy Consulting: Build a Roadmap for ROI",
		description:
			"Don’t just adopt AI. Execute it with purpose. Our AI strategy consulting helps you identify high-impact opportunities and build a scalable roadmap.",
		images: ["/og-ai-strategy.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/ai-strategy",
	},
}

export default async function AiStrategyPage() {
	const t = await getTranslations("AIStrategyPage.cta")
	return (
		<>
			<HeroSection />
			<OfferSection />
			<PlanningSection />
			<Cta
				title={t("title")}
				firstBtnText={t("firstBtn")}
				secondBtnText={t("secondBtn")}
			/>
		</>
	)
}
