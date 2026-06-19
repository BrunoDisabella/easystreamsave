# Easy Stream Save

Clean Chrome extension and SEO landing for detecting downloadable web video resources.

Production MVP direction:

- Detect direct media files and stream playlists in the current Chrome tab.
- Show a visual preview for direct video files when Chrome can load metadata.
- Keep the product honest: no YouTube download support, no DRM bypass claims, no invasive ads.
- Use consistent Easy Stream Save branding across extension icons, favicon, and landing.

## Structure

- `landing/`: static marketing/legal site for `easystreamsave.com`.
  - Includes English home plus `/es/` Spanish landing with hreflang alternates.
  - Includes static pricing and checkout mock pages for the future Paddle flow.
  - Includes `/qa/`, a noindex controlled media page for local extension QA and safe screenshot preparation.
- `extension/`: Chrome Manifest V3 extension MVP.
- `BUSINESS_PLAN.md`: living business plan.
- `ROADMAP.md`: execution roadmap and KPIs.
- `WORKLOG.md`: chronological project log.
- `AGENT_BRIEF.md`: autonomous agent instructions.
- `KEYWORD_RESEARCH_EXPERT_2026.md`: expert SEO/CWS keyword research with Google Ads volumes, clusters, priorities, and page architecture.
- `KEYWORD_RESEARCH.md`: base keyword research notes and Google/Maton access status.
- `MANUAL_TEST_PLAN.md`: local Chrome QA checklist for the extension MVP.
- `CHROME_STORE_LISTING.md`: draft Chrome Web Store listing copy, privacy notes, keywords, and screenshot checklist.
- `CWS_SUBMISSION_PACKAGE.md`: one-file Chrome Web Store submission pack with permission justifications and privacy questionnaire draft.
- `SCREENSHOT_PLAN.md`: exact Chrome Web Store screenshot plan, safe sources, and capture criteria.
- `COMPETITOR_RESEARCH.md`: competitor UX/features research.
- `MONETIZATION_AND_PAYMENTS.md`: Free/Pro limits and payment platform decision.
- `TRAFFIC_AND_CONTENT.md`: SEO, AI tutorial, multilingual, and traffic plan.

## Local Preview

Landing:

```bash
cd landing
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

Extension:

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select the `extension/` folder.

Then follow `MANUAL_TEST_PLAN.md`.
