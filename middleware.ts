import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
	// Match only internationalized pathnames
	// Exclude blog pages (/ai, /post), API routes, and admin routes
	matcher: [
		"/",
		"/(ar|en)/:path*",
		// Exclude these paths from locale handling
		"/((?!api|_next|_vercel|admin|ai|post|.*\\..*).*)",
	],
}
