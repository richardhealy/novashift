"use client"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import Cta from "@/components/cta"
import AutomateSection from "./sections/automate"
import BenefitsSection from "./sections/benefits"
import HeroSection from "./sections/hero"
import SupportSection from "./sections/support"

export default function AutomationPage() {
	const t = useTranslations("AutomationPage.cta")
	return (
		<>
			<HeroSection />
			<BenefitsSection />
			<AutomateSection />
			<SupportSection />
			<Cta
				title={t("title")}
				firstBtnText={t("button")}
			/>
		</>
	)
}
