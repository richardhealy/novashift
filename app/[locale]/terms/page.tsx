"use client"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import ScrollableMenu from "./_components/scrollable-menu"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"

export default function TermsPage() {
	const t = useTranslations("TermsPage.cta")
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
