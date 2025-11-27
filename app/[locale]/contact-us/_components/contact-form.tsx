"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inputs/input"
import { InputErrorMessage } from "@/components/ui/inputs/input-error-message"
import { InputGroup } from "@/components/ui/inputs/input-group"
import { Label } from "@/components/ui/inputs/label"
import { Textarea } from "@/components/ui/inputs/textarea"
import { cn } from "@/lib/utils"
import { submitContactForm } from "@/actions/contact"
import { useState, useMemo } from "react"

// Optional: Export inferred TypeScript type for form data
type FormData = {
	full_name: string
	email: string
	company_name: string
	website_url?: string
	message: string
}

export default function ContactForm() {
	const t = useTranslations("ContactPage.form")
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null
		message: string
	}>({ type: null, message: "" })

	const formSchema = useMemo(
		() =>
			z.object({
				full_name: z
					.string()
					.min(1, { message: t("validation.nameRequired") })
					.max(100, { message: t("validation.nameMaxLength") }),
				email: z
					.string()
					.email({ message: t("validation.emailInvalid") })
					.min(1, { message: t("validation.emailRequired") }),
				company_name: z
					.string()
					.min(1, { message: t("validation.companyRequired") })
					.max(200, { message: t("validation.companyMaxLength") }),
				website_url: z
					.url({
						message: t("validation.websiteInvalid"),
					})
					.optional()
					.or(z.literal("")),
				message: z
					.string()
					.min(10, { message: t("validation.messageMinLength") })
					.max(2000, { message: t("validation.messageMaxLength") }),
			}),
		[t],
	)

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			full_name: "",
			email: "",
			company_name: "",
			website_url: "",
			message: "",
		},
	})

	const handleWebsiteUrlChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		originalOnChange: (e: any) => void,
	) => {
		let value = e.target.value
		// Добавляем https://, если нет протокола (http/https)
		if (value && !value.match(/^https?:\/\//i)) {
			value = "https://" + value
		}
		originalOnChange({ target: { value } })
	}

	const onSubmit = async (data: FormData) => {
		setSubmitStatus({ type: null, message: "" })

		const result = await submitContactForm(data)

		if (result.success) {
			setSubmitStatus({
				type: "success",
				message: result.message || t("success"),
			})
			reset()
			// Clear success message after 5 seconds
			setTimeout(() => {
				setSubmitStatus({ type: null, message: "" })
			}, 5000)
		} else {
			setSubmitStatus({
				type: "error",
				message: result.error || t("error"),
			})
		}
	}

	return (
		<form
			className='p-6 border border-neutral-300 bg-white shadow-contact-form rounded-2xl'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='space-y-5'>
				{/* Status Messages */}
				{submitStatus.type && (
					<div
						className={cn(
							"p-4 rounded-lg text-sm",
							submitStatus.type === "success"
								? "bg-green-50 text-green-800 border border-green-200"
								: "bg-red-50 text-red-800 border border-red-200",
						)}
					>
						{submitStatus.message}
					</div>
				)}

				<div className='grid lg:grid-cols-2 gap-x-2.5 gap-y-5'>
					{/* Full Name Field */}
					<InputGroup
						key='full_name'
						className={cn(errors.full_name && "error")}
					>
						<Label htmlFor='full_name'>{t("name")}</Label>
						<Input
							{...register("full_name")}
							id='full_name'
							type='text'
							placeholder={t("namePlaceholder")}
						/>
						<InputErrorMessage>{errors.full_name?.message}</InputErrorMessage>
					</InputGroup>
					{/* Email Field */}
					<InputGroup key='email' className={cn(errors.email && "error")}>
						<Label htmlFor='email'>{t("email")}</Label>
						<Input
							{...register("email")}
							id='email'
							type='email'
							placeholder={t("emailPlaceholder")}
						/>
						<InputErrorMessage>{errors.email?.message}</InputErrorMessage>
					</InputGroup>
					{/* Company Name Field */}
					<InputGroup
						key='company_name'
						className={cn(errors.company_name && "error")}
					>
						<Label htmlFor='company_name'>{t("company")}</Label>
						<Input
							{...register("company_name")}
							id='company_name'
							type='text'
							placeholder={t("companyPlaceholder")}
						/>
						<InputErrorMessage>
							{errors.company_name?.message}
						</InputErrorMessage>
					</InputGroup>
					{/* Website Field */}
					<InputGroup
						key='website_url'
						className={cn(errors.website_url && "error")}
					>
						<Label htmlFor='website_url'>{t("website")}</Label>
						<Controller
							name='website_url'
							control={control}
							render={({ field }) => {
								const handleChange = (
									e: React.ChangeEvent<HTMLInputElement>,
								) => {
									let value = e.target.value
									// Add https:// if no protocol (http/https)
									if (value && !value.match(/^https?:\/\//i)) {
										value = "https://" + value
									}
									field.onChange(value)
								}

								return (
									<Input
										{...field}
										id='website_url'
										type='text'
										placeholder={t("websitePlaceholder")}
										onChange={handleChange}
									/>
								)
							}}
						/>
						<InputErrorMessage>{errors.website_url?.message}</InputErrorMessage>
					</InputGroup>
				</div>

				<div>
					{/* Message Field */}
					<InputGroup key='message' className={cn(errors.message && "error")}>
						<Label htmlFor='message'>{t("message")}</Label>
						<Textarea
							{...register("message")}
							className='min-h-[116px]'
							id='message'
							placeholder={t("messagePlaceholder")}
						></Textarea>
						<InputErrorMessage>{errors.message?.message}</InputErrorMessage>
					</InputGroup>
				</div>

				<Button type='submit' disabled={isSubmitting} withIcon>
					{isSubmitting ? t("submitting") : t("submit")}
				</Button>
			</div>
		</form>
	)
}
