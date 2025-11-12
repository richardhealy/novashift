import { TypographyH4 } from "@/components/ui/typography"
import type { CaseAccordionProps } from "@/types/case-studies.type"
import CaseAccordion from "../_components/case-accordion"

const data: CaseAccordionProps = {
	accordionData: [
		{
			id: "01",
			title: "The Challenge",
			text: " An entrepreneur set out to create a smart poker training system powered by AI. The vision was clear, but the technical path was not. They needed a partner to help define the concept, structure the system, and turn it into a concrete, buildable development plan.",
		},
		{
			id: "02",
			title: "Our Solution",
			text: "We led a structured discovery process to shape the product, define the technical architecture, and plan a phased development roadmap. Through a collaborative workshop, we clarified the vision and user needs. We then designed a modular system architecture tailored to the AI engine, outlined buildable features, and mapped the path to an MVP. A detailed specification document captured system components, workflows, data flow, and user experience flows. We also assessed key risks and proposed mitigation strategies to reduce uncertainty and control future development costs.",
		},
		{
			id: "03",
			title: "Results",
			text: "Our client received a complete product blueprint: a 10-page technical specification, a scalable architecture, and a 5-phase roadmap with projected costs ranging from $103,000 to $148,500. The outcome provided full development clarity—ready for implementation and confident stakeholder alignment.",
		},
		{
			id: "04",
			title: "Why Our Approach Works",
			text: "Our process bridges the gap between ambitious ideas and technical execution. It brings clarity to the unknown, uncovers risks early, and delivers tangible outputs that engineering teams can act on immediately. The result is a smarter, faster path to product development—designed for long-term success.",
		},
	],
	imageUrl: "/images/cases/accordion-1.png",
	imageClass: "aspect-square",
}
export default function PokerBrainSection() {
	return (
		<section className='py-12 md:py-20' id='poker-brain'>
			<div className='container'>
				<div className='flex flex-col gap-8 items-center text-center md:grid md:grid-cols-2 md:gap-4 md:text-left md:items-start'>
					<TypographyH4 className='md:text-4xl md:leading-[1.4]'>
						Poker Brain – AI-Powered Poker Training System
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
					/>
				</div>
			</div>
		</section>
	)
}
