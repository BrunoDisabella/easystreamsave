# SEO and Growth System - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Principio

No cambiar SEO, landing, pricing o mensajes por intuicion diaria. Cada cambio debe quedar como experimento con fecha, hipotesis, metrica y ventana minima de medicion.

## Fuentes de Medicion

Antes de publicacion:

- Checklist tecnico local.
- Calidad de contenido.
- Comparacion con competidores.
- Keywords objetivo.

Despues de publicacion:

- Google Search Console.
- GA4 en landing.
- GA4 conectado a Chrome Web Store Developer Dashboard.
- Chrome Web Store installs.
- Activacion de extension.
- Eventos locales/agregados sin tracking invasivo.
- Conversion a Pro cuando exista.

## Cadencias

- Diario 04:00-07:00 UY: el agente puede mejorar docs, contenido, codigo o investigacion.
- Semanal: revisar keywords, paginas creadas, cambios hechos y bloqueos.
- Cada 14 dias: evaluar SEO inicial si Search Console ya tiene datos.
- Cada 30 dias: revisar pricing, conversion, posicionamiento y roadmap.

Regla:
SEO organico necesita tiempo. No declarar una pagina ganadora o perdedora antes de 14-30 dias salvo error tecnico claro.

## Keyword Strategy

Regla nueva:

- Antes de crear mas paginas SEO, usar `KEYWORD_RESEARCH_EXPERT_2026.md` como fuente principal.
- Si hay acceso a Google Ads/Keyword Planner, usar volumen real.
- Si no hay acceso, usar SERP manual, autocomplete, Chrome Web Store reviews, WebExtension.net y senales de comunidad.
- No perseguir keywords de YouTube/DRM que contradigan politicas o promesa honesta.

Decision:

- SEO web y Chrome Web Store SEO se trabajan juntos.
- La web controla arquitectura, landings, articulos, comparativas, schema, Search Console y captacion fuera de la store.
- Chrome Web Store SEO convierte busquedas internas en installs y debe repetir los claims principales por idioma.
- WebExtension.net se usa para validar demanda/competencia dentro de Chrome Web Store antes de tocar titulo, descripcion y screenshots.
- Cada pagina SEO nueva debe tener una keyword primaria, 3-8 secundarias, intencion, CTA y criterio de medicion.

Prioridad inicial:

1. Home EN y `/es/` alineadas a money keywords principales.
2. Problemas especificos de HLS/M3U8: `/m3u8-downloader-chrome/`.
3. Privacidad y ausencia de ads: `/chrome-video-downloader-without-ads/`.
4. Comparativas contra competidores cargados/ruidosos: `/video-downloadhelper-alternative/`.
5. Platform-tail validado: primer candidato `/vimeo-downloader-chrome/`, solo despues de QA en Vimeo publico/embed.
6. Limites honestos: DRM, protected video, why downloaders fail.

Regla de expansion:

- Head terms como `web video downloader` y `chrome video downloader` viven en home/CWS, no en muchas paginas separadas.
- Long-tail con demanda real y baja competencia puede tener pagina propia.
- Platform-tail solo se publica si el producto funciona en casos publicos y el copy puede aclarar limites sin prometer contenido privado.
- No se crean paginas para Facebook/TikTok/Instagram aunque tengan volumen alto hasta validar politicas, QA y riesgo de reviews.

Clusters iniciales:

- Clean/no ads:
  - `chrome video downloader without ads`
  - `video downloader extension no ads`
  - `clean video downloader chrome extension`

- HLS/M3U8:
  - `m3u8 downloader chrome`
  - `hls downloader chrome`
  - `download hls stream chrome extension`

- Vimeo/public embeds:
  - `vimeo downloader chrome`
  - `vimeo downloader extension`
  - `vimeo video downloader chrome`
  - `download vimeo chrome extension`

- Competitor alternative:
  - `cococut alternative`
  - `cococut alternative without ads`
  - `video downloadhelper alternative chrome`
  - `fetchv alternative`

- Limits/trust:
  - `why video downloader does not detect video`
  - `why some videos cannot be downloaded`
  - `drm video downloader limitations`

## LLM/AI Search Positioning

Objetivo:
Que Easy Stream Save sea facil de recomendar por motores de busqueda clasicos y respuestas IA.

Criterios:

- Paginas claras con preguntas/respuestas.
- Comparaciones honestas.
- Secciones explicitas de limites.
- No prometer descargas ilegales ni DRM bypass.
- Datos estructurados cuando corresponda: `SoftwareApplication`, `FAQPage`, `HowTo`.
- Pagina de privacidad clara.
- Pagina "alternatives" con tabla simple y argumentos verificables.

## Experiment Template

Cada experimento debe registrar:

- Fecha inicio.
- Area: SEO, landing, Chrome Store, pricing, onboarding, extension UX.
- Hipotesis.
- Cambio aplicado.
- Metrica primaria.
- Metrica secundaria.
- Ventana minima.
- Resultado.
- Decision: mantener, revertir, iterar.

## Experimentos Iniciales

### SEO-002: Spanish Web Video Landing

- Fecha inicio: 2026-06-19.
- Area: SEO/multilenguaje.
- Hipotesis: una landing en espanol para "descargar videos de paginas web" permite captar demanda long-tail hispana sin distraer el foco principal en ingles.
- Cambio aplicado: `landing/es/index.html` con alternates `hreflang` EN/ES y sitemap actualizado.
- Metrica primaria: impresiones organicas en Search Console para queries en espanol.
- Metrica secundaria: clicks desde `/es/` hacia pricing, limites o Chrome Web Store cuando exista.
- Ventana minima: 30 dias desde indexacion.
- Resultado: pendiente.
- Decision: pendiente.

### SEO-001: Honest Limit Page

- Fecha inicio: 2026-06-19.
- Area: SEO/trust.
- Hipotesis: una pagina clara sobre limites aumenta confianza y cubre busquedas long-tail.
- Cambio aplicado: `why-some-videos-cannot-be-downloaded.html`.
- Metrica primaria: impresiones en Search Console.
- Metrica secundaria: clicks hacia home.
- Ventana minima: 30 dias desde indexacion.
- Resultado: pendiente.
- Decision: pendiente.

### LANDING-001: Clean/no ads Positioning

- Fecha inicio: 2026-06-19.
- Area: landing/branding.
- Hipotesis: "clean Chrome video downloader without the noise" diferencia contra competidores con ads/UX cargada.
- Cambio aplicado: hero inicial.
- Metrica primaria: conversion a install cuando exista Chrome Store.
- Metrica secundaria: scroll/click hacia privacy/limits.
- Ventana minima: 14 dias tras tener trafico.
- Resultado: pendiente.
- Decision: pendiente.

## Ideas de Trafico

- Articulos tutoriales:
  - How to download an M3U8 stream in Chrome.
  - Why Chrome video downloaders miss some videos.
  - CocoCut vs Easy Stream Save.
  - Video DownloadHelper alternative for Chrome.

- Distribucion:
  - Chrome Web Store optimization.
  - Reddit solo con aportes utiles, no spam.
  - Product Hunt cuando el MVP sea estable.
  - Tutoriales cortos con capturas.
  - Paginas comparativas SEO.

## Setup Produccion SEO/Metricas

- Verificar dominio en Search Console.
- Enviar `sitemap.xml`.
- Crear propiedad GA4 para `easystreamsave.com`.
- Agregar GA4 a landing con cookie/tracking minimalista y politica actualizada.
- Conectar GA4 en Chrome Web Store Developer Dashboard tras publicar.
- Crear dashboard simple semanal:
  - impresiones Search Console;
  - clicks organicos;
  - CTR;
  - installs Chrome Store;
  - clics a install desde landing;
  - limite Free alcanzado;
  - conversion Pro.

## Criterio para el Agente

El agente puede:

- proponer keywords;
- crear drafts de paginas;
- mejorar copy;
- agregar schema;
- documentar experimentos;
- revisar competencia;
- mejorar onboarding.

El agente no debe:

- cambiar pricing publico sin aprobacion;
- publicar posts externos;
- inflar claims;
- declarar resultados sin datos suficientes.
