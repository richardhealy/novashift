import { TypographyH4 } from "@/components/ui/typography"
import type { CaseAccordionProps } from "@/types/case-studies.type"
import CaseAccordion from "../_components/case-accordion"

const data: CaseAccordionProps = {
	accordionData: [
		{
			id: "01",
			title: "The Challenge",
			text: "A marketing professional came to us with a bold goal: automate the creation of short-form marketing videos for social media—without compromising on quality. The existing process relied on freelancers, was slow, inconsistent, and couldn’t support rapid A/B testing or scaling across multiple products. They needed a fully automated, AI-driven system that could streamline video production while remaining flexible to future technologies.",
		},
		{
			id: "02",
			title: "Our Solution",
			text: [
				{
					content:
						"We began with our AI Readiness framework to understand the client's workflows, content requirements, and quality standards. From there, we designed a modular automation system using self-hosted N8n pipelines and integrated leading AI tools such as Runway ML, Stability AI, ShotStack, and ElevenLabs.",
					key: "key-1",
				},
				{
					content:
						"We transformed their scattered production process into a centralized Airtable-powered system, engineered intelligent automation flows with human verification points, and built a robust A/B testing framework that enabled rapid iteration. Our architecture supported continuous tech upgrades, allowed for flexible cost strategies, and was built to scale to tens of thousands of videos.",
					key: "key-2",
				},
				{
					content:
						"The development was executed in agile cycles with bi-daily client check-ins, low-fidelity MVP delivery, and iterative refinement. We emphasized automation resilience, script and tone improvement, and streamlined data delivery pipelines.",
					key: "key-3",
				},
			],
		},
		{
			id: "03",
			title: "Results",
			text: "Our client received a complete product blueprint: a 10-page technical specification, a scalable architecture, and a 5-phase roadmap with projected costs ranging from $103,000 to $148,500. The outcome provided full development clarity—ready for implementation and confident stakeholder alignment.",
		},
		{
			id: "04",
			title: "Why Our Discovery Process Works",
			text: "Our client received a complete product blueprint: a 10-page technical specification, a scalable architecture, and a 5-phase roadmap with projected costs ranging from $103,000 to $148,500. The outcome provided full development clarity—ready for implementation and confident stakeholder alignment.",
		},
	],
	imageUrl: "/images/cases/accordion-2.png",
	imageClass: "aspect-square md:aspect-auto",
	reverse: true,
}

export default function MarketingVideoSection() {
	return (
		<section className='py-12 md:py-20'>
			<div className='container'>
				<div className='flex flex-col gap-8 items-center text-center md:grid md:grid-cols-2 md:gap-4 md:text-left md:items-start'>
					<TypographyH4 className='md:text-4xl md:leading-[1.4]'>
						AI-Powered Marketing Video Automation System
					</TypographyH4>
					<p className='text-neutral-900 text-xl tracking-[0.2px]'>
						<b className='text-neutral-black'>How we built</b>: a scalable
						system to generate high-quality marketing videos with minimal human
						input.
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
