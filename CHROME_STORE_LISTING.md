# Chrome Web Store Listing - Easy Stream Save

Last updated: 2026-06-19

Status: draft for MVP submission. Do not publish until manual QA, screenshots, and Developer Dashboard privacy answers are complete.

## Positioning

Easy Stream Save is a clean Chrome extension for detecting browser-accessible media resources on the current page. It focuses on honest detection, useful previews, and simple downloads for media the user owns or is authorized to save, including direct media files and visible public stream playlists when technically available.

Do not claim:

- Universal video downloading.
- YouTube downloading.
- DRM bypass.
- Downloads from Netflix, Disney, paid courses, or protected platforms.
- Guaranteed conversion from HLS/DASH to MP4 before stream assembly exists.

## English Listing

### Short Description

Clean Chrome media downloader for authorized web videos, direct files, and supported M3U8/HLS streams.

### Long Description

Easy Stream Save is a clean Chrome media downloader extension that helps you find video resources already available to your browser on the current page. Use it only for content you own, have permission to save, or are otherwise authorized to download.

The extension detects direct video files and common stream playlist formats, shows a clear list in the popup, and lets you download direct media files with Chrome's built-in download flow. When the browser can load the media metadata, Easy Stream Save also shows a preview or thumbnail so you can identify the right file faster.

What it can help with:

- Detect direct MP4, WebM, MOV, and M4V video files.
- Detect HLS/M3U8 and DASH/MPD stream playlists.
- Show previews or page thumbnails when available.
- Keep detected media separated by browser tab.
- Clear the current tab's detected list at any time.
- Keep downloads user-initiated through Chrome's native download flow.
- Copy detected media URLs for troubleshooting or personal workflow.

Important limitations:

- It does not bypass DRM or access controls.
- It does not promise YouTube, Netflix, Disney, paid streaming, or protected site downloads.
- Some sites use encrypted streams, blob URLs, signed URLs, CORS rules, or short-lived links that may block preview or download.
- HLS/M3U8 and DASH/MPD resources may be detected as playlists; full stream merging is not promised in the MVP.

Privacy:

Easy Stream Save is designed to work locally in your browser. It does not show invasive ads and the MVP does not require an account. The extension needs page and network access so it can detect media resources requested by the active tab.

## Spanish Listing

### Short Description

Descargador Chrome limpio para videos autorizados, archivos directos y streams M3U8/HLS compatibles.

### Long Description

Easy Stream Save es una extension para descargar medios en Chrome que te ayuda a encontrar recursos de video ya disponibles para tu navegador en la pagina actual. Usala solo con contenido propio, con permiso o autorizado para descarga.

La extension detecta archivos de video directos y formatos comunes de playlists de streaming, muestra una lista clara en el popup y permite descargar archivos directos usando el flujo nativo de descargas de Chrome. Cuando el navegador puede cargar metadata, Easy Stream Save tambien muestra una preview o miniatura para identificar mas rapido el archivo correcto.

Puede ayudarte a:

- Detectar videos directos MP4, WebM, MOV y M4V.
- Detectar playlists HLS/M3U8 y DASH/MPD.
- Mostrar previews o miniaturas cuando estan disponibles.
- Separar los medios detectados por pestana.
- Limpiar la lista detectada de la pestana actual.
- Mantener las descargas iniciadas por el usuario con el flujo nativo de Chrome.
- Copiar URLs detectadas para diagnostico o flujo personal.

Limitaciones importantes:

- No evita DRM ni controles de acceso.
- No promete descargas de YouTube, Netflix, Disney, streaming pago o sitios protegidos.
- Algunos sitios usan streams cifrados, blob URLs, URLs firmadas, reglas CORS o enlaces temporales que pueden bloquear preview o descarga.
- HLS/M3U8 y DASH/MPD pueden detectarse como playlists; el MVP no promete ensamblado completo de streams.

Privacidad:

Easy Stream Save esta pensada para funcionar localmente en tu navegador. No muestra anuncios invasivos y el MVP no requiere cuenta. La extension necesita acceso a la pagina y a solicitudes de red para detectar recursos multimedia pedidos por la pestana activa.

## Screenshot Checklist

Required before submission:

- Popup with no media detected on a normal page.
- Popup with one direct MP4 detected and preview visible.
- Popup with multiple detected resources and type labels.
- Popup showing the format selector and Free limit copy.
- Popup showing a clear error/limitation state for a non-downloadable source.
- Landing page hero at `easystreamsave.com`.

Recommended sizes:

- Chrome Web Store screenshots: 1280x800 or 640x400.
- Keep browser UI visible enough to show this is a Chrome extension.
- Avoid copyrighted, private, adult, paid, or platform-protected content in screenshots.

Operational capture plan:

- Use `SCREENSHOT_PLAN.md` for the exact screenshot set, safe source rules, capture checklist, and acceptance criteria.

## Category And Metadata

Recommended category: Productivity or Utilities.

Primary CWS keywords:

- video downloader
- chrome video downloader
- video downloader extension
- video downloader chrome extension
- web video downloader
- m3u8 downloader
- hls downloader
- video downloader without ads

Spanish CWS keywords:

- descargar videos de paginas web
- descargador de videos chrome
- extension para descargar videos chrome
- descargar videos de google chrome

Avoid as primary keywords:

- YouTube downloader
- Netflix downloader
- DRM downloader
- download protected video

## Privacy Questionnaire Notes

Likely permission explanations:

- `downloads`: starts downloads through Chrome when the user clicks Download.
- `storage`: stores detected media per tab, language choice, format choice, and local Free usage counter.
- `tabs`: identifies the active tab so the popup can show only media detected for the current tab.
- `webRequest`: detects media resources requested by the current page.
- `<all_urls>` host access: needed because media resources can be served from the visited site or a third-party CDN.

Data handling draft:

- No account required for MVP.
- No sale of user data.
- No invasive ads.
- No collection of browsing history for external analytics in the MVP.
- Media detection state is used locally to populate the popup.
- No transfer of detected URLs, page metadata, or usage counters to an external server in the MVP.
- Future paid licensing should transfer only the minimum billing/license status required to unlock Pro features.

## Pre-Submission QA

- Run `node --check` on all extension JavaScript files.
- Parse `extension/manifest.json` and locale JSON files.
- Load unpacked extension in Chrome.
- Complete at least 10 manual non-DRM test cases from `MANUAL_TEST_PLAN.md`.
- Confirm screenshots match the current UI.
- Confirm privacy policy describes the shipped permissions honestly.
- Confirm Developer Dashboard wording matches `CWS_SUBMISSION_PACKAGE.md`.
