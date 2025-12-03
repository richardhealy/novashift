-- Fix RLS policies for audit_submissions table
-- Run this SQL in your Supabase SQL Editor

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




