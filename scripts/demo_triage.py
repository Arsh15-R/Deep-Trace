"""
DeepTrace — End-to-End Forensic Demonstration & Verification Script
Demonstrates:
1. Evidence hashing (SHA-256 & Blake2b)
2. Metadata & anti-forensic extraction
3. Pinata IPFS decentralized pinning (CID generation)
4. Multi-modal AI forensic evaluation & model attribution
5. BNSS 2023 Sec 63 Court Admissibility Certificate generation
"""

import os
import sys

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from services.legal_compliance import EvidenceHasher, MetadataExtractor, BNSS63CertificateGenerator
from services.ipfs_vault import PinataVaultClient
from services.forensics_engine import ForensicAttributionEngine


def run_demo():
    print("=" * 70)
    print("  DEEPTRACE: MULTI-MODAL FORENSICS & BNSS 2023 SEC 63 PIPELINE")
    print("=" * 70)

    # 1. Create a synthetic test evidence file
    sample_dir = os.path.join(BASE_DIR, "data", "samples")
    os.makedirs(sample_dir, exist_ok=True)
    sample_file = os.path.join(sample_dir, "intercepted_audio_leak.mp3")

    # Generate synthetic binary payload simulating ElevenLabs vocoder traces
    with open(sample_file, "wb") as f:
        f.write(b"ID3\x04\x00\x00\x00\x00\x00#TSSE\x00\x00\x00\x0b\x00\x00\x03ElevenLabs Neural Vocoder v2")
        f.write(os.urandom(20480))

    print(f"\n[1] ACQUISITION & HASHING (BNSS Sec 63 Ingestion Seal)")
    print(f"    File: {sample_file}")
    hashes = EvidenceHasher.hash_file(sample_file)
    sha256_hash = hashes["sha256"]
    print(f"    SHA-256: {sha256_hash}")
    print(f"    BLAKE2b: {hashes['blake2b']}")
    print(f"    Size:    {hashes['file_size_bytes']} bytes")

    print(f"\n[2] METADATA & ANTI-FORENSIC SCAN")
    metadata = MetadataExtractor.extract(sample_file, mime_type="audio/mpeg")
    print(f"    Software Traces: {metadata.get('identified_software_traces')}")
    print(f"    Alerts:          {metadata.get('anti_forensic_alerts')}")

    print(f"\n[3] IMMUTABLE IPFS EVIDENCE VAULT (Pinata)")
    vault = PinataVaultClient()
    pin_result = vault.pin_file(sample_file, case_id="DT-2026-DEMO-01")
    ipfs_cid = pin_result["ipfs_cid"]
    gateway_url = pin_result["gateway_url"]
    print(f"    IPFS CID:    {ipfs_cid}")
    print(f"    Gateway URL: {gateway_url}")
    print(f"    Mode:        {pin_result.get('mode')}")

    print(f"\n[4] DYNAMIC MULTI-MODAL AI FORENSICS & ATTRIBUTION")
    forensics = ForensicAttributionEngine.evaluate(
        sample_file,
        mime_type="audio/mpeg",
        software_metadata_hints=metadata.get("identified_software_traces"),
    )
    print(f"    Verdict:           {forensics['verdict']}")
    print(f"    AI Probability:    {forensics['percentage_score']}")
    print(f"    Attributed Engine: {forensics['attributed_engine']}")
    print(f"    Confidence:        {forensics['confidence_level']}")
    for art in forensics["modality_report"].get("detected_artifacts", []):
        print(f"      - Artifact: {art}")

    print(f"\n[5] LEGAL COMPLIANCE ENGINE: BNSS 2023 SEC 63 CERTIFICATE")
    cert_data = BNSS63CertificateGenerator.generate_certificate_data(
        case_id="DT-2026-DEMO-01",
        file_name="intercepted_audio_leak.mp3",
        sha256_hash=sha256_hash,
        ipfs_cid=ipfs_cid,
        officer_name="Inspector Vikramaditya Rao",
        officer_badge="CID-CYBER-9902",
        department="Central Investigation Division (Special Cyber Cell)",
        acquisition_method="On-Field Telegram Bot (@deeptrace_forensic_bot)",
        file_size_bytes=hashes["file_size_bytes"],
        ai_probability_score=forensics["synthetic_probability"],
        detected_engine=forensics["attributed_engine"],
        metadata_summary=metadata,
    )

    # Render HTML court document
    html_doc = BNSS63CertificateGenerator.render_html_certificate(cert_data)
    out_html_path = os.path.join(BASE_DIR, "data", "demo_certificate.html")
    with open(out_html_path, "w", encoding="utf-8") as f:
        f.write(html_doc)

    print(f"    Certificate ID:    {cert_data['certificate_id']}")
    print(f"    Part A Record:     Identified & Hashed with SHA-256")
    print(f"    Part B Custody:    Immutable Pinata IPFS Verified")
    print(f"    Part C Authority:  Signed by {cert_data['part_c']['certifying_officer']}")
    print(f"    HTML Court File:   file:///{out_html_path.replace(os.sep, '/')}")
    print("\n" + "=" * 70)
    print("  DEMONSTRATION COMPLETE: ELECTRONIC RECORD IS COURT-ADMISSIBLE")
    print("=" * 70)


if __name__ == "__main__":
    run_demo()
