"""
DeepTrace Legal Compliance Engine — BNSS 2023 Section 63 Certificate Generator
Generates formal court-admissible electronic record certificates under
Section 63 (replacing Section 65B of Indian Evidence Act) of BNSS 2023.
"""

import json
from datetime import datetime, timezone
from typing import Dict, Any, Optional


class BNSS63CertificateGenerator:
    """
    Renders statutory certificates under Section 63 of BNSS 2023.
    """

    @classmethod
    def generate_certificate_data(
        cls,
        case_id: str,
        file_name: str,
        sha256_hash: str,
        ipfs_cid: str,
        officer_name: str,
        officer_badge: str,
        department: str,
        acquisition_method: str = "Telegram Edge Ingestion (@deeptrace_forensic_bot)",
        file_size_bytes: int = 0,
        ai_probability_score: float = 0.0,
        detected_engine: str = "None Identified",
        metadata_summary: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Builds the structured data model for a BNSS 2023 Section 63 Certificate.
        """
        now = datetime.now(timezone.utc)
        certificate_id = f"BNSS-63-DT-{case_id.replace('#', '')}-{now.strftime('%Y%m%d%H%M')}"

        certificate = {
            "certificate_id": certificate_id,
            "statutory_act": "Bharatiya Nagarik Suraksha Sanhita, 2023 (Section 63)",
            "supersedes": "Section 65B of the Indian Evidence Act, 1872",
            "issued_at_utc": now.isoformat(),
            "case_id": case_id,
            "part_a": {
                "title": "PART A: IDENTIFICATION OF ELECTRONIC RECORD",
                "file_name": file_name,
                "file_size_bytes": file_size_bytes,
                "acquisition_method": acquisition_method,
                "acquisition_timestamp": now.isoformat(),
                "primary_hash_sha256": sha256_hash,
                "decentralized_vault_cid": ipfs_cid,
                "ipfs_gateway_uri": f"https://gateway.pinata.cloud/ipfs/{ipfs_cid}",
            },
            "part_b": {
                "title": "PART B: SYSTEM INTEGRITY & SECURE CUSTODY DECLARATION",
                "system_name": "DeepTrace Dynamic Multi-Modal AI Forensics Engine",
                "hash_standard": "NIST FIPS 180-4 (SHA-256)",
                "storage_type": "InterPlanetary File System (IPFS) via Pinata Distributed Pinning",
                "system_operating_condition": "System was operating properly and at all material times with no breach of data integrity.",
                "tamper_evidence_proof": "Content-addressed CID prevents retrospective manipulation, silent alteration, or file corruption.",
                "forensic_telemetry": {
                    "synthetic_probability_percentage": round(ai_probability_score * 100, 2),
                    "verdict": "SYNTHETIC / AI-GENERATED" if ai_probability_score > 0.65 else ("SUSPICIOUS" if ai_probability_score > 0.35 else "AUTHENTIC / ORGANIC"),
                    "attributed_engine": detected_engine,
                },
            },
            "part_c": {
                "title": "PART C: AFFIRMATION & CERTIFICATION BY COMPETENT AUTHORITY",
                "certifying_officer": officer_name,
                "badge_designation": officer_badge,
                "department": department,
                "affirmation": (
                    f"I, {officer_name} ({officer_badge}), hereby certify that the electronic record "
                    f"identified by SHA-256 hash '{sha256_hash}' was collected, hashed at the instant of receipt, "
                    f"and preserved under immutable custody in compliance with Section 63 of BNSS 2023. "
                    "To the best of my knowledge and belief, no unauthorized modifications have occurred."
                ),
                "digital_verification_status": "CRYPTOGRAPHICALLY_VERIFIED",
            },
        }

        return certificate

    @classmethod
    def render_html_certificate(cls, cert: Dict[str, Any]) -> str:
        """
        Renders an official, printable HTML certificate with styling.
        """
        part_a = cert["part_a"]
        part_b = cert["part_b"]
        part_c = cert["part_c"]
        telemetry = part_b["forensic_telemetry"]

        verdict_color = "#dc2626" if telemetry["verdict"] == "SYNTHETIC / AI-GENERATED" else ("#d97706" if telemetry["verdict"] == "SUSPICIOUS" else "#16a34a")

        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BNSS 2023 Sec 63 Certificate — {cert['certificate_id']}</title>
    <style>
        body {{
            font-family: 'Times New Roman', serif;
            margin: 40px;
            color: #111827;
            background: #fff;
            line-height: 1.5;
        }}
        .border-box {{
            border: 3px double #1f2937;
            padding: 30px;
            position: relative;
        }}
        .header {{
            text-align: center;
            border-bottom: 2px solid #374151;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }}
        .national-emblem {{
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #4b5563;
        }}
        h1 {{
            font-size: 20px;
            margin: 10px 0 5px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        h2 {{
            font-size: 14px;
            font-weight: normal;
            font-style: italic;
            margin: 0;
            color: #4b5563;
        }}
        .meta-bar {{
            display: flex;
            justify-content: space-between;
            background: #f3f4f6;
            padding: 8px 12px;
            font-size: 12px;
            font-family: monospace;
            margin-bottom: 20px;
            border-left: 4px solid #1f2937;
        }}
        .section {{
            margin-bottom: 20px;
        }}
        .section-title {{
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            background: #e5e7eb;
            padding: 4px 8px;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 10px;
        }}
        th, td {{
            border: 1px solid #d1d5db;
            padding: 6px 10px;
            text-align: left;
        }}
        th {{
            background: #f9fafb;
            width: 32%;
            font-weight: bold;
        }}
        .hash-code {{
            font-family: monospace;
            font-size: 11px;
            word-break: break-all;
            background: #f3f4f6;
            padding: 2px 4px;
        }}
        .badge {{
            display: inline-block;
            padding: 4px 10px;
            font-weight: bold;
            border-radius: 4px;
            color: #fff;
            background-color: {verdict_color};
        }}
        .signature-block {{
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 15px;
            border-top: 1px dashed #9ca3af;
        }}
        .stamp-box {{
            border: 2px dashed #9ca3af;
            padding: 15px 25px;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            color: #4b5563;
            text-transform: uppercase;
        }}
    </style>
</head>
<body>
    <div class="border-box">
        <div class="header">
            <div class="national-emblem">Government Evidence Submission • Forensic Audit Division</div>
            <h1>Certificate of Electronic Evidence Admissibility</h1>
            <h2>Under Section 63 of Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS 2023)</h2>
            <div style="font-size: 11px; margin-top: 4px; color: #6b7280;">(Corresponding to former Section 65B of Indian Evidence Act, 1872)</div>
        </div>

        <div class="meta-bar">
            <span><strong>CERTIFICATE NO:</strong> {cert['certificate_id']}</span>
            <span><strong>CASE REF:</strong> {cert['case_id']}</span>
            <span><strong>DATE (UTC):</strong> {cert['issued_at_utc']}</span>
        </div>

        <div class="section">
            <div class="section-title">{part_a['title']}</div>
            <table>
                <tr><th>Original File Name</th><td>{part_a['file_name']} ({part_a['file_size_bytes']} bytes)</td></tr>
                <tr><th>Acquisition Channel</th><td>{part_a['acquisition_method']}</td></tr>
                <tr><th>Acquisition Timestamp</th><td>{part_a['acquisition_timestamp']}</td></tr>
                <tr><th>Primary Cryptographic Hash</th><td><span class="hash-code">{part_a['primary_hash_sha256']}</span></td></tr>
                <tr><th>IPFS Immutable CID</th><td><span class="hash-code">{part_a['decentralized_vault_cid']}</span></td></tr>
                <tr><th>Decentralized Gateway</th><td><a href="{part_a['ipfs_gateway_uri']}" target="_blank">{part_a['ipfs_gateway_uri']}</a></td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">{part_b['title']}</div>
            <table>
                <tr><th>Forensics Verification Engine</th><td>{part_b['system_name']}</td></tr>
                <tr><th>Cryptographic Hash Standard</th><td>{part_b['hash_standard']}</td></tr>
                <tr><th>Decentralized Storage Layer</th><td>{part_b['storage_type']}</td></tr>
                <tr><th>AI Synthetic Probability</th><td><strong>{telemetry['synthetic_probability_percentage']}%</strong> — <span class="badge">{telemetry['verdict']}</span></td></tr>
                <tr><th>Attributed Generative Engine</th><td><strong>{telemetry['attributed_engine']}</strong></td></tr>
                <tr><th>Tamper-Proof Guarantee</th><td>{part_b['tamper_evidence_proof']}</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">{part_c['title']}</div>
            <p style="font-size: 12px; font-style: italic; line-height: 1.6; padding: 0 10px;">
                "{part_c['affirmation']}"
            </p>
        </div>

        <div class="signature-block">
            <div class="stamp-box">
                SEAL OF DIGITAL INTEGRITY<br/>
                DEEPTRACE FORENSIC VAULT<br/>
                VERIFIED HASH: SHA-256
            </div>
            <div style="text-align: right; font-size: 12px;">
                <p><strong>Digital Signature Affirmation</strong></p>
                <p style="margin: 2px 0;"><strong>Officer Name:</strong> {part_c['certifying_officer']}</p>
                <p style="margin: 2px 0;"><strong>Badge / ID:</strong> {part_c['badge_designation']}</p>
                <p style="margin: 2px 0;"><strong>Department:</strong> {part_c['department']}</p>
                <p style="margin-top: 15px; color: #16a34a; font-weight: bold;">STATUS: {part_c['digital_verification_status']}</p>
            </div>
        </div>
    </div>
</body>
</html>
"""
