const MEDIA_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".m3u8",
  ".mpd",
  ".mov",
  ".m4v"
];

const tabMedia = new Map();

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    if (details.tabId < 0 || !isMediaUrl(details.url)) {
      return;
    }

    const item = toMediaItem(details.url);
    const current = tabMedia.get(details.tabId) || [];
    if (!current.some(existing => existing.url === item.url)) {
      current.unshift(item);
      tabMedia.set(details.tabId, current.slice(0, 80));
      updateBadge(details.tabId);
      persistTab(details.tabId);
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.tabs.onRemoved.addListener(tabId => {
  tabMedia.delete(tabId);
  chrome.storage.session.remove(String(tabId));
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "get-media") {
    getActiveTab().then(tab => {
      sendResponse({ media: tabMedia.get(tab.id) || [], tabId: tab.id });
    });
    return true;
  }

  if (message?.type === "clear-media") {
    getActiveTab().then(tab => {
      tabMedia.set(tab.id, []);
      chrome.storage.session.remove(String(tab.id));
      updateBadge(tab.id);
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message?.type === "download-media" && message.url) {
    chrome.downloads.download({
      url: message.url,
      filename: suggestedFilename(message.url),
      saveAs: true
    });
    sendResponse({ ok: true });
  }
});

function isMediaUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const path = url.pathname.toLowerCase();
    return MEDIA_EXTENSIONS.some(ext => path.endsWith(ext));
  } catch {
    return false;
  }
}

function toMediaItem(rawUrl) {
  const url = new URL(rawUrl);
  const extension = url.pathname.split(".").pop()?.toUpperCase() || "MEDIA";
  return {
    url: rawUrl,
    type: extension,
    name: decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || `media.${extension.toLowerCase()}`),
    host: url.hostname,
    detectedAt: Date.now()
  };
}

function suggestedFilename(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || "easy-stream-save-media");
  } catch {
    return "easy-stream-save-media";
  }
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function updateBadge(tabId) {
  const count = tabMedia.get(tabId)?.length || 0;
  chrome.action.setBadgeText({ tabId, text: count ? String(count) : "" });
  chrome.action.setBadgeBackgroundColor({ tabId, color: "#0c8f7a" });
}

function persistTab(tabId) {
  chrome.storage.session.set({ [String(tabId)]: tabMedia.get(tabId) || [] });
}
