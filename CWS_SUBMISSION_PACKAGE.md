# Chrome Web Store Submission Package - Easy Stream Save

Last updated: 2026-06-19

Status: ready as a working submission pack. Blocked only by manual Chrome QA, screenshots, Chrome Web Store developer payment, and dashboard upload.

## Current Package

- Extension version: `0.1.15`.
- Source folder: `extension/`.
- Existing ZIP candidate: `easy-stream-save-extension-0.1.15.zip`.
- Store listing draft: `CHROME_STORE_LISTING.md`.
- Screenshot plan: `SCREENSHOT_PLAN.md`.
- Manual QA plan: `MANUAL_TEST_PLAN.md`.
- Public privacy URL: `https://easystreamsave.com/privacy/`.
- Public terms URL: `https://easystreamsave.com/terms/`.

## Submission Positioning

Single purpose:

Easy Stream Save detects media resources available to the current Chrome tab, previews them when possible, and lets the user download available direct media files or supported non-encrypted streams.

Do not use these claims in the listing, screenshots, or support replies:

- Universal video downloader.
- YouTube downloader.
- DRM bypass.
- Netflix, Disney, paid course, or protected platform downloader.
- Guaranteed MP4 conversion from every HLS/DASH source.

Safe wording:

- Detects direct video files and stream playlists available to the browser.
- Downloads direct media files with Chrome's native download flow.
- Shows previews when Chrome and the source server allow it.
- Explains when a stream, blob URL, signed URL, CORS rule, or protected source blocks preview/download.

## Store Listing Fields

Extension name:

Easy Stream Save

Short description:

Detect web videos and stream playlists on the current page, preview media when available, and download direct video files.

Category:

Utilities first choice. Productivity is acceptable if Utilities is unavailable or performs worse.

Language:

Primary: English.

Secondary/localized listing: Spanish.

Support email:

`easystreamsave@gmail.com`

Website:

`https://easystreamsave.com/`

Privacy policy:

`https://easystreamsave.com/privacy/`

## Permission Justifications

Use this wording in the Chrome Web Store privacy/permission review fields.

`downloads`:

Used only when the user clicks Download in the popup. It starts Chrome's native download flow for a detected media URL.

`storage`:

Used to store detected media state for the current tab, language preference, format preference, and the local Free usage counter. This data stays in the browser in the MVP.

`tabs`:

Used to identify the active tab so the popup can show only media detected for that tab and keep results separated between tabs.

`webRequest`:

Used to detect video files and stream playlists requested by the current page, including resources served by third-party CDNs.

`<all_urls>` host permissions:

Needed because video files and playlists can be loaded from any visited site or CDN. The extension uses this access only for its user-facing media detection feature.

## Privacy Questionnaire Draft

Data collection:

- Do not declare external collection in the MVP if the submitted build has no analytics, account login, remote logging, or license backend enabled.
- Locally processed data includes URLs, response metadata, file names, media sizes, poster/preview URLs, language preference, format preference, and local usage counters.
- State that this data is used only to detect, preview, and download available media resources.

Data sale:

- No.

Data transfer:

- No external transfer in the MVP.
- Future paid licensing must disclose payment provider transfer separately before enabling it.

Browsing history:

- The extension observes media network requests for the user-facing detection feature. Do not describe this as general browsing history collection.
- Keep listing and privacy policy explicit that page/network access is required to detect media on the active/current tab.

Authentication, financial, health, location, personal communications:

- No for the MVP.

## Screenshot Set

Minimum before submission:

1. `CWS-01`: clean popup/no media state.
2. `CWS-02`: direct MP4 detected with preview.
3. `CWS-03`: multiple resources detected with type labels.
4. `CWS-04`: HLS/M3U8 playlist detected with honest limitation.
5. `CWS-05`: format selector and Free limit copy.
6. `CWS-06`: blocked/non-downloadable source with clear explanation.
7. `CWS-07`: landing page hero.

Rules:

- Use only `landing/qa/`, MDN/W3C-style demo media, or other public demo media.
- Do not show YouTube, Netflix, Disney, paid platforms, private accounts, or copyrighted entertainment content.
- Keep UI unedited except basic cropping/resizing.

## Pre-Upload Checklist

- Run static JS checks.
- Parse manifest and locale JSON files.
- Confirm `manifest.json` version matches the ZIP being uploaded.
- Confirm ZIP has `manifest.json` at root.
- Load unpacked extension in Chrome.
- Execute at least 10 manual test cases from `MANUAL_TEST_PLAN.md`.
- Capture at least 5 screenshots, ideally all 7 from `SCREENSHOT_PLAN.md`.
- Confirm privacy policy URL is live.
- Confirm the listing does not mention unsupported YouTube/DRM/protected-platform downloading.
- Confirm no secrets, API keys, analytics tokens, or payment keys are inside `extension/`.

## External Blockers

- Bruno must pay the Chrome Web Store Developer one-time fee.
- Bruno must upload through the Chrome Web Store Developer Dashboard.
- Bruno must provide final screenshots or let Marcela capture them from a visible Chrome session.
- `www.easystreamsave.com` DNS remains separate and non-blocking for Chrome Store submission because the root domain is live.

## Recommended Upload Mode

First upload should be public only after QA passes. If manual QA is incomplete, use a limited/unlisted tester release first.

