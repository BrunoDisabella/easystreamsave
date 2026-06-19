# Screenshot Plan - Easy Stream Save

Last updated: 2026-06-19

Purpose: prepare Chrome Web Store screenshots without using copyrighted, private, paid, adult, DRM-protected, or platform-restricted content.

## Rules

- Use only public demo media or locally controlled landing pages.
- Do not show YouTube, Netflix, Disney, paid courses, private chats, user accounts, or copyrighted entertainment content.
- Keep the browser chrome visible enough to show the extension popup is real.
- Do not edit screenshots to imply a feature that does not exist.
- Do not show HLS/DASH merge or conversion until the feature is actually implemented.
- Use honest limitation copy when the source cannot be previewed or downloaded.

## Target Sizes

Chrome Web Store accepts multiple sizes. Recommended working sizes:

- Primary: 1280x800.
- Secondary fallback: 640x400.

Capture at 1280x800 first. Downscale only if needed.

## Required Screenshot Set

| ID | Screenshot | Source | Expected UI | Store Purpose | Status |
| --- | --- | --- | --- | --- | --- |
| CWS-01 | Popup on clean page | `https://easystreamsave.com/` | Empty state or no media state | Shows clean UI and brand | Pending |
| CWS-02 | Direct MP4 detected | `http://127.0.0.1:4173/qa/` MP4 card | MP4 row, preview visible, Download/Open buttons | Shows core value | Ready for manual capture |
| CWS-03 | Multiple resources detected | `http://127.0.0.1:4173/qa/` MP4 + WebM cards | Several rows with type labels | Shows detection list | Ready for manual capture |
| CWS-04 | HLS/M3U8 playlist detected | `http://127.0.0.1:4173/qa/` HLS card | M3U8 row with honest stream limitation | Shows stream detection without overpromising | Ready for manual capture |
| CWS-05 | Format selector and Free limit | `http://127.0.0.1:4173/qa/` detected media | Format selector visible, Free copy visible | Shows monetization is transparent | Ready for manual capture |
| CWS-06 | Non-downloadable or blocked source | `http://127.0.0.1:4173/qa/` non-video validation card | Clear error/limitation state | Sets correct expectations | Ready for manual capture |
| CWS-07 | Landing page | `https://easystreamsave.com/` | Hero and CTA visible | Connects extension to official site | Pending |

## Safe Source Shortlist

Start with these categories, then record exact URLs in `MANUAL_TEST_PLAN.md` during QA:

- Local controlled QA page: `http://127.0.0.1:4173/qa/`.
- W3Schools HTML video examples.
- MDN video examples.
- Google Shaka Player public demo streams.
- Bitmovin public demo streams.
- Public sample MP4/WebM files from browser/media documentation.

Avoid random "free video" pages unless the licensing and content are clear.

## Capture Checklist

Before each screenshot:

- Reload the extension from `chrome://extensions`.
- Clear the current tab list from the popup.
- Open the safe test page in a fresh tab.
- Play or interact with the media only enough to trigger detection.
- Confirm the popup language is English for Chrome Web Store primary screenshots.
- Confirm the format selector default is MP4.
- Confirm no personal browser profile data, bookmarks, account avatar, or private tabs are visible.

After each screenshot:

- Save filename as `cws-XX-short-name.png`.
- Add the exact source URL and result to `MANUAL_TEST_PLAN.md`.
- If preview fails but Open works, classify it as preview blocked/headers/CORS instead of a product promise failure.

## Acceptance Criteria

- At least 5 screenshots are ready before paying or submitting to Chrome Web Store.
- At least 1 screenshot shows a real direct media preview.
- At least 1 screenshot shows honest handling of streams or blocked sources.
- No screenshot implies DRM bypass, protected platform downloading, or universal YouTube support.
- The UI in screenshots matches the current shipped extension version.
