"use client"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import Cta from "@/components/cta"
import DevelopmentAutomationSection from "./sections/development-automation"
import HeroSection from "./sections/hero"
import MarketingVideoSection from "./sections/marketing-video"
import PokerBrainSection from "./sections/poker-brain"
import SocialMediaSection from "./sections/social-media"

export default function CasesPage() {
	const t = useTranslations("CasesPage.cta")
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
