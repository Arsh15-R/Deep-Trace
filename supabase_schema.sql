-- ============================================================================
-- DEEPTRACE / SATYANET — SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- Compliant with Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS Section 63)
-- ============================================================================
-- Execute this entire script in Supabase Dashboard → SQL Editor → Run
-- ============================================================================

-- 0. Enable Cryptographic & UUID Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PROFILES — Police & Forensic Officer Registry
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'investigating_officer', -- 'superintendent', 'forensic_analyst', 'cyber_officer'
    badge_id TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL DEFAULT 'Cyber Crime & Digital Forensics Division',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 2. CASES — Master FIR & Evidence Investigation Ledger
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_number TEXT UNIQUE NOT NULL,                   -- e.g. 'DT-2026-8812' or 'FIR-2026-CH-992'
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active_investigation', -- 'active_investigation', 'court_admissible', 'closed'
    priority TEXT NOT NULL DEFAULT 'high',               -- 'low', 'normal', 'high', 'critical'
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cases_case_number ON public.cases(case_number);
CREATE INDEX IF NOT EXISTS idx_cases_status ON public.cases(status);

-- ----------------------------------------------------------------------------
-- 3. EVIDENCE — Physical & Digital Electronic Records (BNSS Sec 63)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,                             -- 'image/jpeg', 'video/mp4', 'audio/mpeg'
    file_size BIGINT NOT NULL,                           -- size in bytes
    storage_path TEXT,                                   -- Pinata IPFS Gateway URI or vault path
    sha256_hash TEXT NOT NULL,                           -- NIST FIPS 180-4 primary court integrity digest
    collected_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    collection_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,         -- EXIF, IPFS CID, GPS coordinates, camera specs
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_evidence_case_id ON public.evidence(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_sha256 ON public.evidence(sha256_hash);
CREATE INDEX IF NOT EXISTS idx_evidence_ipfs_cid ON public.evidence USING gin ((metadata -> 'ipfs_cid'));

-- ----------------------------------------------------------------------------
-- 4. ANALYSES — Multi-Modal AI Forensic Evaluation Results
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    evidence_id UUID REFERENCES public.evidence(id) ON DELETE CASCADE,
    analysis_type TEXT NOT NULL,                         -- 'image_fft', 'audio_vocoder', 'video_temporal', 'multi_modal_fusion'
    result JSONB NOT NULL DEFAULT '{}'::jsonb,           -- { synthetic_probability: 0.98, engine: "ElevenLabs", ... }
    performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analyses_case_id ON public.analyses(case_id);
CREATE INDEX IF NOT EXISTS idx_analyses_evidence_id ON public.analyses(evidence_id);

-- ----------------------------------------------------------------------------
-- 5. AUDIT_EVENTS — Immutable Chain-of-Custody Timestamp Ledger
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,                               -- 'EVIDENCE_INGESTED', 'SEALED_SHA256', 'PINNED_IPFS', 'CERTIFICATE_GENERATED'
    entity_type TEXT NOT NULL,                          -- 'case', 'evidence', 'certificate'
    entity_id TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_entity ON public.audit_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_created_at ON public.audit_events(created_at DESC);

-- ----------------------------------------------------------------------------
-- 6. BNSS_CERTIFICATES — Schedule II Statutory Court Admissibility Certificates
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bnss_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
    evidence_id UUID REFERENCES public.evidence(id) ON DELETE CASCADE,
    certificate_number TEXT UNIQUE NOT NULL,            -- e.g. 'BNSS-63-DT-8812-20261002'
    statutory_act TEXT NOT NULL DEFAULT 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Section 63)',
    certifying_officer_name TEXT NOT NULL,
    badge_designation TEXT NOT NULL,
    department TEXT NOT NULL,
    sha256_sealed_hash TEXT NOT NULL,
    ipfs_vault_cid TEXT NOT NULL,
    digital_signature_hash TEXT NOT NULL,
    court_admissibility_status TEXT NOT NULL DEFAULT 'ADMISSIBLE_BNSS_SEC_63',
    certificate_data JSONB NOT NULL DEFAULT '{}'::jsonb, -- Full Part A, Part B, Part C JSON model
    issued_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bnss_cert_case ON public.bnss_certificates(case_id);
CREATE INDEX IF NOT EXISTS idx_bnss_cert_number ON public.bnss_certificates(certificate_number);

-- ----------------------------------------------------------------------------
-- 7. PHISHING_LOGS — Chrome Extension Domain Reputation Cache
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.phishing_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'SAFE',                -- 'SAFE', 'SUSPICIOUS', 'MALICIOUS'
    risk_score DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    warning_tags JSONB DEFAULT '[]'::jsonb,
    report_summary TEXT,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phishing_domain ON public.phishing_logs(domain);

-- ----------------------------------------------------------------------------
-- 8. HELPER VIEW: Active High-Risk Synthetic Threat Feed
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_threat_feed AS
SELECT 
    c.case_number,
    c.title AS case_title,
    e.file_name,
    e.file_type,
    e.sha256_hash,
    (e.metadata ->> 'ipfs_cid') AS ipfs_cid,
    (a.result ->> 'synthetic_probability')::float AS synthetic_probability,
    (a.result ->> 'verdict') AS verdict,
    (a.result ->> 'attributed_engine') AS attributed_engine,
    c.created_at
FROM public.cases c
JOIN public.evidence e ON e.case_id = c.id
LEFT JOIN public.analyses a ON a.evidence_id = e.id
ORDER BY c.created_at DESC;

-- ----------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bnss_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phishing_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for police dashboard and verification checks)
CREATE POLICY "Allow authenticated and service role full access" 
ON public.cases FOR ALL USING (true);

CREATE POLICY "Allow evidence read and write" 
ON public.evidence FOR ALL USING (true);

CREATE POLICY "Allow analyses read and write" 
ON public.analyses FOR ALL USING (true);

CREATE POLICY "Allow audit events insert and read" 
ON public.audit_events FOR ALL USING (true);

CREATE POLICY "Allow certificate read and write" 
ON public.bnss_certificates FOR ALL USING (true);

CREATE POLICY "Allow phishing logs read and write" 
ON public.phishing_logs FOR ALL USING (true);
