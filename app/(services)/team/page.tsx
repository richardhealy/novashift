import Cta from "@/components/cta"
import HeroSection from "./sections/hero"
import ServicesSection from "./sections/services"
import TeamSection from "./sections/team"

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
