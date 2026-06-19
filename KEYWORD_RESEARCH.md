# Keyword Research - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Veredicto

Hay que trabajar dos superficies:

- Web SEO: `easystreamsave.com` con paginas indexables, comparativas y tutoriales.
- Chrome Web Store SEO: titulo, descripcion, screenshots, categorias y keywords dentro de la ficha.

La ficha de Chrome Web Store sola no alcanza. Nos puede traer installs, pero no nos da una arquitectura SEO completa ni el mismo control de contenido, comparativas, schema, Search Console y landings por idioma.

## Acceso a Datos

Estado actual:

- Maton documentado en este workspace tiene Gmail, Calendar y Sheets.
- No hay conector Google Ads/Keyword Planner cargado.
- Para volumen real necesitamos una cuenta Google Ads en modo experto con Keyword Planner o API Google Ads habilitada.
- WebExtension.net / Chrome Web Store Keyword Research Tool es util para SEO interno de Chrome Web Store: permite analizar keywords por cantidad de extensiones, usuarios, rating, reviews y fecha de tracking.

Conclusion:

- Puedo hacer buen keyword research inicial con SERP, competidores, autocomplete, reviews y clusters.
- Para volumen/CPC/dificultad real falta acceso Google Ads, Ahrefs, Semrush, DataForSEO o similar.
- Cuando Bruno habilite Google Ads, exportar los resultados a Google Sheets sirve para que Maton/Sheets los lea y el agente priorice.
- Para Chrome Web Store, usar WebExtension.net como fuente especifica de tienda junto con busqueda manual en CWS, reviews de competidores y Chrome-Stats/Extension Ranker si hace falta.

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
