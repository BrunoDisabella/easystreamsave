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

## Test Matrix

| Area | Target | Expected Result | Pass Criteria |
| --- | --- | --- | --- |
| Direct MP4 | Public `.mp4` sample file | Badge increments and popup shows MP4 item | Save button opens Chrome download |
| Direct WebM | Public `.webm` sample file | Badge increments and popup shows WEBM item | Save button opens Chrome download |
| HLS playlist | Public `.m3u8` sample playlist | Badge increments and popup shows M3U8 item | Item is detected; direct save may only save playlist |
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

## Acceptance Criteria for MVP 0.1.0

- Detects direct MP4 and WebM reliably.
- Detects HLS/DASH manifests as resources, even if it does not merge segments yet.
- Badge count is accurate per tab.
- Popup remains fast with up to 80 detected items.
- Clear button resets the current tab.
- Download button works for direct files.
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

Pending manual Chrome run.
