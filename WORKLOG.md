# Worklog - Easy Stream Save

## 2026-06-19

- Bruno compro `easystreamsave.com` en Hostinger.
- Bruno creo la cuenta `easystreamsave@gmail.com`.
- Se decidio usar Cloudflare como DNS principal y Hostinger solo como registrador.
- Cloudflare asigno nameservers:
  - `brenda.ns.cloudflare.com`
  - `elijah.ns.cloudflare.com`
- Bruno cambio nameservers en Hostinger.
- Se creo roadmap vivo del proyecto.
- Se definio que el proyecto tendra agente/cron autonomo para avanzar tareas que no requieran intervencion externa.
- Se creo cron OpenClaw `Easy Stream Save roadmap agent`.
  - ID: `ecdbe371-7b49-4b34-b466-073231d5c8b5`
  - Horario inicial: todos los dias 09:30 America/Montevideo.
  - Modo: sesion aislada, entrega resumen por Telegram a Bruno.
  - Objetivo: avanzar una unidad concreta del roadmap, actualizar archivos y pedir ayuda solo ante bloqueos externos.
- Bruno pidio transformar el roadmap en herramienta profesional: KPIs, metricas, SEO, captacion, branding, procesos y monetizacion.
- Se actualizo el cron para correr cada hora entre 04:00 y 07:00 America/Montevideo.
- Bruno confirmo que Cloudflare dio OK del dominio.
- Bruno pidio que el cron tenga criterios de avance por area: SEO, KPIs, pricing, branding, captacion, landing, producto y medicion.
- Se creo `SEO_AND_GROWTH.md` con keywords long-tail, experimentos, cadencias, KPIs y estrategia para busqueda/LLM.
- Se creo `COMPETITOR_PRICING.md` con modelos de negocio y recomendacion de pricing.
- Se verifico Git:
  - `gh` no esta instalado.
  - Acceso publico HTTPS a GitHub funciona.
  - SSH a GitHub falla por host key no verificada.

Ultimo estado conocido:
Cloudflare activo. Scaffold local creado.

Archivos creados:

- `README.md`
- `landing/index.html`
- `landing/privacy.html`
- `landing/terms.html`
- `landing/why-some-videos-cannot-be-downloaded.html`
- `landing/styles.css`
- `landing/robots.txt`
- `landing/sitemap.xml`
- `landing/assets/logo.svg`
- `landing/assets/favicon.svg`
- `extension/manifest.json`
- `extension/service-worker.js`
- `extension/popup.html`
- `extension/popup.css`
- `extension/popup.js`
- `extension/icons/icon-16.svg`
- `extension/icons/icon-32.svg`
- `extension/icons/icon-48.svg`
- `extension/icons/icon-128.svg`

Validacion:

- Manifest JSON valido.
- Landing local respondio HTTP 200 en `/` y `/privacy.html`.

Proximo:
Revisar extension cargada manualmente en Chrome y preparar deploy de landing en Cloudflare Pages/Vercel.

2026-06-19 03:11 UYT
- Se inicializo git local independiente en el proyecto.
- Se subio commit inicial a GitHub `BrunoDisabella/easystreamsave`, rama `main`, commit `485b625`.
- Cloudflare Pages ya deberia poder seleccionar `main` como rama de produccion.

2026-06-19 03:22 UYT
- Cloudflare Pages quedo desplegado en `https://easystreamsave.pages.dev`.
- Dominio root `https://easystreamsave.com` respondio OK con la landing.
- `https://www.easystreamsave.com` no quedo resuelto: seguia apuntando a Hostinger (`2.57.91.93`) en vez de Cloudflare Pages.
- Accion pendiente para retomar:
  - En Cloudflare DNS, reemplazar/eliminar registro viejo de `www` y dejar CNAME `www -> easystreamsave.pages.dev` con proxy activado.
  - Revisar/verificar email ICANN del dominio en Hostinger si aparece alerta de suspension.
- Bruno pidio pausar este punto y dejarlo pendiente en roadmap para seguir con otra cosa.

2026-06-19 03:24 UYT
- Se avanzo el siguiente punto desbloqueado: preparacion de pruebas locales de la extension.
- Se agrego deteccion por `Content-Type` en `extension/service-worker.js` para medios sin extension visible en la URL.
- Se creo `MANUAL_TEST_PLAN.md` con matriz de pruebas, fuentes seguras, criterios de aceptacion y formato de bug log.
- Se actualizo `README.md` para apuntar al plan de QA.
- Se actualizo `ROADMAP.md` marcando como listo el plan de QA y la deteccion por headers.

2026-06-19 03:27 UYT
- Se empaqueto la extension como `easy-stream-save-extension-0.1.0.zip`.
- Se valido que el ZIP tenga `manifest.json` en la raiz.
- Se envio el ZIP a Bruno por Telegram como documento para prueba manual en Chrome.

2026-06-19 03:38 UYT
- Bruno confirmo prueba real OK: la extension descargo un video de TikTok.
- Se tomo como referencia competitiva el popup con preview de video.
- Se mejoro el MVP:
  - Popup con preview visual para archivos directos MP4/WebM/MOV/M4V.
  - Fallback visual para streams HLS/MPD y audio.
  - Tamano visible cuando el servidor envia `Content-Length`.
  - Aviso claro sobre limite YouTube/DRM.
  - Description de extension mas orientada a produccion.
  - Landing actualizada a posicionamiento production MVP con foco en preview, privacidad y limites honestos.
  - Logo/favicons/iconos de extension reemplazados por marca propia play + download.
- Validacion:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.

2026-06-19 03:51 UYT
- Bruno pidio orientar monetizacion a suscripcion barata USD 1.99/mes, Free limitado, investigar competencia, trafico no solo SEO, videos tutoriales IA, multilenguaje ingles/espanol y programa para entender que valoran los usuarios.
- Capturas de Bruno mostraron bugs reales:
  - Chrome no mostraba bien el logo en `chrome://extensions`/toolbar.
  - La preview quedaba como placeholder `VID` y no renderizaba video real.
- Correcciones de producto:
  - Iconos de extension convertidos a PNG y referenciados en `manifest.json` como `icons` y `action.default_icon`.
  - Popup usa PNG del icono.
  - Deteccion de tipo ahora infiere MP4/WEBM/MOV/M3U8/MPD desde `Content-Type` cuando la URL no trae extension.
  - Preview intenta renderizar videos detectados por `Content-Type`, no solo por extension visible.
  - Se agrego limite Free local de 5 descargas/dia con `chrome.storage.local`; deteccion/preview siguen gratis.
- Documentacion agregada:
  - `MONETIZATION_AND_PAYMENTS.md`
  - `COMPETITOR_RESEARCH.md`
  - `TRAFFIC_AND_CONTENT.md`
- Roadmap actualizado con Paddle vs Stripe, Free/Pro, multilenguaje, videos IA, investigacion de reviews y mejoras de preview/icono.

2026-06-19 04:00 UYT
- Se avanzo una mejora desbloqueada de QA/producto en la extension:
  - Popup agrega boton `Open` por cada media detectada.
  - El boton abre la URL fuente en una pestana en segundo plano para diagnosticar preview/download cuando falla por CORS, headers, URLs firmadas o bloqueo del servidor.
  - Se agrego criterio de prueba en `MANUAL_TEST_PLAN.md`.
  - Se marco la tarea como lista en `ROADMAP.md`.
  - Se documento el experimento `UX-001: Open source diagnostics` con hipotesis, metricas, ventana minima y decision posterior.
- Validacion local:
  - `node --check extension/popup.js`: OK.
  - `node --check extension/service-worker.js`: OK.
  - `node -e "JSON.parse(...manifest.json...)"`: OK.

2026-06-19 04:10 UYT
- Bruno comparo contra competencia y pidio corregir preview real, mejorar icono sin fondo negro, cambiar Free a 5 descargas con reset de 30 minutos, pensar Pro USD 1.99 con ilimitado/formats/calidad y preparar analisis SEO serio antes de contenido.
- Cambios en extension:
  - Se agrego `extension/content-script.js` para detectar elementos `<video>` reales, capturar `poster`, `currentSrc` y calidad visible cuando el sitio la expone.
  - Popup ahora prioriza `posterUrl` como thumbnail, y solo usa `<video>` cuando hay fuente reproducible.
  - Botones `Open` y `Download` quedan desactivados si la URL no es HTTP/HTTPS descargable.
  - Limite Free cambio a 5 descargas por ventana de 30 minutos usando `count` + `resetAt`.
  - Version manifest subida a `0.1.2`.
  - Iconos PNG regenerados sin fondo negro dominante.
- Documentacion:
  - `MONETIZATION_AND_PAYMENTS.md` actualizado con Free 5/30min y Pro con selector de formato/calidad solo cuando la fuente exista.
  - `KEYWORD_RESEARCH_PLAN.md` creado con flujo para Google Ads MCP / Keyword Planner, clusters e inputs.
  - `SEO_AND_GROWTH.md` y `ROADMAP.md` actualizados: no publicar SEO nuevo sin analisis de keywords.
- Fuentes verificadas:
  - Google Ads MCP oficial: `https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server`
  - Google Ads API Keyword Planner: `https://developers.google.com/google-ads/api/docs/keyword-planning/generate-keyword-ideas`
  - MCP tercero Keyword Planner: `https://github.com/ncosentino/google-keyword-planner-mcp`
- Validacion local:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
# 2026-06-19 - Multilenguaje, pagos, SEO y produccion

- Uso GPT-5.5.
- Extension subida a version local `0.1.3`.
- Agregado selector EN/ES persistente en popup.
- Agregado soporte Chrome i18n con `_locales/en` y `_locales/es`.
- Textos principales del popup traducidos a ingles/espanol.
- Definida recomendacion de pagos: Paddle primero para MVP global; Stripe queda como alternativa.
- Documentada estrategia antirrobo: no secretos en extension, licencia/backend/webhooks, minificacion solo como freno casual.
- Creado `KEYWORD_RESEARCH.md` con clusters EN/ES, estrategia web + Chrome Web Store y metodo inspirado en Romuald Fons.
- Actualizados `ROADMAP.md`, `SEO_AND_GROWTH.md` y `MONETIZATION_AND_PAYMENTS.md` con tareas de produccion, metricas y proximos crons.

# 2026-06-19 - Hotfix descarga/preview y CWS SEO

- Uso GPT-5.5.
- Extension subida a version local `0.1.4`.
- Logo de extension revertido al estado anterior pedido por Bruno.
- Corregida descarga rota:
  - no se descarga `blob:` ni posters como si fueran videos;
  - no se consume cuota Free cuando la URL no es descargable;
  - `chrome.downloads.download` ahora valida callback/error antes de marcar OK;
  - se restaura media desde `chrome.storage.session` si el service worker se reinicia.
- Agregado selector de formato persistente con MP4 por defecto, Original, WebM y M3U8.
- Corregido content script para que `posterUrl` sea solo previsualizacion, no URL de descarga.
- Documentado WebExtension.net / Chrome Web Store Keyword Research Tool como fuente especifica para SEO interno de Chrome Web Store.

# 2026-06-19 - Hotfix solo video y MP4 real

- Uso GPT-5.5.
- Extension subida a version local `0.1.5`.
- Corregido problema donde Chrome proponia guardar como HTML:
  - antes de descargar se valida `Content-Type` real con HEAD/Range;
  - si la URL responde HTML/no-video, no se descarga ni consume cuota;
  - MP4 sigue siendo formato por defecto, pero no se renombra HTML como video falso.
- Reducido ruido:
  - se eliminan audios de deteccion;
  - se ignoran requests que no son `media`;
  - se filtran fragmentos de red menores a 1 MB, salvo previews reales del DOM;
  - se deduplican URLs por origen/path para bajar repetidos.
- Mensajes del popup mejorados para distinguir: URL no descargable, respuesta no-video, stream HLS/M3U8 y fallo de Chrome.
- Roadmap actualizado con investigacion pendiente de streams segmentados/merge.

# 2026-06-19 - Crons horarios temporales

- Configurados crons one-shot de OpenClaw para avanzar Easy Stream Save hoy cada hora hasta 09:00 UY:
  - 05:00 UY
  - 06:00 UY
  - 07:00 UY
  - 08:00 UY
  - 09:00 UY
- Cada cron corre en sesion aislada, avanza segun `ROADMAP.md`, documenta cambios en `WORKLOG.md`/docs relevantes y avisa a Bruno por Telegram.
- Se creo y disparo un cron de prueba separado para validar entrega por Telegram sin consumir el job de 05:00.

# 2026-06-19 - Prueba corta de cron Easy Stream Save

- Uso GPT-5.5.
- Cron de prueba ejecutado correctamente: se pudo leer `ROADMAP.md` y `WORKLOG.md`.
- Estado basico validado con `git status --short`.

# 2026-06-19 - Cron real: ficha Chrome Web Store

- Uso GPT-5.5.
- Mejora concreta realizada: se creo `CHROME_STORE_LISTING.md` como borrador operativo para publicar en Chrome Web Store.
- El documento incluye:
  - descripcion corta y larga en ingles;
  - descripcion corta y larga en espanol;
  - posicionamiento honesto sin prometer YouTube, DRM, Netflix/Disney ni descarga universal;
  - checklist de screenshots;
  - keywords recomendadas y keywords a evitar;
  - notas para privacy questionnaire segun permisos actuales de la extension;
  - checklist de QA previo a submission.
- Se actualizo `README.md` para listar el nuevo archivo.
- Se actualizo `ROADMAP.md` marcando como listas:
  - descripcion corta/larga;
  - ficha Chrome Web Store EN/ES;
  - keywords/copy base desde `KEYWORD_RESEARCH.md`.
- Validacion local:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
- Siguiente mejora recomendada: crear un archivo `SCREENSHOT_PLAN.md` o ampliar `MANUAL_TEST_PLAN.md` con una lista exacta de capturas necesarias, URLs de prueba seguras y estados del popup a capturar antes de pagar/publicar en Chrome Web Store.

# 2026-06-19 - Cron 05:00: pricing y checkout mocks

- Uso GPT-5.5.
- Mejora concreta realizada: se crearon paginas estaticas de monetizacion para preparar Paddle sin activar pagos reales:
  - `landing/pricing/index.html`
  - `landing/checkout/success/index.html`
  - `landing/checkout/cancel/index.html`
- La landing principal ahora enlaza a `/pricing/`.
- `landing/sitemap.xml` incluye `/pricing/`; las paginas de checkout llevan `noindex`.
- `landing/styles.css` suma estilos responsive para cards de pricing, notices y estados de checkout.
- `MONETIZATION_AND_PAYMENTS.md`, `README.md` y `ROADMAP.md` quedaron actualizados.
- Validacion local:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
  - servidor local `python3 -m http.server 4173`: HTTP 200 en `/`, `/pricing/`, `/checkout/success/`, `/checkout/cancel/` y `/sitemap.xml`.
- Siguiente mejora recomendada: crear `/es/` con `hreflang` EN/ES o preparar `SCREENSHOT_PLAN.md` para Chrome Web Store.

# 2026-06-19 - Cron 06:00: landing ES y hreflang

- Uso GPT-5.5.
- Mejora concreta realizada: se creo la landing estatica en espanol `landing/es/index.html` orientada a "descargar videos de paginas web" sin prometer YouTube universal, DRM bypass ni compatibilidad con plataformas protegidas.
- Se agregaron alternates `hreflang` EN/ES/x-default en la home inglesa y la nueva landing espanola.

# 2026-06-19 - Cron 08:00: QA controlada y bug HLS

- Uso GPT-5.5.
- Mejora concreta realizada: se creo `landing/qa/index.html`, una pagina noindex con fuentes publicas controladas para probar preview, Open, Download, selector de formato y capturas de Chrome Web Store sin depender de sitios aleatorios.
- Se corrigio un bug de producto en `extension/service-worker.js`: los items `M3U8/MPD` se categorizaban como `stream`, pero `isUsefulMediaItem` descartaba todo lo que no fuera `video`; ahora los streams con URL se conservan para el popup.
- Se agrego soporte para playlists HLS con `Content-Type: audio/mpegurl`, sin volver a aceptar audio comun como descarga de video.
- Se actualizaron `MANUAL_TEST_PLAN.md` y `SCREENSHOT_PLAN.md` para usar `http://127.0.0.1:4173/qa/` como fuente controlada de QA/capturas.
- Se actualizo `README.md` y `ROADMAP.md` con la nueva pagina QA local.
- La home inglesa ahora enlaza a `/es/`; la landing espanola enlaza de vuelta a `/`.
- `landing/sitemap.xml` incluye `/es/`.
- `SEO_AND_GROWTH.md` suma el experimento `SEO-002: Spanish Web Video Landing`.
- `README.md` y `ROADMAP.md` quedaron actualizados.
- Validacion local:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
  - servidor local `python3 -m http.server 4174`: HTTP 200 en `/`, `/es/`, `/pricing/` y `/sitemap.xml`.
  - `hreflang` EN/ES confirmado en home y `/es/`; sitemap incluye `https://easystreamsave.com/es/`.
- Siguiente mejora recomendada: crear `/cococut-alternative/` o preparar `SCREENSHOT_PLAN.md` con capturas exactas para Chrome Web Store.

# 2026-06-19 - Cron 07:00: plan de screenshots CWS

- Uso GPT-5.5.
- Mejora concreta realizada: se creo `SCREENSHOT_PLAN.md` para preparar screenshots reales de Chrome Web Store sin usar contenido protegido ni prometer features no implementadas.
- El plan define:
  - reglas de contenido seguro;
  - tamanos recomendados 1280x800 y 640x400;
  - set de 7 capturas CWS;
  - fuentes publicas sugeridas;
  - checklist de captura;
  - criterios de aceptacion antes de pagar/subir a Chrome Web Store.
- Se enlazo el plan desde `README.md`, `CHROME_STORE_LISTING.md` y `MANUAL_TEST_PLAN.md`.
- `ROADMAP.md` ahora separa "plan operativo de screenshots" de "capturar screenshots reales".
- Validacion local:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
- Siguiente mejora recomendada: ejecutar capturas reales desde `SCREENSHOT_PLAN.md` o crear `/cococut-alternative/` como primera pagina SEO long-tail.

# 2026-06-19 - Cron 09:00: hotfix descarga honesta y QA

- Uso GPT-5.5.
- Extension subida a version local `0.1.6`.
- Mejora concreta realizada en `extension/service-worker.js`:
  - la validacion de descarga ahora tolera mejor respuestas con `application/octet-stream`/`binary/octet-stream` cuando la URL permite inferir video o stream;
  - si el servidor devuelve error HTTP en `HEAD`/Range, la descarga falla con razon clara en vez de guardar basura;
  - el selector MP4 ya no fuerza extension falsa cuando la fuente real es WebM/MOV/HLS/DASH; el nombre descargado conserva la extension real detectada.
- Se actualizo `MANUAL_TEST_PLAN.md` con un caso explicito de "format honesty".
- Se actualizo `ROADMAP.md` marcando como listo evitar conversiones simuladas por extension de archivo.
- Validacion local:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
  - servidor local `python3 -m http.server 4175`: HTTP 200 en `/qa/`.
- Siguiente mejora recomendada: ejecutar QA visual real en Chrome con `landing/qa/`, registrar resultados en `MANUAL_TEST_PLAN.md` y capturar screenshots CWS.

# 2026-06-19 - QA local y paquete 0.1.6

- Uso GPT-5.5.
- Se trabajo sin crons, a pedido de Bruno.
- Validacion estatica:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
- Validacion de landing local:
  - servidor `python3 -m http.server 4173` en `landing/`;
  - HTTP 200 en `/`, `/qa/`, `/es/`, `/pricing/`, `/sitemap.xml`.
- Validacion de fuentes QA:
  - MP4 publico MDN responde `video/mp4`;
  - WebM publico MDN responde `video/webm`;
  - HLS publico Mux responde `audio/mpegurl`.
- Smoke QA en Chromium headless:
  - extension cargada desde `extension/`;
  - version registrada `0.1.6`;
  - permisos esperados activos: `downloads`, `storage`, `tabs`, `webRequest`, `<all_urls>`;
  - service worker MV3 inicio al menos una vez.
- Limitacion: no se pudo automatizar clicks del popup ni dialogo de descarga en headless porque no hay Playwright/CDP WebSocket client instalado y el service worker MV3 duerme normalmente.
- Se actualizo `MANUAL_TEST_PLAN.md` con los resultados.
- Se genero `easy-stream-save-extension-0.1.6.zip` desde la carpeta `extension/` usando Python `zipfile` porque el binario `zip` no esta instalado en el entorno.
- Validacion del paquete:
  - `manifest.json` esta en la raiz del ZIP;
  - version del manifest: `0.1.6`;
  - incluye service worker, content script, popup, locales EN/ES e iconos.
- Siguiente paso: enviar el ZIP a Bruno para QA manual interactivo.

# 2026-06-19 - Hotfix TikTok falsos positivos 0.1.7

- Uso GPT-5.5.
- Bruno reporto con capturas que la competencia detectaba un video funcional de TikTok de ~12 MB, mientras Easy Stream Save mostraba muchos candidatos y permitia descargar `playback1.mp4` de ~193 KB que no abria.
- Causa probable corregida:
  - `onBeforeRequest` guardaba URLs `.mp4` apenas aparecian, sin esperar `Content-Type`/tamano;
  - si despues `onHeadersReceived` veia que eran chicas o inutiles, el candidato viejo podia quedar en la lista.
- Cambios en `extension/service-worker.js`:
  - los `.mp4`/WebM/MOV directos ya no se agregan a ciegas desde `onBeforeRequest`;
  - `onBeforeRequest` conserva solo playlists/streams explicitos (`M3U8`/`MPD`);
  - si headers prueban que un candidato no es util, se remueve de la lista;
  - se lee tamano desde `Content-Length` y tambien desde `Content-Range`;
  - la validacion de descarga rechaza videos directos menores a 1 MB para evitar fragmentos/placeholder.
- Cambios en `extension/popup.js`:
  - nuevo mensaje EN/ES para fuente demasiado chica.
- Extension subida a version local `0.1.7`.
- Se actualizo `ROADMAP.md` y `MANUAL_TEST_PLAN.md`.
- Validacion:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
  - prueba logica aislada: rechaza `playback1.mp4` de 193 KB, rechaza `.mp4` sin headers y acepta candidato de 12.2 MB.
- Siguiente paso: Bruno debe cargar `0.1.7` y repetir el mismo TikTok. Resultado esperado: ocultar `playback1.mp4` chico y priorizar el video grande si la pagina lo entrega con headers de video.

# 2026-06-19 - Mejora TikTok descarga y preview 0.1.8

- Uso GPT-5.5.
- Bruno probo `0.1.7` y reporto:
  - ahora parecen detectarse los dos videos correctos;
  - no logra descargarlos;
  - las previsualizaciones siguen sin verse.
- Investigacion tecnica breve:
  - Chrome Extensions permite observar/analisar trafico con `chrome.webRequest`;
  - Chrome Extensions permite iniciar descargas programaticas con `chrome.downloads`;
  - en MV3, blobs/streams protegidos requieren capturar URL real o implementar procesamiento/ensamblado aparte; no conviene prometer descarga universal ni YouTube/DRM.
- Cambios en `extension/service-worker.js`:
  - deteccion por headers de video ya no queda limitada a `details.type === "media"`;
  - se capturan candidatos de video entregados por `fetch`/`xmlhttprequest` si los headers exponen `video/*` o playlist valida;
  - se guardan headers seguros de request (`Referer`, `Origin`) para reutilizarlos al descargar si Chrome lo permite;
  - si el candidato ya fue validado por `webRequest`, no se fuerza un segundo `HEAD` que TikTok/CDN puede rechazar;
  - los items de red heredan poster/preview/nombre/calidad de la pagina cuando existe.
- Cambios en `extension/content-script.js`:
  - preview fallback con `poster`, `og:image` y `twitter:image`.
- Extension subida a version local `0.1.8`.
- Validacion:
  - `node --check extension/service-worker.js`: OK.
  - `node --check extension/popup.js`: OK.
  - `node --check extension/content-script.js`: OK.
  - parse JSON de `extension/manifest.json` y locales EN/ES: OK.
- Siguiente prueba manual: cargar `0.1.8`, abrir el mismo TikTok, reproducir el video 2-3 segundos, refrescar popup, probar preview y descarga del candidato mayor.

# 2026-06-19 - Facebook buttons, playable previews y logo 0.1.9

- Uso GPT-5.5.
- Bruno reporto:
  - en Facebook la deteccion mejoro y aparecieron miniaturas;
  - algunos botones de descarga siguen deshabilitados;
  - quiere que el preview pueda reproducir video cuando sea posible;
  - paso una nueva imagen de logo para aplicarla a web y extension;
  - pregunto si conviene descargar extensiones de competencia para analizarlas.
- Investigacion usada:
  - `chrome.webRequest` permite observar/analisar trafico de una pestana.
  - `chrome.downloads` permite iniciar descargas programaticas desde una extension con permiso `downloads`.
  - En MV3 `webRequest` no entrega cuerpos de respuesta; para blobs/HLS/segmentos hay que capturar URL real o implementar ensamblado aparte.
- Cambios en extension:
  - popup resuelve acciones con la mejor URL directa disponible;
  - botones deshabilitados ahora explican que no hay URL directa y que hay que reproducir unos segundos/refrescar;
  - preview usa `<video controls>` cuando hay URL directa reproducible;
  - service worker asocia miniaturas/page previews con candidatos de red por dominio para reducir cards sin URL.
- Cambios de marca:
  - logo canonico nuevo guardado en `landing/assets/logo.svg`;
  - favicon web regenerado en `landing/assets/favicon.png` y `landing/assets/favicon.svg`;
  - iconos de extension regenerados en `extension/icons/icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-128.png` y SVGs.
- Extension subida a version local `0.1.9`.
- Recomendacion sobre competencia:
  - si Bruno descarga ZIP/CRX de competidores, se pueden inspeccionar manifest, permisos, nombres de scripts, estructura y patrones visibles;
  - no se debe depender de romper ofuscacion, evadir protecciones ni copiar codigo propietario.
- Siguiente QA:
  - TikTok: reproducir 2-3 segundos, actualizar popup, probar candidato grande.
  - Facebook Reels: reproducir 2-3 segundos, verificar que miniatura y URL descargable queden asociadas.
  - Si sigue sin URL directa, siguiente mejora real es downloader interno para HLS/blob/segmentos con offscreen/worker.

# 2026-06-19 - Analisis competencia y mejoras 0.1.10

- Uso GPT-5.5.
- Bruno paso dos ZIP de competencia para inspeccion local.
- Se inspeccionaron manifests, permisos, estructura y patrones visibles:
  - Video Downloader Professional `2.1.7`;
  - Video DownloadHelper `10.2.71.2`.
- No se rompio ofuscacion ni se copio codigo propietario.
- Hallazgos:
  - ambos usan `webRequest`/headers como fuente fuerte;
  - usan `Content-Length`/`Content-Range`;
  - separan streams/segmentos de videos directos;
  - el competidor grande usa scripts especificos por sitio y WASM/libav para procesamiento avanzado.
- Cambios aplicados:
  - `service-worker.js` normaliza URLs con parametros de rango (`range`, `bytestart`, `byteend`, `start`, `end`) cuando headers prueban video grande;
  - `content-script.js` agrega escaneo de `og:video`, `og:video:url`, `og:video:secure_url`, `twitter:player:stream` y links de video;
  - `service-worker.js` conserva candidatos `page-structured` con URL directa aunque todavia no tengan tamano;
  - `popup.js` si falla preview `<video>`, cae a poster/thumbnail antes de mostrar badge generico.
- Documento nuevo: `COMPETITOR_REVERSE_ENGINEERING.md`.
- Extension subida a version local `0.1.10`.

# 2026-06-19 - Adapters TikTok/Facebook y HLS MVP 0.1.11

- Uso GPT-5.5.
- Bruno pidio avanzar con la mejora grande: adapter especifico TikTok/Facebook + downloader HLS/segmentos.
- Limite aplicado:
  - no se rompio ofuscacion de competencia;
  - no se copio codigo propietario;
  - se usaron solo aprendizajes de arquitectura/patrones visibles.
- Cambios en `extension/content-script.js`:
  - adapter `adapter-tiktok` inicial;
  - adapter `adapter-facebook` inicial;
  - extraccion defensiva de URLs desde HTML/JSON embebido;
  - asociacion de poster `og:image` / `twitter:image` / imagenes visibles.
- Cambios en `extension/service-worker.js`:
  - acepta items de adapters como candidatos utiles;
  - downloader HLS MVP para playlists `.m3u8` no cifradas;
  - selecciona variante master de mayor `BANDWIDTH`;
  - descarga hasta 180 segmentos y concatena en `.ts`;
  - bloquea HLS cifrado y streams demasiado grandes con mensajes claros.
- Cambios en `extension/popup.js`:
  - mensajes EN/ES para HLS cifrado y demasiados segmentos.
- Extension subida a version local `0.1.11`.
# 2026-06-19 - 0.1.12 branding y free limit

- Bruno pidio revisar si 5 descargas cada 30 minutos era poco, mejorar logo/icono al estilo referencia y confirmar web ES/EN.
- Se investigo mercado: competidores como CocoCut comunican core gratis amplio/ilimitado y empujan Pro por batch/calidad/HLS avanzado; limitar demasiado temprano puede matar activacion.
- Decision MVP: Free pasa de 5 a 10 descargas cada 30 minutos, manteniendo deteccion/preview gratis.
- Se redibujaron `landing/assets/logo.svg`, `landing/assets/favicon.png`, `landing/assets/favicon.svg` y `extension/icons/icon-16/32/48/128` en PNG+SVG.
- Nuevo icono: play + flecha de descarga, gradiente aqua/azul, PNG transparente para toolbar y favicon con fondo oscuro controlado.
- Se actualizo `MONETIZATION_AND_PAYMENTS.md`, `ROADMAP.md`, pricing y checkout cancel.
- Version extension: `0.1.12`.
- Validacion: `node --check` en JS, JSON manifest/locales y verificacion PIL de PNG OK.

# 2026-06-19 - 0.1.13 Facebook download/header fix

- Bruno reporto en Facebook dos problemas: error "parece un fragmento chico" y luego "Unsafe request header name"; ademas pidio quitar boton `Abrir`.
- Causa directa del segundo error: se estaba pasando `Origin` en `chrome.downloads.download(options.headers)`, y Chrome lo rechaza como header inseguro.
- Cambio: se capturan `Referer/Origin` para diagnostico/fetch interno, pero descargas directas solo reciben `Referer`.
- UI popup: se elimina `Abrir`, queda una sola accion `Descargar` mas compacta y minimalista.
- Layout: popup mas angosto, filas de 2 columnas, miniatura menor y boton pill alineado abajo del detalle.
- Dedupe: si varias fuentes de Facebook/TikTok comparten misma miniatura y host, se fusionan para reducir tarjetas repetidas del mismo video.
- Version extension: `0.1.13`.
- Validacion: `node --check` y JSON manifest OK.
