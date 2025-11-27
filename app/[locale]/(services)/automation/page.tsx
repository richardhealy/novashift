import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Cta from "@/components/cta"
import AutomateSection from "./sections/automate"
import BenefitsSection from "./sections/benefits"
import HeroSection from "./sections/hero"
import SupportSection from "./sections/support"

export const metadata: Metadata = {
	title: "Process Automation Services — Work Faster, Not Harder",
	description:
		"Automate repetitive tasks and free up your team for high-value work. We design and implement custom automation workflows that scale with your business.",
	openGraph: {
		title: "Process Automation Services: Work Faster, Not Harder",
		description:
			"Automate repetitive tasks and free up your team for high-value work. We design and implement custom automation workflows that scale with your business.",
		images: ["/og-automation.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/automation",
	},
}

export default async function AutomationPage() {
	const t = await getTranslations("AutomationPage.cta")
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
