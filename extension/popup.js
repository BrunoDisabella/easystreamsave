const mediaList = document.getElementById("mediaList");
const emptyState = document.getElementById("emptyState");
const summary = document.getElementById("summary");
const refreshButton = document.getElementById("refreshButton");
const clearButton = document.getElementById("clearButton");
const proNotice = document.getElementById("proNotice");
const languageSelect = document.getElementById("languageSelect");
const formatSelect = document.getElementById("formatSelect");

const I18N = {
  en: {
    htmlLang: "en",
    summaryScanning: "Scanning this tab",
    summaryOne: "1 media source detected",
    summaryMany: count => `${count} media sources detected`,
    noticeTitle: "YouTube downloads are not supported",
    noticeBody: "Chrome Web Store rules and protected streams can block some videos.",
    proTitle: "Free limit reached",
    proBody: "Free resets after 30 minutes. Pro Starter is planned at USD 1.99/month for unlimited downloads and advanced formats when available.",
    emptyTitle: "No media detected yet",
    emptyBody: "Play the video or refresh the page, then check again.",
    refresh: "Refresh",
    clear: "Clear",
    languageLabel: "Language",
    formatLabel: "Format",
    mediaFile: "Media file",
    pageVideo: "Page video",
    download: "Download",
    playPreview: "Play preview",
    noDownloadUrl: "No direct downloadable file was found for this preview",
    noDirectUrlTitle: "This preview has no direct downloadable video URL yet. Play the video for a few seconds and refresh.",
    notVideoResponse: contentType => `This URL responded as ${contentType || "non-video"}, not a video file`,
    streamNeedsOriginal: "This stream is HLS/M3U8. Choose Original/M3U8 instead of MP4.",
    tooSmall: "This source looks like a tiny fragment, not the full video.",
    encryptedHls: "This HLS stream is encrypted and cannot be downloaded by the extension.",
    tooManySegments: "This HLS stream has too many segments for the current downloader.",
    downloadFailed: error => `Download failed: ${error}`,
    freeLeft: remaining => `${remaining} free downloads left in this 30 min window`,
    freeLimitGeneric: "Free download limit reached",
    freeLimitReset: reset => `Free limit reached. Resets in ${reset}`,
    oneMinute: "1 minute",
    minutes: minutes => `${minutes} minutes`
  },
  es: {
    htmlLang: "es",
    summaryScanning: "Analizando esta pestana",
    summaryOne: "1 fuente de video detectada",
    summaryMany: count => `${count} fuentes de video detectadas`,
    noticeTitle: "Las descargas de YouTube no estan soportadas",
    noticeBody: "Las reglas de Chrome Web Store y los videos protegidos pueden bloquear algunas descargas.",
    proTitle: "Limite Free alcanzado",
    proBody: "Free se restablece despues de 30 minutos. Pro Starter esta planificado a USD 1.99/mes para descargas ilimitadas y formatos avanzados cuando esten disponibles.",
    emptyTitle: "Todavia no se detectaron videos",
    emptyBody: "Reproduce el video o actualiza la pagina, despues revisa de nuevo.",
    refresh: "Actualizar",
    clear: "Limpiar",
    languageLabel: "Idioma",
    formatLabel: "Formato",
    mediaFile: "Archivo de video",
    pageVideo: "Video de la pagina",
    download: "Descargar",
    playPreview: "Reproducir vista previa",
    noDownloadUrl: "No se encontro un archivo directo descargable para esta vista previa",
    noDirectUrlTitle: "Esta vista previa todavia no tiene URL directa descargable. Reproduce el video unos segundos y actualiza.",
    notVideoResponse: contentType => `Esta URL respondio como ${contentType || "no-video"}, no como archivo de video`,
    streamNeedsOriginal: "Este stream es HLS/M3U8. Elegi Original/M3U8 en vez de MP4.",
    tooSmall: "Esta fuente parece un fragmento chico, no el video completo.",
    encryptedHls: "Este HLS esta cifrado y la extension no lo puede descargar.",
    tooManySegments: "Este HLS tiene demasiados segmentos para el descargador actual.",
    downloadFailed: error => `La descarga fallo: ${error}`,
    freeLeft: remaining => `${remaining} descargas Free restantes en esta ventana de 30 min`,
    freeLimitGeneric: "Limite de descargas Free alcanzado",
    freeLimitReset: reset => `Limite Free alcanzado. Se restablece en ${reset}`,
    oneMinute: "1 minuto",
    minutes: minutes => `${minutes} minutos`
  }
};

let currentLanguage = "en";
let t = I18N.en;
let preferredFormat = "mp4";

refreshButton.addEventListener("click", loadMedia);
clearButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "clear-media" }, loadMedia);
});

languageSelect.addEventListener("change", () => {
  setLanguage(languageSelect.value);
  chrome.storage.local.set({ preferredLanguage: currentLanguage });
  loadMedia();
});

formatSelect.addEventListener("change", () => {
  preferredFormat = formatSelect.value || "mp4";
  chrome.storage.local.set({ preferredFormat });
  loadMedia();
});

init();

async function init() {
  const stored = await chrome.storage.local.get(["preferredLanguage", "preferredFormat"]);
  const browserLanguage = chrome.i18n?.getUILanguage?.().toLowerCase().startsWith("es") ? "es" : "en";
  preferredFormat = stored.preferredFormat || "mp4";
  formatSelect.value = preferredFormat;
  setLanguage(stored.preferredLanguage || browserLanguage);
  loadMedia();
}

function setLanguage(language) {
  currentLanguage = I18N[language] ? language : "en";
  t = I18N[currentLanguage];
  document.documentElement.lang = t.htmlLang;
  languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (typeof t[key] === "string") {
      element.textContent = t[key];
    }
  });
}

function loadMedia() {
  chrome.runtime.sendMessage({ type: "get-media" }, response => {
    const media = response?.media || [];
    render(media);
  });
}

function render(media) {
  mediaList.textContent = "";
  emptyState.style.display = media.length ? "none" : "flex";
  summary.textContent = media.length === 1 ? t.summaryOne : t.summaryMany(media.length);

  for (const item of sortByFormat(media, preferredFormat)) {
    const row = document.createElement("article");
    row.className = "media-item";

    const preview = createPreview(item);

    const type = document.createElement("span");
    type.className = "type";
    type.textContent = item.type || "MEDIA";

    const details = document.createElement("div");
    details.className = "details";

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = item.name || t.mediaFile;

    const meta = document.createElement("span");
    meta.className = "host";
    meta.textContent = [item.quality, formatSize(item.size), item.host].filter(Boolean).join(" - ");

    const actions = document.createElement("div");
    actions.className = "actions";
    const actionUrl = bestActionUrl(item);

    const downloadButton = document.createElement("button");
    downloadButton.className = "download";
    downloadButton.type = "button";
    downloadButton.textContent = t.download;
    downloadButton.title = isDownloadable(actionUrl) ? t.download : t.noDirectUrlTitle;
    downloadButton.disabled = !isDownloadable(actionUrl);
    downloadButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "download-media", url: actionUrl, format: preferredFormat }, response => {
        if (response?.reason === "not-downloadable") {
          summary.textContent = t.noDownloadUrl;
          return;
        }

        if (response?.reason === "not-video-response") {
          summary.textContent = t.notVideoResponse(response.contentType);
          return;
        }

        if (response?.reason === "stream-needs-original") {
          summary.textContent = t.streamNeedsOriginal;
          return;
        }

        if (response?.reason === "too-small") {
          summary.textContent = t.tooSmall;
          return;
        }

        if (response?.reason === "encrypted-hls") {
          summary.textContent = t.encryptedHls;
          return;
        }

        if (response?.reason === "too-many-segments") {
          summary.textContent = t.tooManySegments;
          return;
        }

        if (response?.reason === "download-failed") {
          summary.textContent = t.downloadFailed(response.error || "unknown error");
          return;
        }

        if (response?.reason === "free-limit") {
          showProNotice(response.resetAt);
          return;
        }

        if (typeof response?.remaining === "number") {
          summary.textContent = t.freeLeft(response.remaining);
        }
      });
    });

    actions.append(downloadButton);
    details.append(type, name, meta, actions);
    row.append(preview, details);
    mediaList.append(row);
  }
}

function showProNotice(resetAt) {
  proNotice.style.display = "grid";
  summary.textContent = resetAt
    ? t.freeLimitReset(formatReset(resetAt))
    : t.freeLimitGeneric;
}

function createPreview(item) {
  const preview = document.createElement("div");
  preview.className = "preview";

  if (item.category === "video" && isPreviewableVideo(item)) {
    const video = document.createElement("video");
    video.src = bestPreviewVideoUrl(item);
    if (item.posterUrl) {
      video.poster = item.posterUrl;
    }
    video.muted = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.controls = true;
    video.title = t.playPreview;
    video.addEventListener("loadeddata", () => {
      try {
        video.currentTime = Math.min(0.1, video.duration || 0);
      } catch {
        // Some CDNs expose metadata but reject seeking. Keeping the first frame is enough.
      }
    });
    video.addEventListener("error", () => {
      preview.textContent = "";
      if (item.posterUrl || (item.previewUrl && item.previewUrl !== video.src)) {
        const image = document.createElement("img");
        image.src = item.posterUrl || item.previewUrl;
        image.alt = "";
        image.loading = "lazy";
        image.addEventListener("error", () => {
          preview.textContent = "";
          preview.append(createFallbackIcon(item));
        });
        preview.append(image);
        return;
      }
      preview.append(createFallbackIcon(item));
    });
    preview.append(video);
    return preview;
  }

  if (item.posterUrl || item.previewUrl) {
    const image = document.createElement("img");
    image.src = item.posterUrl || item.previewUrl;
    image.alt = "";
    image.loading = "lazy";
    image.addEventListener("error", () => {
      preview.textContent = "";
      preview.append(createFallbackIcon(item));
    });
    preview.append(image);
    return preview;
  }

  preview.append(createFallbackIcon(item));
  return preview;
}

function createFallbackIcon(item) {
  const icon = document.createElement("span");
  icon.textContent = item.category === "stream" ? "HLS" : item.category === "audio" ? "AUD" : item.type || "VID";
  return icon;
}

function isPreviewableVideo(item) {
  const type = String(item.type || "").toUpperCase();
  const contentType = String(item.contentType || "").toLowerCase();
  const previewUrl = bestPreviewVideoUrl(item);
  return previewUrl.startsWith("blob:")
    || ["MP4", "WEBM", "MOV", "M4V", "VIDEO"].includes(type)
    || contentType.startsWith("video/");
}

function bestPreviewVideoUrl(item) {
  const url = String(item.url || "");
  const previewUrl = String(item.previewUrl || "");
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return previewUrl || url;
}

function formatSize(bytes) {
  if (!bytes) {
    return "";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

function formatReset(resetAt) {
  const minutes = Math.max(1, Math.ceil((resetAt - Date.now()) / 60000));
  return minutes === 1 ? t.oneMinute : t.minutes(minutes);
}

function isDownloadable(rawUrl) {
  return /^https?:\/\//i.test(String(rawUrl || ""));
}

function bestActionUrl(item) {
  if (isDownloadable(item.url)) {
    return item.url;
  }

  const contentType = String(item.contentType || "").toLowerCase();
  if (item.category === "video" && contentType.startsWith("video/") && isDownloadable(item.previewUrl)) {
    return item.previewUrl;
  }

  return "";
}

function sortByFormat(media, format) {
  if (format === "original") {
    return media;
  }

  return [...media].sort((a, b) => formatScore(b, format) - formatScore(a, format));
}

function formatScore(item, format) {
  const type = String(item.type || "").toLowerCase();
  const contentType = String(item.contentType || "").toLowerCase();
  const url = String(item.url || "").toLowerCase();

  if (type === format || contentType.includes(format) || url.includes(`.${format}`)) {
    return 3;
  }
  if (format === "mp4" && (type === "m4v" || contentType.includes("video/"))) {
    return 2;
  }
  if (item.category === "video") {
    return 1;
  }
  return 0;
}
