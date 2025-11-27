import type { Metadata } from "next"
import { getAllPosts } from "@/actions/blog"
import CasesSection from "./sections/cases"
import HeroSection from "./sections/hero"
import LatestInsightsSection from "./sections/insights"
import PartnersSection from "./sections/partners"
import ServicesSection from "./sections/services"
import StatisticSection from "./sections/stats"
import TransformSection from "./sections/transform"
import WhoWeAre from "./sections/who-we-are"

export const metadata: Metadata = {
	title: "NovaShift — AI Automation That Transforms How Business Works",
	description:
		"Build Smarter. Move Faster. Discover AI automation solutions that streamline operations and drive business growth with NovaShift.",
	openGraph: {
		title: "NovaShift — AI Automation for Business Transformation",
		description:
			"AI Automation That Transforms How Business Works. Build Smarter. Move Faster.",
		images: ["/og-home.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/",
	},
}

export default async function Home() {
	const posts = await getAllPosts()
	return (
		<>
			<HeroSection />
			<StatisticSection />
			<WhoWeAre />
			<ServicesSection />
			<TransformSection />
			<CasesSection />
			<PartnersSection />
			<LatestInsightsSection posts={posts} />
		</>
	)
}
