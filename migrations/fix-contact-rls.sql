-- Fix RLS Policy for Contact Form
-- Run this in Supabase SQL Editor to fix the "new row violates row-level security policy" error

-- 1. Drop existing policy to avoid conflicts
DROP POLICY IF EXISTS "Allow public form submissions" ON contact_submissions;

-- 2. Create the correct policy for anonymous (public) inserts
CREATE POLICY "Allow public form submissions"
ON contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Ensure RLS is actually enabled
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Force API cache reload
NOTIFY pgrst, 'reload config';



