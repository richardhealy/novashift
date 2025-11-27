-- Fix RLS Policy: Allow 'public' (everyone) to insert
-- 'anon' sometimes doesn't catch all unauthenticated connections depending on client setup.
-- 'public' is the PostgreSQL role that includes everyone.

DROP POLICY IF EXISTS "Allow public form submissions" ON contact_submissions;

CREATE POLICY "Allow public form submissions"
ON contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Ensure RLS is on
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Reload cache
NOTIFY pgrst, 'reload config';

