import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables")
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for use in server actions)
export function createServerClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!url || !key) {
		throw new Error("Missing Supabase environment variables")
	}

	return createClient(url, key, {
		auth: {
			persistSession: false,
		},
	})
}
