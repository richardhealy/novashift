"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inputs/input"
import { InputErrorMessage } from "@/components/ui/inputs/input-error-message"
import { InputGroup } from "@/components/ui/inputs/input-group"
import { Label } from "@/components/ui/inputs/label"
import { Textarea } from "@/components/ui/inputs/textarea"
import { cn } from "@/lib/utils"
import { submitContactForm } from "@/actions/contact"
import { useState } from "react"

const formSchema = z.object({
	full_name: z
		.string()
		.min(1, { message: "Full name is required." })
		.max(100, { message: "Full name must be 100 characters or less." }),
	email: z
		.email({ message: "Please enter a valid email address." })
		.min(1, { message: "Email address is required." }),
	company_name: z
		.string()
		.min(1, { message: "Company name is required." })
		.max(200, { message: "Company name must be 200 characters or less." }),
	website_url: z
		.url({
			message: "Please enter a valid website URL (e.g., https://example.com).",
		})
		.optional()
		.or(z.literal("")),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters long." })
		.max(2000, { message: "Message must be 2000 characters or less." }),
})

// Optional: Export inferred TypeScript type for form data
type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null
		message: string
	}>({ type: null, message: "" })

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
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
				message: result.message || "Form submitted successfully!",
			})
			reset()
			// Clear success message after 5 seconds
			setTimeout(() => {
				setSubmitStatus({ type: null, message: "" })
			}, 5000)
		} else {
			setSubmitStatus({
				type: "error",
				message: result.error || "Failed to submit form. Please try again.",
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
						<Label htmlFor='full_name'>Full Name</Label>
						<Input
							{...register("full_name")}
							id='full_name'
							type='text'
							placeholder='John Doe'
						/>
						<InputErrorMessage>{errors.full_name?.message}</InputErrorMessage>
					</InputGroup>
					{/* Email Field */}
					<InputGroup key='email' className={cn(errors.email && "error")}>
						<Label htmlFor='email'>Email Address</Label>
						<Input
							{...register("email")}
							id='email'
							type='email'
							placeholder='example@email.com'
						/>
						<InputErrorMessage>{errors.email?.message}</InputErrorMessage>
					</InputGroup>
					{/* Full Name Field */}
					<InputGroup
						key='company_name'
						className={cn(errors.company_name && "error")}
					>
						<Label htmlFor='company_name'>Company Name</Label>
						<Input
							{...register("company_name")}
							id='company_name'
							type='text'
							placeholder='Novashift'
						/>
						<InputErrorMessage>
							{errors.company_name?.message}
						</InputErrorMessage>
					</InputGroup>
					{/* Full Name Field */}
					<InputGroup
						key='website_url'
						className={cn(errors.website_url && "error")}
					>
						<Label htmlFor='website_url'>Website (optional)</Label>
						<Controller
							name='website_url'
							control={control}
							render={({ field }) => {
								const handleChange = (
									e: React.ChangeEvent<HTMLInputElement>,
								) => {
									let value = e.target.value
									// Добавляем https://, если нет протокола (http/https)
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
										placeholder='https://yourwebsite.com'
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
						<Label htmlFor='message'>Tell us a bit more</Label>
						<Textarea
							{...register("message")}
							className='min-h-[116px]'
							id='message'
							placeholder='Share details about your project, goals, timeline, or any questions you have...'
						></Textarea>
						<InputErrorMessage>{errors.message?.message}</InputErrorMessage>
					</InputGroup>
				</div>

				<Button type='submit' disabled={isSubmitting} withIcon>
					{isSubmitting ? "Submitting" : "Send Message"}
				</Button>
			</div>
		</form>
	)
}
