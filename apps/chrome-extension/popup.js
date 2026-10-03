const API_BASE_URL = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");
  const verifyBtn = document.getElementById("verify-btn");
  const verifyInput = document.getElementById("verify-input");
  const resultMsg = document.getElementById("result-msg");
  const historyContainer = document.getElementById("history-container");

  // Load history
  chrome.storage.local.get({ auditHistory: [] }, (res) => {
    if (res.auditHistory.length > 0) {
      renderHistory(res.auditHistory);
    }
  });

  dropZone.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showMessage("Ingesting and computing SHA-256 seal...", "#2563eb");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("acquisition_channel", "Inspector Chrome Extension (Direct Upload)");

    try {
      const resp = await fetch(`${API_BASE_URL}/v1/evidence/ingest`, {
        method: "POST",
        body: formData,
      });
      const data = await resp.json();
      showMessage(`Case ${data.case_id}: ${data.percentage_score} (${data.verdict})`, data.synthetic_probability >= 0.65 ? "#dc2626" : "#16a34a");

      // Save to history
      chrome.storage.local.get({ auditHistory: [] }, (res) => {
        const history = res.auditHistory;
        history.unshift(data);
        chrome.storage.local.set({ auditHistory: history.slice(0, 10) });
        renderHistory(history);
      });
    } catch (err) {
      showMessage(`Upload failed: ${err.message}`, "#dc2626");
    }
  });

  verifyBtn.addEventListener("click", async () => {
    const query = verifyInput.value.trim();
    if (!query) return;

    showMessage("Querying IPFS vault & custody ledger...", "#2563eb");
    try {
      const resp = await fetch(`${API_BASE_URL}/v1/evidence/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ipfs_cid: query.startsWith("bafy") ? query : null, sha256_hash: query.length === 64 ? query : null }),
      });
      const data = await resp.json();
      if (data.is_valid) {
        showMessage(`✅ VALID EVIDENCE: Case ${data.case_id} (${data.court_admissibility_status})`, "#16a34a");
      } else {
        showMessage(`❌ UNVERIFIED: No record found for this CID/Hash.`, "#dc2626");
      }
    } catch (err) {
      showMessage(`Verification failed: ${err.message}`, "#dc2626");
    }
  });

  function showMessage(text, bgColor) {
    resultMsg.style.display = "block";
    resultMsg.style.background = bgColor;
    resultMsg.style.color = "#fff";
    resultMsg.innerText = text;
  }

  function renderHistory(items) {
    historyContainer.innerHTML = "";
    items.slice(0, 4).forEach((item) => {
      const el = document.createElement("div");
      el.className = "history-item";
      const isSynth = item.synthetic_probability >= 0.65;
      el.innerHTML = `
        <div>
          <div style="font-weight: 600;">${item.case_id}</div>
          <div style="font-size: 10px; color: #94a3b8;">${item.attributed_engine}</div>
        </div>
        <span class="badge ${isSynth ? "badge-synth" : "badge-auth"}">${item.percentage_score}</span>
      `;
      historyContainer.appendChild(el);
    });
  }
});
