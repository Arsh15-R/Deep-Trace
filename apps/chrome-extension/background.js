/**
 * DeepTrace Inspector — Manifest V3 Background Service Worker
 * Intercepts media from browser context menu, extracts origin metadata,
 * and transmits payload to DeepTrace Forensic API.
 */

const API_BASE_URL = "http://localhost:8000";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "deeptrace-inspect-media",
    title: "🔬 DeepTrace: Audit Media (BNSS Sec 63)",
    contexts: ["image", "video", "audio"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "deeptrace-inspect-media") {
    const mediaUrl = info.srcUrl;
    if (!mediaUrl) return;

    // Notify tab of audit start
    chrome.tabs.sendMessage(tab.id, {
      type: "DEEPTRACE_AUDIT_STARTED",
      url: mediaUrl
    }).catch(() => {});

    try {
      // 1. Fetch raw media binary directly from source
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const filename = mediaUrl.split("/").pop().split("?")[0] || "web_evidence.bin";

      // 2. Build form data for legal custody ingestion
      const formData = new FormData();
      formData.append("file", blob, filename);
      formData.append("officer_name", "Cyber Intelligence Analyst");
      formData.append("officer_badge", "OSINT-EXT-V3");
      formData.append("department", "Digital Crime Surveillance Unit");
      formData.append("acquisition_channel", `Web Inspector (Source: ${new URL(tab.url).hostname})`);

      // 3. Post to DeepTrace API
      const apiResp = await fetch(`${API_BASE_URL}/v1/evidence/ingest`, {
        method: "POST",
        body: formData
      });

      if (!apiResp.ok) {
        throw new Error(`API returned status ${apiResp.status}`);
      }

      const forensicData = await apiResp.json();

      // Store in extension local history
      chrome.storage.local.get({ auditHistory: [] }, (res) => {
        const history = res.auditHistory;
        history.unshift(forensicData);
        chrome.storage.local.set({ auditHistory: history.slice(0, 20) });
      });

      // 4. Send forensic result to active tab for overlay display
      chrome.tabs.sendMessage(tab.id, {
        type: "DEEPTRACE_AUDIT_COMPLETE",
        data: forensicData
      }).catch(() => {});

    } catch (err) {
      chrome.tabs.sendMessage(tab.id, {
        type: "DEEPTRACE_AUDIT_ERROR",
        error: err.message
      }).catch(() => {});
    }
  }
});
