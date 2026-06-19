# Competitor Reverse Engineering Notes

Date: 2026-06-19

Scope: defensive inspection of two user-provided extension ZIPs. Do not copy proprietary code. Use only architecture, manifest, permission, UX and detection-pattern learnings.

## Inspected Packages

1. `elicpjhcidhpjomhibiffojpinpmmpil`
   - Identified as Video Downloader Professional `2.1.7`.
   - MV3, permissions: `sidePanel`, `webRequest`, `downloads`, `tabs`, `storage`.
   - Simple webRequest detector plus page DOM scanner.

2. `lmjnegcaeklhafolokijcfjliaokphfk`
   - Identified as Video DownloadHelper `10.2.71.2`.
   - MV3, permissions include `offscreen`, `downloads`, `sidePanel`, `webRequest`, `webNavigation`, `scripting`, `declarativeNetRequest`, `storage`, `notifications`, `contextMenus`, `unlimitedStorage`.
   - Has site-specific injected scripts for Facebook, Vimeo, VK, Bilibili, Kick, etc.
   - Includes WASM/libav worker files for advanced media processing.

## What They Do Well

- Detect from response headers, not just URL extension.
- Use `Content-Length` and `Content-Range` to estimate real media size.
- Avoid showing very small direct-video fragments as normal downloadable videos.
- Treat `m3u8`, `mpd`, `m4s` and segments as special cases instead of pretending everything is MP4.
- Add site-specific logic for hard sites such as Facebook/Vimeo.
- Use side panel/persistent UI for longer media lists.
- In the heavier product, use background workers/WASM for advanced stream handling.

## Applied To Easy Stream Save

- Normalize byte-range video URLs by removing common range query params when headers prove a full-size video.
- Scan structured page metadata (`og:video`, `twitter:player:stream`, video links) in addition to `<video>` tags.
- Keep structured direct URLs even before network headers arrive, so the popup can offer an actionable candidate.
- Improve video preview fallback: if a direct `<video>` preview fails, fall back to poster/thumbnail instead of immediately showing a generic badge.
- Add first-party TikTok/Facebook adapters that scan page HTML/JSON for media URLs without using competitor code.
- Add HLS downloader MVP for unencrypted playlists: pick best variant, fetch segments, concatenate TS, download via Chrome.

## Next Product-Level Improvements

- Add host-specific adapters starting with TikTok and Facebook rather than relying only on generic scanning.
- Add side panel for many candidates and diagnostics.
- Replace TS concatenation with a proper muxing path only if needed, likely offscreen document + worker/WASM.
- Keep YouTube/DRM unsupported for Chrome Web Store policy safety.
