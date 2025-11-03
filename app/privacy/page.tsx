import Cta from "@/components/cta"
import ScrollableMenu from "./_components/scrollable-menu"
import HeroSection from "./sections/hero"

export default function PrivacyPage() {
	return (
		<>
			<HeroSection />
			<ScrollableMenu />
			<Cta
				title='Prefer to skip the form and book time directly?'
				firstBtnText='Get Free Consultation'
			/>
		</>
	)
}
