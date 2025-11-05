import type { Metadata } from "next"
import { Suspense } from "react"
import Loader from "@/components/loader"
import PostsGrid from "./_components/posts-grid"
import HeroSection from "./sections/hero"

export const metadata: Metadata = {
	title: "NovaShift Blog — AI Automation Insights & Business Tips",
	description:
		"Explore AI strategy, workflow automation, and digital transformation trends. Expert insights to help your business build smarter and move faster.",
	openGraph: {
		title: "NovaShift Blog: AI for Business",
		description:
			"Latest articles on AI automation, consulting, and case studies from NovaShift.",
		images: ["/og-blog.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/blog",
	},
}
export default function AiPage() {
	return (
		<>
			<HeroSection />
			<Suspense fallback={<Loader />}>
				<PostsGrid />
			</Suspense>
		</>
	)
}
