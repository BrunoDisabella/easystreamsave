const MEDIA_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".m3u8",
  ".mpd",
  ".mov",
  ".m4v"
];

const MEDIA_MIME_PREFIXES = [
  "video/"
];

const MEDIA_MIME_TYPES = [
  "application/vnd.apple.mpegurl",
  "application/x-mpegurl",
  "audio/mpegurl",
  "application/dash+xml"
];

const tabMedia = new Map();
const FREE_DOWNLOAD_LIMIT = 10;
const FREE_RESET_WINDOW_MS = 30 * 60 * 1000;
const DOWNLOADABLE_PROTOCOLS = new Set(["http:", "https:"]);
const MIN_VIDEO_BYTES = 1024 * 1024;
const MAX_HLS_SEGMENTS = 180;

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    if (details.tabId < 0 || details.type !== "media" || !isMediaUrl(details.url)) {
      return;
    }

    const provisional = toMediaItem(details.url);
    if (isStreamItem(provisional)) {
      upsertMediaItem(details.tabId, provisional);
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    if (details.tabId < 0 || !isMediaCandidate(details)) {
      return;
    }

    const item = toMediaItem(details.url, details.responseHeaders || []);
    if (isUsefulMediaItem(item)) {
      upsertMediaItem(details.tabId, item);
    } else {
      removeMediaItem(details.tabId, item);
    }
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
      getTabMedia(tab.id).then(media => {
        sendResponse({ media, tabId: tab.id });
      });
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

  if (message?.type === "page-media" && sender.tab?.id >= 0 && Array.isArray(message.media)) {
    for (const item of message.media) {
      upsertMediaItem(sender.tab.id, normalizePageMediaItem(item));
    }
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type === "download-media" && message.url) {
    const url = downloadableUrl(message.url);
    if (!url) {
      sendResponse({ ok: false, reason: "not-downloadable" });
      return false;
    }

    getActiveTab().then(tab => getKnownMediaItem(tab.id, url)).then(knownItem => {
      return validateDownload(url, message.format || "mp4", knownItem).then(validation => ({ validation, knownItem }));
    }).then(({ validation, knownItem }) => {
      if (!validation.ok) {
        sendResponse({
          ok: false,
          reason: validation.reason,
          contentType: validation.contentType || null
        });
        return;
      }

      return consumeFreeDownload().then(result => {
        if (!result.allowed) {
          sendResponse({
            ok: false,
            reason: "free-limit",
            limit: FREE_DOWNLOAD_LIMIT,
            resetAt: result.resetAt
          });
          return;
        }

        if (validation.isHlsDownload) {
          downloadHlsStream(url, knownItem, message.format || "original").then(downloadId => {
            sendResponse({ ok: true, remaining: result.remaining, downloadId });
          }).catch(error => {
            sendResponse({
              ok: false,
              reason: error?.reason || "download-failed",
              error: error?.message || "Could not download this HLS stream"
            });
          });
          return;
        }

        const filename = suggestedFilename(url, message.format || "mp4", validation.contentType);
        const options = {
          url,
          filename,
          saveAs: true
        };
        chrome.downloads.download(options, downloadId => {
          if (chrome.runtime.lastError || !downloadId) {
            sendResponse({
              ok: false,
              reason: "download-failed",
              error: chrome.runtime.lastError?.message || "Chrome rejected the download"
            });
            return;
          }

          sendResponse({ ok: true, remaining: result.remaining, downloadId });
        });
      });
    }).catch(error => {
      sendResponse({
        ok: false,
        reason: "download-failed",
        error: error?.message || "Could not validate this video URL"
      });
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

function isMediaCandidate(details) {
  const headers = details.responseHeaders || [];
  if (isMediaResponse(headers)) {
    return true;
  }

  return details.type === "media" && isMediaUrl(details.url);
}

function toMediaItem(rawUrl, headers = []) {
  const contentType = headerValue(headers, "content-type");
  const contentLength = Number(headerValue(headers, "content-length") || contentRangeTotal(headers) || 0);
  const normalizedUrl = normalizeSegmentedVideoUrl(rawUrl, contentType, contentLength);
  const url = new URL(normalizedUrl);
  const extension = detectExtension(url, contentType);

  return {
    url: normalizedUrl,
    type: extension,
    category: detectCategory(extension, contentType),
    size: Number.isFinite(contentLength) && contentLength > 0 ? contentLength : null,
    contentType: contentType || null,
    name: decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || `media.${extension.toLowerCase()}`),
    host: url.hostname,
    source: "network",
    trusted: Boolean(contentType),
    score: contentLength || 0,
    detectedAt: Date.now()
  };
}

function normalizePageMediaItem(item) {
  let host = item.host || "current tab";
  const url = downloadableUrl(item.url);
  const previewUrl = item.previewUrl || item.posterUrl || item.url;

  try {
    host = new URL(url || previewUrl).hostname || host;
  } catch {
    // Blob URLs and restricted URLs can fail URL hostname parsing.
  }

  return {
    url,
    previewUrl,
    posterUrl: item.posterUrl || null,
    type: item.type || "VIDEO",
    category: item.category || "video",
    size: null,
    contentType: item.contentType || null,
    name: item.name || chrome.i18n.getMessage("pageVideoName") || "Page video",
    host,
    quality: item.quality || null,
    source: item.source || "page-video",
    score: item.posterUrl ? 1 : 0,
    detectedAt: Date.now()
  };
}

function upsertMediaItem(tabId, item) {
  if (!item || !isUsefulMediaItem(item)) {
    return;
  }

  const current = tabMedia.get(tabId) || [];
  const previewItem = bestPreviewItem(current);
  if (item.source === "network" && previewItem) {
    item.previewUrl = item.previewUrl || previewItem.previewUrl || previewItem.posterUrl;
    item.posterUrl = item.posterUrl || previewItem.posterUrl;
    item.name = item.name && item.name !== "media.video" ? item.name : previewItem.name;
    item.quality = item.quality || previewItem.quality;
  }

  if ((item.posterUrl || item.previewUrl) && item.host) {
    for (const existing of current) {
      if (existing.source === "network" && sameRegistrableHost(existing.host, item.host)) {
        existing.previewUrl = existing.previewUrl || item.previewUrl || item.posterUrl;
        existing.posterUrl = existing.posterUrl || item.posterUrl;
        existing.name = existing.name || item.name;
        existing.quality = existing.quality || item.quality;
      }
    }
  }

  const visualDuplicateIndex = findVisualDuplicateIndex(current, item);
  const index = visualDuplicateIndex >= 0
    ? visualDuplicateIndex
    : current.findIndex(existing => mediaKey(existing) === mediaKey(item));

  if (index >= 0) {
    current[index] = betterMediaItem(current[index], item);
  } else {
    current.unshift(item);
  }

  tabMedia.set(tabId, current.sort(mediaSort).slice(0, 25));
  updateBadge(tabId);
  persistTab(tabId);
}

function bestPreviewItem(items) {
  return items.find(item => item.posterUrl || item.previewUrl) || null;
}

function sameRegistrableHost(a, b) {
  const left = String(a || "").split(".").slice(-2).join(".");
  const right = String(b || "").split(".").slice(-2).join(".");
  return Boolean(left && right && left === right);
}

function findVisualDuplicateIndex(items, item) {
  const visualKey = item.posterUrl || item.previewUrl;
  if (!visualKey || item.category !== "video") {
    return -1;
  }

  return items.findIndex(existing => {
    const existingKey = existing.posterUrl || existing.previewUrl;
    return existing.category === "video"
      && existingKey === visualKey
      && sameRegistrableHost(existing.host, item.host);
  });
}

function mediaKey(item) {
  if (item.url) {
    return normalizedMediaUrl(item.url);
  }
  return item.previewUrl || `${item.host}:${item.name}`;
}

function downloadableUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return DOWNLOADABLE_PROTOCOLS.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
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
  return "VIDEO";
}

function detectCategory(extension, contentType) {
  const normalizedType = (contentType || "").toLowerCase();
  if (extension === "M3U8" || extension === "MPD" || normalizedType.includes("mpegurl") || normalizedType.includes("dash+xml")) {
    return "stream";
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

function contentRangeTotal(headers) {
  const value = headerValue(headers, "content-range") || "";
  return value.match(/\/(\d+)$/)?.[1] || "";
}

function normalizeSegmentedVideoUrl(rawUrl, contentType = "", contentLength = 0) {
  try {
    const url = new URL(rawUrl);
    const normalizedType = String(contentType || "").toLowerCase();
    const pathType = detectExtension(url, normalizedType);
    const looksLikeVideo = normalizedType.startsWith("video/")
      || ["MP4", "WEBM", "MOV", "M4V", "VIDEO"].includes(pathType);

    if (!looksLikeVideo || Number(contentLength || 0) < MIN_VIDEO_BYTES) {
      return rawUrl;
    }

    // Some CDNs expose the same video as many byte-range URLs. Keeping the
    // range token makes the popup show fragments and can download a tiny file.
    const rangeParams = [
      "range",
      "bytestart",
      "byteend",
      "start",
      "end"
    ];
    for (const param of rangeParams) {
      url.searchParams.delete(param);
    }
    return url.href;
  } catch {
    return rawUrl;
  }
}

function suggestedFilename(rawUrl, preferredFormat = "mp4", contentType = "") {
  try {
    const url = new URL(rawUrl);
    const rawName = decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || "easy-stream-save-media");
    const safeName = rawName.replace(/[\\/:*?"<>|]+/g, "-").slice(0, 80) || "easy-stream-save-media";
    const extension = extensionForDownload(preferredFormat, contentType, safeName);
    const withoutExtension = safeName.replace(/\.[a-z0-9]{2,5}$/i, "");
    if (preferredFormat === "original" && /\.[a-z0-9]{2,5}$/i.test(safeName)) {
      return safeName;
    }
    return `${withoutExtension}.${extension}`;
  } catch {
    return `easy-stream-save-media.${preferredFormat === "original" ? "mp4" : preferredFormat}`;
  }
}

function extensionForDownload(preferredFormat, contentType, currentName) {
  const normalizedType = String(contentType || "").toLowerCase();
  if (normalizedType.includes("mp4")) {
    return "mp4";
  }
  if (normalizedType.includes("webm")) {
    return "webm";
  }
  if (normalizedType.includes("quicktime")) {
    return "mov";
  }
  if (normalizedType.includes("mpegurl")) {
    return "m3u8";
  }
  if (normalizedType.includes("dash+xml")) {
    return "mpd";
  }
  if (normalizedType.includes("mp2t")) {
    return "ts";
  }

  const current = currentName.match(/\.([a-z0-9]{2,5})$/i)?.[1];
  if (current) {
    return current;
  }
  return preferredFormat && preferredFormat !== "original" ? preferredFormat : "mp4";
}

function isUsefulMediaItem(item) {
  if (!item) {
    return false;
  }

  if (isStreamItem(item)) {
    return Boolean(item.url);
  }

  if (item.category !== "video") {
    return false;
  }

  if (item.source === "page-video"
    || item.source === "page-preview"
    || item.source === "page-structured"
    || item.source === "adapter-tiktok"
    || item.source === "adapter-facebook") {
    if (!item.url) {
      return Boolean(item.previewUrl || item.posterUrl);
    }

    return Boolean(downloadableUrl(item.url) || item.previewUrl || item.posterUrl);
  }

  return Boolean(item.size && item.size >= MIN_VIDEO_BYTES);
}

function isStreamItem(item) {
  const type = String(item?.type || "").toUpperCase();
  return item?.category === "stream" || type === "M3U8" || type === "MPD";
}

function removeMediaItem(tabId, item) {
  if (!item) {
    return;
  }

  const current = tabMedia.get(tabId) || [];
  const next = current.filter(existing => mediaKey(existing) !== mediaKey(item));
  if (next.length === current.length) {
    return;
  }

  tabMedia.set(tabId, next);
  updateBadge(tabId);
  persistTab(tabId);
}

function betterMediaItem(existing, incoming) {
  const merged = { ...existing, ...incoming };
  if (existing.posterUrl && !incoming.posterUrl) {
    merged.posterUrl = existing.posterUrl;
  }
  if (existing.previewUrl && !incoming.previewUrl) {
    merged.previewUrl = existing.previewUrl;
  }
  if ((existing.size || 0) > (incoming.size || 0)) {
    merged.size = existing.size;
  }
  merged.score = Math.max(existing.score || 0, incoming.score || 0, merged.size || 0);
  return merged;
}

function mediaSort(a, b) {
  const previewDelta = Number(Boolean(b.posterUrl || b.previewUrl)) - Number(Boolean(a.posterUrl || a.previewUrl));
  if (previewDelta) {
    return previewDelta;
  }
  return (b.score || b.size || 0) - (a.score || a.size || 0);
}

function normalizedMediaUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return `${url.origin}${url.pathname}`;
  } catch {
    return rawUrl;
  }
}

async function validateDownload(rawUrl, preferredFormat, knownItem = null) {
  const knownType = String(knownItem?.contentType || "").split(";")[0].trim().toLowerCase();
  const knownSize = Number(knownItem?.size || 0);
  const knownPathType = detectExtension(new URL(rawUrl), knownType);
  const knownStream = ["M3U8", "MPD"].includes(knownPathType) || knownItem?.category === "stream";

  if (knownItem?.trusted && (knownType.startsWith("video/") || MEDIA_MIME_TYPES.includes(knownType))) {
    if (preferredFormat === "mp4" && knownStream) {
      return { ok: false, reason: "stream-needs-original", contentType: knownType };
    }

    if (!knownStream && knownSize && knownSize < MIN_VIDEO_BYTES) {
      return { ok: false, reason: "too-small", contentType: knownType, contentLength: knownSize };
    }

    return { ok: true, contentType: knownType, isHlsDownload: knownStream && knownPathType === "M3U8" };
  }

  const response = await fetchVideoHeaders(rawUrl);
  const contentType = response.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() || "";
  const contentLength = detectedResponseSize(response);
  const pathType = detectExtension(new URL(rawUrl), contentType);
  const inferredVideo = ["MP4", "WEBM", "MOV", "M4V"].includes(pathType);
  const inferredStream = ["M3U8", "MPD"].includes(pathType);
  const genericBinary = ["application/octet-stream", "binary/octet-stream"].includes(contentType);

  if (!response.ok && response.status !== 206) {
    return { ok: false, reason: "download-failed", contentType, status: response.status };
  }

  if (!contentType.startsWith("video/")
    && !MEDIA_MIME_TYPES.includes(contentType)
    && !(genericBinary && (inferredVideo || inferredStream))
    && !inferredVideo
    && !inferredStream) {
    return { ok: false, reason: "not-video-response", contentType };
  }

  if (preferredFormat === "mp4" && (contentType.includes("mpegurl") || inferredStream)) {
    return { ok: false, reason: "stream-needs-original", contentType };
  }

  if (!inferredStream && contentLength && contentLength < MIN_VIDEO_BYTES) {
    return { ok: false, reason: "too-small", contentType, contentLength };
  }

  return { ok: true, contentType, isHlsDownload: inferredStream && pathType === "M3U8" };
}

async function downloadHlsStream(rawUrl, knownItem = null, preferredFormat = "original") {
  const playlistResponse = await fetch(rawUrl, {
    credentials: "include",
    cache: "no-store"
  });

  if (!playlistResponse.ok) {
    throw Object.assign(new Error(`Playlist failed with HTTP ${playlistResponse.status}`), { reason: "download-failed" });
  }

  const playlistUrl = playlistResponse.url || rawUrl;
  const playlistText = await playlistResponse.text();
  if (/#EXT-X-KEY/i.test(playlistText)) {
    throw Object.assign(new Error("Encrypted HLS is not supported"), { reason: "encrypted-hls" });
  }

  const variantUrl = bestHlsVariantUrl(playlistText, playlistUrl);
  if (variantUrl) {
    return downloadHlsStream(variantUrl, knownItem, preferredFormat);
  }

  const segmentUrls = hlsSegmentUrls(playlistText, playlistUrl);
  if (!segmentUrls.length) {
    throw Object.assign(new Error("No HLS segments found"), { reason: "download-failed" });
  }
  if (segmentUrls.length > MAX_HLS_SEGMENTS) {
    throw Object.assign(new Error(`Too many HLS segments (${segmentUrls.length})`), { reason: "too-many-segments" });
  }

  const buffers = [];
  for (const segmentUrl of segmentUrls) {
    const segmentResponse = await fetch(segmentUrl, {
      credentials: "include",
      cache: "no-store"
    });
    if (!segmentResponse.ok) {
      throw Object.assign(new Error(`Segment failed with HTTP ${segmentResponse.status}`), { reason: "download-failed" });
    }
    buffers.push(await segmentResponse.arrayBuffer());
  }

  const blob = new Blob(buffers, { type: "video/mp2t" });
  const objectUrl = URL.createObjectURL(blob);
  const filename = suggestedFilename(rawUrl, preferredFormat, "video/mp2t").replace(/\.[a-z0-9]{2,5}$/i, ".ts");

  return new Promise((resolve, reject) => {
    chrome.downloads.download({ url: objectUrl, filename, saveAs: true }, downloadId => {
      setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
      if (chrome.runtime.lastError || !downloadId) {
        reject(Object.assign(new Error(chrome.runtime.lastError?.message || "Chrome rejected the HLS download"), { reason: "download-failed" }));
        return;
      }
      resolve(downloadId);
    });
  });
}

function bestHlsVariantUrl(playlistText, playlistUrl) {
  const lines = playlistText.split(/\r?\n/);
  let best = null;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith("#EXT-X-STREAM-INF")) {
      continue;
    }
    const bandwidth = Number(line.match(/BANDWIDTH=(\d+)/i)?.[1] || 0);
    const next = nextHlsUri(lines, index + 1);
    if (next && (!best || bandwidth > best.bandwidth)) {
      best = { bandwidth, url: new URL(next, playlistUrl).href };
    }
  }
  return best?.url || null;
}

function hlsSegmentUrls(playlistText, playlistUrl) {
  return playlistText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .filter(line => !/^data:/i.test(line))
    .map(line => new URL(line, playlistUrl).href);
}

function nextHlsUri(lines, startIndex) {
  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line && !line.startsWith("#")) {
      return line;
    }
  }
  return null;
}

async function getKnownMediaItem(tabId, rawUrl) {
  const key = normalizedMediaUrl(rawUrl);
  const media = await getTabMedia(tabId);
  return media.find(item => normalizedMediaUrl(item.url) === key) || null;
}

function detectedResponseSize(response) {
  const contentRange = response.headers.get("content-range") || "";
  const rangeTotal = contentRange.match(/\/(\d+)$/)?.[1];
  if (rangeTotal) {
    return Number(rangeTotal);
  }

  const contentLength = response.headers.get("content-length");
  return contentLength ? Number(contentLength) : null;
}

async function fetchVideoHeaders(rawUrl) {
  let response = await fetch(rawUrl, {
    method: "HEAD",
    credentials: "include",
    cache: "no-store"
  });

  if (response.ok && response.headers.get("content-type")) {
    return response;
  }

  response = await fetch(rawUrl, {
    method: "GET",
    headers: { Range: "bytes=0-0" },
    credentials: "include",
    cache: "no-store"
  });

  return response;
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getTabMedia(tabId) {
  const memory = tabMedia.get(tabId);
  if (memory?.length) {
    return memory;
  }

  const stored = await chrome.storage.session.get(String(tabId));
  const media = Array.isArray(stored[String(tabId)])
    ? stored[String(tabId)].filter(isUsefulMediaItem).sort(mediaSort).slice(0, 25)
    : [];
  if (media.length) {
    tabMedia.set(tabId, media);
  }
  return media;
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
  const key = "freeDownloadUsage";
  const stored = await chrome.storage.local.get(key);
  const now = Date.now();
  const usage = stored[key]?.resetAt > now
    ? stored[key]
    : { count: 0, resetAt: now + FREE_RESET_WINDOW_MS };

  if (usage.count >= FREE_DOWNLOAD_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: usage.resetAt };
  }

  const next = { count: usage.count + 1, resetAt: usage.resetAt };
  await chrome.storage.local.set({ [key]: next });
  return {
    allowed: true,
    remaining: Math.max(0, FREE_DOWNLOAD_LIMIT - next.count),
    resetAt: next.resetAt
  };
}
