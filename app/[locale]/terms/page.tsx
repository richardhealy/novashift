import { getTranslations } from "next-intl/server"
import ScrollableMenu from "./_components/scrollable-menu"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "TermsPage.meta" })
	return {
		title: t("title"),
		description: t("description"),
	}
}

export default async function TermsPage() {
	const t = await getTranslations("TermsPage.cta")
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
