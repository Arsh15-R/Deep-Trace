"""
DeepTrace API — Pydantic Schemas & Data Contracts
"""

from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field


class IngestionResponse(BaseModel):
    case_id: str = Field(..., description="Unique case reference code e.g. DT-2026-XXXX")
    file_name: str
    file_size_bytes: int
    mime_type: str
    sha256_hash: str
    blake2b_hash: str
    ipfs_cid: str
    gateway_url: str
    synthetic_probability: float
    percentage_score: str
    verdict: str
    attributed_engine: str
    detected_artifacts: List[str]
    ingested_at: str
    bnss_certificate_url: str


class CaseQueryResponse(BaseModel):
    case_id: str
    file_name: str
    sha256_hash: str
    ipfs_cid: str
    status: str
    synthetic_probability: float
    verdict: str
    attributed_engine: str
    officer_name: str
    department: str
    created_at: str
    metadata_summary: Dict[str, Any]
    certificate_id: str


class CIDVerificationRequest(BaseModel):
    ipfs_cid: Optional[str] = None
    sha256_hash: Optional[str] = None


class CIDVerificationResponse(BaseModel):
    is_valid: bool
    verified_on_ipfs: bool
    case_id: Optional[str] = None
    original_sha256: Optional[str] = None
    ipfs_gateway_url: Optional[str] = None
    court_admissibility_status: str
    message: str
