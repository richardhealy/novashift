import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://images.example.com/**")],
	},
}

export default nextConfig
