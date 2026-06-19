# Keyword Research - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Veredicto

Hay que trabajar dos superficies:

- Web SEO: `easystreamsave.com` con paginas indexables, comparativas y tutoriales.
- Chrome Web Store SEO: titulo, descripcion, screenshots, categorias y keywords dentro de la ficha.

La ficha de Chrome Web Store sola no alcanza. Nos puede traer installs, pero no nos da una arquitectura SEO completa ni el mismo control de contenido, comparativas, schema, Search Console y landings por idioma.

Research experto completo:

- Ver `KEYWORD_RESEARCH_EXPERT_2026.md` para metodologia, volumen real Google Ads, clusters, arquitectura de paginas, Chrome Web Store SEO, keywords negativas y prioridades.

## Acceso a Datos

Estado actual:

- Maton tiene `google-search-console`, `google-analytics-admin`, `google-analytics-data` y `google-ads` como apps soportadas.
- Search Console via Maton esta operativo:
  - `google-search-console/webmasters/v3/sites` devuelve `sc-domain:easystreamsave.com` con `permissionLevel=siteOwner`.
  - `searchAnalytics/query` para `sc-domain:easystreamsave.com` responde 200; todavia sin filas utiles por dominio nuevo.
  - `sitemaps` responde 200, pero aun devuelve `{}`.
- Google Analytics Admin via Maton responde `{}`: no hay cuentas/propiedades GA4 visibles para la cuenta conectada.
- Google Ads via Maton esta operativo para Keyword Planner:
  - `google-ads/v22/customers:listAccessibleCustomers` devuelve `customers/1808022852`.
  - `KeywordPlanIdeaService.GenerateKeywordIdeas` responde 200 con volumen, competencia y CPC aproximado.
- WebExtension.net / Chrome Web Store Keyword Research Tool es util para SEO interno de Chrome Web Store: permite analizar keywords por cantidad de extensiones, usuarios, rating, reviews y fecha de tracking.

Conclusion:

- Ya se puede hacer keyword research real con Google Ads/Keyword Planner via Maton.
- Search Console ya esta conectado para medir impresiones/clicks cuando Google empiece a registrar datos.
- Para Analytics falta crear/conectar una propiedad GA4 de `easystreamsave.com` y luego exponerla a la cuenta OAuth de Maton.
- Exportar resultados a Google Sheets puede servir para que Maton/Sheets los lea y el agente priorice, pero ya no bloquea el research inicial.
- Para Chrome Web Store, usar WebExtension.net como fuente especifica de tienda junto con busqueda manual en CWS, reviews de competidores y Chrome-Stats/Extension Ranker si hace falta.

## Maton / Google Setup Pendiente

Para habilitar keyword research real con datos:

1. Search Console:
   - Listo: propiedad `sc-domain:easystreamsave.com` verificada y visible via Maton.
   - Pendiente: enviar sitemap si no aparece automaticamente y esperar datos reales de impresiones/clicks.
2. Google Analytics:
   - Crear propiedad GA4 para `easystreamsave.com`.
   - Instalar tag en landing solo si aceptamos medir page views/clicks y actualizar Privacy Policy si corresponde.
   - Reintentar `google-analytics-admin/v1beta/accountSummaries`.
3. Google Ads:
   - Listo: customer visible `customers/1808022852`.
   - Listo: `KeywordPlanIdeaService.GenerateKeywordIdeas` funciona via `google-ads/v22`.
   - Listo: batch EN/ES ejecutado y sintetizado en `KEYWORD_RESEARCH_EXPERT_2026.md`.

Fuentes oficiales verificadas:

- Search Console requiere verificar propiedad del sitio/dominio.
- Google Ads API Keyword Planning usa `KeywordPlanIdeaService.GenerateKeywordIdeas` con seeds de keywords o URL.
- Google Analytics Admin API `accountSummaries.list` lista cuentas y propiedades GA4 visibles para el usuario autenticado.

## Chrome Web Store SEO Tooling

Fuentes practicas:

- WebExtension.net keywords: `https://webextension.net/keywords`
- WebExtension.net keyword analysis: `https://webextension.net/tools/webstore-keyword-analysis`
- Extension Ranker CWS SEO guide: `https://extensionranker.com/chrome-web-store-seo`
- Chrome Web Store search manual en incognito por pais/idioma.

Uso recomendado:

1. Cargar seeds: `video downloader`, `chrome video downloader`, `m3u8 downloader`, `hls downloader`, `cococut alternative`, `download web video`.
2. Priorizar keywords con demanda demostrada por usuarios totales, pero competencia moderada por cantidad de extensiones.
3. Abrir las extensiones top por keyword y extraer: titulo, descripcion corta, screenshots, reviews negativas y promesas repetidas.
4. Separar keywords para ficha CWS de keywords para web. CWS debe ser directo y conversional; web puede cubrir tutoriales, comparativas y problemas.
5. Repetir la revision cada 14 dias tras publicar para ajustar titulo/subtitulo/descripcion con datos reales de ranking e installs.

Regla:
No meter keywords de alto volumen si atraen trafico que exige YouTube/DRM/universal download. Eso sube installs malos y baja reviews.

## Metodo Inspirado en Romuald Fons

Aplicacion practica al proyecto:

1. Empezar por intencion de negocio, no por volumen bruto.
2. Separar keywords transaccionales, comparativas, tutoriales y problemas.
3. Crear arquitectura por clusters: cada cluster con una pagina fuerte y articulos satelite.
4. Atacar long-tail primero para conseguir primeras impresiones y aprendizaje.
5. Usar contenido directo, con respuesta clara, tablas simples, FAQ y limites honestos.
6. Medir Search Console antes de seguir creando paginas masivamente.

Regla:
No perseguir keywords tipo YouTube/DRM/universal downloader si fuerzan una promesa falsa o riesgosa para Chrome Web Store.

## Clusters Iniciales

### EN - Money / Chrome Store

- `chrome video downloader`
- `video downloader extension`
- `video downloader for chrome`
- `web video downloader chrome`
- `online video downloader extension`

Uso:
Ficha Chrome Web Store, home, metadata, screenshots.

### EN - Clean / No Ads

- `chrome video downloader without ads`
- `video downloader extension no ads`
- `clean video downloader chrome extension`
- `video downloader without popups`

Uso:
Home y pagina comparativa contra extensiones con UX cargada.

### EN - Competitor Alternative

- `cococut alternative`
- `cococut alternative without ads`
- `fetchv alternative`
- `video downloadhelper alternative chrome`

Uso:
Paginas comparativas honestas. No atacar marcas con claims no verificados; comparar por UX, privacidad, limites y precio.

### EN - HLS / M3U8

- `m3u8 downloader chrome`
- `hls downloader chrome`
- `download hls stream chrome extension`
- `m3u8 video downloader extension`

Uso:
Pagina tutorial y feature Pro futura solo cuando el merge/flujo avanzado exista.

### EN - Problems / Trust

- `why video downloader does not detect video`
- `why some videos cannot be downloaded`
- `protected video cannot download`
- `chrome video downloader not working`

Uso:
Paginas educativas que captan trafico y reducen soporte.

### ES - Inicial

- `descargar videos de paginas web`
- `descargador de videos chrome`
- `extension para descargar videos`
- `descargar videos m3u8 chrome`
- `alternativa a cococut`
- `por que no puedo descargar un video`

Uso:
Landing `/es/`, ficha Chrome Web Store en espanol, primeros tutoriales.

## Prioridad de Paginas

1. `/` - English home: clean Chrome video downloader.
2. `/es/` - Spanish home: descargador de videos para Chrome.
3. `/cococut-alternative/` - comparativa honesta.
4. `/m3u8-downloader-chrome/` - tutorial HLS/M3U8.
5. `/why-some-videos-cannot-be-downloaded.html` - ya existe; ampliar con FAQ/schema.
6. `/chrome-video-downloader-without-ads/` - posicionamiento clean/no ads.

## Keyword Research Inicial Sin Volumen

Prioridad 1 - publicar o preparar primero:

| Keyword | Idioma | Intencion | Pagina sugerida | Decision |
| --- | --- | --- | --- | --- |
| `chrome video downloader without ads` | EN | instalacion/comparativa | `/chrome-video-downloader-without-ads/` | Alta, encaja con diferencial limpio |
| `cococut alternative` | EN | comparativa | `/cococut-alternative/` | Alta, hacer comparacion honesta |
| `m3u8 downloader chrome` | EN | tecnica/pro | `/m3u8-downloader-chrome/` | Alta, aclarar HLS no cifrado |
| `hls downloader chrome` | EN | tecnica/pro | `/m3u8-downloader-chrome/` | Alta, cluster con M3U8 |
| `video downloader extension no ads` | EN | instalacion | `/chrome-video-downloader-without-ads/` | Alta |
| `download video from website chrome` | EN | tutorial | `/download/` o articulo | Media, puede atraer casos no soportados |
| `why video downloader does not detect video` | EN | problema/soporte | `/why-some-videos-cannot-be-downloaded.html` | Alta para soporte y confianza |
| `download protected video chrome limitation` | EN | problema/riesgo | `/why-some-videos-cannot-be-downloaded.html` | Media, usar para educar sin prometer bypass |
| `descargar videos de paginas web` | ES | instalacion | `/es/` | Alta ES |
| `extension para descargar videos chrome` | ES | instalacion | `/es/` o `/es/download/` | Alta ES |
| `alternativa a cococut` | ES | comparativa | `/es/cococut-alternative/` futuro | Media, despues de pagina EN |
| `descargar m3u8 chrome` | ES | tecnica/pro | `/es/m3u8-downloader-chrome/` futuro | Media |

Prioridad 2 - esperar datos/volumen:

- `video downloadhelper alternative chrome`
- `fetchv alternative`
- `download facebook video chrome extension`
- `download tiktok video chrome extension`
- `web video downloader extension`
- `save streaming video chrome`
- `download hls stream chrome extension`

Descartar o usar solo en copy de limitaciones:

- `youtube downloader`
- `netflix downloader`
- `download drm video`
- `download protected course video`
- `download any video from any website`

Razon: atraen usuarios que esperan bypass/universal download y pueden generar malas reviews o problemas de Chrome Web Store.

## Medicion

Instalar/configurar:

- Google Search Console: dominio completo.
- GA4 en landing: medir page_view, outbound/install click, pricing click.
- Chrome Web Store GA4: conectar desde Developer Dashboard cuando la extension este publicada.
- Extension analytics: evitar tracking invasivo. Si se implementa, usar opt-in o eventos agregados minimos documentados en Privacy Policy.

Eventos recomendados:

- Landing: `install_click`, `pricing_click`, `language_switch`, `limits_page_click`.
- Extension local/remoto futuro: `first_media_detected`, `first_download_started`, `free_limit_reached`, `pro_cta_clicked`.

## Pendiente Para Volumen Real

Cuando haya acceso Google Ads:

1. Entrar en modo experto.
2. Abrir Keyword Planner.
3. Cargar seeds EN/ES de este archivo.
4. Exportar CSV/Google Sheet con volumen, competencia, CPC low/high.
5. Priorizar por: intencion comercial > baja dificultad > volumen > alineacion con politicas.

Seeds recomendados para Google Ads API/Keyword Planner:

- `chrome video downloader`
- `video downloader extension`
- `chrome video downloader without ads`
- `m3u8 downloader chrome`
- `hls downloader chrome`
- `cococut alternative`
- `fetchv alternative`
- `video downloadhelper alternative`
- `download video from website chrome`
- `why video downloader does not detect video`
- `descargar videos de paginas web`
- `extension para descargar videos chrome`
- `descargar m3u8 chrome`
