# Keyword Research Plan - Easy Stream Save

Ultima actualizacion: 2026-06-19

## Decision

No empezar SEO escribiendo articulos sueltos. Primero crear un analisis de palabras clave con volumen, intencion, dificultad aproximada y clusters.

## Fuentes a Usar

Prioridad 1: datos reales.

- Google Keyword Planner / Google Ads API.
- Google Search Console cuando el dominio tenga impresiones.
- Chrome Web Store autocomplete y competidores.
- Google SERP manual: People Also Ask, related searches, top pages.

Prioridad 2: senales de comunidad.

- Reviews de Chrome Web Store de CocoCut, FetchV, Video DownloadHelper y alternativas.
- Reddit/foros donde usuarios pidan video downloader sin paywall, sin ads o con soporte M3U8.
- YouTube search/autocomplete para tutoriales.

## Google Keyword Planner / MCP

Hallazgo 2026-06-19:

- Google tiene MCP oficial para Google Ads: `https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server`
- Keyword Planner en Google Ads API usa `KeywordPlanIdeaService.GenerateKeywordIdeas`: `https://developers.google.com/google-ads/api/docs/keyword-planning/generate-keyword-ideas`
- Tambien existe MCP especifico de terceros para Keyword Planner: `https://github.com/ncosentino/google-keyword-planner-mcp`
- La comunidad usa MCP/DataForSEO/Ahrefs/Google Ads para automatizar keyword research con Claude/OpenClaw, pero requiere credenciales y cuenta externa.

Como usarlo en OpenClaw:

1. Instalar/configurar un MCP de Google Ads o Keyword Planner solo cuando Bruno autorice conectar la cuenta.
2. Cargar credenciales sin imprimir secretos.
3. Ejecutar research read-only: ideas, volumen historico, competencia y CPC aproximado.
4. Exportar CSV/JSON local.
5. Priorizar contenido por oportunidad, no por intuicion.

Bloqueo actual:

- Falta acceso/credenciales a Google Ads/Keyword Planner.
- No conviene pedirlo hasta que terminemos el core de preview/deteccion.

## Clusters Iniciales a Validar

### Ingles

- `chrome video downloader without ads`
- `video downloader extension no ads`
- `download video from website chrome`
- `m3u8 downloader chrome`
- `hls downloader chrome`
- `cococut alternative`
- `fetchv alternative`
- `video downloadhelper alternative`
- `why video downloader does not detect video`
- `download protected video chrome limitation`

### Espanol

- `descargar video de una pagina web`
- `descargar videos desde chrome`
- `extension para descargar videos chrome`
- `descargar m3u8 chrome`
- `alternativa a cococut`
- `por que no detecta el video`

## Score de Priorizacion

Puntuar cada keyword 1-5:

- Intencion de instalacion: el usuario quiere una extension ahora.
- Encaje con promesa honesta: no DRM, no YouTube universal.
- Competencia SERP: cuantos gigantes ocupan la pagina.
- Facilidad de crear tutorial real con nuestro producto.
- Potencial Pro: M3U8, batch, calidad/formatos, historial.

Ordenar por:

`oportunidad = intencion + encaje + tutorial + potencial_pro - competencia`

## Primer Entregable SEO

Crear `KEYWORD_RESEARCH.md` con:

- 50-100 keywords.
- Cluster.
- Idioma.
- Intencion.
- Pagina sugerida.
- Volumen si tenemos Keyword Planner.
- Dificultad manual si no tenemos API.
- Decision: publicar ahora, esperar datos, descartar.

No publicar nuevas paginas SEO hasta tener ese archivo.
