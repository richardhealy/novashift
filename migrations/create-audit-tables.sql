-- Create audit_submissions table for AI Readiness Audit
-- Run this SQL in your Supabase SQL Editor

-- Create audit_submissions table
CREATE TABLE IF NOT EXISTS audit_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  role TEXT NOT NULL,
  industry TEXT NOT NULL,
  responses JSONB NOT NULL,
  scores JSONB NOT NULL,
  report_data JSONB NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public form submissions" ON audit_submissions;
DROP POLICY IF EXISTS "Allow service role form submissions" ON audit_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON audit_submissions;

-- Create a policy to allow inserts for anonymous users (public can submit forms)
CREATE POLICY "Allow public form submissions"
ON audit_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create a policy to allow inserts for service role (bypasses RLS but good to have explicit policy)
CREATE POLICY "Allow service role form submissions"
ON audit_submissions
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create a policy for authenticated users to view submissions (optional)
CREATE POLICY "Allow authenticated users to view submissions"
ON audit_submissions
FOR SELECT
TO authenticated
USING (true);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_submissions_created_at ON audit_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(email);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_industry ON audit_submissions(industry);

