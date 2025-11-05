import type { Metadata } from "next"
import AboutSection from "./sections/about"
import DifferentiatorsSection from "./sections/differentiators"
import HeroSection from "./sections/hero"
import SpecializeSection from "./sections/specialize"

export const metadata: Metadata = {
	title: "About NovaShift — Custom AI Solutions & Automation Strategies",
	description:
		"NovaShift helps future-focused businesses turn AI from concept into execution. Design custom AI solutions that streamline operations and drive value.",
	openGraph: {
		title: "About NovaShift: AI Automation Experts",
		description:
			"We design custom AI solutions and automation strategies that boost performance. AI isn’t the future. It’s now. Make the shift with us.",
		images: ["/og-about.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/about-us",
	},
}
export default function AboutPage() {
	return (
		<>
			<HeroSection />
			<AboutSection />
			<SpecializeSection />
			<DifferentiatorsSection />
		</>
	)
}
