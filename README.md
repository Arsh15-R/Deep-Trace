# DeepTrace — Multi-Modal AI Forensics & Evidence Management Platform

> **AI Detection • Legal Compliance (BNSS 2023 Sec 63) • Immutable IPFS Vault (Pinata)**

---

## 🚀 Key Features

- **🔬 Dynamic Multi-Modal AI Forensics**: Evaluates images, audio, and video to calculate AI probability scores (0–100%) and fingerprint generative engines (Midjourney, Stable Diffusion XL, DALL-E, ElevenLabs, Tortoise, Sora, Runway, Wav2Lip).
- **📜 Legal Compliance (BNSS 2023 Sec 63)**: Automates EXIF/container extraction, immediate cryptographic hashing (SHA-256 / Blake3), audit trail logging, and court-admissible certificate generation.
- **🔗 Immutable IPFS Evidence Vault**: Content-addressed decentralized pinning via Pinata ensures evidence cannot be modified, deleted, or falsified post-collection.
- **📱 On-Field Telegram Bot (`@deeptrace_forensic_bot`)**: Rapid mobile triage for field officers with sub-5-second verdicts.
- **🧩 Inspector Chrome Extension (Manifest V3)**: One-click auditing of web-hosted media and social media deepfakes directly in the browser.
- **📊 Central Forensic Web Dashboard**: Investigation workbench with threat heatmaps, spectrograms, CID lookups, and BNSS Sec 63 PDF certificate exports.

---

## 📁 Repository Structure

```text
deep-trace/
├── ARCHITECTURE.md                 # Complete system architecture & workflow specs
├── README.md                       # Project summary and quick start guide
├── apps/
│   ├── api/                        # FastAPI Backend & Gateway
│   ├── web/                        # Central Forensic Web Dashboard (Next.js)
│   ├── telegram-bot/               # On-field Telegram Bot service (@deeptrace_forensic_bot)
│   └── chrome-extension/           # Inspector Chrome Extension (Manifest V3)
├── services/
│   ├── forensics-engine/           # Multi-modal AI inference workers (Celery/PyTorch)
│   │   ├── image_forensics.py      # Spatial & FFT frequency analysis
│   │   ├── audio_forensics.py      # Mel-spectrogram & vocoder analysis
│   │   ├── video_forensics.py      # Temporal consistency & lip-sync
│   │   └── attribution.py          # Generative model fingerprinting
│   ├── ipfs-vault/                 # Pinata IPFS integration & CID management
│   └── legal-compliance/          # BNSS 2023 Sec 63 certificate generator
└── docs/                           # Legal specs, diagrams, and deployment guides
```

---

## 📖 Complete Documentation

See [ARCHITECTURE.md](file:///d:/deep%20trace/ARCHITECTURE.md) for detailed architecture diagrams, component interactions, sequence flows, and legal compliance mappings.
