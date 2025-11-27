import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://images.example.com/**")],
	},
}

export default withPayload(withNextIntl(nextConfig))
