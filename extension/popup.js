const mediaList = document.getElementById("mediaList");
const emptyState = document.getElementById("emptyState");
const summary = document.getElementById("summary");
const refreshButton = document.getElementById("refreshButton");
const clearButton = document.getElementById("clearButton");

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
  summary.textContent = media.length === 1 ? "1 item detected" : `${media.length} items detected`;

  for (const item of media) {
    const row = document.createElement("article");
    row.className = "media-item";

    const type = document.createElement("span");
    type.className = "type";
    type.textContent = item.type || "MEDIA";

    const details = document.createElement("div");

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = item.name || "Media file";

    const host = document.createElement("span");
    host.className = "host";
    host.textContent = item.host || "";

    const button = document.createElement("button");
    button.className = "download";
    button.type = "button";
    button.textContent = "Save";
    button.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "download-media", url: item.url });
    });

    details.append(name, host);
    row.append(type, details, button);
    mediaList.append(row);
  }
}
