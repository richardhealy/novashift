import { getTranslations } from "next-intl/server"
import Cta from "@/components/cta"
import ScrollableMenu from "./_components/scrollable-menu"
import HeroSection from "./sections/hero"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "PrivacyPage.meta" })
	return {
		title: t("title"),
		description: t("description"),
	}
}

export default async function PrivacyPage() {
	const t = await getTranslations("PrivacyPage.cta")
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
