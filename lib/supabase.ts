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

// Service Role Supabase client (Bypasses RLS - Use only on server)
export function createServiceRoleClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY

	if (!url || !key) {
		// Fallback to anon key if service key is missing, but log warning
		console.warn("Missing SUPABASE_SERVICE_ROLE_KEY, falling back to ANON_KEY. RLS policies may block writes.")
		const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
		if (!anonKey) throw new Error("Missing Supabase environment variables")
		
		return createClient(url, anonKey, {
			auth: { persistSession: false }
		})
	}

	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
		},
	})
}
