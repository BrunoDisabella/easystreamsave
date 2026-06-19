# Roadmap - Easy Stream Save

Ultima actualizacion: 2026-06-19
Objetivo principal: monetizar una extension Chrome limpia para descarga/deteccion de videos web, empezando por mercado ingles.

## Reglas de Ejecucion

- Todo avance importante debe actualizar `BUSINESS_PLAN.md`.
- Toda sesion de trabajo debe agregar entrada en `WORKLOG.md`.
- Monetizacion y pagos viven en `MONETIZATION_AND_PAYMENTS.md`.
- Investigacion de competencia vive en `COMPETITOR_RESEARCH.md`.
- Trafico, contenido y multilenguaje viven en `TRAFFIC_AND_CONTENT.md`.
- El agente autonomo debe leer `AGENT_BRIEF.md`, `ROADMAP.md`, `WORKLOG.md` y `BUSINESS_PLAN.md` antes de trabajar.
- El roadmap debe evolucionar con objetivos medibles, KPIs, SEO, captacion, branding, procesos y monetizacion.
- Cada iniciativa importante debe tener criterio de exito, ventana minima de medicion y decision posterior.
- No ejecutar acciones externas que requieran cuenta, pago, publicacion, envio de emails o cambios DNS sin confirmacion de Bruno.
- Si una tarea queda bloqueada por acceso, pago, cuenta, decision de producto o captura visual, avisar a Bruno con pedido concreto.
- Mantener promesa honesta: no DRM bypass, no YouTube universal, no evasion de restricciones.

## Fase 0 - Base del Proyecto

Estado: en curso.

Tareas:

- [x] Definir marca operativa: Easy Stream Save.
- [x] Comprar dominio: `easystreamsave.com`.
- [x] Crear cuenta Google: `easystreamsave@gmail.com`.
- [x] Elegir DNS: Cloudflare.
- [x] Configurar nameservers Cloudflare en Hostinger.
- [x] Confirmar activacion de Cloudflare y propagacion DNS.
- [x] Crear cron/agente autonomo diario para avance del roadmap.
- [x] Crear repositorio local del proyecto.
- [x] Crear estructura base: extension, landing, docs.
- [x] Crear logo/favicons iniciales.
- [x] Guardar logo canonico nuevo de la app.
  - Fuente SVG: `landing/assets/logo.svg`.
  - Favicon web: `landing/assets/favicon.png` y `landing/assets/favicon.svg`.
  - Iconos extension: `extension/icons/icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-128.png` y SVGs equivalentes.
- [x] Ajustar logo al estilo play/download limpio tipo referencia de Bruno, legible en toolbar Chrome.

## Fase 1 - Landing y Legal Minimo

Estado: produccion MVP desplegable, con `www` pendiente.

Objetivo:
Tener `easystreamsave.com` listo para validar marca, SEO inicial y futuras politicas de Chrome Web Store.

Tareas:

- [x] Home en ingles.
- [x] Privacy Policy.
- [x] Terms / Disclaimer.
- [x] Pagina "Why some videos cannot be downloaded".
- [x] Sitemap.
- [x] Enviar sitemap a Search Console.
- [x] Robots.txt.
- [x] Deploy en Cloudflare Pages.
- [x] Conectar dominio root `easystreamsave.com`.
- [x] Mejorar landing a MVP de produccion con foco en preview, privacidad, limites reales y marca consistente.
- [x] Actualizar logo/favicons.
- [x] Crear landing `/es/`.
- [x] Agregar `hreflang` ingles/espanol cuando `/es/` exista.
- [x] Crear `/pricing/`, `/checkout/success/` y `/checkout/cancel/` como paginas listas para Paddle.
- [ ] Resolver `www.easystreamsave.com`: reemplazar registro viejo de Hostinger por CNAME a `easystreamsave.pages.dev`.
- [ ] Completar/verificar estado ICANN/email del dominio en Hostinger para evitar suspension futura.
- [x] Verificar Search Console como `sc-domain:easystreamsave.com` via Maton.

## Fase 2 - Extension MVP Local

Estado: MVP local funcional, pendiente QA amplio.

Objetivo:
Tener una extension MV3 instalada manualmente que detecte medios reales en paginas no DRM.

Tareas:

- [x] Manifest V3.
- [x] Service worker.
- [x] Permisos minimos: `downloads`, `storage`, `tabs`, `webRequest` donde aplique.
- [x] Deteccion MP4/WebM/M3U8/MPD.
- [x] Estado por pestana.
- [x] Badge con cantidad detectada.
- [x] Popup limpio en ingles.
- [x] Descarga directa con `chrome.downloads`.
- [x] Boton limpiar lista.
- [x] Manejo basico de duplicados.
- [x] Deteccion por `Content-Type` para medios sin extension visible.
- [x] Preview visual para archivos directos MP4/WebM/MOV/M4V cuando Chrome permite cargar metadata.
- [x] Corregir preview para videos detectados por `Content-Type` aunque la URL no tenga extension visible.
- [x] Mostrar tamano cuando el servidor informa `Content-Length`.
- [x] Branding/icono de extension actualizado.
- [x] Cambiar iconos de extension a PNG para toolbar/chrome://extensions.
- [x] Quitar fondo negro dominante del icono de extension.
- [x] Agregar content script para capturar posters/currentSrc de videos de pagina y mejorar thumbnails.
- [x] Cambiar Free MVP a 10 descargas cada 30 minutos.
- [x] Mensaje claro sobre limite YouTube/DRM en popup.
- [x] Plan de QA manual para Chrome.
- [ ] Tests manuales en 10-20 sitios no DRM.
- [ ] Validar preview real en TikTok y sitios con poster/currentSrc.
- [x] Crear pagina QA local controlada para preview/download/screenshots sin depender de sitios aleatorios.
- [x] Agregar boton "Open source URL" para diagnostico de preview/download.
- [x] Agregar selector multilenguaje EN/ES en popup.
- [x] Preparar `manifest.json` con Chrome i18n (`_locales/en`, `_locales/es`).
- [x] Revertir logo de extension al estilo anterior.
- [x] Agregar selector de formato con MP4 por defecto, Original, WebM y M3U8.
- [x] Evitar descargas invalidas desde posters/blob URLs y restaurar media desde `chrome.storage.session`.
- [x] Filtrar ruido: solo video, sin audio, sin requests no-media y sin fragmentos chicos de red.
- [x] Validar `Content-Type` real antes de descargar para no guardar HTML como MP4.
- [x] Mantener extension real del archivo al descargar para no simular conversion MP4/WebM/MOV inexistente.
- [x] Deduplicar URLs por origen/path para reducir listas basura en Facebook/TikTok.
- [x] Evitar falsos positivos `.mp4` capturados sin headers reales; no mostrar/descargar fragmentos chicos tipo `playback1.mp4`.
- [x] Capturar respuestas de video aunque vengan por `fetch/xhr`, no solo `media`, para acercarse al comportamiento de competidores en TikTok.
- [x] Reutilizar headers seguros capturados (`Referer`/`Origin`) al iniciar descargas de URLs firmadas cuando Chrome lo permite.
- [x] Mejorar previews tomando `poster`, `og:image` o `twitter:image` cuando el video usa blob/currentSrc no descargable.
- [x] Permitir preview reproducible con controles cuando el candidato tiene URL directa de video.
- [x] Mejorar diagnostico de botones deshabilitados cuando solo hay miniatura/blob pero no URL directa descargable.
- [ ] Investigar descarga completa de streams segmentados tipo Facebook/HLS con ensamblado/merge seguro y compatible con Chrome Web Store.

## Fase 3 - Publicacion Chrome Web Store

Estado: pendiente.

Objetivo:
Publicar una primera version honesta y estable.

Tareas:

- [ ] Pagar Chrome Web Store Developer fee, USD 5 unico.
- [x] Preparar descripcion corta y larga.
- [x] Preparar plan operativo de screenshots.
- [ ] Capturar screenshots reales.
- [x] Preparar ficha Chrome Web Store en ingles y espanol.
- [x] Preparar keywords/copy de Chrome Web Store desde `KEYWORD_RESEARCH.md`.
- [x] Preparar paquete de submission con permisos, privacidad, QA y bloqueos externos.
- [ ] Completar privacy questionnaire.
- [ ] Subir extension.
- [ ] Responder revisiones si Chrome pide cambios.

## Fase 4 - SEO y Crecimiento

Estado: pendiente.

Objetivo:
Captar trafico organico con paginas en ingles.

Tareas:

- [x] Search Console.
- [ ] GA4 landing.
- [ ] GA4 Chrome Web Store.
- [x] Sistema de experimentos SEO/crecimiento.
- [x] Crear analisis de palabras clave antes de publicar nuevos articulos.
- [x] Evaluar Google Ads MCP / Keyword Planner para volumen real.
- [x] Crear `KEYWORD_RESEARCH.md` con clusters EN/ES y metodo de priorizacion.
- [x] Crear `KEYWORD_RESEARCH_EXPERT_2026.md` con datos reales de Keyword Planner, sin keywords inventadas.
- [x] Incorporar WebExtension.net / Chrome Web Store Keyword Research Tool como fuente especifica para CWS SEO.
- [ ] Articulo "Cococut alternative without ads".
- [x] Articulo "Chrome video downloader without ads".
- [x] Articulo "HLS and M3U8 downloader for Chrome".
- [ ] Articulo "Download web videos privately".
- [x] Crear landing en espanol: "descargar videos de paginas web".
- [ ] Crear 3 videos tutoriales IA: Chrome web video, TikTok/web source, por que algunos videos no se pueden descargar.
- [ ] Investigar reviews de Chrome Web Store para detectar que valoran/odian los usuarios.
- [ ] Medir impresiones/clicks.
- [ ] Ajustar copy de Chrome Store con queries reales.

KPIs iniciales:

- Primer objetivo: indexar dominio y 3 paginas SEO. Sitemap enviado a Search Console el 2026-06-19; estado inicial `isPending=true`, warnings 0, errors 0.
- Primer objetivo Chrome Store: 100 installs organicas.
- Activacion: 30% de usuarios con al menos 1 video detectado.
- Retencion: 20% de usuarios activos despues de 7 dias.
- Conversion Pro futura: 1%-3% de usuarios activos.
- SEO: primeras 100 impresiones en Search Console.

## Fase 5 - Monetizacion

Estado: pendiente.

Objetivo:
Convertir usuarios Free a Pro sin arruinar confianza.

Tareas:

- [ ] Definir feature gates Pro.
- [x] Validar pricing inicial con competencia.
- [x] Definir hipotesis MVP: Free limitado + Pro Starter USD 1.99/mes.
- [ ] Validar Paddle vs Stripe como plataforma de pago optima.
- [x] Definir Paddle como opcion recomendada para MVP global.
- [x] Implementar limite Free local MVP: 10 descargas cada 30 minutos, sin bloquear preview/deteccion.
- [ ] Implementar pantalla Pro local al alcanzar limite.
- [ ] Crear backend minimo de licencias: email/customer id, estado, vencimiento, provider.
- [ ] Crear webhook Paddle firmado.
- [ ] Crear endpoint de validacion de licencia para la extension.
- [x] Definir selector Free inicial de formato preferido sin prometer conversion cuando la fuente no exista.
- [ ] Definir selector de formato/calidad Pro con conversion/merge real sin prometer 1080p/4K cuando la fuente no exista.
- [ ] Implementar licencia simple.
- [ ] Early adopter lifetime USD 19.
- [ ] Precio normal lifetime USD 29-39.
- [ ] Evaluar suscripcion solo si hay features cloud/costos recurrentes.

## Fase 6 - Procesos Profesionales

Estado: en curso.

Objetivo:
Evitar trabajo reactivo. Cada area debe tener cadencia, metricas y criterios de decision.

Tareas:

- [x] Crear sistema de experimentos SEO/growth.
- [x] Crear archivo de pricing/competencia.
- [ ] Crear backlog priorizado por impacto/esfuerzo.
- [ ] Crear tablero de metricas inicial.
- [ ] Definir eventos de activacion sin tracking invasivo.
- [ ] Crear rutina quincenal de investigacion de reviews/competencia.
- [ ] Documentar cron diario en CRM `/crons` si se crea o modifica cualquier cron productivo.

## Proxima Tarea Recomendada

Pausado por Bruno: no seguir ahora con dominio/Cloudflare.

Estado a retomar:

- `https://easystreamsave.com` abre la landing en Cloudflare Pages.
- `https://www.easystreamsave.com` seguia apuntando a Hostinger (`2.57.91.93`) por registro DNS viejo.
- Pendiente en Cloudflare DNS: dejar `www` como CNAME hacia `easystreamsave.pages.dev`, proxy activado.
- Pendiente en Hostinger: verificar email ICANN/registrante si aparece alerta de suspension.

Mientras eso queda pausado, la proxima tarea interna recomendada es probar el nuevo MVP con preview/Open en Chrome, anotar sitios donde el preview no cargue por CORS/headers y preparar screenshots para Chrome Web Store.

## Tareas Para Proximos Crons/Agente Autonomo

Ventana especial 2026-06-19:
Bruno pidio crons solo por hoy, cada una hora hasta las 09:00 UY, con aviso por Telegram, documentando que se hizo y que seguiria.

1. QA extension: usar `landing/qa/` como fuente controlada, luego probar preview/Open/download en 10-20 sitios no DRM y registrar resultados en `MANUAL_TEST_PLAN.md`.
2. Chrome Store: ejecutar `SCREENSHOT_PLAN.md`, capturar 5-7 screenshots reales desde `landing/qa/` y fuentes publicas, y registrar URLs exactas en `MANUAL_TEST_PLAN.md`.
3. SEO: convertir `KEYWORD_RESEARCH.md` en paginas concretas. `/es/` listo; siguiente sugerida: `/cococut-alternative/`.
4. Metricas: preparar snippet GA4 parametrizable, pero no desplegarlo sin confirmar property id.
5. Licencias: disenar backend minimo Paddle sin tocar proveedor real todavia.
6. Seguridad: revisar que la extension no contenga secretos y que Pro no dependa solo del storage local.

## Experimentos/Medicion de Producto

## Analisis Competencia ZIP/CRX

- Fecha: 2026-06-19.
- Archivo de notas: `COMPETITOR_REVERSE_ENGINEERING.md`.
- Competidores inspeccionados:
  - Video Downloader Professional `2.1.7`.
  - Video DownloadHelper `10.2.71.2`.
- Aprendizajes incorporados en `0.1.10`:
  - normalizar URLs con parametros de rango cuando headers prueban video grande;
  - leer metadata estructurada tipo `og:video` / `twitter:player:stream`;
  - mejorar fallback de preview de video a poster/thumbnail;
  - documentar que la mejora grande futura es adapter por sitio + downloader HLS/segmentos.
- Avance `0.1.11`:
  - adapters propios iniciales para TikTok y Facebook;
  - extraccion defensiva de URLs desde HTML/JSON embebido;
  - downloader HLS MVP para playlists no cifradas;
  - seleccion de variante HLS de mayor bitrate;
  - limite de segmentos para evitar congelar Chrome.
- Regla: no copiar codigo propietario ni romper protecciones; usar solo aprendizajes de arquitectura y comportamiento.

### UX-001: Open source diagnostics

- Fecha inicio: 2026-06-19.
- Area: extension UX/QA.
- Hipotesis: un boton "Open" por item reduce confusion cuando el preview no carga o la descarga falla por headers, CORS, firmas temporales o permisos del servidor.
- Cambio aplicado: popup agrega boton `Open` que abre la URL detectada en una pestana en segundo plano.
- Metrica primaria: durante QA manual, porcentaje de fallos donde el tester puede distinguir entre "URL accesible", "URL expirada/bloqueada" y "preview bloqueado".
- Metrica secundaria: cantidad de bugs clasificados con causa probable en `MANUAL_TEST_PLAN.md`.
- Ventana minima: 10-20 sitios no DRM antes de Chrome Web Store.
- Resultado: pendiente.
- Decision posterior: mantener si acelera diagnostico; iterar a "Copy URL" si abrir pestanas resulta molesto.
