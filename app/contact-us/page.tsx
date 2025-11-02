import Cta from "@/components/cta"
import ContactsSection from "./sections/contacts"

export default function ContactUsPage() {
	return (
		<>
			<ContactsSection />
			<Cta
				title='Prefer to skip the form and book time directly?'
				firstBtnText='Get Free Consultation'
			/>
		</>
	)
}
