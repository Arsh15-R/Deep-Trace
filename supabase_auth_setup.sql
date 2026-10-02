-- ============================================================================
-- SUPABASE AUTHENTICATION INTEGRATION (GMAIL & EMAIL/PASSWORD AUTO-SYNC)
-- Project: DeepTrace / SatyaNet (Ref: kqllmwzftudlxswtnqtg)
-- ============================================================================
-- Run this script in: Supabase Dashboard -> SQL Editor -> Run
-- ============================================================================

-- 1. AUTOMATIC OFFICER PROFILE CREATION TRIGGER
-- When a user logs in via Google (Gmail) or signs up via Email/Password,
-- this trigger automatically creates their entry in public.profiles.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    extracted_name TEXT;
    extracted_badge TEXT;
    extracted_avatar TEXT;
BEGIN
    -- Extract name from Google metadata or custom registration data
    extracted_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );

    -- Extract or auto-generate a unique badge ID
    extracted_badge := COALESCE(
        NEW.raw_user_meta_data->>'badge_id',
        'CID-' || UPPER(SUBSTRING(NEW.id::text FROM 1 FOR 8))
    );

    -- Extract avatar URL from Google OAuth
    extracted_avatar := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture',
        NULL
    );

    -- Insert into public.profiles
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        role,
        badge_id,
        department,
        avatar_url,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        extracted_name,
        NEW.email,
        'investigating_officer',
        extracted_badge,
        'Cyber Crime & Digital Forensics Division',
        extracted_avatar,
        now(),
        now()
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
        updated_at = now();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. BIND TRIGGER TO SUPABASE AUTH TABLE
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. ENSURE STORAGE BUCKET 'evidence-vault' IS CONFIGURED
INSERT INTO storage.buckets (id, name, public)
VALUES ('evidence-vault', 'evidence-vault', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 4. STORAGE ACCESS POLICIES (Allows Viewing & Uploading Evidence)
DROP POLICY IF EXISTS "Public Evidence Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Uploads" ON storage.objects;

CREATE POLICY "Public Evidence Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'evidence-vault');

CREATE POLICY "Allow All Uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'evidence-vault');

CREATE POLICY "Allow All Updates and Deletes"
ON storage.objects FOR ALL
USING (bucket_id = 'evidence-vault');
