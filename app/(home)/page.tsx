import { getAllPosts } from "@/actions/blog"
import CasesSection from "./sections/cases"
import HeroSection from "./sections/hero"
import LatestInsightsSection from "./sections/insights"
import PartnersSection from "./sections/partners"
import ServicesSection from "./sections/services"
import StatisticSection from "./sections/stats"
import TransformSection from "./sections/transform"
import WhoWeAre from "./sections/who-we-are"

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
