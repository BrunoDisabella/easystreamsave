const SCAN_DELAY_MS = 800;
let scanTimer = null;

scanVideos();

document.addEventListener("play", scanVideos, true);
document.addEventListener("loadedmetadata", scanVideos, true);
document.addEventListener("loadeddata", scanVideos, true);

new MutationObserver(scheduleScan).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["src", "poster"]
});

function scheduleScan() {
  clearTimeout(scanTimer);
  scanTimer = setTimeout(scanVideos, SCAN_DELAY_MS);
}

function scanVideos() {
  const items = [
    ...Array.from(document.querySelectorAll("video")).map(videoToMediaItem),
    ...scanStructuredMedia(),
    ...scanSiteSpecificMedia()
  ].filter(Boolean);

  if (!items.length) {
    return;
  }

  chrome.runtime.sendMessage({ type: "page-media", media: items }).catch(() => {});
}

function videoToMediaItem(video) {
  const sourceElements = Array.from(video.querySelectorAll("source"));
  const sourceUrl = firstUrl([
    video.currentSrc,
    video.src,
    ...sourceElements.map(source => source.src)
  ], { allowBlob: false });

  const blobPreviewUrl = firstUrl([
    video.currentSrc,
    video.src
  ], { allowBlob: true });

  const poster = firstUrl([
    video.poster,
    video.getAttribute("poster"),
    metaContent("property", "og:image"),
    metaContent("name", "twitter:image")
  ], { allowBlob: false });

  if (!sourceUrl && !poster && !blobPreviewUrl) {
    return null;
  }

  const quality = detectQuality(video);
  const name = document.title?.trim() || "Page video";
  const type = detectType(sourceUrl);

  return {
    url: sourceUrl,
    previewUrl: poster || blobPreviewUrl || sourceUrl,
    posterUrl: poster || null,
    type,
    category: type === "M3U8" || type === "MPD" ? "stream" : "video",
    size: null,
    contentType: detectSourceContentType(sourceElements, sourceUrl),
    name,
    host: location.hostname,
    quality,
    source: sourceUrl ? "page-video" : "page-preview",
    detectedAt: Date.now()
  };
}

function firstUrl(values, options = {}) {
  const allowBlob = Boolean(options.allowBlob);

  for (const value of values) {
    if (!value) {
      continue;
    }

    try {
      const url = new URL(value, location.href);
      if (url.protocol === "http:" || url.protocol === "https:" || (allowBlob && url.protocol === "blob:")) {
        return url.href;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function detectType(rawUrl) {
  if (!rawUrl) {
    return "VIDEO";
  }

  try {
    const path = new URL(rawUrl).pathname.toLowerCase();
    const match = path.match(/\.([a-z0-9]{2,5})$/);
    return match?.[1] ? match[1].toUpperCase() : "VIDEO";
  } catch {
    return "VIDEO";
  }
}

function detectSourceContentType(sourceElements, sourceUrl) {
  const matchingSource = sourceElements.find(source => {
    try {
      return new URL(source.src, location.href).href === sourceUrl;
    } catch {
      return false;
    }
  });

  return matchingSource?.type || null;
}

function detectQuality(video) {
  const height = Number(video.videoHeight || 0);
  if (height >= 2160) {
    return "4K";
  }
  if (height >= 1080) {
    return "1080p";
  }
  if (height >= 720) {
    return "720p";
  }
  if (height > 0) {
    return `${height}p`;
  }
  return null;
}

function metaContent(attribute, value) {
  return document.querySelector(`meta[${attribute}="${value}"]`)?.content || "";
}

function scanStructuredMedia() {
  const candidates = [
    metaContent("property", "og:video"),
    metaContent("property", "og:video:url"),
    metaContent("property", "og:video:secure_url"),
    metaContent("name", "twitter:player:stream"),
    ...Array.from(document.querySelectorAll("link[as='video'], link[type^='video/'], a[href]"))
      .map(element => element.href)
  ];

  return candidates
    .map(rawUrl => firstUrl([rawUrl], { allowBlob: false }))
    .filter(Boolean)
    .filter(isLikelyMediaUrl)
    .slice(0, 12)
    .map(url => ({
      url,
      previewUrl: firstUrl([
        metaContent("property", "og:image"),
        metaContent("name", "twitter:image")
      ], { allowBlob: false }) || url,
      posterUrl: firstUrl([
        metaContent("property", "og:image"),
        metaContent("name", "twitter:image")
      ], { allowBlob: false }),
      type: detectType(url),
      category: ["M3U8", "MPD"].includes(detectType(url)) ? "stream" : "video",
      size: null,
      contentType: null,
      name: document.title?.trim() || "Page video",
      host: location.hostname,
      quality: null,
      source: "page-structured",
      detectedAt: Date.now()
    }));
}

function isLikelyMediaUrl(rawUrl) {
  try {
    const url = new URL(rawUrl, location.href);
    return /\.(mp4|webm|m3u8|mpd|mov|m4v)(?:$|[?#])/i.test(url.href)
      || /video|playback|stream|manifest/i.test(url.href);
  } catch {
    return false;
  }
}

function scanSiteSpecificMedia() {
  if (location.hostname.endsWith("tiktok.com")) {
    return scanTikTokMedia();
  }

  if (location.hostname.endsWith("facebook.com") || location.hostname.endsWith("fb.watch")) {
    return scanFacebookMedia();
  }

  return [];
}

function scanTikTokMedia() {
  const poster = firstUrl([
    metaContent("property", "og:image"),
    metaContent("name", "twitter:image"),
    ...Array.from(document.querySelectorAll("img[src*='tiktok'], picture img")).map(image => image.src)
  ], { allowBlob: false });

  const candidates = extractJsonLikeUrls(document.documentElement.innerHTML)
    .filter(url => /tiktok|byteoversea|ibyteimg|muscdn|playwm|playAddr|downloadAddr/i.test(url))
    .filter(isLikelyMediaUrl);

  return unique(candidates).slice(0, 12).map(url => siteMediaItem(url, poster, "TikTok video", "adapter-tiktok"));
}

function scanFacebookMedia() {
  const poster = firstUrl([
    metaContent("property", "og:image"),
    metaContent("name", "twitter:image"),
    ...Array.from(document.querySelectorAll("video[poster], img[src*='scontent']")).map(element => element.poster || element.src)
  ], { allowBlob: false });

  const candidates = extractJsonLikeUrls(document.documentElement.innerHTML)
    .filter(url => /fbcdn|scontent|facebook/i.test(url))
    .filter(url => /video|mp4|playback|m3u8|dash/i.test(url));

  return unique(candidates).slice(0, 16).map(url => siteMediaItem(url, poster, "Facebook video", "adapter-facebook"));
}

function siteMediaItem(url, poster, name, source) {
  const type = detectType(url);
  return {
    url,
    previewUrl: poster || url,
    posterUrl: poster || null,
    type,
    category: ["M3U8", "MPD"].includes(type) ? "stream" : "video",
    size: null,
    contentType: null,
    name,
    host: location.hostname,
    quality: null,
    source,
    detectedAt: Date.now()
  };
}

function extractJsonLikeUrls(text) {
  const urls = new Set();
  const patterns = [
    /https?:\\\/\\\/[^"'\\\s<>{}]+/g,
    /https?:\/\/[^"'\s<>{}]+/g
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const cleaned = decodeEscapedUrl(match[0]);
      if (cleaned) {
        urls.add(cleaned);
      }
    }
  }

  return [...urls];
}

function decodeEscapedUrl(value) {
  try {
    const unescaped = value
      .replace(/\\u002F/g, "/")
      .replace(/\\\//g, "/")
      .replace(/&amp;/g, "&");
    return new URL(unescaped, location.href).href;
  } catch {
    return null;
  }
}

function unique(values) {
  return [...new Set(values)];
}
