# Easy Stream Save

Clean Chrome extension and SEO landing for detecting downloadable web video resources.

## Structure

- `landing/`: static marketing/legal site for `easystreamsave.com`.
- `extension/`: Chrome Manifest V3 extension MVP.
- `BUSINESS_PLAN.md`: living business plan.
- `ROADMAP.md`: execution roadmap and KPIs.
- `WORKLOG.md`: chronological project log.
- `AGENT_BRIEF.md`: autonomous agent instructions.

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

