import { TypographyH1 } from "@/components/ui/typography"

export default function HeroSection() {
	return (
		<section>
			<div className='container'>
				<div className='pt-[86px] md:pt-12'>
					<TypographyH1 className='text-center leading-[1.4] md:leading-[1.2]!'>
						Featured AI Blog Posts
					</TypographyH1>
				</div>
			</div>
		</section>
	)
}
