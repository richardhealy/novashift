"use client"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH3 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

export default function TransformSection() {
	const t = useTranslations("HomePage.transform")

	return (
		<section className='relative z-0 overflow-hidden bg-blue-500 py-[60px] md:py-[100px]'>
			<Image
				src='/images/home/transform.png'
				alt='image'
				width={650}
				height={650}
				className='absolute top-[-120px] right-[-130px] rtl:left-[-130px] rtl:right-[unset] -z-10 w-[300px] lg:-top-20 lg:-right-20 rtl:lg:-left-20 rtl:lg:right-[unset] lg:w-[400px] xl:top-[unset] xl:right-[unset] xl:-bottom-40 xl:left-[5%] rtl:xl:right-[5%] rtl:xl:left-[unset] xl:w-[520px] 2xl:w-[580px] rtl:scale-x-[-1]'
			/>
			<div className='container'>
				<div className='max-w-[574px] xl:ml-auto rtl:xl:mr-auto rtl:xl:ml-0'>
					<TypographyH3 className='w-1/2 text-balance text-white md:w-full'>
						{t("title")}
					</TypographyH3>
					<p className='mt-4 text-xl text-blue-100'>{t("description")}</p>

					<Link
						href={ROUTES.CONTACT_US}
						className='btn btn-md btn-outline-lightblue with-icon mt-8'
					>
						{t("cta")}
						<ButtonIcon iconColor={"white"} />
					</Link>
				</div>
			</div>
		</section>
	)
}
