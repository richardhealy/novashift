import Cta from "@/components/cta"
import AutomateSection from "./sections/automate"
import BenefitsSection from "./sections/benefits"
import HeroSection from "./sections/hero"
import SupportSection from "./sections/support"

export default function AutomationPage() {
	return (
		<>
			<HeroSection />
			<BenefitsSection />
			<AutomateSection />
			<SupportSection />
			<Cta
				title='Ready to Automate Your Workflows?'
				firstBtnText='Get Free Consultation'
			/>
		</>
	)
}
