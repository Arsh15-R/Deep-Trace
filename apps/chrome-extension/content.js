/**
 * DeepTrace Inspector — Content Script & HUD Overlay
 */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DEEPTRACE_AUDIT_STARTED") {
    showToast("🔬 DeepTrace: Analyzing media & sealing SHA-256 hash...", "#2563eb");
  } else if (message.type === "DEEPTRACE_AUDIT_COMPLETE") {
    renderForensicHUD(message.data);
  } else if (message.type === "DEEPTRACE_AUDIT_ERROR") {
    showToast(`❌ DeepTrace Error: ${message.error}`, "#dc2626");
  }
});

function showToast(text, color) {
  let toast = document.getElementById("deeptrace-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "deeptrace-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      padding: 12px 20px;
      border-radius: 8px;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.style.backgroundColor = color;
  toast.innerText = text;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 4000);
}

function renderForensicHUD(data) {
  let hud = document.getElementById("deeptrace-hud");
  if (hud) hud.remove();

  hud = document.createElement("div");
  hud.id = "deeptrace-hud";
  hud.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 360px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 18px;
    z-index: 1000000;
    color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    line-height: 1.4;
  `;

  const isSynthetic = data.synthetic_probability >= 0.65;
  const statusColor = isSynthetic ? "#ef4444" : (data.synthetic_probability >= 0.40 ? "#f59e0b" : "#10b981");

  hud.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 12px;">
      <span style="font-weight: bold; font-size: 14px; letter-spacing: 0.5px;">🔬 DEEPTRACE FORENSICS</span>
      <button id="deeptrace-close-btn" style="background:none; border:none; color:#94a3b8; font-size: 16px; cursor: pointer;">✕</button>
    </div>
    <div style="margin-bottom: 12px;">
      <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; margin-bottom: 2px;">Authenticity Probability</div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px; font-weight: 800; color: ${statusColor};">${data.percentage_score}</span>
        <span style="background: ${statusColor}22; color: ${statusColor}; border: 1px solid ${statusColor}66; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">${data.verdict}</span>
      </div>
    </div>
    <div style="background: #1e293b; padding: 10px; border-radius: 6px; font-size: 12px; margin-bottom: 12px;">
      <div><strong>Engine:</strong> <span style="color: #38bdf8;">${data.attributed_engine}</span></div>
      <div style="margin-top: 4px; font-family: monospace; font-size: 10px; color: #cbd5e1; word-break: break-all;"><strong>SHA-256:</strong> ${data.sha256_hash.substring(0, 20)}...</div>
      <div style="margin-top: 4px; font-family: monospace; font-size: 10px; color: #cbd5e1; word-break: break-all;"><strong>IPFS CID:</strong> ${data.ipfs_cid}</div>
    </div>
    <div style="display: flex; gap: 8px;">
      <a href="http://localhost:8000${data.bnss_certificate_url}" target="_blank" style="flex: 1; text-align: center; background: #2563eb; color: #fff; text-decoration: none; padding: 8px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;">📜 BNSS 63 Certificate</a>
      <a href="${data.gateway_url}" target="_blank" style="flex: 1; text-align: center; background: #334155; color: #f1f5f9; text-decoration: none; padding: 8px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;">🔗 IPFS Vault</a>
    </div>
  `;

  document.body.appendChild(hud);
  document.getElementById("deeptrace-close-btn").addEventListener("click", () => hud.remove());
}
