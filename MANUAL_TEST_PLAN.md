# Manual Test Plan - Easy Stream Save

Last updated: 2026-06-19

## Goal

Validate the MV3 MVP in Chrome before Chrome Web Store packaging.

The MVP should detect downloadable media resources on the active tab, show a badge count, list detected items in the popup, and trigger Chrome downloads for direct files.

This test does not validate DRM bypass, YouTube downloads, Netflix, Disney, paid streaming platforms, or copyright-restricted use cases.

## Setup

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select:
   `/data/.openclaw/workspace/projects/video-downloader-extension/extension`
6. Pin Easy Stream Save to the toolbar.
7. Open the service worker console from the extension details page if debugging is needed.
8. For controlled local QA, run the landing server and open `http://127.0.0.1:4173/qa/`:

```bash
cd /data/.openclaw/workspace/projects/video-downloader-extension/landing
python3 -m http.server 4173
```

## Test Matrix

| Area | Target | Expected Result | Pass Criteria |
| --- | --- | --- | --- |
| Direct MP4 | Public `.mp4` sample file | Badge increments and popup shows MP4 item | Save button opens Chrome download |
| Direct WebM | Public `.webm` sample file | Badge increments and popup shows WEBM item | Save button opens Chrome download |
| Controlled QA page | `http://127.0.0.1:4173/qa/` | MP4/WebM cards trigger safe public demo media | Preview, Download, format selector, and non-video validation can be tested repeatably |
| HLS playlist | Public `.m3u8` sample playlist | Badge increments and popup shows M3U8 item | Item is detected; MP4 download is blocked with clear stream message unless Original/M3U8 is selected |
| Format honesty | Direct WebM while MP4 is selected | Download keeps the real media extension | No fake `.mp4` filename is created when the source is WebM/MOV/HLS |
| DASH manifest | Public `.mpd` sample manifest | Badge increments and popup shows MPD item | Item is detected; no merge promised |
| Content-Type detection | Media URL without visible extension | Badge increments from response headers | Item type can show MEDIA but URL is listed |
| Duplicate handling | Reload same video twice | No duplicate rows for same URL | Row count stays stable |
| Clear action | Click Clear | Badge disappears and popup empties | State cleared for current tab |
| Tab isolation | Open two video pages in two tabs | Each tab has its own detected list | Popup matches active tab |
| No media page | Open normal article/page | Empty state shown | No false-positive flood |

## Suggested Safe Test Sources

Use public sample/demo media only. Avoid YouTube, Netflix, Disney, paid courses, private links, or anything that implies bypassing access controls.

Good sources to test:

- W3Schools HTML video examples.
- MDN video/audio examples.
- Google Shaka Player demo streams.
- Bitmovin demo streams.
- Public sample video files from official browser/media documentation.
- TikTok public feed/videos: play 2-3 seconds, refresh popup, verify duplicate filtering, poster preview, and direct download only when a real URL exists.
- Facebook Reels public pages: play 2-3 seconds, refresh popup, verify thumbnails attach to network candidates and disabled buttons explain when URL is blob-only.
- Instagram Reels public pages: detection may be limited; record whether URL is direct, blob, or signed.
- Vimeo public videos with downloads disabled: should detect available media only, with no DRM/universal claims.
- Dailymotion public videos: useful for HLS/direct stream behavior.
- Archive.org video items: stable direct MP4/WebM URLs for download validation.
- Big Buck Bunny sample pages: stable public MP4/WebM/HLS sources.

When a source produces a good Chrome Web Store screenshot candidate, log it with the matching screenshot ID from `SCREENSHOT_PLAN.md`.

## Acceptance Criteria for MVP 0.1.0

- Detects direct MP4 and WebM reliably.
- Detects HLS/DASH manifests as resources, even if it does not merge segments yet.
- Badge count is accurate per tab.
- Popup remains fast with up to 80 detected items.
- Clear button resets the current tab.
- Download button works for direct files.
- Download filenames match the actual detected media type; the format selector must not imply conversion that does not exist yet.
- Tiny `.mp4` fragments/placeholders under 1 MB are hidden or rejected instead of being offered as full videos.
- TikTok-like pages that deliver video through `fetch/xhr` are detected when response headers expose `video/*`.
- Preview should use the page poster or Open Graph image when the direct video frame cannot be rendered in the popup.
- Preview should be playable inside the popup when the candidate has a direct video URL that Chrome can load.
- Disabled download buttons must show a clear tooltip when only a blob/poster preview exists.
- UI copy stays honest about limitations.

## Known Limitations

- HLS/M3U8 and DASH/MPD are detected but not merged into MP4 yet.
- Some sites hide media behind blob URLs, encrypted streams, signed URLs, or DRM.
- Some downloads may fail when the server requires cookies, referer headers, or short-lived signatures.
- The extension should not claim universal video downloading.

## Bug Log Format

When a test fails, add entries below:

```text
Date:
Chrome version:
URL/test source:
Expected:
Actual:
Console error:
Decision: fix now / backlog / out of scope
```

## Initial Test Session

### 2026-06-19 - TikTok false positive fix

Context:

- Bruno compared Easy Stream Save against a competitor on TikTok.
- Competitor detected the useful file around 12 MB.
- Easy Stream Save showed multiple candidates and allowed `playback1.mp4` around 193 KB, which downloaded but did not open as a valid video.

Decision:

- Treat extension-only `.mp4` network hits as provisional unless response headers prove a real media response.
- Hide direct video candidates without known size until headers arrive.
- Reject tiny direct videos under 1 MB at download validation time.
- Keep explicit HLS/DASH playlist detection because those files are naturally small manifests, not full video files.

Validation:

- PASS: `node --check extension/service-worker.js`.
- PASS: `node --check extension/popup.js`.
- PASS: `node --check extension/content-script.js`.
- PASS: JSON parse for manifest and EN/ES locales.
- PASS: isolated logic test rejects a 193 KB `playback1.mp4`, rejects blind `.mp4` without headers, and accepts a 12.2 MB video candidate.

### 2026-06-19 - TikTok download and preview follow-up

Context:

- After `0.1.7`, Bruno reported the extension now seemed to detect the correct two TikTok video candidates, but download buttons did not work and previews still showed generic placeholders.

Decision:

- Observe video responses across request types, not only `details.type === "media"`, because TikTok and similar sites can deliver playable video through `fetch`/`xmlhttprequest`.
- Store safe request headers seen by `webRequest` and reuse them for `chrome.downloads.download` when available, because signed media URLs may fail a later validation `HEAD` without the original request context.
- Trust already-captured video headers for download validation instead of forcing a second `HEAD` that can be blocked by CDNs.
- Use page `poster`, `og:image`, or `twitter:image` as preview fallback.

Validation:

- PASS: `node --check extension/service-worker.js`.
- PASS: `node --check extension/popup.js`.
- PASS: `node --check extension/content-script.js`.
- PASS: JSON parse for manifest and EN/ES locales.

### 2026-06-19 - Facebook buttons, playable preview, and logo update

Context:

- Bruno reported Facebook detection improved and thumbnails appeared, but download buttons could still be disabled.
- Bruno requested playable previews inside the popup where possible.
- Bruno provided a new green/teal logo direction for the app.

Decision:

- The popup now resolves actions from the best available direct URL and shows a tooltip when there is no direct downloadable video URL.
- The preview area uses `<video controls>` when the candidate has a direct playable video URL.
- Poster/image fallback remains for blob-only candidates because Chrome extension popups cannot always replay page-owned blob media.
- New logo is stored as the canonical app logo and exported to web favicon plus extension icons.

Validation:

- Pending interactive Facebook/TikTok QA by Bruno on `0.1.9`.

### 2026-06-19 - Headless Chromium smoke QA

Environment:

- Chromium: local `/usr/bin/chromium`.
- Profile: temporary `/tmp/easy-stream-save-chrome-profile`.
- Extension path: `/data/.openclaw/workspace/projects/video-downloader-extension/extension`.
- QA URL: `http://127.0.0.1:4173/qa/`.

Results:

- PASS: Chromium opened `http://127.0.0.1:4173/qa/`.
- PASS: Extension installed from unpacked local path.
- PASS: Extension version registered as `0.1.6`.
- PASS: Extension granted expected permissions: `downloads`, `storage`, `tabs`, `webRequest`, `<all_urls>`.
- PASS: MV3 service worker started at least once.
- PASS: Local landing routes returned HTTP 200 for `/`, `/qa/`, `/es/`, `/pricing/`, `/sitemap.xml`.
- PASS: Public QA sources responded with expected media headers:
  - MP4: `video/mp4`, `1128375` bytes.
  - WebM: `video/webm`, `554058` bytes.
  - HLS: `audio/mpegurl`, `752` bytes.
- PASS: Static validation passed for JS and JSON files.

Not fully verified in this environment:

- Popup click flow, preview rendering inside extension popup, and Chrome download dialog.
- Reason: no Playwright/CDP WebSocket client is installed, and MV3 service worker sleeps normally in headless Chromium after initial startup.

Decision:

- Package `0.1.6` is acceptable for Bruno QA.
- Before Chrome Web Store submission, run interactive Chrome QA manually and capture screenshots from `SCREENSHOT_PLAN.md`.

## Screenshot QA Session

Pending manual Chrome run. Use `SCREENSHOT_PLAN.md` and record exact public source URLs here before Chrome Web Store submission.

Controlled local source prepared:

- `http://127.0.0.1:4173/qa/`
- MP4: `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`
- WebM: `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm`
- HLS: `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`
