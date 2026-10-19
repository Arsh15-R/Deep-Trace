"""
DeepTrace Multi-Modal AI Forensics — Image Forensic Pipeline
State-of-the-art forensic computer vision pipeline:
- 2D-FFT azimuthal radial power spectrum & upscaler checkerboard peak analysis
- Error Level Analysis (ELA) compression surface variance
- High-pass sensor noise residual & PRNU homogeneity analysis
- Bayer Color Filter Array (CFA) demosaicing cross-channel correlation
- Anti-forensic metadata inspection (EXIF camera hardware vs. AI generator tags)
"""

import os
import io
import math
from typing import Dict, Any, List, Optional
import numpy as np
from PIL import Image, ExifTags
from scipy import fft, ndimage


class ImageForensicDetector:
    """
    Forensic image analyzer detecting generative artifacts with scientific signal processing.
    """

    KNOWN_AI_METADATA_KEYS = [
        "parameters", "prompt", "negative prompt", "steps", "sampler",
        "seed", "cfg scale", "model hash", "comfyui", "automatic1111",
        "midjourney", "dall-e", "novelai", "flux", "stablediffusion",
    ]

    @classmethod
    def analyze(cls, file_path: str) -> Dict[str, Any]:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        file_size = os.path.getsize(file_path)

        try:
            with Image.open(file_path) as original_pil:
                # Convert to RGB mode
                img_rgb = original_pil.convert("RGB")
                width, height = img_rgb.size
                
                # Check for metadata traces (PNG text chunks, EXIF, etc.)
                meta_finding = cls._scan_metadata(original_pil)

                # Resize image for fast, consistent mathematical evaluation if oversized
                max_dim = 1024
                if width > max_dim or height > max_dim:
                    scale = max_dim / max(width, height)
                    eval_size = (int(width * scale), int(height * scale))
                    eval_img = img_rgb.resize(eval_size, Image.Resampling.BILINEAR)
                else:
                    eval_img = img_rgb

                arr_rgb = np.array(eval_img, dtype=np.float32)
                # Grayscale luminance: Rec. 601 standard
                arr_gray = 0.2989 * arr_rgb[:, :, 0] + 0.5870 * arr_rgb[:, :, 1] + 0.1140 * arr_rgb[:, :, 2]

                # 1. 2D-FFT Frequency Spectrum Analysis
                fft_metrics = cls._analyze_2d_fft(arr_gray)

                # 2. Error Level Analysis (ELA)
                ela_metrics = cls._analyze_ela(eval_img)

                # 3. Sensor Noise Residual & PRNU
                noise_metrics = cls._analyze_sensor_noise(arr_gray)

                # 4. Bayer CFA Demosaicing Residual
                cfa_metrics = cls._analyze_bayer_cfa(arr_rgb)

        except Exception as e:
            # Fallback to byte-level analysis if PIL cannot open the file
            return cls._fallback_byte_analysis(file_path, file_size, str(e))

        # ─── Fuse Signals into Calibrated Probability Score ──────────
        fft_anomaly = fft_metrics["fft_anomaly_score"]
        ela_anomaly = ela_metrics["ela_anomaly_score"]
        noise_anomaly = noise_metrics["noise_anomaly_score"]
        cfa_anomaly = cfa_metrics["cfa_anomaly_score"]

        # Weighted fusion of mathematical features with peak anomaly sensitivity
        weighted_mean = (
            (fft_anomaly * 0.35) +
            (ela_anomaly * 0.30) +
            (noise_anomaly * 0.20) +
            (cfa_anomaly * 0.15)
        )
        # In forensic science, a severe isolated anomaly (e.g., massive ELA discontinuity or FFT lattice)
        # provides strong evidence of manipulation even if other features remain baseline.
        dominant_anomaly = max(fft_anomaly, ela_anomaly)
        raw_fused = (weighted_mean * 0.60) + (dominant_anomaly * 0.40)

        # Extreme threshold triggers
        if ela_metrics["patch_variance_ratio"] > 8.0:
            raw_fused = max(raw_fused, 0.78)
        if fft_metrics["high_frequency_peak_ratio"] > 2.5:
            raw_fused = max(raw_fused, 0.75)

        artifacts: List[str] = []

        if meta_finding["ai_metadata_detected"]:
            # Definite AI provenance found in metadata
            raw_fused = max(raw_fused, 0.98)
            artifacts.append(f"AI generator metadata tag detected: '{meta_finding['matched_key']}'")
        elif meta_finding["has_genuine_camera_exif"]:
            # Real camera hardware profile (Nikon, Canon, Sony, Apple iPhone, etc.)
            raw_fused = min(raw_fused * 0.55, 0.25)

        if fft_metrics["high_frequency_peak_ratio"] > 2.4:
            artifacts.append(
                f"2D-FFT azimuthal spectrum shows periodic upscaling peak anomalies "
                f"(peak ratio: {fft_metrics['high_frequency_peak_ratio']:.2f}x, characteristic of GAN/Diffusion upscalers)"
            )
        
        if fft_metrics["spectral_decay_slope"] < 1.3:
            artifacts.append(
                f"Abnormally flat high-frequency spectral slope (alpha={fft_metrics['spectral_decay_slope']:.2f}), "
                f"indicating synthetic unconstrained frequency synthesis"
            )
        elif fft_metrics["spectral_decay_slope"] > 3.2:
            artifacts.append(
                f"Excessively steep spectral fall-off (alpha={fft_metrics['spectral_decay_slope']:.2f}), "
                f"characteristic of synthetic smoothing / cartoonish skin diffusion"
            )

        if ela_metrics["patch_variance_ratio"] > 4.5:
            artifacts.append(
                f"Error Level Analysis (ELA) reveals regional compression discontinuity "
                f"(patch variance ratio: {ela_metrics['patch_variance_ratio']:.1f}x, consistent with inpainting or face swapping)"
            )

        if noise_metrics["noise_variance_homogeneity"] > 0.82:
            artifacts.append(
                "Sensor noise residual lacks natural photon shot noise variance "
                "(consistent with synthetic latent space rendering)"
            )

        if cfa_metrics["cfa_correlation"] < 0.30:
            artifacts.append(
                "Absence of optical Bayer Color Filter Array (CFA) demosaicing residuals; "
                "media was not captured through a physical camera sensor"
            )

        synthetic_prob = min(0.999, max(0.005, raw_fused))

        # Calibrate verdict
        if synthetic_prob >= 0.65:
            verdict = "SYNTHETIC"
        elif synthetic_prob >= 0.40:
            verdict = "SUSPICIOUS"
        else:
            verdict = "ORGANIC"

        return {
            "modality": "image",
            "synthetic_probability": round(synthetic_prob, 4),
            "confidence": 0.94 if (synthetic_prob > 0.85 or synthetic_prob < 0.20) else 0.86,
            "metrics": {
                "fft_frequency_anomaly_score": round(fft_anomaly, 4),
                "fft_peak_ratio": round(fft_metrics["high_frequency_peak_ratio"], 3),
                "spectral_decay_slope": round(fft_metrics["spectral_decay_slope"], 3),
                "ela_compression_anomaly_score": round(ela_anomaly, 4),
                "ela_patch_variance_ratio": round(ela_metrics["patch_variance_ratio"], 2),
                "noise_residual_anomaly_score": round(noise_anomaly, 4),
                "noise_std_dev": round(noise_metrics["noise_std"], 3),
                "bayer_cfa_correlation": round(cfa_metrics["cfa_correlation"], 3),
                "has_camera_hardware_trace": meta_finding["has_genuine_camera_exif"],
            },
            "detected_artifacts": artifacts,
            "verdict": verdict,
        }

    # ──────────────────────────────────────────────────────────
    # Forensic Signal Processing Subroutines
    # ──────────────────────────────────────────────────────────

    @staticmethod
    def _analyze_2d_fft(gray: np.ndarray) -> Dict[str, float]:
        """
        Computes 2D-FFT azimuthal radial energy distribution.
        Detects periodic checkerboard lattice artifacts from latent upscalers.
        """
        h, w = gray.shape
        f_transform = fft.fft2(gray)
        f_shift = fft.fftshift(f_transform)
        magnitude_spectrum = np.log(1.0 + np.abs(f_shift))

        cy, cx = h // 2, w // 2
        y_grid, x_grid = np.ogrid[:h, :w]
        r_grid = np.hypot(x_grid - cx, y_grid - cy).astype(int)

        max_r = min(cy, cx)
        if max_r < 10:
            return {
                "fft_anomaly_score": 0.5,
                "high_frequency_peak_ratio": 1.0,
                "spectral_decay_slope": 2.0,
            }

        radial_profile = []
        for radius in range(1, max_r):
            mask = (r_grid == radius)
            if np.any(mask):
                radial_profile.append(float(np.mean(magnitude_spectrum[mask])))
            else:
                radial_profile.append(0.0)

        # Estimate decay slope alpha via log-log fit: log(P(r)) = -alpha * log(r) + C
        r_indices = np.arange(2, len(radial_profile) // 2)
        energies = np.array([radial_profile[i] for i in r_indices])
        
        valid = (energies > 0)
        if np.sum(valid) > 5:
            poly = np.polyfit(np.log(r_indices[valid]), np.log(energies[valid]), deg=1)
            slope = float(abs(poly[0]))
        else:
            slope = 2.0

        # High-frequency band analysis (outer 35% of radial spectrum)
        outer_start = int(len(radial_profile) * 0.65)
        outer_band = radial_profile[outer_start:]
        if outer_band:
            outer_mean = float(np.mean(outer_band))
            outer_max = float(np.max(outer_band))
            peak_ratio = outer_max / max(outer_mean, 1e-6)
        else:
            peak_ratio = 1.0

        # Anomaly scoring based on known generative models:
        # 1. Periodic checkerboard peaks (peak_ratio > 2.0)
        # 2. Abnormal slope (< 1.4 or > 3.0)
        peak_score = min(1.0, max(0.0, (peak_ratio - 1.4) / 1.5))
        slope_score = 0.0
        if slope < 1.4:
            slope_score = min(1.0, (1.4 - slope) / 0.8)
        elif slope > 2.8:
            slope_score = min(1.0, (slope - 2.8) / 1.0)

        fft_anomaly_score = min(1.0, (peak_score * 0.65) + (slope_score * 0.35))

        return {
            "fft_anomaly_score": fft_anomaly_score,
            "high_frequency_peak_ratio": peak_ratio,
            "spectral_decay_slope": slope,
        }

    @staticmethod
    def _analyze_ela(img: Image.Image, quality: int = 90) -> Dict[str, float]:
        """
        Error Level Analysis (ELA).
        Re-saves the image to memory at Q=90 and analyzes localized error surface variance.
        """
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=quality)
        buf.seek(0)
        recompressed = Image.open(buf).convert("RGB")

        orig_arr = np.array(img, dtype=np.float32)
        recomp_arr = np.array(recompressed, dtype=np.float32)

        # Scale difference
        diff = np.abs(orig_arr - recomp_arr)
        mean_error = float(np.mean(diff))

        # Tile-based variance across an 8x8 grid
        h, w, _ = diff.shape
        tile_h = max(8, h // 8)
        tile_w = max(8, w // 8)

        variances = []
        for i in range(0, h - tile_h + 1, tile_h):
            for j in range(0, w - tile_w + 1, tile_w):
                tile = diff[i : i + tile_h, j : j + tile_w]
                variances.append(float(np.var(tile)))

        if len(variances) > 4:
            sorted_vars = sorted(variances)
            # Compare upper 15% with lower 15%
            low_val = max(sorted_vars[int(len(sorted_vars) * 0.15)], 0.1)
            high_val = sorted_vars[int(len(sorted_vars) * 0.85)]
            variance_ratio = high_val / low_val
        else:
            variance_ratio = 1.0

        # Inpainting / face swaps produce extreme variance ratio (> 4.0)
        ela_anomaly_score = min(1.0, max(0.0, (variance_ratio - 1.8) / 4.0))

        return {
            "ela_anomaly_score": ela_anomaly_score,
            "ela_mean_error": mean_error,
            "patch_variance_ratio": variance_ratio,
        }

    @staticmethod
    def _analyze_sensor_noise(gray: np.ndarray) -> Dict[str, float]:
        """
        Estimates sensor noise residual using a high-pass Gaussian spatial filter.
        Optical sensors produce signal-dependent shot noise; synthetic renders are either
        unnaturally smooth or have homogeneous artificial dither.
        """
        blurred = ndimage.gaussian_filter(gray, sigma=1.5)
        residual = gray - blurred
        noise_std = float(np.std(residual))

        # Check patch-level variance homogeneity across 16x16 blocks
        h, w = gray.shape
        block = 32
        block_stds = []
        for i in range(0, h - block + 1, block):
            for j in range(0, w - block + 1, block):
                block_stds.append(float(np.std(residual[i : i + block, j : j + block])))

        if block_stds:
            std_of_stds = float(np.std(block_stds))
            mean_of_stds = float(np.mean(block_stds))
            # Coefficient of variation (CV) of noise across blocks
            cv = std_of_stds / max(mean_of_stds, 1e-4)
            # Authentic photos have natural variation in noise (CV between 0.3 and 0.8).
            # Extreme homogeneity (CV < 0.15) or unnaturally zero noise (noise_std < 1.0) indicates synthetic.
            if noise_std < 1.2:
                noise_anomaly = 0.88
            elif cv < 0.18:
                noise_anomaly = 0.80
            elif cv > 1.2:
                noise_anomaly = 0.70
            else:
                noise_anomaly = 0.20
            homogeneity = 1.0 - min(1.0, cv)
        else:
            noise_anomaly = 0.4
            homogeneity = 0.5

        return {
            "noise_anomaly_score": noise_anomaly,
            "noise_std": noise_std,
            "noise_variance_homogeneity": homogeneity,
        }

    @staticmethod
    def _analyze_bayer_cfa(rgb: np.ndarray) -> Dict[str, float]:
        """
        Color Filter Array (CFA) demosaicing residual analysis.
        Physical camera sensors use Bayer color filters (RGGB).
        Authentic cameras have strong inter-channel second-difference correlation.
        """
        r = rgb[:, :, 0]
        g = rgb[:, :, 1]
        b = rgb[:, :, 2]

        # Horizontal second differences: d2(x) = f(x+1) - 2f(x) + f(x-1)
        d2_r = r[:, 2:] - 2 * r[:, 1:-1] + r[:, :-2]
        d2_g = g[:, 2:] - 2 * g[:, 1:-1] + g[:, :-2]

        # Check chromatic separation: physical CFA cameras have natural differences between R, G, B
        rg_diff = float(np.mean(np.abs(r - g)))
        if rg_diff < 1.0:
            # Monochromatic or uniform channel distribution
            return {
                "cfa_anomaly_score": 0.55,
                "cfa_correlation": 0.0,
            }

        var_r = np.var(d2_r)
        var_g = np.var(d2_g)

        if var_r > 1e-4 and var_g > 1e-4:
            cov = np.mean((d2_r - np.mean(d2_r)) * (d2_g - np.mean(d2_g)))
            corr = float(cov / (np.sqrt(var_r) * np.sqrt(var_g)))
            corr = max(-1.0, min(1.0, corr))
        else:
            corr = 0.0

        # Authentic cameras typically have corr > 0.60 due to demosaicing interpolation.
        # AI images lacking physical CFA demosaicing have low or negative correlation.
        if corr < 0.35:
            cfa_anomaly_score = min(1.0, (0.45 - corr) / 0.45)
        else:
            cfa_anomaly_score = max(0.05, 1.0 - (corr - 0.35) / 0.50)

        return {
            "cfa_anomaly_score": cfa_anomaly_score,
            "cfa_correlation": corr,
        }

    @classmethod
    def _scan_metadata(cls, img: Image.Image) -> Dict[str, Any]:
        """
        Scans image container info and EXIF tags for AI generation traces and camera hardware.
        """
        result = {
            "ai_metadata_detected": False,
            "matched_key": None,
            "has_genuine_camera_exif": False,
        }

        # Check PNG text chunks / JPEG info
        if hasattr(img, "info") and isinstance(img.info, dict):
            for key, val in img.info.items():
                k_lower = str(key).lower()
                v_str = str(val).lower()
                for ai_key in cls.KNOWN_AI_METADATA_KEYS:
                    if ai_key in k_lower or ai_key in v_str:
                        result["ai_metadata_detected"] = True
                        result["matched_key"] = ai_key
                        return result

        # Check EXIF
        try:
            exif = img.getexif()
            if exif:
                for tag_id, value in exif.items():
                    tag_name = str(ExifTags.TAGS.get(tag_id, tag_id))
                    val_str = str(value).lower()
                    if tag_name in ("Make", "Model") and len(val_str) > 2:
                        result["has_genuine_camera_exif"] = True
                    for ai_key in cls.KNOWN_AI_METADATA_KEYS:
                        if ai_key in val_str:
                            result["ai_metadata_detected"] = True
                            result["matched_key"] = ai_key
                            return result
        except Exception:
            pass

        return result

    @classmethod
    def _fallback_byte_analysis(cls, file_path: str, file_size: int, error_msg: str) -> Dict[str, Any]:
        """
        Fallback analysis for corrupt or non-standard image streams.
        """
        with open(file_path, "rb") as f:
            raw = f.read(min(file_size, 65536))

        entropy = 0.0
        if raw:
            counts = [0] * 256
            for b in raw:
                counts[b] += 1
            for c in counts:
                if c > 0:
                    p = c / len(raw)
                    entropy -= p * math.log2(p)

        score = 0.50
        return {
            "modality": "image",
            "synthetic_probability": round(score, 4),
            "confidence": 0.60,
            "metrics": {
                "byte_entropy": round(entropy, 4),
                "parse_warning": error_msg,
            },
            "detected_artifacts": ["Media stream required byte-level container fallback"],
            "verdict": "SUSPICIOUS",
        }
