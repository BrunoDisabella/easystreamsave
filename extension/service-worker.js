const MEDIA_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".m3u8",
  ".mpd",
  ".mov",
  ".m4v"
];

const MEDIA_MIME_PREFIXES = [
  "video/",
  "audio/"
];

const MEDIA_MIME_TYPES = [
  "application/vnd.apple.mpegurl",
  "application/x-mpegurl",
  "application/dash+xml"
];

const tabMedia = new Map();
const FREE_DAILY_DOWNLOAD_LIMIT = 5;

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    if (details.tabId < 0 || !isMediaUrl(details.url)) {
      return;
    }

    upsertMediaItem(details.tabId, toMediaItem(details.url));
  },
  { urls: ["<all_urls>"] }
);

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    if (details.tabId < 0 || !isMediaResponse(details.responseHeaders || [])) {
      return;
    }

    upsertMediaItem(details.tabId, toMediaItem(details.url, details.responseHeaders || []));
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
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
    consumeFreeDownload().then(result => {
      if (!result.allowed) {
        sendResponse({ ok: false, reason: "free-limit", limit: FREE_DAILY_DOWNLOAD_LIMIT });
        return;
      }

      chrome.downloads.download({
        url: message.url,
        filename: suggestedFilename(message.url),
        saveAs: true
      });
      sendResponse({ ok: true, remaining: result.remaining });
    });
    return true;
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

function isMediaResponse(headers) {
  const contentType = headers
    .find(header => header.name.toLowerCase() === "content-type")
    ?.value
    ?.toLowerCase()
    .split(";")[0]
    .trim();

  if (!contentType) {
    return false;
  }

  return MEDIA_MIME_PREFIXES.some(prefix => contentType.startsWith(prefix))
    || MEDIA_MIME_TYPES.includes(contentType);
}

function toMediaItem(rawUrl, headers = []) {
  const url = new URL(rawUrl);
  const contentType = headerValue(headers, "content-type");
  const extension = detectExtension(url, contentType);
  const contentLength = Number(headerValue(headers, "content-length") || 0);

  return {
    url: rawUrl,
    type: extension,
    category: detectCategory(extension, contentType),
    size: Number.isFinite(contentLength) && contentLength > 0 ? contentLength : null,
    contentType: contentType || null,
    name: decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || `media.${extension.toLowerCase()}`),
    host: url.hostname,
    detectedAt: Date.now()
  };
}

function upsertMediaItem(tabId, item) {
  const current = tabMedia.get(tabId) || [];
  const index = current.findIndex(existing => existing.url === item.url);

  if (index >= 0) {
    current[index] = { ...current[index], ...item };
  } else {
    current.unshift(item);
  }

  tabMedia.set(tabId, current.slice(0, 80));
  updateBadge(tabId);
  persistTab(tabId);
}

function detectExtension(url, contentType) {
  const fileName = url.pathname.split("/").filter(Boolean).pop() || "";
  const match = fileName.match(/\.([a-z0-9]{2,5})$/i);
  if (match?.[1]) {
    return match[1].toUpperCase();
  }

  const normalizedType = (contentType || "").toLowerCase();
  if (normalizedType.includes("mp4")) {
    return "MP4";
  }
  if (normalizedType.includes("webm")) {
    return "WEBM";
  }
  if (normalizedType.includes("quicktime")) {
    return "MOV";
  }
  if (normalizedType.includes("mpegurl")) {
    return "M3U8";
  }
  if (normalizedType.includes("dash+xml")) {
    return "MPD";
  }
  if (normalizedType.startsWith("audio/")) {
    return "AUDIO";
  }

  return "VIDEO";
}

function detectCategory(extension, contentType) {
  const normalizedType = (contentType || "").toLowerCase();
  if (extension === "M3U8" || extension === "MPD" || normalizedType.includes("mpegurl") || normalizedType.includes("dash+xml")) {
    return "stream";
  }
  if (normalizedType.startsWith("audio/")) {
    return "audio";
  }
  return "video";
}

function headerValue(headers, name) {
  return headers
    .find(header => header.name.toLowerCase() === name)
    ?.value
    ?.split(";")[0]
    ?.trim();
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

async function consumeFreeDownload() {
  const today = new Date().toISOString().slice(0, 10);
  const key = "freeDownloadUsage";
  const stored = await chrome.storage.local.get(key);
  const usage = stored[key]?.date === today
    ? stored[key]
    : { date: today, count: 0 };

  if (usage.count >= FREE_DAILY_DOWNLOAD_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  const next = { date: today, count: usage.count + 1 };
  await chrome.storage.local.set({ [key]: next });
  return {
    allowed: true,
    remaining: Math.max(0, FREE_DAILY_DOWNLOAD_LIMIT - next.count)
  };
}
