const mediaList = document.getElementById("mediaList");
const emptyState = document.getElementById("emptyState");
const summary = document.getElementById("summary");
const refreshButton = document.getElementById("refreshButton");
const clearButton = document.getElementById("clearButton");
const proNotice = document.getElementById("proNotice");

refreshButton.addEventListener("click", loadMedia);
clearButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "clear-media" }, loadMedia);
});

loadMedia();

function loadMedia() {
  chrome.runtime.sendMessage({ type: "get-media" }, response => {
    const media = response?.media || [];
    render(media);
  });
}

function render(media) {
  mediaList.textContent = "";
  emptyState.style.display = media.length ? "none" : "flex";
  summary.textContent = media.length === 1 ? "1 media source detected" : `${media.length} media sources detected`;

  for (const item of media) {
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
    name.textContent = item.name || "Media file";

    const meta = document.createElement("span");
    meta.className = "host";
    meta.textContent = [formatSize(item.size), item.host].filter(Boolean).join(" - ");

    const button = document.createElement("button");
    button.className = "download";
    button.type = "button";
    button.textContent = "Download";
    button.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "download-media", url: item.url }, response => {
        if (response?.reason === "free-limit") {
          showProNotice();
          return;
        }

        if (typeof response?.remaining === "number") {
          summary.textContent = `${response.remaining} free downloads left today`;
        }
      });
    });

    details.append(type, name, meta);
    row.append(preview, details, button);
    mediaList.append(row);
  }
}

function showProNotice() {
  proNotice.style.display = "grid";
  summary.textContent = "Free download limit reached";
}

function createPreview(item) {
  const preview = document.createElement("div");
  preview.className = "preview";

  if (item.category === "video" && isPreviewableVideo(item)) {
    const video = document.createElement("video");
    video.src = item.url;
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    video.controls = false;
    video.addEventListener("loadeddata", () => {
      try {
        video.currentTime = Math.min(0.1, video.duration || 0);
      } catch {
        // Some CDNs expose metadata but reject seeking. Keeping the first frame is enough.
      }
    });
    video.addEventListener("error", () => {
      preview.textContent = "";
      const icon = document.createElement("span");
      icon.textContent = item.type || "VID";
      preview.append(icon);
    });
    preview.append(video);
    return preview;
  }

  const icon = document.createElement("span");
  icon.textContent = item.category === "stream" ? "HLS" : item.category === "audio" ? "AUD" : "VID";
  preview.append(icon);
  return preview;
}

function isPreviewableVideo(item) {
  const type = String(item.type || "").toUpperCase();
  const contentType = String(item.contentType || "").toLowerCase();
  return ["MP4", "WEBM", "MOV", "M4V", "VIDEO"].includes(type)
    || contentType.startsWith("video/");
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
