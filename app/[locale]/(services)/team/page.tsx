"use client"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import ServicesSection from "./sections/services"
import TeamSection from "./sections/team"

export default function TeamPage() {
	const t = useTranslations("TeamPage.cta")
	return (
		<>
			<HeroSection />
			<TeamSection />
			<ServicesSection />
			<Cta
				title={t("title")}
				firstBtnText={t("button")}
			/>
		</>
	)
}
