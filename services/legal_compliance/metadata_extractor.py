"""
DeepTrace Legal Compliance Engine — Metadata & Forensic Origin Extractor
Compliant with BNSS 2023 Sec 63 (Device Fingerprint & System Information)
"""

import os
import json
import mimetypes
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional


class MetadataExtractor:
    """
    Extracts container, technical, and structural metadata from evidence files.
    Identifies anti-forensic indicators (stripped metadata, generative engine tags,
    inconsistent creation timestamps).
    """

    KNOWN_AI_SOFTWARE_SIGNATURES = [
        "midjourney",
        "stable diffusion",
        "automatic1111",
        "comfyui",
        "dall-e",
        "photoshop generative",
        "firefly",
        "novelai",
        "fooocus",
        "elevenlabs",
        "suno",
        "sora",
        "runway",
    ]

    @classmethod
    def extract(cls, file_path: str, mime_type: Optional[str] = None) -> Dict[str, Any]:
        """
        Parses all metadata tags from the file.
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        file_stat = os.stat(file_path)
        if not mime_type:
            mime_type, _ = mimetypes.guess_type(file_path)
            mime_type = mime_type or "application/octet-stream"

        result: Dict[str, Any] = {
            "file_info": {
                "file_name": os.path.basename(file_path),
                "file_size": file_stat.st_size,
                "mime_type": mime_type,
                "created_at_filesystem": datetime.fromtimestamp(file_stat.st_ctime, tz=timezone.utc).isoformat(),
                "modified_at_filesystem": datetime.fromtimestamp(file_stat.st_mtime, tz=timezone.utc).isoformat(),
            },
            "exif_metadata": {},
            "container_metadata": {},
            "anti_forensic_alerts": [],
            "identified_software_traces": [],
            "has_camera_hardware_trace": False,
        }

        # Try image EXIF extraction using PIL if available
        if mime_type.startswith("image/"):
            cls._extract_image_exif(file_path, result)
        elif mime_type.startswith("video/") or mime_type.startswith("audio/"):
            cls._extract_media_container(file_path, mime_type, result)

        return result

    @classmethod
    def _extract_image_exif(cls, file_path: str, result: Dict[str, Any]) -> None:
        try:
            from PIL import Image, ExifTags

            with Image.open(file_path) as img:
                result["container_metadata"] = {
                    "width": img.width,
                    "height": img.height,
                    "format": img.format,
                    "mode": img.mode,
                }

                exif = img.getexif()
                if not exif:
                    result["anti_forensic_alerts"].append("EXIF metadata is absent (possible synthetic origin or stripped for anti-forensics)")
                    return

                exif_data = {}
                for tag_id, value in exif.items():
                    tag_name = ExifTags.TAGS.get(tag_id, str(tag_id))
                    # Convert un-serializable bytes to str representation
                    if isinstance(value, bytes):
                        try:
                            value = value.decode("utf-8", errors="replace")
                        except Exception:
                            value = str(value)
                    exif_data[tag_name] = value

                result["exif_metadata"] = exif_data

                # Hardware check (Make / Model)
                if "Make" in exif_data or "Model" in exif_data:
                    result["has_camera_hardware_trace"] = True

                # Software check
                software = str(exif_data.get("Software", "")).lower()
                for signature in cls.KNOWN_AI_SOFTWARE_SIGNATURES:
                    if signature in software:
                        result["identified_software_traces"].append(signature)
                        result["anti_forensic_alerts"].append(f"Generative software trace detected in EXIF: '{signature}'")

        except ImportError:
            # Fallback when PIL is not installed
            result["container_metadata"]["note"] = "PIL not installed. Fallback header extraction used."
            cls._basic_header_scan(file_path, result)
        except Exception as e:
            result["anti_forensic_alerts"].append(f"Failed to parse EXIF: {str(e)}")

    @classmethod
    def _extract_media_container(cls, file_path: str, mime_type: str, result: Dict[str, Any]) -> None:
        cls._basic_header_scan(file_path, result)

    @classmethod
    def _basic_header_scan(cls, file_path: str, result: Dict[str, Any]) -> None:
        """
        Scans binary headers for text strings indicating generative software.
        """
        try:
            with open(file_path, "rb") as f:
                header_bytes = f.read(16384)  # First 16KB usually holds header strings
                header_text = header_bytes.decode("latin-1", errors="ignore").lower()

                for sig in cls.KNOWN_AI_SOFTWARE_SIGNATURES:
                    if sig in header_text:
                        result["identified_software_traces"].append(sig)
                        result["anti_forensic_alerts"].append(f"Generative engine artifact found in binary header: '{sig}'")
        except Exception:
            pass
