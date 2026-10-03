"""
DeepTrace Legal Compliance Engine — Cryptographic Hasher
Compliant with Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS Sec 63)
"""

import hashlib
import os
from typing import Dict, Any, BinaryIO, Union


class EvidenceHasher:
    """
    Computes cryptographic digests on electronic evidence binaries.
    Under BNSS 2023 Sec 63, electronic records require an uninterrupted
    cryptographic chain of custody from the point of initial acquisition.
    """

    CHUNK_SIZE = 64 * 1024  # 64 KB chunks for memory-efficient hashing of large video files

    @classmethod
    def hash_file(cls, file_path: str) -> Dict[str, Any]:
        """
        Calculates SHA-256 and secondary BLAKE2b digests for a local file path.
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Evidence file not found: {file_path}")

        sha256 = hashlib.sha256()
        blake2b = hashlib.blake2b()
        sha512 = hashlib.sha512()
        total_bytes = 0

        with open(file_path, "rb") as f:
            while chunk := f.read(cls.CHUNK_SIZE):
                sha256.update(chunk)
                blake2b.update(chunk)
                sha512.update(chunk)
                total_bytes += len(chunk)

        return {
            "sha256": sha256.hexdigest(),
            "blake2b": blake2b.hexdigest(),
            "sha512": sha512.hexdigest(),
            "file_size_bytes": total_bytes,
            "algorithm_primary": "SHA-256 (NIST FIPS 180-4)",
            "algorithm_secondary": "BLAKE2b (RFC 7693)",
        }

    @classmethod
    def hash_bytes(cls, data: bytes) -> Dict[str, Any]:
        """
        Calculates cryptographic digests directly from raw in-memory bytes.
        """
        sha256 = hashlib.sha256(data).hexdigest()
        blake2b = hashlib.blake2b(data).hexdigest()
        sha512 = hashlib.sha512(data).hexdigest()

        return {
            "sha256": sha256,
            "blake2b": blake2b,
            "sha512": sha512,
            "file_size_bytes": len(data),
            "algorithm_primary": "SHA-256 (NIST FIPS 180-4)",
            "algorithm_secondary": "BLAKE2b (RFC 7693)",
        }

    @classmethod
    def verify_integrity(cls, file_path: str, expected_sha256: str) -> bool:
        """
        Verifies whether the current state of a file matches its expected SHA-256 digest.
        """
        current_digests = cls.hash_file(file_path)
        return current_digests["sha256"].lower() == expected_sha256.strip().lower()
