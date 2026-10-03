"""
DeepTrace On-Field Telegram Bot (@deeptrace_forensic_bot)
Provides field officers with instant mobile verification of photos, videos,
voice notes, and documents under BNSS 2023 Sec 63.
"""

import os
import sys
import json
import logging
import urllib.request
import urllib.error

# Add project root to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("DeepTraceBot")

API_BASE_URL = os.getenv("DEEPTRACE_API_URL", "http://localhost:8000")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")


def send_telegram_message(chat_id: int, text: str, parse_mode: str = "Markdown", reply_markup: dict = None):
    """
    Direct HTTPS caller for Telegram Bot API (works without third-party dependencies).
    """
    if not TELEGRAM_BOT_TOKEN:
        logger.warning(f"[Mock Mode] Bot token not set. Message to {chat_id}:\n{text}")
        return

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {"chat_id": chat_id, "text": text, "parse_mode": parse_mode}
    if reply_markup:
        payload["reply_markup"] = reply_markup

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        logger.error(f"Failed to send Telegram message: {e}")


def handle_evidence_triage(chat_id: int, file_path: str, file_name: str, officer_tag: str):
    """
    Sends file to DeepTrace API and formats the response card.
    """
    send_telegram_message(chat_id, "⏳ *DeepTrace Engine Initiated*\n\n_Calculating SHA-256 hash, pinning to IPFS Vault, and running multi-modal neural forensics..._")

    import uuid
    boundary = f"----WebKitFormBoundary{uuid.uuid4().hex}"
    url = f"{API_BASE_URL}/v1/evidence/ingest"

    body = bytearray()
    # Fields
    for field, value in [
        ("officer_name", f"Telegram Officer ({officer_tag})"),
        ("officer_badge", f"TG-{chat_id}"),
        ("department", "Mobile Surveillance & Field Unit"),
        ("acquisition_channel", "Telegram Bot (@deeptrace_forensic_bot)"),
    ]:
        body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{field}\"\r\n\r\n{value}\r\n".encode())

    # File
    with open(file_path, "rb") as f:
        file_bytes = f.read()

    body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{file_name}\"\r\nContent-Type: application/octet-stream\r\n\r\n".encode())
    body.extend(file_bytes)
    body.extend(f"\r\n--{boundary}--\r\n".encode())

    req = urllib.request.Request(
        url,
        data=bytes(body),
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            
            # Format high-priority mobile card
            score = data["percentage_score"]
            verdict = data["verdict"]
            engine = data["attributed_engine"]
            cid = data["ipfs_cid"]
            sha = data["sha256_hash"]
            case_id = data["case_id"]

            icon = "🚨" if data["synthetic_probability"] >= 0.65 else ("⚠️" if data["synthetic_probability"] >= 0.40 else "✅")
            
            card_text = (
                f"{icon} *DEEPTRACE FORENSIC VERDICT*\n"
                f"━━━━━━━━━━━━━━━━━━━━\n"
                f"📂 *Case Ref:* `{case_id}`\n"
                f"📊 *Synthetic Probability:* *{score}* ({verdict})\n"
                f"🧬 *Engine Attribution:* *{engine}*\n\n"
                f"🔐 *SHA-256 Digest:*\n`{sha[:24]}...{sha[-8:]}`\n"
                f"🔗 *IPFS Vault CID:*\n`{cid}`\n\n"
                f"📜 *Legal Status (BNSS Sec 63):*\n"
                f"Court-admissible certificate generated with tamper-evident chain of custody."
            )

            cert_url = f"{API_BASE_URL}/v1/evidence/{case_id}/certificate?format=html"
            inline_keyboard = {
                "inline_keyboard": [
                    [{"text": "📜 View BNSS 63 Certificate", "url": cert_url}],
                    [{"text": "🌐 Inspect IPFS Gateway", "url": data["gateway_url"]}],
                ]
            }

            send_telegram_message(chat_id, card_text, reply_markup=inline_keyboard)
    except Exception as e:
        logger.error(f"API Ingestion error: {e}")
        send_telegram_message(chat_id, f"❌ *Forensic Processing Error*\nCould not reach DeepTrace Core API: {str(e)}")


if __name__ == "__main__":
    print("DeepTrace On-Field Telegram Bot service initialized.")
    print("Configured for handle: @deeptrace_forensic_bot")
    print(f"Target API Endpoint: {API_BASE_URL}/v1/evidence/ingest")
