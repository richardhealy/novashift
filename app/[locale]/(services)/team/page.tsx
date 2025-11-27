import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import ServicesSection from "./sections/services"
import TeamSection from "./sections/team"

export const metadata: Metadata = {
	title: "Team Augmentation — Scale Your Dev Team with AI Experts",
	description:
		"Need specialized AI talent? Scale your development capabilities instantly with our team augmentation services. Access top-tier engineers and AI specialists.",
	openGraph: {
		title: "Team Augmentation: Scale Your Dev Team with AI Experts",
		description:
			"Need specialized AI talent? Scale your development capabilities instantly with our team augmentation services. Access top-tier engineers and AI specialists.",
		images: ["/og-team.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/team",
	},
}

export default async function TeamPage() {
	const t = await getTranslations("TeamPage.cta")
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
