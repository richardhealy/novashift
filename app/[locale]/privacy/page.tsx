"use client"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import Cta from "@/components/cta"
import ScrollableMenu from "./_components/scrollable-menu"
import HeroSection from "./sections/hero"

export default function PrivacyPage() {
	const t = useTranslations("PrivacyPage.cta")
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
