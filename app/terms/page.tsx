import ScrollableMenu from "@/app/terms/_components/scrollable-menu"
import Cta from "@/components/cta"
import HeroSection from "./sections/hero"

export default function TermsPage() {
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
