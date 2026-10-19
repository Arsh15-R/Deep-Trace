"""
DeepTrace Multi-Modal AI Forensics — Generative Engine Attribution & Score Fusion
Synthesizes findings from spatial 2D-FFT, Error Level Analysis (ELA), Bayer CFA demosaicing,
neural vocoder harmonics, and temporal video coherence to pinpoint generative engine provenance
(Midjourney v6, SDXL, Flux.1, ElevenLabs, OpenAI Sora, Runway, etc.) or authenticate camera capture.
"""

import os
import mimetypes
from typing import Dict, Any, Optional, List

from .image_forensics import ImageForensicDetector
from .audio_forensics import AudioForensicDetector
from .video_forensics import VideoForensicDetector


class ForensicAttributionEngine:
    """
    Unified forensic pipeline orchestrator for DeepTrace.
    """

    KNOWN_ENGINES = {
        "image": [
            ("Midjourney v6", ["characteristic azimuthal upscaler checkerboard peaks", "hyper-detailed skin specular micro-texture"]),
            ("Stable Diffusion XL (SDXL)", ["latent diffusion high-frequency artifact", "repeating micro-texture"]),
            ("DALL-E 3", ["characteristic digital smoothing", "vector-like boundary gradients"]),
            ("Flux.1", ["high-fidelity hand anatomy with subtle micro-blur", "diffusion latent residual"]),
            ("Deepfake Face-Swap / Inpainting", ["Error Level Analysis (ELA) regional discontinuity", "boundary seam re-compression"]),
        ],
        "audio": [
            ("ElevenLabs Voice Clone", ["neural vocoder HiFi-GAN trace > 8 kHz", "physiological pitch jitter suppression"]),
            ("Tortoise-TTS", ["autoregressive spectral pausing", "diffusion vocoder residual"]),
            ("OpenAI Voice Engine", ["ultra-clean studio resonance lacking environmental acoustic room tone"]),
        ],
        "video": [
            ("OpenAI Sora", ["temporal background drift", "complex physics fluid anomalies"]),
            ("Runway Gen-2 / Gen-3", ["motion blur optical flow tearing", "morphing geometry"]),
            ("Wav2Lip Lip-Sync Clone", ["facial bounding-box boundary color mismatch", "phoneme-viseme phase lag"]),
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
            category = "image"
            result = ImageForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["image"]
        elif mime_type.startswith("audio/"):
            category = "audio"
            result = AudioForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["audio"]
        elif mime_type.startswith("video/"):
            category = "video"
            result = VideoForensicDetector.analyze(file_path)
            engine_candidates = cls.KNOWN_ENGINES["video"]
        else:
            # Default to image detector if extension matches image extensions
            ext = os.path.splitext(file_path)[1].lower()
            if ext in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".gif"]:
                category = "image"
                result = ImageForensicDetector.analyze(file_path)
                engine_candidates = cls.KNOWN_ENGINES["image"]
            elif ext in [".wav", ".mp3", ".ogg", ".flac", ".m4a", ".aac"]:
                category = "audio"
                result = AudioForensicDetector.analyze(file_path)
                engine_candidates = cls.KNOWN_ENGINES["audio"]
            elif ext in [".mp4", ".mov", ".avi", ".mkv", ".webm"]:
                category = "video"
                result = VideoForensicDetector.analyze(file_path)
                engine_candidates = cls.KNOWN_ENGINES["video"]
            else:
                category = "image"
                result = ImageForensicDetector.analyze(file_path)
                engine_candidates = cls.KNOWN_ENGINES["image"]

        synthetic_prob = result["synthetic_probability"]

        # 2. Check metadata hints for immediate attribution
        detected_engine = "Not Identified"
        confidence_level = "MODERATE"

        for hint in software_hints:
            if "midjourney" in hint:
                detected_engine = "Midjourney (v5/v6 Engine)"
                synthetic_prob = max(synthetic_prob, 0.98)
                confidence_level = "VERY_HIGH"
                break
            elif "stable diffusion" in hint or "automatic1111" in hint or "comfyui" in hint:
                detected_engine = "Stable Diffusion XL (SDXL)"
                synthetic_prob = max(synthetic_prob, 0.97)
                confidence_level = "VERY_HIGH"
                break
            elif "flux" in hint:
                detected_engine = "Black Forest Labs Flux.1"
                synthetic_prob = max(synthetic_prob, 0.98)
                confidence_level = "VERY_HIGH"
                break
            elif "elevenlabs" in hint:
                detected_engine = "ElevenLabs Neural Voice"
                synthetic_prob = max(synthetic_prob, 0.99)
                confidence_level = "VERY_HIGH"
                break
            elif "sora" in hint:
                detected_engine = "OpenAI Sora Video Generation"
                synthetic_prob = max(synthetic_prob, 0.98)
                confidence_level = "VERY_HIGH"
                break
            elif "runway" in hint:
                detected_engine = "Runway Gen-3 Alpha"
                synthetic_prob = max(synthetic_prob, 0.97)
                confidence_level = "VERY_HIGH"
                break

        # 3. Fine-grained heuristic attribution if no explicit metadata tag
        if detected_engine == "Not Identified":
            if category == "image":
                metrics = result.get("metrics", {})
                has_hardware = metrics.get("has_camera_hardware_trace", False)
                fft_peak = metrics.get("fft_peak_ratio", 1.0)
                ela_ratio = metrics.get("ela_patch_variance_ratio", 1.0)
                cfa_corr = metrics.get("bayer_cfa_correlation", 0.5)

                if synthetic_prob >= 0.65:
                    if ela_ratio > 4.5 and cfa_corr > 0.40:
                        detected_engine = "Deepfake Face-Swap / Inpainting"
                        confidence_level = "HIGH"
                    elif fft_peak > 2.5:
                        detected_engine = "Midjourney v6 / Latent Upscaler"
                        confidence_level = "HIGH"
                    else:
                        detected_engine = "Stable Diffusion XL / Latent Diffusion"
                        confidence_level = "HIGH"
                elif synthetic_prob < 0.40:
                    if has_hardware or cfa_corr > 0.55:
                        detected_engine = "Authentic Camera Capture (Optical Sensor)"
                        confidence_level = "HIGH"
                    else:
                        detected_engine = "Authentic Digital Photograph"
                        confidence_level = "MODERATE"
                else:
                    detected_engine = "Inconclusive / Mixed Media Processing"
                    confidence_level = "MODERATE"

            elif category == "audio":
                metrics = result.get("metrics", {})
                vocoder_anomaly = metrics.get("vocoder_phase_anomaly", 0.5)
                jitter = metrics.get("pitch_micro_jitter_pct", 1.0)

                if synthetic_prob >= 0.65:
                    if vocoder_anomaly > 0.70 and jitter < 0.25:
                        detected_engine = "ElevenLabs Voice Clone (HiFi-GAN Vocoder)"
                        confidence_level = "HIGH"
                    else:
                        detected_engine = "Neural Text-to-Speech (TTS) Vocoder"
                        confidence_level = "HIGH"
                elif synthetic_prob < 0.40:
                    detected_engine = "Authentic Human Vocal Capture (Microphone)"
                    confidence_level = "HIGH"
                else:
                    detected_engine = "Inconclusive Acoustic Record"
                    confidence_level = "MODERATE"

            elif category == "video":
                metrics = result.get("metrics", {})
                warp_idx = metrics.get("facial_warp_index", 0.5)

                if synthetic_prob >= 0.65:
                    if warp_idx > 0.60:
                        detected_engine = "Wav2Lip / DeepFaceLab Face Swap"
                        confidence_level = "HIGH"
                    else:
                        detected_engine = "Diffusion Video Engine (Runway / Sora)"
                        confidence_level = "HIGH"
                elif synthetic_prob < 0.40:
                    detected_engine = "Authentic Optical Video Capture"
                    confidence_level = "HIGH"
                else:
                    detected_engine = "Inconclusive Video Stream"
                    confidence_level = "MODERATE"

        # Determine formatted verdict string
        if synthetic_prob >= 0.65:
            verdict = "SYNTHETIC / AI-GENERATED"
        elif synthetic_prob >= 0.40:
            verdict = "SUSPICIOUS / INCONCLUSIVE"
        else:
            verdict = "AUTHENTIC / ORGANIC"

        return {
            "synthetic_probability": round(synthetic_prob, 4),
            "percentage_score": f"{round(synthetic_prob * 100, 1)}%",
            "verdict": verdict,
            "attributed_engine": detected_engine,
            "confidence_level": confidence_level,
            "modality": category,
            "modality_report": result,
        }
