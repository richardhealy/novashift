import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Cta from "@/components/cta"
import ContactsSection from "./sections/contacts"

export const metadata: Metadata = {
	title: "Contact NovaShift — Let’s Build Something Intelligent",
	description:
		"Ready to transform your business with AI? Contact NovaShift to discuss your goals and discover how we can help you build smarter and move faster.",
	openGraph: {
		title: "Contact NovaShift: Let’s Build Something Intelligent",
		description:
			"Ready to transform your business with AI? Contact NovaShift to discuss your goals and discover how we can help you build smarter and move faster.",
		images: ["/og-contact.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/contact-us",
	},
}

export default async function ContactUsPage() {
	const t = await getTranslations("ContactPage.cta")
	return (
		<>
			<ContactsSection />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
