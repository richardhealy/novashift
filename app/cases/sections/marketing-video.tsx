import { TypographyH4 } from "@/components/ui/typography"
import type { CaseAccordionProps } from "@/types/case-studies.type"
import CaseAccordion from "../_components/case-accordion"

const data: CaseAccordionProps = {
	accordionData: [
		{
			id: "01",
			title: "The Challenge",
			text: "A marketing professional needed a scalable way to produce short-form product videos for social media while maintaining creative quality. The manual process relied on freelancers and lacked consistency, speed, and flexibility for A/B testing. They needed a fully automated system that could generate, test, and deploy videos efficiently while staying adaptable to new AI tools and workflows.",
		},
		{
			id: "02",
			title: "Our Solution",
			text: "We used our AI Readiness framework to analyze the client’s workflow and design a modular automation system using self-hosted N8n pipelines. The solution integrated advanced AI tools such as Runway ML, ShotStack, Stability AI, and ElevenLabs, supported by centralized data management in Airtable. Intelligent automation flows with human verification points ensured quality control, while a dynamic A/B testing framework enabled rapid iteration. Built in agile sprints, the system evolved from MVP to a robust, production-ready automation platform.",
		},
		{
			id: "03",
			title: "Results",
			text: "The finished system automated every phase of video production—from script generation to rendering and delivery—cutting production time from days to hours. It empowered the client to produce multiple content variations across product lines simultaneously and at scale. With built-in quality checks and flexible architecture, the platform balanced automation with creative control, reducing costs while boosting content output.",
		},
		{
			id: "04",
			title: "Why Our Approach Works",
			text: "Our framework combines strategic planning with technical execution. By aligning AI capabilities with business objectives, we designed a system that grows with new technologies and marketing needs. This adaptive approach ensures long-term value—transforming content production from a manual process into a scalable, intelligent workflow.",
		},
	],
	imageUrl: "/images/cases/accordion-2.png",
	imageClass: "aspect-square ",
}

export default function MarketingVideoSection() {
	return (
		<section className='py-12 md:py-20' id='ai-automation'>
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
