"""
DeepTrace Supabase Database Service
Connects to Supabase PostgreSQL: cases, evidence, analyses, audit_events.
"""

import os
import json
import logging
import urllib.request
import urllib.error
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

logger = logging.getLogger("deeptrace.supabase")


class SupabaseService:
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        service_key: Optional[str] = None,
    ):
        self.supabase_url = (supabase_url or os.getenv("SUPABASE_URL", "")).rstrip("/")
        self.service_key = service_key or os.getenv("SUPABASE_SERVICE_KEY", "") or os.getenv("SUPABASE_KEY", "")

    def is_configured(self) -> bool:
        return bool(self.supabase_url and self.service_key)

    def _request(self, endpoint: str, method: str = "GET", data: Optional[Dict[str, Any]] = None) -> Any:
        if not self.is_configured():
            return None

        url = f"{self.supabase_url}/rest/v1/{endpoint.lstrip('/')}"
        headers = {
            "apikey": self.service_key,
            "Authorization": f"Bearer {self.service_key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        }

        body = json.dumps(data).encode("utf-8") if data is not None else None
        req = urllib.request.Request(url, data=body, headers=headers, method=method)

        try:
            with urllib.request.urlopen(req) as resp:
                resp_bytes = resp.read()
                if resp_bytes:
                    return json.loads(resp_bytes.decode("utf-8"))
                return {}
        except urllib.error.HTTPError as e:
            error_body = e.read().decode("utf-8") if e.fp else ""
            logger.error(f"Supabase HTTP {e.code} on {endpoint}: {error_body}")
            return None
        except Exception as e:
            logger.error(f"Supabase connection error on {endpoint}: {e}")
            return None

    def get_cases(self) -> List[Dict[str, Any]]:
        """Fetches active cases from Supabase."""
        res = self._request("cases?select=*,evidence(*),analyses(*)")
        return res or []

    def create_case(
        self,
        case_number: str,
        title: str,
        description: str,
        priority: str = "high",
        status: str = "active_investigation",
    ) -> Optional[Dict[str, Any]]:
        """Inserts a new case record."""
        payload = {
            "case_number": case_number,
            "title": title,
            "description": description,
            "priority": priority,
            "status": status,
        }
        res = self._request("cases", method="POST", data=payload)
        return res[0] if res and isinstance(res, list) else None

    def save_evidence(
        self,
        case_id: str,
        file_name: str,
        file_type: str,
        file_size: int,
        sha256_hash: str,
        ipfs_cid: str,
        storage_path: str,
        metadata: Dict[str, Any],
    ) -> Optional[Dict[str, Any]]:
        """Inserts evidence record linked to a case."""
        meta_payload = {
            "ipfs_cid": ipfs_cid,
            "gateway_url": f"https://gateway.pinata.cloud/ipfs/{ipfs_cid}",
            "statutory_compliance": "BNSS 2023 Section 63",
            **metadata,
        }
        payload = {
            "case_id": case_id,
            "file_name": file_name,
            "file_type": file_type,
            "file_size": file_size,
            "sha256_hash": sha256_hash,
            "storage_path": storage_path,
            "metadata": meta_payload,
            "collection_timestamp": datetime.now(timezone.utc).isoformat(),
        }
        res = self._request("evidence", method="POST", data=payload)
        return res[0] if res and isinstance(res, list) else None

    def save_analysis(
        self,
        case_id: str,
        evidence_id: str,
        analysis_type: str,
        result: Dict[str, Any],
    ) -> Optional[Dict[str, Any]]:
        """Inserts multi-modal forensic analysis result."""
        payload = {
            "case_id": case_id,
            "evidence_id": evidence_id,
            "analysis_type": analysis_type,
            "result": result,
        }
        res = self._request("analyses", method="POST", data=payload)
        return res[0] if res and isinstance(res, list) else None

    def log_audit_event(
        self,
        action: str,
        entity_type: str,
        entity_id: str,
        metadata: Dict[str, Any],
    ) -> Optional[Dict[str, Any]]:
        """Inserts an immutable audit event."""
        payload = {
            "action": action,
            "entity_type": entity_type,
            "entity_id": entity_id,
            "metadata": metadata,
        }
        res = self._request("audit_events", method="POST", data=payload)
        return res[0] if res and isinstance(res, list) else None


supabase_db = SupabaseService()
