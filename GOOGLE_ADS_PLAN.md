# Google Ads Plan - Easy Stream Save

Ultima actualizacion: 2026-06-19

Estado: plan estrategico creado con datos reales de Google Keyword Planner via Maton. No hay campanas activas ni presupuesto creado.

## Resultado de Acceso

Cuenta Google Ads detectada:

- Customer: `customers/1808022852`
- Keyword Planner: operativo via Maton.
- Campanas visibles en la cuenta: ninguna al momento de la consulta.

Importante:

- Google Ads API permite Keyword Planner: ideas, metricas historicas y forecasts.
- El "Performance Planner" de la UI no quedo creado por API. La cuenta no tiene campanas existentes para proyectar y no voy a crear campanas/presupuestos sin aprobacion explicita.
- Se intentaron 3 forecasts no mutantes con `GenerateKeywordForecastMetrics`; el conector rechazo campos REST de targeting/forecast. Se freno despues del tercer fallo.

Fuente oficial revisada:

- Google Ads API Keyword Planning: `https://developers.google.com/google-ads/api/docs/keyword-planning/overview`
- Google Ads API Forecast Metrics: `https://developers.google.com/google-ads/api/docs/keyword-planning/generate-forecast-metrics`

## Objetivo del Plan

Validar demanda e intencion antes de gastar:

1. Evitar competir de entrada por `web video downloader` y `video downloader`, que tienen volumen alto pero mucha competencia real.
2. Apuntar primero a clusters con intencion alta y mejor encaje producto:
   - HLS/M3U8 Chrome.
   - Vimeo publico/browser-accessible.
   - alternativas a competidores.
   - privacidad/no ads.
3. No atraer usuarios que esperan descargar YouTube, Netflix, contenido privado, DRM, paywalls o contenido no autorizado.

## Estructura Recomendada

No crear campana hasta tener:

- Extension publicada o beta instalable con URL clara.
- Conversion tracking/medicion minima.
- Landing pages finales.
- QA Vimeo publico/embed completado antes de usar keywords Vimeo.

Campana futura:

- Tipo: Search.
- Red: Google Search solamente.
- Ubicacion inicial: United States o paises EN con alto CPC/volumen.
- Idioma: English.
- Presupuesto test sugerido: USD 5-10/dia por 7 dias, solo cuando Bruno apruebe.
- Bidding inicial: manual CPC o maximize clicks con tope bajo; no Smart Bidding hasta tener conversiones.

## Ad Groups

### 1. HLS/M3U8 Downloader

Landing:

- `/m3u8-downloader-chrome/`

Keywords iniciales:

- `m3u8 downloader chrome` - 1000 avg monthly searches, LOW competition.
- `hls downloader chrome` - 1300 avg monthly searches.
- `download hls stream chrome` - 1300 avg monthly searches.
- `m3u8 downloader extension`
- `hls video downloader chrome`

Mensaje:

- Detect browser-accessible HLS/M3U8 streams.
- Clear limits for protected/encrypted streams.
- No DRM bypass.

### 2. Vimeo Public / Browser-Accessible

Estado: pendiente de QA antes de activar.

Landing futura:

- `/vimeo-downloader-chrome/`

Keywords iniciales si QA pasa:

- `vimeo downloader extension` - 1900 avg monthly searches, LOW competition.
- `vimeo downloader chrome` - 1600 avg monthly searches, LOW competition.
- `vimeo video downloader chrome` - 1300 avg monthly searches.
- `download vimeo chrome extension` - 1000 avg monthly searches.

Regla:

- Copy solo para public/browser-accessible/authorized Vimeo videos and embeds.
- Excluir cualquier promesa de private Vimeo downloader.
- No usar "official Vimeo" ni lenguaje que parezca afiliacion.

### 3. Alternatives

Landing:

- `/video-downloadhelper-alternative/`

Keywords iniciales:

- `video downloadhelper alternative` - 880 avg monthly searches.
- `video download helper alternative`
- `downloadhelper alternative`
- `cococut alternative` - 90 avg monthly searches.
- `fetchv alternative` - 70 avg monthly searches.

Mensaje:

- Cleaner workflow.
- No invasive ads.
- Clear limitations.
- Privacy-first.

### 4. Clean / No Ads

Landing:

- `/chrome-video-downloader-without-ads/`

Keywords iniciales:

- `video downloader without ads`
- `chrome video downloader without ads`
- `video downloader extension without ads`
- `clean video downloader chrome`
- `private video downloader extension`

Mensaje:

- No invasive ads.
- Local-first MVP.
- Minimum data collection.
- Useful Free plan, Pro later for power workflow.

## Keywords a Evitar o Negativizar

Negativos de riesgo legal/plataforma:

- youtube
- netflix
- disney
- hulu
- prime video
- onlyfans
- private
- protected
- drm
- bypass
- paywall
- paid course
- login
- password
- crack
- pirate
- download any video
- descargar cualquier video

Negativos de baja calidad/intencion incorrecta:

- mp3
- music
- song
- apk
- android app
- snaptube
- vidmate
- converter online
- free movie
- torrent

Negativos a decidir segun datos:

- facebook
- instagram
- tiktok
- twitter

Motivo: tienen volumen, pero atraen expectativas de contenido privado/plataformas sensibles. No activarlos hasta que haya estrategia compliance y QA real.

## Copy Base de Anuncios

### HLS/M3U8

Headline ideas:

- HLS Downloader for Chrome
- Detect M3U8 Streams
- Save Authorized Web Media

Description ideas:

- Find browser-accessible HLS and M3U8 media with a clean Chrome extension.
- No DRM bypass. No invasive ads. Clear limits for protected streams.

### Alternatives

Headline ideas:

- Video DownloadHelper Alternative
- Clean Video Downloader
- No Invasive Ads

Description ideas:

- A simpler Chrome video downloader for available media and supported streams.
- Privacy-first workflow. Clear limitations. Useful free plan.

### Vimeo

Use only after QA:

- Save Authorized Vimeo Media
- Vimeo Downloader for Chrome
- Public Vimeo Video Helper

Description ideas:

- Detect public/browser-accessible Vimeo media and embeds when available.
- Not affiliated with Vimeo. Does not bypass private or protected videos.

## Medicion Minima Antes de Gastar

Landing events:

- `download_page_view`
- `chrome_store_click`
- `extension_zip_click` solo beta interna
- `pricing_view`
- `contact_click`

Extension events no invasivos futuros:

- `first_media_detected`
- `first_download_started`
- `free_limit_reached`
- `pro_cta_clicked`

No subir URLs detectadas, historial de navegacion ni datos de medios a analitica externa.

## Decision Operativa

No activar Google Ads todavia.

Orden correcto:

1. Publicar o dejar lista la extension en Chrome Web Store.
2. Completar QA Vimeo publico/embed.
3. Crear `/vimeo-downloader-chrome/` solo si QA pasa.
4. Activar medicion minima.
5. Pedir aprobacion de Bruno para presupuesto.
6. Crear campana Search con los 4 grupos anteriores, empezando por HLS/M3U8 + Alternatives.

