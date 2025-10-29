import AboutSection from "./sections/about"
import DifferentiatorsSection from "./sections/differentiators"
import SpecializeSection from "./sections/specialize"

export default function Home() {
	return (
		<>
			<div className='h-[400px] w-full bg-neutral-900 text-white text-center text-2xl flex items-center justify-center'>
				HERO
			</div>
			<AboutSection />
			<SpecializeSection />
			<DifferentiatorsSection />
		</>
	)
}
