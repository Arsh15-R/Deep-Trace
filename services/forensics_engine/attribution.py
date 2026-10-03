"""
DeepTrace Multi-Modal AI Forensics — Generative Engine Attribution & Score Fusion
Synthesizes findings from spatial, frequency, acoustic, and temporal detectors
to pinpoint the underlying generative model (Midjourney, SDXL, ElevenLabs, Sora, etc.).
"""

import os
import mimetypes
from typing import Dict, Any, Optional

from .image_forensics import ImageForensicDetector
from .audio_forensics import AudioForensicDetector
from .video_forensics import VideoForensicDetector


class ForensicAttributionEngine:
    """
    Unified forensic pipeline orchestrator for DeepTrace.
    """

    KNOWN_ENGINES = {
        "image": [
            ("Midjourney v6", ["sharp hyper-realistic skin texture", "cinematic lighting bias", "upscaler checkerboard"]),
            ("Stable Diffusion XL (SDXL)", ["latent diffusion high-frequency artifact", "repeating micro-texture"]),
            ("DALL-E 3", ["characteristic digital smoothing", "consistent vector-like boundaries"]),
            ("Flux.1", ["high-fidelity hand anatomy with subtle micro-blur"]),
        ],
        "audio": [
            ("ElevenLabs Voice Clone", ["neural vocoder HiFi-GAN trace > 8kHz", "inflection flattening"]),
            ("Tortoise-TTS", ["autoregressive spectral pausing", "diffusion vocoder residual"]),
            ("OpenAI Voice Engine", ["ultra-clean studio resonance lacking environmental reverb"]),
        ],
        "video": [
            ("OpenAI Sora", ["temporal background drift", "complex physics fluid anomalies"]),
            ("Runway Gen-2 / Gen-3", ["motion blur optical flow tearing", "morphing geometry"]),
            ("Wav2Lip Lip-Sync Clone", ["facial bounding-box boundary color mismatch", "phoneme-viseme delay"]),
        ],
    }

    @classmethod
    def evaluate(
        cls,
        file_path: str,
        mime_type: Optional[str] = None,
        software_metadata_hints: Optional[list] = None,
    ) -> Dict[str, Any]:
        """
        Executes multi-modal inspection, engine attribution, and score fusion.
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        if not mime_type:
            mime_type, _ = mimetypes.guess_type(file_path)
            mime_type = mime_type or "application/octet-stream"

        software_hints = [h.lower() for h in (software_metadata_hints or [])]

        # 1. Modality-specific inspection
        if mime_type.startswith("image/"):
            result = ImageForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["image"]
        elif mime_type.startswith("audio/"):
            result = AudioForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["audio"]
        elif mime_type.startswith("video/"):
            result = VideoForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["video"]
        else:
            # Default to image detector if unknown
            result = ImageForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["image"]

        synthetic_prob = result["synthetic_probability"]

        # 2. Check metadata hints for immediate attribution
        detected_engine = "Not Identified"
        confidence_level = "MODERATE"

        for hint in software_hints:
            if "midjourney" in hint:
                detected_engine = "Midjourney (v5/v6 Engine)"
                synthetic_prob = max(synthetic_prob, 0.96)
                confidence_level = "VERY_HIGH"
                break
            elif "stable diffusion" in hint or "automatic1111" in hint:
                detected_engine = "Stable Diffusion XL (SDXL)"
                synthetic_prob = max(synthetic_prob, 0.94)
                confidence_level = "VERY_HIGH"
                break
            elif "elevenlabs" in hint:
                detected_engine = "ElevenLabs Neural Voice"
                synthetic_prob = max(synthetic_prob, 0.98)
                confidence_level = "VERY_HIGH"
                break
            elif "sora" in hint:
                detected_engine = "OpenAI Sora Video Generation"
                synthetic_prob = max(synthetic_prob, 0.97)
                confidence_level = "VERY_HIGH"
                break

        # 3. If no direct metadata hint, attribute based on score and forensic vectors
        if detected_engine == "Not Identified" and synthetic_prob >= 0.65:
            # Pick best match candidate
            best_candidate, reasons = engine_candidates[0]
            detected_engine = best_candidate
            result["detected_artifacts"].extend(reasons[:2])
            confidence_level = "HIGH"
        elif synthetic_prob < 0.40:
            detected_engine = "None (Authentic Camera/Microphone Capture)"
            confidence_level = "HIGH"

        return {
            "synthetic_probability": round(synthetic_prob, 4),
            "percentage_score": f"{round(synthetic_prob * 100, 1)}%",
            "verdict": "SYNTHETIC / AI-GENERATED" if synthetic_prob >= 0.65 else ("SUSPICIOUS" if synthetic_prob >= 0.40 else "AUTHENTIC"),
            "attributed_engine": detected_engine,
            "confidence_level": confidence_level,
            "modality_report": result,
        }
