import { TypographyH4 } from "@/components/ui/typography"
import type { CaseAccordionProps } from "@/types/case-studies.type"
import CaseAccordion from "../_components/case-accordion"

const data: CaseAccordionProps = {
	accordionData: [
		{
			id: "01",
			title: "The Challenge",
			text: "An entrepreneur envisioned a platform that could automatically generate and schedule branded social media posts by analyzing existing brand assets. The goal was simple but technically demanding—upload a website or Instagram profile and let AI produce stunning, on-brand content ready for publication. Delivering that required advanced integrations across AI content generation, social APIs, and payment systems—all in a user-friendly, scalable environment.",
		},
		{
			id: "02",
			title: "Our Solution",
			text: "We developed a comprehensive full-stack social automation platform combining modern web technologies and AI. The frontend, built with Next.js, React, and Tailwind CSS, delivered a polished and responsive experience. The backend integrated Supabase, Stripe, and Meta’s Graph API for secure authentication, subscription handling, and automated posting. Using AI models for content generation, brand voice detection, and scheduling, users could generate and preview content, then publish it directly—turning a once-manual process into a seamless, intelligent workflow.",
		},
		{
			id: "03",
			title: "Results",
			text: "The final product was a production-ready platform that automated every stage of social content creation and delivery. With secure backend operations, multi-tier subscriptions, and direct posting to Instagram and Facebook, GlamGrid drastically reduced manual effort. It enabled brands to generate and schedule consistent, high-quality posts within minutes—maintaining creative control while saving time and cost at scale.",
		},
		{
			id: "04",
			title: "Why Our Approach Works",
			text: "Our method focused on building for scalability, performance, and long-term stability. By isolating sensitive operations to the backend and using modular architecture, the system can evolve without disruption. GlamGrid demonstrates how AI and intelligent design can bring efficiency, consistency, and creativity together—making high-quality digital marketing both automated and accessible.",
		},
	],
	imageUrl: "/images/cases/accordion-4.png",
	imageClass: "aspect-square",
	reverse: true,
}
export default function SocialMediaSection() {
	return (
		<section className='py-12 md:py-20' id='poker-brain'>
			<div className='container'>
				<div className='flex flex-col gap-8 items-center text-center md:grid md:grid-cols-2 md:gap-4 md:text-left md:items-start'>
					<TypographyH4 className='md:text-4xl md:leading-[1.4]'>
						GlamGrid AI Social Spark – AI-Powered Social Media Platform
					</TypographyH4>
					<p className='text-neutral-900 text-xl tracking-[0.2px]'>
						<b className='text-neutral-black'>From concept to roadmap</b>: how
						we helped shape and scope an intelligent training tool for
						competitive players.
					</p>
				</div>

				<div className='mt-12 md:mt-[60px]'>
					<CaseAccordion
						accordionData={data.accordionData}
						imageUrl={data.imageUrl}
						imageClass={data.imageClass}
						reverse={data.reverse}
					/>
				</div>
			</div>
		</section>
	)
}
