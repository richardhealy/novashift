import type { Metadata } from "next"
import Cta from "@/components/cta"
import ContactsSection from "./sections/contacts"

export const metadata: Metadata = {
	title: "Contact NovaShift — Get AI Automation Consulting Today",
	description:
		"Ready to transform your business? Contact our AI specialists for strategy, automation, and dedicated development services.",
	openGraph: {
		title: "Contact Us — NovaShift AI Services",
		description: "Connect with NovaShift for custom AI solutions.",
		images: ["/og-contact.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/contact-us",
	},
}

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
