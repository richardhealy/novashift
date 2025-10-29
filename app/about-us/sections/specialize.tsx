import { TypographyH3 } from "@/components/ui/typography"

export default function SpecializeSection() {
	return (
		<section className='bg-blue-500 py-20 md:py-[100px]'>
			<div className='container'>
				<TypographyH3 className='mt-6 text-center leading-[1.4] font-normal tracking-[0.28px] text-white md:text-left'>
					We specialize in <b>AI transformation</b> for startups and growing
					businesses.
				</TypographyH3>
			</div>
		</section>
	)
}
