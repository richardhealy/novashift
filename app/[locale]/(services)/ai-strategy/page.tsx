"use client"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import OfferSection from "./sections/offer"
import PlanningSection from "./sections/planning"

export default function AiStrategyPage() {
	const t = useTranslations("AIStrategyPage.cta")
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
