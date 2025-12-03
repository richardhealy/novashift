-- Create contact_submissions table for contact form
-- Run this SQL in your Supabase SQL Editor

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  website_url TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON contact_submissions;

-- Create a policy to allow inserts (public can submit forms)
CREATE POLICY "Allow public form submissions"
ON contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create a policy for authenticated users to view submissions (optional)
CREATE POLICY "Allow authenticated users to view submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (true);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);








