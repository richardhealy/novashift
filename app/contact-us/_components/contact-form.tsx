"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inputs/input"
import { InputErrorMessage } from "@/components/ui/inputs/input-error-message"
import { InputGroup } from "@/components/ui/inputs/input-group"
import { Label } from "@/components/ui/inputs/label"
import { Select } from "@/components/ui/inputs/select"
import { Textarea } from "@/components/ui/inputs/textarea"
import { CONTACT_FORM_SELECT_OPTIONS } from "@/config/form-options"
import { cn } from "@/lib/utils"

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
	website_url: z.url({
		message: "Please enter a valid website URL (e.g., https://example.com).",
	}),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters long." })
		.max(2000, { message: "Message must be 2000 characters or less." }),
})

// Optional: Export inferred TypeScript type for form data
type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
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

	const onSubmit = async (data: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		console.log(data)
		alert("Form submitted successfully!")
		reset()
	}

	return (
		<form
			className='p-6 border border-neutral-300 bg-white shadow-contact-form rounded-2xl'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='space-y-5'>
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
						<Label htmlFor='website_url'>Website</Label>
						<Input
							{...register("website_url")}
							id='website_url'
							type='text'
							placeholder='https://yourwebsite.com'
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
