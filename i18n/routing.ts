import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "ar"],

	// Used when no locale matches
	defaultLocale: "en",

	// Pathnames that should not be localized
	pathnames: {
		"/": "/",
		"/about-us": "/about-us",
		"/contact-us": "/contact-us",
		"/cases": "/cases",
		"/ai-strategy": "/ai-strategy",
		"/automation": "/automation",
		"/team": "/team",
		"/privacy": "/privacy",
		"/terms": "/terms",
	},
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing)

