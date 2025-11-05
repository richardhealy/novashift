import type { Metadata } from "next"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import ServicesSection from "./sections/services"
import TeamSection from "./sections/team"

export const metadata: Metadata = {
	title: "Dedicated AI Development Team — Scalable Solutions | NovaShift",
	description:
		"Hire a dedicated AI development team from NovaShift for scalable solutions. Expert specialists building custom AI tools tailored to your business needs.",
	openGraph: {
		title: "Dedicated Development Team — NovaShift",
		description:
			"Scalable Solutions Built by AI Specialists. Your custom AI team for execution and growth.",
		images: ["/og-dedicated-team.jpg"],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		images: ["/twitter-dedicated-team.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/service/dedicated-team",
	},
}

export default function TeamPage() {
	return (
		<>
			<HeroSection />
			<TeamSection />
			<ServicesSection />
			<Cta
				title='Ready to Build Your Custom AI Solution?'
				firstBtnText='Start Your Project'
			/>
		</>
	)
}
